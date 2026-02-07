(() => {
  const data = window.PORTFOLIO;

  // ---------- constants ----------
  const EXPERIENCE_IMG_WIDTH = 300;
  const EXPERIENCE_IMG_HEIGHT = 200;

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
            style: 'width: 100%; height: 200px; object-fit: cover; display: block;'
          })
        );
      }
      
      // Title as colored header
      cardChildren.push(
        el('div', { 
          style: 'background: linear-gradient(135deg, rgba(124,58,237,.2), rgba(34,197,94,.2)); padding: 6px 10px; border-bottom: 1px solid var(--line);' 
        }, [
          el('h3', { style: 'margin: 0; font-size: 1.25rem;' }, [title.title])
        ])
      );
      
      const bodyChildren = [
        el('p', { class: 'muted', style: 'margin: 0 0 0.25rem 0;' }, [title.company]),
        el('p', { class: 'muted', style: 'font-size: 0.875rem; margin: 0 0 0.75rem 0;' }, [
          `${title.platform} • ${title.year}`
        ])
      ];
      
      if (title.highlights && title.highlights.length) {
        bodyChildren.push(
          el('ul', { 
            style: 'margin: 0; padding-left: 1.25rem; font-size: 0.875rem; line-height: 1.6;' 
          }, title.highlights.map(h => el('li', {}, [h])))
        );
      }
      
      cardChildren.push(el('div', { class: 'card__body' }, bodyChildren));
      
      if (title.experienceId) {
        const link = el('a', {
          href: `experience.html#${title.experienceId}`,
          style: 'text-decoration: none; color: inherit; display: block;'
        }, [el('div', { class: 'card', style: 'overflow: hidden; padding: 0; transition: transform 0.2s; cursor: pointer;' }, cardChildren)]);
        link.addEventListener('mouseenter', (e) => e.currentTarget.firstChild.style.transform = 'translateY(-2px)');
        link.addEventListener('mouseleave', (e) => e.currentTarget.firstChild.style.transform = 'translateY(0)');
        shippedGrid.appendChild(link);
      } else {
        const card = el('div', { class: 'card', style: 'overflow: hidden; padding: 0;' }, cardChildren);
        shippedGrid.appendChild(card);
      }
    });
  }

  // ---------- projects ----------
  const projectGrid = $('#projectGrid');
  const projectSearch = $('#projectSearch');
  const projectFilter = $('#projectFilter');
  const categoryFilters = document.querySelectorAll('.category-filter');

  const allTags = Array.from(new Set(data.projects.flatMap(p => p.tags))).sort((a,b)=>a.localeCompare(b));
  if (projectFilter){
    allTags.forEach(t => projectFilter.appendChild(el('option', { value: t }, [t])));
  }

  // Category mapping
  const categoryMap = {
    'games': ['Game Dev', 'GBA', 'Nintendo DS', 'Platformer', 'Game Jam', 'Action', 'Windows'],
    'art': ['Art', 'Drawing', 'Ink', 'Watercolor', 'Comics', 'Inktober', 'Fan Art', 'Hand-drawn', 'Digital', 'Woodworking', 'Crafting'],
    'music': ['Music', 'Audio', 'Covers', 'Band', 'Original', 'Album', 'Guitar', 'Piano', 'Collaboration'],
    'tools': ['Tools', 'Vim', 'Productivity', 'Tooling', 'Open Source', 'Metronome', 'JamStik']
  };

  let activeCategory = 'all';

  // Category filter button handlers
  categoryFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      activeCategory = btn.dataset.category;
      categoryFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProjects();
    });
  });

  function projectCard(p, isPreview = false){
    // Generate a URL-safe ID from project name
    const projectId = p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    
    // Determine emoji based on tags
    let emoji = '💻'; // default
    if (p.tags.some(t => ['Game Dev', 'GBA', 'Nintendo DS', 'Platformer'].includes(t))) {
      emoji = '🎮';
    } else if (p.tags.includes('Art') || p.tags.includes('Drawing') || p.tags.includes('Ink') || p.tags.includes('Watercolor') || p.tags.includes('Comics')) {
      emoji = '🎨';
    } else if (p.tags.includes('Writing') || p.tags.includes('Poetry') || p.tags.includes('Documents')) {
      emoji = '📖';
    } else if (p.tags.includes('Tools') || p.tags.includes('Vim') || p.tags.includes('Productivity')) {
      emoji = '🛠️';
    } else if (p.tags.includes('Unreal')) {
      emoji = '🎯';
    } else if (p.tags.includes('Audio') || p.tags.includes('Music')) {
      emoji = '🎵';
    } else if (p.tags.includes('Open Source')) {
      emoji = '🌐';
    }
    
    if (isPreview) {
      // Homepage preview: vertical card with image, title, link, description, tags at bottom
      const cardChildren = [];
      
      if (p.image) {
        cardChildren.push(
          el('img', { 
            src: p.image, 
            alt: p.name,
            style: 'width: 100%; height: 200px; object-fit: cover; display: block;'
          })
        );
      }
      
      const bodyContent = [];
      
      // Title row with emoji, name, and links
      const titleRowChildren = [
        el('div', { style: 'display: flex; align-items: center; gap: 8px;' }, [
          el('span', { style: 'font-size: 24px;' }, [emoji]),
          el('div', { class: 'project__name' }, [p.name])
        ])
      ];
      
      if (p.links && p.links.length > 0) {
        titleRowChildren.push(
          el('div', { 
            style: 'display: flex; gap: 8px; flex-wrap: wrap;' 
          }, p.links.map(link => el('a', {
            href: link.href,
            target: link.href?.startsWith('http') ? '_blank' : '_self',
            rel: 'noreferrer',
            class: 'pill',
            style: 'text-decoration: none; color: inherit;',
            'data-linktype': link.type || 'link',
            onclick: '(function(e){e.stopPropagation();})(event)'
          }, [link.label])))
        );
      }
      
      bodyContent.push(
        el('div', { style: 'display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 12px; flex-wrap: wrap;' }, titleRowChildren)
      );
      
      // Description
      bodyContent.push(
        el('div', { class: 'project__desc', style: 'margin-bottom: auto;' }, [p.description])
      );
      
      // Tags at bottom
      bodyContent.push(
        el('div', { class: 'tags', style: 'margin-top: auto; padding-top: 12px;' }, p.tags.map(t => el('span', { class: 'tag' }, [t])))
      );
      
      cardChildren.push(
        el('div', { style: 'padding: 14px; display: flex; flex-direction: column; flex: 1;' }, bodyContent)
      );
      
      const card = el('article', { 
        class: 'project',
        id: projectId,
        style: 'padding: 0; overflow: hidden; cursor: pointer; display: flex; flex-direction: column;'
      }, cardChildren);
      
      card.addEventListener('click', (e) => {
        if (e.target.tagName === 'A' || e.target.closest('a')) return;
        window.location.href = `projects.html#${projectId}`;
      });
      
      return card;
    } else {
      // Projects page: header bar, then image left + content right
      const cardChildren = [];
      
      // Header bar
      const headerChildren = [
        el('div', { style: 'display: flex; align-items: center; gap: 8px;' }, [
          el('span', { style: 'font-size: 24px;' }, [emoji]),
          el('div', { class: 'project__name' }, [p.name]),
          p.yearUnknown ? el('span', { class: 'muted', style: 'font-size: 14px; margin-left: 4px;' }, ['(Year Unknown)']) : (p.year ? el('span', { class: 'muted', style: 'font-size: 14px; margin-left: 4px;' }, [`(${p.year})`]) : null)
        ].filter(Boolean))
      ];
      
      if (p.links && p.links.length > 0) {
        headerChildren.push(
          el('div', { 
            style: 'display: flex; gap: 8px; flex-wrap: wrap; align-items: center;' 
          }, p.links.map(link => el('a', {
            href: link.href,
            target: link.href?.startsWith('http') ? '_blank' : '_self',
            rel: 'noreferrer',
            class: 'pill',
            style: 'text-decoration: none; color: inherit;',
            'data-linktype': link.type || 'link',
            onclick: '(function(e){e.stopPropagation();})(event)'
          }, [link.label])))
        );
      }
      
      cardChildren.push(
        el('div', { 
          class: 'project__header',
          style: 'padding: 14px; display: flex; align-items: center; justify-content: space-between; gap: 10px; background: linear-gradient(135deg, rgba(124,58,237,.1), rgba(34,197,94,.1));'
        }, headerChildren)
      );
      
      // Content area with image left and text right
      const contentChildren = [];
      
      if (p.image) {
        contentChildren.push(
          el('img', { 
            src: p.image, 
            alt: p.name,
            style: 'width: 300px; min-width: 300px; height: auto; object-fit: cover;'
          })
        );
      }
      
      // Body content
      const bodyContent = [
        el('div', { class: 'project__desc', style: 'margin-bottom: 12px;' }, [p.description])
      ];
      
      if (p.highlights && p.highlights.length) {
        bodyContent.push(
          el('ul', { class: 'muted', style: 'margin: 0 0 12px 16px; line-height: 1.6;' }, 
            p.highlights.slice(0, 3).map(h => el('li', {}, [h])))
        );
      }
      
      bodyContent.push(
        el('div', { class: 'tags', style: 'margin-top: auto;' }, p.tags.map(t => el('span', { class: 'tag' }, [t])))
      );
      
      contentChildren.push(
        el('div', { style: 'padding: 14px; display: flex; flex-direction: column; flex: 1;' }, bodyContent)
      );
      
      cardChildren.push(
        el('div', { class: 'project__content', style: 'display: flex; flex-direction: row;' }, contentChildren)
      );
      
      return el('article', { 
        class: 'project project--full',
        id: projectId,
        style: 'padding: 0; overflow: hidden;'
      }, cardChildren);
    }
  }

  function renderProjects(){
    if (!projectGrid) return;
    const q = (projectSearch?.value || '').trim().toLowerCase();
    const f = projectFilter?.value || 'all';

    const filtered = data.projects.filter(p => {
      if (p.enabled === false) return false; // filter out disabled projects
      
      // Category filter
      if (activeCategory !== 'all') {
        const categoryTags = categoryMap[activeCategory] || [];
        const matchesCategory = p.tags.some(tag => categoryTags.includes(tag));
        if (!matchesCategory) return false;
      }
      
      // Tag filter
      const matchesTag = (f === 'all') || p.tags.includes(f);
      if (!matchesTag) return false;
      
      // Search filter
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
      enabledProjects.slice(0, 3).forEach(p => projectPreview.appendChild(projectCard(p, true)));
    }
  }

  // ---------- experience ----------
  const exp = $('#experienceTimeline');
  if (exp && data.experience){
    data.experience.filter(r => r.enabled !== false).forEach(r => {
      const card = el('div', { 
        class: 'card experience-card', 
        style: 'display: flex; gap: 0; padding: 0; margin-bottom: 1.5rem; overflow: visible;' 
      });
      
      // Left side - Image (like a tab sticking out)
      if (r.image) {
        card.appendChild(
          el('div', {
            class: 'experience-card__image',
            style: `flex: 0 0 auto; width: ${EXPERIENCE_IMG_WIDTH}px; height: ${EXPERIENCE_IMG_HEIGHT}px;`
          }, [
            el('img', { 
              src: r.image, 
              alt: r.org,
              style: `width: ${EXPERIENCE_IMG_WIDTH}px; height: ${EXPERIENCE_IMG_HEIGHT}px; object-fit: cover; object-position: top; display: block; border-radius: 8px 0 0 8px;`
            })
          ])
        );
      }
      
      // Right side - Content box (forms complete rectangle)
      const contentBox = el('div', { 
        class: 'experience-card__content',
        style: 'flex: 1; display: flex; flex-direction: column; min-width: 0; border-radius: 0 8px 8px 0; overflow: hidden;' 
      });
      
      // Company name as colored header
      contentBox.appendChild(
        el('div', { 
          style: 'background: linear-gradient(135deg, rgba(124,58,237,.2), rgba(34,197,94,.2)); padding: 12px 16px; border-bottom: 1px solid var(--line);' 
        }, [
          el('h3', { style: 'margin: 0; font-size: 1.25rem;' }, [r.org])
        ])
      );
      
      // Body content
      const bodyContent = [
        el('p', { class: 'muted', style: 'margin: 0 0 0.5rem 0; font-size: 0.875rem;' }, [r.when]),
        el('p', { class: 'muted', style: 'margin: 0 0 0.75rem 0; font-size: 0.875rem;' }, [r.where])
      ];
      
      if (r.bullets && r.bullets.length) {
        bodyContent.push(
          el('ul', { 
            style: 'margin: 0; padding-left: 1.25rem; font-size: 0.875rem; line-height: 1.6;' 
          }, r.bullets.map(b => el('li', {}, [b])))
        );
      }
      
      contentBox.appendChild(el('div', { class: 'card__body' }, bodyContent));
      
      card.appendChild(contentBox);
      
      if (r.id) {
        card.id = r.id;
      }
      
      exp.appendChild(card);
    });
  }

  // ---------- experience preview (homepage) ----------
  const expPreview = $('#experiencePreview');
  if (expPreview && data.experience){
    data.experience.filter(r => r.enabled !== false && r.showOnMainPage).forEach(r => {
      const cardChildren = [];
      
      // Add image if provided
      if (r.image) {
        cardChildren.push(
          el('img', { 
            src: r.image, 
            alt: r.org,
            style: `width: 100%; height: ${EXPERIENCE_IMG_HEIGHT}px; object-fit: cover; object-position: top; display: block;`
          })
        );
      }
      
      // Company name as colored header
      cardChildren.push(
        el('div', { 
          style: 'background: linear-gradient(135deg, rgba(124,58,237,.2), rgba(34,197,94,.2)); padding: 12px 16px; border-bottom: 1px solid var(--line);' 
        }, [
          el('h3', { style: 'margin: 0; font-size: 1.25rem;' }, [r.org])
        ])
      );
      
      // Dates
      cardChildren.push(
        el('div', { class: 'card__body' }, [
          el('p', { class: 'muted', style: 'margin: 0; font-size: 0.875rem;' }, [r.when])
        ])
      );
      
      if (r.id) {
        const link = el('a', {
          href: `experience.html#${r.id}`,
          style: 'text-decoration: none; color: inherit; display: block;'
        }, [el('div', { class: 'card', style: 'overflow: hidden; padding: 0; margin-bottom: 1.5rem; transition: transform 0.2s; cursor: pointer;' }, cardChildren)]);
        link.addEventListener('mouseenter', (e) => e.currentTarget.firstChild.style.transform = 'translateY(-2px)');
        link.addEventListener('mouseleave', (e) => e.currentTarget.firstChild.style.transform = 'translateY(0)');
        expPreview.appendChild(link);
      } else {
        expPreview.appendChild(el('div', { class: 'card', style: 'overflow: hidden; padding: 0; margin-bottom: 1.5rem;' }, cardChildren));
      }
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
