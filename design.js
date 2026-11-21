/* UI enhancements only. Quran text and existing application logic are not modified. */
(()=>{
'use strict';
const html=document.documentElement;
const stored=(key,fallback)=>{try{return localStorage.getItem(key)||fallback}catch{return fallback}};
const save=(key,value)=>{try{localStorage.setItem(key,value)}catch{}};
html.dataset.theme=stored('quran.ui.theme',matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
html.dataset.motion=stored('quran.ui.motion','on');
let started=false;
function start(){
 const main=document.querySelector('.site-card'), image=main?.querySelector('.qr-hero img');
 if(started||!main||!image)return;
 started=true;
 const shell=document.createElement('div');shell.className='platform-shell';
 shell.innerHTML=`<div class="platform-top"><a class="platform-brand" href="#/" aria-label="القرآن الكريم، الصفحة الرئيسية"><span class="platform-logo" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M16 8C11 4 5 5 3 6v20c5-2 9-1 13 2 4-3 8-4 13-2V6c-2-1-8-2-13 2Zm0 0v20M7 10c2 0 4 .5 6 1.5M7 15c2 0 4 .5 6 1.5M25 10c-2 0-4 .5-6 1.5M25 15c-2 0-4 .5-6 1.5"/></svg></span><span><strong>القرآن الكريم</strong><small>by Kareem Emad</small></span></a><p class="platform-focus-note">مساحة هادئة للقراءة</p><div class="platform-tools"><button type="button" class="platform-button platform-theme" aria-label="تبديل المظهر"></button><button type="button" class="platform-button platform-focus" aria-pressed="false">وضع التركيز</button><button type="button" class="platform-button platform-motion" aria-pressed="false">إيقاف الحركة</button></div></div><section class="platform-hero" aria-labelledby="platform-title"><div class="platform-hero-copy platform-reveal"><span class="platform-kicker">رفيقك في القراءة والذكر</span><h1 id="platform-title">مع القرآن،<span> كل يوم أقرب.</span></h1><p>مساحة تجمع المصحف الكامل والتلاوة، ومختارات من الأحاديث والأدعية، مع مواقيت الصلاة . اقرأ على مهل، وعد إلى موضعك متى شئت.</p><div class="platform-hero-actions"><a class="platform-button platform-primary platform-read" href="#/">ابدأ القراءة <span aria-hidden="true">↙</span></a><a class="platform-button platform-pray" href="#/prayer">الصلاة <span aria-hidden="true">↙</span></a></div></div><figure class="platform-art platform-reveal"><div class="platform-art-badge"><strong>١١٤</strong> سورة بين يديك</div><figcaption>رسم توضيحي، وليس صورة لمصحف بعينه</figcaption></figure></section><section class="platform-dashboard" aria-label="مساحتك للقراءة"><a class="platform-stat platform-reveal platform-read" href="#/"><span class="platform-stat-number">١١٤</span><span><strong>سورة في المصحف</strong><small>الرسم العثماني · رواية حفص</small></span></a><a class="platform-stat platform-reveal platform-audio" href="#/"><span class="platform-stat-mark" aria-hidden="true">▷</span><span><strong>اقرأ واستمع</strong><small>تلاوة مشاري العفاسي لكل آية</small></span></a><a class="platform-stat platform-reveal platform-resume" href="#/"><span class="platform-stat-mark" aria-hidden="true">◇</span><span><strong class="platform-mark-title">حفظ موضع القراءة</strong><small class="platform-mark-detail">احفظ علامة بجوار آية لتعود إليها هنا</small></span></a></section>`;
 const art=image.cloneNode();art.removeAttribute('id');shell.querySelector('.platform-art').prepend(art);
 document.getElementById('root').before(shell);
 const nav=main.querySelector('.qr-nav');nav.id='platform-navigation';
 const meta=[['▤','المصحف الكامل والتلاوة'],['◷','المواقيت '],['◇','مختارات موثقة'],['▥','روابط كتب من مصادرها']];
 [...nav.children].forEach((a,i)=>{const label=a.textContent;a.replaceChildren();const icon=document.createElement('span');icon.className='platform-nav-icon';icon.setAttribute('aria-hidden','true');icon.textContent=meta[i][0];const text=document.createElement('span');text.className='platform-nav-label';text.textContent=label;const small=document.createElement('small');small.textContent=meta[i][1];text.append(small);a.append(icon,text);a.addEventListener('click',()=>requestAnimationFrame(scrollContent))});
 function scrollContent(){const target=main.querySelector('.qr-enter');target?.scrollIntoView({behavior:motionBehavior(),block:'start'})}
 function motionBehavior(){return matchMedia('(prefers-reduced-motion: reduce)').matches||html.dataset.motion==='off'?'instant':'smooth'}
 const theme=shell.querySelector('.platform-theme'),focus=shell.querySelector('.platform-focus'),motion=shell.querySelector('.platform-motion');
 function sync(){theme.textContent=html.dataset.theme==='dark'?'☀ نهاري':'☾ ليلي';theme.setAttribute('aria-pressed',String(html.dataset.theme==='dark'));focus.textContent=html.dataset.focus==='true'?'إنهاء التركيز':'وضع التركيز';focus.setAttribute('aria-pressed',String(html.dataset.focus==='true'));motion.textContent=html.dataset.motion==='off'?'تشغيل الحركة':'إيقاف الحركة';motion.setAttribute('aria-pressed',String(html.dataset.motion==='off'))}
 theme.addEventListener('click',()=>{html.dataset.theme=html.dataset.theme==='dark'?'light':'dark';save('quran.ui.theme',html.dataset.theme);sync()});
 focus.addEventListener('click',()=>{html.dataset.focus=html.dataset.focus==='true'?'false':'true';sync();if(html.dataset.focus==='true')window.scrollTo({top:0,behavior:motionBehavior()})});
 motion.addEventListener('click',()=>{html.dataset.motion=html.dataset.motion==='off'?'on':'off';save('quran.ui.motion',html.dataset.motion);sync()});sync();
 const back=document.createElement('button');back.className='platform-button platform-back';back.type='button';back.textContent='↑';back.setAttribute('aria-label','العودة إلى أعلى الصفحة');document.body.append(back);back.addEventListener('click',()=>window.scrollTo({top:0,behavior:motionBehavior()}));addEventListener('scroll',()=>back.classList.toggle('visible',scrollY>650),{passive:true});
 const numeral=n=>Number(n).toLocaleString('ar-EG',{useGrouping:false});
 function mark(){let m;try{m=JSON.parse(localStorage.getItem('quran.mark.v1'))}catch{}const title=shell.querySelector('.platform-mark-title'),detail=shell.querySelector('.platform-mark-detail');if(m?.s&&m?.v){title.textContent='متابعة من آخر علامة';detail.textContent=`السورة ${numeral(m.s)} · الآية ${numeral(m.v)} · على هذا المتصفح`}else{title.textContent='حفظ موضع القراءة';detail.textContent='احفظ علامة بجوار آية لتعود إليها هنا'}}
 mark();addEventListener('storage',mark);main.addEventListener('click',()=>setTimeout(mark,100));
 shell.querySelectorAll('.platform-read,.platform-pray,.platform-audio,.platform-resume').forEach(a=>a.addEventListener('click',()=>setTimeout(()=>{html.dataset.focus='false';sync();if(a.classList.contains('platform-resume')){const resume=[...main.querySelectorAll('button')].find(b=>b.textContent.trim().startsWith('متابعة:'));resume?.click()}if(a.classList.contains('platform-audio')){main.querySelector('.qr-audio')?.scrollIntoView({behavior:motionBehavior(),block:'center'})}else scrollContent()},120)));
 document.addEventListener('keydown',e=>{if(e.key==='/'&&!/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)){e.preventDefault();html.dataset.focus='false';sync();main.querySelector('.qr-site-search input')?.focus()}if(e.key==='Escape'&&html.dataset.focus==='true'){html.dataset.focus='false';sync()}});
}
const observer=new MutationObserver(()=>{start();if(started)observer.disconnect()});observer.observe(document.getElementById('root'),{childList:true,subtree:true});start();
})();

