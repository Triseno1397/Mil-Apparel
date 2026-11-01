"""
Generate the USMC "clean" tee batch: minimal, type-led vector designs.

Outputs
  designs/usmc-clean/<slug>.svg        print file, default colorway, transparent background
  .tmp/usmc_clean/<slug>.png           1600px render of the print on its hero garment color,
                                       used as the reference image for GPT Image product shots
  .tmp/usmc_clean/gallery.html         preview page: each print on its garment colors, linked to
                                       its GPT Image product shot (designs/usmc-clean/photos.json)

Notes
  - Fonts load from Google Fonts (Archivo, Cormorant Garamond, IBM Plex Mono).
    Convert text to outlines before sending files to the printer.
  - No official insignia are drawn. Phrases such as "Semper Fidelis" may fall under
    USMC trademark licensing; clear them with the USMC Trademark Licensing Office before sale.
  - Rendering PNGs needs the Node Playwright install: NODE_PATH=$(npm root -g) python ...
  - Run: python execution/generate_usmc_clean_designs.py
"""

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = ROOT / "designs" / "usmc-clean"
TMP = ROOT / ".tmp" / "usmc_clean"

FONT_URL = (
    "https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900"
    "&family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500;1,600"
    "&family=IBM+Plex+Mono:wght@400;500&display=swap"
)

WIDE = "font-family=\"Archivo, 'Helvetica Neue', Arial, sans-serif\" style=\"font-stretch:125%\""
SERIF = "font-family=\"'Cormorant Garamond', Garamond, Georgia, serif\""
MONO = "font-family=\"'IBM Plex Mono', Menlo, monospace\""

INKS = {
    "dark": {"ink": "#ECE6D6", "acc": "#B5202E"},   # bone + scarlet, for dark garments
    "light": {"ink": "#1B1C1A", "acc": "#9E1B2A"},  # near-black + scarlet, for light garments
}
GOLD = "#D8A93B"  # yellow-footprint gold, used only on that design

GARMENTS = {
    "black": ("Tactical Black", "#1E1F1D", "dark"),
    "od": ("OD Green", "#4A5132", "dark"),
    "coyote": ("Coyote Tan", "#A88B67", "light"),
    "heather": ("Heather Grey", "#A9A9A4", "light"),
}


def svg(view_box, body):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{view_box}">'
            f"<defs><style>@import url('{FONT_URL}');</style></defs>{body}</svg>")


# --------------------------------------------------------------------------- designs

def d_mdcclxxv():
    return svg("0 0 1200 340", f"""
  <text x="600" y="170" {WIDE} font-weight="800" font-size="150" fill="%INK%" text-anchor="middle"
    textLength="1100" lengthAdjust="spacingAndGlyphs">MDCCLXXV</text>
  <rect x="50" y="228" width="1100" height="2" fill="%INK%"/>
  <rect x="50" y="222" width="70" height="14" fill="%ACC%"/>
  <text x="50" y="300" {MONO} font-weight="500" font-size="24" letter-spacing="5" fill="%INK%">ESTABLISHED 10 NOVEMBER</text>
  <text x="1150" y="300" {MONO} font-weight="500" font-size="24" letter-spacing="5" fill="%INK%" text-anchor="end">TUN TAVERN, PHILADELPHIA</text>""")


def d_coordinates():
    return svg("0 0 600 250", f"""
  <text x="0" y="70" {MONO} font-weight="500" font-size="66" fill="%INK%">39.948° N</text>
  <text x="0" y="150" {MONO} font-weight="500" font-size="66" fill="%INK%">75.141° W</text>
  <rect x="0" y="198" width="44" height="8" fill="%ACC%"/>
  <text x="62" y="208" {MONO} font-size="24" letter-spacing="6" fill="%INK%">WHERE IT STARTED · 1775</text>""")


