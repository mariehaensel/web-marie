---
target: Homepage (index.astro)
total_score: 20
max_score: 32
na_heuristics: 7,10
p0_count: 1
p1_count: 2
timestamp: 2026-07-31T15-50-22Z
slug: src-pages-index-astro
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | No progress/section indicator on the homepage "slideshow"; header's overlay→scrolled toggle is a one-way switch that never re-evaluates per section |
| 2 | Match System / Real World | 3 | Correct German, genre-accurate terms (Sopran, Mitschnitte, Bühnenfotos), de-DE date formats |
| 3 | User Control and Freedom | 3 | Nav drawer has Escape/backdrop/X close; no "back to top" or in-page section jumps |
| 4 | Consistency and Standards | 2 | Horizontal Media carousel has no visual cues vs. the page's vertical scroll model; Kontakt container silently gets no header-clearance override anywhere, Vita only gets one on desktop |
| 5 | Error Prevention | 3 | Native HTML5 validation + honeypot; no inline validation styling but low-risk for a 3-field form |
| 6 | Recognition Rather Than Recall | 2 | Hero has zero "scroll for more" affordance; Media carousel has no "more content →" cue on desktop |
| 7 | Flexibility and Efficiency | n/a | Persuade/Experience-mode marketing site; no power-user path expected |
| 8 | Aesthetic and Minimalist Design | 3 | Clean, restrained, good whitespace — docked for the Kontakt background photo fighting the palette |
| 9 | Error Recovery | 2 | No custom error-state styling for the contact form; relies on inconsistent native browser validation bubbles |
| 10 | Help and Documentation | n/a | Not applicable to a 5-page artist marketing site |
| **Total** | | **20/32** | **Acceptable (62.5%)** |

Method: dual-agent (A: abce0f3a580dd3051 · B: a4bef3fca163f3d77)

## Design Specificity Verdict

**LLM assessment**: Content-specific, design-generic. The Vita copy is genuinely specific and does the credibility work PRODUCT.md calls for (Opernhaus Chemnitz 2019–2024, Beethoven-Kammermusikpreis, DAS LIED) — no competitor could paste that in unchanged. But the visual system itself (thin display font, off-white/gold quiet-luxury palette, full-bleed photo + burger drawer + horizontal media-scroll) is the same template language used by photographers, boutiques, and fashion portfolios. Nothing in the type, iconography, or layout rhythm gestures at music, voice, or performance. Swap the photos for a chef or jewelry designer and the shell wouldn't need to change.

**Deterministic scan**: `detect.mjs` returned exit code 2 with exactly 1 finding across the full component tree (Hero, VitaSection, MediaSection, ContactForm, Nav, Footer, Layout, index.astro): a `broken-image` warning on the lightbox's empty `<img src="">` placeholder. **False positive** — that image is intentionally empty until JS populates it when a photo is clicked; it never renders visibly on load. The live browser-injected detector separately found 6 anti-patterns (see below), 3 of which are false positives by mechanism (detector walks up the DOM for the nearest solid `background-color` and misses photo/gradient backgrounds and off-screen-clip accessibility patterns).

**Visual overlays**: no persistent user-visible overlay was left in your browser — Assessment B read the injected detector's console output directly and tore down the temporary live server afterward, per the skill's cleanup requirement.

## Overall Impression

The bones are good — the Vita section proves the design system *can* carry real credibility when content and layout reinforce each other. But the homepage's emotional arc peaks in the middle (Vita) and dips at the end (Kontakt), which is exactly backwards for a site whose two audiences both end their visit by deciding whether to make contact. The single biggest opportunity: the Kontakt background photo is actively working against the one action the whole site exists to produce.

## What's Working

1. **Vita split-screen** (photo left / bio right, one unbroken full-viewport view) — pairs polished portraiture with dense, fact-loaded copy in the one place design and positioning genuinely reinforce each other.
2. **Agenda's typographic date block** — a huge bold day numeral with small-caps month/year reads like a real concert calendar at a glance, exactly what a "trustworthy, functional Agenda" needs.
3. **Media section's grouped horizontal scroll** with rotated vertical group labels (Mitschnitte/Bühnenfotos/Portraits) — a space-efficient way to present three content types inside one fullscreen section without breaking the one-section-per-viewport rule.

## Priority Issues

**[P0] Kontakt background photo undermines the highest-stakes moment on the page**
**Why it matters**: The full-bleed photo behind the contact form (`kontakt-bg.jpg`) shows Marie biting/tearing paper with a startled expression — tonally opposite the poised photography used everywhere else. It sits directly behind the exact moment a fan or an opera-house contact decides whether to submit their details; on mobile the crop puts the mouth-and-paper detail right behind the "E-Mail" field. For industry decision-makers specifically, this reads as unserious immediately before a booking inquiry.
**Fix**: Swap in one of the already-available poised stage/portrait photos, or drop the photo background in favor of a solid dark panel — the form doesn't need a photo to work.
**Suggested command**: `/impeccable colorize` or a direct content swap via `/impeccable polish`

