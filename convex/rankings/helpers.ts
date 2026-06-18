export function winPercentage(
  won: number,
  lost: number
) {
  const total = won + lost;

  if (!total) return 0;

  return Number(
    ((won / total) * 100).toFixed(1)
  );
}