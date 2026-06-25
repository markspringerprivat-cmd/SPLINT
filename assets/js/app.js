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

  function absoluteLink(path) {
    return new URL(link(path), window.location.href).href;
  }

  function pageUrlWithoutHash() {
    const url = new URL(window.location.href);
    url.hash = '';
    return url.href;
  }

  function shareLandingUrl() {
    return absoluteLink('share.html');
  }

  function demoHomeUrl() {
    return absoluteLink('index.html');
  }

  function qrImageEndpoint(url, size = 360) {
    const safeSize = Math.max(120, Math.min(Number(size) || 360, 800));
    return `https://quickchart.io/qr?margin=1&size=${safeSize}&text=${encodeURIComponent(url)}`;
  }

  function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise((resolve, reject) => {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        const ok = document.execCommand('copy');
        textarea.remove();
        ok ? resolve() : reject(new Error('copy failed'));
      } catch (error) {
        reject(error);
      }
    });
  }

  function initQrElements() {
    $$('[data-qr-target]').forEach(element => {
      const target = element.dataset.qrTarget || 'current';
      const size = element.dataset.qrSize || '360';
      const targetUrl = target === 'share' ? shareLandingUrl() : target === 'home' ? demoHomeUrl() : pageUrlWithoutHash();
      if (element.tagName === 'IMG') {
        element.src = qrImageEndpoint(targetUrl, size);
        element.alt = element.alt || `QR-Code für ${targetUrl}`;
      } else {
        element.innerHTML = `<img src="${qrImageEndpoint(targetUrl, size)}" alt="QR-Code für ${escapeHtml(targetUrl)}">`;
      }
    });
  }

  function initSharePage() {
    initQrElements();
    if (page !== 'share') return;

    const shareUrl = shareLandingUrl();
    const homeUrl = demoHomeUrl();
    const title = 'SPLINT One Demo';
    const text = 'Hier kannst du die SPLINT Demo öffnen und teilen.';
    const status = $('#shareStatus');
    const setShareStatus = (message, isError = false) => {
      if (!status) return;
      status.textContent = message;
      status.classList.toggle('is-error', Boolean(isError));
    };

    $('#shareUrl') && ($('#shareUrl').textContent = shareUrl);
    const openDemo = $('#openDemoHere');
    if (openDemo) openDemo.href = homeUrl;

    const body = `${text}

Teilenseite: ${shareUrl}
Demo direkt öffnen: ${homeUrl}`;
    const email = $('#emailShare');
    if (email) email.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`;
    const whatsapp = $('#whatsappShare');
    if (whatsapp) whatsapp.href = `https://wa.me/?text=${encodeURIComponent(`${title}: ${shareUrl}`)}`;
    const telegram = $('#telegramShare');
    if (telegram) telegram.href = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`;

    const nativeShare = $('#nativeShare');
    if (nativeShare) {
      if (!navigator.share) {
        nativeShare.textContent = 'System-Teilen nicht verfügbar';
        nativeShare.disabled = true;
      }
      nativeShare.addEventListener('click', async () => {
        try {
          if (!navigator.share) return;
          await navigator.share({ title, text, url: shareUrl });
          setShareStatus('Teilen-Menü wurde geöffnet.');
        } catch (error) {
          setShareStatus('Teilen wurde abgebrochen oder ist auf diesem Gerät nicht verfügbar.', true);
        }
      });
    }

    $('#copyShareLink')?.addEventListener('click', async () => {
      try {
        await copyToClipboard(shareUrl);
        setShareStatus('Link zur Teilenseite wurde kopiert.');
      } catch (error) {
        setShareStatus('Der Link konnte nicht automatisch kopiert werden. Markiere die Adresse und kopiere sie manuell.', true);
      }
    });
  }

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
    const d = ctx.detailLine;
    const examples = {
      selbstkompetenz: {
        focus: [
          'Selbstregulation bei Wut, Angst und Traurigkeit',
          'Verständnis der eigenen Gefühle',
          'Verständnis der Gefühle anderer',
          'situationsangemessenes Verhalten bei emotionaler Belastung'
        ],
        intro: [
          `${name} wird in ${d} beobachtet. Das Fallbeispiel beschreibt keine echte Person, sondern eine verdichtete Demo-Situation, mit der Studierende die Items des Bogens exemplarisch einschätzen können. Die beschriebenen Szenen finden über eine Woche hinweg in Unterricht, Pause und Gruppenarbeit statt. Nicht jede Aussage muss zwingend eindeutig beantwortbar sein; wenn ein Verhalten in der Beschreibung nicht vorkommt, kann bewusst „nicht beobachtet“ gewählt werden.`
        ],
        sections: [
          {
            title: 'Ausgangslage und Selbstregulation bei Wut',
            paragraphs: [
              `Am Montag arbeitet ${name} in einer Vierergruppe an einem Plakat. Die Gruppe soll Rollen verteilen, Material auswählen und Ergebnisse festhalten. ${name} möchte die Überschrift gestalten, doch ein anderes Kind nimmt bereits die dickeren Filzstifte und beginnt mit der Gestaltung. ${name} reagiert zunächst sichtbar angespannt, zieht die Augenbrauen zusammen und sagt leise, dass das unfair sei. Als die Lehrkraft nachfragt, kann ${name} benennen, dass xier sich ärgert, weil xies Vorschlag übergangen wurde. Ohne weitere Unterstützung gelingt es jedoch noch nicht, eine Lösung vorzuschlagen; ${name} schiebt den Stuhl zurück, wird lauter und sagt, dass xier dann gar nicht mehr mitmachen wolle.`,
              `Nach einer kurzen Unterbrechung bietet die Lehrkraft zwei Strategien an: eine kurze Pause am Seitentisch oder ein strukturierter Satzanfang für die Rückmeldung an die Gruppe. ${name} entscheidet sich nach kurzem Zögern für den Satzanfang und sagt: „Ich wollte die Überschrift machen. Können wir die Aufgaben nochmal aufteilen?“ Danach beteiligt sich ${name} wieder, braucht aber noch zwei weitere Erinnerungen, um nicht erneut in vorwurfsvolle Formulierungen zu wechseln. In einer späteren ähnlichen Situation am Donnerstag greift ${name} schneller auf die Strategie zurück und bittet um eine neue Rollenverteilung, ohne den Arbeitsplatz zu verlassen. Hier kann beobachtet werden, ob hilfreiche Strategien eigenständig, mit Unterstützung oder nur in einem vertrauten Rahmen genutzt werden.`
            ]
          },
          {
            title: 'Verständnis der eigenen Wut, Angst und Traurigkeit',
            paragraphs: [
              `Am Dienstag wird in Mathematik eine Aufgabe an der Tafel besprochen. ${name} meldet sich, beantwortet eine Teilfrage jedoch unvollständig. Zwei Kinder kichern. ${name} wird ruhig, schaut auf den Tisch und sagt zunächst nichts mehr. In der anschließenden Einzelarbeitsphase beginnt ${name} nicht mit der Aufgabe, sondern radiert mehrfach dieselbe Zeile aus. Auf Nachfrage sagt ${name}: „Ich kann das nicht, die lachen sowieso.“ Die Aussage zeigt, dass Angst vor Bewertung und Unsicherheit eine Rolle spielen könnten. Gleichzeitig kann ${name} mit Unterstützung benennen, was die Angst auslöst: die Reaktion der Mitschüler:innen und die Sorge, wieder etwas falsch zu machen.`,
              `In einer späteren Reflexion nach der Pause kann ${name} genauer beschreiben, dass xier wütend und traurig zugleich war. Direkt in der Situation gelingt die Einordnung nur teilweise; mit zeitlichem Abstand und ruhiger Ansprache kann ${name} die Gefühle jedoch benennen und akzeptieren. In der Woche kommt außerdem eine Situation vor, in der ${name} beim Sport nicht in die gewünschte Mannschaft gewählt wird. ${name} sagt nichts, setzt sich abseits auf die Bank und wirkt traurig. Erst als eine vertraute pädagogische Fachkraft sich daneben setzt, erklärt ${name}, dass xier enttäuscht ist und Sorge hat, nicht dazuzugehören. Diese Szene ist geeignet, um einzuschätzen, ob eigene Traurigkeit wahrgenommen, benannt und nach emotionaler Stabilisierung akzeptiert werden kann.`
            ]
          },
          {
            title: 'Verständnis der Gefühle anderer',
            paragraphs: [
              `Am Mittwoch arbeitet ${name} mit einem Kind zusammen, das beim Lesen stockt und zunehmend leiser wird. ${name} schaut zunächst auf das eigene Arbeitsblatt und bemerkt die Unsicherheit des anderen Kindes nicht. Erst als die Lehrkraft fragt, wie es der Partnerin gerade gehen könnte, schaut ${name} hin und sagt: „Vielleicht ist sie nervös, weil sie das Wort nicht lesen kann.“ Mit dieser Unterstützung kann ${name} die Situation treffend deuten und schlägt vor, dass die Partnerin erst leise übt und dann noch einmal beginnt. Später im Sitzkreis erkennt ${name} ohne direkte Nachfrage, dass ein Kind nach einer verlorenen Abstimmung ärgerlich wirkt, benennt dies aber sehr knapp und bietet keine eigene Unterstützung an.`,
              `Für den Bogen ist deshalb interessant, ob ${name} Gefühle anderer eigenständig erkennt oder ob eine erwachsene Person zunächst die Perspektivübernahme anbahnen muss. Beobachtbar sind unterschiedliche Abstufungen: In manchen Momenten nimmt ${name} emotionale Signale anderer wahr und reagiert passend; in anderen bleibt xier stark bei der eigenen Aufgabe oder eigenen Bewertung. Wenn die Situation strukturiert wird, kann ${name} Ursachen und Auswirkungen fremder Gefühle zunehmend verstehen.`
            ]
          },
          {
            title: 'Verhalten bei emotionaler Belastung',
            paragraphs: [
              `Über die Woche zeigt sich, dass ${name} bei Wut, Angst und Traurigkeit nicht durchgängig gleich reagiert. Bei Wut verlässt xier manchmal kurz die Situation oder spricht lauter, kann aber nach klarer, ruhiger Begleitung wieder in eine sachliche Klärung zurückfinden. Bei Angst zieht ${name} sich eher zurück, vermeidet Arbeitsbeginn und braucht Ermutigung, um wieder handlungsfähig zu werden. Bei Traurigkeit sucht ${name} eine vertraute Person oder bleibt zunächst still, kann mit Zeit und Ansprache jedoch erklären, was belastet.`,
              `Diese Szenen decken die Items zur Selbstregulation und zum emotional angemessenen Verhalten ab. Für die Auswertung sollten Studierende nicht nur die auffällige Reaktion festhalten, sondern auch die Bedingungen: War die Situation vertraut oder offen? Gab es eine klare Struktur? Konnte ${name} selbst eine Strategie wählen? Wurde die Reaktion direkt oder erst im Nachgespräch verständlich? Daraus lässt sich ableiten, ob ein Verhalten selten, teilweise, überwiegend oder sicher beobachtbar ist.`
            ]
          }
        ]
      },
      sozialkompetenz: {
        focus: [
          'Hilfsbereitschaft',
          'Toleranz gegenüber anderen Meinungen und Bereitschaft zur Einigung',
          'Beteiligung und Teilnahme an Gesprächen',
          'Kontaktaufnahme',
          'Handlungs- und Lösungsstrategien'
        ],
        intro: [
          `${name} wird in ${d} in mehreren kooperativen Situationen beobachtet. Das Fallbeispiel ist so angelegt, dass Studierende Hilfsbereitschaft, Gesprächsverhalten, Kontaktaufnahme und Einigungsfähigkeit anhand konkreter Szenen einschätzen können. Die Szenen verbinden Unterricht, Partnerarbeit, Gruppenarbeit und Pausensituation. Einzelne Aspekte bleiben bewusst offen, damit auch „nicht beobachtet“ als fachlich sinnvolle Antwort möglich bleibt.`
        ],
        sections: [
          {
            title: 'Hilfsbereitschaft in offenen und strukturierten Situationen',
            paragraphs: [
              `In einer Deutschstunde sollen die Kinder in Partnerarbeit kurze Texte lesen und wichtige Informationen markieren. ${name} arbeitet mit einem Kind zusammen, das häufig nachfragt und langsamer liest. Zunächst konzentriert sich ${name} auf das eigene Blatt und sagt: „Ich bin schon weiter.“ Als die Lehrkraft die Paare daran erinnert, gemeinsam zu prüfen, ob beide die Aufgabe verstanden haben, schaut ${name} auf das Blatt des anderen Kindes und erklärt, welche Zeile markiert werden soll. Die Hilfe ist sachlich und passend, entsteht aber erst nach einem äußeren Hinweis.`,
              `In der Pause fällt einem Kind aus der Lerngruppe die Brotdose herunter. Mehrere Kinder gehen vorbei. ${name} sieht die Situation, bleibt kurz stehen und hebt einen Apfel auf, sagt aber nichts weiter. Als das Kind sichtbar verunsichert ist, fragt eine Aufsicht: „Wer kann kurz helfen?“ Daraufhin sammelt ${name} weitere Dinge ein und gibt sie zurück. In einer dritten Situation, bei der eine bevorzugte Bezugsperson der Klasse Material trägt, bietet ${name} von sich aus Hilfe an. Dadurch lassen sich unterschiedliche Abstufungen prüfen: Hilft ${name} eigeninitiativ, nur bei vertrauten Personen, nur nach Aufforderung oder eher bezogen auf eigene Interessen?`
            ]
          },
          {
            title: 'Toleranz, Einigung und Umgang mit anderen Meinungen',
            paragraphs: [
              `In einer Sachunterrichtsgruppe soll entschieden werden, wie ein Plakat aufgebaut wird. ${name} schlägt vor, zuerst die Bilder aufzukleben und dann die Texte zu schreiben. Zwei andere Kinder möchten erst Überschriften sammeln. ${name} argumentiert zunächst stark für die eigene Idee und unterbricht ein Kind mit dem Satz: „Das dauert viel zu lange.“ Als die Gruppe stockt, bittet die Lehrkraft jedes Kind, seinen Vorschlag in einem Satz zu erklären. Danach kann ${name} wiederholen, was ein anderes Kind gemeint hat, und stimmt einem Kompromiss zu: Die Gruppe schreibt zuerst drei Überschriften auf, klebt dann die Bilder und ergänzt anschließend die Texte.`,
              `In einer weniger strukturierten Situation am Freitag gelingt das weniger gut. Beim freien Bauen in der Regenpause möchte ${name} die Regeln für ein gemeinsames Spiel festlegen und akzeptiert die Änderungsvorschläge anderer Kinder nur teilweise. Als ein Kind vorschlägt, die Rollen zu tauschen, sagt ${name}: „Dann spiele ich nicht mit.“ Erst nach einer kurzen Moderation ist ${name} bereit, die Rollen alle fünf Minuten zu wechseln. Diese Szenen helfen, die Items zur Bereitschaft zur Einigung einzuschätzen: Werden andere Meinungen als gleichwertig betrachtet, nur situativ verstanden oder vor allem dann akzeptiert, wenn die eigene Position erhalten bleibt?`
            ]
          },
          {
            title: 'Beteiligung an Gesprächen und Kontaktaufnahme',
            paragraphs: [
              `Im Morgenkreis beteiligt sich ${name} gern, wenn ein Thema eigene Interessen berührt. Bei der Frage nach dem Wochenende erzählt ${name} ausführlich und lebendig. Als ein anderes Kind anschließend berichtet, fällt es ${name} schwer, zuzuhören; xier schaut aus dem Fenster und meldet sich erneut, bevor das andere Kind fertig ist. Die Lehrkraft erinnert an die Gesprächsregel „zuhören, nachfragen, dann selbst sprechen“. Danach stellt ${name} eine passende Rückfrage, wirkt aber eher angeleitet als selbstständig.`,
              `Bei der Kontaktaufnahme zeigt sich ein gemischtes Bild. In der vertrauten Kleingruppe fragt ${name} ein anderes Kind angemessen, ob es mitarbeiten möchte. Auf dem Schulhof nähert sich ${name} einer neuen Spielgruppe dagegen sehr direkt, nimmt einen Ball auf und sagt: „Ich bin jetzt dran“, ohne vorher zu fragen. Die Gruppe reagiert irritiert. Nach einer kurzen Rückmeldung kann ${name} die Situation neu beginnen und fragt: „Kann ich mitspielen?“ Diese Szene erlaubt die Einschätzung, ob erlernte Techniken sozial angemessener Kontaktaufnahme bereits in verschiedenen Situationen übertragen werden oder nur in bekannten, überschaubaren Kontexten gelingen.`
            ]
          },
          {
            title: 'Teilnahme an Gesprächen und gemeinsame Lösungsstrategien',
            paragraphs: [
              `Während einer Gruppenarbeit zur Planung eines Klassenfestes beteiligt sich ${name}, solange die eigenen Vorschläge aufgegriffen werden. Als die Gruppe beschließt, statt eines Bastelstands einen Bewegungsparcours vorzubereiten, zieht sich ${name} zunächst zurück und bearbeitet die Materialliste nicht weiter. Ein Gruppenmitglied fragt, ob ${name} die Station mit den Schildern übernehmen möchte. Darauf steigt ${name} wieder ein und entwickelt zwei konkrete Ideen.`,
              `In der Reflexion kann ${name} sagen, dass es leichter war mitzumachen, als eine passende Aufgabe gefunden wurde. Gleichzeitig fällt es noch schwer, eigene Interessen zurückzustellen, wenn die Gruppe anders entscheidet. Für den Beobachtungsbogen können Studierende prüfen, ob ${name} Gespräche kooperativ mitgestaltet, nur teilnimmt, wenn eigene Ziele berücksichtigt werden, oder vor allem eigene Interessen verfolgt. Ebenso lässt sich beobachten, ob eigene Lösungsvorschläge eingebracht und umgesetzt werden oder ob hierfür ein strukturierender Impuls nötig ist.`
            ]
          }
        ]
      },
      konfliktverhalten: {
        focus: [
          'Problemlösefähigkeit',
          'Hilfe annehmen',
          'Befinden nach Konflikten',
          'Konflikte beenden',
          'Verständnis von Konfliktsituationen',
          'Konfliktlösung und Wiedergutmachung'
        ],
        intro: [
          `${name} wird in ${d} anhand mehrerer hypothetischer Konfliktsituationen betrachtet. Die folgenden Szenen ersetzen keine echte Diagnostik, geben Studierenden aber genügend Material, um die Items des Bogens probeweise einzuschätzen. Die Beobachtungen beziehen sich auf Gruppenarbeit, Spielregeln, Materialnutzung und Nachbesprechungen. Entscheidend ist nicht nur, ob ein Konflikt entsteht, sondern wie ${name} Lösungen findet, Hilfe annimmt, Konflikte beendet und nachträglich Verantwortung übernimmt.`
        ],
        sections: [
          {
            title: 'Problemlösefähigkeit bei Materialkonflikten',
            paragraphs: [
              `In der ersten Szene arbeitet ${name} mit drei anderen Kindern an einem Modell. Es gibt nur eine Schere und eine Rolle Klebeband. ${name} nimmt beides an den eigenen Platz, weil xier zuerst die Grundfläche befestigen möchte. Ein anderes Kind sagt, dass es die Schere ebenfalls brauche. ${name} antwortet: „Ich war zuerst dran“ und hält das Material fest. Die Gruppe gerät ins Stocken. Ohne Unterstützung schlägt ${name} zunächst keine Lösung vor, sondern begründet die eigene Position wiederholt mit dem eigenen Bedarf.`,
              `Die Lehrkraft fragt, welche Möglichkeiten es gibt, damit beide weiterarbeiten können. Nach dieser Strukturierung nennt ${name} zwei Optionen: erst fünf Minuten selbst schneiden und danach abgeben oder gemeinsam eine Reihenfolge festlegen. Als die Gruppe einen Timer nutzt, kann ${name} die Abgabe einhalten, schaut aber mehrfach zum Material und wirkt angespannt. In einer späteren offenen Situation, in der keine erwachsene Person direkt moderiert, gelingt diese Lösung nicht automatisch; ${name} fordert das Material erneut zurück und braucht eine Erinnerung an die Timer-Strategie. Diese Szene deckt ab, ob Lösungen eigenständig in offenen Situationen gefunden werden, nur in bekannten Situationen gelingen oder einen geschützten Rahmen benötigen.`
            ]
          },
          {
            title: 'Hilfe annehmen und aus der Eskalation herausfinden',
            paragraphs: [
              `In der zweiten Szene entsteht während eines Bewegungsspiels Streit über die Reihenfolge. Ein Kind behauptet, ${name} habe sich vorgedrängelt. ${name} widerspricht laut, tritt einen Schritt näher an das Kind heran und sagt: „Du lügst.“ Die Aufsicht greift früh ein und bittet beide Kinder, kurz an die Seite zu kommen. ${name} möchte zunächst nicht mitgehen und sagt, dass sowieso niemand xier glaube. Erst als die Aufsicht ruhig anbietet, die Situation in zwei Schritten zu klären, folgt ${name}.`,
              `Im Gespräch hört ${name} zunächst nur die eigene Sicht. Die Frage „Was hat das andere Kind vielleicht gesehen?“ wird erst nach einer Wiederholung aufgenommen. Dann sagt ${name}: „Vielleicht dachte er, ich wäre vor ihm, weil ich von der Seite gekommen bin.“ Damit entsteht punktuell Einsicht in die Perspektive des Gegenübers. Die Hilfe wird nicht sofort angenommen, aber eine vertrauliche, klare Intervention führt dazu, dass ${name} wieder ansprechbar wird. Für die Items kann unterschieden werden, ob Hilfen auch in offenen Konfliktsituationen angenommen werden oder ob verlässliche, wiederholte Unterstützung nötig ist.`
            ]
          },
          {
            title: 'Befinden nach Konflikten und Konflikte beenden',
            paragraphs: [
              `Nach dem Gespräch wirkt ${name} äußerlich ruhiger, bleibt aber in der nächsten Spielrunde angespannt. Xier beobachtet das andere Kind genau und kommentiert mehrfach, ob die Reihenfolge stimmt. Als die Aufsicht eine neutrale Reihenfolge festlegt, kann ${name} weiterspielen, zeigt aber erst nach einigen Minuten sichtbare Entlastung. In einer anderen Situation nach einer Partnerarbeitsunterbrechung zieht sich ${name} an den Rand des Raumes zurück und sagt, dass xier erst allein sein wolle. Nach fünf Minuten kann ${name} wieder an den Tisch kommen, braucht aber eine klare Aufgabe, um den Arbeitsprozess fortzusetzen.`,
              `Diese Szenen ermöglichen unterschiedliche Einschätzungen zum Befinden nach Konflikten. Manchmal entsteht Entlastung, wenn ${name} selbst zur Lösung beitragen konnte. Manchmal braucht xier Rückzug, um das Erlebte zu regulieren. Nicht beschrieben sind selbstgefährdende Reaktionen; solche Items könnten in dieser Demo mit „nicht beobachtet“ beantwortet werden. Für das Beenden von Konflikten ist wichtig, ob ${name} Interventionen annimmt, sich aus der Eskalation lösen kann und ob der Konflikt wirklich endet oder nur vorübergehend unterbrochen wird.`
            ]
          },
          {
            title: 'Verständnis der Konfliktsituation',
            paragraphs: [
              `In der Nachbesprechung am Ende des Vormittags kann ${name} die eigene Sicht sehr detailliert darstellen. Xier beschreibt, dass das Material wichtig war und dass xier sich ungerecht behandelt fühlte. Die Anteile der anderen Kinder werden erst erkennbar, als die Lehrkraft konkrete Fragen stellt: „Was brauchte die Gruppe? Was hat das andere Kind gesagt? Woran hast du gemerkt, dass die anderen nicht weiterarbeiten konnten?“ Danach kann ${name} sagen, dass die Gruppe wegen der Materialblockade warten musste.`,
              `Die Perspektive des Gegenübers wird also nicht durchgängig spontan übernommen, aber nach Intervention teilweise nachvollzogen. ${name} erkennt auch, dass die eigene Lautstärke und das Festhalten des Materials zur Verschärfung beigetragen haben. Gleichzeitig sagt xier: „Aber ich brauchte es ja wirklich.“ Für die Einschätzung können Studierende prüfen, ob empathisches Verstehen bereits eigenständig gelingt, ob nur punktuell Perspektivübernahme entsteht oder ob die eigene Bedürfnislage weiterhin stark dominiert.`
            ]
          },
          {
            title: 'Wiedergutmachung und tragfähige Lösung',
            paragraphs: [
              `Am Ende der Plakatphase schlägt die Lehrkraft vor, dass jedes Kind benennt, was beim nächsten Mal helfen würde. ${name} sagt zunächst: „Dann soll eben mehr Material da sein.“ Nach kurzer Wartezeit ergänzt xier, dass der Timer geholfen habe und dass xier beim nächsten Mal früher fragen könne, wer was braucht. Auf Nachfrage entschuldigt sich ${name} bei dem Kind, das warten musste, und bietet an, die ausgeschnittenen Teile für dessen Abschnitt mit vorzubereiten. Die Entschuldigung wirkt noch angeleitet, die Wiedergutmachung ist aber konkret und für die Gruppe hilfreich.`,
              `In einer späteren ähnlichen Situation erinnert sich ${name} teilweise an die Strategie, braucht jedoch erneut einen Impuls. Diese Wiederholung ist für die Beobachtung wichtig: Kennt ${name} konstruktive Lösungen nur theoretisch oder kann xier sie situativ umsetzen? Verträgt sich ${name} nach einem Konflikt und macht Fehler wieder gut? Oder braucht es eine langfristige, verlässliche Intervention, damit sich das Verhalten stabilisiert? Das Fallbeispiel bietet damit genug Material, um sowohl niedrigere als auch mittlere Ausprägungen differenziert zu diskutieren.`
            ]
          }
        ]
      },
      regelverhalten: {
        focus: [
          'Einhaltung von Klassen- und Schulregeln',
          'Einsicht bei Regelverstoß',
          'Bedeutung von Erinnerung, Anerkennung und Konsequenz'
        ],
        intro: [
          `${name} wird in ${d} über mehrere wiederkehrende Schulabläufe hinweg beobachtet. Das Fallbeispiel konzentriert sich auf Regeln im Klassenraum, Übergänge, Partnerarbeit und Pausenrückkehr. Für die Einschätzung ist wichtig, ob Regeln aus eigener Orientierung eingehalten werden oder ob persönliche Ansprache, Belohnungsaussicht, direkte Instruktion oder Konsequenzen nötig sind. Die Szenen enthalten außerdem Hinweise darauf, ob ${name} nach Regelverstößen Einsicht zeigt.`
        ],
        sections: [
          {
            title: 'Regeln beim Arbeitsbeginn und in Übergängen',
            paragraphs: [
              `Zu Beginn der Arbeitsphase gilt in der Lerngruppe die Regel, dass alle Kinder Material bereitlegen, leise starten und bei Fragen zunächst das Hilfekärtchen nutzen. ${name} kennt die Regel und kann sie auf Nachfrage benennen. Am Montag beginnt xier selbstständig, legt Heft und Stift bereit und wartet, bis die Lehrkraft das Startsignal gibt. Am Dienstag nach der Pause kommt ${name} jedoch aufgewühlt in den Raum, spricht mit zwei Kindern weiter und beginnt erst nach einer direkten Erinnerung mit dem Bereitlegen der Materialien.`,
              `In Übergängen zeigt sich ein ähnliches Muster. Wenn der Ablauf vertraut und ruhig ist, hält ${name} die vereinbarten Regeln überwiegend ein. Bei Zeitdruck, hoher Lautstärke oder persönlichem Interesse an einem Gespräch braucht xier eine konkrete Ansprache. Die Beobachtung erlaubt die Frage, ob die Regeleinhaltung grundsätzlich sicher ist oder eher an Struktur, Motivation und situative Bedingungen gebunden bleibt.`
            ]
          },
          {
            title: 'Regeln in Kleingruppe und Partnerarbeit',
            paragraphs: [
              `In einer selbst gewählten Partnerarbeit mit einem vertrauten Kind hält ${name} die meisten Absprachen ein: abwechselnd lesen, Material teilen, bei Unklarheiten leise nachfragen. Als ein anderes Paar in der Nähe lacht, steigt ${name} kurz in das Gespräch ein und verlässt die Aufgabe. Die Partnerin erinnert an die Aufgabe, worauf ${name} zurückkehrt. Hier ist beobachtbar, dass Regeln in einem selbst gewählten und vertrauten Setting gelingen, aber störanfällig bleiben.`,
              `In einer zugewiesenen Dreiergruppe ist die Situation schwieriger. ${name} möchte die Reihenfolge bestimmen und spricht mehrfach, obwohl ein anderes Kind gerade erklärt. Erst als die Lehrkraft die Gesprächsregel sichtbar auf eine Karte legt und die Rollen „Sprecher:in“, „Materialdienst“ und „Zeitwächter:in“ verteilt, kann ${name} die Regel phasenweise einhalten. Ohne diese Struktur unterbricht xier erneut. Die Szene deckt die Frage ab, ob Regeln in Kleingruppen eigenständig eingehalten werden oder ob Anleitung und klare Rollen nötig sind.`
            ]
          },
          {
            title: 'Regelverstoß und Einsicht',
            paragraphs: [
              `Während der Stillarbeitszeit nimmt ${name} einen Radiergummi vom Nachbartisch, ohne zu fragen. Das andere Kind beschwert sich. ${name} sagt zunächst: „Ich brauchte ihn nur kurz.“ Die Lehrkraft erinnert an die Regel, fremdes Material nur nach Nachfrage zu benutzen. Zuerst wirkt ${name} genervt, kann nach einem kurzen Gespräch aber sagen, dass das andere Kind nicht wissen konnte, ob der Radiergummi zurückkommt. Xier gibt den Radiergummi zurück und fragt beim nächsten Mal nach.`,
              `In einer zweiten Situation rennt ${name} nach dem Klingeln auf dem Flur, obwohl die Regel „gehen statt rennen“ mehrfach besprochen wurde. Als eine Aufsicht stoppt, sagt ${name}, dass xier nur schnell zur Jacke wollte. Einsicht entsteht hier erst, als die Aufsicht auf ein jüngeres Kind zeigt, das erschrocken zur Seite gesprungen ist. Danach kann ${name} formulieren, dass Rennen andere gefährden kann. Diese Szenen zeigen, dass Einsicht bei Fehlverhalten möglich ist, aber oft durch konkrete Rückmeldung und Perspektivklärung unterstützt werden muss.`
            ]
          },
          {
            title: 'Rolle von Anerkennung und Konsequenzen',
            paragraphs: [
              `Wenn ${name} positives Feedback für eingehaltene Regeln erhält, stabilisiert sich das Verhalten häufig. In einer Lesephase, in der die Lehrkraft ruhiges Arbeiten ausdrücklich würdigt, bleibt ${name} über den vorgesehenen Zeitraum bei der Aufgabe. In einer anderen Situation mit weniger Rückmeldung und stärkerer Ablenkung fällt es schwerer. Bei eindeutigen Konsequenzen, etwa dem Wechsel auf einen ruhigeren Arbeitsplatz, akzeptiert ${name} die Entscheidung nach kurzer Diskussion und kann weiterarbeiten.`,
              `Für die Demo sollten Studierende festhalten, welche Bedingungen wirksam waren: persönliche Erinnerung, Aussicht auf Anerkennung, klare Konsequenz oder selbstständige Orientierung an der Regel. Dadurch lässt sich einschätzen, ob ${name} Regeln grundsätzlich einhält, nur in Kleingruppen sicher agiert, bei persönlichem Interesse Regeln vernachlässigt oder trotz Konsequenzen kaum Einsicht zeigt. Nicht beobachtete Regelbereiche können entsprechend offen bleiben.`
            ]
          }
        ]
      },
      lernkompetenz: {
        focus: [
          'Motivation zur eigenständigen Arbeit',
          'Erledigung schulischer Anforderungen',
          'Durchhaltevermögen bei schwierigen Aufgaben',
          'Aufmerksamkeit auf Aufgaben',
          'Erledigen von Aufgaben',
          'Umgang mit Materialien'
        ],
        intro: [
          `${name} wird in ${d} während mehrerer schulischer Arbeitsphasen beobachtet. Das Fallbeispiel beschreibt Aufgabenbeginn, Motivation, Ausdauer, Aufmerksamkeit, Bearbeitungstempo und Materialumgang. Die Szenen sind so formuliert, dass Studierende die einzelnen Items nicht auswendig kennen müssen, sondern aus dem Verhalten ableiten können, welche Einschätzung plausibel ist. Wichtig ist immer der Kontext: War die Aufgabe interessant, strukturiert, schwierig oder mit Unterstützung verbunden?`
        ],
        sections: [
          {
            title: 'Motivation und Arbeitsbeginn',
            paragraphs: [
              `Am Montag erhält die Klasse eine differenzierte Schreibaufgabe. ${name} soll zunächst drei Stichpunkte sammeln und daraus einen kurzen Text entwickeln. Das Thema „Lieblingstiere“ interessiert ${name}. Xier beginnt ohne Aufforderung, holt das Heft heraus und schreibt mehrere Ideen auf. Als die Lehrkraft eine Zusatzaufgabe anbietet, fragt ${name}, ob xier auch eine Zeichnung ergänzen darf. In dieser Situation ist die Motivation hoch und der Arbeitsbeginn gelingt selbstständig.`,
              `Am Mittwoch geht es um eine Rechtschreibübung mit Wörtern, die ${name} wenig interessieren. Xier schaut lange auf das Blatt, spitzt den Stift und fragt wiederholt, wie viele Wörter es sein müssen. Erst als die Lehrkraft die Aufgabe in kleinere Schritte gliedert und vereinbart, dass zunächst fünf Wörter bearbeitet werden, beginnt ${name}. Die Beobachtung zeigt, dass Motivation stark vom Thema und von äußerer Struktur abhängen kann. Dadurch lassen sich Items zur eigenständigen Motivation, zur Motivation durch äußere Umstände und zur intensiven Begleitung differenziert einschätzen.`
            ]
          },
          {
            title: 'Erledigung schulischer Anforderungen',
            paragraphs: [
              `In einer Mathematikphase bearbeitet ${name} Aufgaben zur schriftlichen Addition. Die ersten Aufgaben sind vertraut. Nach kurzer Ermutigung arbeitet ${name} angemessen selbstständig und kontrolliert zwei Ergebnisse mit dem Lösungsblatt. Bei einer schwierigeren Textaufgabe stoppt xier und sagt: „Das ist zu viel Text.“ Die Lehrkraft markiert gemeinsam die Zahlen und fragt, welche Information wichtig ist. Danach löst ${name} die Aufgabe teilweise, braucht aber weitere Hinweise zur Rechenoperation.`,
              `In einer offenen Wochenplanphase gelingt die Erledigung weniger stabil. ${name} wählt zuerst eine einfache Aufgabe, bearbeitet sie langsam und wechselt dann zu einer anderen Seite, ohne die erste vollständig abzuschließen. Nach einer Unterbrechung nimmt xier die Aufgabe nicht von selbst wieder auf. Mit individueller Unterstützung kann ${name} den Arbeitsprozess fortsetzen, aber die Vollständigkeit muss gemeinsam überprüft werden. Diese Szenen decken Bearbeitung in strukturierten Kontexten, kurzzeitige Anforderungen und Aufgabenbearbeitung mit Unterstützung ab.`
            ]
          },
          {
            title: 'Durchhaltevermögen bei schwierigen Aufgaben',
            paragraphs: [
              `Bei einer Knobelaufgabe im Sachunterricht soll die Gruppe eine Reihenfolge von Arbeitsschritten begründen. ${name} beteiligt sich zunächst aktiv. Als der erste Vorschlag nicht stimmt, wird xier unruhig und sagt: „Dann weiß ich es halt nicht.“ Ein anderes Kind schlägt vor, die Karten noch einmal zu sortieren. ${name} bleibt sitzen, beobachtet aber eher passiv. Erst als die Lehrkraft eine Zwischensicherung anbietet und lobt, dass falsche Versuche zur Lösung gehören, beteiligt sich ${name} wieder.`,
              `In einer zweiten schwierigen Situation, einer Leseaufgabe mit unbekannten Wörtern, hält ${name} länger durch, weil die Aufgabe an ein eigenes Interesse anknüpft. Xier markiert unbekannte Wörter, fragt nach einer Bedeutung und liest den Abschnitt noch einmal. Daraus ergibt sich ein differenziertes Bild: Schwierige Aufgaben werden nicht grundsätzlich abgebrochen, aber das Durchhalten hängt von Interesse, erlebter Schwierigkeit und unterstützendem Input ab. Studierende können prüfen, ob ${name} konstruktiv mit Schwierigkeiten umgeht oder ob Anforderungen schnell als belastend erlebt werden.`
            ]
          },
          {
            title: 'Aufmerksamkeit, Tempo und Aufgabenabschluss',
            paragraphs: [
              `Während einer ruhigen Einzelarbeitsphase kann ${name} etwa zehn Minuten konzentriert arbeiten. Bei Geräuschen im Raum blickt xier häufig auf, findet aber nach einer kurzen Erinnerung zurück. In einer lauteren Phase mit mehreren Nachfragen anderer Kinder verliert ${name} schneller den Faden und beginnt, mit dem Lineal zu spielen. Eine visuelle Zeitleiste und ein klarer Zwischenstand helfen, die Aufmerksamkeit wieder auf die Aufgabe zu richten.`,
              `Beim Aufgabenabschluss zeigt sich, dass ${name} mit klaren Teilschritten vollständiger arbeitet. Aufgaben werden dann in angemessenem Tempo erledigt. Ohne Struktur bleiben einzelne Teile offen oder werden nach Unterbrechungen nicht weiterbearbeitet. Die Fragebogenitems können anhand dieser Szenen auf Aufmerksamkeit über einen vorgesehenen Zeitraum, Konzentration mit Hilfe, kurzzeitige Konzentration unter Anleitung und Erledigung von Aufgaben in Ansätzen bezogen werden.`
            ]
          },
          {
            title: 'Umgang mit Materialien',
            paragraphs: [
              `Zu Beginn der Woche bringt ${name} die meisten eigenen Materialien mit und nutzt sie sachgerecht. Das Heft wird ordentlich aufgeschlagen, Stifte werden nach Gebrauch zurückgelegt. Wenn fremdes Material genutzt wird, fragt ${name} in der Partnerarbeit meist nach. In einer stressigen Situation sucht xier jedoch den Klebestift, nimmt einen vom Nachbartisch und legt ihn später an einem anderen Ort ab. Erst nach einer Erinnerung bringt ${name} ihn zurück.`,
              `Bei einer Bastelaufgabe geht ${name} sorgfältig mit den eigenen Materialien um, achtet aber weniger auf gemeinsames Material. Papierreste bleiben liegen und die Schere wird offen auf dem Tisch abgelegt. Nach einem Hinweis kann ${name} den Arbeitsplatz ordnen. Für die Einschätzung ist daher relevant, ob der sachgerechte Umgang mit eigenen und fremden Materialien selbstständig gelingt, nur mit Unterstützung angemessen ist oder in bestimmten Situationen noch als wenig bedeutsam erscheint.`
            ]
          }
        ]
      }
    };
    return examples[key] || { focus: ['Beobachtungsinhalt', 'Situation', 'Dokumentation'], paragraphs: [`Für ${name} wird ein passendes Fallbeispiel angezeigt.`] };
  }

  function ensureCaseExampleContainer() {
    let container = $('#caseExample');
    if (container) return container;

    const workspace = $('.topic-workspace');
    const form = $('#topicForm');
    if (!workspace || !form) return null;

    const aside = document.createElement('aside');
    aside.className = 'case-column';
    aside.setAttribute('aria-labelledby', 'case-title');
    aside.setAttribute('data-tour-target', 'case-example');

    container = document.createElement('article');
    container.className = 'card case-example-card';
    container.id = 'caseExample';
    container.innerHTML = '<h2 id="case-title">Fallbeispiel</h2><p class="muted">Das Fallbeispiel wird geladen.</p>';

    aside.appendChild(container);
    workspace.insertBefore(aside, form);
    return container;
  }

  function renderCaseExample(key, student) {
    const container = ensureCaseExampleContainer();
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
      <div class="case-copy">
        ${(copy.intro || copy.paragraphs || []).map(p => `<p>${escapeHtml(p)}</p>`).join('')}
        ${(copy.sections || []).map(section => `
          <section class="case-scenario-section">
            <h3>${escapeHtml(section.title)}</h3>
            ${(section.paragraphs || []).map(p => `<p>${escapeHtml(p)}</p>`).join('')}
          </section>
        `).join('')}
      </div>
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
        { target: '#dashboardShareTile', title: 'QR-Code und Teilenseite', text: 'Über diese Kachel öffnest du eine Zwischenseite mit QR-Code und Link-Optionen. Damit kann die Demo schnell auf einem anderen Gerät geöffnet werden.' },
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
      share: [
        { target: '#shareQrPanel', title: 'QR-Code zur Teilenseite', text: 'Dieser QR-Code verweist auf die aktuell geöffnete Teilenseite. Nach dem Upload auf GitHub Pages kann er mit Handy oder Tablet gescannt werden.' },
        { target: '#shareActionPanel', title: 'Link weitergeben', text: 'Hier kann der Link über das System-Teilen-Menü, per Kopieren, E-Mail, WhatsApp oder Telegram weitergegeben werden.' },
        { target: '#shareOpenBox', title: 'Demo auf diesem Gerät öffnen', text: 'Dieser Button führt vom geteilten Zwischenlink zur Startseite der SPLINT Demo auf dem aktuellen Gerät.' }
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



  function shouldShowOrientationPrompt() {
    if (page !== 'topic') return false;
    const portrait = window.matchMedia && window.matchMedia('(orientation: portrait)').matches;
    const compactViewport = window.innerWidth <= 1250;
    const touchLike = navigator.maxTouchPoints > 0 || (window.matchMedia && window.matchMedia('(hover: none) and (pointer: coarse)').matches);
    return portrait && compactViewport && touchLike && sessionStorage.getItem('splint_demo_orientation_ok') !== pageTourKey();
  }

  function removeOrientationPrompt() {
    const existing = $('#orientationPrompt');
    if (existing) existing.remove();
    document.body.classList.remove('orientation-prompt-open');
    if (page === 'topic') {
      window.setTimeout(() => {
        const workspace = $('.topic-workspace');
        if (workspace) workspace.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    }
  }

  function showOrientationPrompt() {
    if ($('#orientationPrompt') || !shouldShowOrientationPrompt()) return;
    const overlay = document.createElement('div');
    overlay.id = 'orientationPrompt';
    overlay.className = 'orientation-prompt-overlay';
    overlay.innerHTML = `
      <section class="orientation-prompt-card" role="dialog" aria-modal="true" aria-labelledby="orientation-title">
        <div class="orientation-icon" aria-hidden="true">↻</div>
        <p class="upper tiny">Optimale Ansicht für den Fragebogen</p>
        <h2 id="orientation-title">Bitte Gerät horizontal drehen</h2>
        <p>Auf Handy und Tablet lässt sich der Beobachtungsbogen am besten im Querformat bearbeiten. Links bleibt das Fallbeispiel lesbar, rechts kann der Fragebogen separat ausgefüllt werden.</p>
        <button class="btn btn-primary" type="button" id="orientationOk">OK, Hinweis schließen</button>
      </section>`;
    document.body.appendChild(overlay);
    document.body.classList.add('orientation-prompt-open');
    $('#orientationOk')?.addEventListener('click', () => {
      sessionStorage.setItem('splint_demo_orientation_ok', pageTourKey());
      removeOrientationPrompt();
    });
  }

  function initOrientationPrompt() {
    if (page !== 'topic') return;
    const evaluate = () => {
      if (shouldShowOrientationPrompt()) showOrientationPrompt();
      else removeOrientationPrompt();
    };
    window.addEventListener('resize', evaluate);
    window.addEventListener('orientationchange', () => window.setTimeout(evaluate, 180));
    window.setTimeout(evaluate, 180);
  }

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
      if (page === 'share') return;
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
    initSharePage();
    initOrientationPrompt();
    initTourSystem();
  });
})();
