import type { APIRoute } from 'astro'

import { APP_VERSION } from '../../../src/version'

export const GET: APIRoute = () => {
  return new Response(JSON.stringify({ version: APP_VERSION }), {
    status: 200,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      // Allow apps to fetch this from anywhere.
      'cache-control': 'no-store'
    }
  })
}