def d_teufel_hunden():
    return svg("0 0 1000 380", f"""
  <text x="500" y="180" {SERIF} font-style="italic" font-weight="600" font-size="176" fill="%INK%"
    text-anchor="middle" textLength="900" lengthAdjust="spacingAndGlyphs">Teufel Hunden</text>
  <rect x="440" y="246" width="120" height="3" fill="%ACC%"/>
  <text x="500" y="320" {WIDE} font-weight="600" font-size="26" letter-spacing="8" fill="%INK%"
    text-anchor="middle" textLength="820" lengthAdjust="spacingAndGlyphs">DEVIL DOGS · BELLEAU WOOD · JUNE 1918</text>""")


def d_always_faithful():
    return svg("0 0 1000 300", f"""
  <text x="500" y="120" {WIDE} font-weight="800" font-size="96" fill="%INK%" text-anchor="middle"
    textLength="940" lengthAdjust="spacingAndGlyphs">ALWAYS FAITHFUL</text>
  <rect x="60" y="208" width="250" height="2" fill="%ACC%"/>
  <rect x="690" y="208" width="250" height="2" fill="%ACC%"/>
  <text x="500" y="226" {SERIF} font-style="italic" font-weight="500" font-size="64" fill="%INK%"
    text-anchor="middle">Semper Fidelis</text>""")


BATTLES = [
    ("BELLEAU WOOD", "1918"), ("GUADALCANAL", "1942"), ("TARAWA", "1943"), ("IWO JIMA", "1945"),
    ("CHOSIN RESERVOIR", "1950"), ("HUE CITY", "1968"), ("FALLUJAH", "2004"), ("MARJAH", "2010"),
]


def d_clime_and_place():
    rows = []
    for i, (name, year) in enumerate(BATTLES):
        y = 380 + i * 86
        rows.append(f"""
  <text x="60" y="{y}" font-family="Archivo, Arial, sans-serif" font-weight="600" font-size="40"
    letter-spacing="3" fill="%INK%">{name}</text>
  <line x1="560" y1="{y - 10}" x2="800" y2="{y - 10}" stroke="%INK%" stroke-width="3"
    stroke-dasharray="1 11" stroke-linecap="round"/>
  <text x="940" y="{y}" {MONO} font-weight="500" font-size="38" fill="%INK%" text-anchor="end">{year}</text>""")
    return svg("0 0 1000 1180", f"""
  <text x="60" y="120" {WIDE} font-weight="800" font-size="86" fill="%INK%"
    textLength="880" lengthAdjust="spacingAndGlyphs">IN EVERY CLIME</text>
  <text x="60" y="215" {WIDE} font-weight="800" font-size="86" fill="%INK%">AND PLACE</text>
  <rect x="60" y="262" width="120" height="8" fill="%ACC%"/>
  {''.join(rows)}
  <rect x="60" y="1060" width="880" height="2" fill="%INK%"/>
  <text x="60" y="1120" {MONO} font-size="28" letter-spacing="6" fill="%INK%">1775 – PRESENT</text>
  <text x="940" y="1120" {MONO} font-size="28" letter-spacing="6" fill="%INK%" text-anchor="end">SELECT ENGAGEMENTS</text>""")


# One boot sole, toe up, heel centred near (0,140). Mirrored for the other foot.
SOLE = ("M0,-150 C46,-150 62,-108 60,-58 C58,-16 42,14 36,44 L-30,44 "
        "C-42,12 -56,-30 -56,-76 C-56,-126 -36,-150 0,-150 Z "
        "M-34,66 L34,66 C42,66 44,74 44,84 L44,128 C44,152 24,168 0,168 "
        "C-24,168 -44,152 -44,128 L-44,84 C-44,74 -42,66 -34,66 Z")


