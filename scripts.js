// Smooth scrolling
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.navbar a').forEach(a => {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      window.scrollTo({ top: target.offsetTop - 100, behavior: 'smooth' });
    });
  });

  // ===== Email unscramble (FLIP) =====
  const container = document.getElementById('email-scramble');
  const btn = document.getElementById('unscramble');
  if (container && btn) {
    const email = (container.dataset.email || '').trim();
    const chars = Array.from(email);

    // build a random permutation not equal to identity
    const idx = [...chars.keys()];
    for (let i = idx.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [idx[i], idx[j]] = [idx[j], idx[i]];
    }
    if (idx.every((v, i) => v === i) && idx.length > 1) [idx[0], idx[1]] = [idx[1], idx[0]];

    // render scrambled order
    idx.forEach(finalPos => {
      const s = document.createElement('span');
      s.className = 'ch';
      s.dataset.final = String(finalPos);
      s.textContent = chars[finalPos];
      container.appendChild(s);
    });

    btn.addEventListener('click', () => {
      btn.classList.add('hidden');

      const nodes = Array.from(container.children);
      const first = nodes.map(n => n.getBoundingClientRect());

      // reorder to final email order
      nodes.sort((a, b) => (+a.dataset.final) - (+b.dataset.final))
           .forEach(n => container.appendChild(n));

      const last = nodes.map(n => n.getBoundingClientRect());

      nodes.forEach((n, i) => {
        const dx = first[i].left - last[i].left;
        const dy = first[i].top - last[i].top;
        n.style.transform = `translate(${dx}px, ${dy}px)`;
        n.style.transition = 'transform 600ms cubic-bezier(.2,.7,.3,1)';
        requestAnimationFrame(() => { n.style.transform = 'translate(0,0)'; });
      });

      nodes[nodes.length - 1].addEventListener('transitionend', () => {
        container.innerHTML = '';
        const link = document.createElement('a');
        link.href = `mailto:${email}`;
        link.textContent = email;
        container.appendChild(link);
      }, { once: true });
    }, { once: true });
  }

  // Night mode: respect system, persist, label
  const toggle = document.getElementById('theme-toggle');
  const saved = localStorage.getItem('prefers-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if ((saved === 'dark') || (saved === null && prefersDark)) {
    document.body.classList.add('dark');
  }

  function setToggleLabel() {
    if (!toggle) return;
    toggle.textContent = document.body.classList.contains('dark') ? 'Day' : 'Night';
  }
  setToggleLabel();

  if (toggle) {
    toggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      localStorage.setItem('prefers-theme',
        document.body.classList.contains('dark') ? 'dark' : 'light'
      );
      setToggleLabel();
    });
  }

});
