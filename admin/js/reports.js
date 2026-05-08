/* ════════════════════════════════════════════════
   E-HAW PANEL — reports.js
════════════════════════════════════════════════ */

'use strict';

/* ── Sample Report Data ──────────────────────── */
const REPORTS = [
  {
    id: '2026-000001',
    date: 'Jun 6, 6767',
    description: 'Garbage Collection',
    reporterName: 'Jerry Edward Christian X. Abadia',
    contact: 'junegooner67@gmail.com',
    profileImg: '',
    fullDate: 'June 7, 2067',
    fullDescription:
`Humingang malaim, pumikit na muna
At baka-sakaling namamalikmata lang
Ba't nahahabala? 'Di ba't ako'y mag-isa?
'Kala ko'y payapa, boses mo'y tumatawag pa
Binaon naman na ang lahat
Tinakpan naman na 'king sugat
Ngunit ba't ba andito pa rin?
Hirap na 'kong itiindihin
Tanging panalangin, lubayan na sana
Dahil sa bawat tingin, mukha mo'y nakikita
Kahil sa'n man mapunta ay anino mo'y kumakapit sa 'king kamay
Ako ay dahan-dahang niililbing nang buhay pa
Hindi na makalaya
Dinadalaw mo 'ko bawat gabi
Wala mang nakikita
Haplos mo'y ramdam pa rin sa dilim
Hindi na nananaginip
Hindi na ma-makagising
Pasindi na ng ilaw
Minumulto na 'ko ng damdamin ko`,
  },
  {
    id: '2026-000001',
    date: 'Jun 6, 6767',
    description: 'Drug Addict',
    reporterName: 'Maria Santos B. Reyes',
    contact: 'mariasantos@gmail.com',
    profileImg: '',
    fullDate: 'June 6, 2067',
    fullDescription:
`Isang nalaman na may gumagamit ng droga sa aming komunidad. Nakita ng mga kapitbahay ang nasabing tao na nagtatago sa likod ng paaralan tuwing gabi. Hinihiling namin na maaksyunan ito agad ng mga awtoridad para sa kaligtasan ng lahat lalo na ang mga bata.`,
  },
  {
    id: '2026-000001',
    date: 'Jun 6, 6767',
    description: 'Sumbagay',
    reporterName: 'Jose Ramon D. Villanueva',
    contact: 'josevillanueva@yahoo.com',
    profileImg: '',
    fullDate: 'June 6, 2067',
    fullDescription:
`May naiulat na away sa aming lugar noong Miyerkules ng gabi. Dalawang lalaki ang nagtatalo at nagpalabasan ng suntukan malapit sa aming barangay hall. Wala nang nasaktan nang malubha ngunit kailangan pa rin ng aksyon para maiwasan ang paulit-ulit na insidente.`,
  },
  {
    id: '2026-000001',
    date: 'Jun 6, 6767',
    description: 'Garbage Collection',
    reporterName: 'Ana Lorena C. Delos Santos',
    contact: 'anadsantos@gmail.com',
    profileImg: '',
    fullDate: 'June 6, 2067',
    fullDescription:
`Ang basura sa aming lugar ay hindi nakukuha ng tatlong araw na. Ang amoy ay nakakaistorbo na sa mga residente. Maraming luma at bulok na pagkain sa mga tumpok ng basura sa tabi ng daan. Paki-aksyunan po ito agad.`,
  },
  {
    id: '2026-000001',
    date: 'Jun 6, 6767',
    description: 'Garbage Collection',
    reporterName: 'Roberto F. Cruz',
    contact: 'robertocruz@outlook.com',
    profileImg: '',
    fullDate: 'June 5, 2067',
    fullDescription:
`Ang mga basura sa Purok 4 ay natagalan na. Hindi pa kinukuha mula noong Lunes. Umaangal na ang mga residente sa mabahong amoy lalo na ngayong tag-init. Pakipadala po ng garbage truck sa aming lugar.`,
  },
  {
    id: '2026-000001',
    date: 'Jun 6, 6767',
    description: 'Garbage Collection',
    reporterName: 'Liza Mariz G. Bautista',
    contact: 'lizabautista@gmail.com',
    profileImg: '',
    fullDate: 'June 5, 2067',
    fullDescription:
`Ang basura collection sa aming sitio ay irregular na. Dalawang linggo na kaming naghihintay ng garbage truck. Puno na ang aming mga basurahan at dumami na ang mga insekto at daga dahil dito. Kailangan ng agarang solusyon.`,
  },
  {
    id: '2026-000001',
    date: 'Jun 6, 6767',
    description: 'Garbage Collection',
    reporterName: 'Edwin Paul H. Mendoza',
    contact: 'edwinmendoza@gmail.com',
    profileImg: '',
    fullDate: 'June 4, 2067',
    fullDescription:
`Ulat tungkol sa natigil na pagkolekta ng basura sa aming lugar. Tatlong araw nang walang garbage truck. Lumalaki na ang tambak ng basura sa aming barangay. Inaasahan namin ang agarang pagkilos ng inyong opisina.`,
  },
  {
    id: '2026-000001',
    date: 'Jun 6, 6767',
    description: 'Garbage Collection',
    reporterName: 'Carmela Joyce I. Tan',
    contact: 'carmelatan@yahoo.com',
    profileImg: '',
    fullDate: 'June 4, 2067',
    fullDescription:
`Mayroon kaming problema sa regular na pag-angkop ng basura. Ang schedule na dapat Lunes at Huwebes ay hindi sinusunod. Mahirap na para sa aming komunidad dahil maliit ang aming espasyo at mabilis kaming mapuno ng basura.`,
  },
  {
    id: '2026-000001',
    date: 'Jun 6, 6767',
    description: 'Garbage Collection',
    reporterName: 'Ferdie Noel J. Garcia',
    contact: 'ferdiegarcia@gmail.com',
    profileImg: '',
    fullDate: 'June 3, 2067',
    fullDescription:
`Isinasagawa ko ang ulat na ito sa ngalan ng aming HOA. Ang basura collection ay hindi pumupunta tuwing araw ng Martes. Nakipag-ugnayan na kami sa iba pang opisina ngunit walang natanggap na tugon. Umaasa kami sa inyong tulong.`,
  },
];

