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
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>The Secret Newsletter — Freelancer Starter Kit</title>
<style>
*{box-sizing:border-box}body{margin:0;background:#0b0d11;color:#f4efe5;font-family:Arial,sans-serif;line-height:1.6}.wrap{max-width:920px;margin:0 auto;padding:48px 24px 72px}.gold{color:#d6b36a;font-weight:900;letter-spacing:1.5px;font-size:12px}.hero,.guide{background:#13161c;border:1px solid #2d3139;border-radius:18px;padding:32px;margin-bottom:24px}.hero{border-top:4px solid #d6b36a}h1{font:700 38px/1.12 Georgia,serif;margin:10px 0 14px}h2{font:700 30px/1.2 Georgia,serif;margin:8px 0 12px}h3{margin:0 0 8px;font-size:18px}.muted{color:#afb4bd}.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin:22px 0}.step,.prompt{background:#1b1f27;border:1px solid #343944;border-radius:12px;padding:18px}.num{display:inline-grid;place-items:center;width:30px;height:30px;border-radius:50%;background:#d6b36a;color:#111;font-weight:900;margin-bottom:10px}label{display:block;font-weight:800;margin-top:22px}input,button,textarea{font:inherit;border-radius:8px}input{width:100%;padding:16px;margin-top:8px;background:#fff;border:0;color:#15171c}button{width:100%;padding:15px;margin-top:12px;background:#d6b36a;color:#15171c;border:0;font-weight:900;cursor:pointer}.msg{min-height:26px;margin-top:12px;color:#d6b36a}.prompt{margin-top:12px}.prompt textarea{display:block;width:100%;min-height:125px;padding:14px;background:#0e1116;color:#f4efe5;border:1px solid #3b414d;resize:vertical}.copy{width:auto;padding:9px 14px;margin-top:9px;font-size:12px}.channels{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin:18px 0}.channel{background:#f4efe5;color:#1b1d22;border-radius:10px;padding:16px}.safe{border-left:4px solid #d6b36a;padding:14px 16px;background:#211d15;color:#e8dbc2;margin-top:20px}.checklist li{margin:7px 0}@media(max-width:680px){.wrap{padding:24px 14px 48px}.hero,.guide{padding:22px 17px}.steps,.channels{grid-template-columns:1fr}h1{font-size:31px}h2{font-size:26px}}
</style>
</head>
<body><main class="wrap">
<section class="hero">
<div class="gold">ONEFANTASTICSHOP PARTNER PROGRAM</div>
<h1>Create your personal Secret Newsletter</h1>
<p class="muted">Paste your unique Partner Program subscription link. The latest approved newsletter will be generated automatically.</p>
<label>Your unique affiliate subscription URL<input id="affiliate" placeholder="https://affiliate-manager-hub-franck22.replit.app/subscribe?ref=FL-XXXXXXXX"></label>
<button id="generate">GENERATE & DOWNLOAD MY NEWSLETTER →</button>
<div class="msg" id="message" role="status"></div>
</section>

<section class="guide">
<div class="gold">FREELANCER STARTER KIT • CHATGPT GUIDE</div>
<h2>Use ChatGPT to find more subscribers</h2>
<p class="muted">ChatGPT can help you identify the right audience, write natural promotional content and improve your follow-ups. You stay in control: review every message and always use your personal referral link.</p>

<div class="steps">
<div class="step"><span class="num">1</span><h3>Choose an audience</h3><p>Pick one clear group: tech fans, bargain hunters, parents, remote workers, small-business owners or gift shoppers.</p></div>
<div class="step"><span class="num">2</span><h3>Create useful content</h3><p>Ask ChatGPT for posts, emails and messages adapted to that audience. Lead with discovery and value, not pressure.</p></div>
<div class="step"><span class="num">3</span><h3>Share and improve</h3><p>Publish on channels where you already have permission to communicate. Track replies and ask ChatGPT to improve the next version.</p></div>
</div>

<h3>Where to find potential subscribers</h3>
<div class="channels">
<div class="channel"><strong>LinkedIn</strong><br>Useful posts for professional contacts, entrepreneurs, remote workers and technology communities.</div>
<div class="channel"><strong>Facebook and online communities</strong><br>Contribute helpful content in relevant groups and follow each community's promotion rules.</div>
<div class="channel"><strong>Your existing contacts</strong><br>Share personally with people who know you and are likely to enjoy technology discoveries.</div>
<div class="channel"><strong>Your website or social profiles</strong><br>Add your referral link to a useful article, bio, video description or newsletter—with a clear commission disclosure.</div>
</div>

<h3>Prompts ready to copy into ChatGPT</h3>
<div class="prompt"><strong>1. Find my best audience</strong><textarea readonly>I promote The Secret Newsletter: twice a week, readers receive 10 surprising and useful technology discoveries at unusually accessible prices. The offer includes a 30-day free trial, then costs $4.99 per month and can be cancelled anytime. Suggest 5 specific audiences I can reach ethically through my existing network, content or professional communities. For each audience, explain its likely interest and the best channel to reach it.</textarea><button class="copy" type="button">COPY PROMPT</button></div>
<div class="prompt"><strong>2. Write a LinkedIn or Facebook post</strong><textarea readonly>Write a natural, credible social-media post promoting The Secret Newsletter to [AUDIENCE]. Focus on the benefit of discovering 10 surprising, useful and affordable technology products without endless searching. Mention the 30-day free trial, then $4.99 per month, cancel anytime. Include a short disclosure that I may earn a commission. End with this referral link: [MY REFERRAL LINK]. Do not exaggerate or sound spammy.</textarea><button class="copy" type="button">COPY PROMPT</button></div>
<div class="prompt"><strong>3. Write a personal message</strong><textarea readonly>Write a short, friendly message to a person I already know who enjoys [TECH / DEALS / USEFUL GADGETS]. Introduce The Secret Newsletter naturally, explain that it sends 10 curated discoveries twice a week, and mention the 30-day free trial followed by $4.99 per month. Clearly say that I may earn a commission if they subscribe. Add my link: [MY REFERRAL LINK]. Make it personal, respectful and easy to decline.</textarea><button class="copy" type="button">COPY PROMPT</button></div>
<div class="prompt"><strong>4. Create a 7-day promotion plan</strong><textarea readonly>Create a realistic 7-day plan to promote The Secret Newsletter using LinkedIn, Facebook, my existing contacts and one short video. Give me one useful action per day, the content angle, a short draft and a simple result to track. Use my referral link [MY REFERRAL LINK]. Avoid spam, unsolicited bulk messages, fake urgency and misleading claims.</textarea><button class="copy" type="button">COPY PROMPT</button></div>
<div class="prompt"><strong>5. Improve my results</strong><textarea readonly>Here are the results of my latest promotion: [PASTE VIEWS, CLICKS, REPLIES AND SUBSCRIPTIONS]. Analyze what probably worked and what did not. Suggest 3 specific improvements and write a better version for my next post or message. Keep all claims accurate and preserve the commission disclosure.</textarea><button class="copy" type="button">COPY PROMPT</button></div>

<div class="safe"><strong>Important:</strong> never buy email lists, collect private contact data, send unsolicited bulk messages or promise guaranteed savings or income. Respect privacy, platform rules and local marketing laws. Always disclose that you may earn a commission.</div>

<h3 style="margin-top:24px">Before you publish</h3>
<ul class="checklist"><li>Replace every bracketed field and add your personal referral link.</li><li>Read and personalize ChatGPT's draft before using it.</li><li>Check that the offer remains accurate: 30 days free, then $4.99/month, cancel anytime.</li><li>Include a clear affiliate commission disclosure.</li><li>Track clicks, replies and subscriptions—then improve one element at a time.</li></ul>
</section>
</main>
<script>
document.getElementById('generate').addEventListener('click',async()=>{const input=document.getElementById('affiliate').value.trim();const message=document.getElementById('message');if(!/^https:\\/\\/affiliate-manager-hub-franck22\\.replit\\.app\\/subscribe\\?ref=[A-Za-z0-9_-]+$/.test(input)){message.textContent='Please paste your complete Partner Program link.';return}message.textContent='Generating…';try{const response=await fetch('/newsletter-template.html',{cache:'no-store'});if(!response.ok)throw new Error('template');let html=await response.text();html=html.replaceAll('{{AFFILIATE_URL}}',input);const blob=new Blob([html],{type:'text/html;charset=utf-8'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='The_Secret_Newsletter_'+input.split('ref=')[1]+'.html';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),1000);message.textContent='Your latest newsletter is ready.'}catch{message.textContent='Could not generate the newsletter. Please try again.'}});
document.querySelectorAll('.copy').forEach(button=>button.addEventListener('click',async()=>{const text=button.previousElementSibling.value;try{await navigator.clipboard.writeText(text);button.textContent='COPIED ✓';setTimeout(()=>button.textContent='COPY PROMPT',1800)}catch{button.previousElementSibling.select();document.execCommand('copy');button.textContent='COPIED ✓'}}));
</script></body></html>`;
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (request.method !== "GET") return new Response("Method not allowed", { status: 405 });
    if (url.pathname === "/" || url.pathname === "/index.html") {
      return serveHtml("kit.html");
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
