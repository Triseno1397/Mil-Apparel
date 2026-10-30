"""
Generate the USMC tee design set (vector SVG print files + a preview gallery).

Outputs
  designs/usmc/<slug>.svg      print-ready vector art, default colorway (bone + scarlet,
                               for dark garments), transparent background
  .tmp/usmc_tee_gallery.html   preview page: every design on a tee mockup with
                               garment swatches (Tactical Black / OD Green / Coyote / Heather)

Notes
  - Text uses Google Fonts (Black Ops One, Saira Stencil One, Oswald, Graduate) via
    @import. Before sending to a printer, open each SVG in Illustrator/Inkscape and
    convert text to outlines.
  - No official insignia are drawn. The EGA design ("earned") carries a marked slot
    for licensed EGA artwork from the USMC Trademark Licensing Office.
  - Run: python execution/generate_usmc_tee_designs.py
"""

import math
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = ROOT / "designs" / "usmc"
GALLERY = ROOT / ".tmp" / "usmc_tee_gallery.html"

FONT_IMPORT = (
    "https://fonts.googleapis.com/css2?family=Black+Ops+One&family=Saira+Stencil+One"
    "&family=Oswald:wght@500;700&family=Graduate&display=swap"
)

# Ink sets. Placeholders %INK% / %ACC% are swapped for hex (files) or CSS vars (gallery).
INK_DARK_GARMENT = {"ink": "#E9E1CB", "acc": "#B5202E"}   # bone + scarlet
INK_LIGHT_GARMENT = {"ink": "#1E1F1C", "acc": "#9E1B2A"}  # black + scarlet

GARMENTS = [
    ("Tactical Black", "#1F201E", INK_DARK_GARMENT),
    ("OD Green", "#4A5132", INK_DARK_GARMENT),
    ("Coyote Tan", "#A88B67", INK_LIGHT_GARMENT),
    ("Heather Grey", "#A7A7A2", INK_LIGHT_GARMENT),
]


# --------------------------------------------------------------------------- shared parts

def grit(seed, strength=1.0):
    """Distressed-print filter: knocks small specks out of the ink via fractal noise."""
    slope = -9
    offset = 6.9 + (1 - strength) * 1.2  # higher offset = fewer specks
    return f"""
    <filter id="§grit" x="0" y="0" width="100%" height="100%" filterUnits="userSpaceOnUse">
      <feTurbulence type="fractalNoise" baseFrequency="0.38" numOctaves="3" seed="{seed}" result="n"/>
      <feColorMatrix in="n" type="matrix" result="m"
        values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 {slope} {offset}"/>
      <feComposite in="SourceGraphic" in2="m" operator="in"/>
    </filter>"""


def mirrored(inner):
    """Draw a left-half group, then its mirror across x=0."""
    return f'<g>{inner}</g><g transform="scale(-1,1)">{inner}</g>'


# Front-facing bulldog head, centred on (0,0), ~520 wide. Drawn as mask content:
# white = ink, black = knocked out to the garment.
DOG_HALF_SILHOUETTE = (
    '<path fill="white" d="M0,-175 C-50,-178 -95,-175 -125,-165 L-150,-182 '
    "C-200,-200 -252,-186 -262,-150 C-266,-122 -240,-110 -216,-118 "
    'C-230,-80 -240,-30 -238,10 C-245,60 -235,110 -200,145 C-160,180 -90,197 0,197 Z"/>'
)
DOG_HALF_DETAIL = """
  <path d="M-158,-172 C-205,-188 -244,-172 -250,-142" stroke="black" stroke-width="11" fill="none" stroke-linecap="round"/>
  <path d="M-130,-62 Q-92,-84 -46,-52 Q-92,-38 -130,-62 Z" fill="black"/>
  <circle cx="-74" cy="-56" r="9" fill="white"/>
  <path d="M-165,-94 Q-104,-112 -34,-66" stroke="black" stroke-width="20" fill="none" stroke-linecap="round"/>
  <path d="M-14,-162 Q-26,-136 -12,-108" stroke="black" stroke-width="9" fill="none" stroke-linecap="round"/>
  <path d="M-48,-152 Q-60,-132 -48,-114" stroke="black" stroke-width="7" fill="none" stroke-linecap="round"/>
  <path d="M-34,-32 C-95,-38 -168,-4 -178,52" stroke="black" stroke-width="10" fill="none" stroke-linecap="round"/>
  <path d="M-206,58 Q-188,100 -150,124" stroke="black" stroke-width="8" fill="none" stroke-linecap="round"/>
  <path d="M0,62 C-35,82 -92,72 -142,40" stroke="black" stroke-width="10" fill="none" stroke-linecap="round"/>
  <path d="M0,36 L0,62" stroke="black" stroke-width="9"/>
  <path d="M-128,96 C-85,108 -35,112 0,112 L0,132 C-38,132 -90,126 -132,110 Z" fill="black"/>
  <path d="M-142,40 C-170,66 -166,104 -130,114" stroke="black" stroke-width="10" fill="none" stroke-linecap="round"/>
  <path d="M-84,120 L-70,62 L-56,120 Z" fill="white" stroke="black" stroke-width="7" stroke-linejoin="round"/>
  <path d="M-40,122 L-33,94 L-26,122 Z" fill="white" stroke="black" stroke-width="5" stroke-linejoin="round"/>
"""
DOG_COLLAR = """
  <path d="M-196,168 Q0,248 196,168 L196,222 Q0,302 -196,222 Z" fill="white" stroke="black" stroke-width="12"/>
  <path d="M-150,152 Q0,210 150,152" stroke="black" stroke-width="7" fill="none" stroke-linecap="round"/>
""" + "".join(
    # studs follow the collar curve
    f'<circle cx="{x}" cy="{round(195 + 80 * (1 - (x / 196) ** 2) * 0.5 + 12, 1)}" r="9" fill="black"/>'
    for x in range(-160, 161, 64)
)


