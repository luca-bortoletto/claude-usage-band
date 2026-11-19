export type UsageWindow = { kind: string; percentUsed: number; resetsAt?: string }
export type UsageSnapshot = { windows: UsageWindow[]; usd: number | null }

declare module 'claude-code' {
  interface PluginState {
    'usage-band': { snapshot: UsageSnapshot | null; warned: string[] }
  }
}
