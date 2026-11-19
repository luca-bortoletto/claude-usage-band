export type HintWindow = { kind: string; percentUsed: number; ahead: boolean }

const THRESHOLD = 70

// Suggests a lighter model when a window runs out before it resets.
// Only uses what the band already has: no prompt text, no model name.
export const hint = (windows: HintWindow[]): string | null => {
  const tight = (kind: string) =>
    windows.find(w => w.kind === kind && w.ahead && w.percentUsed >= THRESHOLD)

  const five = tight('five_hour')
  if (five) return `5h al ${five.percentUsed}% e in anticipo: valuta un modello più leggero`
  const seven = tight('seven_day')
  if (seven) return `7g al ${seven.percentUsed}% e in anticipo: valuta un modello più leggero`
  return null
}
