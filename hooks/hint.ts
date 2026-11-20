export type HintWindow = { kind: string; percentUsed: number; ahead: boolean }
export type Hint = { kind: string; percentUsed: number }

const THRESHOLD = 70

// Picks the window that justifies suggesting a lighter model: at or above the
// threshold and ahead of the clock. The caller words the message in its language.
// Only uses what the band already has: no prompt text, no model name.
export const hint = (windows: HintWindow[]): Hint | null => {
  const tight = (kind: string) =>
    windows.find(w => w.kind === kind && w.ahead && w.percentUsed >= THRESHOLD)

  const found = tight('five_hour') ?? tight('seven_day')
  return found ? { kind: found.kind, percentUsed: found.percentUsed } : null
}
