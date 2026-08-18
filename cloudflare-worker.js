const RAW_BASE = "https://raw.githubusercontent.com/franck428/secret-newsletter-content/main";

async function fetchRepositoryFile(path, dynamic = false) {
  const suffix = dynamic ? `?v=${Date.now()}` : "";
  const response = await fetch(`${RAW_BASE}/${path}${suffix}`, {
    headers: { "user-agent": "OneFantasticShop-Secret-Newsletter" },
  });
  if (!response.ok) return new Response("Content unavailable", { status: 502 });
  return response;
}

async function serveHtml(path) {
  const source = await fetchRepositoryFile(path, true);
  if (!source.ok) return source;
  return new Response(source.body, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store, no-cache, must-revalidate",
      "x-content-type-options": "nosniff",
    },
  });
}

async function serveImage(path) {
  const source = await fetchRepositoryFile(path);
  if (!source.ok) return source;
  return new Response(source.body, {
    headers: {
      "content-type": source.headers.get("content-type") || "image/jpeg",
      "cache-control": "public, max-age=31536000, immutable",
      "x-content-type-options": "nosniff",
    },
  });
}

function generatorPage() {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>The Secret Newsletter — Affiliate Personalizer</title><style>body{margin:0;background:#0b0d11;color:#f4efe5;font-family:Arial,sans-serif}.box{max-width:680px;margin:48px auto;padding:32px}.gold{color:#d6b36a}input,button{box-sizing:border-box;width:100%;padding:16px;margin-top:12px;border-radius:8px}button{background:#d6b36a;border:0;font-weight:900;cursor:pointer}.msg{margin-top:16px}</style></head><body><main class="box"><div class="gold">ONEFANTASTICSHOP PARTNER PROGRAM</div><h1>Create your personal Secret Newsletter</h1><p>Paste your unique Partner Program subscription link. The latest approved newsletter will be generated automatically.</p><label>Your unique affiliate subscription URL<input id="affiliate" placeholder="https://affiliate-manager-hub-franck22.replit.app/subscribe?ref=FL-XXXXXXXX"></label><button id="generate">GENERATE & DOWNLOAD MY NEWSLETTER →</button><div class="msg" id="message" role="status"></div></main><script>document.getElementById('generate').addEventListener('click',async()=>{const input=document.getElementById('affiliate').value.trim();const message=document.getElementById('message');if(!/^https:\\/\\/affiliate-manager-hub-franck22\\.replit\\.app\\/subscribe\\?ref=[A-Za-z0-9_-]+$/.test(input)){message.textContent='Please paste your complete Partner Program link.';return}message.textContent='Generating…';try{const response=await fetch('/newsletter-template.html',{cache:'no-store'});if(!response.ok)throw new Error('template');let html=await response.text();html=html.replaceAll('{{AFFILIATE_URL}}',input);const blob=new Blob([html],{type:'text/html;charset=utf-8'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='The_Secret_Newsletter_'+input.split('ref=')[1]+'.html';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),1000);message.textContent='Your latest newsletter is ready.'}catch{message.textContent='Could not generate the newsletter. Please try again.'}});</script></body></html>`;
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (request.method !== "GET") return new Response("Method not allowed", { status: 405 });
    if (url.pathname === "/" || url.pathname === "/index.html") {
      return new Response(generatorPage(), {
        headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-cache" },
      });
    }
    if (url.pathname === "/preview") return serveHtml("public.html");
    if (url.pathname === "/newsletter-template" || url.pathname === "/newsletter-template.html") {
      return serveHtml("partner.html");
    }
    if (url.pathname === "/health") {
      const source = await fetchRepositoryFile("current.json", true);
      if (!source.ok) return source;
      return new Response(source.body, {
        headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
      });
    }
    const asset = url.pathname.match(/^\/assets\/(issue-[a-z0-9-]+)\/([a-zA-Z0-9._-]+)$/);
    if (asset) return serveImage(`assets/${asset[1]}/${asset[2]}`);
    return new Response("Not found", { status: 404 });
  },
};
