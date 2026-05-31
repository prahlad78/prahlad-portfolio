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
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
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

const geoModal = document.getElementById('geoModal');
const geoAllowBtn = document.getElementById('geoAllowBtn');
const geoStatus = document.getElementById('geoStatus');

function requestLocationAccess() {
  if (!navigator.geolocation) {
    geoStatus.textContent = 'Your browser does not support geolocation.';
    return;
  }

  geoStatus.textContent = 'Requesting location access...';

  navigator.geolocation.getCurrentPosition(
    position => {
      const { latitude, longitude } = position.coords;
      geoStatus.textContent = `Location received: ${latitude.toFixed(3)}, ${longitude.toFixed(3)}.`;
      setTimeout(() => geoModal.classList.add('hidden'), 1000);
    },
    error => {
      if (error.code === error.PERMISSION_DENIED) {
        geoStatus.textContent = 'Permission denied. Please allow location from your browser to continue.';
      } else if (error.code === error.POSITION_UNAVAILABLE) {
        geoStatus.textContent = 'Location unavailable. Please try again.';
      } else if (error.code === error.TIMEOUT) {
        geoStatus.textContent = 'Location request timed out. Please try again.';
      } else {
        geoStatus.textContent = 'Unable to get location right now.';
      }
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    }
  );
}

geoAllowBtn.addEventListener('click', requestLocationAccess);