/* ── DOM References ───────────────────────────── */
const tableBody      = document.getElementById('reportTableBody');
const modalOverlay   = document.getElementById('modalOverlay');
const modalClose     = document.getElementById('modalClose');
const accountBtn     = document.getElementById('userMenu');
const accountDropdown= document.getElementById('userDropdown');
const logoutBtn      = document.getElementById('logoutBtn');
const sidebarLogout  = document.getElementById('sidebarLogout');

/* ── Populate Table ───────────────────────────── */
function buildTable() {
  tableBody.innerHTML = '';
  REPORTS.forEach((report, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td data-label="Report Number">${escapeHTML(report.id)}</td>
      <td data-label="Date">${escapeHTML(report.date)}</td>
      <td data-label="Description">${escapeHTML(report.description)}</td>
      <td data-label="Status">
        <button class="view-btn" data-index="${index}" aria-label="View report ${escapeHTML(report.id)}">View</button>
      </td>
    `;
    tableBody.appendChild(tr);
  });
}

/* ── Open Modal ───────────────────────────────── */
function openModal(index) {
  const r = REPORTS[index];

  document.getElementById('modalReportId').textContent  = r.id;
  document.getElementById('modalDate').textContent       = r.fullDate;
  document.getElementById('modalName').textContent       = r.reporterName;
  document.getElementById('modalContact').textContent    = r.contact;
  document.getElementById('modalDescription').textContent = r.fullDescription;

  const img = document.getElementById('modalProfileImg');
  if (r.profileImg) {
    img.src = r.profileImg;
    img.alt = r.reporterName + ' profile photo';
  } else {
    img.src = generateAvatarSVG(r.reporterName);
    img.alt = r.reporterName + ' profile avatar';
  }

  modalOverlay.setAttribute('aria-hidden', 'false');
  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  modalClose.focus();
}

/* ── Close Modal ──────────────────────────────── */
function closeModal() {
  modalOverlay.classList.remove('open');
  modalOverlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

/* ── SVG Fallback Avatar ─────────────────────── */
function generateAvatarSVG(name) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase() || '')
    .join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 110">
    <rect width="100" height="110" fill="#1a3d1a"/>
    <text x="50" y="65" font-size="36" font-family="Outfit,sans-serif"
      font-weight="700" text-anchor="middle" fill="#3aaa3a">${initials}</text>
  </svg>`;
  return 'data:image/svg+xml;base64,' + btoa(svg);
}

/* ── Escape HTML ─────────────────────────────── */
function escapeHTML(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ── Event: View Buttons ─────────────────────── */
tableBody.addEventListener('click', e => {
  const btn = e.target.closest('.view-btn');
  if (!btn) return;
  const idx = parseInt(btn.dataset.index, 10);
  openModal(idx);
});

/* ── Event: Close Modal ──────────────────────── */
modalClose.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', e => {
  if (e.target === modalOverlay) closeModal();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
    closeModal();
  }
});

