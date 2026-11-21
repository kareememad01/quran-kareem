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
 shell.innerHTML=`<div class="platform-top"><a class="platform-brand" href="#/" aria-label="القرآن الكريم، الصفحة الرئيسية"><span class="platform-logo" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M16 8C11 4 5 5 3 6v20c5-2 9-1 13 2 4-3 8-4 13-2V6c-2-1-8-2-13 2Zm0 0v20M7 10c2 0 4 .5 6 1.5M7 15c2 0 4 .5 6 1.5M25 10c-2 0-4 .5-6 1.5M25 15c-2 0-4 .5-6 1.5"/></svg></span><span><strong>القرآن الكريم</strong><small>by Kareem Emad</small></span></a><p class="platform-focus-note">مساحة هادئة للقراءة</p><div class="platform-tools"><button type="button" class="platform-button platform-theme" aria-label="تبديل المظهر"></button><button type="button" class="platform-button platform-focus" aria-pressed="false">وضع التركيز</button><button type="button" class="platform-button platform-motion" aria-pressed="false">إيقاف الحركة</button></div></div><section class="platform-hero" aria-labelledby="platform-title"><div class="platform-hero-copy platform-reveal"><span class="platform-kicker">رفيقك في القراءة والذكر</span><h1 id="platform-title">مع القرآن،<span> كل يوم أقرب.</span></h1><p>مساحة تجمع المصحف الكامل والتلاوة، ومختارات من الأحاديث والأدعية، مع مواقيت الصلاة واتجاه القبلة. اقرأ على مهل، وعد إلى موضعك متى شئت.</p><div class="platform-hero-actions"><a class="platform-button platform-primary platform-read" href="#/">ابدأ القراءة <span aria-hidden="true">↙</span></a><a class="platform-button platform-pray" href="#/prayer">الصلاة والقبلة <span aria-hidden="true">↙</span></a></div></div><figure class="platform-art platform-reveal"><div class="platform-art-badge"><strong>١١٤</strong> سورة بين يديك</div><figcaption>رسم توضيحي، وليس صورة لمصحف بعينه</figcaption></figure></section><section class="platform-dashboard" aria-label="مساحتك للقراءة"><a class="platform-stat platform-reveal platform-read" href="#/"><span class="platform-stat-number">١١٤</span><span><strong>سورة في المصحف</strong><small>الرسم العثماني · رواية حفص</small></span></a><a class="platform-stat platform-reveal platform-audio" href="#/"><span class="platform-stat-mark" aria-hidden="true">▷</span><span><strong>اقرأ واستمع</strong><small>تلاوة مشاري العفاسي لكل آية</small></span></a><a class="platform-stat platform-reveal platform-resume" href="#/"><span class="platform-stat-mark" aria-hidden="true">◇</span><span><strong class="platform-mark-title">حفظ موضع القراءة</strong><small class="platform-mark-detail">احفظ علامة بجوار آية لتعود إليها هنا</small></span></a></section>`;
 const art=image.cloneNode();art.removeAttribute('id');shell.querySelector('.platform-art').prepend(art);
 document.getElementById('root').before(shell);
 const nav=main.querySelector('.qr-nav');nav.id='platform-navigation';
 const meta=[['▤','المصحف الكامل والتلاوة'],['◷','المواقيت واتجاه القبلة'],['◇','مختارات موثقة'],['▥','روابط كتب من مصادرها']];
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
function setup(){const panel=root.querySelector('.qr-enter'),verses=panel?.querySelector('.qr-verses');if(!verses){close();return}if(!bar){bar=document.createElement('div');bar.className='platform-verse-bar';bar.hidden=true;bar.setAttribute('role','region');bar.setAttribute('aria-label','إجراءات الآية المختارة');bar.innerHTML='<span class="platform-verse-label"></span><button type="button" class="platform-button platform-bar-listen">▷ استماع</button><button type="button" class="platform-button platform-bar-mark">◇ علامة</button><button type="button" class="platform-button platform-bar-copy">نسخ</button><button type="button" class="platform-button platform-bar-close" aria-label="إغلاق إجراءات الآية">×</button>';document.body.append(bar);bar.querySelector('.platform-bar-close').addEventListener('click',close);['listen','mark','copy'].forEach((action,i)=>bar.querySelector('.platform-bar-'+action).addEventListener('click',()=>{const buttons=selected?.querySelectorAll('.qr-verse-controls button');buttons?.[i]?.click();if(action==='copy')setTimeout(()=>{const result=selected?.querySelector('.site-copy [role=status]')?.textContent||selected?.querySelector('.site-copy button')?.textContent;bar.querySelector('.platform-verse-label').textContent=result||'تحقق من إذن الحافظة في المتصفح'},200);if(action==='mark')setTimeout(()=>bar.querySelector('.platform-bar-mark').setAttribute('aria-pressed',String(selected?.classList.contains('qr-marked'))),0)}));document.addEventListener('keydown',e=>{if(e.key==='Escape')close()})}
const title=panel.querySelector('.qr-reader-head h2')?.textContent;if(lastTitle!==title){close();lastTitle=title}if(selected&&!selected.isConnected)close();panel.classList.toggle('platform-mushaf',mode==='continuous');let tools=panel.querySelector('.platform-reader-tools');if(!tools){tools=document.createElement('div');tools.className='platform-reader-tools';tools.innerHTML='<div class="platform-reader-switch" role="group" aria-label="طريقة عرض الآيات"><button type="button" class="platform-button platform-continuous">عرض المصحف</button><button type="button" class="platform-button platform-detailed">آية بآية</button></div><button type="button" class="platform-button platform-audio-settings" aria-pressed="false">إعدادات التلاوة</button>';panel.querySelector('.qr-reader-head').after(tools);const note=document.createElement('p');note.className='platform-reader-note';note.textContent='عرض متصل مستوحى من هدوء المصحف. اضغط آية للاستماع أو الحفظ أو النسخ. التقسيم هنا ٢٠ آية للعرض، وليس مطابقًا لصفحات مصحف المدينة.';tools.after(note);for(const[k,name]of[['continuous','continuous'],['detailed','detailed']])tools.querySelector('.platform-'+name).addEventListener('click',()=>{mode=k;try{localStorage.setItem('quran.ui.reading',mode)}catch{}close();setup()});tools.querySelector('.platform-audio-settings').addEventListener('click',e=>{panel.classList.toggle('platform-audio-open');e.currentTarget.setAttribute('aria-pressed',String(panel.classList.contains('platform-audio-open')))})}
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
