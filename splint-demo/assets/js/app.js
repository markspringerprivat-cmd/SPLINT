(() => {
  'use strict';

  const STUDENTS_KEY = 'splintDemo.students.v1';
  const OBSERVATIONS_KEY = 'splintDemo.observations.v1';
  const ACTIVE_STUDENT_KEY = 'splintDemo.activeStudentId.v1';

  const TOPICS = {
    selbstkompetenz: {
      title: 'Selbstkompetenz',
      description: 'Einschätzung emotionaler Kompetenzen und selbstbezogener Regulation.',
      subtopics: [
        {
          title: 'Wut',
          questions: [
            'Kann Ärger wahrnehmen und benennen.',
            'Kann sich nach Ärger oder Frustration wieder beruhigen.',
            'Kann mit Unterstützung angemessene Handlungsalternativen nutzen.'
          ]
        },
        {
          title: 'Angst',
          questions: [
            'Kann Unsicherheit oder Angstsignale mitteilen.',
            'Nimmt angebotene Unterstützung in belastenden Situationen an.',
            'Traut sich schrittweise neue Aufgaben oder Situationen zu.'
          ]
        },
        {
          title: 'Traurigkeit',
          questions: [
            'Kann Traurigkeit oder Rückzugstendenzen ausdrücken.',
            'Bleibt in belastenden Phasen erreichbar.',
            'Findet mit Unterstützung zurück in die Lern- oder Gruppensituation.'
          ]
        }
      ]
    },
    sozialkompetenz: {
      title: 'Sozialkompetenz',
      description: 'Beobachtung kooperativer und sozial orientierter Verhaltensweisen.',
      subtopics: [
        {
          title: 'Soziale Orientierung',
          questions: [
            'Achtet auf Bedürfnisse und Grenzen anderer.',
            'Kann Rücksicht nehmen und abwarten.',
            'Zeigt Hilfsbereitschaft oder kooperatives Verhalten.'
          ]
        },
        {
          title: 'Soziale Initiative',
          questions: [
            'Nimmt angemessen Kontakt zu Mitschüler:innen auf.',
            'Beteiligt sich an Gruppenaktivitäten.',
            'Kann eigene Ideen in der Gruppe einbringen.'
          ]
        }
      ]
    },
    konfliktverhalten: {
      title: 'Konfliktverhalten',
      description: 'Beobachtung von Konfliktreaktionen und Strategien zur Klärung.',
      subtopics: [
        {
          title: 'Konfliktverhalten – internalisierend',
          questions: [
            'Zieht sich in Konflikten stark zurück.',
            'Kann eigene Bedürfnisse im Konflikt benennen.',
            'Nimmt Unterstützung zur Klärung an.'
          ]
        },
        {
          title: 'Konfliktverhalten – externalisierend',
          questions: [
            'Kann Impulse in Konfliktsituationen regulieren.',
            'Nutzt verbale statt körperlicher Reaktionen.',
            'Kann Vereinbarungen zur Konfliktlösung einhalten.'
          ]
        }
      ]
    },
    regelverhalten: {
      title: 'Regelverhalten',
      description: 'Einschätzung von Regelbewusstsein, Regelakzeptanz und Wiedergutmachung.',
      subtopics: [
        {
          title: 'Einhaltung von Klassen- und Schulregeln',
          questions: [
            'Kennt zentrale Klassen- und Schulregeln.',
            'Hält vereinbarte Regeln im Alltag ein.',
            'Kann Hinweise auf Regelverstöße aufnehmen.'
          ]
        },
        {
          title: 'Einsicht bei Regelverstoß',
          questions: [
            'Kann Regelverstöße nachvollziehen.',
            'Übernimmt Verantwortung für eigenes Verhalten.',
            'Beteiligt sich an Wiedergutmachung oder Folgevereinbarungen.'
          ]
        }
      ]
    },
    lernkompetenz: {
      title: 'Lernkompetenz',
      description: 'Beobachtung von Arbeitsverhalten, Ausdauer und Konzentration.',
      subtopics: [
        {
          title: 'Lern- und Leistungsbereitschaft',
          questions: [
            'Beginnt Aufgaben innerhalb angemessener Zeit.',
            'Zeigt Bereitschaft, sich anzustrengen.',
            'Kann bei Schwierigkeiten weiterarbeiten oder Hilfe anfordern.'
          ]
        },
        {
          title: 'Konzentration und Sorgfalt beim Lernen',
          questions: [
            'Kann Aufmerksamkeit über einen vereinbarten Zeitraum halten.',
            'Bearbeitet Aufgaben sorgfältig.',
            'Kontrolliert Ergebnisse mit Unterstützung oder selbstständig.'
          ]
        }
      ]
    }
  };

  const SCALE = [
    { value: '0', label: 'nicht beobachtet' },
    { value: '1', label: 'selten / mit viel Unterstützung' },
    { value: '2', label: 'teilweise / situationsabhängig' },
    { value: '3', label: 'häufig / selbstständig' }
  ];

  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));
  const page = document.body.dataset.page || '';
  const root = document.body.dataset.root || '';

  function link(path) {
    return `${root}${path}`;
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

  function write(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

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
    const parts = String(value).split('-');
    if (parts.length === 3) return `${parts[2]}.${parts[1]}.${parts[0]}`;
    if (/^\d{2}\.\d{2}\.\d{4}$/.test(value)) return value;
    return value;
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

  function activeStudentId() {
    const params = new URLSearchParams(window.location.search);
    const fromUrl = params.get('studentId');
    if (fromUrl) {
      localStorage.setItem(ACTIVE_STUDENT_KEY, fromUrl);
      return fromUrl;
    }
    const stored = localStorage.getItem(ACTIVE_STUDENT_KEY);
    const students = getStudents();
    if (stored && students.some(s => s.id === stored)) return stored;
    return students[0]?.id || '';
  }

  function getStudentById(studentId) {
    return getStudents().find(student => student.id === studentId) || null;
  }

  function setStatus(message, isError = false) {
    const status = $('#statusline');
    if (!status) return;
    status.textContent = message || '';
    status.style.color = isError ? '#8a1d1d' : 'var(--blue-700)';
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

  function renderDashboard() {
    const students = getStudents();
    const observations = getObservations();

    const statsStudents = $('#statsStudents');
    const statsObservations = $('#statsObservations');
    if (statsStudents) statsStudents.textContent = students.length;
    if (statsObservations) statsObservations.textContent = observations.length;

    const studentList = $('#studentList');
    if (studentList) {
      if (!students.length) {
        studentList.innerHTML = '<div class="empty-state">Noch keine Schüler:innen angelegt. Über „Schüler:in erstellen“ wird ein Datensatz im Browser gespeichert.</div>';
      } else {
        studentList.innerHTML = students.map(student => `
          <article class="card">
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

  function observationCard(observation) {
    const student = getStudentById(observation.studentId);
    const topic = TOPICS[observation.topicKey];
    const topicTitle = topic?.title || observation.topicTitle || 'Beobachtungsbogen';
    return `
      <article class="card observation-card">
        <span class="doc-icon" aria-hidden="true">▣</span>
        <div>
          <h3>${escapeHtml(topicTitle)}</h3>
          <p class="card-meta">${escapeHtml(studentName(student))} · ${escapeHtml(formatDateTime(observation.updatedAt))} · ${escapeHtml(observation.status || 'Entwurf')}</p>
        </div>
        <a class="btn" href="${link(`beobachtung.html?studentId=${encodeURIComponent(observation.studentId || '')}`)}">Ansehen</a>
      </article>
    `;
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

    const today = new Date();
    const fallback = new Intl.DateTimeFormat('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(today);
    if (form.elements.birthDate && !form.elements.birthDate.value) form.elements.birthDate.value = fallback;

    $$('#firstName, #lastName, #birthDate', form).forEach(input => {
      input.addEventListener('input', () => validateStudentForm(form));
    });
    validateStudentForm(form);

    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!validateStudentForm(form)) {
        setStatus('Bitte alle Pflichtfelder ausfüllen.', true);
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

    const student = getStudentById(selectedId);
    const profile = $('#studentProfile');
    const addLink = $('#createObservationLink');
    if (addLink) addLink.href = link(`mesk.html?studentId=${encodeURIComponent(selectedId || '')}`);

    if (!profile) return;
    if (!student) {
      profile.innerHTML = `
        <div class="empty-state">
          Für die Beobachtungsübersicht muss zuerst ein:e Schüler:in angelegt werden.
          <div class="card-actions"><a class="btn btn-primary" href="${link('schueler-anlegen.html')}">Schüler:in erstellen</a></div>
        </div>`;
      const ownObs = $('#ownObservations');
      if (ownObs) ownObs.innerHTML = '';
      return;
    }

    profile.innerHTML = `
      <article class="card profile-card">
        <div class="profile-head">
          <h2>${escapeHtml(studentName(student))}</h2>
          <dl class="hero-meta">
            <dt>Lerngruppe:</dt><dd>${escapeHtml(student.group || 'Nicht angegeben')}</dd>
            <dt>Jahrgangsstufe:</dt><dd>${escapeHtml(student.grade || 'Nicht angegeben')}</dd>
            <dt>Geburtsdatum:</dt><dd>${escapeHtml(formatDateGerman(student.birthDate))}</dd>
          </dl>
        </div>
        <div class="profile-body">
          <section class="section">
            <h3>Beteiligte Personen <span aria-hidden="true">☻</span></h3>
            <p>Verantwortliche Personen: 1<br>Unterstützer:innen: 0<br>Förderziel-Mentor:innen: 0</p>
            <a href="#">Beteiligung verwalten ✎</a>
          </section>
          <section class="section">
            <h3>Stärken und Interessen</h3>
            <p class="muted">Nicht vorhanden</p>
            <a href="#">Stärken oder Interesse hinzufügen ✎</a>
          </section>
          <div class="tabbar" role="tablist" aria-label="SPLINT Bereiche">
            <span class="tab active">SPLINT Förderplanung</span>
            <span class="tab">SPLINT Feedback</span>
          </div>
          <div class="icon-menu" aria-label="Werkzeuge">
            <span class="icon-menu-item"><span class="circle-icon">▥</span>Ergebnisse</span>
            <span class="icon-menu-item icon-muted"><span class="circle-icon">□</span>Förderplan</span>
          </div>
          <section class="section">
            <h3>Nachteilsausgleich</h3>
            <p class="muted">Nicht vorhanden</p>
            <a href="#">Nachteilsausgleich hinzufügen ✎</a>
          </section>
          <section class="section">
            <h3>Vereinbarungen</h3>
            <p>Hier kannst du getroffene Vereinbarungen zu ${escapeHtml(studentName(student))} vermerken. Sie sind für alle Verantwortlichen sichtbar und erscheinen auf dem Förderplan.</p>
            <div class="button-row">
              <input type="text" aria-label="Neue Vereinbarung" placeholder="Neue Vereinbarung">
              <button class="btn btn-disabled" type="button">＋</button>
            </div>
            <p class="muted">Für ${escapeHtml(studentName(student))} gibt es noch keine Vereinbarungen.<br>Hinterlasse als erste:r eine Vereinbarung.</p>
          </section>
        </div>
      </article>
    `;

    const ownObs = $('#ownObservations');
    if (ownObs) {
      const observations = getObservations().filter(obs => obs.studentId === selectedId);
      if (!observations.length) {
        ownObs.innerHTML = `
          <a class="tile tile-primary" href="${link(`mesk.html?studentId=${encodeURIComponent(selectedId)}`)}">
            <span class="tile-icon">＋</span>
            <span>Beobachtung erstellen</span>
          </a>`;
      } else {
        ownObs.innerHTML = `
          <a class="tile" href="${link(`mesk.html?studentId=${encodeURIComponent(selectedId)}`)}">
            <span class="tile-icon">＋</span><span>Weitere Beobachtung erstellen</span>
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
        renderTopicLinks(select.value);
      });
    }
    renderTopicLinks(selectedId);
  }

  function renderTopicLinks(studentId) {
    const list = $('#topicList');
    if (!list) return;
    const countText = topic => `${topic.subtopics.length} Unterbereiche`;
    list.innerHTML = Object.entries(TOPICS).map(([key, topic]) => `
      <a class="topic-row" href="${link(`themen/${key}.html?studentId=${encodeURIComponent(studentId || '')}`)}">
        <span class="topic-chevron" aria-hidden="true">›</span>
        <span class="topic-radio" aria-hidden="true"></span>
        <span>${escapeHtml(topic.title)}<br><small>${escapeHtml(topic.description)}</small></span>
        <small>${countText(topic)}</small>
      </a>
    `).join('');
  }

  function renderTopicPage() {
    const topicKey = document.body.dataset.topic;
    const topic = TOPICS[topicKey];
    if (!topic) return;

    const title = $('#topicTitle');
    const description = $('#topicDescription');
    if (title) title.textContent = topic.title;
    if (description) description.textContent = topic.description;

    const selectedId = activeStudentId();
    const select = $('#studentSelect');
    renderStudentOptions(select, selectedId);
    if (select) {
      select.addEventListener('change', () => localStorage.setItem(ACTIVE_STUDENT_KEY, select.value));
    }

    const studentNameField = $('#selectedStudentName');
    if (studentNameField) studentNameField.textContent = studentName(getStudentById(selectedId));

    const form = $('#topicForm');
    const container = $('#questionContainer');
    if (!form || !container) return;

    container.innerHTML = topic.subtopics.map((subtopic, subIndex) => `
      <details class="question-group" open>
        <summary>${escapeHtml(subtopic.title)}</summary>
        <div class="question-list">
          ${subtopic.questions.map((question, questionIndex) => {
            const name = `q_${subIndex}_${questionIndex}`;
            return `
              <fieldset class="question-item">
                <legend class="label">${escapeHtml(question)}</legend>
                <div class="scale">
                  ${SCALE.map(item => `
                    <label>
                      <input type="radio" name="${name}" value="${item.value}">
                      <span>${escapeHtml(item.label)}</span>
                    </label>
                  `).join('')}
                </div>
              </fieldset>
            `;
          }).join('')}
        </div>
      </details>
    `).join('');

    form.addEventListener('submit', event => {
      event.preventDefault();
      const studentId = $('#studentSelect')?.value || selectedId;
      if (!studentId) {
        setStatus('Bitte zuerst eine:n Schüler:in anlegen oder auswählen.', true);
        return;
      }
      const answers = {};
      topic.subtopics.forEach((subtopic, subIndex) => {
        subtopic.questions.forEach((question, questionIndex) => {
          const name = `q_${subIndex}_${questionIndex}`;
          answers[name] = {
            subtopic: subtopic.title,
            question,
            value: form.elements[name]?.value || ''
          };
        });
      });
      const observations = getObservations();
      const now = new Date().toISOString();
      observations.push({
        id: id('obs'),
        studentId,
        type: 'MeSK',
        topicKey,
        topicTitle: topic.title,
        answers,
        notes: String($('#notes')?.value || '').trim(),
        status: 'Entwurf gespeichert',
        createdAt: now,
        updatedAt: now
      });
      setObservations(observations);
      localStorage.setItem(ACTIVE_STUDENT_KEY, studentId);
      setStatus('Beobachtungsbogen wurde lokal gespeichert. Weiterleitung zur Übersicht …');
      window.setTimeout(() => {
        window.location.href = link(`beobachtung.html?studentId=${encodeURIComponent(studentId)}`);
      }, 650);
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
        const student = {
          id: studentId,
          firstName: 'Mika',
          lastName: 'Schneider',
          birthDate: '2016-06-20',
          pronouns: 'Xier / Xies',
          group: '4a',
          grade: '4',
          schoolYear: '5',
          createdAt: new Date().toISOString()
        };
        const obs = {
          id: id('obs'),
          studentId,
          type: 'MeSK',
          topicKey: 'selbstkompetenz',
          topicTitle: 'Selbstkompetenz',
          answers: {},
          notes: 'Demo-Beobachtung für die Präsentation.',
          status: 'Entwurf gespeichert',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        setStudents([...existingStudents, student]);
        setObservations([...getObservations(), obs]);
        localStorage.setItem(ACTIVE_STUDENT_KEY, studentId);
        window.location.reload();
      });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    initDemoReset();
    if (page === 'dashboard') renderDashboard();
    if (page === 'student-form') initStudentForm();
    if (page === 'observation') renderObservationPage();
    if (page === 'mesk') renderMeskPage();
    if (page === 'topic') renderTopicPage();
  });
})();
