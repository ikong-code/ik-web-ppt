// 字体大小
export const fontSizeOptions = [
  "12px",
  "14px",
  "16px",
  "18px",
  "20px",
  "22px",
  "24px",
  "28px",
  "32px",
  "36px",
  "40px",
  "44px",
  "48px",
  "54px",
  "60px",
  "66px",
  "72px",
  "76px",
  "80px",
  "88px",
  "96px",
  "104px",
  "112px",
  "120px",
]

// 行间距
export const lineHeightOptions = [
  0.9, 1.0, 1.15, 1.2, 1.4, 1.5, 1.8, 2.0, 2.5, 3.0,
]

// 字间距
export const wordSpaceOptions = new Array(10).fill("").map((_, idx) => {
  return { label: idx + "px", value: !idx ? "0" : idx }
})