/* Page-like continuous reading with an accessible selected-verse action bar. */
(()=>{'use strict';const root=document.getElementById('root');let bar,selected=null,lastTitle='',mode;try{mode=localStorage.getItem('quran.ui.reading')||'continuous'}catch{mode='continuous'}const bound=new WeakSet();
function close(){selected?.classList.remove('platform-verse-active');selected=null;if(bar)bar.hidden=true}
function select(verse){close();selected=verse;verse.classList.add('platform-verse-active');bar.hidden=false;bar.querySelector('.platform-verse-label').textContent='الآية '+verse.querySelector('.qr-ayah-number').textContent.replace(/[﴿﴾]/g,'').trim();bar.querySelector('.platform-bar-mark').setAttribute('aria-pressed',String(verse.classList.contains('qr-marked')))}
function setup(){const panel=root.querySelector('.qr-enter'),verses=panel?.querySelector('.qr-verses');if(!verses){close();return}if(!bar){bar=document.createElement('div');bar.className='platform-verse-bar';bar.hidden=true;bar.setAttribute('role','region');bar.setAttribute('aria-label','إجراءات الآية المختارة');bar.innerHTML='<span class="platform-verse-label"></span><button type="button" class="platform-button platform-bar-listen">▷ استماع</button><button type="button" class="platform-button platform-bar-mark">◇ علامة</button><button type="button" class="platform-button platform-bar-tafsir">تفسير</button><button type="button" class="platform-button platform-bar-copy">نسخ</button><button type="button" class="platform-button platform-bar-close" aria-label="إغلاق إجراءات الآية">×</button>';document.body.append(bar);bar.querySelector('.platform-bar-close').addEventListener('click',close);['listen','mark','copy'].forEach((action,i)=>bar.querySelector('.platform-bar-'+action).addEventListener('click',()=>{const buttons=selected?.querySelectorAll('.qr-verse-controls button');buttons?.[i]?.click();if(action==='copy')setTimeout(()=>{const result=selected?.querySelector('.site-copy [role=status]')?.textContent||selected?.querySelector('.site-copy button')?.textContent;bar.querySelector('.platform-verse-label').textContent=result||'تحقق من إذن الحافظة في المتصفح'},200);if(action==='mark')setTimeout(()=>bar.querySelector('.platform-bar-mark').setAttribute('aria-pressed',String(selected?.classList.contains('qr-marked'))),0)}));document.addEventListener('keydown',e=>{if(e.key==='Escape')close()})}
const title=panel.querySelector('.qr-reader-head h2')?.textContent;if(lastTitle!==title){close();lastTitle=title}if(selected&&!selected.isConnected)close();panel.classList.toggle('platform-mushaf',mode==='continuous');let tools=panel.querySelector('.platform-reader-tools');if(!tools){tools=document.createElement('div');tools.className='platform-reader-tools';tools.innerHTML='<div class="platform-reader-switch" role="group" aria-label="طريقة عرض الآيات"><button type="button" class="platform-button platform-continuous">عرض المصحف</button><button type="button" class="platform-button platform-detailed">آية بآية</button></div><button type="button" class="platform-button platform-audio-settings" aria-pressed="false">إعدادات التلاوة</button>';panel.querySelector('.qr-reader-head').after(tools);const note=document.createElement('p');note.className='platform-reader-note';note.textContent='عرض متصل مستوحى من هدوء المصحف. اضغط آية للاستماع أو الحفظ أو النسخ. التنقل بالصفحات لتيسير العرض فقط. الأجزاء والأحزاب والأرباع بتقسيم مصحف المدينة تجدها في فهرس التقسيم أسفل الصفحة.';tools.after(note);for(const[k,name]of[['continuous','continuous'],['detailed','detailed']])tools.querySelector('.platform-'+name).addEventListener('click',()=>{mode=k;try{localStorage.setItem('quran.ui.reading',mode)}catch{}close();setup()});tools.querySelector('.platform-audio-settings').addEventListener('click',e=>{panel.classList.toggle('platform-audio-open');e.currentTarget.setAttribute('aria-pressed',String(panel.classList.contains('platform-audio-open')))})}
tools.querySelector('.platform-continuous').setAttribute('aria-pressed',String(mode==='continuous'));tools.querySelector('.platform-detailed').setAttribute('aria-pressed',String(mode!=='continuous'));verses.querySelectorAll('.qr-verse').forEach(v=>{if(bound.has(v))return;bound.add(v);v.tabIndex=0;v.setAttribute('aria-label','اختيار الآية '+v.querySelector('.qr-ayah-number').textContent);v.addEventListener('click',e=>{if(mode==='continuous'&&!e.target.closest('button'))select(v)});v.addEventListener('keydown',e=>{if(mode==='continuous'&&(e.key==='Enter'||e.key===' ')){e.preventDefault();select(v)}})})}
new MutationObserver(setup).observe(root,{subtree:true,childList:true});setup();})();