/* ── Event: Accept / Decline ─────────────────── */
document.getElementById('acceptBtn').addEventListener('click', () => {
  showToast('Report accepted.', 'accept');
  closeModal();
});
document.getElementById('declineBtn').addEventListener('click', () => {
  showToast('Report declined.', 'decline');
  closeModal();
});

/* ── Toast Notification ──────────────────────── */
function showToast(message, type) {
  const existing = document.querySelector('.toast-notification');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 28px;
    right: 28px;
    background: ${type === 'accept' ? 'rgba(30,80,30,0.95)' : 'rgba(100,20,20,0.95)'};
    color: ${type === 'accept' ? '#7aff7a' : '#ff8888'};
    border: 1px solid ${type === 'accept' ? 'rgba(42,122,42,0.6)' : 'rgba(200,60,60,0.5)'};
    border-radius: 8px;
    padding: 12px 22px;
    font-family: 'Outfit', sans-serif;
    font-size: 0.88rem;
    font-weight: 600;
    box-shadow: 0 6px 24px rgba(0,0,0,0.5);
    z-index: 9999;
    animation: toastIn 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards;
  `;

  const style = document.createElement('style');
  style.textContent = `
    @keyframes toastIn {
      from { opacity: 0; transform: translateY(14px) scale(0.95); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }
  `;
  document.head.appendChild(style);
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

/* ── Account Dropdown ────────────────────────── */
function toggleDropdown() {
  const isOpen = accountDropdown.classList.toggle('open');
  accountBtn.setAttribute('aria-expanded', String(isOpen));
}

accountBtn.addEventListener('click', e => {
  e.stopPropagation();
  toggleDropdown();
});

document.addEventListener('click', e => {
  if (!accountBtn.contains(e.target) && !accountDropdown.contains(e.target)) {
    accountDropdown.classList.remove('open');
    accountBtn.setAttribute('aria-expanded', 'false');
  }
});

accountBtn.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    toggleDropdown();
  }
  if (e.key === 'Escape') {
    accountDropdown.classList.remove('open');
    accountBtn.setAttribute('aria-expanded', 'false');
  }
});

/* ── Logout ──────────────────────────────────── */
function handleLogout() {
  if (confirm('Are you sure you want to logout?')) {
    window.location.href = 'index.html';
  }
}

logoutBtn.addEventListener('click', handleLogout);
sidebarLogout.addEventListener('click', handleLogout);

/* ── Sort Button (placeholder) ───────────────── */
document.querySelector('.section__action-btn[title="Export"]')?.addEventListener('click', () => {
  const rows = Array.from(tableBody.querySelectorAll('tr'));
  rows.reverse().forEach(r => tableBody.appendChild(r));
});

/* ── Init ────────────────────────────────────── */
buildTable();