def d_yellow_footprints():
    return svg("0 0 1000 680", f"""
  <g fill="{GOLD}">
    <!-- heels together, toes out at 45 degrees total: each sole pivots 22.5 degrees on its heel -->
    <path d="{SOLE}" transform="translate(448,250) scale(0.9) rotate(-22.5 0 120)"/>
    <path d="{SOLE}" transform="translate(552,250) scale(-0.9,0.9) rotate(-22.5 0 120)"/>
  </g>
  <text x="500" y="580" {WIDE} font-weight="800" font-size="64" fill="%INK%" text-anchor="middle"
    textLength="700" lengthAdjust="spacingAndGlyphs">WHERE IT STARTS</text>
  <text x="500" y="640" {MONO} font-weight="500" font-size="26" letter-spacing="8" fill="%INK%"
    text-anchor="middle">PARRIS ISLAND · SAN DIEGO</text>""")


def d_devil_dog_label():
    return svg("0 0 600 330", f"""
  <rect x="3" y="3" width="594" height="324" fill="none" stroke="%INK%" stroke-width="4"/>
  <text x="28" y="56" {MONO} font-weight="500" font-size="26" letter-spacing="3" fill="%INK%">Nº 1918</text>
  <text x="572" y="56" {MONO} font-weight="500" font-size="26" letter-spacing="3" fill="%INK%" text-anchor="end">BELLEAU WOOD</text>
  <text x="300" y="186" {WIDE} font-weight="800" font-size="100" fill="%INK%" text-anchor="middle"
    textLength="530" lengthAdjust="spacingAndGlyphs">DEVIL DOG</text>
  <rect x="3" y="262" width="594" height="65" fill="%ACC%"/>
  <text x="300" y="304" {MONO} font-weight="500" font-size="24" letter-spacing="9" fill="#ECE6D6"
    text-anchor="middle">PROPERTY OF THE CORPS</text>""")


def d_oorah_defined():
    return svg("0 0 1000 440", f"""
  <text x="40" y="150" {SERIF} font-style="italic" font-weight="600" font-size="160" fill="%INK%">oorah</text>
  <text x="430" y="140" {MONO} font-size="32" fill="%INK%">/ oo·rah /  interj.</text>
  <rect x="40" y="200" width="920" height="2" fill="%INK%"/>
  <g {SERIF} font-weight="500" font-size="46" fill="%INK%">
    <text x="40" y="276"><tspan fill="%ACC%">1.</tspan> Yes.</text>
    <text x="40" y="340"><tspan fill="%ACC%">2.</tspan> Understood. Moving out.</text>
    <text x="40" y="404"><tspan fill="%ACC%">3.</tspan> Hello, goodbye, and everything in between.</text>
  </g>""")


# slug, title, theme, placement, render, hero garment, concept, caption, note
DESIGNS = [
    ("mdcclxxv", "MDCCLXXV", "Eagle, Globe & Anchor", "Back · across the shoulders", d_mdcclxxv, "black",
     "1775 in Roman numerals, set wide across the upper back over a hairline rule. Founding date and Tun Tavern underneath.",
     "Some birthdays you don't forget. MDCCLXXV. Join the Fight.", None),
    ("coordinates", "Tun Tavern Coordinates", "Eagle, Globe & Anchor", "Left chest · 3.5 in", d_coordinates, "heather",
     "The Corps' birthplace as coordinates, set in mono on the left chest. Marines get it right away. Everyone else asks.",
     "39.948° N, 75.141° W. If you know, you know. Join the Fight.", None),
    ("teufel-hunden", "Teufel Hunden", "Devil Dogs", "Center chest · 10 in", d_teufel_hunden, "od",
     "The 1918 nickname set in an italic serif with tracked caps underneath. Reads like a fashion label, not a souvenir.",
     "They gave us the name at Belleau Wood. We wear it like it fits. Join the Fight.", None),
    ("devil-dog-label", "Devil Dog Nº 1918", "Devil Dogs", "Left chest · 4 in", d_devil_dog_label, "heather",
     "A boxed garment-label mark with a scarlet band. Small, sharp, and easy to pair with a back print.",
     "Property of the Corps. Since 1918. Join the Fight.", None),
    ("always-faithful", "Always Faithful", "Eagle, Globe & Anchor", "Center chest · 11 in", d_always_faithful, "black",
     "The motto in plain English, wide and heavy, with the Latin in italic serif between scarlet hairlines.",
     "Two words. Every day after. Join the Fight.",
     "Check \"Semper Fidelis\" with the USMC Trademark Licensing Office before sale. A licensed EGA can sit on the left sleeve."),
    ("clime-and-place", "In Every Clime and Place", "Moto", "Back · full 12 in", d_clime_and_place, "coyote",
     "Laid out like a tour tee: eight engagements from Belleau Wood to Marjah, with dotted leaders to the year.",
     "Every clime and place. Here are a few. Join the Fight.", None),
    ("yellow-footprints", "Yellow Footprints", "Moto", "Center chest · 9 in", d_yellow_footprints, "black",
     "Two gold boot soles at 45 degrees, heels together. Every Marine has stood there.",
     "Everybody starts on the same two footprints. Join the Fight.", None),
    ("oorah-defined", "Oorah, Defined", "Moto", "Center chest · 10 in", d_oorah_defined, "coyote",
     "A dictionary entry for the Corps' most versatile word. Dry humor in a premium serif.",
     "Yes. Understood. Hello. Goodbye. One word covers it. Join the Fight.", None),
]


