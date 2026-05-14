/* js/signup.js */
/* =============================================
   JAVASCRIPT — Form Validation & Interactions
============================================= */
import { supabase } from './supabase/erm.js'

const signupBtn = document.getElementById('signupBtn');
const username  = document.getElementById('username');
const email     = document.getElementById('email');
const password  = document.getElementById('password');
const confirmPw = document.getElementById('confirmPassword');

function shake(el) {
  el.style.animation = 'none';
  el.getBoundingClientRect(); // reflow
  el.style.animation = 'shake .35s ease';
}

/* add shake keyframes once */
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%,100%{ transform:translateX(0) }
    20%    { transform:translateX(-6px) }
    40%    { transform:translateX(6px) }
    60%    { transform:translateX(-4px) }
    80%    { transform:translateX(4px) }
  }
`;
document.head.appendChild(style);

function setError(input, msg) {
  input.style.boxShadow = '0 0 0 3px rgba(220,60,60,.30)';
  input.title = msg;
}
function clearError(input) {
  input.style.boxShadow = '';
  input.title = '';
}

[username, email, password, confirmPw].forEach(inp => {
  inp.addEventListener('input', () => clearError(inp));
});

signupBtn.addEventListener('click', async () => {
  let valid = true;

  if (!username.value.trim()) {
    valid = false;
  }

  if (!email.value.includes('@')) {
    valid = false;
  }

  if (password.value.length < 6) {
    valid = false;
  }

  if (confirmPw.value !== password.value) {
    valid = false;
  }

  if (!valid) return;

  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value
  })

  if (error) {
    console.log(error.message)
    return
  }

  const user = data.user

  const { error: profileError } = await supabase
    .from('users')
    .insert([
      {
        id: user.id,
        username: username.value
      }
    ])

  if (profileError) {
    console.log(profileError.message)
    return
  }

  if (valid) {
    signupBtn.textContent = '✓ Account Created!';
    signupBtn.style.background = '#2e7d5e';
    signupBtn.disabled = true;
  }
});