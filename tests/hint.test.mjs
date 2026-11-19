import assert from 'node:assert/strict'
import { test } from 'node:test'

import { hint } from '../hooks/hint.ts'

test('picks the 5h window when it is high and ahead of the clock', () => {
  const out = hint([{ kind: 'five_hour', percentUsed: 80, ahead: true }])
  assert.deepEqual(out, { kind: 'five_hour', percentUsed: 80 })
})

test('stays quiet when usage is high but on pace', () => {
  assert.equal(hint([{ kind: 'five_hour', percentUsed: 85, ahead: false }]), null)
})

test('stays quiet when ahead of the clock but still low', () => {
  assert.equal(hint([{ kind: 'five_hour', percentUsed: 30, ahead: true }]), null)
})

test('falls back to the 7-day window', () => {
  const out = hint([
    { kind: 'five_hour', percentUsed: 10, ahead: false },
    { kind: 'seven_day', percentUsed: 75, ahead: true },
  ])
  assert.deepEqual(out, { kind: 'seven_day', percentUsed: 75 })
})