def dog_mask(mask_id):
    return f"""
    <mask id="{mask_id}" maskUnits="userSpaceOnUse" x="-300" y="-260" width="600" height="600">
      <rect x="-300" y="-260" width="600" height="600" fill="black"/>
      {mirrored(DOG_HALF_SILHOUETTE)}
      {mirrored(DOG_HALF_DETAIL)}
      <path d="M-62,-24 C-60,-42 60,-42 62,-24 C66,10 30,36 0,38 C-30,36 -66,10 -62,-24 Z" fill="white"
        stroke="black" stroke-width="12" stroke-linejoin="round"/>
      <ellipse cx="-27" cy="10" rx="13" ry="7" transform="rotate(-18 -27 10)" fill="black"/>
      <ellipse cx="27" cy="10" rx="13" ry="7" transform="rotate(18 27 10)" fill="black"/>
      <path d="M-60,152 Q0,170 60,152" stroke="black" stroke-width="7" fill="none" stroke-linecap="round"/>
      {DOG_COLLAR}
    </mask>"""


def svg(view_box, defs, body, seed=7, strength=1.0):
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="{view_box}">
  <defs>
    <style>@import url('{FONT_IMPORT}');</style>
    {grit(seed, strength)}
    {defs}
  </defs>
  <g filter="url(#§grit)">
    {body}
  </g>