**[P1] Kontakt (all widths) and Vita (mobile only) silently miss the header-clearance override, while Vita-desktop has it — source-confirmed**
**Why it matters**: `main .container { padding-top: calc(3rem + var(--header-h)) }` (≈168px) is meant to be zeroed by `main:has(.hero-section) .container:first-of-type`, but that selector only fires for the *first* `<div>` of-type under its own parent. I verified in `global.css`: `.kontakt-section .container` (line 802) sets `padding-left` but never overrides `padding-top` at any width, so the generic 168px always applies there. `.vita-text` *is* correctly overridden to 48px, but only inside the `@media (min-width:900px)` block (line 971) — below that breakpoint nothing resets it, so mobile likely inherits the same dead-space gap Assessment A measured. Net effect: an inconsistent, structurally fragile pattern (2 of 4 sections depend on sibling order rather than an explicit rule) that costs real scroll distance on mobile in exactly the two sections carrying the CV and the conversion action.
**Fix**: Replace the `:first-of-type` structural selector with an explicit modifier class (e.g. `.no-header-pad`) applied directly to the containers that need it, and add the same explicit override for `.kontakt-section .container` and for `.vita-text` below 900px.
**Suggested command**: `/impeccable layout`

**[P1] Header becomes illegible over the dark Media section**
**Why it matters**: The overlay→scrolled header toggle (`Layout.astro`) is a one-way switch fired once when leaving the Hero; it never reconsiders per section. Over the dark Media section (`background: var(--ink)`), the header renders as a muddy grey bar with dark-on-dark text — confirmed via screenshot, "Sopran" nearly invisible. On a homepage built around full-bleed section backgrounds, the persistent brand header needs to adapt per section, not toggle once.
**Fix**: Extend the existing IntersectionObserver pattern to watch each section's background luminance (or tag sections with a `data-header-theme` attribute) instead of a single hero/not-hero binary.
**Suggested command**: `/impeccable layout`

**[P2] No discoverable "more content" affordance on the Media carousel (desktop)**
**Why it matters**: `.media-scroll` has no visible scrollbar, arrows, or drag styling on desktop — the only cue more photos exist is a sliver of the next tile. For the opera-house/agent persona skimming quickly, missed stage photos directly undercut the evidence they came to evaluate.
**Fix**: Add visible prev/next arrows and/or a thin scroll-progress bar under the row.
**Suggested command**: `/impeccable layout`

**[P3] Contact form doesn't differentiate audience or set expectations**
**Why it matters**: One generic Name/E-Mail/Nachricht form serves both casual fans and opera houses submitting booking inquiries, with no purpose field and no response-time reassurance — a small trust gap for the higher-stakes audience.
**Fix**: A lightweight "Anliegen" (purpose) field or a one-line response-time reassurance closes the gap without adding friction for fans.
**Suggested command**: `/impeccable clarify`

**[P3] `.media-play` button contrast is a near-miss (4.48:1 vs. 4.5:1 AA)**
**Why it matters**: White play-icon text on `rgba(16,17,20,0.55)` over a photo thumbnail measured just under the AA threshold for small text. Not clearly false — the true backdrop is a variable photograph, so the real-world ratio depends on the photo underneath.
**Fix**: Bump the overlay's opacity slightly (e.g. 0.55 → 0.62) to clear AA with margin regardless of the photo behind it.
**Suggested command**: `/impeccable audit`

## Persona Red Flags

**Jordan (first-timer/fan)**: Lands on Hero with zero cue the page continues — no scroll indicator, headline, or CTA; the only "keep going" affordance is an invisible 1px sentinel div. May bounce before reaching the Agenda, the thing they actually came for.

**Riley (stress-tester)**: Fast wheel/trackpad scrolling through the mandatory scroll-snap homepage reproduced a state showing the Agenda's tail directly abutting Vita's start with no clean snap settle — worth a manual trackpad/Magic Mouse check, since scroll-snap-mandatory pages are known to feel "stuck" under fast momentum scrolling.

**Casey (mobile)**: The Kontakt tonal-mismatch problem (P0) is worse here — the tighter crop puts the mouth/paper detail at a larger relative scale directly behind the form. The Vita/Kontakt padding bug (P1) costs Casey almost a full extra swipe of blank space before reaching real content.

**Project-specific — opera house artistic director/agent skimming in under 2 minutes**: Nothing on the Hero signals "working professional" — no credibility marker until 2 full sections deep (past Hero, past Agenda) into Vita. The homepage excerpt is only 4 sentences with no visible indicator of what awaits on the full Vita page (no "full CV"/PDF label). If they do reach Kontakt, the same tonally-mismatched photo (P0) is the last impression before they submit or bounce to find an agency contact instead.

## Minor Observations

- WhatsApp footer icon links to a literal placeholder number (`wa.me/49000000000`), live on production with no visual distinction from the real Instagram link beside it — a visitor has no way to know it isn't live yet.
- `.agenda-month`/`.section-link` text uses the gold accent color at small sizes on the paper background — worth a formal AA contrast check, it reads borderline.
- The faint section-name watermark (opacity 0.035) is a nice typographic touch, but on Agenda specifically it visually competes with the real content sitting on top of it.
- `overused-font` detector flag (Helvetica, 73%) is environment-dependent — `--font-sans` is a standard system-font stack (`-apple-system, ... Helvetica, Arial, sans-serif`); whether real users ever render the Helvetica fallback depends on their OS, not the code.
