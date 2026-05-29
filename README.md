# Durban Connect Wi-Fi

A full-stack React and Express responsive landing page for an ISP provider seamlessly built with React-Leaflet maps, framer-motion transitions, robust Tailwind CSS layout, and a Node handler.

## Project Architecture
- **Frontend App:** Built with React, Vite, and Tailwind CSS.
- **Backend Service:** Express.js `server.ts` handles the initial API endpoint `/api/contact` and provides integration hooks for further databases. Note: the `leads.json` file is ignored in `.gitignore`, keeping data hidden from git.
- **Mapping:** `react-leaflet` to display interactive Map coverage. Use `window !== 'undefined'` check to prevent SSR rendering issues.

## Design Requirements Handled
- **Primary Colors:** Easily edited in `src/index.css` via `:root` CSS custom variables (`--color-primary`, `--color-primary-light` (for soft hero glow backgrounds), `--color-accent` (deep navy), `--color-white`).
- **Transitions:** `--transition-fast` and `--transition-medium` applied via utility classes `btn-transition` and `card-transition`. `prefers-reduced-motion` natively resets these rules automatically in CSS.
- **Form:** Posts JSON schema to Node server endpoints and gives real-time visual UI feedback without reloading. Local JSON lead capturing.

## Pre-Launch Instructions & Checklist

To move from preview to an active Production domain, accomplish these items:

1. [ ] **Cloud Provider Setup:** Ensure your Hosting platform supports Node.js (e.g. Heroku, Render, DigitalOcean App Platform, Google Cloud Run) if you want to keep the contact-form endpoint Express.
   - *If using Vercel/Netlify*, migrate the `/api/contact` into native Vercel/Netlify Serverless Functions (usually placed in `/api` directory natively) rather than using the custom `server.ts`.
2. [ ] **Map Integration Configuration:** Currently using open Leaflet mapping.
   - For real boundaries: Swap `COVERAGE_ZONES` out in `CoverageMap.tsx` and load a true `GeoJSON` layer. (See Leaflet's GeoJSON docs)
   - To migrate to Google Maps: Swap out `react-leaflet` for `@react-google-maps/api` and specify a `<GoogleMap>` rendering with your maps api key. 
3. [ ] **Payment Provider:** Implement a payment modal (Stripe Payment Links or PayFast triggers) into the Pricing Cards CTA buttons. Check out `stripe node` package.
4. [ ] **SSL & Domain:** Register the `durbanconnect.co.za` domain via local registrars (Namecheap/Cloudflare). Let Vercel/Render manage your SSL automatically.
5. [ ] **Storage Backup:** Ensure you attach a lightweight database (like MongoDB, Firebase, or Supabase) to `server.ts` replacing `fs.promises` before scale. Serverless environments usually do not persist filesystem storage across restarts.
6. [ ] **SEO Tags & Analytics:** Inside `index.html` replace the GA identifier (`G-XXXXXXXXXX`) and setup Search Console once the domain goes live. Generate a `sitemap.xml`.
