/* Athar Tayeb v23/v25 additions: reciters with continuous play, Ruqyah section, version badge and safe update button.
   Adds behaviour only. The Quran bundle and existing data are not modified. Personal data in localStorage is never touched here. */
(()=>{
'use strict';
const VERSION='25';
const AC=[7,286,200,176,120,165,206,75,129,109,123,111,43,52,99,128,111,110,98,135,112,78,118,64,77,227,93,88,69,60,34,30,73,54,45,83,182,88,75,85,54,53,89,59,37,35,38,29,18,45,60,49,62,55,78,96,29,22,24,13,14,11,11,18,12,12,30,52,52,44,28,28,20,56,40,31,50,40,46,42,29,19,36,25,22,17,19,26,30,20,15,21,11,8,8,19,5,8,8,11,11,8,3,9,5,4,7,3,6,3,5,4,5,6];
const RECS=[
 {id:'basit',ar:'عبد الباسط عبد الصمد (مرتل)',en:'Abdul Basit Abdus-Samad (Murattal)',folder:'Abdul_Basit_Murattal_192kbps'},
 {id:'maher',ar:'ماهر المعيقلي',en:'Maher Al-Muaiqly',folder:'MaherAlMuaiqly128kbps'},
 {id:'husary',ar:'محمود خليل الحصري',en:'Mahmoud Khalil Al-Husary',folder:'Husary_128kbps'},
 {id:'dosari',ar:'ياسر الدوسري',en:'Yasser Ad-Dossari',folder:'Yasser_Ad-Dussary_128kbps'},
 {id:'jalil',ar:'خالد الجليل',en:'Khalid Al-Jalil',surahBase:'https://cdn.mp3quran.net/audio/khalid-jalil/r1/',timing:'https://www.mp3quran.net/api/v3/ayat_timing?read=20&surah='},
 {id:'alafasy',ar:'مشاري العفاسي',en:'Mishary Alafasy',folder:'Alafasy_128kbps'}
];
const KEY='athar-reciter-v22';
const TXT={"2:255": "ٱللَّهُ لَآ إِلَٰهَ إِلَّا هُوَ ٱلْحَىُّ ٱلْقَيُّومُ ۚ لَا تَأْخُذُهُۥ سِنَةٌۭ وَلَا نَوْمٌۭ ۚ لَّهُۥ مَا فِى ٱلسَّمَٰوَٰتِ وَمَا فِى ٱلْأَرْضِ ۗ مَن ذَا ٱلَّذِى يَشْفَعُ عِندَهُۥٓ إِلَّا بِإِذْنِهِۦ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَىْءٍۢ مِّنْ عِلْمِهِۦٓ إِلَّا بِمَا شَآءَ ۚ وَسِعَ كُرْسِيُّهُ ٱلسَّمَٰوَٰتِ وَٱلْأَرْضَ ۖ وَلَا يَـُٔودُهُۥ حِفْظُهُمَا ۚ وَهُوَ ٱلْعَلِىُّ ٱلْعَظِيمُ", "2:285": "ءَامَنَ ٱلرَّسُولُ بِمَآ أُنزِلَ إِلَيْهِ مِن رَّبِّهِۦ وَٱلْمُؤْمِنُونَ ۚ كُلٌّ ءَامَنَ بِٱللَّهِ وَمَلَٰٓئِكَتِهِۦ وَكُتُبِهِۦ وَرُسُلِهِۦ لَا نُفَرِّقُ بَيْنَ أَحَدٍۢ مِّن رُّسُلِهِۦ ۚ وَقَالُوا۟ سَمِعْنَا وَأَطَعْنَا ۖ غُفْرَانَكَ رَبَّنَا وَإِلَيْكَ ٱلْمَصِيرُ", "2:286": "لَا يُكَلِّفُ ٱللَّهُ نَفْسًا إِلَّا وُسْعَهَا ۚ لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا ٱكْتَسَبَتْ ۗ رَبَّنَا لَا تُؤَاخِذْنَآ إِن نَّسِينَآ أَوْ أَخْطَأْنَا ۚ رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَآ إِصْرًۭا كَمَا حَمَلْتَهُۥ عَلَى ٱلَّذِينَ مِن قَبْلِنَا ۚ رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِۦ ۖ وَٱعْفُ عَنَّا وَٱغْفِرْ لَنَا وَٱرْحَمْنَآ ۚ أَنتَ مَوْلَىٰنَا فَٱنصُرْنَا عَلَى ٱلْقَوْمِ ٱلْكَٰفِرِينَ", "1:1": "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ", "1:2": "ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ", "1:3": "ٱلرَّحْمَٰنِ ٱلرَّحِيمِ", "1:4": "مَٰلِكِ يَوْمِ ٱلدِّينِ", "1:5": "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", "1:6": "ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ", "1:7": "صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ", "112:1": "قُلْ هُوَ ٱللَّهُ أَحَدٌ", "112:2": "ٱللَّهُ ٱلصَّمَدُ", "112:3": "لَمْ يَلِدْ وَلَمْ يُولَدْ", "112:4": "وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ", "113:1": "قُلْ أَعُوذُ بِرَبِّ ٱلْفَلَقِ", "113:2": "مِن شَرِّ مَا خَلَقَ", "113:3": "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ", "113:4": "وَمِن شَرِّ ٱلنَّفَّٰثَٰتِ فِى ٱلْعُقَدِ", "113:5": "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ", "114:1": "قُلْ أَعُوذُ بِرَبِّ ٱلنَّاسِ", "114:2": "مَلِكِ ٱلنَّاسِ", "114:3": "إِلَٰهِ ٱلنَّاسِ", "114:4": "مِن شَرِّ ٱلْوَسْوَاسِ ٱلْخَنَّاسِ", "114:5": "ٱلَّذِى يُوَسْوِسُ فِى صُدُورِ ٱلنَّاسِ", "114:6": "مِنَ ٱلْجِنَّةِ وَٱلنَّاسِ"};
const pad=(n,l)=>String(n).padStart(l,'0');
const dig=s=>Number(String(s).replace(/[٠-٩]/g,d=>'٠١٢٣٤٥٦٧٨٩'.indexOf(d)).replace(/\D/g,''));
const isEn=()=>document.documentElement.lang==='en';
const L=(a,e)=>isEn()?e:a;
const rec=()=>RECS.find(r=>r.id===localStorage.getItem(KEY))||RECS[5];
let audio=new Audio();audio.preload='auto';window.atPlayer={audio,state:()=>st};
let st={list:null,i:0,active:false,timing:null,rid:null};
const cache={};
function ayahUrl(r,s,a){return 'https://everyayah.com/data/'+r.folder+'/'+pad(s,3)+pad(a,3)+'.mp3'}
async function timings(r,s){const k=r.id+s;if(cache[k])return cache[k];try{const j=await (await fetch(r.timing+s)).json();cache[k]=j.map(x=>({a:x.ayah,s:x.start_time/1000,e:x.end_time/1000}))}catch(e){cache[k]=null}return cache[k]}
function setStatus(t){document.querySelectorAll('.at-status').forEach(e=>e.textContent=t)}
function mark(){document.querySelectorAll('.at-playing').forEach(e=>e.classList.remove('at-playing'));document.querySelectorAll('.at-ruq-now').forEach(e=>e.classList.remove('at-ruq-now'));if(!st.active)return;const it=st.list[st.i];if(!it)return;
 const sel=document.querySelector('.qr-surah.qr-selected .qr-number');const cur=sel?dig(sel.textContent):0;
 if(cur===it.s){const v=document.querySelectorAll('.qr-verses .qr-verse')[it.a-1];if(v){v.classList.add('at-playing');if(!st.fromRuq)v.scrollIntoView({block:'center',behavior:document.documentElement.dataset.motion==='off'?'instant':'smooth'})}}
 const n=document.querySelector('[data-ruq="'+it.s+':'+it.a+'"]');if(n)n.classList.add('at-ruq-now')}
function stop(msg){document.querySelectorAll('.at-full').forEach(x=>x.remove());st.active=false;audio.pause();audio.onended=audio.ontimeupdate=null;mark();setStatus(msg||'')}
async function playIndex(i){
 if(i>=st.list.length){stop(L('انتهت التلاوة','Recitation finished'));return}
 st.i=i;const it=st.list[i],r=rec();audio.onended=audio.ontimeupdate=null;
 mark();setStatus(L('تلاوة ','Reciting ')+L(r.ar,r.en)+' · '+it.s+':'+it.a);
 if(r.folder){audio.src=ayahUrl(r,it.s,it.a);audio.onended=()=>{if(st.active)playIndex(i+1)};
  const nx=st.list[i+1];if(nx){const p=new Audio();p.preload='auto';p.src=ayahUrl(r,nx.s,nx.a)}
  try{await audio.play()}catch(e){stop(L('تعذر تشغيل الصوت. تأكد من الإنترنت ثم اضغط استماع مرة أخرى.','Could not play audio. Check your connection and tap listen again.'))}
 }else{
  /* Surah-length recording with official ayah timings. Continues through the rest of the same surah file. */
  const T=await timings(r,it.s);const seg=T&&T.find(x=>x.a===it.a);const url=r.surahBase+pad(it.s,3)+'.mp3';
  if(!seg){stop(L('تعذر تحديد موضع هذه الآية في تسجيل ','Could not locate this ayah in the recording of ')+L(r.ar,r.en)+L('. يمكنك تشغيل السورة كاملة من بدايتها.','. You can play the whole surah from its start.'));offerFull(r,it.s,url);return}
  const sameFile=audio.src===url&&!audio.ended;
  audio.src=url;
  const go=()=>{if(seg)audio.currentTime=seg.s;audio.play().catch(()=>stop(L('تعذر تشغيل الصوت. تأكد من الإنترنت.','Could not play audio. Check your connection.')))};
  audio.addEventListener('loadedmetadata',go,{once:true});
  audio.ontimeupdate=()=>{if(!T||!st.active)return;const t=audio.currentTime;const idx=st.list.findIndex((x,k)=>k>=st.i&&x.s===it.s&&T.some(y=>y.a===x.a&&t>=y.s&&t<y.e));if(idx>=0&&idx!==st.i){st.i=idx;mark();setStatus(L('تلاوة ','Reciting ')+L(r.ar,r.en)+' · '+st.list[idx].s+':'+st.list[idx].a)}};
  audio.onended=()=>{if(st.active)stop(L('انتهت التلاوة','Recitation finished'))};
 }
}
function offerFull(r,s,url){document.querySelectorAll('.at-full').forEach(x=>x.remove());document.querySelectorAll('.at-status').forEach(box=>{const b=document.createElement('button');b.type='button';b.className='file-button at-full';b.textContent=L('تشغيل السورة كاملة','Play the whole surah');b.onclick=()=>{b.remove();stop();st={list:[{s,a:1}],i:0,active:true,fromRuq:false};audio.onended=()=>stop(L('انتهت التلاوة','Recitation finished'));audio.src=url;audio.play().then(()=>setStatus(L('تلاوة السورة كاملة · ','Reciting the whole surah · ')+L(r.ar,r.en))).catch(()=>stop(L('تعذر تشغيل الصوت.','Could not play audio.')))};box.after(b)})}
function startFrom(list,i,fromRuq){stop();st={list,i,active:true,fromRuq:!!fromRuq};playIndex(i)}
function surahList(s,from){const out=[];for(let a=from;a<=AC[s-1];a++)out.push({s,a});return out}

/* Reader: intercept the existing listen buttons so they use the chosen reciter and continue to the end of the surah. */
document.addEventListener('click',e=>{
 const b=e.target.closest('.qr-verse-controls .file-button');if(!b||!/^استماع/.test(b.textContent.trim()))return;
 const sel=document.querySelector('.qr-surah.qr-selected .qr-number');if(!sel)return;
 e.preventDefault();e.stopImmediatePropagation();
 const s=dig(sel.textContent),a=dig(b.textContent);
 if(st.active&&!st.fromRuq&&st.list[st.i]&&st.list[st.i].s===s&&st.list[st.i].a===a){stop(L('تم الإيقاف','Stopped'));return}
 startFrom(surahList(s,a),0,false)},true);

function recSelect(){const sel=document.createElement('select');sel.className='at-reciter';sel.setAttribute('aria-label','القارئ');
 for(const r of RECS){const o=document.createElement('option');o.value=r.id;o.textContent=L(r.ar,r.en);sel.append(o)}
 sel.value=rec().id;sel.addEventListener('change',()=>{localStorage.setItem(KEY,sel.value);document.querySelectorAll('.at-reciter').forEach(x=>x.value=sel.value);if(st.active){const l=st.list,i=st.i,f=st.fromRuq;startFrom(l,i,f)}});return sel}
function enhanceAudio(){const box=document.querySelector('.qr-audio');if(!box||box.querySelector('.at-reciter'))return;
 const strong=box.querySelector('strong');if(strong)strong.textContent=L('اختر القارئ','Choose reciter');
 const p=box.querySelector('.site-caption');if(p)p.textContent=L('اضغط «استماع» بجوار أي آية فتبدأ منها وتكمل بقية السورة تلقائيًا. يحتاج الصوت إلى الإنترنت.','Tap "listen" beside any ayah. It plays from there and continues to the end of the surah. Audio needs internet.');
 const chk=box.querySelector('.qr-check');if(chk)chk.style.display='none';
 const row=document.createElement('div');row.className='at-audio-row';row.append(recSelect());
 const stp=document.createElement('button');stp.type='button';stp.className='file-button';stp.textContent=L('إيقاف','Stop');stp.onclick=()=>stop(L('تم الإيقاف','Stopped'));row.append(stp);
 const status=document.createElement('p');status.className='at-status site-caption';status.setAttribute('aria-live','polite');const cr=document.createElement('p');cr.className='site-caption';cr.append(document.createTextNode(L('الصوت يُبث من ','Audio streams from ')));for(const [n,u] of [['everyayah.com','https://everyayah.com/'],['mp3quran.net','https://www.mp3quran.net/']]){const a=document.createElement('a');a.textContent=n;a.href=u;a.target='_blank';a.rel='noopener noreferrer';cr.append(a,document.createTextNode(' '))}box.append(row,status,cr)}

/* Ruqyah section */
const RUQ=[
 {t:['الفاتحة','Al-Fatiha'],ay:[[1,1],[1,7]],n:['سورة الفاتحة، وهي أصل ما يُقرأ في الرقية؛ ثبت في الصحيحين (البخاري ٥٧٣٦، مسلم ٢٢٠١) قصة الرجل الذي رقى لديغًا بالفاتحة فأُقرّ على ذلك.','Al-Fatiha is recited in ruqyah; the authentic narration of a man who recited it over a person stung by a scorpion is in Bukhari and Muslim.']},
 {t:['آية الكرسي','Ayat al-Kursi'],ay:[[2,255,255]],n:['ثبت في صحيح البخاري (٢٣١١) أن من قرأها عند النوم لم يزل عليه من الله حافظ ولا يقربه شيطان حتى يصبح.','Bukhari reports that whoever recites it at bedtime keeps a protector from Allah and no devil approaches until morning.']},
 {t:['خواتيم سورة البقرة','Last two verses of Al-Baqarah'],ay:[[2,285,286]],n:['ثبت في الصحيحين (البخاري ٥٠٠٩): «من قرأ بالآيتين من آخر سورة البقرة في ليلة كفتاه».','Bukhari 5009 and Muslim: whoever recites the two verses at the end of Al-Baqarah at night, they suffice him.']},
 {t:['الإخلاص والمعوذتان','Al-Ikhlas, Al-Falaq and An-Nas'],ay:[[112,1,4],[113,1,5],[114,1,6]],n:['ثبت في صحيح البخاري (٥٠١٦) عن عائشة رضي الله عنها أن النبي ﷺ كان إذا اشتكى قرأ على نفسه بالمعوذات ونفث.','Bukhari (Aisha): when the Prophet fell ill he recited the mu\u2019awwidhat over himself and blew lightly.']}
];
const DUA=[
 {a:'بِاسْمِ اللَّهِ أَرْقِيكَ مِنْ كُلِّ شَىْءٍ يُؤْذِيكَ مِنْ شَرِّ كُلِّ نَفْسٍ أَوْ عَيْنِ حَاسِدٍ اللَّهُ يَشْفِيكَ بِاسْمِ اللَّهِ أَرْقِيكَ',e:'Jibril\u2019s ruqyah for the Prophet',src:'رواه مسلم عن أبي سعيد الخدري رضي الله عنه',url:'https://sunnah.com/muslim:2186',cnt:''},
 {a:'اللَّهُمَّ رَبَّ النَّاسِ أَذْهِبِ الْبَاسَ، اشْفِهِ وَأَنْتَ الشَّافِي، لاَ شِفَاءَ إِلاَّ شِفَاؤُكَ، شِفَاءً لاَ يُغَادِرُ سَقَمًا',e:'Dua for the sick, with the right hand over them',src:'رواه البخاري عن عائشة رضي الله عنها',url:'https://sunnah.com/bukhari:5743',cnt:''},
 {a:'بِاسْمِ اللَّهِ',e:'Hand on the place of pain: say Bismillah',src:'رواه مسلم عن عثمان بن أبي العاص رضي الله عنه',url:'https://sunnah.com/muslim:2202',cnt:'٣ مرات'},
 {a:'أَعُوذُ بِاللَّهِ وَقُدْرَتِهِ مِنْ شَرِّ مَا أَجِدُ وَأُحَاذِرُ',e:'Then seek refuge in Allah',src:'رواه مسلم عن عثمان بن أبي العاص رضي الله عنه',url:'https://sunnah.com/muslim:2202',cnt:'٧ مرات'},
 {a:'أَسْأَلُ اللَّهَ الْعَظِيمَ رَبَّ الْعَرْشِ الْعَظِيمِ أَنْ يَشْفِيَكَ',e:'When visiting the sick',src:'رواه أبو داود والترمذي عن ابن عباس رضي الله عنهما، وصححه الألباني',url:'https://sunnah.com/abudawud:3106',cnt:'٧ مرات'},
 {a:'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',e:'On stopping at a new place',src:'رواه مسلم عن خولة بنت حكيم رضي الله عنها',url:'https://sunnah.com/muslim:2708',cnt:''}
];
function ruqSection(){const sec=document.createElement('section');sec.id='px-ruqyah';sec.className='platform-contact at-ruq';sec.dataset.sectionHidden='true';
 const h=(tag,cls,txt)=>{const x=document.createElement(tag);if(cls)x.className=cls;if(txt!=null)x.textContent=txt;return x};
 sec.append(h('h2','platform-section-heading',L('الرقية الشرعية','Ruqyah (Quran and authentic supplications)')));
 sec.append(h('p','site-caption',L('نصوص من القرآن والسنة الصحيحة فقط، مع المصدر. القراءة سبب وتعبّد، والشفاء بيد الله، ولا تغني عن مراجعة الطبيب. لا نضيف أعدادًا أو طقوسًا غير واردة.','Quran and authentic Sunnah only, each with its source. Recitation is worship and a means; healing is from Allah and does not replace seeing a doctor. No counts or rituals are added beyond what is reported.')));
 const bar=h('div','at-audio-row');bar.append(recSelect());
 const all=h('button','file-button',L('استماع لكل القراءات بالتتابع','Play all recitations in order'));all.type='button';
 const seq=[];for(const g of RUQ)for(const [s,f,t] of g.ay){const to=t||f;for(let a=f;a<=to;a++)seq.push({s,a})}
 /* ay entries: [s,from,to?]; Fatiha entry is [1,1],[1,7] meaning ayah 1 and ayah 7: expand fully */
 const full=[];for(let a=1;a<=7;a++)full.push({s:1,a});
 const real=[...full,...seq.filter(x=>x.s!==1)];
 all.onclick=()=>startFrom(real,0,true);bar.append(all);
 const stp=h('button','file-button',L('إيقاف','Stop'));stp.type='button';stp.onclick=()=>stop(L('تم الإيقاف','Stopped'));bar.append(stp);sec.append(bar,h('p','at-status site-caption'));
 sec.lastChild.setAttribute('aria-live','polite');
 for(const g of RUQ){const card=h('article','at-ruq-card');card.append(h('h3',null,L(g.t[0],g.t[1])));
  const list=[];for(const [s,f,t] of g.ay){if(s===1){for(let a=1;a<=7;a++)list.push({s,a});break}const to=t||f;for(let a=f;a<=to;a++)list.push({s,a})}
  const body=h('p','at-ruq-text');for(const it of list){const sp=h('span','at-ruq-ayah',TXT[it.s+':'+it.a]+' ﴿'+it.a+'﴾ ');sp.dataset.ruq=it.s+':'+it.a;body.append(sp)}
  card.append(body);card.append(h('p','site-caption',L(g.n[0],g.n[1])));
  const pb=h('button','file-button',L('استماع','Listen'));pb.type='button';pb.onclick=()=>startFrom(list,0,true);card.append(pb);sec.append(card)}
 const dh=h('h3','platform-section-heading',L('أدعية ثابتة من السنة','Reported supplications'));sec.append(dh);
 for(const d of DUA){const c=h('article','at-ruq-card');c.append(h('p','at-ruq-text',d.a));if(d.cnt)c.append(h('p','site-caption',L('العدد الوارد: ','Reported count: ')+d.cnt));const sp=h('p','site-caption',d.src+' · ');const al=h('a',null,'sunnah.com');al.href=d.url;al.target='_blank';al.rel='noopener noreferrer';sp.append(al);c.append(sp);sec.append(c)}
 const cr=h('p','site-caption',L('الصوت يُبث مباشرة ولا يُحمَّل ولا يُخزَّن: تسجيلات الآيات من ','Audio is streamed live and never downloaded or stored: ayah recordings from '));for(const [n,u] of [['everyayah.com','https://everyayah.com/'],['mp3quran.net','https://www.mp3quran.net/']]){const a=h('a',null,n);a.href=u;a.target='_blank';a.rel='noopener noreferrer';cr.append(a,document.createTextNode(' '))}cr.append(document.createTextNode(L('وحقوقها لأصحابها.','; rights belong to their owners.')));sec.append(cr);
 sec.append(h('p','site-caption',L('نصوص الأدعية منقولة من متون الأحاديث المذكورة. القرآن مأخوذ بالرسم العثماني. التلاوة الصوتية من مصادر خارجية وتحتاج إلى الإنترنت.','Supplication wording is copied from the hadith texts cited. Quran text is Uthmani script. Recitation audio comes from external sources and needs internet.')));
 return sec}
function routeRuq(){const nav=document.getElementById('platform-navigation');const main=document.querySelector('main.site-card');if(!nav||!main||!document.getElementById('site-contact'))return;
 if(!document.getElementById('px-ruqyah')){main.append(ruqSection());
  const a=document.createElement('a');a.href='#/ruqyah';a.id='nav-ruqyah';a.innerHTML='<span class="platform-nav-icon" aria-hidden="true">❖</span><span class="platform-nav-label">'+L('الرقية','Ruqyah')+'<small>'+L('قرآن وأدعية ثابتة بالصوت','Quran and reported duas with audio')+'</small></span>';nav.append(a)}
 const on=location.hash==='#/ruqyah';const sec=document.getElementById('px-ruqyah');
 if(sec&&sec.dataset.sectionHidden!==String(!on))sec.dataset.sectionHidden=String(!on);
 const hide=(sel)=>{const el=document.querySelector(sel);if(el&&on&&el.dataset.sectionHidden!=='true')el.dataset.sectionHidden='true'};
 if(on){hide('.qr-site-search');hide('.qr-sources');
  document.querySelectorAll('.qr-enter').forEach(e=>{e.dataset.sectionHidden='true'});
  document.body.dataset.page='ruqyah'}else{document.querySelectorAll('.qr-enter[data-section-hidden=true]').forEach(e=>{if(document.body.dataset.page==='mushaf')delete e.dataset.sectionHidden})}
 const n=document.getElementById('nav-ruqyah');if(n)n.setAttribute('aria-current',on?'page':'false');
 if(on&&last!==location.hash){last=location.hash;requestAnimationFrame(()=>sec&&sec.scrollIntoView({block:'start',behavior:'instant'}))}if(!on)last=''}
let last='';

/* Version badge and update button. Clears only this app's offline cache and service worker, never personal data. */
function badge(){const f=document.querySelector('.site-footer');if(!f||document.getElementById('at-version'))return;
 const d=document.createElement('p');d.id='at-version';d.className='site-caption at-version';
 d.append(document.createTextNode(L('الإصدار ','Version ')+VERSION+' · '));
 const b=document.createElement('button');b.type='button';b.className='file-button';b.textContent=L('تحديث الموقع الآن','Update the site now');
 b.onclick=async()=>{b.disabled=true;b.textContent=L('جارٍ التحديث…','Updating…');try{const rs=await navigator.serviceWorker.getRegistrations();await Promise.all(rs.map(r=>r.unregister()));const ks=await caches.keys();await Promise.all(ks.filter(k=>k.startsWith('quran-kareem-offline-')).map(k=>caches.delete(k)))}catch(e){}
  location.replace(location.pathname+'?fresh='+Date.now()+location.hash)};
 const note=document.createElement('span');note.textContent=' '+L('(علاماتك وملاحظاتك ومفضلتك لا تُمسح)','(your bookmark, notes and favourites are kept)');d.append(b,note);f.append(d)}
const css=document.createElement('style');css.textContent='.platform-mushaf .qr-audio{display:block!important}.at-audio-row{display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin:10px 0}.at-reciter{min-height:44px;padding:8px 12px;border-radius:12px;border:1px solid currentColor;background:transparent;color:inherit;font:inherit;max-width:100%}.at-playing{outline:3px solid var(--platform-green,#0a6b55);outline-offset:4px;border-radius:12px}.at-ruq-card{margin:14px 0;padding:16px;border:1px solid rgba(127,127,127,.35);border-radius:16px}.at-ruq-text{font-family:Amiri,serif;font-size:1.5rem;line-height:2.3;direction:rtl;text-align:right}.at-ruq-now{background:rgba(10,107,85,.18);border-radius:8px}.at-version{margin-top:14px}.at-ruq-card h3{margin:0 0 8px}@media(max-width:700px){.qr-nav{grid-template-columns:repeat(2,minmax(0,1fr))}}';document.head.append(css);
function tick(){try{enhanceAudio();routeRuq();badge()}catch(e){}}
new MutationObserver(tick).observe(document.body,{childList:true,subtree:true});addEventListener('hashchange',()=>{tick();if(location.hash!=='#/ruqyah'&&st.fromRuq&&st.active)stop('')});tick();
})();
