import { deflate, inflate } from 'pako'

const STORAGE_KEY = 'gameHistory'
const MAX_HISTORY = 5000

let currentSession = null

function compress (data) {
  const json = JSON.stringify(data)
  const bytes = deflate(json)
  return btoa(String.fromCodePoint(...bytes))
}

function decompress (b64) {
  const binary = atob(b64)
  const bytes = Uint8Array.from(binary, c => c.codePointAt(0))
  return JSON.parse(inflate(bytes, { to: 'string' }))
}

function loadHistory () {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return []
    }
    // Support both legacy plain JSON and new compressed format
    if (raw.startsWith('[')) {
      return JSON.parse(raw)
    }
    return decompress(raw)
  } catch {
    return []
  }
}

function saveHistory (history) {
  localStorage.setItem(STORAGE_KEY, compress(history))
}

/**
 * Begin tracking a new game session.
 * @param {'generator'|'ds'|'glyph'} mode
 * @param {object} perks  - the full perks state object
 * @param {object} effects - the full effects state object
 */
export function startSession (mode, perks, effects) {
  currentSession = {
    id: Date.now(),
    mode,
    startTime: Date.now(),
    endTime: null,
    duration: 0,
    perks: Object.keys(perks).filter(k => perks[k].active),
    effects: Object.keys(effects).filter(k => effects[k].active),
    results: { great: 0, good: 0, fail: 0 },
    completed: false,
  }
}

/**
 * Record a skill-check result for the active session.
 * @param {'great'|'good'|'fail'} result
 */
export function recordResult (result) {
  if (!currentSession) {
    return
  }
  switch (result) {
    case 'great': {
      currentSession.results.great++
      break
    }
    case 'good': {
      currentSession.results.good++
      break
    }
    case 'fail': {
      currentSession.results.fail++
      break
    }
    // No default
  }
}

/**
 * Finalise the current session and persist it.
 * @param {boolean} completed - true when the game ended naturally (gen done, glyph expired, DS hit)
 */
export function endSession (completed = false) {
  if (!currentSession) {
    return
  }
  const now = Date.now()
  currentSession.endTime = now
  currentSession.duration = now - currentSession.startTime
  currentSession.completed = completed

  const history = loadHistory()
  history.push(currentSession)
  if (history.length > MAX_HISTORY) {
    history.splice(0, history.length - MAX_HISTORY)
  }
  saveHistory(history)
  currentSession = null
}

/** Return a copy of the stored history array (newest last). */
export function getHistory () {
  return loadHistory()
}

/** Wipe all stored game history. */
export function clearHistory () {
  localStorage.removeItem(STORAGE_KEY)
}
