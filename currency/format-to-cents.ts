export const formatToCents = (value: number) => {
  // First multiplying the value to 100 to get the cents amount
  // Then removing every single number after the decimals
  // They could be some due to JS imprecision or user typing too much decimals
  return Number((value * 100).toFixed(0))
}
