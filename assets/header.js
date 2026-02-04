// Common header component for all pages
(function() {
  // Wait for content.js to load if it hasn't yet
  function initHeader() {
    // Determine current page from the page's data attribute or URL
    const currentPage = document.documentElement.getAttribute('data-page') || 'home';
    
    // Check if there are enabled projects and talks
    const data = window.PORTFOLIO || {};
    const hasProjects = (data.projects || []).some(p => p.enabled !== false);
    const hasTalks = (data.talks || []).some(t => t.enabled);
    
    const headerHTML = `
  <header class="topbar">
    <div class="container topbar__inner">
      <div class="brand">
        <div style="display: flex; gap: 2px; align-items: center; padding: 6px 10px; border-radius: 14px; background: linear-gradient(135deg, rgba(124,58,237,.9), rgba(34,197,94,.8)); box-shadow: var(--shadow); margin-right: 0.25rem;">
          <a href="https://github.com/TheMikaus" target="_blank" rel="noreferrer" aria-label="GitHub" style="padding: 2px; display: flex; color: white;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </a>
          <a href="https://www.linkedin.com/in/mikaus-game-dev/" target="_blank" rel="noreferrer" aria-label="LinkedIn" style="padding: 2px; display: flex; color: white;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          </a>
        </div>
        <a href="index.html" style="text-decoration: none; color: inherit; display: flex; align-items: center; gap: 0.75rem;">
          <div class="brand__text">
            <div class="brand__name" id="brandName">Mikaus</div>
            <div class="brand__tag" id="brandTag">AI • Gameplay • Tools</div>
          </div>
        </a>
      </div>

      <button class="mobile-menu-toggle" aria-label="Toggle menu" aria-expanded="false">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>

      <nav class="nav" aria-label="Primary">
        <div class="nav-links" style="display: flex; gap: 6px; background: var(--card); border-radius: 12px; padding: 6px; border: 1px solid var(--line);">
          <a href="index.html"${currentPage === 'home' ? ' aria-current="page"' : ''}>Home</a>
          ${hasProjects ? `<a href="projects.html"${currentPage === 'projects' ? ' aria-current="page"' : ''}>Projects</a>` : ''}
          <a href="experience.html"${currentPage === 'experience' ? ' aria-current="page"' : ''}>Experience</a>
          <a href="skills.html"${currentPage === 'skills' ? ' aria-current="page"' : ''}>Skills</a>
          ${hasTalks ? `<a href="talks.html"${currentPage === 'talks' ? ' aria-current="page"' : ''}>Talks</a>` : ''}
        </div>
      </nav>
    </div>
  </header>
  
  <style>
    .mobile-menu-toggle {
      display: none;
      background: var(--card);
      border: 1px solid var(--line);
      border-radius: 10px;
      padding: 8px;
      cursor: pointer;
      color: var(--text);
    }
    
    @media (max-width: 768px) {
      .mobile-menu-toggle {
        display: block;
      }
      
      .nav {
        position: fixed;
        top: 70px;
        right: 16px;
        flex-direction: column;
        align-items: stretch;
        background: var(--bg);
        border: 1px solid var(--line);
        border-radius: 12px;
        padding: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        max-width: 280px;
        display: none;
      }
      
      .nav.is-open {
        display: flex;
      }
      
      .nav .nav-links {
        flex-direction: column;
        margin-left: 0 !important;
        width: 100%;
      }
      
      .nav .nav-links a {
        width: 100%;
        text-align: left;
      }
      
      .nav > div:last-child {
        margin-left: 0 !important;
        justify-content: center;
        margin-top: 8px;
        padding-top: 8px;
        border-top: 1px solid var(--line);
      }
    }
  </style>`;
    
    // Insert header at the beginning of body (after skip link if it exists)
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
      skipLink.insertAdjacentHTML('afterend', headerHTML);
    } else {
      document.body.insertAdjacentHTML('afterbegin', headerHTML);
    }
    
    // Add mobile menu toggle functionality
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (menuToggle && nav) {
      menuToggle.addEventListener('click', function() {
        const isOpen = nav.classList.toggle('is-open');
        menuToggle.setAttribute('aria-expanded', isOpen);
      });
      
      // Close menu when clicking outside
      document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
          nav.classList.remove('is-open');
          menuToggle.setAttribute('aria-expanded', 'false');
        }
      });
      
      // Close menu when clicking a link
      nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
          nav.classList.remove('is-open');
          menuToggle.setAttribute('aria-expanded', 'false');
        });
      });
    }
  }

  // Check if content.js has loaded yet
  if (window.PORTFOLIO) {
    initHeader();
  } else {
    // Wait for content.js to load
    window.addEventListener('DOMContentLoaded', initHeader);
  }
})();
