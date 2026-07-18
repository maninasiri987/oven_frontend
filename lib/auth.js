// Session helpers for the dashboard.
// Uses HMAC-SHA256 via WebCrypto so it runs in both the Edge runtime (middleware)
// and the Node runtime (route handlers) without any dependency.

const SESSION_MSG = 'oven-dashboard-session-v1'

function getSecret() {
  return process.env.DASHBOARD_PASSWORD || ''
}

async function hmacHex(key, msg) {
  const enc = new TextEncoder()
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    enc.encode(key),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const sig = await crypto.subtle.sign('HMAC', cryptoKey, enc.encode(msg))
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

export async function createSessionValue() {
  const secret = getSecret()
  if (!secret) return null
  const sig = await hmacHex(secret, SESSION_MSG)
  return `${SESSION_MSG}.${sig}`
}

// Constant-time verification of the signed session cookie value
export async function isValidSession(value) {
  const secret = getSecret()
  if (!secret || typeof value !== 'string' || !value) return false
  const expected = await createSessionValue()
  if (!expected || expected.length !== value.length) return false
  let diff = 0
  for (let i = 0; i < expected.length; i++) {
    diff |= expected.charCodeAt(i) ^ value.charCodeAt(i)
  }
  return diff === 0
}

// Constant-time string comparison (for the login password check)
export function safeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || !a || !b) return false
  let diff = a.length ^ b.length
  const len = Math.max(a.length, b.length)
  for (let i = 0; i < len; i++) {
    diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0)
  }
  return diff === 0
}
