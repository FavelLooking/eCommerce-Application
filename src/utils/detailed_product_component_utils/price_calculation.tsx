export default function priceCalculation(
  centAmount: number,
  fractionDigits: number
): string {
  return `${centAmount / 10 ** fractionDigits} €`;
}
