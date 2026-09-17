<script>
(function(){
  // ---- when the can goes on the shelf. change this one line to move the date ----
  var LAUNCH = Date.parse('2026-09-17T18:00:00Z');   // 17 September 2026, 18:00 UTC

  var V={
    check:  document.getElementById('view-check'),
    token:  document.getElementById('view-token'),
    wallets:document.getElementById('view-wallets')
  };
  if(!V.check||!V.token||!V.wallets) return;

  // ---------------- the clock ----------------
  var cd=document.getElementById('cd');
  function two(n){ return (n<10?'0':'')+n; }
  function tickClock(){
    if(!cd) return;
    var left=LAUNCH-Date.now();
    if(!(left>0)){ cd.classList.add('open'); return; }
    var s=Math.floor(left/1000);
    var d=Math.floor(s/86400); s-=d*86400;
    var h=Math.floor(s/3600);  s-=h*3600;
    var m=Math.floor(s/60);    s-=m*60;
    document.getElementById('cdD').textContent=two(d);
    document.getElementById('cdH').textContent=two(h);
    document.getElementById('cdM').textContent=two(m);
    document.getElementById('cdS').textContent=two(s);
  }
  tickClock(); setInterval(tickClock,1000);

  // ---------------- three views, one file ----------------
  var WHERE={dented:'token', steps:'token', wallets:'wallets'};
  function viewFor(hash){ return WHERE[hash]||'check'; }

  function showView(name,anchor){
    for(var k in V) V[k].hidden = (k!==name);
    var tabs=document.querySelectorAll('.nav a.tab');
    for(var i=0;i<tabs.length;i++){
      var h=(tabs[i].getAttribute('href')||'').replace('#','');
      tabs[i].classList.toggle('on', viewFor(h)===name && (name!=='check'||h==='check'));
    }
    if(window.__dentedReveal) window.__dentedReveal(V[name]);
    if(anchor){
      var el=document.getElementById(anchor);
      if(el){ el.scrollIntoView({behavior:'auto',block:'start'}); return; }
    }
    window.scrollTo(0,0);
  }

  function route(){
    var h=(location.hash||'').replace('#','').split('?')[0];
    var v=viewFor(h);
    showView(v, (h && h!=='dented' && h!=='wallets' && document.getElementById(h))? h : null);
  }

  document.addEventListener('click',function(ev){
    var a=ev.target.closest? ev.target.closest('a[href^="#"]') : null;
    if(!a) return;
    var h=(a.getAttribute('href')||'').replace('#','');
    if(!h) return;
    ev.preventDefault();
    if(location.hash!=='#'+h) history.pushState(null,'','#'+h);
    var v=viewFor(h);
    showView(v, (h!=='dented' && h!=='wallets' && document.getElementById(h))? h : null);
  },false);

  window.addEventListener('popstate',route);
  window.addEventListener('hashchange',route);

  // a row in the wallet feed jumps straight to the condition report
  window.__dentedCheck=function(addr){
    if(!addr) return;
    history.pushState(null,'','#check');
    showView('check',null);
    var inp=document.getElementById('addr');
    if(inp) inp.value=addr;
    if(window.__dentedRun) window.__dentedRun(addr);
    var out=document.getElementById('out');
    if(out) try{ out.scrollIntoView({behavior:'smooth',block:'start'}); }catch(e){}
  };

  if(/[?&]t=0x/i.test(location.search)) showView('check',null);
  else route();
})();
</script>
