(function () {
  'use strict';

  // ============================================================
  // State
  // ============================================================
  let megaMenuOpen = false;
  let mobileOpen = false;
  let mobilePanelStack = [{ id: 'main', trigger: null }];

  // ============================================================
  // Cached DOM refs (populated after render)
  // ============================================================
  let megaTrigger = null;
  let megaMenuEl = null;
  let hamburgerBtn = null;
  let mobileMenuEl = null;

  // ============================================================
  // Render – desktop nav
  // ============================================================
  function renderNav() {
    const nav = document.getElementById('main-nav');
    if (!nav) return;

    const kontakt = navData.utilityLinks.find(u => u.id === 'kontakt');
    const loggaIn = navData.utilityLinks.find(u => u.id === 'logga-in');

    nav.innerHTML = `
      <div class="nav-inner">

        <div class="nav-start">
          <ul class="nav-links" role="list" aria-label="Huvudlänkar">
            ${navData.mainLinks.map(link => {
              if (link.hasMegaMenu) {
                return `
                  <li>
                    <button
                      class="nav-link"
                      id="mega-menu-trigger"
                      aria-expanded="false"
                      aria-controls="mega-menu"
                    >
                      ${link.label}
                      <i data-lucide="chevron-down" aria-hidden="true" class="dropdown-icon"></i>
                    </button>
                    <div
                      id="mega-menu"
                      class="mega-menu"
                      role="group"
                      aria-labelledby="mega-menu-trigger"
                      hidden
                    >
                      <div class="mega-menu-inner">
                        <div class="mega-menu-grid">
                          ${link.categories.map(cat => `
                            <div class="mega-category">
                              <h2 class="category-heading">
                                <i data-lucide="${cat.icon}" aria-hidden="true"></i>
                                ${cat.label}
                              </h2>
                              <ul class="category-links" role="list">
                                ${cat.links.map(l => `<li><a href="${l.href}">${l.label}</a></li>`).join('')}
                              </ul>
                            </div>
                          `).join('')}
                        </div>
                        <div class="mega-menu-footer">
                          <a href="${link.seeAllLink.href}" class="see-all-link">
                            ${link.seeAllLink.label}
                            <i data-lucide="arrow-right" aria-hidden="true"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </li>
                `;
              }
              return `<li><a class="nav-link" href="${link.href}">${link.label}</a></li>`;
            }).join('')}
          </ul>

          <ul class="mobile-top-icons" role="list">
            <li>
              <a href="${kontakt.href}" aria-label="Kontakt">
                <i data-lucide="phone" aria-hidden="true"></i>
              </a>
            </li>
            <li>
              <a href="${loggaIn.href}" aria-label="Logga in">
                <i data-lucide="user" aria-hidden="true"></i>
              </a>
            </li>
          </ul>
        </div>

        <div class="nav-center">
          <a href="#" class="nav-logo" aria-label="Svedea – Till startsidan">
            <span class="logo-wordmark" aria-hidden="true">svedea</span>
            <span class="logo-tagline" aria-hidden="true">Försäkringar som gör skillnad</span>
          </a>
        </div>

        <div class="nav-end">
          <ul class="utility-links" role="list" aria-label="Verktygslänkar">
            ${navData.utilityLinks.map(link => `
              <li>
                <a class="utility-link" href="${link.href}">
                  <i data-lucide="${link.icon}" aria-hidden="true"></i>
                  <span>${link.label}</span>
                </a>
              </li>
            `).join('')}
          </ul>
          <a href="${navData.ctaButton.href}" class="cta-btn">${navData.ctaButton.label}</a>
          <button
            class="hamburger-btn"
            id="hamburger-btn"
            aria-label="Öppna meny"
            aria-expanded="false"
            aria-controls="mobile-menu"
          >
            <i data-lucide="menu" aria-hidden="true"></i>
          </button>
        </div>

      </div>
    `;
  }

  // ============================================================
  // Render – mobile menu overlay
  // ============================================================
  function renderMobile() {
    const container = document.getElementById('mobile-menu');
    if (!container) return;

    const forsakringar = navData.mainLinks.find(l => l.hasMegaMenu);
    const kontakt = navData.utilityLinks.find(u => u.id === 'kontakt');
    const loggaIn = navData.utilityLinks.find(u => u.id === 'logga-in');

    container.innerHTML = `
      <div class="mobile-header">
        <div class="mobile-header-left">
          <a href="${kontakt.href}" aria-label="Kontakt">
            <i data-lucide="phone" aria-hidden="true"></i>
          </a>
          <a href="${loggaIn.href}" aria-label="Logga in">
            <i data-lucide="user" aria-hidden="true"></i>
          </a>
        </div>
        <a href="#" class="nav-logo" aria-label="Svedea – Till startsidan">
          <span class="logo-wordmark" aria-hidden="true">svedea</span>
          <span class="logo-tagline" aria-hidden="true">Försäkringar som gör skillnad</span>
        </a>
        <button class="mobile-close-btn" id="mobile-close-btn" aria-label="Stäng meny">
          <i data-lucide="x" aria-hidden="true"></i>
        </button>
      </div>

      <div class="mobile-body">

        <div class="mobile-search">
          <input
            type="search"
            class="mobile-search-input"
            placeholder="Sök på svedea..."
            aria-label="Sök på svedea"
          />
        </div>

        <nav aria-label="Mobilnavigation">

        <!-- Panel: Huvudmeny -->
        <div class="mobile-panel is-active" data-panel="main" id="mobile-panel-main">
          <ul class="mobile-nav-list" role="list">
            <li class="mobile-nav-item">
              <button
                class="mobile-nav-btn"
                data-navigate="forsakringar"
                aria-expanded="false"
                aria-controls="mobile-panel-forsakringar"
              >
                ${forsakringar.label}
                <i data-lucide="chevron-right" aria-hidden="true" class="nav-chevron"></i>
              </button>
            </li>
            ${navData.mainLinks.filter(l => !l.hasMegaMenu).map(link => `
              <li class="mobile-nav-item">
                <a class="mobile-nav-link" href="${link.href}">${link.label}</a>
              </li>
            `).join('')}
          </ul>
          <div class="mobile-footer">
            <a href="${navData.ctaButton.href}" class="mobile-cta-btn">${navData.ctaButton.label}</a>
            <a href="${loggaIn.href}" class="mobile-login-link">
              <i data-lucide="user" aria-hidden="true"></i>
              ${loggaIn.label}
            </a>
          </div>
        </div>

        <!-- Panel: Försäkringar kategorier -->
        <div class="mobile-panel" data-panel="forsakringar" id="mobile-panel-forsakringar" inert>
          <button class="mobile-panel-back" data-back aria-label="Tillbaka till huvudmenyn">
            <i data-lucide="chevron-left" aria-hidden="true"></i>
            Tillbaka
          </button>
          <h2 class="mobile-panel-title">${forsakringar.label}</h2>
          <ul class="mobile-nav-list" role="list">
            ${forsakringar.categories.map(cat => `
              <li class="mobile-nav-item">
                <button
                  class="mobile-nav-btn"
                  data-navigate="${cat.id}"
                  aria-expanded="false"
                  aria-controls="mobile-panel-${cat.id}"
                >
                  <i data-lucide="${cat.icon}" aria-hidden="true" class="mobile-category-icon"></i>
                  ${cat.label}
                  <i data-lucide="chevron-right" aria-hidden="true" class="nav-chevron"></i>
                </button>
              </li>
            `).join('')}
          </ul>
          <a href="${forsakringar.seeAllLink.href}" class="mobile-see-all-link">
            ${forsakringar.seeAllLink.label}
            <i data-lucide="arrow-right" aria-hidden="true"></i>
          </a>
        </div>

        <!-- Panels: Enskilda kategorier -->
        ${forsakringar.categories.map(cat => `
          <div class="mobile-panel" data-panel="${cat.id}" id="mobile-panel-${cat.id}" inert>
            <button class="mobile-panel-back" data-back aria-label="Tillbaka till ${forsakringar.label}">
              <i data-lucide="chevron-left" aria-hidden="true"></i>
              Tillbaka
            </button>
            <h2 class="mobile-panel-title">
              <i data-lucide="${cat.icon}" aria-hidden="true" class="mobile-category-icon"></i>
              ${cat.label}
            </h2>
            <ul class="mobile-nav-list" role="list">
              ${cat.links.map(l => `
                <li class="mobile-nav-item">
                  <a class="mobile-nav-link" href="${l.href}">${l.label}</a>
                </li>
              `).join('')}
            </ul>
          </div>
        `).join('')}

        </nav>

      </div>
    `;
  }

  // ============================================================
  // Mega menu
  // ============================================================
  function openMega() {
    megaMenuOpen = true;
    megaMenuEl.removeAttribute('hidden');
    megaTrigger.setAttribute('aria-expanded', 'true');
  }

  function closeMega() {
    if (!megaMenuOpen) return;
    megaMenuOpen = false;
    megaMenuEl.hidden = true;
    megaTrigger.setAttribute('aria-expanded', 'false');
  }

  function toggleMega() {
    megaMenuOpen ? closeMega() : openMega();
  }

  // ============================================================
  // Mobile menu
  // ============================================================
  function openMobile() {
    mobileOpen = true;
    mobileMenuEl.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    hamburgerBtn.setAttribute('aria-expanded', 'true');

    document.querySelector('.site-header').setAttribute('inert', '');
    document.getElementById('main-content').setAttribute('inert', '');

    const closeBtn = mobileMenuEl.querySelector('#mobile-close-btn');
    if (closeBtn) closeBtn.focus();
  }

  function closeMobile() {
    mobileOpen = false;
    mobileMenuEl.setAttribute('hidden', '');
    document.body.style.overflow = '';
    hamburgerBtn.setAttribute('aria-expanded', 'false');

    document.querySelector('.site-header').removeAttribute('inert');
    document.getElementById('main-content').removeAttribute('inert');

    hamburgerBtn.focus();

    // Reset drill-down state
    mobilePanelStack = [{ id: 'main', trigger: null }];
    showPanel('main');
    mobileMenuEl.querySelectorAll('[data-navigate]').forEach(btn => {
      btn.setAttribute('aria-expanded', 'false');
    });
  }

  // ============================================================
  // Mobile drill-down panel switching
  // ============================================================
  function showPanel(panelId) {
    const panels = mobileMenuEl.querySelectorAll('.mobile-panel');
    panels.forEach(panel => {
      const isActive = panel.dataset.panel === panelId;
      panel.classList.toggle('is-active', isActive);
      if (isActive) {
        panel.removeAttribute('inert');
      } else {
        panel.setAttribute('inert', '');
      }
    });
  }

  function navigateTo(panelId) {
    const triggerBtn = mobileMenuEl.querySelector(`[data-navigate="${panelId}"]`);
    if (triggerBtn) triggerBtn.setAttribute('aria-expanded', 'true');
    mobilePanelStack.push({ id: panelId, trigger: triggerBtn });
    showPanel(panelId);

    const panel = mobileMenuEl.querySelector(`[data-panel="${panelId}"]`);
    if (panel) {
      const backBtn = panel.querySelector('[data-back]');
      if (backBtn) backBtn.focus();
    }
  }

  function navigateBack() {
    if (mobilePanelStack.length <= 1) return;
    const current = mobilePanelStack[mobilePanelStack.length - 1];
    mobilePanelStack.pop();
    const prev = mobilePanelStack[mobilePanelStack.length - 1];
    showPanel(prev.id);

    if (current.trigger) {
      current.trigger.setAttribute('aria-expanded', 'false');
      current.trigger.focus();
    } else {
      const panel = mobileMenuEl.querySelector(`[data-panel="${prev.id}"]`);
      if (panel) {
        const first = panel.querySelector('button, a');
        if (first) first.focus();
      }
    }
  }

  // ============================================================
  // Event listeners
  // ============================================================
  function bindEvents() {
    // Mega menu trigger
    megaTrigger.addEventListener('click', toggleMega);

    // Close mega when focus leaves the <li> containing trigger + menu
    megaTrigger.closest('li').addEventListener('focusout', e => {
      if (!megaMenuOpen) return;
      if (!megaTrigger.closest('li').contains(e.relatedTarget)) {
        closeMega();
      }
    });

    // Close mega on outside click
    document.addEventListener('click', e => {
      if (megaMenuOpen && !e.target.closest('#main-nav')) {
        closeMega();
      }
    });

    // Hamburger
    hamburgerBtn.addEventListener('click', () => {
      mobileOpen ? closeMobile() : openMobile();
    });

    // Mobile menu delegation
    mobileMenuEl.addEventListener('click', e => {
      if (e.target.closest('#mobile-close-btn')) {
        closeMobile();
        return;
      }

      const navBtn = e.target.closest('[data-navigate]');
      if (navBtn) {
        navigateTo(navBtn.dataset.navigate);
        return;
      }

      if (e.target.closest('[data-back]')) {
        navigateBack();
      }
    });

    // Escape closes any open menu
    document.addEventListener('keydown', e => {
      if (e.key !== 'Escape') return;
      if (megaMenuOpen) {
        closeMega();
        megaTrigger.focus();
      }
      if (mobileOpen) {
        closeMobile();
      }
    });

    // Focus trap for mobile menu
    mobileMenuEl.addEventListener('keydown', e => {
      if (e.key !== 'Tab') return;
      const focusable = [...mobileMenuEl.querySelectorAll(
        'button:not([disabled]), a[href], input, [tabindex]:not([tabindex="-1"])'
      )].filter(el => !el.closest('[inert]'));

      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  }

  // ============================================================
  // Init
  // ============================================================
  function init() {
    renderNav();
    renderMobile();

    megaTrigger = document.getElementById('mega-menu-trigger');
    megaMenuEl = document.getElementById('mega-menu');
    hamburgerBtn = document.getElementById('hamburger-btn');
    mobileMenuEl = document.getElementById('mobile-menu');

    bindEvents();

    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();
