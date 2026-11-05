import os
from PIL import Image, ImageOps, ImageEnhance, ImageFilter

MAIN_IMG = '/Users/pyw31337/.gemini/antigravity/brain/f2cbf8f6-550f-4c86-ae38-1ab752a3844e/concept1_noir_main.jpg'
INTRO_IMG = '/Users/pyw31337/.gemini/antigravity/brain/f2cbf8f6-550f-4c86-ae38-1ab752a3844e/concept1_noir_intro.jpg'
OUT_DIRS = [
    '/Users/pyw31337/.gemini/antigravity/playground/yasu/public/assets/noir',
    '/Users/pyw31337/.gemini/antigravity/playground/yasu/assets/noir',
    '/Users/pyw31337/.gemini/antigravity/brain/f2cbf8f6-550f-4c86-ae38-1ab752a3844e/noir'
]

for d in OUT_DIRS:
    os.makedirs(d, exist_ok=True)

im_main = Image.open(MAIN_IMG).convert('RGBA')
im_intro = Image.open(INTRO_IMG).convert('RGBA')

W, H = im_main.size  # 1376, 768

def save_dual(img, name):
    for d in OUT_DIRS:
        png_p = os.path.join(d, f"{name}.png")
        webp_p = os.path.join(d, f"{name}.webp")
        img.save(png_p, 'PNG', optimize=True)
        img.save(webp_p, 'WEBP', quality=95)
    print(f"Saved {name}.png and {name}.webp ({img.size})")

# 1. Full Clean Backgrounds
save_dual(im_main, "bg_noir_main")
save_dual(im_intro, "bg_noir_intro")

# 2. Top Titanium HUD Header Bar (x: 20 to 1356, y: 10 to 80)
# (1376, 768)
hud_box = (20, 10, 1356, 80)
crop_hud = im_main.crop(hud_box)
save_dual(crop_hud, "hud_header_titanium")

# Left Net Asset HUD Widget (x: 20 to 650, y: 10 to 80)
crop_asset = im_main.crop((20, 10, 650, 80))
save_dual(crop_asset, "hud_widget_asset")

# Debt HUD Widget (x: 660 to 1180, y: 10 to 80)
crop_debt = im_main.crop((660, 10, 1180, 80))
save_dual(crop_debt, "hud_widget_debt")

# 3. 3D Push Buttons from Main Screen
# Left: [시나리오 선택] (x: 110, y: 575, w: 325, h: 96)
crop_btn_scenario = im_main.crop((110, 575, 435, 672))
save_dual(crop_btn_scenario, "btn_noir_scenario")

# Hover & Active states for scenario button
enhancer = ImageEnhance.Brightness(crop_btn_scenario)
btn_sc_hover = enhancer.enhance(1.15)
save_dual(btn_sc_hover, "btn_noir_scenario_hover")
btn_sc_active = enhancer.enhance(0.9)
save_dual(btn_sc_active, "btn_noir_scenario_active")

# Center: [야수 모드 진입] (x: 508, y: 575, w: 358, h: 96)
crop_btn_beast = im_main.crop((508, 575, 866, 672))
save_dual(crop_btn_beast, "btn_noir_beastmode")

enhancer_b = ImageEnhance.Brightness(crop_btn_beast)
btn_b_hover = enhancer_b.enhance(1.2)
save_dual(btn_b_hover, "btn_noir_beastmode_hover")
btn_b_active = enhancer_b.enhance(0.85)
save_dual(btn_b_active, "btn_noir_beastmode_active")

# Right: [사채 각서 열람] (x: 900, y: 575, w: 360, h: 96)
crop_btn_debt = im_main.crop((900, 575, 1260, 672))
save_dual(crop_btn_debt, "btn_noir_debt")

enhancer_d = ImageEnhance.Brightness(crop_btn_debt)
btn_d_hover = enhancer_d.enhance(1.15)
save_dual(btn_d_hover, "btn_noir_debt_hover")
btn_d_active = enhancer_d.enhance(0.9)
save_dual(btn_d_active, "btn_noir_debt_active")

# 4. Bottom 142 BPM ECG Monitor Bar (x: 0, y: 680, w: 1376, h: 88)
crop_ecg = im_main.crop((0, 680, 1376, 768))
save_dual(crop_ecg, "monitor_noir_ecg")

# 5. Intro Screen Sprites:
# Loan Shark Boss Portrait (x: 940, y: 90, w: 410, h: 500)
crop_boss = im_intro.crop((940, 90, 1350, 650))
save_dual(crop_boss, "portrait_loanshark_boss")

# Trader Portrait (x: 30, y: 150, w: 360, h: 560)
crop_trader = im_intro.crop((30, 150, 390, 710))
save_dual(crop_trader, "portrait_trader_ant")

# Dialogue Frame & Box (x: 20, y: 540, w: 1336, h: 220)
crop_dialogue = im_intro.crop((20, 540, 1356, 760))
save_dual(crop_dialogue, "dialogue_frame_noir")

# Choice Button 1: [1. 각서에 피지장을 찍고 10억 대출] (x: 410, y: 232, w: 556, h: 72)
crop_ch1 = im_intro.crop((410, 232, 966, 304))
save_dual(crop_ch1, "btn_choice_loan10b")

# Choice Button 2: [2. 일단 종잣돈 5천만 원으로 시작] (x: 410, y: 332, w: 556, h: 72)
crop_ch2 = im_intro.crop((410, 332, 966, 404))
save_dual(crop_ch2, "btn_choice_seed50m")

# Red Ink Stamp (from Boss's hand / desk)
# Red Stamp Seal tool
stamp_crop = im_intro.crop((1055, 435, 1100, 505))
save_dual(stamp_crop, "icon_red_stamp")

# Cash stack on table (x: 520, y: 615, w: 140, h: 80)
cash_crop = im_intro.crop((520, 615, 660, 695))
save_dual(cash_crop, "icon_cash_stack")

# AUTO / SKIP / LOG buttons (x: 1025, y: 580, w: 300, h: 40)
controls_crop = im_intro.crop((1025, 580, 1325, 620))
save_dual(controls_crop, "controls_vn_noir")

print("All Noir Game Sprites Extracted Successfully in PNG and WebP!")
