"""Rebuild the 2027 CT state competition bid form as a printable, fillable PDF."""

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase.acroform import AcroForm
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "src/docs/2027-state-bid-form.pdf"
LOGO = ROOT / "src/images/ct-usag-logo-clr-horiz.png"
W, H = A4
NAVY = colors.HexColor("#142C4B")
RED = colors.HexColor("#BA1720")
PALE = colors.HexColor("#F1F5F9")
GRAY = colors.HexColor("#5A6775")
BORDER = colors.HexColor("#A9B6C4")

c = canvas.Canvas(str(OUTPUT), pagesize=A4, pageCompression=1)
c.setTitle("2027 Connecticut State Competition Bid Form")
c.setAuthor("Connecticut Women's USA Gymnastics")
form = c.acroForm


def label(x, y, text, size=9, bold=False, color=NAVY):
    c.setFillColor(color)
    c.setFont("Helvetica-Bold" if bold else "Helvetica", size)
    c.drawString(x, y, text)


def field(name, title, x, y, width, height=20):
    label(x, y + height + 4, title, 8, True, GRAY)
    form.textfield(
        name=name, tooltip=title, x=x, y=y, width=width, height=height,
        borderWidth=0.8, borderStyle="solid", borderColor=BORDER,
        fillColor=colors.white, textColor=NAVY,
        forceBorder=True, fontName="Helvetica", fontSize=10,
    )


def section(y, text):
    c.setFillColor(PALE)
    c.roundRect(40, y - 6, W - 80, 23, 4, fill=1, stroke=0)
    label(50, y + 1, text.upper(), 10, True)


def checkbox(name, x, y):
    form.checkbox(
        name=name, tooltip=name.replace("_", " "), x=x, y=y, size=13,
        buttonStyle="check", borderWidth=0.9, borderColor=NAVY,
        fillColor=colors.white, textColor=NAVY, forceBorder=True,
    )


def footer(page):
    c.setStrokeColor(BORDER)
    c.line(40, 45, W - 40, 45)
    label(40, 30, "2027 Connecticut State Competition Bid Form", 7, color=GRAY)
    label(W - 73, 30, f"Page {page} of 2", 7, color=GRAY)


# Page 1: application fields and selected competition(s)
c.drawImage(str(LOGO), 40, 780, width=140, height=35, preserveAspectRatio=True, mask="auto")
label(196, 800, "2027 STATE COMPETITION BID FORM", 14, True)
label(196, 784, "Connecticut Women's USA Gymnastics", 9, color=GRAY)
c.setFillColor(PALE)
c.roundRect(40, 732, W - 80, 35, 5, fill=1, stroke=0)
label(52, 746, "BID DEADLINE: SEPTEMBER 22, 2026", 10, True, RED)
label(52, 734, "Complete both pages; email the finished form to Kim Vaillancourt.", 8, color=GRAY)

section(702, "Host gym")
field("host_gym_name", "Host gym name", 40, 663, W - 80)

section(636, "Meet director information")
label(40, 612, "Meet director certification is required.", 8, color=GRAY)
field("director_name", "Meet director name", 40, 577, 240)
field("director_usag_number", "USAG number", 294, 577, 100)
field("director_email", "Email", 408, 577, W - 448)
field("director_address", "Street address", 40, 538, W - 80)
field("director_city", "City", 40, 499, 270)
field("director_state", "State", 324, 499, 70)
field("director_zip", "ZIP code", 408, 499, W - 448)
field("gym_phone", "Gym phone", 40, 460, 244)
field("cell_phone", "Cell phone", 298, 460, W - 338)
label(40, 443, "Meets conducted in the past two years", 8, True, GRAY)
field("local_meets", "Local", 40, 409, 104)
field("state_meets", "State", 158, 409, 104)
field("invitational_meets", "Invitational", 276, 409, 104)
field("largest_meet_athletes", "Athletes at largest meet", 394, 409, W - 434)

