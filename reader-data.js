/* Verified Quran text and sourced word meanings. Full notices in decoded data and reader-sources.txt. */
window.AT_READER_READY=(async()=>{
 window.AT_READER_PACK=[];
 for(let i=1;i<=3;i++)await new Promise((resolve,reject)=>{const s=document.createElement('script');s.src='./reader-data-'+i+'.js?v=32';s.onload=resolve;s.onerror=reject;document.head.append(s)});
 const bytes=Uint8Array.from(atob(window.AT_READER_PACK.join('')),c=>c.charCodeAt(0));
 const text=await new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))).text();
 const hash=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(text)))).map(x=>x.toString(16).padStart(2,'0')).join('');
 if(hash!=='0e88f63ccb75b7631bf1d776d8a211bf36d131390f361f891d5f14619d572a59')throw new Error('Reader data integrity check failed');
 window.AT_READER_DATA=JSON.parse(text);delete window.AT_READER_PACK;return window.AT_READER_DATA;
})();
