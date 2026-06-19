export function generateInitials(
  name: string
) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function generateShortName(
  name: string
) {
  const parts = name.split(" ");

  if (parts.length < 2) return name;

  return `${parts[0]} ${parts[1][0]}.`;
}

export function generatePlayerColor() {
  const colors = [
    "#2563eb",
    "#16a34a",
    "#dc2626",
    "#9333ea",
    "#ea580c",
    "#0891b2",
  ];

  return colors[
    Math.floor(Math.random() * colors.length)
  ];
}