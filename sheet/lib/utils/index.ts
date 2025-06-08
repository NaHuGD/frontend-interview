/** 取得對應頭像id */
export const getAvatarIndex = (id: number) => {
  const numericId = Math.abs(id);
  const avatarIndex = (numericId % 8) + 1;
  return avatarIndex;
};

export const formatCurrency = (value: number): string => {
  /** 捨棄小數點取得正整數 */
  const integerAmount = Math.trunc(value);

  if (integerAmount < 0) {
    // 使用 Math.abs() 避免雙重負號
    return `-$${Math.abs(integerAmount)}`;
  }

  return `$${integerAmount}`;
};

/** 轉換為 "22 Oct 2019" 格式 */
export const formatTimestampToDate = (timestamp: number): string => {
  const date = new Date(timestamp);

  const day = date.getDate();
  const month = date.toLocaleDateString('en-US', { month: 'short' });
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};

export const containsDigit = (id: number, value: string): boolean => {
  // 將數字轉為字符串，然後檢查是否包含目標數字
  return id.toString().includes(value);
};
