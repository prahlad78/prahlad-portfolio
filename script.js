const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

document.querySelectorAll('#navLinks a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('show');
  });
});

const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    entry.target.classList.toggle('show', entry.isIntersecting);
  });
}, { threshold: 0.15 });

revealElements.forEach(el => revealObserver.observe(el));

document.querySelectorAll('.skill-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const panel = btn.nextElementSibling;
    const isOpen = panel.style.maxHeight;

    document.querySelectorAll('.skill-panel').forEach(p => p.style.maxHeight = null);
    document.querySelectorAll('.skill-btn').forEach(b => b.classList.remove('active'));

    if (!isOpen) {
      panel.style.maxHeight = panel.scrollHeight + 'px';
      btn.classList.add('active');
    }
  });
});
