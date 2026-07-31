# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences, weighted equally:
- **Concert audience / fans** — want to know when and where they can see Marie perform live.
- **Industry decision-makers** (opera houses, agencies, competition organizers) — evaluate her Vita, roles, and honors to decide on bookings or invitations.

## Product Purpose

A professional presence for soprano Marie Hänsel: surface upcoming performances (Agenda), a verifiable professional biography (Vita), audio/video samples (Media), and a way to get in touch (Kontakt). Success is ideally both at once — real inquiries arriving through the contact form, and the site standing as a credible portfolio/CV that backs bookings arranged through other channels (agency, personal network).

## Positioning

Not a commercial product competing on features — an individual artist's site whose credibility rests on specific, verifiable career facts a generic competitor page couldn't claim: ensemble membership at Opernhaus Chemnitz (2019–2024, roles including Pamina, Gretel, Blonde), Beethoven-Kammermusikpreis (2020), DAS LIED competition finalist (2023), training in Karlsruhe, Dresden, and Hannover.

## Operating Context

Marie (or the user on her behalf) updates Agenda entries, Vita text, and Media herself through a self-service CMS (Decap CMS at `/admin`, Netlify Identity login, invite-only registration) without touching code — this was the original, explicit requirement (a simple way to keep the calendar current without a developer). ~24 real upcoming concert dates are already loaded. The contact form runs on Netlify Forms with a spam honeypot field.

## Capabilities and Constraints

Static site (Astro), hosted on Netlify, no backend or database, no payments, no visitor accounts. The only login surface is the CMS admin. Content lives in Git (private GitHub repo), edited via the CMS or directly in code.

Open/undecided: 8 of the 10 Media tiles are still placeholder images awaiting real photos or recordings — future work must not treat them as real evidence until replaced.

## Brand Commitments

Name: "Marie Hänsel", tagline "Sopran". Instagram presence linked in the footer.

## Evidence on Hand

- Full real Vita biography text (`src/content/vita/vita.md`).
- 24 real upcoming Agenda entries with real dates, pieces, ensembles, venues.
- Real hero and Vita photography (color-graded, custom-cropped per breakpoint).
- 2 real performance video links (YouTube).
- 8 of 10 Media tiles are placeholders (labeled "Platzhalter-Bild") — not real evidence yet.

## Product Principles

1. Serve two audiences — casual concert-goers and industry decision-makers — from the same page set, without making either dig for what they need.
2. Prioritize specific, verifiable career facts (roles, houses, awards, dates) over generic self-description; specificity is the credibility mechanism.
3. Keep the Agenda trustworthy and current — people plan around it, it's a functional tool, not decoration.
4. Minimize friction on both real usage paths: self-updating content (via CMS) and visitor outreach (contact form).
5. Never present placeholder content as real evidence — mark it until it's replaced.
