/* Athar Tayeb v27: continuous full-surah playback for every reciter, surah download, Ruqyah section, version badge and safe update button.
   Adds behaviour only. The Quran bundle and existing data are not modified. Personal data in localStorage is never touched here. */
(()=>{
'use strict';
const VERSION='27';
const AC=[7,286,200,176,120,165,206,75,129,109,123,111,43,52,99,128,111,110,98,135,112,78,118,64,77,227,93,88,69,60,34,30,73,54,45,83,182,88,75,85,54,53,89,59,37,35,38,29,18,45,60,49,62,55,78,96,29,22,24,13,14,11,11,18,12,12,30,52,52,44,28,28,20,56,40,31,50,40,46,42,29,19,36,25,22,17,19,26,30,20,15,21,11,8,8,19,5,8,8,11,11,8,3,9,5,4,7,3,6,3,5,4,5,6];
const RECS=[
 {id:'basit',ar:'عبد الباسط عبد الصمد (مرتل)',en:'Abdul Basit Abdus-Samad (Murattal)',read:51,base:'https://cdn.mp3quran.net/audio/abdulbasit-abdulsamad/r3/'},
 {id:'maher',ar:'ماهر المعيقلي',en:'Maher Al-Muaiqly',read:102,base:'https://cdn.mp3quran.net/audio/maher-muaiqly/r1/'},
 {id:'husary',ar:'محمود خليل الحصري',en:'Mahmoud Khalil Al-Husary',read:118,base:'https://cdn.mp3quran.net/audio/mahmoud-husary/r1/'},
 {id:'dosari',ar:'ياسر الدوسري',en:'Yasser Ad-Dossari',read:92,base:'https://cdn.mp3quran.net/audio/yasser-dosari/r1/'},
 {id:'jalil',ar:'خالد الجليل',en:'Khalid Al-Jalil',read:20,base:'https://cdn.mp3quran.net/audio/khalid-jalil/r1/'},
 {id:'alafasy',ar:'مشاري العفاسي',en:'Mishary Alafasy',read:123,base:'https://cdn.mp3quran.net/audio/mishary-alafasy/r1/'},
 {id:'salimi',ar:'منصور السالمي',en:'Mansour Al-Salimi',read:245,base:'https://cdn.mp3quran.net/audio/mansour-salimi/r1/'},
 {id:'minshawi',ar:'محمد صديق المنشاوي (مرتل)',en:'Muhammad Siddiq Al-Minshawi (Murattal)',read:112,base:'https://cdn.mp3quran.net/audio/muhammad-minshawi/r1/'},
 {id:'ghamdi',ar:'سعد الغامدي',en:'Saad Al-Ghamdi',read:30,base:'https://cdn.mp3quran.net/audio/saad-ghamdi/r1/'},
 {id:'sudais',ar:'عبد الرحمن السديس',en:'Abdul Rahman Al-Sudais',read:54,base:'https://cdn.mp3quran.net/audio/abdulrahman-sudais/r1/'},
 {id:'shuraim',ar:'سعود الشريم',en:'Saud Al-Shuraim',read:31,base:'https://cdn.mp3quran.net/audio/saud-shuraim/r1/'},
 {id:'ajmi',ar:'أحمد بن علي العجمي',en:'Ahmed ibn Ali Al-Ajmi',read:5,base:'https://cdn.mp3quran.net/audio/ahmad-ajmi/r1/'},
 {id:'qatami',ar:'ناصر القطامي',en:'Nasser Al-Qatami',read:86,base:'https://cdn.mp3quran.net/audio/nasser-qatami/r1/'}
];
const KEY='athar-reciter-v22';
const TXT={"2:255": "ٱللَّهُ لَآ إِلَٰهَ إِلَّا هُوَ ٱلْحَىُّ ٱلْقَيُّومُ ۚ لَا تَأْخُذُهُۥ سِنَةٌۭ وَلَا نَوْمٌۭ ۚ لَّهُۥ مَا فِى ٱلسَّمَٰوَٰتِ وَمَا فِى ٱلْأَرْضِ ۗ مَن ذَا ٱلَّذِى يَشْفَعُ عِندَهُۥٓ إِلَّا بِإِذْنِهِۦ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَىْءٍۢ مِّنْ عِلْمِهِۦٓ إِلَّا بِمَا شَآءَ ۚ وَسِعَ كُرْسِيُّهُ ٱلسَّمَٰوَٰتِ وَٱلْأَرْضَ ۖ وَلَا يَـُٔودُهُۥ حِفْظُهُمَا ۚ وَهُوَ ٱلْعَلِىُّ ٱلْعَظِيمُ", "2:285": "ءَامَنَ ٱلرَّسُولُ بِمَآ أُنزِلَ إِلَيْهِ مِن رَّبِّهِۦ وَٱلْمُؤْمِنُونَ ۚ كُلٌّ ءَامَنَ بِٱللَّهِ وَمَلَٰٓئِكَتِهِۦ وَكُتُبِهِۦ وَرُسُلِهِۦ لَا نُفَرِّقُ بَيْنَ أَحَدٍۢ مِّن رُّسُلِهِۦ ۚ وَقَالُوا۟ سَمِعْنَا وَأَطَعْنَا ۖ غُفْرَانَكَ رَبَّنَا وَإِلَيْكَ ٱلْمَصِيرُ", "2:286": "لَا يُكَلِّفُ ٱللَّهُ نَفْسًا إِلَّا وُسْعَهَا ۚ لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا ٱكْتَسَبَتْ ۗ رَبَّنَا لَا تُؤَاخِذْنَآ إِن نَّسِينَآ أَوْ أَخْطَأْنَا ۚ رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَآ إِصْرًۭا كَمَا حَمَلْتَهُۥ عَلَى ٱلَّذِينَ مِن قَبْلِنَا ۚ رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِۦ ۖ وَٱعْفُ عَنَّا وَٱغْفِرْ لَنَا وَٱرْحَمْنَآ ۚ أَنتَ مَوْلَىٰنَا فَٱنصُرْنَا عَلَى ٱلْقَوْمِ ٱلْكَٰفِرِينَ", "1:1": "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ", "1:2": "ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ", "1:3": "ٱلرَّحْمَٰنِ ٱلرَّحِيمِ", "1:4": "مَٰلِكِ يَوْمِ ٱلدِّينِ", "1:5": "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", "1:6": "ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ", "1:7": "صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ", "112:1": "قُلْ هُوَ ٱللَّهُ أَحَدٌ", "112:2": "ٱللَّهُ ٱلصَّمَدُ", "112:3": "لَمْ يَلِدْ وَلَمْ يُولَدْ", "112:4": "وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ", "113:1": "قُلْ أَعُوذُ بِرَبِّ ٱلْفَلَقِ", "113:2": "مِن شَرِّ مَا خَلَقَ", "113:3": "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ", "113:4": "وَمِن شَرِّ ٱلنَّفَّٰثَٰتِ فِى ٱلْعُقَدِ", "113:5": "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ", "114:1": "قُلْ أَعُوذُ بِرَبِّ ٱلنَّاسِ", "114:2": "مَلِكِ ٱلنَّاسِ", "114:3": "إِلَٰهِ ٱلنَّاسِ", "114:4": "مِن شَرِّ ٱلْوَسْوَاسِ ٱلْخَنَّاسِ", "114:5": "ٱلَّذِى يُوَسْوِسُ فِى صُدُورِ ٱلنَّاسِ", "114:6": "مِنَ ٱلْجِنَّةِ وَٱلنَّاسِ"};
const pad=(n,l)=>String(n).padStart(l,'0');
const dig=s=>Number(String(s).replace(/[٠-٩]/g,d=>'٠١٢٣٤٥٦٧٨٩'.indexOf(d)).replace(/\D/g,''));
const isEn=()=>document.documentElement.lang==='en';
const L=(a,e)=>isEn()?e:a;
const rec=()=>RECS.find(r=>r.id===localStorage.getItem(KEY))||RECS[5];
let audio=new Audio();audio.preload='auto';window.atPlayer={audio,state:()=>st};
let st={list:null,i:0,active:false,T:null,fromRuq:false};
let gen=0;
const cache={};
const surahUrl=(r,s)=>r.base+pad(s,3)+'.mp3';
/* Normalize the timing list to {ayah:{s,e}} in seconds. Some recordings carry an intro segment numbered 0;
   some (e.g. Al-Husary's Al-Fatiha) count the basmalah as 0 and shift the rest, detected by count/max. */
function normTiming(j,n){if(!Array.isArray(j)||!j.length)return null;
 const by={};for(const x of j){const a=Number(x.ayah);if(a>=1&&a<=n&&!by[a])by[a]={s:x.start_time/1000,e:x.end_time/1000}};
 let ok=true;for(let a=1;a<=n;a++)if(!by[a]){ok=false;break}
 if(ok)return by;
 const nums=j.map(x=>Number(x.ayah));
 if(j.length===n&&Math.min.apply(null,nums)===0&&Math.max.apply(null,nums)===n-1){const out={};for(const x of j)out[Number(x.ayah)+1]={s:x.start_time/1000,e:x.end_time/1000};return out}
 return null}
async function timings(r,s){const k=r.id+':'+s;if(k in cache)return cache[k];let out=null;
 try{const j=await (await fetch('https://www.mp3quran.net/api/v3/ayat_timing?read='+r.read+'&surah='+s)).json();out=normTiming(j,AC[s-1])}catch(e){}
 cache[k]=out;return out}
function setStatus(t){document.querySelectorAll('.at-status').forEach(e=>e.textContent=t)}
function mark(){document.querySelectorAll('.at-playing').forEach(e=>e.classList.remove('at-playing'));document.querySelectorAll('.at-ruq-now').forEach(e=>e.classList.remove('at-ruq-now'));if(!st.active)return;const it=st.list[st.i];if(!it)return;
 const sel=document.querySelector('.qr-surah.qr-selected .qr-number');const cur=sel?dig(sel.textContent):0;
 if(cur===it.s){const v=document.querySelectorAll('.qr-verses .qr-verse')[it.a-1];if(v){v.classList.add('at-playing');if(!st.fromRuq)v.scrollIntoView({block:'center',behavior:document.documentElement.dataset.motion==='off'?'instant':'smooth'})}}
 const n=document.querySelector('[data-ruq="'+it.s+':'+it.a+'"]');if(n)n.classList.add('at-ruq-now')}
function stop(msg){gen++;document.querySelectorAll('.at-full').forEach(x=>x.remove());st.active=false;audio.pause();audio.onended=audio.ontimeupdate=null;mark();setStatus(msg||'')}
/* Split an ordered ayah list into runs of consecutive ayahs inside one surah; each run plays from the same continuous file. */
function segmentsOf(list,i0){const seg=[];for(let k=i0;k<list.length;k++){const it=list[k];const last=seg[seg.length-1];
 if(last&&last.s===it.s&&it.a===last.to+1)last.to=it.a;else seg.push({s:it.s,from:it.a,to:it.a,idx0:k})}return seg}
async function playSeg(k,g){
 if(g!==gen||!st.active)return;
 if(k>=st.segs.length){stop(L('انتهت التلاوة','Recitation finished'));return}
 st.segK=k;const seg=st.segs[k],r=rec();st.i=seg.idx0;mark();
 audio.onended=audio.ontimeupdate=null;
 setStatus(L('تلاوة ','Reciting ')+L(r.ar,r.en)+' · '+st.list[seg.idx0].s+':'+st.list[seg.idx0].a);
 const T=await timings(r,seg.s);if(g!==gen||!st.active)return;
 st.T=T;
 const url=surahUrl(r,seg.s);
 const seek=(T&&seg.from>1)?T[seg.from].s:0;
 const endAt=T?T[seg.to].e:null;
 if(audio.dataset.cur!==url){audio.src=url;audio.dataset.cur=url}
 const begin=()=>{if(g!==gen||!st.active)return;
  try{if(seek>0&&isFinite(audio.duration)&&audio.duration>seek)audio.currentTime=seek}catch(e){}
  audio.play().catch(()=>{if(g===gen&&st.active)stop(L('تعذر تشغيل الصوت. تأكد من الإنترنت ثم اضغط التشغيل مرة أخرى.','Could not play audio. Check your connection and tap play again.'))})};
 if(audio.readyState>=1)begin();else audio.addEventListener('loadedmetadata',begin,{once:true});
 if(T){
  audio.ontimeupdate=()=>{if(g!==gen||!st.active)return;const t=audio.currentTime;
   if(endAt!=null&&t>=endAt-0.2){playSeg(k+1,g);return}
   for(let a=seg.from;a<=seg.to;a++){const w=T[a];if(w&&t>=w.s&&t<w.e){const idx=seg.idx0+(a-seg.from);if(idx!==st.i){st.i=idx;mark();setStatus(L('تلاوة ','Reciting ')+L(r.ar,r.en)+' · '+seg.s+':'+a)}break}}};
 }else{
  setStatus(L('تلاوة ','Reciting ')+L(r.ar,r.en)+L(' · السورة كاملة من بدايتها — مواضع الآيات غير متاحة لهذا القارئ.',' · the whole surah from its start — ayah positions unavailable for this reciter.'))}
 audio.onended=()=>{if(g===gen&&st.active)playSeg(k+1,g)};
}
function startFrom(list,i,fromRuq){stop();st={list,i,active:true,fromRuq:!!fromRuq,T:null,segs:segmentsOf(list,i),segK:0};playSeg(0,gen)}
function surahList(s,from){const out=[];for(let a=from;a<=AC[s-1];a++)out.push({s,a});return out}
function selectedSurah(){const sel=document.querySelector('.qr-surah.qr-selected .qr-number');return sel?dig(sel.textContent):0}

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
/* Download the whole surah as one MP3 with the chosen reciter. mp3quran's CDN allows cross-origin fetches, so the browser saves a real file. */
let dlBusy=false;
async function downloadSurah(btn){
 if(dlBusy)return;
 const s=selectedSurah();if(!s){setStatus(L('اختر السورة من الفهرس أولًا.','Choose a surah from the index first.'));return}
 const r=rec(),url=surahUrl(r,s);
 const h=document.querySelector('.qr-reader-head h2');
 const base=((h?h.textContent.trim():'')||L('سورة','Surah')+' '+s)+' - '+L(r.ar,r.en);
 const name=base.replace(/[\\/:*?"<>|]/g,'')+'.mp3';
 dlBusy=true;const old=btn.textContent;btn.disabled=true;
 try{
  const res=await fetch(url);if(!res.ok)throw new Error('http');
  const total=Number(res.headers.get('content-length'))||0;let blob;
  if(res.body&&res.body.getReader){const rd=res.body.getReader(),parts=[];let got=0;
   for(;;){const x=await rd.read();if(x.done)break;parts.push(x.value);got+=x.value.length;
    btn.textContent=L('جارٍ التحميل… ','Downloading… ')+Math.floor(got/1048576)+(total?'/'+Math.ceil(total/1048576):'')+L(' م.ب',' MB')}
   blob=new Blob(parts,{type:'audio/mpeg'});
  }else blob=await res.blob();
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;document.body.append(a);a.click();a.remove();
  setTimeout(()=>URL.revokeObjectURL(a.href),60000);
  setStatus(L('تم تنزيل ','Downloaded ')+name);
 }catch(e){
  setStatus(L('تعذر التنزيل المباشر؛ فُتح الملف في تبويب جديد، احفظه من قائمة المتصفح.','Direct download failed; the file opened in a new tab, save it from the browser menu.'));
  window.open(url,'_blank','noopener');
 }finally{dlBusy=false;btn.disabled=false;btn.textContent=old}}

function enhanceAudio(){const box=document.querySelector('.qr-audio');if(!box||box.querySelector('.at-reciter'))return;
 const strong=box.querySelector('strong');if(strong)strong.textContent=L('اختر القارئ','Choose reciter');
 const p=box.querySelector('.site-caption');if(p)p.textContent=L('اضغط «تشغيل السورة كاملة» واستمع من غير توقف بين الآيات، أو «استماع» بجوار أي آية لتبدأ منها وتكمل السورة. التشغيل يحتاج إنترنت، وزر التحميل يحفظ السورة على جهازك.','Tap "Play the whole surah" to listen without pauses between verses, or "listen" beside any ayah to start there and continue to the end. Playback needs internet; the download button saves the surah to your device.');
 const chk=box.querySelector('.qr-check');if(chk)chk.style.display='none';
 const row=document.createElement('div');row.className='at-audio-row';row.append(recSelect());
 const play=document.createElement('button');play.type='button';play.className='file-button';play.textContent=L('تشغيل السورة كاملة','Play the whole surah');
 play.onclick=()=>{const s=selectedSurah();if(s)startFrom(surahList(s,1),0,false)};row.append(play);
 const dlb=document.createElement('button');dlb.type='button';dlb.className='file-button';dlb.textContent=L('تحميل السورة','Download surah');
 dlb.onclick=()=>downloadSurah(dlb);row.append(dlb);
 const stp=document.createElement('button');stp.type='button';stp.className='file-button';stp.textContent=L('إيقاف','Stop');stp.onclick=()=>stop(L('تم الإيقاف','Stopped'));row.append(stp);
 const status=document.createElement('p');status.className='at-status site-caption';status.setAttribute('aria-live','polite');const cr=document.createElement('p');cr.className='site-caption';cr.append(document.createTextNode(L('الصوت يُبث ويُنزَّل من ','Audio streams and downloads from ')));const cra=document.createElement('a');cra.textContent='mp3quran.net';cra.href='https://www.mp3quran.net/';cra.target='_blank';cra.rel='noopener noreferrer';cr.append(cra);box.append(row,status,cr)}

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
 const cr=h('p','site-caption',L('الصوت يُبث مباشرة من ','Audio streams live from '));const ra=h('a',null,'mp3quran.net');ra.href='https://www.mp3quran.net/';ra.target='_blank';ra.rel='noopener noreferrer';cr.append(ra,document.createTextNode(L(' وحقوقها لأصحابها.','; rights belong to their owners.')));sec.append(cr);
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
