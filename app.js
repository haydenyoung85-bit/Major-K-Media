(() => {
  'use strict';
  /* Keep every fresh load at the top, including Safari's back-forward cache.
     Multiple early resets end before the intro clears, so they never fight the visitor. */
  const forceTop = () => window.scrollTo(0, 0);
  forceTop();
  requestAnimationFrame(forceTop);
  window.addEventListener('pageshow', forceTop);
  window.addEventListener('load', () => {
    forceTop();
    window.setTimeout(forceTop, 80);
    window.setTimeout(forceTop, 350);
  }, {once:true});

  const intro = document.querySelector('.brand-intro');
  let introRemoved = false;
  function removeIntro() {
    if (introRemoved) return;
    introRemoved = true;
    forceTop();
    document.documentElement.classList.remove('intro-active');
    intro?.remove();
  }
  intro?.addEventListener('animationend', event => {
    if (event.target === intro) removeIntro();
  });
  /* Hard fallback: even if an animation event is dropped, the overlay is removed. */
  window.setTimeout(removeIntro, 2600);

  const content = window.MAJOR_K_CONTENT;
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.getElementById('mobile-navigation');
  function setMenu(open, restoreFocus = false) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('.menu-label').textContent = open ? 'Close' : 'Menu';
    menu.hidden = !open;
    if (restoreFocus) toggle.focus();
  }
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  menu.addEventListener('click', event => {if (event.target.closest('a')) setMenu(false);});
  document.addEventListener('keydown', event => {if (event.key === 'Escape' && !menu.hidden) setMenu(false, true);});
  document.addEventListener('click', event => {if (!menu.hidden && !event.target.closest('.site-header')) setMenu(false);});
  const mobileBreakpoint = window.matchMedia('(max-width: 760px)');
  mobileBreakpoint.addEventListener('change', event => {if (!event.matches) setMenu(false);});
  if (!content) return;

  function createPhoto(photo, eager = false) {
    const img = document.createElement('img');
    img.alt = photo.alt;
    img.loading = eager ? 'eager' : 'lazy';
    img.decoding = 'async';
    if (eager) img.fetchPriority = 'high';
    img.style.objectPosition = photo.position || '50% 50%';
    img.addEventListener('error', () => {
      const surface = img.parentElement;
      surface.classList.add('image-unavailable');
      surface.setAttribute('role', 'img');
      surface.setAttribute('aria-label', 'Photograph coming soon');
      img.remove();
    }, {once:true});
    img.src = photo.src;
    return img;
  }
  document.querySelectorAll('[data-photo-slot]').forEach(surface => {
    const key = surface.dataset.photoSlot;
    const photo = content.photos[key];
    if (!photo) return;
    surface.append(createPhoto(photo, key === 'heroCenter'));
    const label = surface.parentElement.querySelector('figcaption span:last-child');
    if (label) label.textContent = photo.isPlaceholder ? 'Preview placeholder' : 'Major K Media';
  });

  const gallery = document.getElementById('showcase-grid');
  content.showcase.forEach(item => {
    const photo = content.photos[item.photo];
    if (!photo) return;
    const figure = document.createElement('figure');
    figure.className = 'showcase-item';
    const surface = document.createElement('div');
    surface.className = 'photo-surface';
    surface.append(createPhoto(photo));
    if (photo.isPlaceholder) {
      const tag = document.createElement('span');
      tag.className = 'image-tag';
      tag.textContent = 'Preview placeholder';
      surface.append(tag);
    }
    const caption = document.createElement('figcaption');
    const title = document.createElement('div');
    title.className = 'showcase-title';
    title.textContent = item.title;
    const subtitle = document.createElement('span');
    subtitle.className = 'showcase-subtitle';
    subtitle.textContent = item.subtitle;
    title.append(subtitle);
    caption.append(title);
    figure.append(surface, caption);
    gallery.append(figure);
  });
  if (!Object.values(content.photos).some(photo => photo.isPlaceholder)) {
    document.querySelector('.sample-disclosure').hidden = true;
  }

  const list = document.getElementById('collection-list');
  content.collections.forEach((item, i) => {
    const details = document.createElement('details');
    details.className = 'collection';
    details.open = i === 0;
    const summary = document.createElement('summary');
    const heading = document.createElement('h3');
    heading.textContent = item.name;
    if (item.isPlaceholder) {
      const badge = document.createElement('span');
      badge.className = 'placeholder-badge';
      badge.textContent = 'Placeholder';
      heading.append(badge);
    }
    const price = document.createElement('span');
    price.className = 'collection-price';
    price.textContent = item.price || 'Price placeholder';
    const plus = document.createElement('span');
    plus.className = 'collection-plus';
    plus.setAttribute('aria-hidden', 'true');
    summary.append(heading, price, plus);
    const body = document.createElement('div');
    body.className = 'collection-body';
    const description = document.createElement('p');
    description.className = 'collection-description';
    description.textContent = item.description;
    const facts = document.createElement('dl');
    facts.className = 'collection-facts';
    [['Package', item.packageName || 'Coming soon'], ['Coverage', item.coverage || 'To be confirmed'], ['Includes', item.included || 'Details coming soon']].forEach(([label, value]) => {
      const row = document.createElement('div');
      const dt = document.createElement('dt');
      const dd = document.createElement('dd');
      dt.textContent = label;
      dd.textContent = value;
      row.append(dt, dd);
      facts.append(row);
    });
    body.append(description, facts);
    details.append(summary, body);
    list.append(details);
  });
})();
