# SPLINT One Demo

Statische HTML/CSS/JavaScript-Demo zur Präsentation eines SPLINT-ähnlichen Ablaufs.

## Enthalten

- `index.html` – Hauptseite mit Aktionen, Übersicht, angelegten Schüler:innen und gespeicherten Beobachtungen.
- `schueler-anlegen.html` – Formular zum Erstellen eines Schüler:innenprofils inklusive fünf Demo-Vorschlägen.
- `beobachtung.html` – SPLINT-nahe Profil- und Beobachtungsübersicht.
- `mesk.html` – Auswahl des MeSK-Fragebogens und der Oberkategorien.
- `themen/*.html` – einzelne ausfüllbare Beobachtungsbögen für Selbstkompetenz, Sozialkompetenz, Konfliktverhalten, Regelverhalten und Lernkompetenz.
- `assets/css/styles.css` – gesamtes Layout inkl. Desktop-, Tablet- und Smartphone-Ansicht.
- `assets/js/app.js` – lokale Speicherung, Demo-Daten, MeSK-Rubrik, Validierung und Tutorial-Tour.

## Funktionen

- Schüler:innenprofile werden im Browser per `localStorage` gespeichert.
- Beobachtungen können erst gestartet werden, wenn ein Profil existiert und ausgewählt ist.
- Beobachtungsbögen können erst gespeichert werden, wenn jedes Item beantwortet wurde.
- Nach dem Speichern wird automatisch zur Hauptseite zurückgeführt.
- Beim ersten Besuch erscheint eine Auswahl zwischen geführter Tutorial-Tour und freiem Entdecken.
- Die Tutorial-Tour läuft je HTML-Seite einzeln mit Abdunkelung, Spotlight und kurzer Erklärung.
- Alle Seiten sind responsiv für Desktop, iPad/Tablet und Smartphone aufgebaut.

## Nutzung in GitHub Pages

1. ZIP entpacken.
2. Den Ordnerinhalt in ein GitHub-Repository kopieren.
3. GitHub Pages aktivieren.
4. `index.html` als Startseite verwenden.

Die Demo ist nicht mit einem echten SPLINT-System verbunden und verarbeitet keine Serverdaten.