# --------------------------------------------------------------------------- output

def fill(markup, ink_key):
    ink = INKS[ink_key]
    return markup.replace("%INK%", ink["ink"]).replace("%ACC%", ink["acc"])


RENDER_JS = """
const { chromium } = require('playwright');
const jobs = JSON.parse(require('fs').readFileSync(process.argv[2], 'utf8'));
(async () => {
  const b = await chromium.launch();
  const page = await b.newPage({ viewport: { width: 1600, height: 1600 } });
  for (const j of jobs) {
    await page.setContent(j.html, { waitUntil: 'networkidle' });
    await page.waitForTimeout(400);
    await page.screenshot({ path: j.out });
  }
  await b.close();
})();
"""


def render_pngs():
    """Render each print on its hero garment color (PNG). Uses the Node Playwright install."""
    import subprocess
    TMP.mkdir(parents=True, exist_ok=True)
    jobs = []
    for slug, _t, _th, _pl, fn, garment, *_ in DESIGNS:
        _n, hexc, ink = GARMENTS[garment]
        art = fill(fn(), ink).replace("<svg ", '<svg style="width:1300px;height:auto;display:block" ', 1)
        html = (f'<body style="margin:0;width:1600px;height:1600px;background:{hexc};'
                f'display:grid;place-items:center">{art}</body>')
        jobs.append({"html": html, "out": str(TMP / f"{slug}.png")})
    (TMP / "render_jobs.json").write_text(json.dumps(jobs))
    (TMP / "render.js").write_text(RENDER_JS)
    subprocess.run(["node", str(TMP / "render.js"), str(TMP / "render_jobs.json")], check=True)


