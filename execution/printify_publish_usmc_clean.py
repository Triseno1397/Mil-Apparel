"""
Create the USMC Clean Line tees in Printify and publish them to the connected Shopify store.

Each design becomes ONE Shopify product on a Comfort Colors 1717 with four colors.
Dark garments (Black, Moss) get the bone-ink print; light garments (Khaki, Grey) get
the near-black-ink print. Printify supports a different print file per variant group.

Tags include `marines`, `usmc` and `t-shirts`, so the smart collections put every tee
under Branches > Marines and Shop > T-Shirts on milapparel.com automatically.

Usage
  python execution/printify_publish_usmc_clean.py --dry-run     # render print files, show the plan, no network
  python execution/printify_publish_usmc_clean.py --create      # upload art, create products (not yet on Shopify)
  python execution/printify_publish_usmc_clean.py --publish     # publish created products to Shopify
  python execution/printify_publish_usmc_clean.py --status      # report Shopify handles once Printify has synced

Environment
  PRINTIFY_API_TOKEN     required (Printify > My account > Connections > API tokens)
  PRINTIFY_SHOP_ID       optional; defaults to the shop whose sales channel is Shopify
  PRINTIFY_PROVIDER_ID   optional; defaults to the first US provider that stocks all four colors
  Network: api.printify.com must be allowed. Rendering uses the Node Playwright install,
  so run with NODE_PATH=$(npm root -g).

State
  designs/usmc-clean/printify_products.json records upload and product IDs so re-runs
  never create duplicates. Commit it after each run.
"""

import argparse
import base64
import json
import os
import subprocess
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import generate_usmc_clean_designs as gen  # noqa: E402

ROOT = gen.ROOT
PRINT_DIR = gen.TMP / "print"
STATE_FILE = gen.OUT_DIR / "printify_products.json"
API = "https://api.printify.com/v1"
DPI = 300

BLUEPRINT_MATCH = ("comfort colors", "1717")
SIZES = ["S", "M", "L", "XL", "2XL", "3XL"]
PRICE_CENTS = {"2XL": 3699, "3XL": 3899}  # everything else 3499
BASE_PRICE_CENTS = 3499

# Our garment key -> acceptable Comfort Colors names, in order of preference
COLOR_CANDIDATES = {
    "black": ["Black"],
    "od": ["Moss", "Hemp", "Sage"],
    "coyote": ["Khaki", "Sandstone"],
    "heather": ["Grey", "Granite"],
}

# Physical placement. width_in = print width; top_in = top edge below the top of the print
# area; x_in = horizontal offset of the print's centre from the shirt centre (+ = viewer's right,
# which is the wearer's left chest).
PLACEMENT = {
    "mdcclxxv":          {"position": "back",  "width_in": 11.0, "top_in": 1.0, "x_in": 0.0},
    "coordinates":       {"position": "front", "width_in": 3.5,  "top_in": 2.0, "x_in": 4.0},
    "teufel-hunden":     {"position": "front", "width_in": 10.0, "top_in": 2.0, "x_in": 0.0},
    "devil-dog-label":   {"position": "front", "width_in": 3.75, "top_in": 2.0, "x_in": 4.0},
    "always-faithful":   {"position": "front", "width_in": 11.0, "top_in": 2.0, "x_in": 0.0},
    "clime-and-place":   {"position": "back",  "width_in": 12.0, "top_in": 1.0, "x_in": 0.0},
    "yellow-footprints": {"position": "front", "width_in": 9.0,  "top_in": 2.0, "x_in": 0.0},
    "oorah-defined":     {"position": "front", "width_in": 10.0, "top_in": 2.0, "x_in": 0.0},
}

COMMON_TAGS = ["marines", "usmc", "marine-corps", "t-shirts", "mens", "live-pod", "usmc-clean-line", "gift"]

BLANK_DETAILS = """
<ul>
<li>Comfort Colors 1717: 6.1 oz, 100% ring-spun cotton, garment-dyed for a broken-in feel from day one</li>
<li>Relaxed fit with a double-needle collar and twill taping</li>
<li>Printed to order in the USA and shipped by our fulfillment partner</li>
<li>Veteran-owned and operated. Free shipping over $50.</li>
</ul>"""

