const RAW_BASE = 'https://raw.githubusercontent.com/franck428/secret-newsletter-content/main';

async function repositoryAsset(path, contentType) {
  const response = await fetch(`${RAW_BASE}/${path}?v=${Date.now()}`, {
    headers: { 'user-agent': 'TekDiscover-Recent-Discoveries' },
  });
  if (!response.ok) return new Response('Content unavailable', { status: 502 });
  return new Response(response.body, {
    headers: {
      'content-type': contentType,
      'cache-control': 'no-store, no-cache, must-revalidate',
      'x-content-type-options': 'nosniff',
    },
  });
}

function isTekDiscoverHomepage(url) {
  return (url.hostname === 'www.tekdiscover.com' || url.hostname === 'tekdiscover.com') &&
    (url.pathname === '/' || url.pathname === '/en/' || url.pathname === '/en');
}

async function homepage(request) {
  const origin = await fetch(request);
  if (!origin.ok) return origin;
  const contentType = origin.headers.get('content-type') || '';
  if (!contentType.includes('text/html')) return origin;

  return new HTMLRewriter()
    .on('body', {
      element(element) {
        element.append('<script src="/recent-discoveries-loader.js" defer></script>', { html: true });
      },
    })
    .transform(origin);
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (request.method !== 'GET' && request.method !== 'HEAD') return fetch(request);

    if (url.pathname === '/recent-discoveries.html') {
      return repositoryAsset('recent-discoveries.html', 'text/html; charset=utf-8');
    }
    if (url.pathname === '/recent-discoveries-loader.js') {
      return repositoryAsset('recent-discoveries-loader.js', 'application/javascript; charset=utf-8');
    }
    if (isTekDiscoverHomepage(url)) return homepage(request);
    return fetch(request);
  },
};