def build_gallery():
    photos_file = OUT_DIR / "photos.json"
    photos = json.loads(photos_file.read_text()) if photos_file.exists() else {}
    cards = []
    for slug, title, theme, placement, fn, garment, concept, caption, note in DESIGNS:
        art = fn().replace("%INK%", "var(--ink)").replace("%ACC%", "var(--acc)")
        art = art.replace(f"<defs><style>@import url('{FONT_URL}');</style></defs>", "")
        art = art.replace("<svg ", '<svg class="art" role="img" aria-label="' + title + ' print" ', 1)
        start_name, start_hex, start_ink = GARMENTS[garment]
        sw = "".join(
            f'<button type="button" class="sw" style="--c:{hx}" data-name="{nm}" data-shirt="{hx}" '
            f'data-ink="{INKS[ik]["ink"]}" data-acc="{INKS[ik]["acc"]}" aria-label="{nm}" '
            f'aria-pressed="{"true" if key == garment else "false"}"></button>'
            for key, (nm, hx, ik) in GARMENTS.items())
        photo = (f'<a class="photo" href="{photos[slug]}" target="_blank" rel="noopener">Open product photo ↗</a>'
                 if slug in photos else "")
        note_html = f'<p class="note">{note}</p>' if note else ""
        wide = " wide" if placement.startswith("Back") else ""
        cards.append(f"""
  <article class="card{wide}" style="--shirt:{start_hex};--ink:{INKS[start_ink]['ink']};--acc:{INKS[start_ink]['acc']}">
    <div class="board">{art}</div>
    <div class="meta">
      <div class="kicker"><span>{theme}</span><span>{placement}</span></div>
      <h2>{title}</h2>
      <p>{concept}</p>
      <div class="controls">
        <div class="sws" role="group" aria-label="Garment color">{sw}</div>
        <span class="gname">{start_name}</span>
      </div>
      <p class="cap"><span>Caption</span>{caption}</p>
      {note_html}
      <div class="links">{photo}<code>designs/usmc-clean/{slug}.svg</code></div>
    </div>
  </article>""")
    return f"""<title>USMC Clean Line</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="stylesheet" href="{FONT_URL}">
<style>
/* Layout: a print-room proof sheet. Each design sits on a swatch of its garment color; type does the talking. */
:root {{
  --bg:#EEEBE4; --panel:#F8F6F1; --fg:#1B1C1A; --muted:#66625A; --line:#D8D2C6; --red:#9E1B2A;
  --wide:Archivo, 'Helvetica Neue', Arial, sans-serif; --serif:'Cormorant Garamond', Garamond, Georgia, serif;
  --mono:'IBM Plex Mono', Menlo, monospace;
}}
@media (prefers-color-scheme: dark) {{ :root:not([data-theme="light"]) {{
  --bg:#151614; --panel:#1D1E1B; --fg:#ECE6D6; --muted:#A39E92; --line:#33342F; --red:#D04450; color-scheme:dark }} }}
:root[data-theme="dark"] {{
  --bg:#151614; --panel:#1D1E1B; --fg:#ECE6D6; --muted:#A39E92; --line:#33342F; --red:#D04450; color-scheme:dark }}
body {{ background:var(--bg); color:var(--fg); font:16px/1.55 var(--wide); }}
.wrap {{ max-width:1200px; margin:0 auto; padding-block:48px 72px;
  padding-left:max(16px, env(safe-area-inset-left, 0px)); padding-right:max(16px, env(safe-area-inset-right, 0px)); }}
header {{ display:grid; gap:14px; margin-bottom:40px; }}
.eyebrow {{ font:500 12px/1 var(--mono); letter-spacing:.16em; text-transform:uppercase; color:var(--muted); }}
h1 {{ margin:0; font:800 clamp(40px, 7vw, 84px)/.95 var(--wide); font-stretch:125%; letter-spacing:-.01em; text-wrap:balance; }}
h1 i {{ font:italic 600 1.05em/1 var(--serif); font-stretch:100%; letter-spacing:0; }}
.lede {{ margin:0; max-width:64ch; color:var(--muted); }}
.rule {{ height:2px; background:var(--fg); position:relative; margin-top:6px; }}
.rule::before {{ content:""; position:absolute; left:0; top:-5px; width:64px; height:12px; background:var(--red); }}
.grid {{ display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); gap:28px; }}
.card.wide {{ grid-row:span 2; }}
@media (max-width:820px) {{ .grid {{ grid-template-columns:minmax(0, 1fr); }} .card.wide {{ grid-row:auto; }} }}
.card {{ background:var(--panel); border:1px solid var(--line); display:flex; flex-direction:column; min-width:0; }}
.board {{ background:var(--shirt); display:grid; place-items:center; padding:clamp(28px, 6vw, 64px); min-height:300px;
  transition:background .25s; }}
.wide .board {{ flex:1; }}
.art {{ width:100%; max-width:440px; height:auto; display:block; }}
.meta {{ padding:20px 22px 22px; display:grid; gap:12px; align-content:start; }}
.meta p {{ margin:0; font-size:15px; }}
.kicker {{ display:flex; justify-content:space-between; gap:12px; flex-wrap:wrap; font:500 11px/1.3 var(--mono);
  letter-spacing:.12em; text-transform:uppercase; color:var(--muted); }}
.kicker span:first-child {{ color:var(--red); }}
h2 {{ margin:0; font:800 26px/1.1 var(--wide); font-stretch:125%; }}
.controls {{ display:flex; align-items:center; gap:14px; flex-wrap:wrap; }}
.sws {{ display:flex; gap:8px; }}
.sw {{ width:26px; height:26px; border-radius:50%; background:var(--c); border:1px solid var(--line); padding:0; cursor:pointer; }}
.sw[aria-pressed="true"] {{ outline:2px solid var(--fg); outline-offset:2px; }}
.sw:focus-visible {{ outline:3px solid var(--red); outline-offset:2px; }}
.gname {{ font:500 12px/1 var(--mono); color:var(--muted); }}
.cap {{ border-top:1px solid var(--line); padding-top:12px; font-family:var(--serif) !important; font-size:19px !important; font-style:italic; }}
.cap span {{ display:block; font:500 11px/1.8 var(--mono); font-style:normal; letter-spacing:.12em; text-transform:uppercase; color:var(--muted); }}
.note {{ font-size:14px !important; padding:10px 12px; border-left:3px solid var(--red); background:color-mix(in srgb, var(--red) 9%, transparent); }}
.links {{ display:flex; justify-content:space-between; align-items:center; gap:12px; flex-wrap:wrap; }}
.photo {{ font:600 14px/1 var(--wide); color:var(--fg); text-decoration:none; border-bottom:2px solid var(--red); padding-bottom:3px; }}
.photo:hover, .photo:focus-visible {{ color:var(--red); }}
code {{ font:400 12px/1.3 var(--mono); color:var(--muted); overflow-wrap:anywhere; }}
footer {{ margin-top:44px; max-width:72ch; color:var(--muted); font-size:14px; display:grid; gap:8px; }}
footer p {{ margin:0; }}
@media (prefers-reduced-motion: reduce) {{ .board {{ transition:none; }} }}
</style>
<div class="wrap">
<header>
  <span class="eyebrow">Mil Apparel · Marines · Round 2</span>
  <h1>The Clean <i>Line</i></h1>
  <div class="rule"></div>
  <p class="lede">Eight type-led designs: no cartoons, no distressing. Devil Dogs, the Corps' founding, and inside jokes said quietly. Tap a swatch to try each print on Tactical Black, OD Green, Coyote Tan or Heather Grey. Each card links to a GPT Image product photo.</p>
</header>
<section class="grid">{''.join(cards)}
</section>
<footer>
  <p>The art on this page is the exact print file. The product photos were generated by GPT Image 2.5 from a written description, so check the lettering in each photo before using it in an ad or listing.</p>
  <p>Print files: <code>designs/usmc-clean/</code>. Convert text to outlines before sending them to the printer.</p>
</footer>
</div>
<script>
document.querySelectorAll('.card').forEach(card => {{
  card.querySelectorAll('.sw').forEach(b => b.addEventListener('click', () => {{
    card.style.setProperty('--shirt', b.dataset.shirt);
    card.style.setProperty('--ink', b.dataset.ink);
    card.style.setProperty('--acc', b.dataset.acc);
    card.querySelector('.gname').textContent = b.dataset.name;
    card.querySelectorAll('.sw').forEach(o => o.setAttribute('aria-pressed', String(o === b)));
  }}));
}});
</script>
"""


def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for slug, *rest in DESIGNS:
        (OUT_DIR / f"{slug}.svg").write_text(fill(rest[3](), "dark"))
    render_pngs()
    (TMP / "gallery.html").write_text(build_gallery())
    print(f"wrote {len(DESIGNS)} SVGs to {OUT_DIR.relative_to(ROOT)} and PNG refs to {TMP.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
