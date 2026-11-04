export const ASSET_TIERS = [
  {
    min: -Infinity,
    max: 0,
    title: "신용불량자 & 한강물 수온 체크",
    badge: "💀 파산",
    color: "#ff3b30",
    desc: "사채업자에게 쫓기며 한강 다리 위에서 바람을 맞고 있습니다.",
    lifestyle: "컵라면 국물도 사치. 신체포기각서 작성 직전"
  },
  {
    min: 0,
    max: 10000000,
    title: "영등포 쪽방촌 흙수저",
    badge: "🥉 쪽방촌",
    color: "#888888",
    desc: "명동 사채골목을 기웃거리며 주식 역전만을 꿈꾸는 하이에나",
    lifestyle: "연탄 난로와 소주 한 병으로 추위를 달래는 중"
  },
  {
    min: 10000000,
    max: 50000000,
    title: "봉천동 달동네 원룸",
    badge: "🥈 개미",
    color: "#3d7eff",
    desc: "빨간 양봉 하나에 심장이 뛰고, 파란 음봉에 밥이 안 넘어가는 평범한 개미",
    lifestyle: "가끔 삼겹살에 소주로 자축, 버스 환승 할인 철저"
  },
  {
    min: 50000000,
    max: 300000000,
    title: "마포 24평 아파트 & 쏘나타",
    badge: "🥇 중산층",
    color: "#00e1ff",
    desc: "드디어 서울 하늘 아래 내 집 마련 성공! 객장에서 어깨 좀 펴는 수준",
    lifestyle: "주말마다 백화점 식품관 쇼핑, 쏘나타 신차 출고"
  },
  {
    min: 300000000,
    max: 2000000000,
    title: "대치동 은마아파트 & 그랜저",
    badge: "💎 여의도 큰손",
    color: "#9b51e0",
    desc: "증권사 VIP 객장 전용룸 배정! 증권사 지점장이 커피 타주는 레벨",
    lifestyle: "강남 학원가 1타 강사 과외, 주말 골프 라운딩"
  },
  {
    min: 2000000000,
    max: 10000000000,
    title: "압구정 현대 & 벤츠 S클래스",
    badge: "👑 슈퍼개미",
    color: "#ffae34",
    desc: "내 매수 한 번에 개별 주식 호가창이 들썩인다! 신문 경제면에 이름 오르내림",
    lifestyle: "압구정 로데오 명품관 프리패스, 스위스 비밀금고 개설"
  },
  {
    min: 10000000000,
    max: 100000000000,
    title: "청담동 PH129 펜트하우스 & 슈퍼카",
    badge: "🔥 금융 재벌",
    color: "#fc0",
    desc: "한강이 한눈에 내려다보이는 펜트하우스에서 페라리와 롤스로이스를 수집",
    lifestyle: "개인 요트 파티, 여의도 자산운용사 설립 추진"
  },
  {
    min: 100000000000,
    max: Infinity,
    title: "전설의 월가 지배자 & 전용기 보유 재벌",
    badge: "⚡ 신화 (GOD)",
    color: "#00f37c",
    desc: "대한민국 자본시장 50년을 지배한 불멸의 투신! 국가 정책까지 자문하는 전설",
    lifestyle: "보잉 개인 전용기 타고 뉴욕·런던 순방, 증권사 통째 인수"
  }
];

export function getAssetTier(assets) {
  return ASSET_TIERS.find(t => assets >= t.min && assets < t.max) || ASSET_TIERS[1];
}
