(() => {
  'use strict';

  const STUDENTS_KEY = 'splintDemo.students.v2';
  const OBSERVATIONS_KEY = 'splintDemo.observations.v2';
  const ACTIVE_STUDENT_KEY = 'splintDemo.activeStudentId.v2';

  const SCALE = [
    { value: '0', label: 'nicht beobachtet' },
    { value: '1', label: 'selten' },
    { value: '2', label: 'teilweise' },
    { value: '3', label: 'überwiegend' },
    { value: '4', label: 'sicher' }
  ];

  const DEMO_STUDENT_PRESETS = [
    { firstName: 'Mika', lastName: 'Schneider', birthDate: '20.06.2016', pronouns: 'Xier / Xies', group: '4a', grade: '4', schoolYear: '5', note: 'Ausgewogener Demo-Fall für alle MeSK-Bereiche.' },
    { firstName: 'Lea', lastName: 'Kramer', birthDate: '14.03.2015', pronouns: 'Sie / Ihr', group: '5b', grade: '5', schoolYear: '6', note: 'Geeignet für Sozialkompetenz und Gesprächssituationen.' },
    { firstName: 'Noah', lastName: 'Becker', birthDate: '02.11.2016', pronouns: 'Er / Ihm', group: '4c', grade: '4', schoolYear: '5', note: 'Geeignet für Lernkompetenz und Arbeitsphasen.' },
    { firstName: 'Sam', lastName: 'Yilmaz', birthDate: '08.09.2014', pronouns: 'Keine Angabe', group: '6a', grade: '6', schoolYear: '7', note: 'Geeignet für Konfliktverhalten und Regelverhalten.' },
    { firstName: 'Emil', lastName: 'Fischer', birthDate: '27.01.2017', pronouns: 'Er / Ihm', group: '3a', grade: '3', schoolYear: '4', note: 'Jüngerer Beispiel-Fall für Selbstregulation.' }
  ];

  const TOPIC_ORDER = ['selbstkompetenz', 'sozialkompetenz', 'konfliktverhalten', 'regelverhalten', 'lernkompetenz'];

  function emotionSections(emotion) {
    const lower = emotion.toLowerCase();
    const own = emotion === 'Wut' ? 'wütend' : emotion === 'Angst' ? 'ängstlich' : 'traurig';
    const ownNoun = emotion === 'Wut' ? 'Wut' : emotion === 'Angst' ? 'Angst' : 'Traurigkeit';
    return [
      {
        title: `Selbstregulation bei ${emotion}`,
        questions: [
          `setzt bei ${emotion} adaptive Strategien stets bewusst ein und nutzt sie eigenständig.`,
          `setzt hilfreiche Strategien zur Bewältigung und Regulation von ${emotion} mit Unterstützung ein.`,
          `greift bei ${emotion} in einem vertrauten Setting und mit struktureller Unterstützung auf hilfreiche Strategien zurück.`,
          `greift bei ${emotion} ausschließlich auf maladaptive, ungeeignete Bewältigungsstrategien zurück.`
        ]
      },
      {
        title: `Verständnis der eigenen ${emotion === 'Traurigkeit' ? 'Traurigkeit' : emotion}`,
        questions: [
          `versteht Ursachen und Auswirkungen der eigenen ${ownNoun}.`,
          `versteht, was sie/ihn ${own} macht.`,
          `kann ${ownNoun} mit emotionaler Stabilisierung wahrnehmen, benennen und akzeptieren.`,
          `identifiziert und benennt die eigene ${ownNoun} ausschließlich mit zeitlichem Abstand.`
        ]
      },
      {
        title: `Verständnis der ${emotion === 'Traurigkeit' ? 'Traurigkeit' : emotion} anderer`,
        questions: [
          `versteht Ursachen und Auswirkungen der ${lower} anderer.`,
          `versteht, was andere ${own} macht.`,
          `kann ${ownNoun} bei anderen mit emotionaler Stabilisierung wahrnehmen, benennen und akzeptieren.`,
          `identifiziert und benennt die ${ownNoun} anderer ausschließlich mit zeitlichem Abstand.`
        ]
      },
      {
        title: `Verhalten bei ${emotion}`,
        questions: [
          `verhält sich bei ${emotion} verlässlich situationsangemessen.`,
          `verhält sich bei ${emotion} zumeist angemessen.`,
          `verhält sich bei ${emotion} zum Teil angemessen.`,
          `verhält sich bei ${emotion} nicht angemessen.`
        ]
      }
    ];
  }

  const TOPICS = {
    selbstkompetenz: {
      title: 'Selbstkompetenz',
      shortTitle: 'Selbstkompetenz',
      description: 'Beobachtung emotionaler Selbstregulation, Wahrnehmung eigener Gefühle und Verständnis der Gefühle anderer.',
      subtopics: [
        ...emotionSections('Wut'),
        ...emotionSections('Angst'),
        ...emotionSections('Traurigkeit')
      ]
    },
    sozialkompetenz: {
      title: 'Sozialkompetenz',
      shortTitle: 'Sozialkompetenz',
      description: 'Beobachtung von Hilfsbereitschaft, Gesprächsverhalten, Kontaktaufnahme und kooperativen Lösungsstrategien.',
      subtopics: [
        {
          title: 'Hilfsbereitschaft',
          questions: [
            'erkennt aus eigener Initiative, wenn andere Hilfe benötigen, und bietet Unterstützung an.',
            'nimmt Bedürfnisse anderer in offenen Situationen im bekannten Umfeld wahr und reagiert angemessen.',
            'nimmt Bedürfnisse anderer Bezugspersonen in einer vertrauten Situation wahr.',
            'nimmt Bedürfnisse bevorzugter Bezugspersonen mit Unterstützung und in strukturierten Situationen wahr.',
            'konzentriert sich ausschließlich auf eigene Bedürfnisse, unabhängig von situativen Hinweisen.'
          ]
        },
        {
          title: 'Toleranz gegenüber anderen Meinungen und Bereitschaft zur Einigung',
          questions: [
            'akzeptiert Meinungen, Ideen und Werte anderer; Kompromisse sind durch eigene Beiträge möglich.',
            'ist bereit, Meinungen, Ideen und Werte anderer zu verstehen und gleichberechtigt einzubeziehen.',
            'ist bereit, Werte und Überzeugungen anderer in situativen Kontexten zu verstehen.',
            'kann die Meinung, Ideen und Werte anderer in vertrauensvollen Gesprächen ansatzweise aufnehmen.',
            'nimmt ausschließlich die eigene Meinung, die eigenen Ideen und Werte wahr.'
          ]
        },
        {
          title: 'Beteiligung an Gesprächen',
          questions: [
            'tauscht sich gerne mit anderen aus und bringt sich konstruktiv in Gespräche ein.',
            'tauscht sich gerne mit anderen aus, hört anderen zu und geht auf sie ein.',
            'hört in Gesprächssituationen zunehmend zu und wendet Gesprächsphasen ein.',
            'tauscht sich nicht gerne aus; in strukturierten Situationen können Gesprächsbeiträge gelingen.',
            'tauscht sich nicht gerne aus; auch gut strukturierte Situationen brauchen enge Begleitung.'
          ]
        },
        {
          title: 'Kontaktaufnahme',
          questions: [
            'baut erlernte sozial angemessene Techniken der Kontaktaufnahme situationsgerecht aus.',
            'überträgt gelernte Techniken sozial angemessener Kontaktaufnahme in verschiedene Situationen.',
            'setzt eingeübte Techniken sozialer Kontaktaufnahme in bekannten, überschaubaren Situationen ein.',
            'setzt mit Unterstützung und in eng betreuten Übungssituationen sozial angemessenen Kontakt um.',
            'nimmt sozial unangemessen Kontakt auf und benötigt enge Begleitung.'
          ]
        },
        {
          title: 'Teilnahme an Gesprächen',
          questions: [
            'gestaltet Gespräche kooperativ und beeinflusst diese in sozial angemessener Weise.',
            'stellt in Gesprächen eigene Interessen zurück, wenn die Situation es erfordert.',
            'beteiligt sich sozial angemessen an Gesprächen, sofern eigene Meinungen berücksichtigt werden.',
            'nimmt meist, jedoch nicht ausschließlich, an Gesprächen teil, wenn eigene Ziele betroffen sind.',
            'nimmt ausschließlich dann an Gesprächen teil, um eigene Ziele und Interessen zu verfolgen.'
          ]
        },
        {
          title: 'Handlungs- und Lösungsstrategien',
          questions: [
            'bringt im Schulalltag eigene Ideen und Lösungsvorschläge ein und trägt zur Umsetzung bei.',
            'bringt im Schulalltag eigene Ideen und Lösungsvorschläge ein und erlebt Beteiligung als wirksam.',
            'setzt erarbeitete Strategien und Handlungsalternativen im Schulalltag mit Unterstützung ein.',
            'bringt im Schulalltag noch keine Ideen und Lösungsvorschläge eigenständig ein.',
            'bringt im Schulalltag keine eigenen Ideen und Lösungsvorschläge ein; enge Anleitung ist nötig.'
          ]
        }
      ]
    },
    konfliktverhalten: {
      title: 'Konfliktverhalten',
      shortTitle: 'Konfliktverhalten',
      description: 'Beobachtung von Problemlösefähigkeit, Hilfeannahme, Konfliktbeendigung und Wiedergutmachung.',
      subtopics: [
        {
          title: 'Problemlösefähigkeit',
          questions: [
            'findet auch in offenen Konfliktsituationen Lösungen für Probleme.',
            'erarbeitet nur in bekannten Situationen Lösungen für Probleme und setzt diese um.',
            'erarbeitet in strukturierten Situationen Lösungen für Probleme und setzt diese teilweise um.',
            'findet in strukturierten Situationen und in einem geschützten Rahmen ansatzweise Lösungen.',
            'findet aufgrund von Selbstbezogenheit, eigenen Nöten, Ängsten und Risiken kaum Lösungen.'
          ]
        },
        {
          title: 'Hilfe annehmen',
          questions: [
            'nimmt auch in offenen Konfliktsituationen Hilfen von außen an, sodass Klärung möglich wird.',
            'entwickelt punktuell Einsicht in die eigene Perspektive und Verständnis für Unterstützung.',
            'zeigt durch vertrauensvolle Intervention bei subjektiv bedeutsamen Ereignissen erste Offenheit.',
            'entwickelt durch vertrauensvolle Intervention eine Einsicht in die Notwendigkeit von Hilfe.',
            'benötigt für eine Verhaltensmodifikation nachhaltige und verlässliche Unterstützung.'
          ]
        },
        {
          title: 'Befinden nach Konflikten',
          questions: [
            'erlebt spürbare Entlastung, weil Konflikte auch in offenen Situationen durch Klärung bearbeitet werden.',
            'erlebt punktuelle Entlastung, wenn sie/er zur Lösung beiträgt.',
            'sucht nach Konflikten Ruhe und Rückzug, um das Erlebte zunächst für sich zu regulieren.',
            'erlebt nach Konflikten subjektive Entlastung durch selbstgefährdendes oder unangemessenes Verhalten.',
            'erlebt auch in geschütztem und vertrautem Rahmen keine Entlastung, da Konflikte fortwirken.'
          ]
        },
        {
          title: 'Konflikte beenden',
          questions: [
            'nimmt auch in offenen Konfliktsituationen Hilfen von außen wahr und beendet Konflikte angemessen.',
            'nimmt in bekannten Konfliktsituationen verbale Interventionen von außen an.',
            'nimmt in strukturierten Situationen vertrauensvolle Interventionen wahr und kann sich lösen.',
            'zeigt in Konflikten in strukturierten Situationen Selbst- und Fremdverletzungstendenzen.',
            'zeigt auch in stark strukturierten Situationen Selbst- und Fremdverletzung oder Eskalation.'
          ]
        },
        {
          title: 'Verständnis von Konfliktsituationen',
          questions: [
            'verhält sich empathisch für die Sichtweise des Gegenübers, auch auf Peer-Ebene.',
            'übernimmt nach einer Intervention die Perspektive des Gegenübers punktuell.',
            'entwickelt erste Einsicht in eigene Anteile des Konflikts und in die Perspektive anderer.',
            'agiert meist, jedoch nicht ausschließlich, in Konflikten mit Blick auf eigene Interessen.',
            'zeigt eine stark egozentrische, selbstbezogene Sicht und entwickelt situativ wenig Einsicht.'
          ]
        },
        {
          title: 'Konfliktlösung und Wiedergutmachung',
          questions: [
            'verträgt sich nach einem Konflikt mit anderen und macht Fehler wieder gut.',
            'erarbeitet nach einem Konflikt eigene Anteile einer konstruktiven Lösung und Wiedergutmachung.',
            'kennt konstruktive Lösungen und kann diese situativ umsetzen.',
            'erarbeitet durch vertrauensvolle Zuwendung Handlungsalternativen.',
            'benötigt eine langfristige Intervention zur Unterstützung der Verhaltensmodifikation.'
          ]
        }
      ]
    },
    regelverhalten: {
      title: 'Regelverhalten',
      shortTitle: 'Regelverhalten',
      description: 'Beobachtung von Regelakzeptanz, Einsicht nach Regelverstößen und Konsequenzen.',
      subtopics: [
        {
          title: 'Einhaltung von Klassen- und Schulregeln',
          questions: [
            'hält sich grundsätzlich an vereinbarte Regeln des Zusammenlebens.',
            'hält sich in der Kleingruppe an vereinbarte Regeln des Zusammenlebens.',
            'hält sich in einer selbst gewählten Partnerarbeit und unter Anleitung an gemeinsame Regeln.',
            'hält sich nur bei persönlichem Interesse und direkter Instruktion an vereinbarte Regeln.',
            'hält sich nur bei subjektiver Motivation und Setzung eindeutiger Konsequenzen an Regeln.'
          ]
        },
        {
          title: 'Einsicht bei Regelverstoß',
          questions: [
            'zeigt grundsätzlich Einsicht bei Fehlverhalten.',
            'zeigt in der Kleingruppe und mit Aussicht auf Belohnung Einsicht bei Fehlverhalten.',
            'zeigt bei selbst gewählter Partnerarbeit unter Anleitung und Aussicht auf Anerkennung Einsicht.',
            'zeigt bei direkter Intervention in Ansätzen Einsicht in Fehlverhalten.',
            'zeigt auch bei eindeutigen Konsequenzen keine Einsicht bei Fehlverhalten.'
          ]
        }
      ]
    },
    lernkompetenz: {
      title: 'Lernkompetenz',
      shortTitle: 'Lernkompetenz',
      description: 'Beobachtung von Motivation, Erledigung schulischer Anforderungen, Durchhaltevermögen, Aufmerksamkeit und Umgang mit Materialien.',
      subtopics: [
        {
          title: 'Motivation zur eigenständigen Arbeit',
          questions: [
            'ist von sich aus motiviert, Aufgaben alleine zu schaffen.',
            'lässt sich durch äußere Umstände oder andere Personen motivieren, Aufgaben alleine zu schaffen.',
            'lässt sich motivieren, Aufgaben alleine zu schaffen, wenn diese an den persönlichen Interessen anknüpfen.',
            'ist durch intensive Begleitung bereit, Aufgaben kurzzeitig zu bearbeiten.',
            'entwickelt nur durch intensive Begleitung und Zuwendung Lern- und Leistungsbereitschaft.'
          ]
        },
        {
          title: 'Erledigung schulischer Anforderungen',
          questions: [
            'erledigt die schulischen Anforderungen nach Ermutigung angemessen selbstständig.',
            'bearbeitet schulische Anforderungen in strukturierten Kontexten und mit unterstützendem Input.',
            'bearbeitet kurzzeitig schulische Anforderungen in strukturierten Kontexten.',
            'erfüllt kurzzeitig individuell vereinbarte schulische Anforderungen durch intensive Begleitung.',
            'schafft die Aufgaben noch nicht und erkennt schulische Anforderungen nur eingeschränkt als bedeutsam an.'
          ]
        },
        {
          title: 'Durchhaltevermögen bei schwierigen Aufgaben',
          questions: [
            'hält bei schwierigen Aufgaben durch. Schwierigkeiten werden konstruktiv bearbeitet.',
            'hält in strukturierten Kontexten und mit unterstützendem Input bei schwierigen Aufgaben durch.',
            'hält bei schwierigen Aufgaben durch, wenn auf persönlich erlebte Schwierigkeiten Rücksicht genommen wird.',
            'lässt sich nur kurzfristig auf schwierige Aufgaben ein und fühlt sich durch Anforderungen schnell belastet.',
            'hält bei jeglichen schulischen Anforderungen nicht durch. Die Teilnahme an Aufgaben gelingt kaum.'
          ]
        },
        {
          title: 'Aufmerksamkeit auf Aufgaben',
          questions: [
            'konzentriert sich ungeteilt und gezielt auf Aufgaben.',
            'konzentriert sich über einen vorgesehenen Zeitraum auf differenzierte Aufgabenstellungen.',
            'konzentriert sich mit Hilfe für eine vereinbarte Zeit auf differenzierte Aufgaben.',
            'konzentriert sich unter Anleitung kurzzeitig auf differenzierte Aufgabenstellungen.',
            'konzentriert sich, wenn überhaupt, nur mit Unterstützung kurzzeitig und phasenweise auf Aufgaben.'
          ]
        },
        {
          title: 'Erledigen von Aufgaben',
          questions: [
            'erledigt Aufgaben zügig und den Anforderungen entsprechend.',
            'erledigt Aufgaben in einem angemessenen Tempo.',
            'erledigt Aufgaben mit individueller Unterstützung angemessen und vollständig.',
            'bearbeitet Aufgaben in Ansätzen und setzt sie nach Unterbrechung fort. Der Arbeitsprozess bleibt instabil.',
            'erledigt mit individueller Unterstützung Aufgaben in Ansätzen. Der Arbeitsprozess benötigt enge Begleitung.'
          ]
        },
        {
          title: 'Umgang mit Materialien',
          questions: [
            'nutzt alle eigenen und fremden Materialien sorgfältig.',
            'nutzt eigene Materialien angemessen und sorgfältig.',
            'geht mit Materialien mit Unterstützung angemessen um.',
            'entwickelt ein Bewusstsein für einen sachgerechten Umgang mit Materialien.',
            'erachtet den sachgerechten Umgang mit Materialien als bedeutungslos.'
          ]
        }
      ]
    }
  };

  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));
  const page = document.body.dataset.page || '';
  const root = document.body.dataset.root || '';
  const topicKey = document.body.dataset.topic || '';
  const TOUR_MODE_KEY = 'splintDemo.tourMode.v4';
  const TOUR_DONE_PREFIX = 'splintDemo.tourDone.v4.';

  function link(path) { return `${root}${path}`; }

  function read(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
      console.warn('Lokaler Speicher konnte nicht gelesen werden.', error);
      return fallback;
    }
  }

  function write(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
  function getStudents() { return read(STUDENTS_KEY, []); }
  function setStudents(students) { write(STUDENTS_KEY, students); }
  function getObservations() { return read(OBSERVATIONS_KEY, []); }
  function setObservations(observations) { write(OBSERVATIONS_KEY, observations); }

  function id(prefix) {
    return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
  }

  function escapeHtml(value) {
    return String(value ?? '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  function formatDateGerman(value) {
    if (!value) return '–';
    const raw = String(value);
    const parts = raw.split('-');
    if (parts.length === 3) return `${parts[2]}.${parts[1]}.${parts[0]}`;
    if (/^\d{2}\.\d{2}\.\d{4}$/.test(raw)) return raw;
    return raw;
  }

  function parseGermanDate(value) {
    const trimmed = String(value || '').trim();
    const match = trimmed.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
    if (match) return `${match[3]}-${match[2]}-${match[1]}`;
    return trimmed;
  }

  function formatDateTime(value) {
    if (!value) return '–';
    try {
      return new Intl.DateTimeFormat('de-DE', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
      }).format(new Date(value));
    } catch {
      return value;
    }
  }

  function studentName(student) {
    if (!student) return 'Nicht zugeordnet';
    return `${student.firstName || ''} ${student.lastName || ''}`.trim() || 'Unbenannte:r Schüler:in';
  }

  function studentContext(student) {
    if (!student) {
      return {
        name: 'die ausgewählte Person', displayName: 'Nicht zugeordnet', group: '–', grade: '–',
        birthDate: '–', pronouns: '–', schoolYear: '–',
        detailLine: 'Bitte zuerst eine:n Schüler:in auswählen oder anlegen.'
      };
    }
    const name = studentName(student);
    const details = [
      student.group ? `Lerngruppe ${student.group}` : 'Lerngruppe nicht angegeben',
      student.grade ? `Jahrgang ${student.grade}` : 'Jahrgang nicht angegeben',
      student.schoolYear ? `Schulbesuchsjahr ${student.schoolYear}` : 'Schulbesuchsjahr nicht angegeben',
      `Geburtsdatum ${formatDateGerman(student.birthDate)}`
    ];
    return {
      name, displayName: name, group: student.group || '–', grade: student.grade || '–',
      birthDate: formatDateGerman(student.birthDate), pronouns: student.pronouns || '–',
      schoolYear: student.schoolYear || '–', detailLine: details.join(' · ')
    };
  }

  function activeStudentId() {
    const params = new URLSearchParams(window.location.search);
    const fromUrl = params.get('studentId');
    const students = getStudents();
    if (fromUrl && students.some(s => s.id === fromUrl)) {
      localStorage.setItem(ACTIVE_STUDENT_KEY, fromUrl);
      return fromUrl;
    }
    if (fromUrl) localStorage.removeItem(ACTIVE_STUDENT_KEY);
    const stored = localStorage.getItem(ACTIVE_STUDENT_KEY);
    if (stored && students.some(s => s.id === stored)) return stored;
    return students[0]?.id || '';
  }

  function getStudentById(studentId) { return getStudents().find(student => student.id === studentId) || null; }

  function setStatus(message, isError = false) {
    const status = $('#statusline');
    if (!status) return;
    status.textContent = message || '';
    status.classList.toggle('is-error', Boolean(isError));
  }

  function renderStudentOptions(select, selectedId = '') {
    if (!select) return;
    const students = getStudents();
    select.innerHTML = '';
    if (!students.length) {
      select.innerHTML = '<option value="">Keine Schüler:innen angelegt</option>';
      select.disabled = true;
      return;
    }
    select.disabled = false;
    students.forEach(student => {
      const option = document.createElement('option');
      option.value = student.id;
      option.textContent = studentName(student);
      if (student.id === selectedId) option.selected = true;
      select.appendChild(option);
    });
  }

  function setStudentRequiredElementState(element, studentId, options = {}) {
    if (!element) return;
    const hasStudent = Boolean(studentId && getStudentById(studentId));
    const hint = $('[data-tile-hint]', element);
    element.classList.toggle('tile-disabled', !hasStudent);
    element.classList.toggle('btn-disabled', !hasStudent && element.classList.contains('btn'));
    element.setAttribute('aria-disabled', String(!hasStudent));
    if (!hasStudent) {
      element.dataset.disabledHref = options.href || element.getAttribute('href') || '';
      element.removeAttribute('href');
      if (hint) hint.textContent = options.emptyHint || 'Zuerst Schüler:innenprofil anlegen und auswählen.';
      return;
    }
    if (options.href) element.setAttribute('href', options.href);
    if (hint) hint.textContent = options.readyHint || '';
  }

  function countAnswered(observation) {
    const answers = Object.values(observation.answers || {});
    return answers.filter(answer => answer.value !== '').length;
  }

  function totalItems(topic) {
    return (topic?.subtopics || []).reduce((sum, subtopic) => sum + subtopic.questions.length, 0);
  }

  function observationCard(observation) {
    const student = getStudentById(observation.studentId);
    const topic = TOPICS[observation.topicKey];
    const topicTitle = topic?.title || observation.topicTitle || 'Beobachtungsbogen';
    const answered = countAnswered(observation);
    const total = totalItems(topic);
    return `
      <article class="card observation-card">
        <span class="doc-icon" aria-hidden="true">▣</span>
        <div class="observation-copy">
          <h3>${escapeHtml(topicTitle)}</h3>
          <p class="card-meta">${escapeHtml(studentName(student))} · ${escapeHtml(formatDateTime(observation.updatedAt))} · ${answered}${total ? `/${total}` : ''} Einträge · ${escapeHtml(observation.status || 'Entwurf')}</p>
        </div>
        <div class="observation-actions">
          <a class="btn" href="${link(`beobachtung.html?studentId=${encodeURIComponent(observation.studentId || '')}`)}">Ansehen</a>
        </div>
      </article>
    `;
  }

  function renderDashboard() {
    const students = getStudents();
    const observations = getObservations();
    $('#statsStudents') && ($('#statsStudents').textContent = students.length);
    $('#statsObservations') && ($('#statsObservations').textContent = observations.length);

    const selectedId = activeStudentId();
    const selectedStudent = getStudentById(selectedId);
    setStudentRequiredElementState($('#dashboardStartObservation'), selectedId, {
      href: link(`mesk.html?studentId=${encodeURIComponent(selectedId || '')}`),
      emptyHint: 'Erst Profil anlegen',
      readyHint: selectedStudent ? `für ${studentName(selectedStudent)}` : ''
    });
    setStudentRequiredElementState($('#dashboardOpenProfile'), selectedId, {
      href: link(`beobachtung.html?studentId=${encodeURIComponent(selectedId || '')}`),
      emptyHint: 'Erst Profil anlegen',
      readyHint: selectedStudent ? `Profil: ${studentName(selectedStudent)}` : ''
    });

    const studentList = $('#studentList');
    if (studentList) {
      if (!students.length) {
        studentList.innerHTML = '<div class="empty-state">Noch keine Schüler:innen angelegt. Erstelle zuerst ein Profil, damit Beobachtungen eindeutig gespeichert werden können.</div>';
      } else {
        studentList.innerHTML = students.map(student => `
          <article class="card compact-card ${student.id === selectedId ? 'is-active' : ''}">
            <h3>${escapeHtml(studentName(student))}</h3>
            <p class="card-meta">${escapeHtml(student.group || 'Keine Lerngruppe')} · Jahrgang ${escapeHtml(student.grade || '–')} · Geburtsdatum ${escapeHtml(formatDateGerman(student.birthDate))}</p>
            <div class="card-actions">
              <a class="btn" href="${link(`beobachtung.html?studentId=${encodeURIComponent(student.id)}`)}">Profil öffnen</a>
              <a class="btn btn-secondary" href="${link(`mesk.html?studentId=${encodeURIComponent(student.id)}`)}">Beobachtung erstellen</a>
            </div>
          </article>
        `).join('');
      }
    }

    const observationList = $('#observationList');
    if (observationList) {
      if (!observations.length) {
        observationList.innerHTML = '<div class="empty-state">Noch keine Beobachtungsbögen gespeichert.</div>';
      } else {
        const sorted = [...observations].sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt)));
        observationList.innerHTML = sorted.map(observationCard).join('');
      }
    }
  }

  function fillStudentFormWithPreset(form, preset) {
    if (!form || !preset) return;
    Object.entries({
      firstName: preset.firstName, lastName: preset.lastName, birthDate: preset.birthDate,
      pronouns: preset.pronouns, group: preset.group, grade: preset.grade, schoolYear: preset.schoolYear
    }).forEach(([name, value]) => {
      const field = form.elements[name];
      if (field) field.value = value || '';
    });
    validateStudentForm(form);
    setStatus(`Vorschlag ${preset.firstName} ${preset.lastName} wurde übernommen. Prüfe die Daten und speichere das Profil.`);
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function initStudentPresetSlider(form) {
    const container = $('#studentPresetSlider');
    if (!container) return;
    container.innerHTML = DEMO_STUDENT_PRESETS.map((preset, index) => `
      <article class="preset-slide">
        <strong>${escapeHtml(preset.firstName)} ${escapeHtml(preset.lastName)}</strong>
        <span>${escapeHtml(preset.group)} · Jahrgang ${escapeHtml(preset.grade)} · ${escapeHtml(preset.birthDate)}</span>
        <p>${escapeHtml(preset.note)}</p>
        <button class="btn btn-secondary" type="button" data-preset-index="${index}">Übernehmen</button>
      </article>
    `).join('');
    const count = $('#presetCount');
    if (count) count.textContent = String(DEMO_STUDENT_PRESETS.length);
    container.addEventListener('click', event => {
      const button = event.target.closest('[data-preset-index]');
      if (!button) return;
      const preset = DEMO_STUDENT_PRESETS[Number(button.dataset.presetIndex)];
      fillStudentFormWithPreset(form, preset);
    });
  }

  function validateStudentForm(form) {
    const required = ['firstName', 'lastName', 'birthDate'];
    const isValid = required.every(name => String(form.elements[name]?.value || '').trim().length > 0);
    const button = $('#saveStudent');
    if (button) button.disabled = !isValid;
    return isValid;
  }

  function initStudentForm() {
    const form = $('#studentForm');
    if (!form) return;
    initStudentPresetSlider(form);
    const today = new Date();
    const fallback = new Intl.DateTimeFormat('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(today);
    if (form.elements.birthDate && !form.elements.birthDate.value) form.elements.birthDate.value = fallback;
    ['firstName', 'lastName', 'birthDate'].forEach(name => {
      const input = form.elements[name];
      if (input) input.addEventListener('input', () => validateStudentForm(form));
    });
    validateStudentForm(form);

    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!validateStudentForm(form)) {
        setStatus('Bitte Vorname, Nachname und Geburtsdatum ausfüllen.', true);
        return;
      }
      const formData = new FormData(form);
      const student = {
        id: id('student'),
        firstName: String(formData.get('firstName') || '').trim(),
        lastName: String(formData.get('lastName') || '').trim(),
        birthDate: parseGermanDate(formData.get('birthDate')),
        pronouns: String(formData.get('pronouns') || '').trim(),
        group: String(formData.get('group') || '').trim(),
        grade: String(formData.get('grade') || '').trim(),
        schoolYear: String(formData.get('schoolYear') || '').trim(),
        createdAt: new Date().toISOString()
      };
      const students = getStudents();
      students.push(student);
      setStudents(students);
      localStorage.setItem(ACTIVE_STUDENT_KEY, student.id);
      const continueCreating = Boolean(formData.get('continueCreating'));
      if (continueCreating) {
        form.reset();
        if (form.elements.birthDate) form.elements.birthDate.value = fallback;
        validateStudentForm(form);
        setStatus(`${studentName(student)} wurde gespeichert. Du kannst die nächste Person erfassen.`);
      } else {
        window.location.href = link(`beobachtung.html?studentId=${encodeURIComponent(student.id)}`);
      }
    });
  }

  function renderStudentProfile(student) {
    if (!student) {
      return `
        <div class="empty-state profile-empty">
          <strong>Kein Schüler:innenprofil ausgewählt.</strong><br>
          Lege zuerst ein Profil an. Erst dann können Beobachtungsbögen gestartet und gespeichert werden.
          <div class="card-actions"><a class="btn btn-primary" href="${link('schueler-anlegen.html')}">Schüler:in anlegen</a></div>
        </div>`;
    }
    return `
      <article class="card profile-card" data-tour-target="profile-main">
        <div class="profile-head">
          <div>
            <p class="upper tiny">Schüler:innenprofil</p>
            <h2>${escapeHtml(studentName(student))}</h2>
          </div>
          <div class="profile-tools-inline"><a class="btn btn-secondary" href="${link(`mesk.html?studentId=${encodeURIComponent(student.id)}`)}">Beobachtung erstellen</a></div>
        </div>
        <div class="profile-body">
          <dl class="profile-grid">
            <div class="kv"><dt>Lerngruppe</dt><dd>${escapeHtml(student.group || '–')}</dd></div>
            <div class="kv"><dt>Jahrgangsstufe</dt><dd>${escapeHtml(student.grade || '–')}</dd></div>
            <div class="kv"><dt>Geburtsdatum</dt><dd>${escapeHtml(formatDateGerman(student.birthDate))}</dd></div>
            <div class="kv"><dt>Schulbesuchsjahr</dt><dd>${escapeHtml(student.schoolYear || '–')}</dd></div>
            <div class="kv"><dt>Pronomen</dt><dd>${escapeHtml(student.pronouns || '–')}</dd></div>
          </dl>
        </div>
      </article>

      <section class="profile-section" id="peopleSection" data-tour-target="people">
        <h2>Beteiligte Personen <span aria-hidden="true">☻</span></h2>
        <p>Verantwortliche Personen: 1<br>Unterstützer:innen: 0<br>Förderziel-Mentor:innen: 0</p>
        <a href="#">Beteiligung verwalten ✎</a>
      </section>

      <section class="profile-section" id="strengthsSection" data-tour-target="strengths">
        <h2>Stärken und Interessen</h2>
        <p class="muted">Nicht vorhanden</p>
        <a href="#">Stärken oder Interesse hinzufügen ✎</a>
      </section>

      <section class="profile-section" id="planningTabs" data-tour-target="planning">
        <div class="tabbar"><button class="tab active" type="button">SPLINT Förderplanung</button><button class="tab" type="button">SPLINT Feedback</button></div>
        <div class="icon-menu"><span class="icon-menu-item"><span class="circle-icon">▥</span>Ergebnisse</span><span class="icon-menu-item icon-muted"><span class="circle-icon">□</span>Förderplan</span></div>
      </section>

      <section class="profile-section" id="compensationSection" data-tour-target="compensation">
        <h2>Nachteilsausgleich</h2>
        <p class="muted">Nicht vorhanden</p>
        <a href="#">Nachteilsausgleich hinzufügen ✎</a>
      </section>

      <section class="profile-section" id="agreementsSection" data-tour-target="agreements">
        <h2>Vereinbarungen</h2>
        <p>Hier kannst du getroffene Vereinbarungen zu ${escapeHtml(studentName(student))} vermerken. Sie sind für alle Verantwortlichen sichtbar.</p>
        <div class="agreement-row"><input type="text" placeholder="Neue Vereinbarung"><button class="btn btn-secondary" type="button">＋</button></div>
        <p class="muted">Für ${escapeHtml(studentName(student))} gibt es noch keine Vereinbarungen. Hinterlasse als erste:r eine Vereinbarung.</p>
      </section>
    `;
  }

  function renderObservationPage() {
    const selectedId = activeStudentId();
    const select = $('#studentSelect');
    renderStudentOptions(select, selectedId);
    if (select) {
      select.addEventListener('change', () => {
        localStorage.setItem(ACTIVE_STUDENT_KEY, select.value);
        window.location.href = link(`beobachtung.html?studentId=${encodeURIComponent(select.value)}`);
      });
    }
    const student = getStudentById(activeStudentId());
    const createLink = $('#createObservationLink');
    setStudentRequiredElementState(createLink, student?.id || '', {
      href: link(`mesk.html?studentId=${encodeURIComponent(student?.id || '')}`),
      emptyHint: 'Erst Profil anlegen'
    });
    const profile = $('#studentProfile');
    if (profile) profile.innerHTML = renderStudentProfile(student);

    const own = $('#ownObservations');
    if (own) {
      if (!student) {
        own.innerHTML = `<a class="tile tile-primary" href="${link('schueler-anlegen.html')}"><span class="tile-icon">＋</span><span>Zuerst Schüler:in anlegen</span></a>`;
      } else {
        const observations = getObservations().filter(observation => observation.studentId === student.id);
        own.innerHTML = `
          <a class="tile tile-primary" id="profileObservationTile" data-tour-target="profile-observation" href="${link(`mesk.html?studentId=${encodeURIComponent(student.id)}`)}">
            <span class="tile-icon">＋</span>
            <span>Weitere Beobachtung erstellen</span>
          </a>
          ${observations.map(observationCard).join('')}
        `;
      }
    }
  }

  function renderMeskPage() {
    const selectedId = activeStudentId();
    const select = $('#studentSelect');
    renderStudentOptions(select, selectedId);
    if (select) {
      select.addEventListener('change', () => {
        localStorage.setItem(ACTIVE_STUDENT_KEY, select.value);
        renderMeskPage();
      }, { once: true });
    }
    const studentId = $('#studentSelect')?.value || activeStudentId();
    const selectedStudent = getStudentById(studentId);
    const list = $('#topicList');
    if (!list) return;
    if (!selectedStudent) {
      setStatus('Der MeSK-Bogen wird erst freigeschaltet, wenn ein Schüler:innenprofil angelegt und ausgewählt wurde.', true);
      list.innerHTML = `
        <div class="empty-state topic-lock" data-tour-target="topic-list">
          <strong>Beobachtung noch gesperrt.</strong><br>
          Lege zuerst eine:n Schüler:in an oder wähle ein vorhandenes Profil aus.
          <div class="card-actions"><a class="btn btn-primary" href="${link('schueler-anlegen.html')}">Schüler:in anlegen</a></div>
        </div>
        ${TOPIC_ORDER.map(key => topicRowHtml(key, '', true)).join('')}
      `;
      return;
    }
    setStatus(`Ausgewählt: ${studentName(selectedStudent)}. Wähle jetzt einen Beobachtungsbereich.`, false);
    list.innerHTML = TOPIC_ORDER.map((key, index) => topicRowHtml(key, studentId, false, index)).join('');
  }

  function topicRowHtml(key, studentId, disabled = false, index = 0) {
    const topic = TOPICS[key];
    const itemCount = totalItems(topic);
    const attrs = index === 0 ? ' data-tour-target="topic-first"' : '';
    const inner = `
      <span class="topic-chevron" aria-hidden="true">›</span>
      <span class="topic-radio" aria-hidden="true"></span>
      <span class="topic-main"><strong>${escapeHtml(topic.title)}</strong><small>${escapeHtml(topic.description)}</small></span>
      <small class="topic-count">${topic.subtopics.length} Themen · ${itemCount} Items</small>
    `;
    if (disabled) return `<div class="topic-row topic-row-disabled" aria-disabled="true"${attrs}>${inner}</div>`;
    return `<a class="topic-row" href="${link(`themen/${key}.html?studentId=${encodeURIComponent(studentId || '')}`)}"${attrs}>${inner}</a>`;
  }

  function topicNav(currentKey) {
    const index = TOPIC_ORDER.indexOf(currentKey);
    const prevKey = TOPIC_ORDER[(index - 1 + TOPIC_ORDER.length) % TOPIC_ORDER.length];
    const nextKey = TOPIC_ORDER[(index + 1) % TOPIC_ORDER.length];
    const selectedId = activeStudentId();
    return `
      <div class="topic-screenbar" aria-label="Bereichsnavigation">
        <a href="${link(`themen/${prevKey}.html?studentId=${encodeURIComponent(selectedId || '')}`)}" aria-label="Vorheriger Bereich">‹</a>
        <strong>${escapeHtml(TOPICS[currentKey].title)}</strong>
        <a href="${link(`themen/${nextKey}.html?studentId=${encodeURIComponent(selectedId || '')}`)}" aria-label="Nächster Bereich">›</a>
      </div>`;
  }

  function caseCopy(key, ctx) {
    const name = ctx.name;
    const examples = {
      selbstkompetenz: {
        focus: ['Selbstregulation bei Wut, Angst und Traurigkeit', 'Wahrnehmung eigener Gefühle', 'Verständnis für Gefühle anderer'],
        paragraphs: [
          `${name} wird in ${ctx.detailLine} beobachtet. In der Demo-Situation arbeitet die Lerngruppe an einer Aufgabe, bei der Wartezeiten, Rückmeldungen und kleine Misserfolge entstehen. Dabei kann sichtbar werden, wie ${name} eigene emotionale Reaktionen wahrnimmt und ob bereits hilfreiche Strategien zur Regulation genutzt werden.`,
          `Besonders relevant ist, ob ${name} bei Wut, Angst oder Traurigkeit passende Unterstützung annimmt, eigene Gefühle benennen kann und nach einer kurzen Stabilisierung wieder handlungsfähig wird. Beobachte auch, ob Ursachen für die eigenen Reaktionen erkannt werden oder ob die Reaktion erst mit zeitlichem Abstand eingeordnet werden kann.`,
          `Für den Bogen kann außerdem notiert werden, ob ${name} emotionale Signale anderer Kinder erkennt. Ein geeignetes Beispiel wäre eine Partnerarbeit, in der ein anderes Kind unsicher, traurig oder verärgert reagiert und ${name} darauf entweder angemessen, verzögert oder gar nicht eingeht.`
        ]
      },
      sozialkompetenz: {
        focus: ['Hilfsbereitschaft', 'Toleranz und Einigung', 'Gesprächsbeteiligung und Kontaktaufnahme', 'Handlungs- und Lösungsstrategien'],
        paragraphs: [
          `${name} wird in ${ctx.detailLine} innerhalb einer kooperativen Unterrichtssituation beobachtet. Die Gruppe erhält eine gemeinsame Aufgabe, bei der Material geteilt, Rollen abgesprochen und unterschiedliche Vorschläge ausgehandelt werden müssen.`,
          `Achte darauf, ob ${name} wahrnimmt, wenn andere Unterstützung benötigen, und ob Hilfe eigeninitiativ, nach Aufforderung oder nur in stark strukturierten Situationen angeboten wird. Ebenso wichtig ist, wie ${name} auf andere Meinungen reagiert: Werden Kompromisse möglich, werden Beiträge anderer gehört oder dominiert die eigene Sichtweise?`,
          `Für die Einschätzung sind konkrete Gesprächsanteile hilfreich. Notiere, ob ${name} Kontakt sozial angemessen aufnimmt, Gesprächsregeln einhält, eigene Interessen zeitweise zurückstellen kann und ob aus der Gruppe heraus eigene Lösungsvorschläge entstehen.`
        ]
      },
      konfliktverhalten: {
        focus: ['Problemlösefähigkeit', 'Hilfe annehmen', 'Konflikte beenden', 'Wiedergutmachung'],
        paragraphs: [
          `${name} wird in ${ctx.detailLine} in einer kontrollierten Konfliktsituation beobachtet, zum Beispiel bei einer Uneinigkeit über Material, Reihenfolge, Spielregeln oder Zuständigkeiten in einer Gruppenarbeit.`,
          `Im Mittelpunkt steht, ob ${name} eigene Anteile am Konflikt erkennen kann und ob angebotene Hilfen angenommen werden. Beobachte, ob verbale Interventionen, vertrauliche Ansprache oder eine klare Struktur dazu führen, dass ${name} aus der Eskalation herausfindet und wieder ansprechbar wird.`,
          `Für den Bogen ist bedeutsam, wie der Konflikt endet. Hält die Entlastung an, zieht sich ${name} zunächst zurück, entsteht erneute Spannung oder gelingt eine Wiedergutmachung? Formuliere Notizen möglichst konkret, damit die Einschätzung später nachvollziehbar bleibt.`
        ]
      },
      regelverhalten: {
        focus: ['Klassen- und Schulregeln', 'Einsicht bei Regelverstoß', 'Reaktion auf Konsequenzen'],
        paragraphs: [
          `${name} wird in ${ctx.detailLine} während wiederkehrender Unterrichtsabläufe beobachtet. Geeignet sind Situationen wie Arbeitsbeginn, Übergänge, Partnerarbeit, Pausenrückkehr oder der Umgang mit vereinbarten Gesprächs- und Bewegungsregeln.`,
          `Achte darauf, ob ${name} Regeln aus eigener Orientierung einhält oder ob klare Erinnerung, persönliche Ansprache, Belohnungsaussicht oder eindeutige Konsequenzen nötig sind. Entscheidend ist nicht nur der Regelverstoß selbst, sondern auch die Einsicht danach.`,
          `Für eine aussagekräftige Beobachtung sollte festgehalten werden, ob ${name} Fehlverhalten erkennt, Verantwortung übernimmt und das Verhalten anschließend anpasst. Die Demo zeigt damit, wie Regelakzeptanz und Reflexionsfähigkeit systematisch dokumentiert werden können.`
        ]
      },
      lernkompetenz: {
        focus: ['Motivation zur eigenständigen Arbeit', 'Erledigung schulischer Anforderungen', 'Durchhaltevermögen', 'Aufmerksamkeit und Materialumgang'],
        paragraphs: [
          `${name} wird in ${ctx.detailLine} während einer schulischen Arbeitsphase beobachtet. Die Aufgabe sollte einen klaren Arbeitsauftrag, Materialnutzung, eine Bearbeitungszeit und mindestens eine schwierigere Anforderung enthalten.`,
          `Beobachte, ob ${name} von sich aus beginnt, ob Motivation durch Interessen, Ermutigung oder intensive Begleitung entsteht und wie lange die Aufmerksamkeit aufrechterhalten wird. Relevant ist auch, ob Aufgaben vollständig, zügig und den Anforderungen entsprechend bearbeitet werden.`,
          `Für die Notizen eignen sich konkrete Hinweise zum Arbeitsprozess: Wie geht ${name} mit Unterbrechungen um? Werden Materialien sorgfältig genutzt? Werden schwierige Aufgaben fortgesetzt oder abgebrochen? Dadurch lässt sich die Lernkompetenz differenziert und präsentationsnah darstellen.`
        ]
      }
    };
    return examples[key] || { focus: ['Beobachtungsinhalt', 'Situation', 'Dokumentation'], paragraphs: [`Für ${name} wird ein passendes Fallbeispiel angezeigt.`] };
  }

  function renderCaseExample(key, student) {
    const container = $('#caseExample');
    if (!container) return;
    const ctx = studentContext(student);
    const copy = caseCopy(key, ctx);
    container.innerHTML = `
      <p class="upper tiny">Automatisch aus Schülerdaten generiert</p>
      <h2 id="case-title">Fallbeispiel: ${escapeHtml(TOPICS[key]?.title || 'Beobachtung')}</h2>
      <dl class="case-meta-grid">
        <div><dt>Schüler:in</dt><dd>${escapeHtml(ctx.displayName)}</dd></div>
        <div><dt>Lerngruppe</dt><dd>${escapeHtml(ctx.group)}</dd></div>
        <div><dt>Jahrgang</dt><dd>${escapeHtml(ctx.grade)}</dd></div>
        <div><dt>Schulbesuchsjahr</dt><dd>${escapeHtml(ctx.schoolYear)}</dd></div>
        <div><dt>Geburtsdatum</dt><dd>${escapeHtml(ctx.birthDate)}</dd></div>
        <div><dt>Pronomen</dt><dd>${escapeHtml(ctx.pronouns)}</dd></div>
      </dl>
      <div class="case-copy">${copy.paragraphs.map(p => `<p>${escapeHtml(p)}</p>`).join('')}</div>
      <div class="case-focus"><strong>Im Bogen besonders prüfen:</strong><ul>${copy.focus.map(i => `<li>${escapeHtml(i)}</li>`).join('')}</ul></div>
    `;
  }

  function renderTopicPage() {
    const topic = TOPICS[topicKey];
    if (!topic) return;
    $('#topicTitle') && ($('#topicTitle').textContent = topic.title);
    $('#topicDescription') && ($('#topicDescription').textContent = topic.description);
    $('#topicToolbar') && ($('#topicToolbar').innerHTML = topicNav(topicKey));

    const selectedId = activeStudentId();
    const select = $('#studentSelect');
    renderStudentOptions(select, selectedId);
    const student = getStudentById(select?.value || selectedId);
    $('#selectedStudentName') && ($('#selectedStudentName').textContent = studentName(student));
    renderCaseExample(topicKey, student);

    const form = $('#topicForm');
    const container = $('#questionContainer');
    if (!form || !container) return;
    container.innerHTML = `
      <div class="rubric-panel">
        ${topic.subtopics.map((subtopic, subIndex) => `
          <section class="rubric-section" aria-labelledby="subtopic-${subIndex}">
            <h3 id="subtopic-${subIndex}" class="rubric-heading">${escapeHtml(subtopic.title)}</h3>
            <div class="rubric-list">
              ${subtopic.questions.map((question, questionIndex) => {
                const name = `q_${subIndex}_${questionIndex}`;
                return `
                  <div class="rubric-row" data-question-row role="group" aria-labelledby="${name}_statement">
                    <div class="rubric-statement" id="${name}_statement">
                      <span class="rubric-blur" aria-hidden="true"></span>
                      <span class="rubric-question">${escapeHtml(question)}</span>
                    </div>
                    <div class="rubric-scale" role="radiogroup" aria-label="Einschätzung zu: ${escapeHtml(question)}">
                      ${SCALE.map(item => `
                        <label class="rubric-choice">
                          <input type="radio" name="${name}" value="${item.value}" data-label="${escapeHtml(item.label)}">
                          <span>${escapeHtml(item.label)}</span>
                        </label>
                      `).join('')}
                    </div>
                  </div>`;
              }).join('')}
            </div>
          </section>
        `).join('')}
      </div>`;

    let hasScrolledToNotes = false;
    const updateTopicStudentState = () => {
      const currentId = $('#studentSelect')?.value || '';
      const selectedStudent = getStudentById(currentId);
      const hasStudent = Boolean(selectedStudent);
      $('#selectedStudentName') && ($('#selectedStudentName').textContent = hasStudent ? studentName(selectedStudent) : 'Keine Schüler:in ausgewählt');
      renderCaseExample(topicKey, selectedStudent);
      $$('#questionContainer input, #notes').forEach(field => { field.disabled = !hasStudent; });
      $('#questionContainer')?.classList.toggle('is-disabled', !hasStudent);
      if (!hasStudent) setStatus('Bitte zuerst eine:n Schüler:in anlegen und im Auswahlfeld aktiv auswählen.', true);
      else setStatus(`Beobachtung für ${studentName(selectedStudent)} vorbereitet. Beantworte jedes Item.`, false);
      updateTopicCompletion(false);
    };

    const answerNames = topic.subtopics.flatMap((subtopic, subIndex) => subtopic.questions.map((question, questionIndex) => `q_${subIndex}_${questionIndex}`));
    function incompleteNames() {
      return answerNames.filter(name => !form.elements[name]?.value);
    }
    function updateTopicCompletion(allowAutoScroll = true) {
      const studentId = $('#studentSelect')?.value || selectedId;
      const hasStudent = Boolean(getStudentById(studentId));
      const missing = incompleteNames();
      const complete = hasStudent && missing.length === 0;
      const save = $('#saveObservation');
      if (save) save.classList.toggle('btn-ready', complete);
      $('#completionCount') && ($('#completionCount').textContent = `${answerNames.length - missing.length}/${answerNames.length} beantwortet`);
      if (complete) {
        setStatus('Alle Items sind beantwortet. Du kannst optional eine Notiz eintragen und die Beobachtung speichern.', false);
        if (allowAutoScroll && !hasScrolledToNotes) {
          hasScrolledToNotes = true;
          window.setTimeout(() => $('#notesBlock')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 80);
        }
      }
      return complete;
    }

    if (select) {
      select.addEventListener('change', () => {
        localStorage.setItem(ACTIVE_STUDENT_KEY, select.value);
        updateTopicStudentState();
      });
    }
    container.addEventListener('change', event => {
      if (!event.target.matches('input[type="radio"]')) return;
      const row = event.target.closest('[data-question-row]');
      if (row) row.classList.remove('is-missing');
      updateTopicCompletion(true);
    });

    updateTopicStudentState();

    form.addEventListener('submit', event => {
      event.preventDefault();
      const studentId = $('#studentSelect')?.value || selectedId;
      if (!studentId || !getStudentById(studentId)) {
        setStatus('Bitte zuerst eine:n Schüler:in anlegen und auswählen. Ohne Profil kann keine Beobachtung gespeichert werden.', true);
        return;
      }
      const missing = incompleteNames();
      $$('#questionContainer [data-question-row]').forEach(row => row.classList.remove('is-missing'));
      if (missing.length) {
        const firstMissing = form.elements[missing[0]]?.[0]?.closest('[data-question-row]') || form.elements[missing[0]]?.closest?.('[data-question-row]');
        if (firstMissing) {
          firstMissing.classList.add('is-missing');
          firstMissing.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        setStatus(`Noch ${missing.length} Item${missing.length === 1 ? '' : 's'} offen. Bitte wähle in jeder Zeile eine Einschätzung.`, true);
        return;
      }
      const answers = {};
      topic.subtopics.forEach((subtopic, subIndex) => {
        subtopic.questions.forEach((question, questionIndex) => {
          const name = `q_${subIndex}_${questionIndex}`;
          const value = form.elements[name]?.value || '';
          answers[name] = { subtopic: subtopic.title, question, value, scaleLabel: SCALE.find(item => item.value === value)?.label || '' };
        });
      });
      const observations = getObservations();
      const now = new Date().toISOString();
      observations.push({
        id: id('obs'), studentId, type: 'MeSK', topicKey, topicTitle: topic.title,
        answers, notes: String($('#notes')?.value || '').trim(), status: 'Gespeichert', createdAt: now, updatedAt: now
      });
      setObservations(observations);
      localStorage.setItem(ACTIVE_STUDENT_KEY, studentId);
      setStatus('Beobachtungsbogen wurde lokal gespeichert. Weiterleitung zur Hauptseite …');
      window.setTimeout(() => { window.location.href = link('index.html'); }, 650);
    });
  }

  function initDemoReset() {
    const reset = $('#resetDemo');
    if (reset) {
      reset.addEventListener('click', () => {
        if (!confirm('Lokale Demo-Daten wirklich löschen?')) return;
        localStorage.removeItem(STUDENTS_KEY);
        localStorage.removeItem(OBSERVATIONS_KEY);
        localStorage.removeItem(ACTIVE_STUDENT_KEY);
        window.location.reload();
      });
    }
    const seed = $('#seedDemo');
    if (seed) {
      seed.addEventListener('click', () => {
        const existingStudents = getStudents();
        if (existingStudents.length && !confirm('Es sind bereits Daten vorhanden. Demo-Daten ergänzen?')) return;
        const studentId = id('student');
        const student = { id: studentId, firstName: 'Mika', lastName: 'Schneider', birthDate: '2016-06-20', pronouns: 'Xier / Xies', group: '4a', grade: '4', schoolYear: '5', createdAt: new Date().toISOString() };
        const obs = { id: id('obs'), studentId, type: 'MeSK', topicKey: 'selbstkompetenz', topicTitle: 'Selbstkompetenz', answers: {}, notes: 'Demo-Beobachtung für die Präsentation.', status: 'Entwurf', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
        setStudents([...existingStudents, student]);
        setObservations([...getObservations(), obs]);
        localStorage.setItem(ACTIVE_STUDENT_KEY, studentId);
        window.location.reload();
      });
    }
  }

  function pageTourKey() {
    if (page === 'topic') return `topic-${topicKey}`;
    return page || 'page';
  }

  function getTourSteps() {
    const steps = {
      dashboard: [
        { target: '#dashboardStudentTile', title: 'Schritt 1: Schüler:innenprofil anlegen', text: 'Eine Beobachtung ist erst sinnvoll und speicherbar, wenn ein Profil existiert. Beginne hier mit dem Anlegen einer Schüler:in.' },
        { target: '#dashboardStartObservation', title: 'Schritt 2: Beobachtung starten', text: 'Sobald ein Profil vorhanden ist, führt diese Kachel zur MeSK-Auswahl. Ohne ausgewählte Schüler:in bleibt sie gesperrt.' },
        { target: '#dashboardStats', title: 'Übersicht', text: 'Diese Kacheln zeigen, wie viele Profile und Beobachtungsbögen lokal im Browser gespeichert sind.' },
        { target: '#dashboardSide', title: 'Gespeicherte Inhalte', text: 'Rechts erscheinen angelegte Schüler:innen und gespeicherte Beobachtungsbögen. Nach dem Speichern eines Bogens kommst du hierher zurück.' }
      ],
      'student-form': [
        { target: '#studentPresetPanel', title: 'Demo-Vorschläge', text: 'Links kannst du eines von fünf Beispielprofilen übernehmen. Das ist für eine Präsentation schneller als freie Eingabe.' },
        { target: '#studentFormPanel', title: 'Profilformular', text: 'Hier werden die relevanten Schüler:innendaten erfasst. Pflichtfelder sind Vorname, Nachname und Geburtsdatum.' },
        { target: '#saveStudent', title: 'Profil speichern', text: 'Nach dem Prüfen der Angaben speicherst du das Profil. Danach ist diese Person automatisch ausgewählt und Beobachtungen werden freigeschaltet.' }
      ],
      observation: [
        { target: '#studentSelect', title: 'Schüler:in auswählen', text: 'Alle Profilinformationen und Beobachtungsbögen beziehen sich auf die hier ausgewählte Person.' },
        { target: '#studentProfile', title: 'Profilbereich', text: 'Hier werden Grunddaten und SPLINT-nahe Bereiche des Profils angezeigt.' },
        { target: '#peopleSection', title: 'Beteiligte Personen', text: 'Dieser Bereich steht für Verantwortliche, Unterstützer:innen und weitere Beteiligte am Förderprozess.' },
        { target: '#strengthsSection', title: 'Stärken und Interessen', text: 'Hier könnten Stärken, Interessen und Ressourcen der Schüler:in ergänzt werden.' },
        { target: '#planningTabs', title: 'Förderplanung und Feedback', text: 'Die Tabs stehen beispielhaft für Förderplanung, Ergebnisse und Feedbackfunktionen in SPLINT.' },
        { target: '#compensationSection', title: 'Nachteilsausgleich', text: 'Hier könnte ein Nachteilsausgleich dokumentiert oder ergänzt werden.' },
        { target: '#agreementsSection', title: 'Vereinbarungen', text: 'Vereinbarungen machen Absprachen für beteiligte Personen nachvollziehbar.' },
        { target: '#profileObservationTile', title: 'Beobachtungsbogen erstellen', text: 'Über diese Kachel wechselst du zur MeSK-Auswahl und startest einen neuen Beobachtungsbogen.' }
      ],
      mesk: [
        { target: '#meskBox', title: 'MeSK-Fragebogen', text: 'In dieser Demo wird im Seminar mit dem MeSK-Fragebogen gearbeitet. Er dient der Einschätzung emotionaler und sozialer Kompetenzen.' },
        { target: '#studentSelect', title: 'Profilzuordnung', text: 'Wähle die Schüler:in aus, für die der Bogen angelegt werden soll. Ohne Auswahl sind die Bereiche gesperrt.' },
        { target: '#topicList', title: 'Kompetenzbereiche', text: 'Die Oberkategorien führen zu eigenen Beobachtungsbögen. Für die Demo wählst du einen Bereich aus und füllst ihn aus.' },
        { target: '[data-tour-target="topic-first"]', title: 'Bereich auswählen', text: 'Klicke nach dem Tutorial auf einen Kompetenzbereich, zum Beispiel Selbstkompetenz oder Sozialkompetenz.' }
      ],
      'topic-selbstkompetenz': topicSteps('Selbstkompetenz'),
      'topic-sozialkompetenz': topicSteps('Sozialkompetenz'),
      'topic-konfliktverhalten': topicSteps('Konfliktverhalten'),
      'topic-regelverhalten': topicSteps('Regelverhalten'),
      'topic-lernkompetenz': topicSteps('Lernkompetenz')
    };
    return steps[pageTourKey()] || [];
  }

  function topicSteps(label) {
    return [
      { target: '#caseExample', title: 'Fallbeispiel zur ausgewählten Person', text: `Links wird aus dem ausgewählten Schüler:innenprofil ein ausführliches Fallbeispiel für ${label} generiert. Es hilft, die Items in eine konkrete Beobachtungssituation einzuordnen.` },
      { target: '#studentSelect', title: 'Schüler:innenbezug', text: 'Prüfe, ob die richtige Person ausgewählt ist. Die gespeicherte Beobachtung wird diesem Profil zugeordnet.' },
      { target: '#questionContainer', title: 'Beobachtungsitems', text: 'Im Bogen sind verschiedene Teilbereiche aufgeführt. Wähle je Aussage genau eine Einschätzung.' },
      { target: '#notesBlock', title: 'Notizen', text: 'Wenn alle Items beantwortet sind, kannst du hier konkrete Beobachtungssituationen oder Kontextinformationen ergänzen.' },
      { target: '#saveObservation', title: 'Speichern', text: 'Die Beobachtung kann nur gespeichert werden, wenn jedes Item beantwortet wurde. Danach wirst du zur Hauptseite zurückgeführt.' }
    ];
  }

  let activeTour = null;

  function showWelcomeChoice() {
    if (localStorage.getItem(TOUR_MODE_KEY)) return;
    const wrapper = document.createElement('div');
    wrapper.className = 'tour-choice-backdrop';
    wrapper.innerHTML = `
      <div class="tour-choice-card" role="dialog" aria-modal="true" aria-labelledby="tour-choice-title">
        <p class="upper tiny">SPLINT One Demo</p>
        <h2 id="tour-choice-title">So nutzt du diese Demo</h2>
        <p>Dieses Demo-Tool zeigt vereinfacht, wie in SPLINT ein Schüler:innenprofil angelegt, ein MeSK-Beobachtungsbogen ausgewählt, ausgefüllt und anschließend lokal gespeichert wird. Die Demo kann im Seminar genutzt werden, um den Ablauf nachzuvollziehen und exemplarisch über mögliche Dokumentation und Weitergabe im Kollegium zu sprechen.</p>
        <div class="choice-grid">
          <button class="choice-card" type="button" data-choice="guided"><strong>Tutorial-Tour starten</strong><span>Die wichtigsten Bereiche werden nacheinander mit Spotlight und kurzer Erklärung gezeigt.</span></button>
          <button class="choice-card" type="button" data-choice="free"><strong>Frei entdecken</strong><span>Alle Tutorial-Overlays werden deaktiviert. Du kannst die Demo selbstständig ausprobieren.</span></button>
        </div>
      </div>`;
    document.body.appendChild(wrapper);
    wrapper.addEventListener('click', event => {
      const choice = event.target.closest('[data-choice]');
      if (!choice) return;
      const mode = choice.dataset.choice === 'guided' ? 'guided' : 'free';
      localStorage.setItem(TOUR_MODE_KEY, mode);
      wrapper.remove();
      if (mode === 'guided') startTour(false);
    });
  }

  function startTour(force = true) {
    const steps = getTourSteps().filter(step => $(step.target));
    if (!steps.length) return;
    if (!force && localStorage.getItem(TOUR_DONE_PREFIX + pageTourKey()) === 'true') return;
    activeTour = { steps, index: 0, overlay: null, tooltip: null, highlight: null };
    document.body.classList.add('tour-active');
    activeTour.overlay = document.createElement('div');
    activeTour.overlay.className = 'tour-overlay';
    activeTour.overlay.setAttribute('aria-hidden', 'true');
    activeTour.tooltip = document.createElement('div');
    activeTour.tooltip.className = 'tour-tooltip';
    activeTour.tooltip.setAttribute('role', 'dialog');
    activeTour.tooltip.setAttribute('aria-live', 'polite');
    document.body.append(activeTour.overlay, activeTour.tooltip);
    renderTourStep();
  }

  function renderTourStep() {
    if (!activeTour) return;
    const step = activeTour.steps[activeTour.index];
    const target = $(step.target);
    if (!target) { finishTour(); return; }
    if (activeTour.highlight) activeTour.highlight.classList.remove('tour-highlight');
    activeTour.highlight = target;
    target.classList.add('tour-highlight');
    target.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
    window.setTimeout(() => positionTourTooltip(step, target), 260);
  }

  function positionTourTooltip(step, target) {
    if (!activeTour) return;
    const finalStep = activeTour.index === activeTour.steps.length - 1;
    const tooltip = activeTour.tooltip;
    tooltip.innerHTML = `
      <p class="tour-step-count">Schritt ${activeTour.index + 1} von ${activeTour.steps.length}</p>
      <h2>${escapeHtml(step.title)}</h2>
      <p>${escapeHtml(step.text)}</p>
      <div class="tour-controls">
        <button class="btn btn-ghost" type="button" data-tour-close>Freies Entdecken</button>
        <div class="tour-control-right">
          ${activeTour.index > 0 ? '<button class="btn" type="button" data-tour-prev>Zurück</button>' : ''}
          <button class="btn btn-primary" type="button" data-tour-next>${finalStep ? 'Verstanden' : 'Weiter'}</button>
        </div>
      </div>`;
    const rect = target.getBoundingClientRect();
    const tipRect = tooltip.getBoundingClientRect();
    const margin = 18;
    const viewportW = window.innerWidth;
    const viewportH = window.innerHeight;
    let left;
    let top;
    let placement = 'bottom';
    if (viewportW >= 900 && rect.right + tipRect.width + margin < viewportW) {
      left = rect.right + margin; top = Math.max(margin, Math.min(rect.top, viewportH - tipRect.height - margin)); placement = 'left';
    } else if (viewportW >= 900 && rect.left - tipRect.width - margin > 0) {
      left = rect.left - tipRect.width - margin; top = Math.max(margin, Math.min(rect.top, viewportH - tipRect.height - margin)); placement = 'right';
    } else {
      left = Math.max(margin, Math.min((viewportW - tipRect.width) / 2, viewportW - tipRect.width - margin));
      if (rect.bottom + tipRect.height + margin < viewportH) top = rect.bottom + margin;
      else top = Math.max(margin, rect.top - tipRect.height - margin);
      placement = top < rect.top ? 'bottom' : 'top';
    }
    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
    tooltip.dataset.placement = placement;
  }

  function finishTour() {
    if (!activeTour) return;
    if (activeTour.highlight) activeTour.highlight.classList.remove('tour-highlight');
    activeTour.overlay?.remove();
    activeTour.tooltip?.remove();
    activeTour = null;
    document.body.classList.remove('tour-active');
    localStorage.setItem(TOUR_DONE_PREFIX + pageTourKey(), 'true');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  document.addEventListener('click', event => {
    if (!activeTour) return;
    if (event.target.closest('[data-tour-next]')) {
      event.preventDefault();
      if (activeTour.index >= activeTour.steps.length - 1) finishTour();
      else { activeTour.index += 1; renderTourStep(); }
    } else if (event.target.closest('[data-tour-prev]')) {
      event.preventDefault();
      activeTour.index = Math.max(0, activeTour.index - 1);
      renderTourStep();
    } else if (event.target.closest('[data-tour-close]')) {
      event.preventDefault();
      localStorage.setItem(TOUR_MODE_KEY, 'free');
      finishTour();
    }
  });

  window.addEventListener('resize', () => {
    if (!activeTour) return;
    const step = activeTour.steps[activeTour.index];
    const target = $(step.target);
    if (target) positionTourTooltip(step, target);
  });

  function initTourSystem() {
    const restart = $('#restartTour');
    if (restart) {
      restart.addEventListener('click', () => {
        localStorage.setItem(TOUR_MODE_KEY, 'guided');
        localStorage.removeItem(TOUR_DONE_PREFIX + pageTourKey());
        startTour(true);
      });
    }
    if (!localStorage.getItem(TOUR_MODE_KEY)) {
      showWelcomeChoice();
      return;
    }
    if (localStorage.getItem(TOUR_MODE_KEY) === 'guided') {
      window.setTimeout(() => startTour(false), 250);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    initDemoReset();
    if (page === 'dashboard') renderDashboard();
    if (page === 'student-form') initStudentForm();
    if (page === 'observation') renderObservationPage();
    if (page === 'mesk') renderMeskPage();
    if (page === 'topic') renderTopicPage();
    initTourSystem();
  });
})();
