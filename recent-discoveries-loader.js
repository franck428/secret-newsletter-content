(() => {
  const SIGNATURES = [
    'DISCOVER THE PRODUCTS EVERYONE ELSE MISSES',
    '10 HAND-PICKED DISCOVERIES',
    'DISCOVER WHAT OTHERS MISS',
    'WE SEARCH. YOU DISCOVER.',
    '30 DAYS TO DECIDE',
    'RECENT DISCOVERIES',
  ];
  const normalize = value => (value || '').replace(/\s+/g, ' ').trim().toUpperCase();

  function containsSignature(node, signature) {
    return normalize(node && node.textContent).includes(signature);
  }

  function findHeroHeading() {
    const nodes = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6,div,p,span'));
    return nodes.find(el => containsSignature(el, SIGNATURES[0])) || null;
  }

  function findRecentTarget() {
    const nodes = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6,div,p,span'));
    const heading = nodes.find(el => normalize(el.textContent).includes('RECENT DISCOVERIES') && normalize(el.textContent).includes('LATEST ISSUE'));
    if (!heading) return null;
    let node = heading;
    for (let depth = 0; depth < 9 && node && node !== document.body; depth += 1, node = node.parentElement) {
      const productLinks = Array.from(node.querySelectorAll('a')).filter(a => normalize(a.textContent).includes('VIEW PRODUCT'));
      if (productLinks.length >= 5) return node;
    }
    return null;
  }

  function lowestCommonAncestor(a, b) {
    if (!a || !b) return null;
    const ancestors = new Set();
    for (let n = a; n; n = n.parentElement) ancestors.add(n);
    for (let n = b; n; n = n.parentElement) if (ancestors.has(n)) return n;
    return null;
  }

  function findTarget() {
    const hero = findHeroHeading();
    const recent = findRecentTarget();
    if (!hero || !recent) return null;

    let target = lowestCommonAncestor(hero, recent);
    if (!target) return null;

    // Move upward only when needed to include all conversion-block signatures.
    for (let depth = 0; depth < 5 && target && target.parentElement; depth += 1) {
      const text = normalize(target.textContent);
      const hasAll = SIGNATURES.every(sig => text.includes(sig));
      const cta = text.includes('START MY 30-DAY FREE TRIAL');
      const productLinks = Array.from(target.querySelectorAll('a')).filter(a => normalize(a.textContent).includes('VIEW PRODUCT'));
      if (hasAll && cta && productLinks.length >= 5) break;
      target = target.parentElement;
    }

    if (!target || target.tagName === 'BODY' || target.tagName === 'HTML') return null;
    const text = normalize(target.textContent);
    if (!SIGNATURES.every(sig => text.includes(sig))) return null;
    if (!text.includes('START MY 30-DAY FREE TRIAL')) return null;
    const productLinks = Array.from(target.querySelectorAll('a')).filter(a => normalize(a.textContent).includes('VIEW PRODUCT'));
    if (productLinks.length < 5) return null;
    return target;
  }

  async function syncSecretNewsletterBlock() {
    try {
      const response = await fetch('/recent-discoveries.html', { cache: 'no-store' });
      if (!response.ok) return;
      const html = await response.text();
      if (!html.includes('data-tekdiscover-secret-newsletter-live="true"')) return;

      const target = findTarget();
      if (!target) return;

      const template = document.createElement('template');
      template.innerHTML = html.trim();
      const replacement = template.content.firstElementChild;
      if (!replacement || replacement.getAttribute('data-tekdiscover-secret-newsletter-live') !== 'true') return;
      target.replaceWith(replacement);
    } catch (_) {
      // Fail safe: if the homepage structure or remote content changes, keep the origin untouched.
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', syncSecretNewsletterBlock, { once: true });
  } else {
    syncSecretNewsletterBlock();
  }
})();
