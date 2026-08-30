(() => {
  const HEADING = 'RECENT DISCOVERIES IN OUR LATEST ISSUE';
  const normalize = value => (value || '').replace(/\s+/g, ' ').trim().toUpperCase();

  function findTarget() {
    const candidates = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6,div,span,p'));
    const heading = candidates.find(el => normalize(el.textContent) === HEADING);
    if (!heading) return null;

    let node = heading;
    for (let depth = 0; depth < 8 && node && node !== document.body; depth += 1, node = node.parentElement) {
      const productLinks = Array.from(node.querySelectorAll('a')).filter(a => normalize(a.textContent).includes('VIEW PRODUCT'));
      if (productLinks.length >= 5) return node;
    }
    return null;
  }

  async function syncRecentDiscoveries() {
    try {
      const response = await fetch('/recent-discoveries.html', { cache: 'no-store' });
      if (!response.ok) return;
      const html = await response.text();
      if (!html.includes('data-tekdiscover-recent-discoveries="true"')) return;
      const target = findTarget();
      if (!target) return;

      const template = document.createElement('template');
      template.innerHTML = html.trim();
      const replacement = template.content.firstElementChild;
      if (!replacement) return;
      target.replaceWith(replacement);
    } catch (_) {
      // Fail safe: keep the origin block untouched.
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', syncRecentDiscoveries, { once: true });
  } else {
    syncRecentDiscoveries();
  }
})();
