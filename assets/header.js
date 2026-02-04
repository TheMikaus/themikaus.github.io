// Common header component for all pages
(function() {
  // Determine current page from the page's data attribute or URL
  const currentPage = document.documentElement.getAttribute('data-page') || 'home';
  
  const headerHTML = `
  <header class="topbar">
    <div class="container topbar__inner">
      <div class="brand">
        <a href="index.html" style="text-decoration: none; color: inherit; display: flex; align-items: center; gap: 0.75rem;">
          <div class="brand__mark" aria-hidden="true">MW</div>
          <div class="brand__text">
            <div class="brand__name" id="brandName">Mikaus</div>
            <div class="brand__tag" id="brandTag">AI • Gameplay • Tools</div>
          </div>
        </a>
      </div>

      <nav class="nav" aria-label="Primary">
        <div style="display: flex; gap: 6px; background: var(--card); border-radius: 12px; padding: 6px; border: 1px solid var(--line);">
          <a href="index.html"${currentPage === 'home' ? ' aria-current="page"' : ''}>Home</a>
          <a href="projects.html"${currentPage === 'projects' ? ' aria-current="page"' : ''}>Projects</a>
          <a href="experience.html"${currentPage === 'experience' ? ' aria-current="page"' : ''}>Experience</a>
          <a href="skills.html"${currentPage === 'skills' ? ' aria-current="page"' : ''}>Skills</a>
          <a href="talks.html"${currentPage === 'talks' ? ' aria-current="page"' : ''}>Talks</a>
        </div>
        <div style="display: flex; gap: 0.25rem; margin-left: 1.5rem;">
          <a href="https://github.com/TheMikaus" target="_blank" rel="noreferrer" aria-label="GitHub" style="padding: 0.5rem;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </a>
          <a href="https://www.linkedin.com/in/mikaus-game-dev/" target="_blank" rel="noreferrer" aria-label="LinkedIn" style="padding: 0.5rem;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          </a>
        </div>
      </nav>
    </div>
  </header>`;
  
  // Insert header at the beginning of body (after skip link if it exists)
  const skipLink = document.querySelector('.skip-link');
  if (skipLink) {
    skipLink.insertAdjacentHTML('afterend', headerHTML);
  } else {
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
  }
})();
