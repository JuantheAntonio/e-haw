/**
 * E-HAW PANEL — script.js
 * Handles: dropdown menu, sidebar active state,
 *          table population, hover animations
 */

/* ============================================================
   1. DATA — Sample report rows
   ============================================================ */
const reportData = [
  { number: '2026-000001', date: 'Jun 6, 6767', status: 'Resolved',   description: 'Garbage Collection' },
  { number: '2026-000002', date: 'Jun 6, 6767', status: 'Unresolved', description: 'Drug Addict'        },
  { number: '2026-000003', date: 'Jun 6, 6767', status: 'Pending',    description: 'Sumbagay'           },
  { number: '2026-000004', date: 'Jun 6, 6767', status: 'Resolved',   description: 'Garbage Collection' },
  { number: '2026-000005', date: 'Jun 6, 6767', status: 'Resolved',   description: 'Garbage Collection' },
  { number: '2026-000006', date: 'Jun 6, 6767', status: 'Resolved',   description: 'Garbage Collection' },
];

/* ============================================================
   2. POPULATE SUMMARY TABLE
   ============================================================ */

/**
 * Maps a status string to its CSS modifier class.
 * @param {string} status
 * @returns {string} BEM modifier class
 */
function getStatusClass(status) {
  const map = {
    'Resolved':   'status-badge--resolved',
    'Unresolved': 'status-badge--unresolved',
    'Pending':    'status-badge--pending',
  };
  return map[status] || '';
}

/**
 * Renders report rows into the summary table body.
 */
function populateTable() {
  const tbody = document.getElementById('summaryTableBody');
  if (!tbody) return;

  // Build all rows as a document fragment for performance
  const fragment = document.createDocumentFragment();

  reportData.forEach((row) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${escapeHtml(row.number)}</td>
      <td>${escapeHtml(row.date)}</td>
      <td>
        <span class="status-badge ${getStatusClass(row.status)}" aria-label="Status: ${row.status}">
          ${escapeHtml(row.status)}
        </span>
      </td>
      <td>${escapeHtml(row.description)}</td>
    `;
    fragment.appendChild(tr);
  });

  tbody.appendChild(fragment);
}

/**
 * Minimal HTML escape to prevent XSS from data values.
 * @param {string} str
 * @returns {string}
 */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* ============================================================
   3. USER DROPDOWN
   ============================================================ */

const userMenu     = document.getElementById('userMenu');
const userDropdown = document.getElementById('userDropdown');

/**
 * Toggles the dropdown open/closed state and syncs aria-expanded.
 * @param {boolean|null} [force] — pass true/false to force open/close
 */
function toggleDropdown(force) {
  const isOpen = userDropdown.classList.contains('open');
  const shouldOpen = (force !== undefined) ? force : !isOpen;

  userDropdown.classList.toggle('open', shouldOpen);
  userMenu.setAttribute('aria-expanded', String(shouldOpen));

  // Keyboard: when dropdown opens, focus first item
  if (shouldOpen) {
    const firstItem = userDropdown.querySelector('[role="menuitem"]');
    if (firstItem) {
      setTimeout(() => firstItem.focus(), 30); // tiny delay for transition
    }
  }
}

/** Opens dropdown on click */
userMenu.addEventListener('click', (e) => {
  e.stopPropagation();
  toggleDropdown();
});

/** Keyboard accessibility: Enter / Space to open */
userMenu.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    toggleDropdown();
  }
  if (e.key === 'Escape') {
    toggleDropdown(false);
    userMenu.focus();
  }
});

/** Close dropdown when clicking outside */
document.addEventListener('click', (e) => {
  if (!userMenu.contains(e.target)) {
    toggleDropdown(false);
  }
});

/** Keyboard trap within dropdown (Escape closes it) */
userDropdown.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    toggleDropdown(false);
    userMenu.focus();
  }
});

/* ============================================================
   4. SIDEBAR — ACTIVE STATE
   ============================================================ */

/**
 * Makes the clicked sidebar nav item active
 * (removes active from all others first).
 */
function initSidebarNav() {
  const navItems = document.querySelectorAll('.sidebar__nav-item');

  navItems.forEach((item) => {
    item.addEventListener('click', function (e) {
      // Don't steal "active" for the logout button
      if (this.classList.contains('sidebar__logout')) return;

      navItems.forEach((i) => i.classList.remove('active'));
      this.classList.add('active');
    });
  });
}

/* ============================================================
   5. DOWNLOAD BUTTONS — Placeholder feedback
   ============================================================ */

function initDownloadButtons() {
  const buttons = document.querySelectorAll('.section__download');

  buttons.forEach((btn) => {
    btn.addEventListener('click', function () {
      // Visual pulse feedback
      this.style.transform = 'scale(0.88)';
      this.style.color = 'var(--green-bright)';

      setTimeout(() => {
        this.style.transform = '';
        this.style.color = '';
      }, 250);

      // In a real app, trigger CSV/PDF export here
      console.log('Download triggered for:', this.closest('.section')?.querySelector('.section__title')?.textContent?.trim());
    });
  });
}

/* ============================================================
   6. STAT BOX HOVER RIPPLE
   ============================================================ */

/**
 * Subtle animated count-up on first load for stat values.
 */
function animateCountUp() {
  const statValues = document.querySelectorAll('.stat-box__value');

  statValues.forEach((el) => {
    const target = parseInt(el.textContent, 10);
    if (isNaN(target)) return;

    let current = 0;
    const duration = 800; // ms
    const startTime = performance.now();

    function step(timestamp) {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      current = Math.round(eased * target);
      el.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target; // ensure exact final value
      }
    }

    requestAnimationFrame(step);
  });
}

/* ============================================================
   7. INIT — Run everything on DOMContentLoaded
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  populateTable();
  initSidebarNav();
  initDownloadButtons();

  // Slight delay so the page entrance animation plays first
  setTimeout(animateCountUp, 350);
});
