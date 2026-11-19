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

const DAYS = ['dom', 'lun', 'mar', 'mer', 'gio', 'ven', 'sab']
const pad = (n: number) => String(n).padStart(2, '0')

const resetText = (now: number, iso?: string) => {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  const hm = `${pad(d.getHours())}:${pad(d.getMinutes())}`
  const sameDay = d.toDateString() === new Date(now).toDateString()
  return sameDay ? hm : `${DAYS[d.getDay()] ?? ''} ${hm}`
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
          const reset = resetText(now, w.resetsAt)
          return (
            <Text key={w.kind}>
              {i > 0 ? <Text dimColor> │ </Text> : null}
              <Text dimColor>{label(w.kind)} </Text>
              <Text color={colorFor(w.percentUsed)}>{bar(w.percentUsed)} {w.percentUsed}%</Text>
              {reset ? <Text dimColor> · reset {reset}</Text> : null}
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
