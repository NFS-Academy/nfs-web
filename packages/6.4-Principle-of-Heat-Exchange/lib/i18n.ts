export function toBanglaNumber(value: string | number): string {
  const numStr = String(value);
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  
  return numStr.replace(/[0-9]/g, (match) => banglaDigits[parseInt(match, 10)]);
}
