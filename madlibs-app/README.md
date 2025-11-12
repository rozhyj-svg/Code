# Madlibs App

A tiny Madlibs web app (vanilla HTML/CSS/JS) with a minimal Node static server and a simple generator.

## Run locally

1. Install deps

```bash
cd madlibs-app
npm install
```

2. Run in dev (requires nodemon)

```bash
npm run dev
```

3. Or start

```bash
npm start
```

Open http://localhost:3000 in your browser.

## Tests

```bash
npm test
```

## Notes

- Server exposes POST /api/generate to produce stories using the same generator logic found in `lib/generator.js`.
