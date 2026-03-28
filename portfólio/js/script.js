// Novo walkthrough, brief e certificados

const stepsData = [
  {
    title: 'Problema real',
    text: 'Famílias perdiam dias procurando objetos. Precisávamos reduzir o tempo de devolução para poucas horas e manter privacidade.'
  },
  {
    title: 'Solução',
    text: 'Upload duplo de imagens, comparação via Gemini Vision, matching de similaridade com supabase e notificações automáticas.'
  },
  {
    title: 'Resultado',
    text: 'Tempo médio de retorno caiu para horas. Implementamos observabilidade básica e checklist OWASP para rotas críticas.'
  }
];

let currentStep = 0;

const stepsContainer = document.getElementById('steps');
const stepStatus = document.getElementById('stepStatus');
const prevStep = document.getElementById('prevStep');
const nextStep = document.getElementById('nextStep');

function renderStep(index) {
  const step = stepsData[index];
  stepsContainer.innerHTML = `
    <div class="step">
      <strong>${step.title}</strong>
      <p>${step.text}</p>
    </div>
  `;
  stepStatus.textContent = `${index + 1} / ${stepsData.length}`;
  prevStep.disabled = index === 0;
  nextStep.disabled = index === stepsData.length - 1;
}

prevStep.addEventListener('click', () => {
  if (currentStep > 0) {
    currentStep -= 1;
    renderStep(currentStep);
  }
});

nextStep.addEventListener('click', () => {
  if (currentStep < stepsData.length - 1) {
    currentStep += 1;
    renderStep(currentStep);
  }
});

renderStep(currentStep);

// Certificados modal
const certCards = document.querySelectorAll('.cert-card');
const certModal = document.getElementById('certificateViewer');
const fullCertImg = document.getElementById('full-certificate');
const closeModalBtn = document.querySelector('.close-modal');
const downloadBtn = document.getElementById('downloadCert');

certCards.forEach(card => {
  card.addEventListener('click', () => {
    const src = card.dataset.cert;
    fullCertImg.src = src;
    certModal.classList.add('open');
    certModal.setAttribute('aria-hidden', 'false');
  });
});

function closeCertModal() {
  certModal.classList.remove('open');
  certModal.setAttribute('aria-hidden', 'true');
}

closeModalBtn.addEventListener('click', closeCertModal);
certModal.addEventListener('click', (e) => { if (e.target === certModal) closeCertModal(); });

downloadBtn.addEventListener('click', () => {
  if (!fullCertImg.src) return;
  const link = document.createElement('a');
  link.href = fullCertImg.src;
  link.download = 'certificado.png';
  link.click();
});

// Brief card toggle
const briefCard = document.getElementById('briefCard');
const briefToggle = document.getElementById('briefToggle');
const closeBrief = document.getElementById('closeBrief');
const avatar = document.querySelector('.avatar');
const profileModal = document.getElementById('profileModal');
const closeProfile = document.getElementById('closeProfile');
const profileFull = document.getElementById('profileFull');

briefToggle.addEventListener('click', () => {
  const isOpen = briefCard.classList.toggle('open');
  briefCard.setAttribute('aria-hidden', String(!isOpen));
});
closeBrief.addEventListener('click', () => {
  briefCard.classList.remove('open');
  briefCard.setAttribute('aria-hidden', 'true');
});

function openProfile() {
  if (!profileModal) return;
  profileModal.classList.add('open');
  profileModal.setAttribute('aria-hidden', 'false');
}

function closeProfileModal() {
  if (!profileModal) return;
  profileModal.classList.remove('open');
  profileModal.setAttribute('aria-hidden', 'true');
}

if (avatar) avatar.addEventListener('click', openProfile);
if (closeProfile) closeProfile.addEventListener('click', closeProfileModal);
if (profileModal) {
  profileModal.addEventListener('click', (e) => {
    if (e.target === profileModal) closeProfileModal();
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeCertModal();
    briefCard.classList.remove('open');
    briefCard.setAttribute('aria-hidden', 'true');
    closeProfileModal();
  }
});

// Suave para âncoras
const anchorLinks = document.querySelectorAll('a[href^="#"]');
anchorLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href').substring(1);
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      e.preventDefault();
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Partículas atualizadas
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particlesArray;

function setCanvasSize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', () => {
  setCanvasSize();
  initParticles();
});

class Particle {
  constructor(x, y, size, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speedX = speedX;
    this.speedY = speedY;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }
  draw() {
    ctx.fillStyle = 'rgba(124, 248, 212, 0.8)';
    ctx.shadowBlur = 14;
    ctx.shadowColor = 'rgba(124, 248, 212, 0.8)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
}

function initParticles() {
  particlesArray = [];
  const numberOfParticles = 55;
  for (let i = 0; i < numberOfParticles; i++) {
    const size = Math.random() * 2 + 1;
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const speedX = (Math.random() - 0.5) * 0.7;
    const speedY = (Math.random() - 0.5) * 0.7;
    particlesArray.push(new Particle(x, y, size, speedX, speedY));
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}

setCanvasSize();
initParticles();
animateParticles();
