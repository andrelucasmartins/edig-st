export function htmlString(text: string) {
  return new DOMParser().parseFromString(text, "text/html");
}
