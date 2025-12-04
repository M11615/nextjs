const randomHex: (len: number) => string = (len: number): string => {
  let result: string = "";
  for (let i: number = 0; i < len; i++) {
    result += Math.floor(Math.random() * 16).toString(16);
  }

  return result;
}

export const generateUUID: () => string = (): string => {
  const hex: string = randomHex(32);

  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-4${hex.slice(13, 16)}-${(parseInt(hex[16], 16) & 0x3 | 0x8).toString(16)}${hex.slice(17, 20)}-${hex.slice(20, 32)}`;
}
