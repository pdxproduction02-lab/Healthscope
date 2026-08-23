# HealthScope Ultimate v2

Premium, mobile-first wellness and health-literacy prototype.

## Run

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

Vercel settings: Framework **Vite**, Build Command **npm run build**, Output Directory **dist**.

## Notes

- Demo mode works without an API key.
- The assistant is a local educational fallback. For production OpenAI integration, use a server/API route and keep the API key server-side.
- LabelScope camera access uses `getUserMedia()` and requires a secure context (HTTPS) in supported browsers.
- Uploaded/captured label analysis in this prototype demonstrates the experience using a fictional demo label; connect OCR/vision processing server-side for production.
