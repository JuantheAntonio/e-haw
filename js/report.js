/* js/report.js */
/* --- Hamburger --- */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

/* --- Category chips (single select) --- */
const chips = document.querySelectorAll('.chip');
chips.forEach(chip => {
  chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('selected'));
    chip.classList.add('selected');
  });
});

/* --- File upload --- */
const uploadBtn    = document.getElementById('uploadBtn');
const fileInput    = document.getElementById('fileInput');
const uploadPreview = document.getElementById('uploadPreview');
const fileName     = document.getElementById('fileName');
const removeFile   = document.getElementById('removeFile');

uploadBtn.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', () => {
  if (fileInput.files.length) {
    const f = fileInput.files[0];
    if (f.size > 10 * 1024 * 1024) {
      alert('File exceeds 10MB limit. Please choose a smaller image.');
      fileInput.value = '';
      return;
    }
    fileName.textContent = f.name;
    uploadPreview.classList.add('visible');
    uploadBtn.style.display = 'none';
  }
});

removeFile.addEventListener('click', () => {
  fileInput.value = '';
  uploadPreview.classList.remove('visible');
  uploadBtn.style.display = '';
});

/* --- Submit --- */
const submitBtn      = document.getElementById('submitBtn');
const subjectInput   = document.getElementById('subjectInput');
const successOverlay = document.getElementById('successOverlay');

function shake(el) {
  el.style.animation = 'none';
  el.getBoundingClientRect();
  el.style.animation = 'shake .35s ease';
}

const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%,100%{ transform:translateX(0) }
    20%    { transform:translateX(-6px) }
    40%    { transform:translateX(6px) }
    60%    { transform:translateX(-4px) }
    80%    { transform:translateX(4px) }
  }
`;
document.head.appendChild(shakeStyle);

submitBtn.addEventListener('click', () => {
  const selected = document.querySelector('.chip.selected');
  const subject  = subjectInput.value.trim();
  let valid = true;

  if (!selected) {
    document.getElementById('categoryChips').style.outline = '2px solid rgba(220,60,60,.4)';
    document.getElementById('categoryChips').style.borderRadius = '14px';
    shake(document.getElementById('categoryChips'));
    valid = false;
  } else {
    document.getElementById('categoryChips').style.outline = '';
  }

  if (!subject) {
    subjectInput.style.boxShadow = '0 0 0 3px rgba(220,60,60,.30)';
    shake(subjectInput);
    valid = false;
  } else {
    subjectInput.style.boxShadow = '';
  }

  if (valid) {
    successOverlay.classList.add('visible');
  }
});

subjectInput.addEventListener('input', () => { subjectInput.style.boxShadow = ''; });

/* --- Cancel --- */
document.getElementById('cancelBtn').addEventListener('click', () => {
  window.location.href = 'home.html';
});

/* --- Close success overlay on backdrop click --- */
successOverlay.addEventListener('click', (e) => {
  if (e.target === successOverlay) successOverlay.classList.remove('visible');
});