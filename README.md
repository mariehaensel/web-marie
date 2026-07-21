# Website Marie Hänsel

Statische Website (Astro) mit echten Unterseiten (`/agenda`, `/vita`, `/media`, `/kontakt`,
`/impressum`, `/datenschutz`) und einem eingebauten Web-Editor (`/admin`) zum Pflegen der
Agenda/Termine ohne Programmierkenntnisse.

## Lokal starten

```bash
npm install
npm run dev
```

Seite läuft dann unter `http://localhost:4321`.

> Hinweis: Der Admin-Bereich lässt sich lokal nur unter `http://localhost:4321/admin/index.html`
> aufrufen (Astro-Dev-Server-Eigenheit) und funktioniert dort ohnehin nicht vollständig, da der
> Login Netlify Identity braucht. Nach dem Deployment auf Netlify ist `deine-domain.de/admin`
> ganz normal erreichbar.

## Inhalte bearbeiten (lokal, ohne CMS)

- Termine: `src/content/agenda/` — eine Markdown-Datei pro Termin
- Vita: `src/content/vita/vita.md`
- Kontakt: `src/content/kontakt/kontakt.md`
- Bilder/Galerie: `src/content/media/` + Bilddateien in `public/images/uploads/`

Die zwei Beispiel-Termine und der Beispiel-Text sind **Platzhalter** und sollten vor dem
Livegang durch echte Inhalte ersetzt bzw. gelöscht werden.

## Deployment (kostenlos über Netlify + eigene Domain)

Diese Schritte musst du einmalig selbst durchführen (Konten/Domain gehören dir):

1. **GitHub-Repo anlegen**
   - Bei github.com kostenlosen Account anlegen (falls noch nicht vorhanden).
   - Neues, privates oder öffentliches Repo erstellen, z. B. `web-marie`.
   - Dieses Projekt hochladen:
     ```bash
     git init
     git add .
     git commit -m "Initial website"
     git branch -M main
     git remote add origin <URL deines GitHub-Repos>
     git push -u origin main
     ```

2. **Netlify-Account + Seite verbinden**
   - Auf netlify.com mit GitHub anmelden (kostenlos).
   - „Add new site“ → „Import an existing project“ → das GitHub-Repo auswählen.
   - Build command: `npm run build`, Publish directory: `dist` (steht schon in `netlify.toml`).
   - Deploy starten — Netlify gibt dir eine `*.netlify.app`-URL.

3. **Eigene Domain verbinden**
   - In Netlify: Site settings → Domain management → „Add a domain“ → deine Domain eintragen.
   - Bei deinem Domain-Anbieter die von Netlify angezeigten DNS-Einträge setzen
     (meist ein CNAME bzw. Netlify-Nameserver). HTTPS-Zertifikat richtet Netlify automatisch ein.

4. **Login für den Kalender-Editor einrichten (Netlify Identity + Git Gateway)**
   - In Netlify: Site settings → Identity → „Enable Identity“.
   - Unter Identity → Registration: „Invite only“ einstellen (damit sich nicht Fremde anmelden können).
   - Unter Identity → Services → Git Gateway: „Enable Git Gateway“ aktivieren.
   - Unter Identity → „Invite users“: die E-Mail-Adresse eintragen, die den Kalender pflegen soll
     (z. B. deine eigene oder die von Marie). Diese Person bekommt eine E-Mail, setzt ein Passwort
     und kann sich danach unter `deine-domain.de/admin` einloggen.

5. **Kalender pflegen**
   - `deine-domain.de/admin` aufrufen, einloggen.
   - Unter „Agenda / Termine“ neue Termine anlegen, bestehende bearbeiten oder löschen.
   - Beim Speichern erstellt das CMS automatisch einen Commit im GitHub-Repo — Netlify baut die
     Seite neu und veröffentlicht die Änderung innerhalb von ca. 1 Minute, ganz ohne Google Sheet
     oder Code.

## Kosten

- Netlify Hosting: kostenlos (Free-Plan reicht für diese Seite locker aus).
- Netlify Identity + Git Gateway: kostenlos (Free-Plan erlaubt mehrere Editoren).
- Einzige Kosten: die Domain selbst (Registrierung/Verlängerung beim Domain-Anbieter deiner Wahl).

## Rechtliches

`/impressum` und `/datenschutz` enthalten nur Platzhaltertexte. Bitte vor Veröffentlichung durch
rechtssichere, echte Angaben ersetzen (z. B. via Impressum-Generator einer IHK oder eines Anwalts).
