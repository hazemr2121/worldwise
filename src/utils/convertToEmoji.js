// Turns an ISO 3166-1 alpha-2 country code ("PT") into its flag emoji (🇵🇹) by
// mapping each letter to its regional indicator symbol.
export function convertToEmoji(countryCode) {
  if (!countryCode) return "";

  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());

  return String.fromCodePoint(...codePoints);
}
