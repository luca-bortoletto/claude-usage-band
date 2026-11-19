import { atom, read, update } from 'claude-code'
import type { Register } from 'claude-code'

import type { UsageSnapshot, UsageWindow } from '../types'

const snapshot = atom({ plugin: 'usage-band', key: 'snapshot' } as const, null)
const warned = atom({ plugin: 'usage-band', key: 'warned' } as const, [])

const LABELS: Record<string, string> = { five_hour: '5h', seven_day: '7g', spend_limit: 'spesa' }

const label = (kind: string) => LABELS[kind] ?? kind

const bar = (pct: number) => {
  const filled = Math.max(0, Math.min(10, Math.round(pct / 10)))
  return '▓'.repeat(filled) + '░'.repeat(10 - filled)
}

const HOUR = 3_600_000
const WINDOW_MS: Record<string, number> = { five_hour: 5 * HOUR, seven_day: 7 * 24 * HOUR }

const resetMs = (iso?: string) => {
  if (!iso) return null
  const t = new Date(iso).getTime()
  return Number.isNaN(t) ? null : t
}

// Time left until the reset: "42m", "2h14m", "3g5h".
const countdown = (ms: number) => {
  const minutes = Math.max(0, Math.round(ms / 60_000))
  if (minutes < 60) return `${minutes}m`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h${String(minutes % 60).padStart(2, '0')}m`
  return `${Math.floor(hours / 24)}g${hours % 24}h`
}

type Pace = { symbol: string; color: 'warning' | 'success' | 'subtle' }

// Compares the share of the window used with the share of time already gone:
// ahead of the clock means the window runs out before it resets.
const pace = (kind: string, pct: number, left: number | null): Pace | null => {
  const length = WINDOW_MS[kind]
  if (length === undefined || left === null) return null
  const elapsed = 100 * (1 - Math.min(length, Math.max(0, left)) / length)
  const gap = pct - elapsed
  if (gap > 5) return { symbol: '▲', color: 'warning' }
  if (gap < -5) return { symbol: '▼', color: 'success' }
  return { symbol: '=', color: 'subtle' }
}

const colorFor = (pct: number) => (pct >= 90 ? 'error' : pct >= 70 ? 'warning' : 'success')

const toSnapshot = (rateLimits: UsageWindow[], cost?: { usd: number }): UsageSnapshot => ({
  windows: rateLimits.map(r => ({ kind: r.kind, percentUsed: r.percentUsed, resetsAt: r.resetsAt })),
  usd: cost ? cost.usd : null,
})

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    const result = await next(e)
    const u = await $.session.usage()
    await update($, snapshot, () => toSnapshot(u.rateLimits, u.cost))
    // Keep the countdown moving between turns.
    $.clock.every(60_000, () => $.ui.invalidate('ui.render'))
    return result
  })

  on('session.measure', async ($, e, next) => {
    await update($, snapshot, () => toSnapshot(e.rateLimits, e.cost))

    const already = await read($, warned)
    for (const w of e.rateLimits) {
      const key = `${w.kind}@${w.resetsAt ?? ''}`
      if (w.percentUsed >= 90 && !already.includes(key)) {
        $.ui.toast(`Utilizzo ${label(w.kind)} al ${w.percentUsed}%`)
        await update($, warned, list => [...list, key])
      }
    }

    return next(e)
  })

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    const snap = await read($, snapshot)
    if (e.props.hasSurvey || snap === null || (snap.windows.length === 0 && snap.usd === null)) {
      return next(e)
    }

    const { Box, Text } = $.ui.resolve(e)
    const now = await $.clock.now()

    return (
      <Box>
        {snap.windows.map((w, i) => {
          const at = resetMs(w.resetsAt)
          const left = at === null ? null : at - now
          const p = pace(w.kind, w.percentUsed, left)
          return (
            <Text key={w.kind}>
              {i > 0 ? <Text dimColor> │ </Text> : null}
              <Text dimColor>{label(w.kind)} </Text>
              <Text color={colorFor(w.percentUsed)}>{bar(w.percentUsed)} {w.percentUsed}%</Text>
              {p ? <Text color={p.color}> {p.symbol}</Text> : null}
              {left !== null ? <Text dimColor> · {countdown(left)}</Text> : null}
            </Text>
          )
        })}
        {snap.usd !== null ? (
          <Text dimColor>
            {snap.windows.length > 0 ? ' │ ' : ''}sessione ${snap.usd.toFixed(2)}
          </Text>
        ) : null}
      </Box>
    )
  })
}
