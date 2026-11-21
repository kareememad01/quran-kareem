/* Athar Tayeb v24: Hadith library (Sahih al-Bukhari and Sahih Muslim by book) and PDF download sources.
   Adds behaviour only. The Quran bundle, existing sections and personal data in localStorage are not touched.
   Hadith texts are loaded on demand from ./hadith/*.json and are never stored in the browser. */
(()=>{
'use strict';
const ROUTE='#/hadith-books';
const BASE=new URL('./hadith/',document.currentScript?document.currentScript.src:location.href);
const isEn=()=>document.documentElement.lang==='en';
const L=(a,e)=>isEn()?e:a;
const el=(tag,cls,txt)=>{const x=document.createElement(tag);if(cls)x.className=cls;if(txt!=null)x.textContent=txt;return x};
const link=(txt,href)=>{const a=el('a',null,txt);a.href=href;a.target='_blank';a.rel='noopener noreferrer';return a};
const AR='٠١٢٣٤٥٦٧٨٩';
const num=n=>String(n).replace(/\d/g,d=>AR[d]);
const norm=s=>String(s).replace(/[\u064B-\u065F\u0670\u06D6-\u06ED\u0640]/g,'').replace(/[أإآٱ]/g,'ا').replace(/ى/g,'ي').replace(/ة/g,'ه').replace(/\s+/g,' ').trim();
const COLL={
 b:{key:'b',ar:'صحيح البخاري',en:'Sahih al-Bukhari',site:'https://sunnah.com/bukhari',item:l=>'https://sunnah.com/bukhari:'+parseInt(l,10),book:n=>'https://sunnah.com/bukhari/'+n},
 m:{key:'m',ar:'صحيح مسلم',en:'Sahih Muslim',site:'https://sunnah.com/muslim',item:l=>l[0]==='i'?'https://sunnah.com/muslim/introduction':'https://sunnah.com/muslim:'+l,book:n=>n===0?'https://sunnah.com/muslim/introduction':'https://sunnah.com/muslim/'+n}
};
const PDFS=[
 {ar:'صحيح البخاري (نص عربي)',en:'Sahih al-Bukhari (Arabic)',size:'37.2 MB',pub:'وزارة الشؤون الإسلامية والدعوة والإرشاد بالسعودية، دار السلام للنشر والتوزيع',pubEn:'Saudi Ministry of Islamic Affairs, Dar-us-Salam',page:'https://islamhouse.com/ar/books/72992',file:'https://d1.islamhouse.com/data/ar/ih_books/single_01/ar_Sahih_AlBukhari.pdf'},
 {ar:'صحيح مسلم (نص عربي)',en:'Sahih Muslim (Arabic)',size:'46.4 MB',pub:'دار السلام للنشر والتوزيع',pubEn:'Dar-us-Salam',page:'https://islamhouse.com/ar/books/140676/',file:'https://d1.islamhouse.com/data/ar/ih_books/single_01/ar_Sahih_Muslim.pdf'}
];
let INDEX=null,cur={c:'b',book:null,page:0,q:'',data:null};
const PER=20;
async function getJSON(name){const r=await fetch(new URL(name,BASE),{cache:'no-cache'});if(!r.ok)throw new Error('http');return r.json()}

function build(){
 const sec=el('section','platform-contact at-hadith');sec.id='px-hadith';sec.dataset.sectionHidden='true';
 sec.append(el('h2','platform-section-heading',L('مكتبة الأحاديث','Hadith library')));
 sec.append(el('p','site-caption',L('أبواب صحيح البخاري وصحيح مسلم مرتبة بالكتب (الأقسام) والأبواب، ولكل حديث رقمه وتخريجه ورابط مصدره على sunnah.com. هذه نصوص للقراءة والبحث وليست فتوى؛ افتح المصدر للاطلاع على السياق والشرح.','The books (sections) of Sahih al-Bukhari and Sahih Muslim. Each hadith shows its collection, number and a link to its source on sunnah.com. For reading and search, not a fatwa service; open the source for context.')));
 /* PDF downloads */
 sec.append(el('h3','platform-section-heading',L('تحميل الكتب (PDF)','Download the books (PDF)')));
 for(const p of PDFS){const c=el('article','at-ruq-card');c.append(el('h3',null,L(p.ar,p.en)));
  const info=el('p','site-caption',L('الحجم: ','Size: ')+p.size+' · '+L('الناشر والمصدر: ','Publisher and source: ')+L(p.pub,p.pubEn)+' · ');info.append(link('IslamHouse',p.page));c.append(info);
  const row=el('div','at-audio-row');const a=link(L('تحميل PDF','Download PDF'),p.file);a.className='file-button';row.append(a);
  const b=link(L('صفحة الكتاب في المصدر','Book page at the source'),p.page);b.className='file-button';row.append(b);c.append(row);sec.append(c)}
 sec.append(el('p','site-caption',L('الملفات كبيرة، فيُفضّل التحميل عبر Wi‑Fi. تُحمَّل من موقع IslamHouse مباشرة ولا تُخزَّن في هذا الموقع، وهو يتيح نشر موادّه دون تغيير المحتوى مع ذكر المصدر.','These files are large, so use Wi-Fi. They download straight from IslamHouse and are not stored on this site. IslamHouse allows sharing its materials unchanged with credit to the source.')));
 /* browser */
 const host=el('div','at-hadith-host');host.id='at-hadith-host';sec.append(host);
 const foot=el('p','site-caption');
 foot.append(document.createTextNode(L('مصدر النصوص: قاعدة بيانات مفتوحة ','Text source: open database ')),link('fawazahmed0/hadith-api','https://github.com/fawazahmed0/hadith-api'),document.createTextNode(L(' (ترخيص Unlicense). عناوين الكتب والأرقام للمقارنة مع ',' (Unlicense). Book titles and numbers to compare with ')),link('sunnah.com','https://sunnah.com/'),document.createTextNode(L('. الأحاديث المكررة أو المركّبة قد تظهر برقم واحد في المصدر. عناوين الأبواب منقولة من صفحات الكتب على sunnah.com كما تُعرض؛ وحين يتتابع أكثر من عنوان قبل حديث واحد تظهر كلها. بعض الأحاديث بلا عنوان باب منقول (الأرقام التي لا يعرضها sunnah.com مستقلة في صفحة الكتاب، ومقدمة مسلم). تحتاج القراءة هنا إلى الإنترنت.','. Combined or repeated narrations may share one number at the source. Chapter (bab) headings are copied from the sunnah.com book pages as displayed; when several headings precede one narration all are shown. Some narrations have no chapter heading attached (numbers that sunnah.com does not list separately on the book page, and the Muslim introduction). Reading here needs internet.')));
 sec.append(foot);
 return sec}

function renderHome(){const host=document.getElementById('at-hadith-host');if(!host)return;host.textContent='';
 const tabs=el('div','at-audio-row');
 for(const k of ['b','m']){const b=el('button','file-button',L(COLL[k].ar,COLL[k].en));b.type='button';if(cur.c===k)b.setAttribute('aria-pressed','true');b.onclick=()=>{cur={c:k,book:null,page:0,q:'',data:null};renderHome()};tabs.append(b)}
 host.append(el('h3','platform-section-heading',L('الكتب (الأقسام)','Books (sections)')),tabs);
 if(!INDEX){host.append(el('p','site-caption',L('جارٍ التحميل…','Loading…')));getJSON('index.json').then(j=>{INDEX=j;renderHome()}).catch(()=>{host.textContent='';host.append(el('p','site-caption',L('تعذر تحميل الفهرس. تأكد من الاتصال بالإنترنت.','Could not load the index. Check your internet connection.')))});return}
 const col=INDEX[cur.c],C=COLL[cur.c];
 const head=el('p','site-caption',L(C.ar,C.en)+' · '+num(col.books.length)+L(' كتابًا · ',' books · ')+num(col.total)+L(' حديثًا معروضًا · ',' narrations shown · '));head.append(link(L('الفهرس على sunnah.com','Index on sunnah.com'),C.site));host.append(head);
 const grid=el('div','at-hadith-grid');
 for(const b of col.books){const x=el('button','at-hadith-book');x.type='button';x.append(el('strong',null,L(b.ar,b.en)),el('small',null,(isEn()?b.c+' hadith':num(b.c)+' حديث')));x.onclick=()=>{cur.book=b;cur.page=0;cur.q='';cur.data=null;renderBook()};grid.append(x)}
 host.append(grid)}

async function renderBook(){const host=document.getElementById('at-hadith-host');host.textContent='';const C=COLL[cur.c],b=cur.book;
 const back=el('button','file-button',L('← كل الكتب','← All books'));back.type='button';back.onclick=()=>{renderHome();scrollTop()};host.append(back);
 host.append(el('h3','platform-section-heading',L(C.ar,C.en)+' · '+L(b.ar,b.en)));
 const sub=el('p','site-caption');sub.append(document.createTextNode(num(b.c)+L(' حديثًا · ',' narrations · ')),link(L('الكتاب على sunnah.com','Book on sunnah.com'),C.book(b.n)));host.append(sub);
 const st=el('p','site-caption',L('جارٍ التحميل…','Loading…'));st.setAttribute('aria-live','polite');host.append(st);
 try{if(!cur.data){if(b.p){cur.data=[];for(let i=1;i<=b.p;i++)cur.data=cur.data.concat(await getJSON(b.f.replace('.json','_'+i+'.json')))}else cur.data=await getJSON(b.f)}}catch(e){st.textContent=L('تعذر تحميل هذا الكتاب. تأكد من الاتصال بالإنترنت.','Could not load this book. Check your internet connection.');return}
 try{cur.babs=b.bb?await getJSON('babs/'+C.key+b.n+'.json'):{}}catch(e){cur.babs={}}
 st.remove();
 const q=el('input','at-reciter');q.type='search';q.placeholder=L('ابحث داخل هذا الكتاب','Search inside this book');q.setAttribute('aria-label',q.placeholder);q.value=cur.q;q.style.width='100%';q.style.margin='8px 0';host.append(q);
 const list=el('div');host.append(list);const pager=el('div','at-audio-row');host.append(pager);
 const draw=()=>{list.textContent='';pager.textContent='';const nq=norm(cur.q);const rows=nq?cur.data.filter(r=>norm(r[1]).includes(nq)):cur.data;
  const pages=Math.max(1,Math.ceil(rows.length/PER));if(cur.page>=pages)cur.page=pages-1;
  list.append(el('p','site-caption',nq?L('نتائج البحث: ','Matches: ')+num(rows.length):L('الصفحة ','Page ')+num(cur.page+1)+' / '+num(pages)));
  for(const [lab,text,bb] of rows.slice(cur.page*PER,cur.page*PER+PER)){
   const a=el('article','at-ruq-card');
   const ref=lab[0]==='i'?L(C.ar+'، المقدمة','Introduction, '+C.en):L(C.ar+'، حديث رقم '+num(lab),C.en+', hadith '+lab);
   a.append(el('p','site-caption',ref+' · '+L(b.ar,b.en)));
   if(bb&&bb.length)a.append(el('p','site-caption',L('الباب: ','Chapter: ')+bb.map(i=>cur.babs[i]||'').filter(Boolean).join(' ‖ ')));
   a.append(el('p','qr-hadith at-ruq-text',text));
   const s=el('p','site-caption',L('المصدر: ','Source: '));s.append(link('sunnah.com',C.item(lab)));a.append(s);list.append(a)}
  if(pages>1){const mk=(t,p,dis)=>{const x=el('button','file-button',t);x.type='button';x.disabled=dis;x.onclick=()=>{cur.page=p;draw();scrollTop()};pager.append(x)};
   mk(L('السابق','Previous'),cur.page-1,cur.page===0);mk(L('التالي','Next'),cur.page+1,cur.page>=pages-1)}};
 let t;q.addEventListener('input',()=>{clearTimeout(t);t=setTimeout(()=>{cur.q=q.value;cur.page=0;draw()},200)});
 draw();scrollTop()}
function scrollTop(){const s=document.getElementById('px-hadith');if(s)s.scrollIntoView({block:'start',behavior:'instant'})}

let last='';
function route(){const nav=document.getElementById('platform-navigation');const main=document.querySelector('main.site-card');if(!nav||!main||!document.getElementById('site-contact'))return;
 if(!document.getElementById('px-hadith')){main.append(build());renderHome();
  const a=document.createElement('a');a.href=ROUTE;a.id='nav-hadith';a.innerHTML='<span class="platform-nav-icon" aria-hidden="true">☰</span><span class="platform-nav-label">'+L('مكتبة الأحاديث','Hadith library')+'<small>'+L('البخاري ومسلم بالكتب مع PDF','Bukhari and Muslim by book, with PDFs')+'</small></span>';nav.append(a)}
 const on=location.hash===ROUTE;const sec=document.getElementById('px-hadith');
 if(sec&&sec.dataset.sectionHidden!==String(!on))sec.dataset.sectionHidden=String(!on);
 const hide=sel=>{const e=document.querySelector(sel);if(e&&on&&e.dataset.sectionHidden!=='true')e.dataset.sectionHidden='true'};
 if(on){hide('.qr-site-search');hide('.qr-sources');document.querySelectorAll('.qr-enter').forEach(e=>{if(e.dataset.sectionHidden!=='true')e.dataset.sectionHidden='true'});document.body.dataset.page='hadith'}
 const n=document.getElementById('nav-hadith');if(n)n.setAttribute('aria-current',on?'page':'false');
 if(on&&last!==location.hash){last=location.hash;requestAnimationFrame(()=>sec&&sec.scrollIntoView({block:'start',behavior:'instant'}))}if(!on)last=''}
const css=document.createElement('style');
css.textContent='.at-hadith-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:10px;margin:12px 0}.at-hadith-book{display:flex;flex-direction:column;gap:4px;text-align:right;min-height:64px;padding:10px 12px;border-radius:14px;border:1px solid rgba(127,127,127,.4);background:transparent;color:inherit;font:inherit;cursor:pointer}.at-hadith-book small{opacity:.75}.at-hadith-book:hover,.at-hadith-book:focus-visible{border-color:var(--platform-green,#0a6b55)}.file-button[aria-pressed=true]{outline:2px solid var(--platform-green,#0a6b55)}.at-hadith .qr-hadith{font-family:Amiri,serif;font-size:1.45rem;line-height:2.2;direction:rtl;text-align:right}';
document.head.append(css);
function tick(){try{route()}catch(e){}}
new MutationObserver(tick).observe(document.body,{childList:true,subtree:true});addEventListener('hashchange',tick);tick();
})();
