document.addEventListener('DOMContentLoaded', async function () {
  const externalAttrs = (a, url) => {
    if (/^https?:\/\//.test(url)) {
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
    }
  };

  const renderInline = (text = '') => {
    const fragment = document.createDocumentFragment();
    const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
    let lastIndex = 0;
    let match;

    while ((match = linkPattern.exec(text)) !== null) {
      fragment.append(document.createTextNode(text.slice(lastIndex, match.index)));

      const a = document.createElement('a');
      a.href = match[2];
      a.className = 'underline';
      a.textContent = match[1];
      externalAttrs(a, match[2]);
      fragment.append(a);

      lastIndex = match.index + match[0].length;
    }

    fragment.append(document.createTextNode(text.slice(lastIndex)));
    return fragment;
  };

  const paragraph = (text) => {
    const p = document.createElement('p');
    p.append(renderInline(text));
    return p;
  };

  const normalizeKey = (text = '') => text.toLowerCase().trim().replace(/\s+/g, '_');

  const slugify = (text = '') => text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  const hrefId = (href = '') => href.replace(/^#/, '').trim();

  const sectionIdForTitle = (title, nav = []) => {
    const key = normalizeKey(title);
    const overrides = {
      about_me: 'about',
      research_interests: 'interests',
      publications: 'research',
      writing: 'demonstrations',
      creative_outlet: 'other'
    };

    if (overrides[key]) return overrides[key];

    const navMatch = nav.find(item => normalizeKey(item.label) === key);
    return hrefId(navMatch?.href) || slugify(title);
  };

  const renderMarkdownBlocks = (lines = []) => {
    const nodes = [];
    let paragraphLines = [];
    let list = null;

    const flushParagraph = () => {
      if (!paragraphLines.length) return;
      nodes.push(paragraph(paragraphLines.join(' ').trim()));
      paragraphLines = [];
    };

    const closeList = () => {
      if (!list) return;
      nodes.push(list);
      list = null;
    };

    lines.forEach(line => {
      const trimmed = line.trim();

      if (!trimmed) {
        flushParagraph();
        closeList();
        return;
      }

      if (trimmed.startsWith('|')) return;

      const h4Match = trimmed.match(/^####\s+(.+)$/);
      if (h4Match) {
        flushParagraph();
        closeList();
        const h4 = document.createElement('h4');
        h4.textContent = h4Match[1].trim();
        nodes.push(h4);
        return;
      }

      const listMatch = trimmed.match(/^[-*]\s+(.+)$/);
      if (listMatch) {
        flushParagraph();
        if (!list) list = document.createElement('ul');
        const li = document.createElement('li');
        li.append(renderInline(listMatch[1]));
        list.append(li);
        return;
      }

      closeList();
      paragraphLines.push(trimmed);
    });

    flushParagraph();
    closeList();
    return nodes;
  };

  const sectionContainer = (id, title, nodes) => {
    const container = document.createElement('div');
    container.className = 'container';

    const main = document.createElement('div');
    main.className = 'main-content';

    const section = document.createElement('section');
    section.id = id;

    const h2 = document.createElement('h2');
    h2.textContent = title;
    section.append(h2, ...nodes);
    main.append(section);
    container.append(main);

    return container;
  };

  const linesToParagraphs = (lines = []) => {
    const paragraphs = [];
    let current = [];

    lines.forEach(line => {
      if (!line.trim()) {
        if (current.length) {
          paragraphs.push(current.join(' ').trim());
          current = [];
        }
      } else if (!/^[-*]\s+/.test(line) && !/^[A-Za-z][A-Za-z ]*:\s+/.test(line) && !line.startsWith('|')) {
        current.push(line.trim());
      }
    });

    if (current.length) paragraphs.push(current.join(' ').trim());
    return paragraphs;
  };

  const parseMarkdownLinks = (text = '') => {
    const links = [];
    const pattern = /\[([^\]]+)\]\(([^)]+)\)/g;
    let match;

    while ((match = pattern.exec(text)) !== null) {
      links.push({ label: match[1], url: match[2] });
    }

    return links;
  };

  const parseMarkdownImage = (line = '') => {
    const match = line.match(/!\[([^\]]*)\]\(([^)]+)\)/);
    return match ? { alt: match[1], src: match[2] } : null;
  };

  const parseTable = (lines = []) => {
    const rows = lines
      .filter(line => line.trim().startsWith('|'))
      .map(line => line.trim().replace(/^\||\|$/g, '').split('|').map(cell => cell.trim()))
      .filter(cells => cells.length > 1 && !cells.every(cell => /^-+$/.test(cell)));

    if (rows.length < 2) return [];

    const headers = rows[0].map(header => header.toLowerCase().replace(/\s+/g, '_'));
    return rows.slice(1).map(row => Object.fromEntries(headers.map((header, index) => [header, row[index] || ''])));
  };

  const tableMap = (lines = []) => {
    const map = {};
    parseTable(lines).forEach(row => {
      const key = row.field || row.font_size || row.key || row.label;
      const value = row.value;
      if (key && value !== undefined) map[normalizeKey(key)] = value;
    });
    return map;
  };

  const fieldMap = (lines = []) => {
    const map = {};
    lines.forEach(line => {
      const match = line.match(/^([A-Za-z][A-Za-z ]*):\s*(.*)$/);
      if (match) map[normalizeKey(match[1])] = match[2].trim();
    });
    return map;
  };

  const splitSubsections = (lines = []) => {
    const subsections = [];
    let current = null;
    const before = [];

    lines.forEach(line => {
      const match = line.match(/^###\s+(.+)$/);
      if (match) {
        current = { title: match[1].trim(), lines: [] };
        subsections.push(current);
      } else if (current) {
        current.lines.push(line);
      } else {
        before.push(line);
      }
    });

    return { before, subsections };
  };

  const parseReadmeSite = (readme) => {
    const sections = {};
    const orderedSections = [];
    let current = null;

    readme.split(/\r?\n/).forEach(line => {
      const match = line.match(/^##\s+(.+)$/);
      if (match) {
        current = { title: match[1].trim(), lines: [] };
        sections[current.title.toLowerCase()] = current;
        orderedSections.push(current);
      } else if (current) {
        current.lines.push(line);
      }
    });

    const profile = tableMap(sections.profile?.lines || []);
    const theme = { font_sizes: tableMap(sections.theme?.lines || []) };

    const nav = (sections.nav?.lines || [])
      .map(line => line.match(/^[-*]\s+\[([^\]]+)\]\(([^)]+)\)/))
      .filter(Boolean)
      .map(match => ({ label: match[1], href: match[2] }));

    const configSections = new Set(['profile', 'theme', 'nav', 'socials', 'footer']);
    const contentOrder = orderedSections
      .filter(section => !configSections.has(section.title.toLowerCase()))
      .map(section => ({
        key: normalizeKey(section.title),
        title: section.title,
        id: sectionIdForTitle(section.title, nav),
        lines: section.lines
      }));

    const socials = parseTable(sections.socials?.lines || []).map(row => ({
      label: row.label,
      url: row.url,
      icon: row.icon
    }));

    const about = sections['about me'];
    const experience = sections.experience;
    const interests = sections['research interests'];
    const publications = sections.publications;
    const writing = sections.writing;
    const creative = sections['creative outlet'];
    const resources = sections.resources;
    const footer = sections.footer;

    const experienceParts = splitSubsections(experience?.lines || []);
    const interestParts = splitSubsections(interests?.lines || []);
    const publicationParts = splitSubsections(publications?.lines || []);
    const writingParts = splitSubsections(writing?.lines || []);
    const creativeParts = splitSubsections(creative?.lines || []);

    const footerFields = fieldMap(footer?.lines || []);
    const adapted = parseMarkdownLinks(footerFields.adapted_from || '')[0];

    return {
      profile,
      theme,
      nav,
      socials,
      sections: {
        about: {
          title: about?.title || 'about me',
          paragraphs: linesToParagraphs(about?.lines || [])
        },
        experience: {
          title: experience?.title || 'experience',
          items: experienceParts.subsections.map(item => {
            const fields = fieldMap(item.lines);
            return {
              title: item.title,
              time: fields.time || '',
              place: fields.place || '',
              note: linesToParagraphs(item.lines).join(' '),
              current: fields.current === 'true'
            };
          })
        },
        interests: {
          title: interests?.title || 'research interests',
          intro: linesToParagraphs(interestParts.before),
          items: interestParts.subsections.map(item => ({
            title: item.title,
            paragraphs: linesToParagraphs(item.lines)
          }))
        },
        publications: {
          title: publications?.title || 'publications',
          items: publicationParts.subsections.map(item => {
            const fields = fieldMap(item.lines);
            return {
              title: item.title,
              authors: fields.authors || '',
              venue: fields.venue || '',
              links: parseMarkdownLinks(fields.links || '')
            };
          })
        },
        writing: {
          title: writing?.title || 'writing',
          items: writingParts.subsections.map(item => {
            const fields = fieldMap(item.lines);
            return {
              title: item.title,
              url: fields.link || fields.url || '',
              image: fields.image || '',
              alt: fields.alt || item.title
            };
          })
        },
        creative: {
          title: creative?.title || 'creative outlet',
          paragraphs: linesToParagraphs(creativeParts.before),
          carousel: creativeParts.subsections
            .find(item => item.title.toLowerCase() === 'images')?.lines
            .map(parseMarkdownImage)
            .filter(Boolean) || []
        },
        resources: {
          title: resources?.title || 'resources',
          paragraphs: linesToParagraphs((resources?.lines || []).filter(line => !/^[-*]\s+/.test(line))),
          items: (resources?.lines || [])
            .filter(line => /^[-*]\s+/.test(line))
            .map(line => ({ text: line.replace(/^[-*]\s+/, '').trim() }))
        }
      },
      content_order: contentOrder,
      footer: {
        adapted_from: adapted,
        last_updated: footerFields.last_updated || ''
      }
    };
  };

  const fetchSiteContent = async () => {
    const response = await fetch(`README.md?cache=${Date.now()}`, { cache: 'no-store' });
    if (!response.ok) throw new Error(`Could not load README.md: ${response.status}`);
    return parseReadmeSite(await response.text());
  };

  const renderPublications = (section) => {
    const ul = document.createElement('ul');
    ul.className = 'publication-list';

    (section.items || []).forEach(item => {
      const li = document.createElement('li');

      const title = document.createElement('div');
      title.className = 'pub-title';
      title.textContent = item.title || '';
      li.append(title);

      if (item.authors) {
        const authors = document.createElement('div');
        authors.className = 'pub-authors';
        authors.textContent = item.authors;
        li.append(authors);
      }

      if (item.venue) {
        const venue = document.createElement('div');
        venue.className = 'pub-venue';
        venue.textContent = item.venue;
        li.append(venue);
      }

      if (item.links && item.links.length) {
        const links = document.createElement('div');
        links.className = 'pub-links';

        item.links.forEach(link => {
          const a = document.createElement('a');
          a.href = link.url;
          a.textContent = `${link.label || 'link'} `;
          externalAttrs(a, link.url);

          const icon = document.createElement('i');
          icon.className = 'fas fa-external-link-alt';
          a.append(icon);
          links.append(a);
        });

        li.append(links);
      }

      ul.append(li);
    });

    return ul;
  };

  const renderSiteContent = (site) => {
    if (site.theme?.font_sizes) {
      const sizeVars = {
        body: '--body-size',
        section: '--section-title-size',
        subsection: '--item-title-size',
        subsubsection: '--detail-title-size',
        nav: '--nav-size',
        name: '--name-size'
      };

      Object.entries(sizeVars).forEach(([key, cssVar]) => {
        const value = site.theme.font_sizes[key];
        if (value) document.documentElement.style.setProperty(cssVar, value);
      });
    }

    if (site.profile) {
      const profileName = document.querySelector('.left-sidebar .header-content h1');
      if (profileName && site.profile.name) profileName.textContent = site.profile.name;
      if (site.profile.name) document.title = site.profile.name;

      const profilePicture = document.querySelector('.profile-picture');
      if (profilePicture && site.profile.image) {
        profilePicture.style.setProperty('--profile-image', `url('${site.profile.image}')`);
      }

      const email = document.getElementById('email-scramble');
      if (email && site.profile.email) email.dataset.email = site.profile.email;

      const institution = document.getElementById('footer-institution');
      if (institution && site.profile.institution) {
        institution.textContent = '';
        const icon = document.createElement('i');
        icon.className = 'fas fa-university';
        institution.append(icon, ` ${site.profile.institution}`);
      }
    }

    if (site.nav) {
      const nav = document.querySelector('.navbar');
      if (nav) {
        nav.textContent = '';
        site.nav.forEach((item, index) => {
          const a = document.createElement('a');
          a.href = item.href;
          a.textContent = item.label;
          if (index === 0) a.className = 'is-active';
          nav.append(a);
        });
      }
    }

    if (site.socials) {
      const socials = document.querySelector('.social-media');
      if (socials) {
        socials.textContent = '';
        site.socials.forEach(item => {
          const a = document.createElement('a');
          a.href = item.url;
          a.className = 'social-icon';
          externalAttrs(a, item.url);

          const icon = document.createElement('i');
          icon.className = item.icon || '';
          icon.setAttribute('aria-hidden', 'true');

          const label = document.createElement('span');
          label.textContent = item.label || '';

          a.append(icon, label);
          socials.append(a);
        });
      }
    }

    const sections = site.sections || {};
    const contentRoot = document.getElementById('content-root');
    const footerContainer = contentRoot?.querySelector('[data-footer-container]');

    if (contentRoot) {
      [...contentRoot.querySelectorAll(':scope > .container:not([data-footer-container])')]
        .forEach(container => container.remove());
    }

    const knownRenderers = {
      about_me: () => ({
        title: sections.about?.title,
        nodes: (sections.about?.paragraphs || []).map(paragraph)
      }),
      experience: () => {
        const timeline = document.createElement('div');
        timeline.className = 'experience-timeline';

        (sections.experience?.items || []).forEach(item => {
          const article = document.createElement('article');
          article.className = `experience-item${item.current ? ' is-current' : ''}`;

          const marker = document.createElement('div');
          marker.className = 'experience-marker';
          marker.setAttribute('aria-hidden', 'true');

          const body = document.createElement('div');
          body.className = 'experience-body';

          const head = document.createElement('div');
          head.className = 'experience-head';

          const h3 = document.createElement('h3');
          h3.textContent = item.title || '';

          const time = document.createElement('span');
          time.textContent = item.time || '';

          head.append(h3, time);

          const place = document.createElement('p');
          place.className = 'experience-place';
          place.textContent = item.place || '';

          const note = document.createElement('p');
          note.className = 'experience-note';
          note.textContent = item.note || '';

          body.append(head, place, note);
          article.append(marker, body);
          timeline.append(article);
        });

        return { title: sections.experience?.title, nodes: [timeline] };
      },
      research_interests: () => {
        const grid = document.createElement('div');
        grid.className = 'interests-grid';

        const card = document.createElement('div');
        card.className = 'interest-card';
        (sections.interests?.intro || []).forEach(text => card.append(paragraph(text)));
        (sections.interests?.items || []).forEach(item => {
          const h3 = document.createElement('h3');
          h3.textContent = item.title || '';
          card.append(h3);
          (item.paragraphs || []).forEach(text => card.append(paragraph(text)));
        });

        grid.append(card);
        return { title: sections.interests?.title, nodes: [grid] };
      },
      publications: () => ({
        title: sections.publications?.title,
        nodes: [renderPublications(sections.publications || { items: [] })]
      }),
      writing: () => {
        const grid = document.createElement('div');
        grid.className = 'demos-grid';

        (sections.writing?.items || []).forEach(item => {
          const card = document.createElement('div');
          card.className = 'demo-card';

          const media = document.createElement('div');
          media.className = 'demo-video-container';

          const img = document.createElement('img');
          img.src = item.image || '';
          img.alt = item.alt || item.title || '';
          img.className = 'demo-video';
          media.append(img);

          const info = document.createElement('div');
          info.className = 'demo-info';

          const h3 = document.createElement('h3');
          const a = document.createElement('a');
          a.href = item.url || '#';
          a.textContent = item.title || '';
          a.style.textDecoration = 'none';
          a.style.color = 'inherit';
          externalAttrs(a, item.url || '');
          h3.append(a);
          info.append(h3);

          card.append(media, info);
          grid.append(card);
        });

        return { title: sections.writing?.title, nodes: [grid] };
      },
      creative_outlet: () => {
        const nodes = (sections.creative?.paragraphs || []).map(paragraph);
        const carousel = document.createElement('div');
        carousel.className = 'carousel';

        const track = document.createElement('div');
        track.className = 'carousel__track';
        (sections.creative?.carousel || []).forEach(item => {
          const img = document.createElement('img');
          img.src = item.src || '';
          img.alt = item.alt || '';
          img.className = 'carousel__img';
          track.append(img);
        });
        carousel.append(track);
        if (track.children.length) nodes.push(carousel);

        return { title: sections.creative?.title, nodes };
      },
      resources: () => {
        const nodes = (sections.resources?.paragraphs || []).map(paragraph);
        const ul = document.createElement('ul');
        ul.className = 'publication-list';

        (sections.resources?.items || []).forEach(item => {
          const li = document.createElement('li');
          const title = document.createElement('div');
          title.className = 'pub-title';
          title.append(renderInline(item.text || ''));
          li.append(title);
          ul.append(li);
        });

        if (ul.children.length) nodes.push(ul);
        return { title: sections.resources?.title, nodes };
      }
    };

    const genericRenderer = (entry) => {
      const parts = splitSubsections(entry.lines || []);
      const nodes = renderMarkdownBlocks(parts.before);

      parts.subsections.forEach(item => {
        const h3 = document.createElement('h3');
        h3.textContent = item.title || '';
        nodes.push(h3, ...renderMarkdownBlocks(item.lines));
      });

      return { title: entry.title, nodes };
    };

    (site.content_order || []).forEach(entry => {
      const rendered = (knownRenderers[entry.key] || (() => genericRenderer(entry)))();
      const title = rendered.title || entry.title;
      const container = sectionContainer(entry.id, title, rendered.nodes || []);

      if (footerContainer) contentRoot.insertBefore(container, footerContainer);
      else contentRoot?.append(container);
    });

    if (site.footer) {
      const credit = document.getElementById('footer-credit');
      if (credit && site.footer.adapted_from) {
        credit.textContent = 'Website adapted from ';

        const a = document.createElement('a');
        a.href = site.footer.adapted_from.url;
        a.textContent = site.footer.adapted_from.label;
        externalAttrs(a, a.href);

        credit.append(a, '.');

        if (site.footer.last_updated) {
          credit.append(document.createElement('br'), ` Last updated on ${site.footer.last_updated}.`);
        }
      }
    }
  };

  try {
    const site = await fetchSiteContent();
    renderSiteContent(site);
  } catch (error) {
    console.warn(error);
  }

  // ===== Carousel: flicker-free infinite loop (iOS Safari safe) =====
  const track = document.querySelector('.carousel__track');
  if (track && !track.dataset.looped) {
    track.dataset.looped = '1';

    const DURATION_MS = 50000;   // time to scroll one full set
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


  // Smooth scrolling + active sidebar state
  const navLinks = [...document.querySelectorAll('.navbar a')];
  const navTargets = navLinks
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const setActiveNav = (id) => {
    navLinks.forEach(link => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
    });
  };

  navLinks.forEach(a => {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      setActiveNav(target.id);
      window.scrollTo({ top: target.offsetTop - 100, behavior: 'smooth' });
    });
  });

  if (navTargets.length) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible) setActiveNav(visible.target.id);
    }, {
      rootMargin: '-25% 0px -60% 0px',
      threshold: [0, 0.15, 0.35, 0.6]
    });

    navTargets.forEach(target => observer.observe(target));
  }

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