</svg>"""


# --------------------------------------------------------------------------- designs

def d_devil_dog_badge():
    defs = dog_mask("§dog") + """
    <path id="§arc" d="M80,600 A420,420 0 0 1 920,600" fill="none"/>
    <path id="§rib" d="M190,1008 Q500,1068 810,1008" fill="none"/>"""
    body = """
    <text font-family="'Black Ops One', Impact, sans-serif" font-size="140" fill="%INK%" text-anchor="middle">
      <textPath href="#§arc" startOffset="50%" textLength="820" lengthAdjust="spacing">DEVIL DOG</textPath></text>
    <g transform="translate(500,610) scale(1.1)">
      <rect x="-300" y="-260" width="600" height="600" fill="%INK%" mask="url(#§dog)"/></g>
    <path d="M160,965 L78,972 L112,1015 L78,1058 L160,1052 Z M840,965 L922,972 L888,1015 L922,1058 L840,1052 Z" fill="%ACC%"/>
    <path d="M160,950 Q500,1010 840,950 L840,1038 Q500,1098 160,1038 Z" fill="%ACC%"/>
    <text font-family="'Black Ops One', Impact, sans-serif" font-size="62" fill="%INK%" text-anchor="middle">
      <textPath href="#§rib" startOffset="50%" textLength="560" lengthAdjust="spacing">TEUFEL HUNDEN</textPath></text>
    <text x="500" y="1160" font-family="Oswald, 'Arial Narrow', sans-serif" font-weight="700" font-size="42"
      letter-spacing="10" fill="%INK%" text-anchor="middle">BELLEAU WOOD · JUNE 1918</text>"""
    return svg("0 0 1000 1190", defs, body, seed=11)


def d_kennel_club():
    defs = dog_mask("§dog")
    body = """
    <text x="500" y="90" font-family="Oswald, 'Arial Narrow', sans-serif" font-weight="500" font-size="46"
      letter-spacing="14" fill="%INK%" text-anchor="middle">PROPERTY OF THE</text>
    <text x="500" y="270" font-family="Graduate, Georgia, serif" font-size="190" fill="%INK%" text-anchor="middle"
      textLength="900" lengthAdjust="spacingAndGlyphs">DEVIL DOG</text>
    <text x="500" y="400" font-family="Graduate, Georgia, serif" font-size="120" fill="%ACC%" text-anchor="middle"
      textLength="760" lengthAdjust="spacingAndGlyphs">KENNEL CLUB</text>
    <circle cx="500" cy="680" r="215" fill="none" stroke="%INK%" stroke-width="12"/>
    <circle cx="500" cy="680" r="195" fill="none" stroke="%INK%" stroke-width="4"/>
    <g transform="translate(500,672) scale(0.64)">
      <rect x="-300" y="-260" width="600" height="600" fill="%INK%" mask="url(#§dog)"/></g>
    <text x="500" y="985" font-family="Oswald, 'Arial Narrow', sans-serif" font-weight="700" font-size="58"
      letter-spacing="4" fill="%INK%" text-anchor="middle">RULE NO. 1: DON'T PET THE DEVIL DOG</text>
    <line x1="160" y1="1030" x2="840" y2="1030" stroke="%INK%" stroke-width="4"/>
    <text x="500" y="1100" font-family="Oswald, 'Arial Narrow', sans-serif" font-weight="500" font-size="40"
      letter-spacing="16" fill="%INK%" text-anchor="middle">EST. 1918 · MEMBERS ONLY</text>"""
    return svg("0 0 1000 1130", defs, body, seed=23)


def d_earned():
    defs = '<path id="§low" d="M190,560 A310,310 0 0 0 810,560" fill="none"/>'
    body = """
    <text x="500" y="190" font-family="'Black Ops One', Impact, sans-serif" font-size="190" fill="%INK%"
      text-anchor="middle" textLength="780" lengthAdjust="spacingAndGlyphs">EARNED.</text>
    <circle cx="500" cy="520" r="250" fill="none" stroke="%INK%" stroke-width="5" stroke-dasharray="22 14"/>
    <text x="500" y="500" font-family="Oswald, 'Arial Narrow', sans-serif" font-weight="700" font-size="44"
      letter-spacing="6" fill="%INK%" text-anchor="middle" opacity="0.8">LICENSED EGA ART</text>
    <text x="500" y="556" font-family="Oswald, 'Arial Narrow', sans-serif" font-weight="500" font-size="26"
      letter-spacing="5" fill="%INK%" text-anchor="middle" opacity="0.6">PLACE ARTWORK FROM USMC TLO</text>
    <text x="500" y="935" font-family="'Black Ops One', Impact, sans-serif" font-size="128" fill="%INK%"
      text-anchor="middle" textLength="820" lengthAdjust="spacingAndGlyphs">NEVER GIVEN.</text>
    <rect x="300" y="985" width="400" height="10" fill="%ACC%"/>
    <text x="500" y="1065" font-family="Oswald, 'Arial Narrow', sans-serif" font-weight="500" font-size="40"
      letter-spacing="14" fill="%INK%" text-anchor="middle">THE TITLE IS FOREVER</text>"""
    return svg("0 0 1000 1100", defs, body, seed=5, strength=0.6)


def d_anchored():
    cx, cy = 500, 560
    ticks = []
    for deg in range(0, 360, 5):
        if deg % 90 == 0:
            continue
        a = math.radians(deg)
        r1, r2 = 330, (352 if deg % 15 == 0 else 342)
        ticks.append(
            f'<line x1="{cx + r1 * math.sin(a):.1f}" y1="{cy - r1 * math.cos(a):.1f}" '
            f'x2="{cx + r2 * math.sin(a):.1f}" y2="{cy - r2 * math.cos(a):.1f}" '
            f'stroke="%INK%" stroke-width="{4 if deg % 15 == 0 else 2.5}"/>'
        )
    cardinals = "".join(
        f'<polygon points="{cx + 330 * math.sin(math.radians(d)):.1f},{cy - 330 * math.cos(math.radians(d)):.1f} '
        f'{cx + 362 * math.sin(math.radians(d - 3)):.1f},{cy - 362 * math.cos(math.radians(d - 3)):.1f} '
        f'{cx + 362 * math.sin(math.radians(d + 3)):.1f},{cy - 362 * math.cos(math.radians(d + 3)):.1f}" fill="%ACC%"/>'
        for d in (0, 90, 180, 270)
    )
    anchor_half = """
      <path d="M-12,-230 L-12,250 L0,268 Z" fill="white"/>
      <rect x="-150" y="-178" width="150" height="30" rx="8" fill="white"/>
      <circle cx="-150" cy="-163" r="22" fill="white"/>
      <path d="M-212,70 Q-200,240 0,252" stroke="white" stroke-width="32" fill="none"/>
      <path d="M-212,0 L-262,96 L-214,76 L-168,100 Z" fill="white"/>"""
    defs = f"""
    <mask id="§anc" maskUnits="userSpaceOnUse" x="-320" y="-320" width="640" height="640">
      <rect x="-320" y="-320" width="640" height="640" fill="black"/>
      <circle cx="0" cy="-262" r="36" fill="none" stroke="white" stroke-width="18"/>
      <rect x="-15" y="-232" width="30" height="480" fill="white"/>
      {mirrored(anchor_half)}
      <path id="§rope" d="M34,-262 C140,-240 108,-150 20,-128 C-80,-104 -84,-30 10,-8 C110,16 98,96 4,118
        C-90,140 -100,200 -20,214 C60,228 150,190 190,120" fill="none" stroke="black" stroke-width="30"
        stroke-linecap="round"/>
      <use href="#§rope" stroke="white" stroke-width="16"/>
      <use href="#§rope" stroke="black" stroke-width="16" stroke-dasharray="3 11"/>
    </mask>
    <path id="§top" d="M140,560 A360,360 0 0 1 860,560" fill="none"/>
    <path id="§bot" d="M100,560 A400,400 0 0 0 900,560" fill="none"/>"""
    body = f"""
    <circle cx="{cx}" cy="{cy}" r="322" fill="none" stroke="%INK%" stroke-width="6"/>
    {''.join(ticks)}{cardinals}
    <text font-family="'Black Ops One', Impact, sans-serif" font-size="74" fill="%INK%" text-anchor="middle">
      <textPath href="#§top" startOffset="50%" textLength="900" lengthAdjust="spacing">ANCHORED SINCE 1775</textPath></text>
    <text font-family="Oswald, 'Arial Narrow', sans-serif" font-weight="700" font-size="44" letter-spacing="8"
      fill="%INK%" text-anchor="middle" dy="40">
      <textPath href="#§bot" startOffset="50%">TUN TAVERN · PHILADELPHIA</textPath></text>
    <g transform="translate({cx},{cy + 20}) scale(0.82)">
      <rect x="-320" y="-320" width="640" height="640" fill="%INK%" mask="url(#§anc)"/></g>
    <text x="500" y="1075" font-family="Oswald, 'Arial Narrow', sans-serif" font-weight="500" font-size="36"
      letter-spacing="8" fill="%ACC%" text-anchor="middle">39°57′ N · 75°08′ W · 10 NOV 1775</text>"""
    return svg("0 0 1000 1100", defs, body, seed=31, strength=0.8)


def d_crayon_ration():
    def crayon(x, accent=False):
        fill = "%ACC%" if accent else "%INK%"
        return f"""
      <g transform="translate({x},0)">
        <rect x="-44" y="0" width="88" height="400" rx="6" fill="{fill}" mask="url(#§cr)"/>
        <path d="M-44,4 L-30,-60 L-10,-104 L10,-104 L30,-60 L44,4 Z" fill="{fill}"/>
      </g>"""
    # wrapper bands + vertical label are knocked out of every crayon body via one shared mask
    defs = """
    <mask id="§cr" maskUnits="userSpaceOnUse" x="-50" y="-10" width="100" height="420">
      <rect x="-50" y="-10" width="100" height="420" fill="white"/>
      <rect x="-50" y="40" width="100" height="8" fill="black"/>
      <rect x="-50" y="58" width="100" height="4" fill="black"/>
      <rect x="-50" y="338" width="100" height="4" fill="black"/>
      <rect x="-50" y="352" width="100" height="8" fill="black"/>
      <text x="0" y="200" font-family="'Black Ops One', Impact, sans-serif" font-size="44" fill="black"
        text-anchor="middle" dominant-baseline="central" transform="rotate(-90 0 200)">CRAYON</text>
    </mask>"""
    body = f"""
    <rect x="70" y="60" width="860" height="1030" fill="none" stroke="%INK%" stroke-width="10"/>
    <rect x="88" y="78" width="824" height="994" fill="none" stroke="%INK%" stroke-width="3"/>
    <text x="500" y="190" font-family="'Black Ops One', Impact, sans-serif" font-size="84" fill="%INK%"
      text-anchor="middle" textLength="760" lengthAdjust="spacingAndGlyphs">MEAL, READY-TO-COLOR</text>
    <text x="500" y="250" font-family="Oswald, 'Arial Narrow', sans-serif" font-weight="500" font-size="36"
      letter-spacing="9" fill="%INK%" text-anchor="middle">MENU NO. 1775 · CRAYON, ASSORTED</text>
    <line x1="140" y1="290" x2="860" y2="290" stroke="%INK%" stroke-width="4"/>
    <g transform="translate(0,420)">
      <g transform="rotate(-14 330 420)">{crayon(330)}</g>
      <g transform="translate(0,-30)">{crayon(500, accent=True)}</g>
      <g transform="rotate(14 670 420)">{crayon(670)}</g>
    </g>
    <line x1="140" y1="880" x2="860" y2="880" stroke="%INK%" stroke-width="4"/>
    <g font-family="Oswald, 'Arial Narrow', sans-serif" font-weight="700" font-size="38" fill="%INK%" letter-spacing="3">
      <text x="150" y="935">FLAVOR</text><text x="850" y="935" text-anchor="end">RED (OBVIOUSLY)</text>
      <text x="150" y="985">MORALE</text><text x="850" y="985" text-anchor="end">100%</text>
    </g>
    <text x="500" y="1045" font-family="Oswald, 'Arial Narrow', sans-serif" font-weight="500" font-size="28"
      letter-spacing="7" fill="%INK%" text-anchor="middle">FIELD-TESTED BY GRUNTS · NOT FOR SAILORS</text>"""
    return svg("0 0 1000 1150", defs, body, seed=17, strength=0.7)


def d_first_to_fight():
    shield = "M500,120 L840,190 C840,560 740,780 500,900 C260,780 160,560 160,190 Z"

    def star(cx, cy, r):
        pts = []
        for i in range(10):
            a = math.radians(-90 + i * 36)
            rr = r if i % 2 == 0 else r * 0.42
            pts.append(f"{cx + rr * math.cos(a):.1f},{cy + rr * math.sin(a):.1f}")
        return f'<polygon points="{" ".join(pts)}" fill="black"/>'

    defs = f"""
    <mask id="§sh" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="1100">
      <rect width="1000" height="1100" fill="black"/>
      <path d="{shield}" fill="white"/>
      <path d="{shield}" fill="none" stroke="black" stroke-width="10" transform="translate(500,510) scale(0.92) translate(-500,-510)"/>
      {star(330, 260, 26)}{star(670, 260, 26)}
      <text x="500" y="300" font-family="Oswald, 'Arial Narrow', sans-serif" font-weight="700" font-size="40"
        letter-spacing="10" fill="black" text-anchor="middle">EST. 1775</text>
      <g font-family="'Black Ops One', Impact, sans-serif" fill="black" text-anchor="middle">
        <text x="500" y="450" font-size="140" textLength="520" lengthAdjust="spacingAndGlyphs">FIRST</text>
        <text x="500" y="550" font-size="90">TO</text>
        <text x="500" y="680" font-size="130" textLength="420" lengthAdjust="spacingAndGlyphs">FIGHT</text>
      </g>
    </mask>"""
    body = """
    <rect width="1000" height="1100" fill="%INK%" mask="url(#§sh)"/>
    <rect x="150" y="955" width="700" height="80" fill="%ACC%"/>
    <text x="500" y="1010" font-family="Oswald, 'Arial Narrow', sans-serif" font-weight="700" font-size="44"
      letter-spacing="10" fill="%INK%" text-anchor="middle">IN EVERY CLIME AND PLACE</text>"""
    return svg("0 0 1000 1080", defs, body, seed=41, strength=0.8)


def d_improvise():
    # topo contour lines, generated deterministically
    lines = []
    for k in range(1, 15):
        pts = []
        for i in range(0, 361, 6):
            t = math.radians(i)
            r = 38 * k * (1 + 0.16 * math.sin(3 * t + k * 0.45) + 0.08 * math.sin(5 * t + 1.3 + k * 0.2))
            pts.append(f"{560 + r * math.cos(t) * 1.25:.1f},{600 + r * math.sin(t):.1f}")
        width = 4 if k % 5 == 0 else 2
        lines.append(f'<polygon points="{" ".join(pts)}" fill="none" stroke="%INK%" stroke-width="{width}" opacity="0.38"/>')
    defs = '<clipPath id="§clip"><rect x="40" y="60" width="920" height="1080"/></clipPath>'
    body = f"""
    <g clip-path="url(#§clip)">{''.join(lines)}</g>
    <text x="60" y="110" font-family="Oswald, 'Arial Narrow', sans-serif" font-weight="500" font-size="30"
      letter-spacing="6" fill="%INK%">GRID 18S UH 2337 0625</text>
    <text x="940" y="110" font-family="Oswald, 'Arial Narrow', sans-serif" font-weight="500" font-size="30"
      letter-spacing="6" fill="%INK%" text-anchor="end">CI 20M</text>
    <g font-family="'Black Ops One', Impact, sans-serif" fill="%INK%">
      <text x="60" y="440" font-size="190" textLength="840" lengthAdjust="spacingAndGlyphs">IMPROVISE<tspan fill="%ACC%">.</tspan></text>
      <text x="60" y="660" font-size="190" textLength="560" lengthAdjust="spacingAndGlyphs">ADAPT<tspan fill="%ACC%">.</tspan></text>
      <text x="60" y="880" font-size="190" textLength="840" lengthAdjust="spacingAndGlyphs">OVERCOME<tspan fill="%ACC%">.</tspan></text>
    </g>
    <rect x="60" y="960" width="880" height="8" fill="%INK%"/>
    <text x="60" y="1040" font-family="Oswald, 'Arial Narrow', sans-serif" font-weight="700" font-size="52"
      letter-spacing="6" fill="%INK%">THE PLAN CHANGED. WE DIDN'T.</text>"""
    return svg("0 0 1000 1160", defs, body, seed=53, strength=0.9)