COPY = {
    "mdcclxxv": {
        "title": "MDCCLXXV Tee — USMC 1775 Marine Corps Birthday T-Shirt",
        "tags": ["marine-corps-birthday", "1775", "tun-tavern", "veterans-day"],
        "body": "<p><strong>MDCCLXXV.</strong> 1775 in Roman numerals, set wide across the shoulders. "
                "Underneath: <em>Established 10 November · Tun Tavern, Philadelphia</em>.</p>"
                "<p>No eagle, no flag, no shouting. Just the year it started, for the people who already know what it means.</p>",
    },
    "coordinates": {
        "title": "Tun Tavern Coordinates Tee — USMC Birthplace Left Chest T-Shirt",
        "tags": ["tun-tavern", "1775", "minimalist", "marine-corps-birthday"],
        "body": "<p><strong>39.948° N, 75.141° W.</strong> Tun Tavern, Philadelphia, where the Corps started recruiting in 1775.</p>"
                "<p>A small left-chest print in clean mono type. Marines read it in a second. Everyone else asks, and you get to tell the story.</p>",
    },
    "teufel-hunden": {
        "title": "Teufel Hunden Tee — USMC Devil Dogs Belleau Wood 1918 T-Shirt",
        "tags": ["devil-dog", "teufelhunden", "belleau-wood"],
        "body": "<p><strong>Teufel Hunden.</strong> The name the Marines earned at Belleau Wood in June 1918, and kept.</p>"
                "<p>Set in an italic serif with a thin scarlet rule and <em>Devil Dogs · Belleau Wood · June 1918</em> underneath. "
                "It reads like a label, not a souvenir.</p>",
    },
    "devil-dog-label": {
        "title": "Devil Dog Nº 1918 Tee — USMC Devil Dog Left Chest T-Shirt",
        "tags": ["devil-dog", "belleau-wood", "minimalist"],
        "body": "<p><strong>Devil Dog. Nº 1918.</strong> A boxed, garment-label style mark on the left chest with a scarlet "
                "<em>Property of the Corps</em> band.</p>"
                "<p>Small, sharp, and easy to wear anywhere.</p>",
    },
    "always-faithful": {
        "title": "Always Faithful Tee — Semper Fidelis USMC Motto T-Shirt",
        "tags": ["semper-fi", "semper-fidelis", "always-faithful"],
        "body": "<p><strong>Always Faithful.</strong> The motto in plain English, wide and heavy across the chest, "
                "with <em>Semper Fidelis</em> in italic between two scarlet hairlines.</p>"
                "<p>Two words. Every day after.</p>",
    },
    "clime-and-place": {
        "title": "In Every Clime and Place Tee — USMC Battles Back Print T-Shirt",
        "tags": ["marines-hymn", "battles", "history", "veterans-day"],
        "body": "<p><strong>In every clime and place.</strong> A full back print laid out like a tour tee: Belleau Wood 1918, "
                "Guadalcanal 1942, Tarawa 1943, Iwo Jima 1945, Chosin Reservoir 1950, Hue City 1968, Fallujah 2004, Marjah 2010.</p>"
                "<p>Not the whole list. Never could be.</p>",
    },
    "yellow-footprints": {
        "title": "Yellow Footprints Tee — USMC Boot Camp Where It Starts T-Shirt",
        "tags": ["boot-camp", "parris-island", "mcrd", "san-diego"],
        "body": "<p><strong>Where it starts.</strong> Two gold boot prints, heels together, toes out at 45 degrees. "
                "<em>Parris Island · San Diego</em> underneath.</p>"
                "<p>Every Marine has stood on them. A good gift for a new Marine, or for the family watching from the bleachers.</p>",
    },
    "oorah-defined": {
        "title": "Oorah Defined Tee — Funny USMC Dictionary T-Shirt",
        "tags": ["oorah", "funny", "humor"],
        "body": "<p><strong>oorah</strong> <em>/ oo·rah / interj.</em> 1. Yes. 2. Understood. Moving out. "
                "3. Hello, goodbye, and everything in between.</p>"
                "<p>The Corps' most versatile word, defined properly. Dry humor in a premium serif.</p>",
    },
}


