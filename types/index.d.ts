export type UsageWindow = { kind: string; percentUsed: number; resetsAt?: string }
export type UsageSnapshot = { windows: UsageWindow[]; usd: number | null }
export type ThemeName = 'classic' | 'visual' | 'minimal'

declare module 'claude-code' {
  interface PluginState {
    'usage-band': { snapshot: UsageSnapshot | null; warned: string[]; theme: ThemeName }
  }
}
