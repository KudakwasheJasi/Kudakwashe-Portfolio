## Kudakwashe Portfolio

This portfolio now runs as a Next.js App Router application. The original CSS and image assets are reused from `css/` and `images/`.

### Run locally

```powershell
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

### AI toolbox

The floating `Ask AI` toolbox answers questions about Kudakwashe's skills, services, projects, experience, and contact details. It works with portfolio-specific fallback answers by default. To enable live AI responses, copy `.env.example` to `.env.local` and add an `OPENAI_API_KEY`.

### Production build

```powershell
npm run build
npm start
```
