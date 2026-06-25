# SPLINT One Demo

Statische HTML/CSS/JavaScript-Demo zur Präsentation eines SPLINT-ähnlichen Ablaufs.

## Inhalt

- `index.html` – Hauptseite mit Aktionen, Übersicht, Schüler:innen, Beobachtungen und QR-Teilen-Kachel
- `share.html` – Zwischenseite zum Teilen der Demo mit QR-Code, Link-Kopieren, System-Teilen, E-Mail, WhatsApp und Telegram
- `schueler-anlegen.html` – Schüler:innenprofil anlegen, inklusive Demo-Vorschlägen
- `beobachtung.html` – Schüler:innenprofil/Beobachtungsübersicht
- `mesk.html` – Auswahl der MeSK-Oberkategorien
- `themen/*.html` – ausfüllbare Beobachtungsbögen je Oberkategorie
- `assets/css/styles.css` – Layout, responsive Darstellung, QR-/Share-Ansicht und mobile Querformatansicht
- `assets/js/app.js` – Demo-Logik, lokale Speicherung, Tutorial-Modus, QR-/Share-Funktionen

## Teilen per QR-Code

Die Hauptseite enthält eine Kachel „Demo per QR-Code teilen“. Der QR-Code verweist auf `share.html`. Auf dieser Zwischenseite kann der Link über mehrere Wege weitergegeben werden. Der Button „SPLINT Demo auf diesem Gerät öffnen“ führt zur Startseite `index.html`.

Der QR-Code wird im Browser aus der aktuell geöffneten Adresse erzeugt. Nach dem Hochladen auf GitHub Pages verweist er automatisch auf die veröffentlichte Teilenseite. Lokal über `file://` ist der QR-Code nur eingeschränkt sinnvoll, weil andere Geräte lokale Dateipfade nicht öffnen können.

## Speicherung

Die Demo speichert Schüler:innen, aktive Auswahl und Beobachtungsbögen lokal im Browser über `localStorage`. Es gibt kein Backend.

## Nutzung auf GitHub Pages

Repository erstellen, Dateien hochladen und GitHub Pages für den Branch aktivieren. Einstiegspunkt ist `index.html`.

## Mobile Fragebögen

Auf Themen-/Fragebogenseiten erscheint auf Handy und Tablet im Hochformat ein Hinweis, das Gerät ins Querformat zu drehen. Im Querformat werden Fallbeispiel und Fragebogen nebeneinander angezeigt und können unabhängig voneinander gescrollt werden. Der Hinweis verschwindet automatisch nach dem Drehen oder kann über „OK, Hinweis schließen“ manuell ausgeblendet werden.
