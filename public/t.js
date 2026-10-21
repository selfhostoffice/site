(function(){try{var q=new URLSearchParams(location.search),S=sessionStorage;['utm_source','utm_campaign'].forEach(function(k){var v=q.get(k);if(v)S.setItem(k,v)})}catch(e){}
function send(d){try{d.path=location.pathname;d.utm_source=sessionStorage.getItem('utm_source');d.utm_campaign=sessionStorage.getItem('utm_campaign');var b=JSON.stringify(d);if(!(navigator.sendBeacon&&navigator.sendBeacon('/api/track',new Blob([b],{type:'application/json'}))))fetch('/api/track',{method:'POST',body:b,headers:{'content-type':'application/json'},keepalive:true})}catch(e){}}
window.shoTrack=send;
document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href]');if(!a)return;var h=a.getAttribute('href'),t=a.dataset.track,tool=a.dataset.tool||null;
if(!t){if(/^\/claim\//.test(h))t='claim_cta';else if(a.host&&a.host!==location.host&&a.dataset.tool)t='outbound';}
if(t)send({type:t,tool:tool||(h.match(/tool=([^&]+)/)||[])[1]||null,kind:a.dataset.kind||null,href:a.href})},true)})();
