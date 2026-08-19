# Omer & Marwa — Premium Interactive Wedding Invitation

A mobile-first Arabic digital wedding invitation based on the supplied reference recording, with a continuous ivory/champagne-gold visual flow and cinematic opening animation.

## What is implemented

- Slow envelope opening. The light ignites on the engraved strokes of the **O** and **M** inside the wax seal, then runs outward along the two engraved flap arms, lighting the arabesque scrollwork as it passes. The top flap alone then swings up, carrying the wax seal with it, and the envelope dissolves into the welcome artwork. See *Opening light* below.
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
- `assets/letters-mask.webp` — alpha mask of the **O** and **M** letterforms, in `seal.webp`'s own 260×260 space.
- `assets/band-left.webp`, `assets/band-right.webp` — alpha masks of the arabesque relief inside the two flap arms.
- `assets/wash-left.webp`, `assets/wash-right.webp` — soft feathered masks hugging each flap seam.
- `assets/flap-top.webp` — the top flap's outline: a pentagon unioned with a disc around the wax seal.
- `assets/flap-body.webp` — its complement, so the envelope body never paints the flap or the seal.
- `assets/flap-glow.webp` — the same shape, heavily feathered, for the light inside the envelope.
- `assets/paper-body.webp`, `assets/paper-flap.webp` — the engraved artwork itself, lifted off `cover.webp` as a fine relief mask and pre-split by flap and body.

## Opening light

The glow is not drawn by hand: every mask above was cut from `cover.webp` itself, so the
light lands exactly on the artwork rather than on an approximation of it.

Three layers sit over the envelope, each pinned to the card so they scale with it:

| Layer | Mask | Role |
| --- | --- | --- |
| `.letter-flare` | `letters-mask.webp` | a warm gold wipe across the **O**, **&** and **M** strokes |
| `.orn-flow` | `band-left/right.webp` | the engraved scrollwork lighting up as the wave passes |
| `.seam-wash` | `wash-left/right.webp` | soft spill hugging the fold, so the light reads as volumetric |
| `.flap-top__art` | `flap-top.webp` | the only part of the envelope that moves |
| `.envelope-piece--sheet` | `flap-body.webp` | the body: everything the flap is not |
| `.flap-glow` | `flap-glow.webp` | the light waiting inside, uncovered as the flap lifts |
| `.paper-glow` | `paper-body/flap.webp` | light seeping through the engraving on every flap |

Each layer holds an oversized gradient sheet that slides outward on `transform` alone.
The two flap arms sit at **318.8°** and **41.2°**, and the bright head of each gradient is
placed at **50.7%** of its gradient line, which is the top edge of the wax seal. That is why
the light appears to leave the seal and run to the corners.

Timings live in one block in `style.css` under *opening timeline*; `OPEN_SEQUENCE_MS` in
`script.js` must stay just past the end of that timeline (currently 6500 ms).

If a browser has no CSS mask support the three layers are hidden by an `@supports` guard
and the envelope still opens with its central bloom.

### Adjusting it

- **Faster or slower run:** change the `2.05s` duration on `.orn-flow` / `.seam-wash` and their `> i` children together, then raise or lower `OPEN_SEQUENCE_MS` to match.
- **Flap swing:** the angle in `@keyframes flapSwing` and the delay on `.flap-top`. Keep the curve near-linear and `flapBurn` finishing well before 90°.
- **Backlit paper:** peak opacity in `@keyframes paperGlowIn` and the gradient on `.paper-glow`.
- **Brighter or dimmer arms:** the final `background-color` alpha in `@keyframes ornRun`, and the peak opacity in `@keyframes washRun`.
- **Warmer or cooler light:** the gradient stops on `.orn-flow--left > i` and its three siblings — keep all four in step.
- **Letter colour:** the gradient on `.letter-flare__sweep`.
- **Regenerating masks:** if `cover.webp` is ever replaced, the band and wash masks must be recut; they are tied to this exact artwork. `letters-mask.webp` is tied to `seal.webp`.

### Two things that are easy to get wrong

**The letter mask belongs to `seal.webp`, not `cover.webp`.** The wax seal you see on
screen is `.seal-badge`, which paints `seal.webp` at **20.8%** of the card width.
`seal.webp` is itself a 260 px crop of `cover.webp` covering **27.6%** of the card, so it
is drawn about a third smaller than the seal printed underneath it. A mask cut from
`cover.webp` therefore lands too large and slightly off. `letters-mask.webp` is stored in
`seal.webp`'s own 260×260 space and `.letter-flare` is pinned to exactly the same box as
`.seal-badge` — if you change one, change the other.

**Only the top flap moves, and the seal must travel with it.** The wax seal is *printed on*
`cover.webp`, so any cut that runs through it tears it. An early version clipped the artwork
into four triangles that flew apart and the seal split into quarters. The fix is a pair of
complementary masks:

- `flap-top.webp` is the flap — a pentagon whose diagonals sit on the **outer** edge of the
  engraved bands (so both bands belong to the flap), unioned with a disc of radius 158 px
  around the seal (so the seal lifts whole rather than shearing at the fold).
- `flap-body.webp` is its complement, eroded 4 px so the flap overlaps it and no hairline
  seam can open along the join.

Because the body never paints the flap region, the printed seal exists on the flap only and
cannot appear twice once the flap rises. `.seal-badge` and the letter light live inside
`.flap-top`, so they swing with it. The disc radius matters: at 124 px a scalloped rim of
the printed seal was left behind on the body and read as a second seal.

The flap hinges on the card's top edge and reaches 40°, fading out well before its underside
could show. That number is not arbitrary: in the reference the wax seal rises about 11% of
the screen height across roughly 1.4 s, at a near-constant rate. Matching the rise matters
more than matching the angle, because more angle over the same time reads as a snap rather
than a swing. `.flap-top` therefore uses a near-linear curve, not an ease-in.

### Making the light read as engraving rather than a lit strip

Two layers do the travelling light and they are easy to get out of balance:

- `.orn-flow` is masked to the arabesque relief, so it lights the **scrollwork lines**.
- `.seam-wash` is a soft halo along the fold that gives the light volume.

If `.seam-wash` is turned up, it drowns `.orn-flow` and the whole band reads as one lit
slab. The wash is deliberately held at about half the ornament's strength, and its mask
profile is narrow (roughly 200 px across the fold, not 370 px). Speed matters as much:
the flow runs over 3.05 s on `--ease-flow`, which is close to linear. The earlier
`--ease-silk` covered two-thirds of the arm in the first third of its time, which made a
60 fps animation look like it was skipping frames — the fix is pacing, not frame rate.

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
