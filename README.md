# Omer & Marwa — Premium Interactive Wedding Invitation

A mobile-first Arabic digital wedding invitation for GitHub Pages, using the supplied approved artwork and a reference-style interactive opening.

## Premium interactions included

1. Full-screen embossed O&M envelope.
2. Tap the central wax seal.
3. A warm gold light ignites at the seal and travels outward in a radial/cross bloom.
4. The upper envelope flap hinges open in 3D with a champagne-gold inner liner.
5. The envelope softly dissolves directly into the welcome artwork.
6. The bride/groom area has subtle cinematic floating motion.
7. The hanging lantern areas sway independently and their lights gently pulse.
8. All invitation pages sit on one continuous warm paper background with no dark separators, so scrolling feels like one extended vertical invitation.
9. Date cards retain the interactive scratch-to-reveal effect.
10. Reduced-motion accessibility is preserved.

## Files

- `index.html` — semantic invitation flow, live hero motion layers, and envelope/light layers.
- `style.css` — opening sequence, continuous-page treatment, hero/lantern motion, transitions, scratch styling, and responsive behavior.
- `script.js` — envelope timing/interaction, viewport reveals, and scratch-to-reveal implementation.
- `assets/cover.webp` — envelope artwork.
- `assets/hero.webp` — welcome/couple artwork.
- `assets/family.webp` — family-details artwork.
- `assets/date.webp` — date/time/location artwork.
- `assets/timeline.webp` — program artwork.

The project remains fully static: no build step and no external JavaScript dependency.

## Preview locally

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Publish on GitHub Pages

1. Replace the repository's current files with the contents of this folder, keeping the `assets` folder intact.
2. Commit and push to the branch used by GitHub Pages (normally `main`).
3. In **Settings → Pages**, keep **Deploy from a branch**, `main`, and `/ (root)` selected.
4. Allow GitHub Pages a short time to refresh, then hard-refresh the public invitation URL.
