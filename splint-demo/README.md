# SPLINT One Demo-Webseitenadaption

Statische Demo zur Präsentation eines SPLINT-ähnlichen Workflows. Die Demo besteht aus HTML, CSS und JavaScript und kann direkt in ein GitHub-Repository gelegt und über GitHub Pages veröffentlicht werden.

## Enthaltene Seiten

- `index.html` – Hauptseite mit Kacheln, Schüler:innenliste und gespeicherten Beobachtungen
- `schueler-anlegen.html` – Formular „Schüler:in erstellen“ nach Screenshot-Vorlage
- `beobachtung.html` – Profil-/Übersichtsseite mit Beobachtungsbogen-Kachel
- `mesk.html` – MeSK-Auswahlseite mit Oberkategorien
- `themen/selbstkompetenz.html`
- `themen/sozialkompetenz.html`
- `themen/konfliktverhalten.html`
- `themen/regelverhalten.html`
- `themen/lernkompetenz.html`

## Speicherung

Die Demo speichert angelegte Schüler:innen und ausgefüllte Beobachtungsbögen lokal im Browser über `localStorage`.
Es gibt keinen Server, keine Datenbank und keine externe API. Dadurch ist die Demo für Präsentationen und GitHub Pages geeignet.

## Start

1. ZIP entpacken.
2. Dateien in ein GitHub-Repository kopieren.
3. `index.html` im Browser öffnen oder GitHub Pages für das Repository aktivieren.

## Anpassung

- Farben und Layout: `assets/css/styles.css`
- Logik, Demo-Daten und MeSK-Themen: `assets/js/app.js`
- Logo/Favicon: `assets/img/logo.svg` und `assets/img/favicon.svg`

## Hinweis

Dies ist eine eigenständige Demo-Adaption für Präsentationszwecke und keine offizielle SPLINT-Anwendung. Die enthaltenen Fragebogen-Items sind Platzhalter und sollten für eine echte Nutzung fachlich geprüft und ersetzt werden.
