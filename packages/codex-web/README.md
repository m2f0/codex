# Codex Web Frontend

This package contains the **4SysCodex** web interface. It provides a modern
chat UI that exposes the Codex functionality via the browser.

## Development

```bash
pnpm install
pnpm --filter codex-web dev
```

## Production

```bash
pnpm --filter codex-web build
pnpm --filter codex-web start
```

This app uses Tailwind CSS for styling.

The `/api/chat` endpoint forwards user messages to the OpenAI API using the
`OPENAI_API_KEY` environment variable. Set this variable before starting the
development server.
