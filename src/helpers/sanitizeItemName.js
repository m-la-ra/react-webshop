export const stringToLowerCase = (string) => string.toLowerCase();

export function sanitizeItemName(brand, name) {
  const combinedString = stringToLowerCase(name).includes(
    stringToLowerCase(brand)
  )
    ? `${brand} ${stringToLowerCase(name)
        .replace(stringToLowerCase(brand), ``)
        .trim()}`
    : `${brand} ${name}`;

  return combinedString;
}
