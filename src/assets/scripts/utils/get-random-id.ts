export default function getRandomId(): string {
  const randomLetter = String.fromCharCode(97 + Math.floor(Math.random() * 26));

  // eslint-disable-next-line no-bitwise
  return randomLetter + (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
