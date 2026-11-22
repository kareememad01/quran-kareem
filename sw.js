/* Offline Quran reader. No audio, location responses or third-party pages are cached. */
'use strict';
const CACHE='quran-kareem-offline-v32';
const FILES=['index.html','content-1.js','content-2.js','content-3.js','content-divisions.js','design.css','design.js','extras.js','hadith.js','reader-tools.js','reader-tools.css','reader-data.js','reader-data-1.js','reader-data-2.js','reader-data-3.js','reader-sources.txt'];
const base=new URL('./',self.location.href);
const core=new Set(FILES.map(p=>new URL(p,base).pathname));
self.addEventListener('install',event=>{
 event.waitUntil((async()=>{const cache=await caches.open(CACHE);await Promise.all(FILES.map(async p=>{const url=new URL(p,base);const fresh=new URL(url);fresh.searchParams.set('v','32');const response=await fetch(new Request(fresh,{cache:'reload'}));if(!response.ok)throw new Error('Offline asset unavailable');await cache.put(url,response)}));await self.skipWaiting()})());
});
self.addEventListener('activate',event=>{
 event.waitUntil((async()=>{
  const old=(await caches.keys()).filter(k=>k.startsWith('quran-kareem-offline-')&&k!==CACHE);
  await Promise.all(old.map(k=>caches.delete(k)));
  await self.clients.claim();
  if(old.length){const windows=await self.clients.matchAll({type:'window'});windows.filter(w=>w.url.startsWith(base.href)).forEach(w=>{w.navigate(w.url).catch(()=>null)})}
 })());
});
self.addEventListener('fetch',event=>{
 const req=event.request,url=new URL(req.url);if(req.method!=='GET')return;
 if(url.origin===base.origin&&url.pathname.startsWith(base.pathname)){
  if(req.mode==='navigate'){
   event.respondWith(fetch(req.url,{cache:'no-cache'}).catch(()=>caches.match(new URL('index.html',base).href)));return;
  }
  if(core.has(url.pathname)){
   event.respondWith(caches.open(CACHE).then(async cache=>(await cache.match(url.origin+url.pathname))||fetch(req)));return;
  }
 }
 /* Save only fonts used during online reading, never API responses or audio. */
 const isFont=(url.hostname==='fonts.gstatic.com')||(url.hostname==='raw.githubusercontent.com'&&url.pathname.startsWith('/aliftype/amiri/main/fonts/'));
 if(isFont){event.respondWith(caches.open(CACHE).then(async cache=>{const hit=await cache.match(req);if(hit)return hit;const res=await fetch(req);if(res.ok||res.type==='opaque')await cache.put(req,res.clone());return res}));}
});