/* Reading pager and font upgrade. Quran text untouched. */
(()=>{
'use strict';
const root=document.getElementById('root');
if(!root)return;
const SURAHS=["الفاتحة", "البقرة", "آل عمران", "النساء", "المائدة", "الأنعام", "الأعراف", "الأنفال", "التوبة", "يونس", "هود", "يوسف", "الرعد", "ابراهيم", "الحجر", "النحل", "الإسراء", "الكهف", "مريم", "طه", "الأنبياء", "الحج", "المؤمنون", "النور", "الفرقان", "الشعراء", "النمل", "القصص", "العنكبوت", "الروم", "لقمان", "السجدة", "الأحزاب", "سبإ", "فاطر", "يس", "الصافات", "ص", "الزمر", "غافر", "فصلت", "الشورى", "الزخرف", "الدخان", "الجاثية", "الأحقاف", "محمد", "الفتح", "الحجرات", "ق", "الذاريات", "الطور", "النجم", "القمر", "الرحمن", "الواقعة", "الحديد", "المجادلة", "الحشر", "الممتحنة", "الصف", "الجمعة", "المنافقون", "التغابن", "الطلاق", "التحريم", "الملك", "القلم", "الحاقة", "المعارج", "نوح", "الجن", "المزمل", "المدثر", "القيامة", "الانسان", "المرسلات", "النبإ", "النازعات", "عبس", "التكوير", "الإنفطار", "المطففين", "الإنشقاق", "البروج", "الطارق", "الأعلى", "الغاشية", "الفجر", "البلد", "الشمس", "الليل", "الضحى", "الشرح", "التين", "العلق", "القدر", "البينة", "الزلزلة", "العاديات", "القارعة", "التكاثر", "العصر", "الهمزة", "الفيل", "قريش", "الماعون", "الكوثر", "الكافرون", "النصر", "المسد", "الإخلاص", "الفلق", "الناس"];
const AR='٠١٢٣٤٥٦٧٨٩';
const parseAr=s=>{const m=String(s||'').replace(/[٠-٩]/g,d=>AR.indexOf(d)).match(/\d+/);return m?+m[0]:null};
const arNum=n=>Number(n).toLocaleString('ar-EG',{useGrouping:false});
/* Google Fonts: Amiri Quran for the Quran text, Amiri for headings (fast woff2, OFL). */
if(!document.getElementById('tafsir-fonts')){
 const pc=document.createElement('link');pc.rel='preconnect';pc.href='https://fonts.gstatic.com';pc.crossOrigin='';
 const lk=document.createElement('link');lk.id='tafsir-fonts';lk.rel='stylesheet';
 lk.href='https://fonts.googleapis.com/css2?family=Amiri+Quran&family=Amiri:wght@400;700&display=swap';
 document.head.append(pc,lk);
}
/* ---- Persistent pager ---- */
let pager,prevPage,nextPage,prevSurah,nextSurah,progressFill,progressText;
function buildPager(){
 if(pager)return;
 pager=document.createElement('div');pager.className='reading-pager';pager.hidden=true;
 pager.setAttribute('role','navigation');pager.setAttribute('aria-label','تنقّل القراءة');
 pager.innerHTML='<button type="button" class="platform-button rp-prev-surah"><span class="rp-full">‹ السورة السابقة</span><span class="rp-short">‹ سورة</span></button><button type="button" class="platform-button rp-prev-page"><span class="rp-full">‹ الصفحة السابقة</span><span class="rp-short">‹ صفحة</span></button><span class="reading-progress" aria-hidden="true"><i></i></span><span class="reading-progress-text"></span><button type="button" class="platform-button rp-next-page"><span class="rp-full">الصفحة التالية ›</span><span class="rp-short">صفحة ›</span></button><button type="button" class="platform-button rp-next-surah"><span class="rp-full">السورة التالية ›</span><span class="rp-short">سورة ›</span></button>';
 document.body.append(pager);
 prevSurah=pager.querySelector('.rp-prev-surah');prevPage=pager.querySelector('.rp-prev-page');
 nextPage=pager.querySelector('.rp-next-page');nextSurah=pager.querySelector('.rp-next-surah');
 progressFill=pager.querySelector('.reading-progress i');progressText=pager.querySelector('.reading-progress-text');
 const go=label=>{const b=[...root.querySelectorAll('.qr-enter .qr-actions button')].find(x=>x.textContent.trim()===label&&!x.disabled);if(b){b.click();setTimeout(()=>root.querySelector('.qr-verses')?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches||document.documentElement.dataset.motion==='off'?'instant':'smooth',block:'start'}),60)}};
 prevSurah.addEventListener('click',()=>go('السورة السابقة'));prevPage.addEventListener('click',()=>go('الصفحة السابقة'));
 nextPage.addEventListener('click',()=>go('الصفحة التالية'));nextSurah.addEventListener('click',()=>go('السورة التالية'));
 document.addEventListener('keydown',e=>{
  if(pager.hidden||/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName))return;
  if(e.key==='ArrowLeft'){e.preventDefault();go('الصفحة التالية')}
  if(e.key==='ArrowRight'){e.preventDefault();go('الصفحة السابقة')}
 });
}
function syncPager(){
 buildPager();
 const panel=root.querySelector('.qr-enter');
 const mushaf=panel?.classList.contains('platform-mushaf');
 if(!mushaf){pager.hidden=true;return}
 pager.hidden=false;
 const find=label=>[...panel.querySelectorAll('.qr-actions button')].find(x=>x.textContent.trim()===label);
 const cap=[...panel.querySelectorAll('.site-caption')].map(x=>x.textContent).find(t=>t.includes('الآيات'))||'';
 const nums=(cap.match(/[٠-٩]+/g)||[]).map(parseAr);
 if(nums.length>=3){const pct=Math.min(100,Math.round(nums[1]/nums[2]*100));progressFill.style.width=pct+'%';progressText.textContent='الآيات '+arNum(nums[0])+'–'+arNum(nums[1])+' من '+arNum(nums[2])}
 prevPage.disabled=!find('الصفحة السابقة')||find('الصفحة السابقة').disabled;
 nextPage.disabled=!find('الصفحة التالية')||find('الصفحة التالية').disabled;
 prevSurah.disabled=!find('السورة السابقة')||find('السورة السابقة').disabled;
 nextSurah.disabled=!find('السورة التالية')||find('السورة التالية').disabled;
}
new MutationObserver(syncPager).observe(root,{subtree:true,childList:true});
syncPager();
})();

