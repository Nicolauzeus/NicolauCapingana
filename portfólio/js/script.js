// ----------------------------
// Controle de Seções
// ----------------------------
function showSection(id) {
  document.body.classList.add('section-active');

  document.querySelectorAll('section').forEach(sec => sec.classList.remove('active'));
  document.getElementById(id).classList.add('active');

  closeMenu();
  document.querySelector('.back-to-top').style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goHome() {
  document.body.classList.remove('section-active');
  document.querySelectorAll('section').forEach(sec => sec.classList.remove('active'));
  document.querySelector('.back-to-top').style.display = 'none';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ----------------------------
// Menu Overlay
// ----------------------------
function openMenu() {
  document.getElementById('menuOverlay').classList.add('active');
}

function closeMenu() {
  document.getElementById('menuOverlay').classList.remove('active');
}

// ----------------------------
// Botão voltar ao topo
// ----------------------------
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('scroll', () => {
  const backToTopButton = document.querySelector('.back-to-top');
  backToTopButton.style.display = window.scrollY > 300 ? 'block' : 'none';
});

// ----------------------------
// Certificados
// ----------------------------
function openCertificate(certId) {
  const viewer = document.getElementById('certificateViewer');
  const fullCert = document.getElementById('full-certificate');

  const certificates = {
    'cert1': 'assets/certificados/img/programaçaoweb.png',
    'cert2': 'assets/certificados/img/rockseat.png',
    'cert3': 'assets/certificados/img/adventofcyber.png',
    'cert4': 'assets/certificados/img/ipasolyd.png'
  };

  fullCert.src = certificates[certId] || '';
  viewer.style.display = 'flex';
}

function closeCertificate() {
  document.getElementById('certificateViewer').style.display = 'none';
}

function downloadCertificate() {
  const currentCert = document.getElementById('full-certificate').src;
  if (currentCert) {
    const link = document.createElement('a');
    link.href = currentCert;
    link.download = 'certificado.jpg';
    link.click();
  }
}

// ----------------------------
// Eventos extras
// ----------------------------
document.getElementById('headerImage').addEventListener('click', openMenu);
document.getElementById('profileImage').addEventListener('click', () => {
  if (!document.body.classList.contains('section-active')) {
    openMenu();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeMenu();
    closeCertificate();
  }
});

document.addEventListener('click', (event) => {
  const menuOverlay = document.getElementById('menuOverlay');
  if (event.target === menuOverlay) closeMenu();

  const certViewer = document.getElementById('certificateViewer');
  if (event.target === certViewer) closeCertificate();
});

// ----------------------------
// Partículas Neon
// ----------------------------
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let particlesArray;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
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
    ctx.fillStyle = "#ff00ff";
    ctx.shadowBlur = 20;
    ctx.shadowColor = "#ff00ff";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
}

function initParticles() {
  particlesArray = [];
  const numberOfParticles = 50;
  for (let i = 0; i < numberOfParticles; i++) {
    const size = Math.random() * 3 + 1;
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const speedX = (Math.random() - 0.5) * 1.5;
    const speedY = (Math.random() - 0.5) * 1.5;
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

initParticles();
animateParticles();
