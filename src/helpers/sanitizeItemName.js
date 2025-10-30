export const stringToLowerCase = (string) => string.toLowerCase();
export const stringToUpperCase = (string) => string.toUpperCase();

export function sanitizeItemName(brand, name) {
  const duplicateWords = name.split(/\s+/);

  const filterWords = duplicateWords.filter(
    (word) => stringToLowerCase(word) !== stringToLowerCase(brand)
  );

  let joinedWords = filterWords.join(" ").trim();

  if (joinedWords.charAt(0) !== stringToUpperCase(joinedWords.charAt(0))) {
    const firstCharacter = stringToUpperCase(joinedWords.charAt(0));
    joinedWords = joinedWords.replace(joinedWords.charAt(0), firstCharacter);
  }

  const combinedString = `${brand} ${joinedWords}`;

  return combinedString;
}
