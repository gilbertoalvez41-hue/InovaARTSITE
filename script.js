
// Menu mobile
const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');
hamburger?.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
});
menu?.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>menu.classList.remove('open')));

// Reveal on scroll
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('show'); observer.unobserve(e.target); }
  });
},{ threshold:.12 });
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

// Marquee reduce motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelector('.marquee .track')?.style.removeProperty('animation');
}

// Form validation + localStorage capture
const form = document.getElementById('leadForm');
const ok = document.getElementById('okMsg');

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

form?.addEventListener('submit', (ev)=>{
  ev.preventDefault();
  let valid = true;

  const nome = form.nome;
  const email = form.email;
  const servico = form.servico;
  const lgpd = document.getElementById('lgpd');

  // Reset errors
  form.querySelectorAll('.error').forEach(e=>e.style.display='none');

  if(!nome.value.trim()){ nome.nextElementSibling.style.display='block'; valid=false; }
  if(!validateEmail(email.value)){ email.nextElementSibling.style.display='block'; valid=false; }
  if(!servico.value){ servico.nextElementSibling.style.display='block'; valid=false; }
  if(!lgpd.checked){ alert('Você precisa autorizar o contato conforme a LGPD.'); valid=false; }

  if(!valid) return;

  const payload = {
    nome: nome.value.trim(),
    email: email.value.trim(),
    telefone: form.telefone.value.trim(),
    empresa: form.empresa.value.trim(),
    servico: servico.value,
    orcamento: form.orcamento.value,
    mensagem: form.mensagem.value.trim(),
    ts: new Date().toISOString()
  };

  // Simular envio e armazenar localmente
  const key = 'inovaaa_leads';
  const arr = JSON.parse(localStorage.getItem(key) || '[]');
  arr.push(payload);
  localStorage.setItem(key, JSON.stringify(arr));

  form.reset();
  ok?.classList.remove('hidden');
  setTimeout(()=>ok?.classList.add('hidden'), 4500);
});

// Privacy modal
const openPrivacy = document.getElementById('open-privacy');
const modal = document.getElementById('privacy-modal');
const closePrivacy = document.getElementById('close-privacy');
openPrivacy?.addEventListener('click', (e)=>{ e.preventDefault(); modal.classList.remove('hidden'); });
closePrivacy?.addEventListener('click', ()=> modal.classList.add('hidden'));
modal?.addEventListener('click', (e)=>{ if(e.target === modal) modal.classList.add('hidden'); });