/* ==== v6: فهرس التقسيم + الأذكار + السبحة + التفسير (روابط المصادر) ==== */
(()=>{
'use strict';
const root=document.getElementById('root');
const AR='٠١٢٣٤٥٦٧٨٩';
const parseAr=s=>{const m=String(s||'').replace(/[٠-٩]/g,d=>AR.indexOf(d)).match(/\d+/);return m?+m[0]:null};
const arNum=n=>Number(n).toLocaleString('ar-EG',{useGrouping:false});
const SURAHS=["الفاتحة","البقرة","آل عمران","النساء","المائدة","الأنعام","الأعراف","الأنفال","التوبة","يونس","هود","يوسف","الرعد","ابراهيم","الحجر","النحل","الإسراء","الكهف","مريم","طه","الأنبياء","الحج","المؤمنون","النور","الفرقان","الشعراء","النمل","القصص","العنكبوت","الروم","لقمان","السجدة","الأحزاب","سبإ","فاطر","يس","الصافات","ص","الزمر","غافر","فصلت","الشورى","الزخرف","الدخان","الجاثية","الأحقاف","محمد","الفتح","الحجرات","ق","الذاريات","الطور","النجم","القمر","الرحمن","الواقعة","الحديد","المجادلة","الحشر","الممتحنة","الصف","الجمعة","المنافقون","التغابن","الطلاق","التحريم","الملك","القلم","الحاقة","المعارج","نوح","الجن","المزمل","المدثر","القيامة","الانسان","المرسلات","النبأ","النازعات","عبس","التكوير","الانفطار","المطففين","الانشقاق","البروج","الطارق","الأعلى","الغاشية","الفجر","البلد","الشمس","الليل","الضحى","الشرح","التين","العلق","القدر","البينة","الزلزلة","العاديات","القارعة","التكاثر","العصر","الهمزة","الفيل","قريش","الماعون","الكوثر","الكافرون","النصر","المسد","الإخلاص","الفلق","الناس"];
const UTH=new Set([1,2,3,4,5,6,18,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,49,50,51,52,53,54,55,56,57,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114]);
const motion=()=>matchMedia('(prefers-reduced-motion: reduce)').matches||document.documentElement.dataset.motion==='off'?'instant':'smooth';
const wait=ms=>new Promise(r=>setTimeout(r,ms));
function toast(t){let el=document.querySelector('.px-toast');if(!el){el=document.createElement('div');el.className='px-toast';el.setAttribute('role','status');document.body.append(el)}el.textContent=t;el.classList.add('on');clearTimeout(el._t);el._t=setTimeout(()=>el.classList.remove('on'),2600)}
/* ---- division helpers ---- */
function cumCounts(){const D=window.__quran_divisions;if(!D._cum){let s=0;D._cum=D.counts.map(c=>s+=c)}return D._cum}
const absV=(s,a)=>cumCounts()[s-2||0]===undefined?a-1:(s===1?a-1:cumCounts()[s-2]+a-1);
function divisionLabel(s,a){const D=window.__quran_divisions;if(!D)return'';const idx=absV(s,a);let qi=0;for(let i=0;i<240;i++){const[qs,qa]=D.quarters[i];if(absV(qs,qa)<=idx)qi=i;else break}
const juz=Math.floor(qi/8)+1,hizb=Math.floor(qi/4)+1,rub=qi%4+1;return'الجزء '+arNum(juz)+' · الحزب '+arNum(hizb)+' · الربع '+arNum(rub)}
function currentSurah(){const h=root.querySelector('.qr-reader-head h2');if(!h)return null;const n=h.textContent.replace('سورة','').trim();const i=SURAHS.indexOf(n);return i<0?null:i+1}
/* ---- navigate to any verse ---- */
async function gotoVerse(s,a){
 toast('جارٍ الانتقال إلى سورة '+SURAHS[s-1]+' · آية '+arNum(a));
 if(location.hash&&location.hash!=='#/'){const home=[...document.querySelectorAll('#platform-navigation a')].find(x=>x.getAttribute('href')==='#/');home?.click();await wait(400)}
 let list=[...root.querySelectorAll('.qr-surah')];
 if(!list.length){const idx=[...root.querySelectorAll('button')].find(b=>b.textContent.includes('فهرس السور'));idx?.click();await wait(500);list=[...root.querySelectorAll('.qr-surah')]}
 const btn=list[s-1];if(!btn){toast('تعذر فتح فهرس السور');return}
 if(!btn.classList.contains('qr-selected')){btn.click();await wait(500)}
 for(let i=0;i<20;i++){
  const cap=[...root.querySelectorAll('.site-caption')].map(x=>x.textContent).find(t=>t.includes('الآيات'));
  const m=(cap||'').match(/[٠-٩]+/g);
  if(m&&m.length>=2){const from=parseAr(m[0]),to=parseAr(m[1]);if(a<=to){break}
   const nx=[...root.querySelectorAll('.qr-enter .qr-actions button')].find(x=>x.textContent.trim()==='الصفحة التالية'&&!x.disabled);if(!nx)break;nx.click();await wait(250)}
  else break}
 const verseEl=[...root.querySelectorAll('.qr-verse')].find(x=>parseAr(x.querySelector('.qr-ayah-number')?.textContent)===a);
 if(verseEl){verseEl.scrollIntoView({behavior:motion(),block:'center'});verseEl.classList.add('px-target-verse');setTimeout(()=>verseEl.classList.remove('px-target-verse'),2600)}
 else root.querySelector('.qr-verses')?.scrollIntoView({behavior:motion(),block:'start'});
 /* The scroll listener refreshes the division badge after the jump. */
 toast('سورة '+SURAHS[s-1]+' · آية '+arNum(a));
}
/* ---- sections ---- */
let built=false;
function build(){
 const main=document.querySelector('.site-card');
 if(!main||built||!window.__quran_divisions)return;built=true;
 const D=window.__quran_divisions;
 const host=document.createElement('div');host.className='px-host';
 /* فهرس التقسيم */
 const juzSec=document.createElement('section');juzSec.className='px-section';juzSec.id='px-juz';
 juzSec.innerHTML='<header class="px-head"><h2>فهرس التقسيم</h2><p>تقسيم مصحف المدينة: ٣٠ جزءًا، ٦٠ حزبًا، ٢٤٠ ربع حزب — اضغط أي موضع للانتقال إليه في المصحف.</p></header>';
 const grid=document.createElement('div');grid.className='px-juz-grid';
 for(let j=0;j<30;j++){
  const det=document.createElement('details');det.className='px-juz-card';
  const[js_,ja]=D.juz[j];
  const sum=document.createElement('summary');sum.innerHTML='<b>الجزء '+arNum(j+1)+' · '+D.juzNames[j]+'</b><small>يبدأ من '+SURAHS[js_-1]+' · آية '+arNum(ja)+'</small>';det.append(sum);
  const rows=document.createElement('div');rows.className='px-rub-list';
  for(let k=0;k<8;k++){const qi=j*8+k;const[qs,qa]=D.quarters[qi];
   const row=document.createElement('button');row.type='button';row.className='px-rub';
   row.innerHTML='<span>الحزب '+arNum(Math.floor(qi/4)+1)+' · الربع '+arNum(qi%4+1)+'</span><span class="px-rub-ref">'+SURAHS[qs-1]+' · آية '+arNum(qa)+'</span>';
   row.addEventListener('click',()=>gotoVerse(qs,qa));rows.append(row)}
  det.append(rows);grid.append(det)}
 juzSec.append(grid);host.append(juzSec);
 /* الأذكار — فهرس أقسام حصن المسلم على موقعه الرسمي */
const ADHKAR=[[0,"أذكار النوم",13],[2,"دعاء ُلبْس الثوب",1],[3,"دعاء ُلبْس الثوب الجديد",1],[4,"الدعاء لمن لبس ثوبا جديدا",2],[5,"ما يقول إذا وضع ثوبه",1],[6,"دعاء دخول الخلاء",1],[7,"دعاء الخروج من الخلاء",1],[8,"الذكر قبل الوضوء",1],[9,"الذكر بعد الفراغ من الوضوء",3],[10,"الذكر عند الخروج من المنزل",2],[11,"الذكر عند دخول المنزل",1],[12,"دعاء الذهاب إلى المسجد",1],[13,"دعاء دخول المسجد",1],[14,"دعاء الخروج من المسجد",1],[15,"أذكار الآذان",5],[16,"دعاء الاستفتاح",6],[17,"دعاء الركوع",5],[18,"دعاء الرفع من الركوع",3],[19,"دعاء السجود",7],[20,"دعاء الجلسة بين السجدتين",2],[21,"دعاء سجود التلاوة",2],[22,"التشهد",1],[23,"الصلاة على النبي بعد التشهد",2],[24,"الدعاء بعد التشهد الأخير قبل السلام",11],[25,"الأذكار بعد السلام من الصلاة",8],[26,"دعاء صلاة الاستخارة",1],[27,"أذكار الصباح والمساء",24],[28,"أذكار الاستيقاظ من النوم",4],[29,"الدعاء إذا تقلب ليلا",1],[30,"دعاء الفزع في النوم و من بُلِيَ بالوحشة",1],[31,"ما يفعل من رأى الرؤيا أو الحلم",2],[32,"دعاء قنوت الوتر",3],[33,"الذكر عقب السلام من الوتر",1],[34,"دعاء الهم والحزن",2],[35,"دعاء الكرب",4],[36,"دعاء لقاء العدو و ذي السلطان",3],[37,"دعاء من خاف ظلم السلطان",2],[38,"الدعاء على العدو",1],[39,"ما يقول من خاف قوما",1],[40,"دعاء من أصابه وسوسة في الإيمان",3],[41,"دعاء قضاء الدين",2],[42,"دعاء الوسوسة في الصلاة و القراءة",1],[43,"دعاء من استصعب عليه أمر",1],[44,"ما يقول ويفعل من أذنب ذنبا",1],[45,"دعاء طرد الشيطان و وساوسه",3],[46,"الدعاء حينما يقع ما لا يرضاه أو ُ غلب على أمره",1],[47,"ﺗﻬنئة المولود له وجوابه",1],[48,"ما يعوذ به الأولاد",1],[49,"الدعاء للمريض في عيادته",2],[50,"فضل عيادة المريض",1],[51,"دعاء المريض الذي يئس من حياته",3],[52,"تلقين المحتضر",1],[53,"دعاء من أصيب بمصيبة",1],[54,"الدعاء عند إغماض الميت",1],[55,"الدعاء للميت في الصلاة عليه",4],[56,"الدعاء للفرط في الصلاة عليه",2],[57,"دعاء التعزية",1],[58,"الدعاء عند إدخال الميت القبر",1],[59,"الدعاء بعد دفن الميت",1],[60,"دعاء زيارة القبور",1],[61,"دعاء الريح",2],[62,"دعاء الرعد",1],[63,"من أدعية الاستسقاء",3],[64,"الدعاء إذا نزل المطر",1],[65,"الذكر بعد نزول المطر",1],[66,"من أدعية الاستصحاء",1],[67,"دعاء رؤية الهلال",1],[68,"الدعاء عند إفطار الصائم",2],[69,"الدعاء قبل الطعام",2],[70,"الدعاء عند الفراغ من الطعام",2],[71,"دعاء الضيف لصاحب الطعام",1],[72,"التعريض بالدعاء لطلب الطعام أو الشراب",1],[73,"الدعاء إذا أفطر عند أهل بيت",1],[74,"دعاء الصائم إذا حضر الطعام ولم يفطر",1],[75,"ما يقول الصائم إذا سابه أحد",1],[76,"الدعاء عند رؤية باكورة الثمر",1],[77,"دعاء العطاس",1],[78,"ما يقال للكافر إذا عطس فحمد الله",1],[79,"الدعاء للمتزوج",1],[80,"دعاء المتزوج و شراء الدابة",1],[81,"الدعاء قبل إتيان الزوجة",1],[82,"دعاء الغضب",1],[83,"دعاء من رأى مبتلى",1],[84,"ما يقال في اﻟﻤﺠلس",1],[85,"كفارة اﻟﻤﺠلس",1],[86,"الدعاء لمن قال غفر الله لك",1],[87,"الدعاء لمن صنع إليك معروفا",1],[88,"ما يعصم الله به من الدجال",1],[89,"الدعاء لمن قال إني أحبك في الله",1],[90,"الدعاء لمن عرض عليك ماله",1],[91,"الدعاء لمن أقرض عند القضاء",1],[92,"دعاء الخوف من الشرك",1],[93,"الدعاء لمن قال بارك الله فيك",1],[94,"دعاء كراهية الطيرة",1],[95,"دعاء الركوب",1],[96,"دعاء السفر",1],[97,"دعاء دخول القرية أو البلدة",1],[98,"دعاء دخول السوق",1],[99,"الدعاء إذا تعس المركوب",1],[100,"دعاء المسافر للمقيم",1],[101,"دعاء المقيم للمسافر",2],[102,"التكبير و التسبيح في سير السفر",1],[103,"دعاء المسافر إذا أسحر",1],[104,"الدعاء إذا نزل مترلا في سفر أو غيره",1],[105,"ذكر الرجوع من السفر",1],[106,"ما يقول من أتاه أمر يسره أو يكرهه",1],[107,"فضل الصلاة على النبي صلى الله عليه و سلم",5],[108,"إفشاء السلام",3],[109,"كيف يرد السلام على الكافر إذا سلم",1],[110,"الدُّعاءُ عِنْدَ سَمَاعِ صِياحِ الدِّيكِ ونَهِيقِ الْحِمَارِ",1],[111,"دعاء نباح الكلاب بالليل",1],[112,"الدعاء لمن سببته",1],[113,"ما يقول المسلم إذا مدح المسلم",1],[114,"ما يقول المسلم إذا زكي",1],[115,"كيف يلبي المحرم في الحج أو العمرة ؟",1],[116,"التكبير إذا أتى الركن الأسود",1],[117,"الدعاء بين الركن اليماني والحجر الأسود",1],[118,"دعاء الوقوف على الصفا والمروة",1],[119,"الدعاء يوم عرفة",1],[120,"الذكر عند المشعر الحرام",1],[121,"التكبير عند رمي الجمار مع كل حصاة",1],[122,"دعاء التعجب والأمر السار",2],[123,"ما يفعل من أتاه أمر يسره",1],[124,"ما يقول من أحس وجعا في جسده",1],[125,"دعاء من خشي أن يصيب شيئا بعينه",1],[126,"ما يقال عند الفزع",1],[127,"ما يقول عند الذبح أو النحر",1],[128,"ما يقول لرد كيد مردة الشياطين",1],[129,"الاستغفار و التوبة",6],[130,"فضل التسبيح و التحميد، و التهليل، و التكبير",12],[131,"كيف كان النبي يسبح؟",1],[132,"من أنواع الخير والآداب الجامعة",1]];
const ADHKAR_TOTAL=267;
const adSec=document.createElement('section');adSec.className='px-section';adSec.id='px-adhkar';
adSec.innerHTML='<header class="px-head"><h2>الأذكار</h2><p>فهرس كتاب «حصن المسلم من أذكار الكتاب والسنة» لسعيد بن علي بن وهف القحطاني رحمه الله — '+arNum(ADHKAR.length)+' قسمًا، '+arNum(ADHKAR_TOTAL)+' ذكرًا ودعاءً. يفتح كل قسم على <a href="https://hisnmuslim.com/" target="_blank" rel="noopener">الموقع الرسمي للكتاب</a> في تبويب جديد.</p></header><div class="px-adhkar-tools"><input type="search" class="px-adhkar-search" placeholder="ابحث في الأذكار… مثل: النوم، الصلاة، السفر" aria-label="بحث في الأذكار"></div><div class="px-adhkar-list"></div>';
host.append(adSec);
function drawAdhkar(filter){
 const listEl=adSec.querySelector('.px-adhkar-list');listEl.textContent='';let shown=0;
 for(const[id,name,count]of ADHKAR){
  if(filter&&!name.includes(filter))continue;shown++;
  const a=document.createElement('a');a.className='px-adhkar-cat';a.href='https://hisnmuslim.com/i/ar/'+id;a.target='_blank';a.rel='noopener';
  const b=document.createElement('b');b.textContent=name;
  const sm=document.createElement('small');sm.textContent=arNum(count)+' ذكر ↗';
  a.append(b,sm);listEl.append(a)}
 if(!shown){const p=document.createElement('p');p.className='px-loading';p.textContent='لا نتائج مطابقة.';listEl.append(p)}}
drawAdhkar('');
adSec.querySelector('.px-adhkar-search').addEventListener('input',e=>drawAdhkar(e.target.value.trim()));
/* السبحة */
 const taSec=document.createElement('section');taSec.className='px-section';taSec.id='px-tasbih';
 taSec.innerHTML='<header class="px-head"><h2>السبحة الإلكترونية</h2><p>اضغط الدائرة أو مسطرة المسافة للتسبيح. يُحفظ مجموعك على هذا المتصفح.</p></header>\
 <div class="px-tasbih">\
  <div class="px-tasbih-presets" role="group" aria-label="اختيار الذكر"></div>\
  <button type="button" class="px-bead" aria-label="سجّل تسبيحة"><span class="px-bead-count">٠</span><span class="px-bead-text">سبحان الله</span></button>\
  <div class="px-tasbih-row"><label>الهدف: <select class="px-target"><option value="33">٣٣</option><option value="100" selected>١٠٠</option><option value="1000">١٠٠٠</option><option value="0">بلا هدف</option></select></label>\
  <span class="px-cycles">الجولات: ٠</span><span class="px-total">المجموع: ٠</span></div>\
  <div class="px-tasbih-row"><button type="button" class="platform-button px-reset">تصفير العدّاد</button><button type="button" class="platform-button px-reset-all">تصفير الكل</button></div>\
 </div>';
 host.append(taSec);
 main.append(host);
 /* nav additions */
 const nav=document.getElementById('platform-navigation');
 const extras=[['▦','الأجزاء','الفهرس والأحزاب والأرباع','px-juz'],['✦','الأذكار','حصن المسلم كاملًا','px-adhkar'],['◉','السبحة','عداد التسبيح','px-tasbih']];
 for(const[ic,lb,sm,id]of extras){
  const a=document.createElement('a');a.href='#'+id;
  const i1=document.createElement('span');i1.className='platform-nav-icon';i1.setAttribute('aria-hidden','true');i1.textContent=ic;
  const tx=document.createElement('span');tx.className='platform-nav-label';tx.textContent=lb;const small=document.createElement('small');small.textContent=sm;tx.append(small);
  a.append(i1,tx);a.addEventListener('click',e=>{e.preventDefault();document.getElementById(id)?.scrollIntoView({behavior:motion(),block:'start'})});nav.append(a)}
 /* bottom tab bar */
 const tabs=document.createElement('nav');tabs.className='px-tabs';tabs.setAttribute('aria-label','أقسام المنصة');
 tabs.innerHTML='<button type="button" data-t="mushaf"><span>المصحف</span></button><button type="button" data-t="px-juz"><span>الأجزاء</span></button><button type="button" data-t="px-adhkar"><span>الأذكار</span></button><button type="button" data-t="px-tasbih"><span>السبحة</span></button>';
 document.body.append(tabs);
 tabs.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const t=b.dataset.t;
  if(t==='mushaf'){const home=[...document.querySelectorAll('#platform-navigation a')].find(x=>x.getAttribute('href')==='#/');home?.click();root.querySelector('.qr-enter')?.scrollIntoView({behavior:motion(),block:'start'})}
  else document.getElementById(t)?.scrollIntoView({behavior:motion(),block:'start'})});
 /* division chip tracks the verse actually in view; pager hides outside the reader */
 function chipUpdate(){
  const pager=document.querySelector('.reading-pager');if(!pager)return;
  let chip=pager.querySelector('.reading-division');
  if(!chip){chip=document.createElement('span');chip.className='reading-division';const pt=pager.querySelector('.reading-progress-text');pt?pt.after(chip):pager.append(chip)}
  const s=currentSurah();if(!s){chip.textContent='';return}
  const vs=[...root.querySelectorAll('.qr-verse')];
  const mid=innerHeight/2;
  const top=vs.find(x=>{const r=x.getBoundingClientRect();return r.top<=mid&&r.bottom>=mid})||vs.find(x=>x.getBoundingClientRect().bottom>140)||vs[vs.length-1];
  const a=top?parseAr(top.querySelector('.qr-ayah-number')?.textContent):null;
  chip.textContent=a?divisionLabel(s,a):'';
 }
 function pagerVis(){
  const pager=document.querySelector('.reading-pager');if(!pager)return;
  const r=root.querySelector('.qr-enter');
  if(!r)return;
  const rect=r.getBoundingClientRect();
  pager.classList.toggle('px-hidden',rect.bottom<60||rect.top>innerHeight);
 }
 setInterval(()=>{chipUpdate();pagerVis()},700);
 let chipTick=false;
 addEventListener('scroll',()=>{pagerVis();if(!chipTick){chipTick=true;requestAnimationFrame(()=>{chipUpdate();chipTick=false})}},{passive:true});
 /* tasbih */
 const PRESETS=['سبحان الله','الحمد لله','الله أكبر','لا إله إلا الله','أستغفر الله','لا حول ولا قوة إلا بالله','سبحان الله وبحمده','اللهم صلِّ على محمد'];
 let st;try{st=JSON.parse(localStorage.getItem('quran.tasbih.v1'))||{}}catch{st={}}
 st=Object.assign({count:0,target:100,cycles:0,total:0,preset:0},st);
 const bead=taSec.querySelector('.px-bead'),bc=taSec.querySelector('.px-bead-count'),bt=taSec.querySelector('.px-bead-text'),cy=taSec.querySelector('.px-cycles'),tt=taSec.querySelector('.px-total'),sel=taSec.querySelector('.px-target');
 const presets=taSec.querySelector('.px-tasbih-presets');
 PRESETS.forEach((p,i)=>{const b=document.createElement('button');b.type='button';b.className='px-preset';b.textContent=p;b.addEventListener('click',()=>{st.preset=i;drawT();saveT()});presets.append(b)});
 function saveT(){try{localStorage.setItem('quran.tasbih.v1',JSON.stringify(st))}catch{}}
 function drawT(){
  bc.textContent=arNum(st.count);bt.textContent=PRESETS[st.preset];
  cy.textContent='الجولات: '+arNum(st.cycles);tt.textContent='المجموع: '+arNum(st.total);
  sel.value=String(st.target);
  presets.querySelectorAll('.px-preset').forEach((b,i)=>b.classList.toggle('on',i===st.preset));
  const pct=st.target>0?Math.min(1,st.count/st.target):0;
  bead.style.setProperty('--p',pct);
  bead.classList.toggle('full',st.target>0&&st.count>=st.target)}
 function tick(){st.count++;st.total++;
  if(st.target>0&&st.count>=st.target){st.cycles++;st.count=0;if(navigator.vibrate)navigator.vibrate([40,60,40]);toast('ما شاء الله، أتممت '+arNum(st.target)+' — الجولة '+arNum(st.cycles))}
  else if(navigator.vibrate)navigator.vibrate(12);
  drawT();saveT()}
 bead.addEventListener('click',tick);
 document.addEventListener('keydown',e=>{if(e.key===' '&&taSec.contains(document.activeElement)&&document.activeElement===bead){e.preventDefault();tick()}});
 sel.addEventListener('change',()=>{st.target=+sel.value;drawT();saveT()});
 taSec.querySelector('.px-reset').addEventListener('click',()=>{st.count=0;drawT();saveT()});
 taSec.querySelector('.px-reset-all').addEventListener('click',()=>{st.count=0;st.cycles=0;st.total=0;drawT();saveT()});
 drawT();
 /* tafsir sheet */
 const sheet=document.createElement('div');sheet.className='px-tafsir';sheet.hidden=true;sheet.setAttribute('role','dialog');sheet.setAttribute('aria-label','تفسير الآية من مصادرها');
 document.body.append(sheet);
 function openTafsir(){
  const v=root.querySelector('.platform-verse-active');if(!v)return;
  const s=currentSurah();const a=parseAr(v.querySelector('.qr-ayah-number')?.textContent);
  if(!s||!a)return;
  const muyassar='https://quran.com/'+s+':'+a+'/tafsirs/ar-tafsir-muyassar';
  const uth='https://tafsir.app/ibn-uthaymeen/'+s+'/'+a;
  sheet.innerHTML='<div class="px-tafsir-card">\
   <div class="px-tafsir-head"><h3>تفسير الآية — سورة '+SURAHS[s-1]+' · آية '+arNum(a)+'</h3><button type="button" class="platform-button px-tafsir-close" aria-label="إغلاق">×</button></div>\
   <p class="px-tafsir-note">يفتح كل مصدر صفحة الآية على موقعه الرسمي في تبويب جديد.</p>\
   <a class="px-tafsir-src" href="'+muyassar+'" target="_blank" rel="noopener"><b>التفسير الميسّر</b><small>مجمع الملك فهد لطباعة المصحف الشريف — يشمل كل آيات القرآن — quran.com</small></a>'+
   (UTH.has(s)
    ?'<a class="px-tafsir-src" href="'+uth+'" target="_blank" rel="noopener"><b>تفسير ابن عثيمين</b><small>تفسير القرآن الكريم — tafsir.app</small></a>'
    :'<div class="px-tafsir-src off"><b>تفسير ابن عثيمين</b><small>تفسيره المرتّب المتاح لا يشمل هذه السورة</small></div>')+
   '<div class="px-tafsir-src off"><b>الشيخ ابن باز</b><small>لم نجد تفسيرًا مرتبًا آية بآية بقلمه؛ له فتاوى وفوائد على آيات مختارة في <a href="https://binbaz.org.sa/" target="_blank" rel="noopener">موقعه الرسمي binbaz.org.sa</a></small></div>\
  </div>';
  sheet.hidden=false;
  sheet.querySelector('.px-tafsir-close').addEventListener('click',()=>sheet.hidden=true);
 }
 document.addEventListener('click',e=>{if(e.target.closest('.platform-bar-tafsir'))openTafsir();if(e.target===sheet)sheet.hidden=true});
 document.addEventListener('keydown',e=>{if(e.key==='Escape')sheet.hidden=true});
}
const boot=()=>{build();if(built)obs.disconnect()};
const obs=new MutationObserver(boot);obs.observe(root,{childList:true,subtree:true});boot();
})();

