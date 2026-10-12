# Aditya Singh — 3D Portfolio

Dark + blue portfolio with a Three.js background and a **3D photo** that tilts with your mouse, spins/moves between sections as you scroll, and glitches slightly when you scroll fast.

## Run it
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build -> dist/
```

## Make it yours (2 minutes)
1. **Photo:** your cutout is at `public/photo.png`. To swap it, replace that file (transparent PNG looks best).
2. **Content:** edit `src/config.js` — name, about, projects, skills.
3. **Links:** LinkedIn, email, GitHub, Instagram and LeetCode are set in `src/config.js`. Each contact card opens the link (mail opens your mail app).
4. **Resume button:** drop `resume.pdf` into `public/` and set `resume: "/resume.pdf"` in `config.js`.

## Deploy to Vercel
Push to GitHub → import the repo in Vercel → framework "Vite" → deploy. (Or `npx vercel` in this folder.)

## Tweak the 3D
- Photo position/rotation per section: `POSES` at the top of `src/scene.js`.
- Colors: CSS variables in `src/style.css`, particle/shape colors in `src/scene.js`.

## What's in the 3D / effects
- Loader intro, animated hero name, custom cursor with magnetic buttons
- Fly-through ring tunnel + streaming grid floor driven by scroll
- Your photo: hologram scan beam, orbiting security keywords (edit `orbit` in `config.js`), RGB-split glitch on fast scroll, full spin at Contact
- Typing terminal in About (edit `terminal`), scrambling section labels, animated counters
- Marquee strips (edit `marquee`), 3D tilt + glare cards, side dot navigation
- If WebGL is unavailable the page still works without the 3D background.
