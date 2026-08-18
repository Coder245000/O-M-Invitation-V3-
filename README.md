# Omer & Marwa — Premium Interactive Wedding Invitation

A mobile-first Arabic digital wedding invitation rebuilt to follow the supplied reference recording and the approved premium ivory/champagne-gold artwork.

## Flow

1. Full-screen embossed envelope with an **O&M** wax seal.
2. Tap the seal and the envelope separates/open-reveals the invitation.
3. Welcome scene for **Omer & Marwa**, with the groom represented as a Black Sudanese man.
4. Family-details invitation scene.
5. Interactive scratch-to-reveal date scene: **28 November 2026**.
6. Venue: **[ Venue] - Cairo, Egypt**.
7. Wedding-program timeline.
8. No RSVP page.

## Files

- `index.html` — semantic invitation flow and image stages.
- `style.css` — full-screen composition, envelope animation, premium transitions, scratch overlays, responsive layout.
- `script.js` — envelope interaction, viewport reveals, scratch-to-reveal implementation.
- `assets/cover.webp` — envelope artwork.
- `assets/hero.webp` — welcome/couple artwork.
- `assets/family.webp` — family-details artwork.
- `assets/date.webp` — date/time/location artwork.
- `assets/timeline.webp` — program artwork.

The site is static and has no build step or external JavaScript dependency.

## Preview locally

Run any static server in the project folder, for example:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000` on a phone-sized viewport.

## Publish on GitHub Pages

1. Upload the full project, including the `assets` directory, to the repository.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select `main` and `/ (root)`.
5. Save and wait for GitHub Pages to publish the site.