def d_oorah():
    body = """
    <text x="500" y="330" font-family="'Saira Stencil One', 'Black Ops One', Impact, sans-serif" font-size="320"
      fill="%INK%" text-anchor="middle" textLength="920" lengthAdjust="spacingAndGlyphs">OORAH</text>
    <rect x="40" y="380" width="580" height="22" fill="%ACC%"/>
    <rect x="640" y="380" width="320" height="22" fill="%INK%"/>
    <text x="500" y="480" font-family="Oswald, 'Arial Narrow', sans-serif" font-weight="700" font-size="52"
      letter-spacing="4" fill="%INK%" text-anchor="middle" textLength="880" lengthAdjust="spacingAndGlyphs">PRONOUNCED WITH YOUR WHOLE CHEST</text>"""
    return svg("0 0 1000 520", "", body, seed=61, strength=1.0)


# slug, title, placement, render fn, accent label, concept, caption, flag
DESIGNS = [
    ("devil-dog-badge", "Devil Dog Badge", "Front · full chest", d_devil_dog_badge,
     "Devil Dogs", "Snarling bulldog in a studded collar under an arched DEVIL DOG, scarlet ribbon with the 1918 name the Germans gave us.",
     "They named us at Belleau Wood. We kept it. The Devil Dog tee, heavyweight and built to outlast your enlistment. Join the Fight.",
     None),
    ("kennel-club", "Devil Dog Kennel Club", "Back · full", d_kennel_club,
     "Devil Dogs", "Varsity-letter kennel club crest with one house rule. In-group humor, still respectful.",
     "Rule No. 1 is posted on the back so nobody can say they weren't briefed. Join the Fight.",
     None),
    ("earned", "Earned. Never Given.", "Front · full chest", d_earned,
     "Eagle, Globe & Anchor", "The sincere one. A statement frame built around the emblem; the EGA itself drops in from licensed art.",
     "Thirteen weeks for one emblem. Worth every day of it. Join the Fight.",
     "Needs a USMC Trademark Licensing Office license before sale. The dashed circle is the slot for the licensed EGA file."),
    ("anchored", "Anchored Since 1775", "Front · full chest", d_anchored,
     "Eagle, Globe & Anchor", "Original fouled anchor inside a compass bezel, with Tun Tavern's coordinates. Nods to the anchor in the emblem without copying it.",
     "Started in a bar in Philadelphia. Still the most Marine thing about us. Join the Fight.",
     None),
    ("crayon-ration", "Meal, Ready-to-Color", "Front · full chest", d_crayon_ration,
     "Moto humor", "Ration-pack label for a box of crayons. The red one is the hero, naturally.",
     "Menu No. 1775. Flavor: red. Field-tested by grunts, not cleared for sailors. Join the Fight.",
     None),
    ("first-to-fight", "First to Fight", "Front · full chest", d_first_to_fight,
     "Moto", "Knockout shield, stacked stencil type, scarlet hymn banner: In every clime and place.",
     "In every clime and place. Since 1775. Join the Fight.",
     None),
    ("improvise", "Improvise. Adapt. Overcome.", "Back · full", d_improvise,
     "Moto", "The unofficial motto on a topo map with a real grid reference style and scarlet periods.",
     "The plan changed. We didn't. Join the Fight.",
     None),
    ("oorah", "OORAH", "Front · chest wordmark", d_oorah,
     "Moto", "Big stencil wordmark with a scarlet-and-bone bar. Simple, loud, and cheap to print in two colors.",
     "Say it with your whole chest. Join the Fight.",
     None),
]


