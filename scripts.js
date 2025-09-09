document.addEventListener('DOMContentLoaded', function () {

  // ===== Carousel: flicker-free infinite loop (iOS Safari safe) =====
  const track = document.querySelector('.carousel__track');
  if (track && !track.dataset.looped) {
    track.dataset.looped = '1';

    const DURATION_MS = 20000;   // time to scroll one full set
    const MAX_DT = 20;           // cap per-frame delta (ms)
    let last = performance.now();
    let offset = 0;              // px translated to the left

    // width including horizontal margins
    const outerW = (el) => {
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return r.width + parseFloat(cs.marginLeft) + parseFloat(cs.marginRight);
    };

    // px per ms so that one full set passes in DURATION_MS
    const speed = () => track.scrollWidth / DURATION_MS;

    const tick = (now) => {
      const dtRaw = now - last;
      const dt = Math.min(dtRaw, MAX_DT);
      last = now - (dtRaw - dt);

      offset += dt * speed();

      // Rotate children instead of jumping the whole track
      while (track.firstElementChild && offset >= outerW(track.firstElementChild)) {
        const w = outerW(track.firstElementChild);
        offset -= w;
        track.appendChild(track.firstElementChild);
      }

      track.style.transform = `translate3d(${-offset}px,0,0)`;
      requestAnimationFrame(tick);
    };

    const start = () => { last = performance.now(); requestAnimationFrame(tick); };
    if (document.readyState === 'complete') start();
    else window.addEventListener('load', start);

    // No modulo, no animation restarts, no duplication
  }


  // Smooth scrolling
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
    const chars = [...email];

    // random permutation not equal to identity
    const idx = [...chars.keys()];
    for (let i = idx.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [idx[i], idx[j]] = [idx[j], idx[i]];
    }
    if (idx.length > 1 && idx.every((v, i) => v === i)) [idx[0], idx[1]] = [idx[1], idx[0]];

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

      const nodes = [...container.children];

      // map each node to its first rect
      const first = new Map();
      nodes.forEach(n => first.set(n, n.getBoundingClientRect()));

      // reorder to final order
      nodes
        .sort((a, b) => (+a.dataset.final) - (+b.dataset.final))
        .forEach(n => container.appendChild(n));

      // invert
      nodes.forEach(n => {
        const f = first.get(n);
        const l = n.getBoundingClientRect();
        const dx = f.left - l.left;
        const dy = f.top - l.top;
        n.style.transform = `translate(${dx}px, ${dy}px)`;
      });

      // play
      requestAnimationFrame(() => {
        nodes.forEach(n => {
          n.style.transition = 'transform 500ms cubic-bezier(.2,.7,.3,1)';
          n.style.transform = 'translate(0,0)';
        });
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

  // ===== Night/Day toggle =====
  const toggle = document.getElementById('theme-toggle');
  const saved = localStorage.getItem('prefers-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if ((saved === 'dark') || (saved === null && prefersDark)) {
    document.body.classList.add('dark');
  }

  const setLabel = () => { if (toggle) toggle.textContent = document.body.classList.contains('dark') ? 'Day' : 'Night'; };
  setLabel();

  if (toggle) {
    toggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      localStorage.setItem('prefers-theme', document.body.classList.contains('dark') ? 'dark' : 'light');
      setLabel();
    });
  }
});