/* v10: memorial welcome and a quiet, accessible visitor guide. No Quran text changes. */
(()=>{
'use strict';
let done=false;
const safeGet=(k)=>{try{return localStorage.getItem(k)}catch{return null}};
const safeSet=(k,v)=>{try{localStorage.setItem(k,v)}catch{}};
function init(){
 const shell=document.querySelector('.platform-shell');if(done||!shell)return;done=true;
 const style=document.createElement('style');style.textContent=`
 .memorial-strip{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:13px 18px;margin:4px 0 22px;border:1px solid color-mix(in srgb,var(--platform-gold) 35%,transparent);border-radius:16px;background:var(--platform-panel);color:var(--platform-green)}
 .memorial-strip p{margin:0;font-size:.93rem;line-height:1.8}.memorial-strip p small{display:block;color:var(--site-ink-2);font-size:.8rem}.memorial-links{display:flex;gap:8px;flex-shrink:0;flex-wrap:wrap}.memorial-links button{font-size:.8rem}
 .memorial-dialog{width:min(570px,calc(100% - 32px));max-height:calc(100dvh - 48px);overflow:auto;padding:0;border:1px solid color-mix(in srgb,var(--platform-gold) 45%,transparent);border-radius:24px;background:var(--platform-panel,#fff);color:var(--site-ink,#233c32);box-shadow:0 24px 100px #0005;text-align:center;direction:rtl}
 .memorial-dialog::backdrop{background:#102d27a6;backdrop-filter:blur(6px)}.memorial-inner{padding:30px 32px}.memorial-emblem{display:grid;place-items:center;margin:0 auto 18px;width:64px;height:64px;border-radius:50%;background:var(--platform-tint);color:var(--platform-gold);font-size:32px}
 .memorial-eyebrow{margin:0;color:var(--platform-gold);font-size:.85rem}.memorial-dialog h2{font-family:Amiri,serif;font-size:2.1rem;font-weight:700;line-height:1.7;margin:10px 0;color:var(--platform-green)}.memorial-prayer{font-family:Amiri,serif;font-size:1.45rem;line-height:2.05;margin:10px 0 20px}.memorial-divider{width:60px;height:1px;background:var(--platform-gold);margin:20px auto}
 .memorial-credit{font-size:.78rem;color:var(--site-ink-2);margin:16px 0 0}.memorial-start{width:100%;min-height:48px}.memorial-preference{display:flex;justify-content:center;align-items:center;gap:9px;text-align:start;font-size:.8rem;line-height:1.8;margin:16px 0;color:var(--site-ink-2)}.memorial-preference input{width:18px;height:18px;accent-color:var(--platform-green);flex-shrink:0}.memorial-dialog button:focus-visible,.memorial-strip button:focus-visible{outline:3px solid var(--platform-gold);outline-offset:3px}
 .memorial-help-head{display:flex;align-items:center;justify-content:space-between;text-align:start;gap:12px}.memorial-help-head h2{font-size:1.6rem;margin:0}.memorial-help-list{display:grid;gap:10px;text-align:start;margin:20px 0}.memorial-help-list section{padding:13px 15px;border:1px solid var(--site-hairline,#deded5);border-radius:12px}.memorial-help-list h3{margin:0 0 5px;font-size:.95rem;color:var(--platform-green)}.memorial-help-list p{margin:0;font-size:.86rem;line-height:1.9;color:var(--site-ink-2)}.memorial-help-foot{font-size:.8rem;color:var(--site-ink-2);text-align:start;line-height:1.9}
 @media(max-width:600px){.memorial-strip{align-items:flex-start;flex-direction:column;padding:13px 15px;margin-bottom:16px;gap:9px}.memorial-links{width:100%}.memorial-links button{flex:1}.memorial-inner{padding:25px 21px}.memorial-dialog h2{font-size:1.85rem}.memorial-prayer{font-size:1.3rem}}
 html[data-focus="true"] .memorial-strip{display:none}
 `;document.head.append(style);
 const strip=document.createElement('section');strip.className='memorial-strip';strip.setAttribute('aria-label','إهداء الموقع ودليل الاستخدام');
 strip.innerHTML='<p>صدقة جارية على أرواح موتانا<small>نسأل الله لهم الرحمة والمغفرة</small></p><div class="memorial-links"><button type="button" class="platform-button memorial-show">رسالة الإهداء</button><button type="button" class="platform-button memorial-guide">دليل الاستخدام</button></div>';
 shell.querySelector('.platform-hero').before(strip);
 const welcome=document.createElement('dialog');welcome.className='memorial-dialog';welcome.setAttribute('aria-labelledby','memorial-title');welcome.setAttribute('aria-describedby','memorial-prayer');
 welcome.innerHTML='<div class="memorial-inner"><div class="memorial-emblem" aria-hidden="true">◇</div><p class="memorial-eyebrow">بسم الله الرحمن الرحيم</p><h2 id="memorial-title">صدقة جارية<br>على أرواح موتانا</h2><div class="memorial-divider" aria-hidden="true"></div><p class="memorial-prayer" id="memorial-prayer">نسأل الله أن يرحمهم ويغفر لهم<br>ويسكنهم فسيح جناته.</p><button type="button" class="platform-button platform-primary memorial-start" autofocus>آمين، ابدأ القراءة</button><label class="memorial-preference"><input type="checkbox">عدم عرض الرسالة تلقائيًا على هذا المتصفح</label><p class="memorial-credit">القرآن الكريم · by Kareem Emad</p></div>';
 const help=document.createElement('dialog');help.className='memorial-dialog';help.setAttribute('aria-labelledby','memorial-help-title');
 help.innerHTML='<div class="memorial-inner"><div class="memorial-help-head"><h2 id="memorial-help-title">رفيقك في القراءة والذكر</h2><button type="button" class="platform-button memorial-close" aria-label="إغلاق دليل الاستخدام" autofocus>×</button></div><div class="memorial-help-list"><section><h3>اقرأ على مهل</h3><p>اختر السورة، أو انتقل مباشرة من فهرس الأجزاء والأحزاب والأرباع. اضغط على الآية للاستماع أو حفظ علامة أو فتح التفسير.</p></section><section><h3>عد إلى موضعك</h3><p>احفظ علامة بجوار آية، ثم اختر «متابعة من آخر علامة». العلامة محفوظة على نفس المتصفح، ولا تنتقل تلقائيًا بين الأجهزة.</p></section><section><h3>اجعل القراءة أريح</h3><p>بدّل بين المظهر الليلي والنهاري، وجرّب وضع التركيز. يمكنك تكبير الخط وتصغيره من أدوات المصحف. على لوحة المفاتيح: / للبحث، وEsc لإغلاق النوافذ.</p></section><section><h3>اذكر الله، وارجع إلى المصدر</h3><p>السبحة تحفظ العدّاد على هذا المتصفح. فهرس حصن المسلم والتفسير يفتحان صفحات المصادر في تبويب جديد، وليسا نصوصًا مدمجة داخل الموقع.</p></section></div><p class="memorial-help-foot">تفضيلات القراءة والعلامة وعدّاد السبحة تُحفظ على هذا المتصفح. لا يُطلب موقع جهازك إلا عند الضغط على زر تحديد الموقع للصلاة. اقرأ تفاصيل المصادر والخصوصية أسفل الموقع.</p><button type="button" class="platform-button platform-primary memorial-start">العودة للموقع</button></div>';
 document.body.append(welcome,help);
 let priorOverflow='',opened=0;
 [welcome,help].forEach(d=>{d.addEventListener('close',()=>{opened=Math.max(0,opened-1);if(!opened)document.body.style.overflow=priorOverflow});d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close()}})});
 const open=d=>{if(d.open)return;if(!opened)priorOverflow=document.body.style.overflow;d.showModal();opened++;document.body.style.overflow='hidden'};
 strip.querySelector('.memorial-show').addEventListener('click',()=>open(welcome));strip.querySelector('.memorial-guide').addEventListener('click',()=>open(help));
 welcome.querySelector('.memorial-start').addEventListener('click',()=>welcome.close());
 const pref=welcome.querySelector('input');pref.checked=safeGet('quran.memorial.hidden')==='yes';pref.addEventListener('change',()=>safeSet('quran.memorial.hidden',pref.checked?'yes':'no'));
 help.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>help.close()));
 let seen=false;try{seen=sessionStorage.getItem('quran.memorial.seen')==='yes';sessionStorage.setItem('quran.memorial.seen','yes')}catch{}
 if(!pref.checked&&!seen)open(welcome);
}
const obs=new MutationObserver(()=>{init();if(done)obs.disconnect()});obs.observe(document.body,{childList:true,subtree:true});init();
})();

