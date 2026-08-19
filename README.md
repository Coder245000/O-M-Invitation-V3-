# Omer & Marwa — Premium Interactive Wedding Invitation

A mobile-first Arabic digital wedding invitation based on the supplied reference recording, with a continuous ivory/champagne-gold visual flow and cinematic opening animation.

## What is implemented

- Slow envelope opening with the light sequence beginning at the **O** and **M** seal letters, then travelling along the envelope folds before the paper opens.
- A continuous, seamless page strip: adjacent floral frames overlap and feather into each other so the pages read as one connected design rather than separate cards.
- The browser background matches the invitation's ivory/champagne paper palette; the old dark/blurry card surround and heavy shadows are removed.
- Subtle independent motion on the bride and groom to give the welcome artwork the same living/approaching feel as the supplied reference.
- Hanging lantern/light animation with a restrained sway and warm breathing glow across the invitation scenes.
- Scratch-to-reveal date interaction retained and refined.
- The date now reads naturally **right-to-left**: **٢٨ | نوفمبر | ٢٠٢٦** (day on the right, year on the left).
- The venue placeholder is displayed in Arabic as **[المكان] - القاهرة، مصر**, without inventing a venue that was not supplied.
- Existing Arabic names, family details, date, time and programme content are preserved.

## Project files

- `index.html` — invitation structure, motion layers, envelope light system and Arabic venue overlay.
- `style.css` — seamless floral-page composition, envelope/light animation, couple movement, lantern movement, responsive layout and scratch styling.
- `script.js` — envelope sequencing, viewport activation and scratch-to-reveal behavior.
- `assets/cover.webp` — envelope artwork.
- `assets/hero.webp` — welcome/couple artwork.
- `assets/family.webp` — family-details artwork.
- `assets/date.webp` — date artwork with day/year visually swapped for right-to-left reading.
- `assets/timeline.webp` — event-programme artwork.

The site is static and has no build step or external JavaScript dependency.

## Preview locally

```bash
python -m http.server 8000
```

Open `http://localhost:8000` on a phone-sized viewport. For QA screenshots of the interior, `http://localhost:8000/?preview=open` auto-starts the opening sequence.

## Publish on GitHub Pages

1. Upload the whole project, including the `assets` directory, to the repository.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select `main` and `/ (root)`.
5. Save and wait for GitHub Pages to publish.
