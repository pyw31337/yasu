// 대한민국 증시 1980 ~ 2026 역사적 사건, 환율, 금리 및 실존 종목 데이터베이스
export const HISTORICAL_YEARS = {
  1980: {
    year: 1980,
    era: "Ch.1 명동 큰손과 여의도 증시의 여명",
    kospi: 106.87,
    kospiChange: -0.12,
    exchangeRate: 660,
    exchangeRateChange: 0.36, // 환율 급등
    interestRate: 20.0,
    headline: "10·26 이후 격동의 정국, 제2차 오일쇼크로 물가 폭등과 경기 침체",
    eventDetail: "1979년 10·26 사건과 12·12 군사반란 이후 정국 불안이 극에 달했습니다. 제2차 석유파동으로 유가가 배럴당 30달러를 돌파하며 대한민국 경제성장률은 정부 수립 후 최초로 마이너스(-1.6%)를 기록했습니다. 명동 사채시장이 기업 자금의 40% 이상을 주무르던 암흑기였습니다.",
    brokerTip: "명동 사채골목 소식통: '지금 은행에 돈 넣어봐야 인플레로 다 녹습니다. 달러나 제약주를 쥐고 버티는 게 상책입니다.'",
    isTrap: false,
    stocks: [
      { code: "000100", name: "유한양행", category: "대형우량주", price: 3500, rate: 0.18, detail: "필수의약품 수요 지속과 안정적 재무구조로 위기 속 견고한 실적 달성" },
      { code: "000010", name: "조흥은행", category: "금융주", price: 1200, rate: -0.15, detail: "부실기업 대출 부실화 우려와 고금리 충격으로 은행주 동반 침체" },
      { code: "001220", name: "한보철강공업", category: "건설/철강", price: 2100, rate: -0.35, detail: "오일쇼크로 중동 특수 둔화, 건설경기 급랭으로 자금난 직면" },
      { code: "USD/KRW", name: "미국 달러(USD)", category: "안전자산", price: 660, rate: 0.36, detail: "달러 환율 급등, 원화 가치 급락으로 달러 보유자 막대한 환차익" }
    ]
  },
  1981: {
    year: 1981,
    era: "Ch.1 명동 큰손과 여의도 증시의 여명",
    kospi: 131.37,
    kospiChange: 0.23,
    exchangeRate: 700,
    exchangeRateChange: 0.06,
    interestRate: 18.5,
    headline: "제5공화국 출범 및 자본시장 국제화 계획 발표... 증시 급반등",
    eventDetail: "전두환 정부가 출범하며 강력한 물가 억제 정책과 함께 '자본시장 국제화 10개년 계획'을 발표했습니다. 장외주식과 명동 사채에 묶여있던 유동성이 서서히 여의도 증권시장으로 유입되며 반등의 서막이 올랐습니다.",
    brokerTip: "명동 브로커: '정부가 건설과 자동차를 밀어준답니다. 정주영 회장의 현대차를 눈여겨보쇼.'",
    isTrap: false,
    stocks: [
      { code: "005380", name: "현대자동차", category: "제조/자동차", price: 4200, rate: 0.45, detail: "국산 고유 모델 '포니'의 대미/해외 수출 호조와 자동차공업 합리화 조치 수혜" },
      { code: "005930", name: "삼성전자", category: "대형우량주", price: 5800, rate: 0.28, detail: "컬러TV 국내 방송 개시와 가전제품 수출 확대로 매출 급증" },
      { code: "000010", name: "조흥은행", category: "금융주", price: 1100, rate: -0.05, detail: "여전히 높은 부실여신 부담과 정부 통제로 주가 횡보" },
      { code: "USD/KRW", name: "미국 달러(USD)", category: "안전자산", price: 700, rate: 0.06, detail: "환율 안정화 기조 속에 완만한 오름세 유지" }
    ]
  },
  1982: {
    year: 1982,
    era: "Ch.1 명동 큰손과 여의도 증시의 여명",
    kospi: 127.99,
    kospiChange: -0.03,
    exchangeRate: 748,
    exchangeRateChange: 0.07,
    interestRate: 14.0,
    headline: "건국 이래 최대 금융스캔들! '이철희·장영자 6,400억 어음 사기' 발각",
    eventDetail: "전두환 대통령의 처삼촌 부부인 장영자·이철희가 거액의 사채를 미끼로 기업들에 약속어음을 받아 이를 사채시장에 할인 유통한 초대형 사기 사건이 터졌습니다. 일신제강, 공영토건 등 굴지의 대기업들이 연쇄 부도 처리되고 은행장들이 대거 구속되며 금융권이 마비되었습니다.",
    brokerTip: "여의도 객장 루머: '일신제강 어음 부도 났답니다! 은행주랑 철강주 다 던지고 도망치세요!'",
    isTrap: false,
    stocks: [
      { code: "000010", name: "조흥은행", category: "부도/작전주", price: 680, rate: -0.42, detail: "장영자 어음 사기에 가장 깊이 연루되어 은행장 구속 및 초대형 충당금 폭탄" },
      { code: "000100", name: "유한양행", category: "대형우량주", price: 4100, rate: 0.15, detail: "사채 시장 스캔들과 무관한 청렴 경영으로 투자자들의 안전 피난처 역할" },
      { code: "005930", name: "삼성전자", category: "대형우량주", price: 6100, rate: 0.08, detail: "반도체 사업 진출 선언 준비 속 금융 충격에도 비교적 선방" },
      { code: "USD/KRW", name: "미국 달러(USD)", category: "안전자산", price: 748, rate: 0.07, detail: "금융시장 신뢰 추락으로 안전자산 달러 수요 지속" }
    ]
  },
  1983: {
    year: 1983,
    era: "Ch.1 명동 큰손과 여의도 증시의 여명",
    kospi: 121.21,
    kospiChange: -0.05,
    exchangeRate: 795,
    exchangeRateChange: 0.06,
    interestRate: 12.0,
    headline: "이병철 회장의 '도쿄 선언' 단행! '삼성, 64K D램 반도체 본격 진출'",
    eventDetail: "삼성그룹 이병철 회장이 주변의 격렬한 만류를 뿌리치고 도쿄에서 반도체 사업 진출을 공식 선언했습니다. 당시 미국과 일본 언론은 '3년 안에 실패할 무모한 도박'이라고 조롱했습니다. 그러나 이것이 훗날 대한민국을 반도체 초강국으로 이끈 역사적 전환점이 됩니다.",
    brokerTip: "증권사 객장 아저씨: '삼성이 반도체 한다는데 TV나 만들지 무슨 칩이냐고 다들 비웃더라고... 사지 마쇼.'",
    isTrap: true, // 낚시 팁 (역발상으로 사야 대박)
    stocks: [
      { code: "005930", name: "삼성전자", category: "대형우량주", price: 7900, rate: 0.35, detail: "64K D램 개발 착수와 함께 그룹 역량 총결집, 가파른 밸류업 시작" },
      { code: "005380", name: "현대자동차", category: "제조/자동차", price: 4600, rate: 0.10, detail: "캐나다 시장 진출 타진 등 글로벌 수출 거점 확대" },
      { code: "000010", name: "조흥은행", category: "금융주", price: 650, rate: -0.05, detail: "금융사고 후유증 치유 중이나 구조조정 지연으로 주가 바닥권 횡보" },
      { code: "USD/KRW", name: "미국 달러(USD)", category: "안전자산", price: 795, rate: 0.06, detail: "수출 경쟁력 유지를 위한 관리변동환율제 속 소폭 상승" }
    ]
  },
  1985: {
    year: 1985,
    era: "Ch.1 명동 큰손과 여의도 증시의 여명",
    kospi: 163.37,
    kospiChange: 0.15,
    exchangeRate: 890,
    exchangeRateChange: 0.08,
    interestRate: 10.0,
    headline: "G5 플라자 합의(Plaza Accord) 전격 체결! 엔화 가치 폭등, 한국에 초대형 기회",
    eventDetail: "미국 뉴욕 플라자 호텔에서 미국, 일본, 독일 등 5개국 재무장관이 달러 약세와 엔화 절상을 유도하는 합의를 맺었습니다. 엔화 가치가 치솟으면서 일본산 제품과 경쟁하던 한국의 자동차, 조선, 전자제품의 가격경쟁력이 상상을 초월할 정도로 치솟기 시작했습니다.",
    brokerTip: "여의도 외환 딜러: '일본 엔화가 2배로 폭등합니다! 일본과 경쟁하는 수출 대기업 주식 꽉 잡으세요!'",
    isTrap: false,
    stocks: [
      { code: "005380", name: "현대자동차", category: "광풍테마주", price: 7800, rate: 0.65, detail: "엔고 수혜로 미국 수출길 대폭 확대, '엑셀' 신화 준비" },
      { code: "005930", name: "삼성전자", category: "대형우량주", price: 11500, rate: 0.42, detail: "일본 가전/반도체 대비 압도적 가격경쟁력 확보로 실적 폭발" },
      { code: "001220", name: "한보철강공업", category: "건설/철강", price: 1800, rate: -0.10, detail: "플라자 합의 훈풍에도 과도한 차입금으로 고전" },
      { code: "USD/KRW", name: "미국 달러(USD)", category: "안전자산", price: 890, rate: 0.08, detail: "플라자 합의 직후 달러화는 정점을 찍고 향후 원화 강세 전환 예고" }
    ]
  },
  1986: {
    year: 1986,
    era: "Ch.1 명동 큰손과 여의도 증시의 여명",
    kospi: 272.61,
    kospiChange: 0.67,
    exchangeRate: 861,
    exchangeRateChange: -0.03,
    interestRate: 8.0,
    headline: "단군 이래 최대 호황 '3저 호황(저유가·저달러·저금리)' 도래! 아시안게임 개최",
    eventDetail: "기름값 하락, 국제 금리 하락, 원화 절상(엔화 대비 상대적 약세)의 '3저 현상'이 겹치며 한국 역사상 최초로 경상수지 흑자를 달성했습니다. 코스피는 한 해 동안 무려 67% 폭등하며 전 국민이 주식 시장으로 뛰어들기 시작했습니다.",
    brokerTip: "증권사 명동지점장: '트로이카(금융·무역·건설) 장세입니다! 아무 증권주나 잡으면 3배 갑니다!'",
    isTrap: false,
    stocks: [
      { code: "003550", name: "LG(럭키금성)", category: "대형우량주", price: 9200, rate: 0.78, detail: "화학 및 전자 부문 사상 최대 흑자 달성으로 그룹주 동반 폭등" },
      { code: "005930", name: "삼성전자", category: "대형우량주", price: 21000, rate: 0.82, detail: "반도체 1M D램 개발 성공과 3저 호황에 힘입어 주가 수직 상승" },
      { code: "000010", name: "조흥은행", category: "광풍테마주", price: 1350, rate: 0.95, detail: "트로이카 금융주 열풍으로 묻지마 매수세 집중되며 단기 2배 급등" },
      { code: "USD/KRW", name: "미국 달러(USD)", category: "안전자산", price: 861, rate: -0.03, detail: "사상 첫 무역흑자로 달러화 가치 하락 및 원화 강세 시작" }
    ]
  },
  1988: {
    year: 1988,
    era: "Ch.1 명동 큰손과 여의도 증시의 여명",
    kospi: 907.20,
    kospiChange: 0.72,
    exchangeRate: 684,
    exchangeRateChange: -0.14,
    interestRate: 8.0,
    headline: "손에 손잡고! '88 서울 올림픽' 개최 및 국민주 포항제철 상장 열풍",
    eventDetail: "서울 올림픽 성공 개최와 함께 대한민국이 세계 무대에 당당히 데뷔했습니다. 정부는 국민 재산 형성을 명분으로 '국민주 1호' 포항제철(현 POSCO) 공모를 단행했고, 전 국민 320만 명이 청약통장에 줄을 서는 진풍경이 벌어졌습니다. 증시는 1,000포인트를 눈앞에 두었습니다.",
    brokerTip: "국민주 청약 브로커: '포철 공모주 안 받으면 역적 소리 듣습니다! 상장 즉시 따블입니다!'",
    isTrap: false,
    stocks: [
      { code: "005490", name: "포항제철(POSCO)", category: "대형우량주", price: 34000, rate: 1.25, detail: "국민주 1호 공모가 15,000원에 상장 후 연일 상한가 행진, 2배 이상 폭등" },
      { code: "005380", name: "현대자동차", category: "제조/자동차", price: 24000, rate: 0.60, detail: "소나타 출시 및 글로벌 판매 100만 대 돌파로 주가 전성기 구가" },
      { code: "000010", name: "조흥은행", category: "금융주", price: 2900, rate: 0.70, detail: "증시 거래대금 폭증과 트로이카 테마 지속으로 신고가 갱신" },
      { code: "USD/KRW", name: "미국 달러(USD)", category: "안전자산", price: 684, rate: -0.14, detail: "올림픽 특수와 막대한 무역흑자로 원/달러 환율 600원대 진입" }
    ]
  },
  1989: {
    year: 1989,
    era: "Ch.2 깡통계좌와 자본시장 개방",
    kospi: 909.72,
    kospiChange: 0.00,
    exchangeRate: 679,
    exchangeRateChange: -0.01,
    interestRate: 11.0,
    headline: "역사상 최초 KOSPI 1,000pt 돌파! 그러나 12·12 증시부양책의 비극 잉태",
    eventDetail: "1989년 3월 31일, 꿈의 '종합주가지수 1,000포인트'를 사상 최초로 돌파했습니다. 복덕방 할머니부터 구두닦이 소년까지 빚을 내어 주식에 뛰어들었습니다. 주가가 흔들리자 노태우 정부는 12월 12일 한은 발권력까지 동원해 투신사들에게 무제한 주식 매입을 명령하는 무리수를 두었습니다.",
    brokerTip: "여의도 큰손: '정부가 12.12 부양책으로 주가 무조건 받쳐준답니다! 신용 땡겨서 영끌 매수하세요!'",
    isTrap: true, // 역사적 함정! 12.12 부양책 믿고 영끌한 개미들 깡통 참사 발생
    stocks: [
      { code: "005930", name: "삼성전자", category: "대형우량주", price: 31000, rate: -0.08, detail: "1000pt 고점 달성 후 차익 실현 매물 폭탄으로 조정 진입" },
      { code: "000010", name: "조흥은행", category: "금융주", price: 2700, rate: -0.15, detail: "트로이카 테마 붕괴 및 신용융자 매물 압박으로 하락 전환" },
      { code: "001220", name: "한보철강공업", category: "부도/작전주", price: 4200, rate: 0.40, detail: "당진 제철소 건설 추진 소식으로 작전 세력 유입되어 반짝 폭등" },
      { code: "USD/KRW", name: "미국 달러(USD)", category: "안전자산", price: 679, rate: -0.01, detail: "환율은 670원선에서 팽팽한 바닥 다지기" }
    ]
  },
  1990: {
    year: 1990,
    era: "Ch.2 깡통계좌와 자본시장 개방",
    kospi: 696.11,
    kospiChange: -0.23,
    exchangeRate: 716,
    exchangeRateChange: 0.05,
    interestRate: 15.0,
    headline: "10·10 깡통계좌 강제 정리 단행! 여의도 객장 방화와 자살 속출",
    eventDetail: "주가가 끝없이 폭락하자, 증권당국은 10월 10일 신용융자 담보비율을 채우지 못한 개미들의 주식을 하한가에 강제 일괄 매각하는 '깡통계좌 일제 정리'를 단행했습니다. 하루아침에 전 재산을 잃고 빚더미에 오른 투자자들이 증권사 객장에 시너를 뿌리고 불을 지르는 유혈 사태가 잇따랐습니다.",
    brokerTip: "객장 직원 비명: '증권사가 내일 아침 시초가 하한가로 신용계좌 다 털어버린답니다! 살려주세요!'",
    isTrap: false,
    stocks: [
      { code: "000010", name: "조흥은행", category: "금융주", price: 1500, rate: -0.45, detail: "깡통계좌 강제정리 폭탄 매물로 하한가 속출, 금융주 전멸" },
      { code: "005380", name: "현대자동차", category: "제조/자동차", price: 16000, rate: -0.30, detail: "노사분규와 원화 절상 후유증, 경기 침체로 주가 폭락" },
      { code: "005930", name: "삼성전자", category: "대형우량주", price: 26000, rate: -0.16, detail: "시장 대폭락 속에서도 16M D램 개발 지속으로 상대적 방어" },
      { code: "USD/KRW", name: "미국 달러(USD)", category: "안전자산", price: 716, rate: 0.05, detail: "증시 대폭락과 무역적자 재반전으로 달러 환율 상승 반전" }
    ]
  },
  1993: {
    year: 1993,
    era: "Ch.2 깡통계좌와 자본시장 개방",
    kospi: 866.18,
    kospiChange: 0.28,
    exchangeRate: 808,
    exchangeRateChange: 0.02,
    interestRate: 12.0,
    headline: "8·12 전격 단행! 김영삼 대통령 '금융실명제 긴급재정명령' 발동",
    eventDetail: "1993년 8월 12일 저녁 7시 45분, 김영삼 대통령이 TV 생방송을 통해 차명 금융거래를 전면 금지하는 '금융실명제'를 전격 발표했습니다. 지하경제의 검은돈이 마비되며 다음 날 증시는 일시 하한가 사태를 빚었으나, 투명화 기대감으로 외국인 자금이 대거 유입되며 역대급 V자 반등을 기록했습니다.",
    brokerTip: "여의도 사채업자: '실명제 때문에 지하 자금이 패닉이지만, 결국 주식시장으로 돈이 들어올 수밖에 없소.'",
    isTrap: false,
    stocks: [
      { code: "017670", name: "한국이동통신(SK텔레콤)", category: "광풍테마주", price: 120000, rate: 0.95, detail: "이동통신 민영화 추진과 무선호출기(삐삐) 보급 폭발로 황제주 등극" },
      { code: "005930", name: "삼성전자", category: "대형우량주", price: 48000, rate: 0.55, detail: "이건희 회장의 '신경영 선언(마누라와 자식 빼고 다 바꿔라)' 발표 후 품질 혁신 주가 랠리" },
      { code: "000010", name: "조흥은행", category: "금융주", price: 2100, rate: 0.15, detail: "금융실명제 쇼크 극복하고 자금 유입으로 완만한 회복세" },
      { code: "USD/KRW", name: "미국 달러(USD)", category: "안전자산", price: 808, rate: 0.02, detail: "제도 정착과 자본유입에 따라 안정세 유지" }
    ]
  },
  1997: {
    year: 1997,
    era: "Ch.3 IMF 외환위기와 국부유출",
    kospi: 376.31,
    kospiChange: -0.42,
    exchangeRate: 1695,
    exchangeRateChange: 1.01, // 달러 2배 폭등
    interestRate: 25.0,
    headline: "국가 부도 사태! IMF 구제금융 공식 신청... 한보·기아 연쇄 부도",
    eventDetail: "한보철강, 삼미, 기아자동차 등 30대 재벌 절반이 줄도산하고 외환보유고가 바닥나며 11월 21일 정부가 IMF에 손을 벌렸습니다. 환율은 800원에서 2,000원 가까이 치솟았고, 고금리 긴축으로 종금사와 은행들이 문을 닫았습니다. 코스피는 300선까지 무너졌습니다.",
    brokerTip: "외국계 펀드 매니저: '원화는 휴지조각입니다. 오직 달러만이 살길이고, 빚낸 기업은 무조건 망합니다.'",
    isTrap: false,
    stocks: [
      { code: "USD/KRW", name: "미국 달러(USD)", category: "안전자산", price: 1695, rate: 1.05, detail: "국가 외환위기로 달러화 가치 단기간에 2배 이상 폭등" },
      { code: "001220", name: "한보철강공업", category: "부도/작전주", price: 80, rate: -0.92, detail: "5조 원 부실 대출 적발 및 최종 부도 처리, 상장폐지 절차" },
      { code: "005930", name: "삼성전자", category: "대형우량주", price: 38000, rate: -0.32, detail: "외환위기 충격으로 급락했으나, 막대한 달러 수출 대금으로 생존력 입증" },
      { code: "000010", name: "조흥은행", category: "금융주", price: 950, rate: -0.65, detail: "대기업 부실여신 폭탄으로 자본잠식 위기, 정부 공적자금 투입" }
    ]
  },
  1998: {
    year: 1998,
    era: "Ch.3 IMF 외환위기와 국부유출",
    kospi: 562.46,
    kospiChange: 0.49,
    exchangeRate: 1204,
    exchangeRateChange: -0.29,
    interestRate: 15.0,
    headline: "눈물의 구조조정과 금모으기 운동! '바이 코리아(Buy Korea)' 펀드 돌풍",
    eventDetail: "온 국민이 장롱 속 돌반지를 꺼내 외채를 갚는 눈물겨운 금모으기 운동이 벌어졌습니다. 대규모 실직과 명예퇴직의 고통 속에서, 현대증권 이익치 회장의 '바이 코리아 펀드'가 10조 원을 끌어모으며 증시가 바닥에서 경이로운 50% 폭등 반등을 시작했습니다.",
    brokerTip: "바이 코리아 펀드매니저: '코스피 300선은 한국 역사상 최저점입니다! 외국인들이 삼성전자 쓸어담고 있습니다!'",
    isTrap: false,
    stocks: [
      { code: "005930", name: "삼성전자", category: "대형우량주", price: 85000, rate: 1.24, detail: "반도체 64M D램 글로벌 1위 질주와 환율 효과로 주가 2.2배 폭등" },
      { code: "017670", name: "SK텔레콤", category: "광풍테마주", price: 650000, rate: 1.10, detail: "CDMA 세계 최초 상용화 성공과 무선통신 가입자 폭증으로 주가 폭발" },
      { code: "000010", name: "조흥은행", category: "금융주", price: 1400, rate: 0.47, detail: "5대 은행 강제 퇴출 속 살아남아 정부 주도 감자 및 회생 추진" },
      { code: "USD/KRW", name: "미국 달러(USD)", category: "안전자산", price: 1204, rate: -0.29, detail: "외환위기 조기 극복과 무역흑자로 달러 환율 정상화 급락" }
    ]
  },
  1999: {
    year: 1999,
    era: "Ch.4 닷컴버블과 카드대란",
    kospi: 1028.07,
    kospiChange: 0.83,
    exchangeRate: 1138,
    exchangeRateChange: -0.05,
    interestRate: 7.0,
    headline: "골드뱅크, 새롬기술... 코스닥 닷컴 광풍! '사기만 하면 100배'",
    eventDetail: "초고속 인터넷망의 급속한 보급과 정부의 벤처 육성책으로 코스닥에 닷컴 광풍이 불어닥쳤습니다. 무료 인터넷 전화 다이얼패드를 내놓은 '새롬기술'은 6개월 만에 150배 폭등하는 기적을 썼고, 코스닥 지수는 사상 최고치인 2,800포인트를 찍었습니다. 하지만 같은 해 8월 재계 2위 '대우그룹 해체'라는 초대형 폭탄도 터졌습니다.",
    brokerTip: "강남 룸살롱 벤처 캐피탈리스트: '닷컴(.com) 이름만 붙으면 무조건 점상입니다! 새롬기술 100만원 갑니다!'",
    isTrap: false, // 1999년 당해에는 150배 대폭등이 맞음! (2000년에 폭락)
    stocks: [
      { code: "035610", name: "새롬기술(솔본)", category: "광풍테마주", price: 280000, rate: 8.50, detail: "무료 인터넷 전화 '다이얼패드' 열풍으로 공모가 대비 150배 폭등하는 신화" },
      { code: "035290", name: "골드뱅크", category: "광풍테마주", price: 32000, rate: 3.80, detail: "'광고를 보면 돈을 준다'는 인터넷 광고 비즈니스 모델로 수십 배 폭등" },
      { code: "005930", name: "삼성전자", category: "대형우량주", price: 260000, rate: 2.05, detail: "반도체 슈퍼사이클과 IT 붐 타고 26만원 돌파, 시총 1위 굳히기" },
      { code: "004070", name: "대우실업(대우)", category: "부도/작전주", price: 850, rate: -0.78, detail: "김우중 회장의 세계경영 몰락, 44조 분식회계 적발로 대우그룹 해체" }
    ]
  },
  2000: {
    year: 2000,
    era: "Ch.4 닷컴버블과 카드대란",
    kospi: 504.62,
    kospiChange: -0.51,
    exchangeRate: 1264,
    exchangeRateChange: 0.11,
    interestRate: 6.0,
    headline: "IT 버블 대붕괴! 코스닥 지수 2,800에서 500선으로 수직 추락",
    eventDetail: "실체 없는 닷컴 기업들의 적자가 누적되고 나스닥이 붕괴하자, 코스닥 시장은 역사상 가장 처참한 대폭락을 맞았습니다. 150배 올랐던 새롬기술, 다음, 한글과컴퓨터 등이 연일 하한가 행진을 이어가며 고점 대비 90% 이상 폭락했습니다. 수많은 젊은 개미들이 신용 대출로 매수했다가 파산했습니다.",
    brokerTip: "동호회 리딩방 운영자: '기술적 반등 옵니다! 지금이 닷컴 저가 줍줍 마지막 기회입니다!'",
    isTrap: true, // 전형적인 물타기 유도 함정
    stocks: [
      { code: "035610", name: "새롬기술(솔본)", category: "광풍테마주", price: 25000, rate: -0.91, detail: "수익성 부재와 주가조작 수사로 28만원에서 2만원대로 처참한 폭락" },
      { code: "035290", name: "골드뱅크", category: "부도/작전주", price: 3500, rate: -0.89, detail: "적자 누적 및 횡령 의혹으로 주가 10분의 1 토막" },
      { code: "005930", name: "삼성전자", category: "대형우량주", price: 158000, rate: -0.39, detail: "글로벌 IT 경기 둔화와 D램 가격 급락으로 동반 조정" },
      { code: "USD/KRW", name: "미국 달러(USD)", category: "안전자산", price: 1264, rate: 0.11, detail: "버블 붕괴와 금융 불안으로 달러화 환율 다시 상승" }
    ]
  },
  2003: {
    year: 2003,
    era: "Ch.4 닷컴버블과 카드대란",
    kospi: 810.70,
    kospiChange: 0.29,
    exchangeRate: 1192,
    exchangeRateChange: -0.01,
    interestRate: 4.0,
    headline: "신용카드 대란 폭발! 신용불량자 400만 명 양산과 LG카드 부도 위기",
    eventDetail: "길거리에서 신분증만 주면 무차별로 카드를 발급해주던 카드사들의 돌려막기가 터졌습니다. 가계부채 폭탄으로 400만 명이 신용불량자로 전락하고 LG카드가 채권단 관리에 들어갔습니다. 하지만 미국 이라크 전쟁 종전과 중국의 경제 급성장 조짐에 힘입어 하반기부터 제조업 랠리가 시작되었습니다.",
    brokerTip: "여의도 채권 브로커: '카드사는 끝났지만 중국이 공장을 돌리기 시작했습니다. 철강과 조선주를 보십시오.'",
    isTrap: false,
    stocks: [
      { code: "032710", name: "LG카드", category: "부도/작전주", price: 8200, rate: -0.75, detail: "유동성 위기로 거래정지 및 대규모 감자, 결국 신한금융에 피인수" },
      { code: "005490", name: "POSCO(포스코)", category: "대형우량주", price: 165000, rate: 0.48, detail: "중국의 도시화와 인프라 투자 폭증으로 철강 가격 급등 수혜" },
      { code: "009540", name: "현대중공업", category: "광풍테마주", price: 38000, rate: 0.62, detail: "글로벌 물동량 급증으로 초대형 유조선/컨테이너선 수주 잭팟" },
      { code: "USD/KRW", name: "미국 달러(USD)", category: "안전자산", price: 1192, rate: -0.01, detail: "가계부채 위기 속에서도 수출 회복으로 환율 보합세 유지" }
    ]
  },
  2007: {
    year: 2007,
    era: "Ch.5 차화정과 리먼 브라더스",
    kospi: 1897.13,
    kospiChange: 0.32,
    exchangeRate: 936,
    exchangeRateChange: 0.01,
    interestRate: 5.0,
    headline: "코스피 2,000pt 시대 개막! '조선·중공업·미래에셋 인사이트 펀드' 광풍",
    eventDetail: "중국 베이징 올림픽 특수와 글로벌 유동성 확장에 힘입어 코스피가 사상 최초로 2,000선을 돌파했습니다. 현대중공업, 현대미포조선 등 조선주는 3년 만에 10배~20배 폭등했고, 박현주 회장의 '미래에셋 인사이트 펀드'는 출시 며칠 만에 수조 원을 끌어모으며 펀드 광풍의 정점을 찍었습니다.",
    brokerTip: "은행 PB 센터장: '적립식 펀드 안 하면 바보입니다! 조선주와 중국 펀드는 무조건 계속 갑니다!'",
    isTrap: true, // 2008년 리먼 사태 직전 역사적 고점 상투 경고
    stocks: [
      { code: "009540", name: "현대중공업", category: "광풍테마주", price: 440000, rate: 1.85, detail: "조선 슈퍼사이클의 황태자, 주가 44만원 돌파하며 시총 2위 등극" },
      { code: "005380", name: "현대자동차", category: "대형우량주", price: 71000, rate: 0.05, detail: "원화 강세(환율 900원대) 부담으로 조선/철강 대비 소외" },
      { code: "005930", name: "삼성전자", category: "대형우량주", price: 576000, rate: -0.06, detail: "D램 치킨게임과 반도체 가격 하락으로 지수 대비 부진" },
      { code: "USD/KRW", name: "미국 달러(USD)", category: "안전자산", price: 936, rate: 0.01, detail: "원화 강세가 극에 달해 900원 초반대, 달러 저점 매수 기회" }
    ]
  },
  2008: {
    year: 2008,
    era: "Ch.5 차화정과 리먼 브라더스",
    kospi: 1124.47,
    kospiChange: -0.41,
    exchangeRate: 1259,
    exchangeRateChange: 0.35,
    interestRate: 3.0,
    headline: "월가 4위 투자은행 '리먼 브라더스 파산'! 글로벌 금융위기 엄습",
    eventDetail: "미국 서브프라임 모기지 부실로 158년 전통의 리먼 브라더스가 파산하며 전 세계 금융 시스템이 붕괴 직전까지 몰렸습니다. 한국 증시는 연일 서킷브레이커와 사이드카가 발동되며 코스피 900선까지 붕괴했고, 원/달러 환율은 1,500원을 돌파했습니다. 키코(KIKO) 환헤지 상품에 가입했던 수출 중소기업들이 줄도산했습니다.",
    brokerTip: "외국계 펀드 매니저: '월가가 무너졌습니다. 전 세계 주식이 반토막 납니다. 달러를 쥐고 숨죽이세요.'",
    isTrap: false,
    stocks: [
      { code: "USD/KRW", name: "미국 달러(USD)", category: "안전자산", price: 1259, rate: 0.38, detail: "글로벌 달러 유동성 가뭄으로 환율 1,500원 돌파, 최고의 수익률 자산" },
      { code: "009540", name: "현대중공업", category: "광풍테마주", price: 198000, rate: -0.55, detail: "세계 경기 침체와 수주 취소 공포로 44만원 황제주에서 반토막 폭락" },
      { code: "005930", name: "삼성전자", category: "대형우량주", price: 451000, rate: -0.22, detail: "글로벌 폭락 속에서도 막강한 현금 보유력으로 글로벌 경쟁사 대비 선방" },
      { code: "005380", name: "현대자동차", category: "제조/자동차", price: 39500, rate: -0.44, detail: "글로벌 자동차 수요 급랭으로 급락, 그러나 환율 상승 수혜 준비" }
    ]
  },
  2011: {
    year: 2011,
    era: "Ch.5 차화정과 리먼 브라더스",
    kospi: 1825.74,
    kospiChange: -0.11,
    exchangeRate: 1151,
    exchangeRateChange: 0.01,
    interestRate: 3.25,
    headline: "'차·화·정(자동차·화학·정유)' 7공주 랠리와 미국의 신용등급 강등 쇼크",
    eventDetail: "글로벌 금융위기 극복 과정에서 현대차, 기아차, LG화학, SK이노베이션 등 '차화정' 종목들이 시장을 주도하며 10배씩 급등했습니다. 그러나 8월, 신용평가사 S&P가 건국 이래 최초로 미국 국채 신용등급을 AAA에서 AA+로 강등하면서 '블랙 먼데이' 폭락장이 덮쳤습니다.",
    brokerTip: "여의도 주도주 펀드매니저: '차화정 없으면 계좌 깡통 찹니다! 차화정만 몰빵하세요!'",
    isTrap: true, // 2011년 고점 이후 10년간의 '박스피'와 차화정의 기나긴 몰락 시작
    stocks: [
      { code: "005380", name: "현대자동차", category: "광풍테마주", price: 213000, rate: 0.25, detail: "미국 시장 점유율 10% 돌파, 글로벌 5대 완성차 등극하며 사상 최고가" },
      { code: "051910", name: "LG화학", category: "대형우량주", price: 317000, rate: -0.19, detail: "차화정 랠리 최고점 후 미국 등급 강등 쇼크로 급격한 차익 실현" },
      { code: "005930", name: "삼성전자", category: "대형우량주", price: 1058000, rate: 0.12, detail: "갤럭시S 시리즈 대히트로 애플의 유일한 대항마로 부상, 100만원 돌파" },
      { code: "USD/KRW", name: "미국 달러(USD)", category: "안전자산", price: 1151, rate: 0.01, detail: "미국 등급 강등에도 기축통화 지위 유지로 안정세" }
    ]
  },
  2017: {
    year: 2017,
    era: "Ch.6 박스피 탈출과 바이오 광풍",
    kospi: 2467.49,
    kospiChange: 0.22,
    exchangeRate: 1070,
    exchangeRateChange: -0.11,
    interestRate: 1.5,
    headline: "반도체 사상 최대 '슈퍼사이클'과 코스닥 바이오 묻지마 광풍",
    eventDetail: "클라우드 서버 증설과 스마트폰 고도화로 메모리 반도체 공급 부족이 발생하며 삼성전자와 SK하이닉스가 분기마다 사상 최대 영업이익을 경신했습니다. 동시에 코스닥에서는 신라젠의 항암치료제 '펙사벡' 기대감으로 바이오 광풍이 불어닥쳤습니다.",
    brokerTip: "코스닥 슈퍼개미: '신라젠 펙사벡 임상 3상 대박 납니다! 신약 하나면 시총 10조 갑니다!'",
    isTrap: true, // 2년 뒤 임상 중단으로 거래정지 파국
    stocks: [
      { code: "215600", name: "신라젠", category: "광풍테마주", price: 95000, rate: 6.80, detail: "항암 신약 펙사벡 기대감으로 1년 만에 7배 폭등, 코스닥 시총 2위 등극" },
      { code: "000660", name: "SK하이닉스", category: "대형우량주", price: 76500, rate: 0.71, detail: "서버 D램 호황으로 영업이익 13조 원 돌파, 반도체 슈퍼사이클 주역" },
      { code: "005930", name: "삼성전자", category: "대형우량주", price: 2548000, rate: 0.41, detail: "연간 영업이익 53조 원 돌파, 액면분할 이전 250만원 돌파 황제주" },
      { code: "USD/KRW", name: "미국 달러(USD)", category: "안전자산", price: 1070, rate: -0.11, detail: "반도체 수출 호조로 원화 강세 지속, 환율 1,000원대 초반 진입" }
    ]
  },
  2020: {
    year: 2020,
    era: "Ch.7 동학개미와 대혼돈의 시대",
    kospi: 2873.47,
    kospiChange: 0.31,
    exchangeRate: 1086,
    exchangeRateChange: -0.06,
    interestRate: 0.5,
    headline: "코로나19 팬데믹 공포와 '동학개미운동'! 진단키트·제약주 수십 배 폭등",
    eventDetail: "전 세계를 강타한 코로나19로 코스피가 1,400선까지 폭락했으나, 전 세계 중앙은행의 무제한 돈 풀기와 '동학개미'로 불리는 개인 투자자들의 영끌 매수세가 증시를 V자로 끌어올렸습니다. K-방역 진단키트의 씨젠과 코로나 치료제 테마의 신풍제약이 20~30배 폭등하는 기현상이 벌어졌습니다.",
    brokerTip: "유튜브 주식 채널: '피라맥스가 코로나 특효약이랍니다! 신풍제약 30만원 갑니다! 무조건 풀매수!'",
    isTrap: false, // 2020년 당해에는 30배 폭등 실현!
    stocks: [
      { code: "019170", name: "신풍제약", category: "광풍테마주", price: 124000, rate: 16.50, detail: "말라리아 치료제 피라맥스의 코로나 효능 루머로 1년 만에 30배 이상 폭등" },
      { code: "096530", name: "씨젠", category: "광풍테마주", price: 89000, rate: 5.20, detail: "전 세계 코로나 진단키트 공급 독점 수준, 매출 1조 돌파 실적 폭발" },
      { code: "005930", name: "삼성전자", category: "대형우량주", price: 81000, rate: 0.45, detail: "동학개미들의 전폭적 지지(국민주 등극)와 언택트 수혜로 8만전자 안착" },
      { code: "035720", name: "카카오", category: "대형우량주", price: 78000, rate: 1.55, detail: "언택트 플랫폼 및 페이/뱅크 자회사 상장 기대감으로 2.5배 급등" }
    ]
  },
  2021: {
    year: 2021,
    era: "Ch.7 동학개미와 대혼돈의 시대",
    kospi: 2977.65,
    kospiChange: 0.04,
    exchangeRate: 1188,
    exchangeRateChange: 0.09,
    interestRate: 1.0,
    headline: "꿈의 '삼천피(코스피 3,000pt)' 돌파! '10만 전자' 희망과 영끌 빚투 정점",
    eventDetail: "2021년 1월, 코스피가 사상 최초로 3,000을 돌파하고 삼성전자는 장중 96,800원을 찍었습니다. '지금 주식 안 사면 벼락거지 된다'는 포모(FOMO) 증후군에 2030 세대까지 마이너스 통장과 신용융자를 풀로 땡겨 주식시장에 뛰어들었습니다. 하지만 하반기부터 미 연준의 금리 인상 신호탄이 터졌습니다.",
    brokerTip: "증권사 리포트: '삼성전자 목표주가 12만원 상향! 지금 조정일 때 영끌해서 사모으세요!'",
    isTrap: true, // 9만전자에 물린 수백만 개미들의 무덤이 됨
    stocks: [
      { code: "005930", name: "삼성전자", category: "대형우량주", price: 78300, rate: -0.05, detail: "96,800원 고점 찍은 후 반도체 다운사이클 우려로 하락 반전, 개미들 대거 물림" },
      { code: "035720", name: "카카오", category: "대형우량주", price: 112500, rate: 0.44, detail: "17만원 정점 찍은 후 경영진 스톡옵션 먹튀 사태와 골목상권 침해 논란으로 하락" },
      { code: "019170", name: "신풍제약", category: "부도/작전주", price: 32000, rate: -0.74, detail: "임상 2상 유효성 입증 실패 발표 및 대주주 블록딜 매도로 주가 4분의 1 토막" },
      { code: "USD/KRW", name: "미국 달러(USD)", category: "안전자산", price: 1188, rate: 0.09, detail: "미국 테이퍼링과 금리 인상 시사로 달러화 강세 전환" }
    ]
  },
  2023: {
    year: 2023,
    era: "Ch.7 동학개미와 대혼돈의 시대",
    kospi: 2655.28,
    kospiChange: 0.18,
    exchangeRate: 1288,
    exchangeRateChange: 0.02,
    interestRate: 3.5,
    headline: "배터리아저씨 신드롬과 '에코프로 150만원' 숏스퀴즈... SG발 하한가 사태",
    eventDetail: "2차전지 광풍이 대한민국을 뒤흔들었습니다. 박순혁 작가의 2차전지 예찬론에 힘입어 에코프로는 10만 원대에서 153만 원까지 15배 폭등하며 공매도 기관들을 파산시키는 역대급 '숏스퀴즈'를 연출했습니다. 반면 4월에는 CFD 계좌를 이용한 SG증권발 8개 종목(삼천리, 다우데이타 등) 무더기 하한가 조작 사태가 터졌습니다.",
    brokerTip: "배터리 팬클럽 오픈채팅: '기관 공매도 다 죽입니다! 에코프로 200만원 가니 집 팔아서 사세요!'",
    isTrap: true, // 153만원 상투 잡은 개미들 반토막 속출
    stocks: [
      { code: "086520", name: "에코프로", category: "광풍테마주", price: 647000, rate: 5.20, detail: "10만원에서 153만원까지 폭등 후 차익 실현, 한 해 동안 5배 이상 경이적 상승" },
      { code: "005930", name: "삼성전자", category: "대형우량주", price: 78500, rate: 0.42, detail: "감산 효과와 AI 반도체 기대감으로 7만전자로 화려하게 부활" },
      { code: "000660", name: "SK하이닉스", category: "대형우량주", price: 141500, rate: 0.89, detail: "엔비디아에 HBM3 독점 공급 성공으로 AI 최대 수혜주 등극" },
      { code: "005490", name: "POSCO홀딩스", category: "대형우량주", price: 499000, rate: 0.81, detail: "리튬/이차전지 소재 밸류체인 부각으로 포스코 그룹주 동반 폭등" }
    ]
  },
  2024: {
    year: 2024,
    era: "Ch.7 동학개미와 대혼돈의 시대",
    kospi: 2400.00,
    kospiChange: -0.09,
    exchangeRate: 1420,
    exchangeRateChange: 0.10,
    interestRate: 3.25,
    headline: "AI 반도체 HBM 독점 랠리 속 국장 탈출 러시와 비상계엄 충격",
    eventDetail: "엔비디아의 폭발적 성장에 힘입어 SK하이닉스는 HBM 시장을 장악하며 신고가를 경신한 반면, 삼성전자는 HBM 납품 지연으로 5만전자로 추락했습니다. 금투세(금융투자소득세) 논란 속에 서학개미들의 미국 주식 이탈이 가속화되었고, 연말 돌발 비상계엄 사태로 증시와 원화 가치가 일시 패닉에 빠졌습니다.",
    brokerTip: "여의도 프랍 트레이더: '국장(한국 증시)은 답이 없습니다. 오직 AI 반도체 밸류체인 아니면 미국 달러입니다.'",
    isTrap: false,
    stocks: [
      { code: "000660", name: "SK하이닉스", category: "광풍테마주", price: 175000, rate: 0.24, detail: "엔비디아 HBM3E 독점 납품으로 사상 최대 실적 달성 및 시총 2위 확고화" },
      { code: "005930", name: "삼성전자", category: "대형우량주", price: 53500, rate: -0.32, detail: "HBM3E 퀄테스트 지연 및 파운드리 대규모 적자로 '위기의 삼성' 직면" },
      { code: "USD/KRW", name: "미국 달러(USD)", category: "안전자산", price: 1420, rate: 0.10, detail: "트럼프 2기 당선 및 국내 정치 불확실성으로 환율 1,400원 돌파" },
      { code: "086520", name: "에코프로", category: "부도/작전주", price: 72000, rate: -0.55, detail: "전기차 캐즘(일시적 수요 둔화)과 양극재 판가 하락으로 기나긴 조정" }
    ]
  },
  2026: {
    year: 2026,
    era: "Ch.7 동학개미와 대혼돈의 시대 (현재)",
    kospi: 2650.00,
    kospiChange: 0.10,
    exchangeRate: 1390,
    exchangeRateChange: -0.02,
    interestRate: 2.75,
    headline: "피지컬 AI와 차세대 밸류업 대전! 50년 대한민국 증시의 최종 심판",
    eventDetail: "대한민국 자본시장 50년. 명동 사채골목에서 시작해 깡통계좌, 외환위기, 닷컴버블, 금융위기, 코로나를 거치며 수많은 이들이 쓰러지고 또 일어섰습니다. 온갖 위기를 버텨낸 최후의 야수만이 부의 정점에 도달할 수 있습니다.",
    brokerTip: "베테랑 슈퍼개미: '마지막 장입니다. 남은 모든 자산과 야수의 심장을 걸고 마지막 승부를 던지십시오!'",
    isTrap: false,
    stocks: [
      { code: "005930", name: "삼성전자", category: "대형우량주", price: 68000, rate: 0.27, detail: "차세대 HBM4 및 2나노 공정 턴어라운드 성공으로 자존심 회복 랠리" },
      { code: "000660", name: "SK하이닉스", category: "대형우량주", price: 210000, rate: 0.20, detail: "AI 메모리 글로벌 표준 주도권 지속으로 견고한 성장" },
      { code: "005380", name: "현대자동차", category: "대형우량주", price: 265000, rate: 0.35, detail: "인도법인 상장 대박 및 하이브리드·자율주행 소프트웨어 기업 변신 성공" },
      { code: "USD/KRW", name: "미국 달러(USD)", category: "안전자산", price: 1390, rate: -0.02, detail: "국내 수출 턴어라운드로 환율 1,300원대 중반 안착" }
    ]
  }
};

export const YEAR_LIST = Object.keys(HISTORICAL_YEARS).map(Number).sort((a, b) => a - b);
