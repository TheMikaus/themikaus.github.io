(() => {
  const data = window.PORTFOLIO;

  // ---------- helpers ----------
  const $ = (sel, root = document) => root.querySelector(sel);
  const el = (tag, attrs = {}, children = []) => {
    const n = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => {
      if (k === 'class') n.className = v;
      else if (k === 'html') n.innerHTML = v;
      else n.setAttribute(k, v);
    });
    children.forEach(c => n.appendChild(typeof c === 'string' ? document.createTextNode(c) : c));
    return n;
  };

  const setText = (id, value) => { const n = document.getElementById(id); if (n) n.textContent = value; };
  const setHTML = (id, value) => { const n = document.getElementById(id); if (n) n.innerHTML = value; };

  // ---------- theme ----------
  const THEME_KEY = 'mikaus_theme';
  const applyTheme = (t) => {
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem(THEME_KEY, t);
  };
  const toggleTheme = () => {
    const cur = document.documentElement.getAttribute('data-theme') || 'dark';
    applyTheme(cur === 'dark' ? 'light' : 'dark');
  };
  const saved = localStorage.getItem(THEME_KEY);
  applyTheme(saved || 'dark');

  // keyboard: T toggles theme
  window.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 't' && !isTypingTarget(e.target)) toggleTheme();
  });
  $('#themeToggle')?.addEventListener('click', toggleTheme);

  function isTypingTarget(target){
    if (!target) return false;
    const tag = target.tagName?.toLowerCase();
    return tag === 'input' || tag === 'textarea' || target.isContentEditable;
  }

  // ---------- fill hero ----------
  setText('brandName', data.shortName);
  setText('brandTag', data.tagline);
  setText('heroTitle', data.heroTitle);
  setText('heroSubtitle', data.heroSubtitle);
  setHTML('heroLead', data.heroLead.replace(/\n/g, '<br>'));
  setText('availabilityPill', data.availability);
  setText('locationLine', data.locationLine);
  setText('nowLine', data.nowLine);
  setText('footerName', data.name);
  setText('year', String(new Date().getFullYear()));

  // CTAs
  const ctaWrap = $('#heroCtas');
  if (ctaWrap){
    data.ctas.forEach(c => {
      const cls = c.kind === 'primary' ? 'btn btn--primary' : 'btn btn--ghost';
      ctaWrap.appendChild(el('a', { class: cls, href: c.href, target: c.href.startsWith('http') ? '_blank' : '_self', rel: 'noreferrer' }, [c.label]));
    });
  }

  // meta pills
  const meta = $('#heroMeta');
  if (meta){
    data.metaPills.forEach(p => meta.appendChild(el('span', { class:'pill' }, [p])));
  }

  // quick stats
  const stats = $('#quickStats');
  if (stats){
    data.quickStats.forEach(s => {
      stats.appendChild(el('div', { class:'stat' }, [
        el('div', { class:'stat__k' }, [s.k]),
        el('div', { class:'stat__v' }, [s.v]),
      ]));
    });
  }

  // shipped titles
  const shippedGrid = $('#shippedTitlesGrid');
  if (shippedGrid && data.shippedTitles) {
    data.shippedTitles.forEach(title => {
      const cardChildren = [];
      
      // Add image if provided
      if (title.image) {
        cardChildren.push(
          el('img', { 
            src: title.image, 
            alt: title.title,
            style: 'width: 100%; height: 200px; object-fit: cover; border-radius: 8px 8px 0 0; margin: -16px -16px 12px -16px; display: block;'
          })
        );
      }
      
      const bodyChildren = [
        el('h3', {}, [title.title]),
        el('p', { class: 'muted', style: 'margin: 0.25rem 0;' }, [title.company]),
        el('p', { class: 'muted', style: 'font-size: 0.875rem; margin: 0.25rem 0;' }, [
          `${title.platform} • ${title.year}`
        ])
      ];
      
      if (title.highlights && title.highlights.length) {
        bodyChildren.push(
          el('ul', { 
            style: 'margin: 0.75rem 0 0 0; padding-left: 1.25rem; font-size: 0.875rem; line-height: 1.6;' 
          }, title.highlights.map(h => el('li', {}, [h])))
        );
      }
      
      cardChildren.push(el('div', { class: 'card__body' }, bodyChildren));
      const card = el('div', { class: 'card', style: 'overflow: hidden;' }, cardChildren);
      shippedGrid.appendChild(card);
    });
  }

  // ---------- projects ----------
  const projectGrid = $('#projectGrid');
  const projectSearch = $('#projectSearch');
  const projectFilter = $('#projectFilter');

  const allTags = Array.from(new Set(data.projects.flatMap(p => p.tags))).sort((a,b)=>a.localeCompare(b));
  if (projectFilter){
    allTags.forEach(t => projectFilter.appendChild(el('option', { value: t }, [t])));
  }

  function projectCard(p){
    const top = el('div', { class:'project__top' }, [
      el('div', {}, [
        el('div', { class:'project__name' }, [p.name]),
      ]),
      el('div', { class:'pill' }, [p.tags[0] || 'Project']),
    ]);

    const tags = el('div', { class:'tags' }, p.tags.map(t => el('span', { class:'tag' }, [t])));

    const links = el('div', { class:'project__links' },
      (p.links || []).map(l => el('a', {
        href: l.href,
        target: l.href?.startsWith('http') ? '_blank' : '_self',
        rel: 'noreferrer',
        'data-linktype': l.type || 'link'
      }, [l.label]))
    );

    const hi = (p.highlights && p.highlights.length)
      ? el('ul', { class:'muted', style:'margin:0 0 0 16px; line-height:1.6' }, p.highlights.slice(0,3).map(h => el('li', {}, [h])))
      : null;

    const bodyKids = [
      top,
      el('div', { class:'project__desc' }, [p.description]),
      tags
    ];
    if (hi) bodyKids.push(hi);
    bodyKids.push(links);

    return el('article', { class:'project' }, bodyKids);
  }

  function renderProjects(){
    if (!projectGrid) return;
    const q = (projectSearch?.value || '').trim().toLowerCase();
    const f = projectFilter?.value || 'all';

    const filtered = data.projects.filter(p => {
      if (p.enabled === false) return false; // filter out disabled projects
      const matchesTag = (f === 'all') || p.tags.includes(f);
      if (!matchesTag) return false;
      if (!q) return true;
      const hay = [
        p.name, p.description,
        (p.tags || []).join(' '),
        (p.highlights || []).join(' ')
      ].join(' ').toLowerCase();
      return hay.includes(q);
    });

    projectGrid.innerHTML = '';
    if (!filtered.length){
      projectGrid.appendChild(el('div', { class:'muted' }, ['No projects match that search/filter.']));
      return;
    }

    filtered.forEach(p => projectGrid.appendChild(projectCard(p)));
  }

  projectSearch?.addEventListener('input', renderProjects);
  projectFilter?.addEventListener('change', renderProjects);
  renderProjects();

  // ---------- project preview (homepage) ----------
  const projectPreview = $('#projectPreview');
  if (projectPreview){
    const enabledProjects = data.projects.filter(p => p.enabled !== false);
    if (enabledProjects.length === 0) {
      // Hide the entire projects section if no enabled projects
      const projectSection = projectPreview.closest('.section');
      if (projectSection) projectSection.style.display = 'none';
    } else {
      enabledProjects.slice(0, 3).forEach(p => projectPreview.appendChild(projectCard(p)));
    }
  }

  // ---------- experience ----------
  const exp = $('#experienceTimeline');
  if (exp){
    data.experience.forEach(r => {
      exp.appendChild(el('li', { class:'role' }, [
        el('div', { class:'role__head' }, [
          el('div', { class:'role__title' }, [`${r.title} — ${r.org}`]),
          el('div', { class:'role__meta' }, [`${r.when} • ${r.where}`]),
        ]),
        el('ul', {}, (r.bullets || []).map(b => el('li', {}, [b]))),
      ]));
    });
  }

  // ---------- experience preview (homepage) ----------
  const expPreview = $('#experiencePreview');
  if (expPreview){
    data.experience.slice(0, 2).forEach(r => {
      expPreview.appendChild(el('li', { class:'role' }, [
        el('div', { class:'role__head' }, [
          el('div', { class:'role__title' }, [`${r.title} — ${r.org}`]),
          el('div', { class:'role__meta' }, [`${r.when} • ${r.where}`]),
        ]),
        el('ul', {}, (r.bullets || []).slice(0, 3).map(b => el('li', {}, [b]))),
      ]));
    });
  }

  // ---------- skills ----------
  const skills = $('#skillChips');
  if (skills){
    data.skills.forEach(s => skills.appendChild(el('span', { class:'chip' }, [s])));
  }

  // ---------- skills preview (homepage) ----------
  const skillPreview = $('#skillPreview');
  if (skillPreview){
    data.skills.slice(0, 12).forEach(s => skillPreview.appendChild(el('span', { class:'chip' }, [s])));
  }

  // ---------- talks ----------
  const talks = $('#talkList');
  if (talks){
    data.talks.filter(t => t.enabled !== false).forEach(t => {
      talks.appendChild(el('div', { class:'item' }, [
        el('div', {}, [
          el('div', { class:'item__title' }, [
            el('a', { href: t.link || '#', target: t.link?.startsWith('http') ? '_blank' : '_self', rel: 'noreferrer' }, [t.title])
          ]),
          el('div', { class:'item__meta' }, [t.when || '']),
        ]),
        el('div', { class:'item__meta' }, ['']),
      ]));
    });
  }

  // ---------- contact ----------
  const contact = $('#contactCards');
  if (contact){
    data.contact.forEach(c => {
      contact.appendChild(el('div', { class:'contactcard' }, [
        el('div', { class:'contactcard__k' }, [c.k]),
        el('div', { class:'contactcard__v' }, [c.v]),
        el('a', { class:'contactcard__a btn btn--ghost', href: c.href, target: c.href?.startsWith('http') ? '_blank' : '_self', rel: 'noreferrer' }, [c.label || 'Open']),
      ]));
    });
  }

  // ---------- contact preview (homepage) ----------
  const contactPreview = $('#contactPreview');
  if (contactPreview){
    data.contact.forEach(c => {
      contactPreview.appendChild(el('div', { class:'contactcard' }, [
        el('div', { class:'contactcard__k' }, [c.k]),
        el('div', { class:'contactcard__v' }, [c.v]),
        el('a', { class:'contactcard__a btn btn--ghost', href: c.href, target: c.href?.startsWith('http') ? '_blank' : '_self', rel: 'noreferrer' }, [c.label || 'Open']),
      ]));
    });
  }

  // ---------- command palette ----------
  const palette = $('#commandPalette');
  const cmdInput = $('#commandInput');
  const cmdResults = $('#commandResults');

  const openPalette = () => {
    if (!palette) return;
    palette.classList.add('open');
    palette.setAttribute('aria-hidden', 'false');
    cmdInput.value = '';
    renderCmd('');
    setTimeout(() => cmdInput.focus(), 0);
  };
  const closePalette = () => {
    if (!palette) return;
    palette.classList.remove('open');
    palette.setAttribute('aria-hidden', 'true');
  };

  function renderCmd(q){
    if (!cmdResults) return;
    const qq = (q || '').toLowerCase().trim();

    const items = [];

    data.projects.forEach(p => items.push({
      k: p.name,
      t: `Project • ${p.tags.join(', ')}`,
      href: '#projects',
      extra: [p.description, p.tags.join(' '), (p.highlights||[]).join(' ')].join(' ')
    }));

    data.experience.forEach(r => items.push({
      k: `${r.title} — ${r.org}`,
      t: `Experience • ${r.when}`,
      href: '#experience',
      extra: (r.bullets||[]).join(' ')
    }));

    data.skills.forEach(s => items.push({
      k: s,
      t: 'Skill',
      href: '#skills',
      extra: s
    }));

    const filtered = !qq ? items.slice(0, 12) : items.filter(it => {
      const hay = `${it.k} ${it.t} ${it.extra}`.toLowerCase();
      return hay.includes(qq);
    }).slice(0, 20);

    cmdResults.innerHTML = '';
    filtered.forEach(it => {
      const row = el('a', { class:'result', href: it.href }, [
        el('div', {}, [
          el('div', { class:'result__k' }, [it.k]),
          el('div', { class:'result__t' }, [it.t]),
        ]),
        el('div', { class:'result__t' }, ['↵']),
      ]);
      row.addEventListener('click', () => closePalette());
      cmdResults.appendChild(row);
    });

    if (!filtered.length){
      cmdResults.appendChild(el('div', { class:'muted', style:'padding:10px' }, ['No results.']));
    }
  }

  cmdInput?.addEventListener('input', (e) => renderCmd(e.target.value));

  // Ctrl+K
  window.addEventListener('keydown', (e) => {
    const isCmdK = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k';
    if (isCmdK){
      e.preventDefault();
      openPalette();
    }
    if (e.key === 'Escape'){
      closePalette();
    }
  });

  // close on overlay / buttons
  palette?.addEventListener('click', (e) => {
    const close = e.target?.matches?.('[data-close]');
    if (close) closePalette();
  });
})();