# --------------------------------------------------------------------------- print files

RENDER_JS = """
const { chromium } = require('playwright');
const jobs = JSON.parse(require('fs').readFileSync(process.argv[2], 'utf8'));
(async () => {
  const b = await chromium.launch();
  const page = await b.newPage({ viewport: { width: 1200, height: 800 }, deviceScaleFactor: 1 });
  for (const j of jobs) {
    await page.setViewportSize({ width: j.w, height: j.h });
    await page.setContent(j.html, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(300);
    await page.screenshot({ path: j.out, omitBackground: true, clip: { x: 0, y: 0, width: j.w, height: j.h } });
  }
  await b.close();
})();
"""


def design(slug):
    for d in gen.DESIGNS:
        if d[0] == slug:
            return d
    raise KeyError(slug)


def print_size(slug):
    """Pixel size of the print at 300 DPI, from the SVG viewBox aspect ratio."""
    _slug, _t, _th, _pl, fn, *_ = design(slug)
    vb = fn().split('viewBox="', 1)[1].split('"', 1)[0].split()
    vw, vh = float(vb[2]), float(vb[3])
    w = round(PLACEMENT[slug]["width_in"] * DPI)
    return w, round(w * vh / vw)


def print_path(slug, ink):
    return PRINT_DIR / f"{slug}-{ink}-ink.png"


def render_print_files():
    """Transparent 300 DPI PNG per design per ink set."""
    PRINT_DIR.mkdir(parents=True, exist_ok=True)
    jobs = []
    for slug in PLACEMENT:
        fn = design(slug)[4]
        w, h = print_size(slug)
        for ink in ("dark", "light"):
            art = gen.fill(fn(), ink).replace("<svg ", f'<svg width="{w}" height="{h}" style="display:block" ', 1)
            html = f'<body style="margin:0;background:transparent">{art}</body>'
            jobs.append({"html": html, "out": str(print_path(slug, ink)), "w": w, "h": h})
    jobs_file = PRINT_DIR / "jobs.json"
    js_file = PRINT_DIR / "render.js"
    jobs_file.write_text(json.dumps(jobs))
    js_file.write_text(RENDER_JS)
    subprocess.run(["node", str(js_file), str(jobs_file)], check=True)
    print(f"rendered {len(jobs)} print files to {PRINT_DIR.relative_to(ROOT)}")


def image_transform(slug, area_w, area_h):
    """Printify image transform: x/y are the image centre as a fraction of the print area, scale is image width / area width."""
    p = PLACEMENT[slug]
    w_px, h_px = print_size(slug)
    area_w_in, area_h_in = area_w / DPI, area_h / DPI
    scale = p["width_in"] / area_w_in
    h_in = p["width_in"] * h_px / w_px
    x = 0.5 + p["x_in"] / area_w_in
    y = (p["top_in"] + h_in / 2) / area_h_in
    if h_in + p["top_in"] > area_h_in or abs(p["x_in"]) + p["width_in"] / 2 > area_w_in / 2:
        raise ValueError(f"{slug}: print does not fit a {area_w_in:.1f}x{area_h_in:.1f} in area")
    return {"x": round(x, 4), "y": round(y, 4), "scale": round(scale, 4), "angle": 0}


# --------------------------------------------------------------------------- Printify API

