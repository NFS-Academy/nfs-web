export function titleCase(value) {
  return String(value)
    .replaceAll(/([A-Z])/g, " $1")
    .replaceAll("-", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
    .trim();
}

export function subjectTone(value = "") {
  if (value.includes("physics")) return "physics";
  if (value.includes("chemistry")) return "chemistry";
  return "neutral";
}