/* v11: install the complete text reader for offline visits. */
(()=>{
'use strict';
let initialized=false;
function init(){
 const strip=document.querySelector('.memorial-strip');if(!strip||initialized)return;initialized=true;
 const state=document.createElement('small');state.className='offline-state';state.setAttribute('role','status');state.style.cssText='display:block;font-size:.76rem;line-height:1.8;margin-top:4px';strip.querySelector('p').append(state);
 const help=document.querySelector('.memorial-help-list');
 if(help){const item=document.createElement('section');item.innerHTML='<h3>القراءة دون إنترنت</h3><p>بعد ظهور «المصحف جاهز دون إنترنت»، يمكنك فتح الموقع وقراءة كل السور والبحث واستخدام العلامة والسبحة دون اتصال. التلاوة وصفحات التفسير والأذكار الخارجية ومواقيت الصلاة تحتاج الإنترنت. قد تحتاج الخطوط إلى التحميل أثناء أول قراءة. قد يمسح المتصفح النسخة المحفوظة عند تنظيف بياناته أو نقص المساحة.</p>';help.append(item)}
 const update=()=>{if(state.dataset.ready==='yes')state.textContent=navigator.onLine?'✓ المصحف جاهز دون إنترنت':'✓ دون اتصال: المصحف والسبحة متاحان'};
 if(!('serviceWorker' in navigator)){state.textContent='القراءة دون إنترنت غير متاحة في هذا المتصفح';return}
 state.textContent='جارٍ تجهيز المصحف للقراءة دون إنترنت…';
 let reloading=false; const previousController=navigator.serviceWorker.controller; navigator.serviceWorker.addEventListener('controllerchange',()=>{if(previousController&&!reloading){reloading=true;location.reload()}});
 navigator.serviceWorker.register('./sw.js',{scope:'./',updateViaCache:'none'}).then(()=>navigator.serviceWorker.ready).then(()=>{state.dataset.ready='yes';update()}).catch(()=>{state.textContent='لم يكتمل تجهيز النسخة دون إنترنت. افتح الموقع متصلًا وحاول مجددًا.'});
 addEventListener('online',update);addEventListener('offline',update);
}
const obs=new MutationObserver(()=>{init();if(initialized)obs.disconnect()});obs.observe(document.body,{childList:true,subtree:true});init();
})();