def api(method, path, body=None):
    token = os.environ.get("PRINTIFY_API_TOKEN")
    if not token:
        sys.exit("PRINTIFY_API_TOKEN is not set.")
    req = urllib.request.Request(
        f"{API}{path}", method=method,
        data=json.dumps(body).encode() if body is not None else None,
        headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json",
                 "User-Agent": "MilApparel-USMC-Clean-Line/1.0"})
    for attempt in range(5):
        try:
            with urllib.request.urlopen(req, timeout=120) as r:
                text = r.read().decode()
                return json.loads(text) if text else {}
        except urllib.error.HTTPError as e:
            detail = e.read().decode()[:600]
            if e.code == 429 or e.code >= 500:  # rate limited or transient: back off and retry
                time.sleep(2 ** attempt * 2)
                continue
            sys.exit(f"Printify {method} {path} failed ({e.code}): {detail}")
        except urllib.error.URLError as e:
            sys.exit(f"Cannot reach api.printify.com ({e.reason}). Is it in the environment's allowed domains?")
    sys.exit(f"Printify {method} {path} kept failing after retries.")


def load_state():
    return json.loads(STATE_FILE.read_text()) if STATE_FILE.exists() else {"uploads": {}, "products": {}}


def save_state(state):
    STATE_FILE.write_text(json.dumps(state, indent=2) + "\n")


def find_shop():
    if os.environ.get("PRINTIFY_SHOP_ID"):
        return int(os.environ["PRINTIFY_SHOP_ID"])
    shops = [s for s in api("GET", "/shops.json") if "shopify" in str(s.get("sales_channel", "")).lower()]
    if len(shops) != 1:
        sys.exit(f"Expected one Shopify-connected Printify shop, found {len(shops)}. Set PRINTIFY_SHOP_ID.")
    print(f"shop: {shops[0]['title']} ({shops[0]['id']})")
    return shops[0]["id"]


def find_blueprint():
    for bp in api("GET", "/catalog/blueprints.json"):
        text = f"{bp.get('brand', '')} {bp.get('model', '')} {bp.get('title', '')}".lower()
        if all(m in text for m in BLUEPRINT_MATCH):
            print(f"blueprint: {bp['title']} [{bp['brand']} {bp['model']}] ({bp['id']})")
            return bp["id"]
    sys.exit("Comfort Colors 1717 blueprint not found in the Printify catalog.")


def pick_colors(variants):
    """Map our garment keys to the provider's color names. Returns None if any is missing."""
    names = {v["options"].get("color") for v in variants}
    chosen = {}
    for key, candidates in COLOR_CANDIDATES.items():
        match = next((c for c in candidates for n in names if n and n.lower() == c.lower()), None)
        if not match:
            return None
        chosen[key] = match
    return chosen


def find_provider(blueprint_id):
    providers = api("GET", f"/catalog/blueprints/{blueprint_id}/print_providers.json")
    wanted = os.environ.get("PRINTIFY_PROVIDER_ID")
    if wanted:
        providers = [p for p in providers if str(p["id"]) == wanted]
    else:  # US providers first
        providers.sort(key=lambda p: 0 if (p.get("location") or {}).get("country") == "US" else 1)
    for p in providers:
        variants = api("GET", f"/catalog/blueprints/{blueprint_id}/print_providers/{p['id']}/variants.json")["variants"]
        colors = pick_colors(variants)
        if colors:
            print(f"provider: {p['title']} ({p['id']}), colors {colors}")
            return p["id"], variants, colors
    sys.exit("No print provider stocks all four colors. Set PRINTIFY_PROVIDER_ID or edit COLOR_CANDIDATES.")


def upload(state, slug, ink):
    key = f"{slug}-{ink}"
    if key not in state["uploads"]:
        path = print_path(slug, ink)
        res = api("POST", "/uploads/images.json",
                  {"file_name": path.name, "contents": base64.b64encode(path.read_bytes()).decode()})
        state["uploads"][key] = res["id"]
        save_state(state)
        print(f"  uploaded {path.name}")
    return state["uploads"][key]


