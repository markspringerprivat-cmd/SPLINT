# SPLINT One Demo

Statische HTML/CSS/JavaScript-Demo zur Präsentation eines SPLINT-ähnlichen Ablaufs.

## Inhalt

- `index.html` – Hauptseite mit Aktionen, Übersicht, Schüler:innen und Beobachtungen
- `schueler-anlegen.html` – Schüler:innenprofil anlegen, inklusive Demo-Vorschlägen
- `beobachtung.html` – Schüler:innenprofil/Beobachtungsübersicht
- `mesk.html` – Auswahl der MeSK-Oberkategorien
- `themen/*.html` – ausfüllbare Beobachtungsbögen je Oberkategorie
- `assets/css/styles.css` – Layout und responsive Darstellung
- `assets/js/app.js` – Demo-Logik, lokale Speicherung, Tutorial-Modus

## Aktuelle Korrektur

Die Themen-Seiten zeigen das ausführliche Fallbeispiel wieder dauerhaft links neben dem Fragebogen an. Zusätzlich erzeugt JavaScript die Fallbeispiel-Spalte automatisch, falls eine Themen-HTML versehentlich ohne diese Spalte geladen wird.

## Speicherung

Die Demo speichert Schüler:innen, aktive Auswahl und Beobachtungsbögen lokal im Browser über `localStorage`. Es gibt kein Backend.

## Nutzung auf GitHub Pages

Repository erstellen, Dateien hochladen und GitHub Pages für den Branch aktivieren. Einstiegspunkt ist `index.html`.