section(378, "Facility information")
label(40, 355, "State meets cannot be held inside a gymnastics facility.", 8, color=GRAY)
field("facility_name", "Facility name", 40, 321, W - 80)
field("facility_address", "Street address", 40, 282, W - 80)
field("facility_city", "City", 40, 243, 270)
field("facility_state", "State", 324, 243, 70)
field("facility_zip", "ZIP code", 408, 243, W - 448)
field("competition_area_size", "Competition area size", 40, 204, 220)
field("spectator_capacity", "Spectator capacity", 274, 204, 160)
label(448, 228, "Accessible?", 8, True, GRAY)
checkbox("accessible_yes", 448, 206)
label(465, 209, "Yes", 8)
checkbox("accessible_no", 502, 206)
label(519, 209, "No", 8)

section(175, "Competition(s) requested")
label(40, 153, "Outside facility and three full competition days required for each selection.", 8, color=GRAY)
for name, y, title, dates in [
    ("bid_levels_4_to_10", 127, "Level 4-10 State Championships", "March 19-21, 2027"),
    ("bid_xcel_gold_to_sapphire", 99, "Xcel Gold, Platinum, Diamond & Sapphire", "April 30-May 2, 2027"),
    ("bid_xcel_bronze_silver_levels_2_3", 71, "Xcel Bronze & Silver; Levels 2-3", "May 14-16, 2027"),
]:
    checkbox(name, 44, y)
    label(65, y + 4, title, 8.7, True)
    label(366, y + 4, dates, 8.2, color=GRAY)
footer(1)
c.showPage()


# Page 2: terms and certification
label(40, 800, "2027 STATE COMPETITION BID FORM", 14, True)
label(40, 784, "Responsibilities, financial overview and certification", 9, color=GRAY)
section(752, "Meet director income")
label(40, 725, "The meet director receives income from:", 9)
for x, y, item in [
    (52, 701, "Athlete entry fees"), (300, 701, "Spectator admission"),
    (52, 681, "Program sales"), (300, 681, "Advertising"),
    (52, 661, "Concession sales"),
]:
    label(x, y, "- " + item, 9)

section(630, "Meet director expenses and requirements")
items = [
    "Facility/site rental",
    "Equipment rental or purchase; email proof of DGS contract",
    "USAG-sanctioned officials",
    "USAG State Medals and Team Banners, purchased through A-1 Awards",
    "State Chair determines medal and banner design and selection",
    "Meet paperwork and administrative costs",
    "USAGR6 fee per athlete (TBD); USAGCT fee of $5 per athlete",
    "USAG sanction fee; apply through USAG for event insurance",
    "Complete financial report and meet sanction closing documents",
    "Email PTF and first page of sanction",
    "Decorations and event setup; medical personnel",
    "Experienced Pro-Score personnel",
    "Judge accommodations, if applicable",
    "Designated judges room/hospitality and coaches area/hospitality",
]
for i, item in enumerate(items):
    label(50, 603 - i * 22, "- " + item, 8.7)

c.setFillColor(PALE)
c.roundRect(40, 250, W - 80, 42, 4, fill=1, stroke=0)
label(50, 273, "Equipment contract after approval", 9, True)
label(50, 258, "Within one week, email the Deary's Gymnastics Supply contract to kimvail45@gmail.com.", 8.5)

label(40, 229, "A club that violates USAG or USAGCT guidelines may lose future state-hosting privileges.", 8.5)
section(206, "Certification")
label(40, 184, "I certify that the information provided is accurate and agree to follow the USAG Women's", 8.8)
label(40, 171, "Rules & Policies in conducting this meet.", 8.8)
field("printed_director_name", "Meet director (print)", 40, 127, 234)
field("signature", "Signature (sign after printing)", 287, 127, 188)
field("signature_date", "Date", 488, 127, W - 528)
c.setFillColor(PALE)
c.roundRect(40, 64, W - 80, 48, 4, fill=1, stroke=0)
label(50, 95, "SUBMIT COMPLETED FORM", 9, True, RED)
label(50, 81, "Email to Kim Vaillancourt: kimvail45@gmail.com", 9, True)
label(50, 68, "After approval, you will receive the USAG-CT hosting packet and required documents.", 8)
footer(2)
c.save()
print(OUTPUT)
