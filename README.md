# SPLINT One Demo

Statische HTML/CSS/JavaScript-Demo zur Präsentation eines SPLINT-ähnlichen Ablaufs.

## Inhalt

- `index.html` – Hauptseite mit Aktionen, Übersicht, angelegten Schüler:innen und gespeicherten Beobachtungen
- `schueler-anlegen.html` – Schüler:innenprofil erstellen, inkl. fünf Demo-Vorschlägen
- `beobachtung.html` – Profil-/Beobachtungsübersicht
- `mesk.html` – MeSK-Auswahl mit verpflichtender Schüler:innenauswahl
- `themen/*.html` – ausfüllbare Beobachtungsbögen für Selbstkompetenz, Sozialkompetenz, Konfliktverhalten, Regelverhalten und Lernkompetenz
- `assets/css/styles.css` – Layout, responsive Darstellung und Tour-Overlay
- `assets/js/app.js` – lokale Speicherung, Demo-Daten, Fragebögen und geführtes Tutorial

## Neue Funktionen

- Geführtes Erststart-Tutorial mit abgedunkelter Seite und hervorgehobenem Zielbereich
- Tutorial führt durch: Profil anlegen → Profilübersicht → MeSK auswählen → Kompetenzbereich wählen → Fallbeispiel prüfen → Bogen ausfüllen → Notizen → Speichern → Hauptseite
- Rote statische Meta-Hilfe-Kacheln wurden entfernt; die Hilfe läuft über das Overlay-Tutorial
- Beobachtungen können erst gestartet werden, wenn ein Profil existiert und aktiv ausgewählt wurde
- Beobachtungsbogen kann erst gespeichert werden, wenn jedes Item beantwortet wurde
- Nach dem Speichern erfolgt eine Weiterleitung auf die Hauptseite
- Angelegte Schüler:innen und gespeicherte Beobachtungen erscheinen rechts auf der Hauptseite

## Speicherung

Die Demo nutzt `localStorage`. Es gibt keine Serververbindung und keine echte SPLINT-Anbindung.

## Nutzung in GitHub

Alle Dateien in ein Repository hochladen. Für GitHub Pages kann `index.html` direkt als Startseite verwendet werden.
