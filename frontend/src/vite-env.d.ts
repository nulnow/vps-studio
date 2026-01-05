/// <reference types="vite/client" />

import type { Api } from '../../src/preload/preload'

declare global {
  interface Window {
    api: Api
  }
}

export {}


