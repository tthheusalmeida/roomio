export function getFirstName(name: string): string {
  const firstName = name.split(" ")[0];
  return firstName.charAt(0).toUpperCase() + firstName.slice(1);
}

export function getUserNameFromEmail(email: string): string {
  const [userName] = email.split("@");
  return userName;
}

export function toTitleCase(text: string): string {
  return text
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
