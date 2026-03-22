/**
 * 入場料を通貨フォーマットで表示
 * 例: 1200, "JPY" → "¥1,200"
 *      0, "JPY" → "Free"
 *      undefined → null (非表示)
 */
export function formatAdmissionFee(
  fee?: number,
  currency?: string
): string | null {
  if (fee === undefined || fee === null) return null;
  if (fee === 0) return "Free";

  const currencyCode = currency || "JPY";

  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(fee);
  } catch {
    // Fallback if currency code is invalid
    return `${fee.toLocaleString()} ${currencyCode}`;
  }
}
