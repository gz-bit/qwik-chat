/*
 * WHAT IS THIS FILE?
 *
 * It's the entry point for the Bun HTTP server when building for production.
 *
 * Learn more about the Bun integration here:
 * - https://qwik.builder.io/docs/deployments/bun/
 * - https://bun.sh/docs/api/http
 *
 */
import type { Server } from 'bun'
import { websocket } from './handlers'

// Allow for dynamic port
const port = Number(Bun.env.PORT ?? 3000);

/* eslint-disable */
console.log(`Server started: http://localhost:${port}/`);

Bun.serve({
  async fetch(request: Request, server: Server) {

    const url = new URL(request.url)
    if (url.pathname === '/chat') {
      server.upgrade(request)
      return
    }
    return new Response('Bun dev websocket process in Qwik')
  },
  port,
  websocket,
});

declare const Bun: any;