# --------------------------------------------------------------------------- output

def to_file(markup, slug):
    s = markup.replace("§", f"{slug}-")
    s = s.replace("%INK%", INK_DARK_GARMENT["ink"]).replace("%ACC%", INK_DARK_GARMENT["acc"])
    return s


def to_inline(markup, slug):
    s = markup.replace("§", f"{slug}-")
    s = re.sub(r"<style>@import[^<]*</style>", "", s)
    return s.replace("%INK%", "var(--ink)").replace("%ACC%", "var(--acc)")


TEE_FRONT = ("M200,40 C232,62 368,62 400,40 L522,92 L592,232 L502,272 L472,212 L472,612 "
             "C402,624 198,624 128,612 L128,212 L98,272 L8,232 L78,92 Z")


def tee(art, slug, back):
    neck = ('<path d="M206,44 C240,70 360,70 394,44" fill="none" stroke="rgba(0,0,0,.35)" stroke-width="6"/>'
            if back else
            '<path d="M200,40 C228,104 372,104 400,40" fill="rgba(0,0,0,.28)"/>'
            '<path d="M200,40 C228,104 372,104 400,40" fill="none" stroke="rgba(0,0,0,.35)" stroke-width="10"/>')
    # print area: front 250 wide at y 130, back 290 wide at y 110
    x, y, w = (155, 110, 290) if back else (175, 135, 250)
    vb = re.search(r'viewBox="([^"]+)"', art).group(1)
    inner = re.sub(r"^<svg[^>]*>|</svg>\s*$", "", art.strip())
    return f"""<svg class="tee" viewBox="0 0 600 640" role="img" aria-label="Tee mockup">
  <defs><linearGradient id="{slug}-shade" x1="0" x2="1">
    <stop offset="0" stop-color="#000" stop-opacity=".18"/><stop offset=".22" stop-color="#000" stop-opacity="0"/>
    <stop offset=".78" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".18"/>
  </linearGradient></defs>
  <path d="{TEE_FRONT}" fill="var(--shirt)"/>
  <svg x="{x}" y="{y}" width="{w}" height="{w * 1.4}" viewBox="{vb}" preserveAspectRatio="xMidYMin meet">{inner}</svg>
  <path d="{TEE_FRONT}" fill="url(#{slug}-shade)"/>
  {neck}
</svg>"""


