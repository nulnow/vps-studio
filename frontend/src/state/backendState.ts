import { observable } from '@legendapp/state'

export type BackendSelection =
  | { kind: 'none' }
  | { kind: 'localhost' }
  | { kind: 'url'; url: string }

const STORAGE_KEY = 'vps-studio.backend.selection.v1'

function safeParseJson<T>(s: string | null): T | null {
  if (!s) return null
  try {
    return JSON.parse(s) as T
  } catch {
    return null
  }
}

function loadInitial(): BackendSelection {
  const raw = safeParseJson<BackendSelection>(localStorage.getItem(STORAGE_KEY))
  if (!raw || typeof raw !== 'object' || !('kind' in raw)) return { kind: 'none' }

  if (raw.kind === 'localhost') return { kind: 'localhost' }
  if (raw.kind === 'url' && typeof (raw as any).url === 'string') {
    return { kind: 'url', url: (raw as any).url }
  }
  return { kind: 'none' }
}

export const backendSelection$ = observable(loadInitial())

backendSelection$.onChange(({ value }) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
})

export async function resolveBaseUrl(): Promise<string> {
  const sel = backendSelection$.get()
  if (sel.kind === 'url') return sel.url
  // default to embedded localhost backend url
  return await window.api.getBackendUrl()
}