def product_payload(slug, variants, colors, image_ids):
    p = PLACEMENT[slug]
    copy = COPY[slug]
    by_color = {name: key for key, name in colors.items()}
    groups = {"dark": [], "light": []}
    payload_variants, area = [], None
    for v in variants:
        color, size = v["options"].get("color"), v["options"].get("size")
        if color not in by_color or size not in SIZES:
            continue
        ink = gen.GARMENTS[by_color[color]][2]
        groups[ink].append(v["id"])
        payload_variants.append({"id": v["id"], "price": PRICE_CENTS.get(size, BASE_PRICE_CENTS), "is_enabled": True})
        ph = next(x for x in v["placeholders"] if x["position"] == p["position"])
        area = area or (ph["width"], ph["height"])
    transform = image_transform(slug, *area)
    return {
        "title": copy["title"],
        "description": copy["body"] + BLANK_DETAILS,
        "tags": COMMON_TAGS + copy["tags"],
        "blueprint_id": None,       # filled by caller
        "print_provider_id": None,  # filled by caller
        "variants": payload_variants,
        "print_areas": [
            {"variant_ids": ids,
             "placeholders": [{"position": p["position"], "images": [{"id": image_ids[ink], **transform}]}]}
            for ink, ids in groups.items() if ids
        ],
    }


# --------------------------------------------------------------------------- commands

def cmd_dry_run():
    render_print_files()
    for slug, p in PLACEMENT.items():
        w, h = print_size(slug)
        # Comfort Colors front/back areas on Printify are typically about 15 x 18 in; real sizes come from the API.
        t = image_transform(slug, 4500, 5400)
        print(f"{slug:18} {p['position']:5} {w}x{h}px  x={t['x']} y={t['y']} scale={t['scale']}  {COPY[slug]['title']}")
    print("\ndry run only: nothing was sent to Printify.")


def cmd_create():
    render_print_files()
    state = load_state()
    shop = find_shop()
    blueprint = find_blueprint()
    provider, variants, colors = find_provider(blueprint)
    state.update({"shop_id": shop, "blueprint_id": blueprint, "provider_id": provider, "colors": colors})
    save_state(state)
    for slug in PLACEMENT:
        if slug in state["products"]:
            print(f"{slug}: already created ({state['products'][slug]['printify_id']}), skipping")
            continue
        print(f"{slug}:")
        ids = {ink: upload(state, slug, ink) for ink in ("dark", "light")}
        body = product_payload(slug, variants, colors, ids)
        body["blueprint_id"], body["print_provider_id"] = blueprint, provider
        res = api("POST", f"/shops/{shop}/products.json", body)
        state["products"][slug] = {"printify_id": res["id"], "title": body["title"], "published": False}
        save_state(state)
        print(f"  created {res['id']}")
    print("\nCreated. Review the mockups in Printify, then run --publish.")


def cmd_publish():
    state = load_state()
    shop = state["shop_id"]
    for slug, rec in state["products"].items():
        if rec.get("published"):
            continue
        api("POST", f"/shops/{shop}/products/{rec['printify_id']}/publish.json", {
            "title": True, "description": True, "images": True, "variants": True,
            "tags": True, "keyFeatures": True, "shipping_template": True})
        rec["published"] = True
        save_state(state)
        print(f"{slug}: publish requested")
    print("\nPrintify syncs to Shopify in a minute or two. Run --status to collect the Shopify handles.")


def cmd_status():
    state = load_state()
    shop = state["shop_id"]
    for slug, rec in state["products"].items():
        ext = api("GET", f"/shops/{shop}/products/{rec['printify_id']}.json").get("external") or {}
        if ext.get("handle"):
            rec["shopify_id"], rec["shopify_handle"] = ext.get("id"), ext["handle"]
        print(f"{slug:18} {'https://milapparel.com/products/' + ext['handle'] if ext.get('handle') else 'not synced yet'}")
    save_state(state)


if __name__ == "__main__":
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    g = ap.add_mutually_exclusive_group(required=True)
    g.add_argument("--dry-run", action="store_true")
    g.add_argument("--create", action="store_true")
    g.add_argument("--publish", action="store_true")
    g.add_argument("--status", action="store_true")
    a = ap.parse_args()
    {"dry_run": cmd_dry_run, "create": cmd_create, "publish": cmd_publish, "status": cmd_status}[
        next(k for k, v in vars(a).items() if v)]()
