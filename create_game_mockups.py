import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ASSETS_DIR = '/Users/pyw31337/.gemini/antigravity/playground/yasu/public/assets'
OUT_DIR = '/Users/pyw31337/.gemini/antigravity/playground/yasu/public/assets'
BRAIN_DIR = '/Users/pyw31337/.gemini/antigravity/brain/f2cbf8f6-550f-4c86-ae38-1ab752a3844e'

FONT_PATH = '/System/Library/Fonts/AppleSDGothicNeo.ttc'

def get_font(size, index=0):
    try:
        return ImageFont.truetype(FONT_PATH, size, index=index)
    except Exception:
        return ImageFont.load_default()

font_title_lg = get_font(84, 8)  # Heavy/Bold
font_title_md = get_font(48, 8)
font_ui_bold = get_font(32, 7)
font_ui_reg = get_font(26, 3)
font_ui_sm = get_font(20, 2)

def paste_alpha(bg, fg, pos, resize=None):
    if resize:
        fg = fg.resize(resize, Image.Resampling.LANCZOS)
    if fg.mode == 'RGBA':
        bg.paste(fg, pos, fg)
    else:
        bg.paste(fg, pos)

# ==================== CONCEPT 2: CYBERPUNK CASINO MAIN SCREEN ====================
def make_concept2_main():
    bg = Image.open(os.path.join(ASSETS_DIR, 'concept_casino.jpg')).convert('RGBA').resize((1920, 1080))
    overlay = Image.new('RGBA', (1920, 1080), (0, 0, 0, 60))
    bg = Image.alpha_composite(bg, overlay)
    draw = ImageDraw.Draw(bg)

    # Top HUD Bar
    hud = Image.open(os.path.join(ASSETS_DIR, 'hud_header.png')).convert('RGBA')
    hud = hud.resize((1500, 140))
    paste_alpha(bg, hud, (210, 20))

    # Top HUD Text
    draw.text((320, 68), "자산: 1억 2,500만 원", font=font_ui_bold, fill=(255, 230, 100))
    draw.text((750, 68), "사채 빚: 0원 (청산 완료)", font=font_ui_bold, fill=(100, 255, 180))
    draw.text((1250, 68), "LEVERAGE: x50 MAX", font=font_ui_bold, fill=(0, 240, 255))

    # Game Title
    draw.text((960, 230), "BEAST MODE", font=font_title_lg, fill=(255, 50, 80), anchor="mm")
    draw.text((960, 310), "야수의 심장 : 하이롤러 사이버 카지노", font=font_title_md, fill=(255, 255, 255), anchor="mm")

    # Card Frames (3 Trading Scenarios)
    card_frame = Image.open(os.path.join(ASSETS_DIR, 'card_frame.png')).convert('RGBA')
    c_w, c_h = 360, 480
    c_resized = card_frame.resize((c_w, c_h))

    scenarios = [
        ("1988 3저 호황", "건설/무역 트로이카", "수익률 +320%", (255, 215, 0)),
        ("1997 IMF 위기", "빅딜 & 환율 급등주", "하이리스크 극대화", (255, 60, 80)),
        ("2020 동학개미", "BBIG 올인 작전", "야수 레버리지 x100", (0, 230, 255))
    ]

    start_x = 280
    gap = 480
    for i, (title, sub, stat, col) in enumerate(scenarios):
        x = start_x + i * gap
        y = 390
        # Card inner darkened panel
        draw.rectangle([x + 25, y + 25, x + c_w - 25, y + c_h - 25], fill=(10, 16, 28, 220))
        paste_alpha(bg, c_resized, (x, y))
        draw.text((x + c_w // 2, y + 100), title, font=font_ui_bold, fill=col, anchor="mm")
        draw.text((x + c_w // 2, y + 170), sub, font=font_ui_reg, fill=(200, 220, 255), anchor="mm")
        draw.text((x + c_w // 2, y + 240), stat, font=font_ui_bold, fill=(255, 255, 255), anchor="mm")
        draw.text((x + c_w // 2, y + 360), "[ 베팅 시작 ]", font=font_ui_bold, fill=col, anchor="mm")

    # Bottom Buttons: Big Red All-in + Action Buttons
    btn_allin = Image.open(os.path.join(ASSETS_DIR, 'btn_allin.png')).convert('RGBA').resize((380, 120))
    paste_alpha(bg, btn_allin, (280, 910))

    btn_red = Image.open(os.path.join(ASSETS_DIR, 'btn_big_red.png')).convert('RGBA').resize((280, 140))
    paste_alpha(bg, btn_red, (820, 895))

    btn_lev = Image.open(os.path.join(ASSETS_DIR, 'btn_leverage.png')).convert('RGBA').resize((380, 120))
    paste_alpha(bg, btn_lev, (1260, 910))

    out_path = os.path.join(OUT_DIR, 'concept2_casino_main.jpg')
    bg.convert('RGB').save(out_path, quality=95)
    bg.convert('RGB').save(os.path.join(BRAIN_DIR, 'concept2_casino_main.jpg'), quality=95)
    print("Saved concept2_casino_main.jpg")

# ==================== CONCEPT 2: CYBERPUNK CASINO INTRO SCREEN ====================
def make_concept2_intro():
    bg = Image.open(os.path.join(ASSETS_DIR, 'concept_casino.jpg')).convert('RGBA').resize((1920, 1080))
    blur_bg = bg.filter(ImageFilter.GaussianBlur(radius=6))
    dark = Image.new('RGBA', (1920, 1080), (5, 8, 18, 140))
    bg = Image.alpha_composite(blur_bg, dark)
    draw = ImageDraw.Draw(bg)

    # Top HUD
    hud = Image.open(os.path.join(ASSETS_DIR, 'hud_header.png')).convert('RGBA').resize((1400, 120))
    paste_alpha(bg, hud, (260, 20))
    draw.text((380, 60), "STAGE: 2020 동학개미 프롤로그", font=font_ui_bold, fill=(0, 240, 255))
    draw.text((950, 60), "심박수: 156 BPM (오버클럭)", font=font_ui_bold, fill=(255, 60, 80))
    draw.text((1420, 60), "CREDIT: 10,000,000", font=font_ui_bold, fill=(255, 230, 100))

    # Center Visual Cutscene Box
    box_w, box_h = 1440, 480
    bx, by = 240, 170
    draw.rectangle([bx, by, bx + box_w, by + box_h], fill=(12, 18, 30, 235), outline=(0, 229, 255, 220), width=3)
    
    # Gold Cash Pile
    cash = Image.open(os.path.join(ASSETS_DIR, 'item_cash_gold.png')).convert('RGBA').resize((460, 460))
    paste_alpha(bg, cash, (280, 180))

    # Cutscene Text
    draw.text((790, 240), "[ AI 퀀트 시스템 경고 ]", font=font_title_md, fill=(255, 50, 80))
    draw.text((790, 320), "코스피 지수 1400P 붕괴! 역사상 최악의 패닉셀이 관측되었습니다.", font=font_ui_bold, fill=(240, 245, 255))
    draw.text((790, 380), "기관과 외국인이 5조 원을 투매하고 있습니다.", font=font_ui_bold, fill=(180, 200, 230))
    draw.text((790, 440), "야수 트레이더, 100배 레버리지로 전량 풀매수하시겠습니까?", font=font_ui_bold, fill=(0, 240, 255))
    draw.text((790, 520), "※ 경고: 실패 시 즉시 계좌가 강제 청산됩니다.", font=font_ui_reg, fill=(255, 120, 140))

    # In-Game Dialogue / Choice Buttons
    c_btn1 = Image.open(os.path.join(ASSETS_DIR, 'btn_allin.png')).convert('RGBA').resize((620, 140))
    paste_alpha(bg, c_btn1, (280, 710))
    draw.text((590, 780), "1. 삼프로 레버리지 100배 풀매수", font=font_ui_bold, fill=(255, 255, 255), anchor="mm")

    c_btn2 = Image.open(os.path.join(ASSETS_DIR, 'btn_loanshark.png')).convert('RGBA').resize((620, 140))
    paste_alpha(bg, c_btn2, (1020, 710))
    draw.text((1330, 780), "2. 사채 대출 5억 추가 조달 후 베팅", font=font_ui_bold, fill=(255, 255, 255), anchor="mm")

    # Bottom System Control Bar
    draw.rectangle([240, 910, 1680, 990], fill=(8, 12, 20, 240), outline=(255, 255, 255, 40), width=1)
    draw.text((320, 950), "[ AUTO: ON ]", font=font_ui_reg, fill=(0, 240, 255), anchor="lm")
    draw.text((540, 950), "[ SKIP ]", font=font_ui_reg, fill=(200, 200, 200), anchor="lm")
    draw.text((720, 950), "[ LOG (대화 기록) ]", font=font_ui_reg, fill=(200, 200, 200), anchor="lm")
    draw.text((1580, 950), "PRESS ENTER TO PROCEED ▶", font=font_ui_bold, fill=(255, 215, 0), anchor="rm")

    out_path = os.path.join(OUT_DIR, 'concept2_casino_intro.jpg')
    bg.convert('RGB').save(out_path, quality=95)
    bg.convert('RGB').save(os.path.join(BRAIN_DIR, 'concept2_casino_intro.jpg'), quality=95)
    print("Saved concept2_casino_intro.jpg")

# ==================== CONCEPT 3: 16-BIT RETRO ARCADE MAIN SCREEN ====================
def make_concept3_main():
    bg = Image.open(os.path.join(ASSETS_DIR, 'concept_arcade.jpg')).convert('RGBA').resize((1920, 1080))
    draw = ImageDraw.Draw(bg)

    # Top Retro Marquee
    draw.rectangle([0, 0, 1920, 100], fill=(10, 10, 15, 240), outline=(255, 190, 26, 255), width=4)
    draw.text((100, 50), "1P CREDIT: 02", font=font_title_md, fill=(255, 190, 26), anchor="lm")
    draw.text((960, 50), "★ HIGH SCORE: 999,999,000 KRW ★", font=font_title_md, fill=(255, 255, 255), anchor="mm")
    draw.text((1820, 50), "INSERT COIN", font=font_title_md, fill=(255, 50, 70), anchor="rm")

    # Center Title Marquee
    draw.rectangle([460, 160, 1460, 320], fill=(0, 0, 0, 220), outline=(255, 255, 255, 200), width=5)
    draw.text((960, 215), "BEAST OF YEOUIDO", font=font_title_lg, fill=(255, 190, 26), anchor="mm")
    draw.text((960, 280), "야수의 심장 1988 (16-BIT ARCADE EDITION)", font=font_title_md, fill=(255, 60, 80), anchor="mm")

    # 4 Arcade Scenario Cards
    card_w, card_h = 320, 380
    scenarios = [
        ("1988 3저 호황", "건설/무역 올인", "INSERT 1 COIN"),
        ("1997 IMF 환란", "부도 공포 숏베팅", "INSERT 2 COINS"),
        ("2000 IT 버블", "닷컴 열풍 10연타", "INSERT 1 COIN"),
        ("2020 동학개미", "국장 영끌 풀매수", "INSERT 3 COINS"),
    ]
    for i, (t, s, coin) in enumerate(scenarios):
        cx = 160 + i * 420
        cy = 380
        draw.rectangle([cx, cy, cx + card_w, cy + card_h], fill=(16, 24, 38, 230), outline=(255, 190, 26, 180), width=4)
        draw.text((cx + card_w // 2, cy + 80), t, font=font_ui_bold, fill=(255, 230, 100), anchor="mm")
        draw.text((cx + card_w // 2, cy + 160), s, font=font_ui_reg, fill=(255, 255, 255), anchor="mm")
        draw.text((cx + card_w // 2, cy + 260), coin, font=font_ui_bold, fill=(255, 60, 80), anchor="mm")
        draw.text((cx + card_w // 2, cy + 330), "[ SELECT ]", font=font_ui_bold, fill=(0, 229, 255), anchor="mm")

    # Bottom Arcade Control Panel Bar
    draw.rectangle([0, 840, 1920, 1080], fill=(20, 15, 10, 245), outline=(255, 190, 26, 255), width=4)
    btn_red = Image.open(os.path.join(ASSETS_DIR, 'ui_red_button.png')).convert('RGBA').resize((200, 200))
    paste_alpha(bg, btn_red, (240, 860))
    draw.text((480, 960), "● [A] 버튼 : 풀매수 (ALL-IN BUY)", font=font_ui_bold, fill=(255, 60, 80), anchor="lm")

    btn_act = Image.open(os.path.join(ASSETS_DIR, 'ui_action_buttons.png')).convert('RGBA').resize((380, 200))
    paste_alpha(bg, btn_act, (1080, 860))
    draw.text((1500, 960), "● [B] 버튼 : 사채 조달 / 탈출", font=font_ui_bold, fill=(255, 190, 26), anchor="lm")

    out_path = os.path.join(OUT_DIR, 'concept3_arcade_main.jpg')
    bg.convert('RGB').save(out_path, quality=95)
    bg.convert('RGB').save(os.path.join(BRAIN_DIR, 'concept3_arcade_main.jpg'), quality=95)
    print("Saved concept3_arcade_main.jpg")

# ==================== CONCEPT 3: 16-BIT RETRO ARCADE INTRO SCREEN ====================
def make_concept3_intro():
    bg = Image.open(os.path.join(ASSETS_DIR, 'concept_arcade.jpg')).convert('RGBA').resize((1920, 1080))
    dark = Image.new('RGBA', (1920, 1080), (0, 0, 0, 160))
    bg = Image.alpha_composite(bg, dark)
    draw = ImageDraw.Draw(bg)

    # Retro Arcade Dialogue HUD Box
    hud_f = Image.open(os.path.join(ASSETS_DIR, 'ui_hud_frame.png')).convert('RGBA').resize((1500, 520))
    paste_alpha(bg, hud_f, (210, 100))

    # Arcade Story Header
    draw.text((960, 180), "STAGE 1 : 1988 여의도 증권거래소 객장", font=font_title_md, fill=(255, 190, 26), anchor="mm")
    
    # Story Dialogue in Pixel Frame
    lines = [
        "\"손님! 건설주, 무역주가 연일 상한가 행진입니다!\"",
        "\"명동 사채시장에서 5천만 원을 빌려왔다고요?!\"",
        "\"이 판에서 살아남으면 강남 아파트가 10채, 삐끗하면 한강행입니다!\"",
        "조이스틱을 밀어 종목을 고르고, 빨간 버튼을 눌러 풀매수하십시오!"
    ]
    for i, line in enumerate(lines):
        col = (255, 255, 255) if i < 3 else (255, 60, 80)
        draw.text((320, 260 + i * 65), line, font=font_ui_bold, fill=col)

    # 2 Arcade Choice Option Boxes
    draw.rectangle([280, 680, 920, 820], fill=(20, 30, 50, 230), outline=(255, 190, 26, 255), width=3)
    draw.text((600, 750), "▶ [1P START] 3저 호황 건설주 몰빵", font=font_ui_bold, fill=(255, 230, 100), anchor="mm")

    draw.rectangle([1000, 680, 1640, 820], fill=(40, 20, 20, 230), outline=(255, 60, 80, 255), width=3)
    draw.text((1320, 750), "▶ [2P START] 사채 계약서 추가 작성", font=font_ui_bold, fill=(255, 80, 100), anchor="mm")

    # Bottom CRT Scanline Prompt
    draw.rectangle([0, 920, 1920, 1080], fill=(0, 0, 0, 240), outline=(255, 255, 255, 50), width=2)
    draw.text((960, 980), "★ PRESS 1P PUSH BUTTON TO START GAME ★", font=font_title_md, fill=(255, 190, 26), anchor="mm")
    draw.text((960, 1035), "CREDIT(S) 02    TIME 99", font=font_ui_bold, fill=(200, 200, 200), anchor="mm")

    out_path = os.path.join(OUT_DIR, 'concept3_arcade_intro.jpg')
    bg.convert('RGB').save(out_path, quality=95)
    bg.convert('RGB').save(os.path.join(BRAIN_DIR, 'concept3_arcade_intro.jpg'), quality=95)
    print("Saved concept3_arcade_intro.jpg")

# ==================== CONCEPT 4: K-WEBTOON HYPER ACTION MAIN SCREEN ====================
def make_concept4_main():
    bg = Image.open(os.path.join(ASSETS_DIR, 'key_art.jpg')).convert('RGBA').resize((1920, 1080))
    overlay = Image.new('RGBA', (1920, 1080), (10, 5, 20, 60))
    bg = Image.alpha_composite(bg, overlay)
    draw = ImageDraw.Draw(bg)

    # Top Webtoon Style HUD Bar
    draw.polygon([(80, 20), (1840, 20), (1780, 120), (20, 120)], fill=(15, 20, 35, 240), outline=(255, 51, 75, 255))
    draw.text((140, 70), "HP (순자산) : 50,000,000 KRW", font=font_ui_bold, fill=(255, 220, 80), anchor="lm")
    draw.text((800, 70), "DEBT (사채 족쇄) : 300,000,000 KRW", font=font_ui_bold, fill=(255, 60, 80), anchor="lm")
    draw.text((1550, 70), "야수의 분노 게이지 : 99%", font=font_ui_bold, fill=(0, 240, 255), anchor="lm")

    # Manhwa Comic Sound Typography Calligraphy
    draw.text((960, 220), "콰 아 아 앙 !", font=font_title_lg, fill=(255, 50, 70), anchor="mm")
    draw.text((960, 320), "야 수 의   심 장", font=font_title_lg, fill=(255, 255, 255), anchor="mm")
    draw.text((960, 390), "HEART OF THE BEAST : K-WEBTOON ACTION", font=font_ui_bold, fill=(255, 215, 0), anchor="mm")

    # Trader Sprite on Left, Loan Shark on Right
    trader = Image.open(os.path.join(ASSETS_DIR, 'sprite_trader.png')).convert('RGBA').resize((460, 620))
    paste_alpha(bg, trader, (80, 380))

    boss = Image.open(os.path.join(ASSETS_DIR, 'sprite_loanshark.png')).convert('RGBA').resize((460, 620))
    paste_alpha(bg, boss, (1380, 380))

    # Center Comic Action Menu
    draw.rectangle([580, 480, 1340, 860], fill=(12, 16, 26, 230), outline=(255, 190, 26, 220), width=4)
    draw.text((960, 530), "◆ 결전의 무대를 선택하라 ◆", font=font_title_md, fill=(255, 220, 80), anchor="mm")

    menu_items = [
        ("[ EP.1 ] 1988 호황기 - 탐욕의 서막", (255, 255, 255)),
        ("[ EP.2 ] 1997 환란 - 지옥의 외줄타기", (255, 100, 100)),
        ("[ EP.3 ] 2020 동학개미 - 야수들의 반격", (100, 220, 255)),
    ]
    for i, (m, c) in enumerate(menu_items):
        my = 610 + i * 75
        draw.rectangle([620, my - 25, 1300, my + 35], fill=(25, 35, 55, 200), outline=(255, 255, 255, 50), width=2)
        draw.text((960, my + 5), m, font=font_ui_bold, fill=c, anchor="mm")

    # Mega Red All-in Push Button
    btn_red = Image.open(os.path.join(ASSETS_DIR, 'btn_big_red.png')).convert('RGBA').resize((280, 140))
    paste_alpha(bg, btn_red, (820, 895))

    out_path = os.path.join(OUT_DIR, 'concept4_webtoon_main.jpg')
    bg.convert('RGB').save(out_path, quality=95)
    bg.convert('RGB').save(os.path.join(BRAIN_DIR, 'concept4_webtoon_main.jpg'), quality=95)
    print("Saved concept4_webtoon_main.jpg")

# ==================== CONCEPT 4: K-WEBTOON HYPER ACTION INTRO SCREEN ====================
def make_concept4_intro():
    bg = Image.open(os.path.join(ASSETS_DIR, 'key_art.jpg')).convert('RGBA').resize((1920, 1080))
    blur = bg.filter(ImageFilter.GaussianBlur(radius=8))
    dark = Image.new('RGBA', (1920, 1080), (10, 5, 20, 170))
    bg = Image.alpha_composite(blur, dark)
    draw = ImageDraw.Draw(bg)

    # 3 Comic Webtoon Cut Panels
    # Panel 1: Desperate Trader
    trader = Image.open(os.path.join(ASSETS_DIR, 'sprite_trader.png')).convert('RGBA').resize((380, 520))
    draw.rectangle([120, 120, 560, 660], fill=(0, 0, 0, 200), outline=(255, 255, 255, 220), width=4)
    paste_alpha(bg, trader, (150, 130))

    # Panel 2: Blood Debt Contract Stamp
    stamp = Image.open(os.path.join(ASSETS_DIR, 'item_debt_contract.png')).convert('RGBA').resize((460, 460))
    draw.rectangle([600, 120, 1260, 660], fill=(20, 10, 10, 230), outline=(255, 60, 80, 255), width=5)
    paste_alpha(bg, stamp, (680, 150))
    draw.text((930, 600), "「 목 숨 을   담 보 로   빌 린   돈 」", font=font_title_md, fill=(255, 60, 80), anchor="mm")

    # Panel 3: Ruthless Loan Shark Boss
    boss = Image.open(os.path.join(ASSETS_DIR, 'sprite_loanshark.png')).convert('RGBA').resize((400, 520))
    draw.rectangle([1300, 120, 1800, 660], fill=(0, 0, 0, 200), outline=(255, 255, 255, 220), width=4)
    paste_alpha(bg, boss, (1340, 130))

    # Webtoon Dramatic Dialogue Balloon
    draw.rectangle([120, 710, 1800, 910], fill=(15, 20, 32, 245), outline=(255, 215, 0, 255), width=4)
    draw.text((180, 755), "[ 프롤로그 : 야수의 각성 ]", font=font_ui_bold, fill=(255, 215, 0))
    draw.text((180, 815), "\"시장이 무너진다고 내가 무너질 것 같으냐? 빚 3억이든 30억이든 전부 내 밑으로 꿇려주마!\"", font=font_title_md, fill=(255, 255, 255))
    draw.text((180, 870), "마동석 사채왕의 도장이 계약서에 찍히고, 당신의 심박수가 180 BPM을 돌파합니다.", font=font_ui_reg, fill=(255, 120, 140))

    # Choice Action Bars
    draw.rectangle([120, 940, 940, 1040], fill=(225, 29, 72, 230), outline=(255, 255, 255, 200), width=2)
    draw.text((530, 990), "▶ [선택 1] 계약서에 서명하고 작전주 풀매수", font=font_ui_bold, fill=(255, 255, 255), anchor="mm")

    draw.rectangle([980, 940, 1800, 1040], fill=(245, 158, 11, 230), outline=(255, 255, 255, 200), width=2)
    draw.text((1390, 990), "▶ [선택 2] 동학개미 군단을 소집해 맞불 작전", font=font_ui_bold, fill=(0, 0, 0), anchor="mm")

    out_path = os.path.join(OUT_DIR, 'concept4_webtoon_intro.jpg')
    bg.convert('RGB').save(out_path, quality=95)
    bg.convert('RGB').save(os.path.join(BRAIN_DIR, 'concept4_webtoon_intro.jpg'), quality=95)
    print("Saved concept4_webtoon_intro.jpg")

if __name__ == '__main__':
    make_concept2_main()
    make_concept2_intro()
    make_concept3_main()
    make_concept3_intro()
    make_concept4_main()
    make_concept4_intro()
    print("ALL 4 GAME CONCEPTS GENERATED SUCCESSFULLY!")