def gallery():
    cards = []
    for slug, title, placement, fn, theme, concept, caption, flag in DESIGNS:
        art = to_inline(fn(), slug)
        back = placement.startswith("Back")
        swatches = "".join(
            f'<button type="button" class="sw" style="--c:{hexc}" data-shirt="{hexc}" data-ink="{ink["ink"]}" '
            f'data-acc="{ink["acc"]}" aria-label="{name}" title="{name}"{" aria-pressed=\"true\"" if i == (1 if not back else 0) else " aria-pressed=\"false\""}></button>'
            for i, (name, hexc, ink) in enumerate(GARMENTS)
        )
        start = GARMENTS[0 if back else 1]
        flag_html = f'<p class="flag"><b>License required.</b> {flag}</p>' if flag else ""
        cards.append(f"""
  <article class="card" style="--shirt:{start[1]};--ink:{start[2]['ink']};--acc:{start[2]['acc']}">
    <div class="stage">{tee(art, slug, back)}<span class="side">{"BACK" if back else "FRONT"}</span></div>
    <div class="meta">
      <div class="row"><span class="tag">{theme}</span><span class="file">designs/usmc/{slug}.svg</span></div>
      <h2>{title}</h2>
      <p class="place">{placement} · <span class="gname">{start[0]}</span></p>
      <div class="sws" role="group" aria-label="Garment color">{swatches}</div>
      <p>{concept}</p>
      <p class="cap"><span>Caption</span>{caption}</p>
      {flag_html}
    </div>
  </article>""")
    names = {g[1]: g[0] for g in GARMENTS}
    return f"""<title>USMC Tee Drop</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="stylesheet" href="{FONT_IMPORT}">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;600&family=IBM+Plex+Mono:wght@500&display=swap">
<style>
/* Layout: quartermaster spec sheet — header strip, then a grid of tee cards on a tan field */
:root {{
  --bg:#ECE7DC; --panel:#F6F3EC; --fg:#1E1F1C; --muted:#5E5B52; --line:#CFC7B6; --stage:#DDD5C5;
  --scarlet:#9E1B2A; --gold:#B8862B;
  --display:'Black Ops One', Impact, sans-serif; --body:Archivo, 'Helvetica Neue', Arial, sans-serif;
  --mono:'IBM Plex Mono', ui-monospace, Menlo, monospace;
}}
@media (prefers-color-scheme: dark) {{ :root:not([data-theme="light"]) {{
  --bg:#171815; --panel:#20211D; --fg:#ECE6D6; --muted:#A39E90; --line:#36372F; --stage:#2A2B25;
  --scarlet:#D2434F; --gold:#D9A447; color-scheme:dark }} }}
:root[data-theme="dark"] {{
  --bg:#171815; --panel:#20211D; --fg:#ECE6D6; --muted:#A39E90; --line:#36372F; --stage:#2A2B25;
  --scarlet:#D2434F; --gold:#D9A447; color-scheme:dark }}
body {{ background:var(--bg); color:var(--fg); font:16px/1.55 var(--body); }}
.wrap {{ max-width:1240px; margin:0 auto; padding-block:40px 64px;
  padding-left:max(16px, env(safe-area-inset-left, 0px)); padding-right:max(16px, env(safe-area-inset-right, 0px)); }}
header {{ display:grid; gap:12px; border-bottom:3px solid var(--fg); padding-bottom:20px; margin-bottom:28px; }}
.eyebrow {{ font:500 12px/1 var(--mono); letter-spacing:.14em; text-transform:uppercase; color:var(--muted); }}
h1 {{ font:400 clamp(40px, 7vw, 76px)/.95 var(--display); margin:0; text-wrap:balance; }}
h1 em {{ font-style:normal; color:var(--scarlet); }}
.lede {{ max-width:68ch; margin:0; color:var(--muted); }}
.notice {{ max-width:78ch; margin:0; padding:12px 14px; border-left:4px solid var(--scarlet); background:var(--panel); font-size:14px; }}
.grid {{ display:grid; grid-template-columns:repeat(auto-fill, minmax(min(100%, 340px), 1fr)); gap:24px; }}
.card {{ background:var(--panel); border:1px solid var(--line); display:flex; flex-direction:column; min-width:0; }}
.stage {{ background:var(--stage); position:relative; padding:18px 18px 8px; }}
.tee {{ display:block; width:100%; height:auto; max-width:100%; }}
.side {{ position:absolute; top:12px; left:12px; font:500 11px/1 var(--mono); letter-spacing:.16em; color:var(--muted); }}
.meta {{ padding:16px 18px 20px; display:grid; gap:10px; align-content:start; }}
.meta p {{ margin:0; font-size:14.5px; }}
.row {{ display:flex; justify-content:space-between; gap:8px; flex-wrap:wrap; align-items:center; }}
.tag {{ font:500 11px/1 var(--mono); letter-spacing:.12em; text-transform:uppercase; color:var(--scarlet); }}
.file {{ font:500 11px/1 var(--mono); color:var(--muted); overflow-wrap:anywhere; }}
h2 {{ font:400 28px/1.05 var(--display); margin:0; }}
.place {{ font:500 12px/1.3 var(--mono); color:var(--muted); letter-spacing:.04em; }}
.sws {{ display:flex; gap:8px; }}
.sw {{ width:28px; height:28px; border-radius:50%; border:2px solid var(--line); background:var(--c); cursor:pointer; padding:0; }}
.sw[aria-pressed="true"] {{ outline:2px solid var(--fg); outline-offset:2px; }}
.sw:focus-visible {{ outline:3px solid var(--gold); outline-offset:2px; }}
.cap {{ border-top:1px dashed var(--line); padding-top:10px; }}
.cap span {{ display:block; font:500 11px/1.6 var(--mono); letter-spacing:.12em; text-transform:uppercase; color:var(--muted); }}
.flag {{ background:color-mix(in srgb, var(--scarlet) 12%, transparent); padding:10px 12px; border-left:3px solid var(--scarlet); }}
footer {{ margin-top:36px; color:var(--muted); font-size:14px; max-width:78ch; }}
@media (prefers-reduced-motion: no-preference) {{ .tee > path:first-of-type {{ transition:fill .25s; }} }}
</style>
<div class="wrap">
<header>
  <span class="eyebrow">Mil Apparel · Marines collection · design round 1</span>
  <h1>USMC <em>Tee</em> Drop</h1>
  <p class="lede">Eight print concepts across Devil Dogs, the Eagle, Globe &amp; Anchor, and Marine humor and moto. Tap a swatch to see each design on Tactical Black, OD Green, Coyote Tan or Heather Grey. Light garments switch to black ink automatically.</p>
  <p class="notice"><b>EGA licensing.</b> The Eagle, Globe &amp; Anchor is a registered Marine Corps trademark. None of these designs reproduce it. "Earned. Never Given." is built to hold licensed EGA artwork once Mil Apparel has a license from the USMC Trademark Licensing Office.</p>
</header>
<section class="grid">{''.join(cards)}
</section>
<footer>Vector print files live in <code>designs/usmc/</code> and are generated by <code>execution/generate_usmc_tee_designs.py</code>. Convert text to outlines before sending to the printer. Accent is USMC scarlet on every design; ink is bone on dark garments and black on light ones.</footer>
</div>
<script>
const NAMES = {names!r};
document.querySelectorAll('.card').forEach(card => {{
  card.querySelectorAll('.sw').forEach(b => b.addEventListener('click', () => {{
    card.style.setProperty('--shirt', b.dataset.shirt);
    card.style.setProperty('--ink', b.dataset.ink);
    card.style.setProperty('--acc', b.dataset.acc);
    card.querySelector('.gname').textContent = NAMES[b.dataset.shirt];
    card.querySelectorAll('.sw').forEach(o => o.setAttribute('aria-pressed', String(o === b)));
  }}));
}});
</script>
"""


def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    GALLERY.parent.mkdir(parents=True, exist_ok=True)
    for slug, *_rest in DESIGNS:
        fn = _rest[2]
        (OUT_DIR / f"{slug}.svg").write_text(to_file(fn(), slug))
    GALLERY.write_text(gallery())
    print(f"wrote {len(DESIGNS)} SVGs to {OUT_DIR.relative_to(ROOT)} and gallery to {GALLERY.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
