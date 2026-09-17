<script>
(function(){
  var BS='https://robinhoodchain.blockscout.com/api/v2';
  var SCAN='https://robinhoodchain.blockscout.com';

  // handles, ranking and style come from the FOMO Radar leaderboard — somebody else's
  // opinion, shown as such. the fills below are read off the chain by this page.
  var WALLETS=[
    {h:'unipcs',        a:'0x0a6ebed0155edb4b21d92ad02897a626cd90119e', s:96, st:'sniper/holder'},
    {h:'ogle',          a:'0x1bcc5f67cd17e13770f199fa03bc043b0cde1143', s:91, st:'holder/swing'},
    {h:'theveeman',     a:'0xa0670863bd5cd0d60022bab2eed78e81e1a06bce', s:91, st:'holder/swing'},
    {h:'0xAvast',       a:'0xcc0c581613dfd4ace7c8686668427236f8bd5cc5', s:90, st:'holder/swing'},
    {h:'AvgJoesCrypto', a:'0x06de9c48b1e639ed5c13ec8fbd4080a38e39f2d1', s:89, st:'holder/swing'},
    {h:'The__Solstice', a:'0xd1c77a04b87393e98a1220532e72e8f7d0a31c5a', s:89, st:'holder/swing'},
    {h:'motiyawerey',   a:'0xe07be4390e3478e12cb1124ed011e769a3366e16', s:88, st:'sniper/swing'},
    {h:'Aurelius0121',  a:'0x0c175c6a0065ee05f871a68783d2de432a1e6cbe', s:88, st:'holder/swing'},
    {h:'hungryghost',   a:'0xf2ccb8d5e6cd8a3aeb64008e8f400611cbe2cd6c', s:88, st:'sniper/swing'},
    {h:'drugo',         a:'0xffd43c97dec40e5e5db2d9c159bebb2bb25d251a', s:88, st:'sniper/scalper'},
    {h:'cosby',         a:'0xf1882812aacac1df9a58195dbbd2f97fe48f81f2', s:87, st:'holder'},
    {h:'soby0x',        a:'0x0f9a7a53b36daf1f52fe7a616ea4b25c532d2fd2', s:87, st:'holder'}
  ];
  // the other leg of a swap: plumbing, not a position
  var QUOTE=/^(USDG|WETH|ETH|WBTC|USDC|USDT|DAI)$/i;

  var rowsEl=document.getElementById('wfrows');
  if(!rowsEl) return;
  var stampEl=document.getElementById('wfstamp'),
      countEl=document.getElementById('wfcount'),
      listEl=document.getElementById('wlist'),
      btn=document.getElementById('alertBtn'),
      note=document.getElementById('alertNote'),
      toasts=document.getElementById('toasts');

  var seen={}, events=[], alertsOn=false, primed=false, idx=0, timer=null, audio=null, queue=[];

  // ---------- the watched list ----------
  if(listEl) WALLETS.forEach(function(w){
    var d=document.createElement('a');
    d.className='wcard'; d.href=SCAN+'/address/'+w.a;
    d.target='_blank'; d.rel='noopener noreferrer'; d.style.textDecoration='none';
    d.innerHTML='<div class="h"><b>'+w.h.replace(/[<>&]/g,'')+'</b><i>score '+w.s+'</i></div>'+
      '<div class="ad">'+w.a.slice(0,10)+'…'+w.a.slice(-6)+'</div>'+
      '<div class="st">'+w.st+'</div>';
    listEl.appendChild(d);
  });

  // ---------- helpers ----------
  function ago(ms){
    var s=Math.max(0,(Date.now()-ms)/1000);
    if(s<60) return Math.round(s)+'s ago';
    if(s<3600) return Math.round(s/60)+'m ago';
    if(s<86400) return Math.round(s/3600)+'h ago';
    return Math.round(s/86400)+'d ago';
  }
  function amount(v,dec){
    var n;
    try{ n=Number(BigInt(v))/Math.pow(10,parseInt(dec||'18',10)); }catch(e){ n=0; }
    if(!isFinite(n)) return '';
    if(n>=1e9) return (n/1e9).toFixed(2)+'B';
    if(n>=1e6) return (n/1e6).toFixed(2)+'M';
    if(n>=1e3) return (n/1e3).toFixed(1)+'k';
    if(n>=1)   return n.toFixed(2);
    return n.toPrecision(3);
  }
  function jget(u){
    return fetch(u,{headers:{accept:'application/json'}}).then(function(r){
      if(!r.ok) throw new Error('HTTP '+r.status);
      return r.json();
    });
  }
  function openCheck(addr,el){
    if(!addr) return;
    if(navigator.clipboard&&navigator.clipboard.writeText){
      navigator.clipboard.writeText(addr).catch(function(){});
    }
    if(el){ el.classList.add('copied'); var l3=el.querySelector('.l3'); if(l3) l3.textContent='address copied · opening the check'; }
    if(window.__dentedCheck) window.__dentedCheck(addr);
    else window.open(SCAN+'/token/'+addr,'_blank','noopener');
  }

  // ---------- sound ----------
  function blip(up){
    try{
      if(!audio){
        var AC=window.AudioContext||window.webkitAudioContext;
        if(!AC) return;
        audio=new AC();
      }
      if(audio.state==='suspended') audio.resume();
      var t=audio.currentTime;
      var o=audio.createOscillator(), g=audio.createGain();
      o.type='square';
      o.frequency.setValueAtTime(up?660:392,t);
      o.frequency.setValueAtTime(up?880:294,t+0.09);
      g.gain.setValueAtTime(0.0001,t);
      g.gain.exponentialRampToValueAtTime(0.07,t+0.02);
      g.gain.exponentialRampToValueAtTime(0.0001,t+0.22);
      o.connect(g); g.connect(audio.destination);
      o.start(t); o.stop(t+0.24);
    }catch(e){}
  }

  // ---------- the side alerts ----------
  function toast(ev){
    if(!toasts) return;
    var b=document.createElement('button');
    b.type='button'; b.className='toast '+(ev.buy?'buy':'sell');
    b.innerHTML='<div class="l1"><b>'+ev.who+'</b><i>'+(ev.buy?'BOUGHT':'SOLD')+'</i><u>'+ago(ev.t)+'</u></div>'+
      '<div class="l2">$'+ev.sym+' <span>'+ev.amt+'</span></div>'+
      '<div class="l3">click to copy the address and check it</div>'+
      '<div class="bar"></div>';
    b.addEventListener('click',function(){ openCheck(ev.token,b); });
    toasts.appendChild(b);
    while(toasts.children.length>4) drop(toasts.firstChild);
    setTimeout(function(){ drop(b); },12000);
    blip(ev.buy);
  }
  function drop(el){
    if(!el||el.__going) return;
    el.__going=1; el.classList.add('out');
    setTimeout(function(){ if(el.parentNode) el.parentNode.removeChild(el); },340);
  }

  // ---------- feed rows ----------
  function addRow(ev,fresh){
    var b=document.createElement('button');
    b.type='button'; b.className='wrow'+(fresh?' fresh':'');
    b.innerHTML=
      '<span class="who">'+ev.who+'</span>'+
      '<span class="act '+(ev.buy?'buy':'sell')+'">'+(ev.buy?'BOUGHT':'SOLD')+'</span>'+
      '<span class="what"><b>$'+ev.sym+'</b> <span>'+ev.amt+'</span></span>'+
      '<span class="when">'+ago(ev.t)+'</span>';
    b.addEventListener('click',function(){ openCheck(ev.token,null); });
    if(rowsEl.firstChild) rowsEl.insertBefore(b,rowsEl.firstChild);
    else rowsEl.appendChild(b);
    while(rowsEl.children.length>60) rowsEl.removeChild(rowsEl.lastChild);
  }
  function refreshTimes(){
    var kids=rowsEl.querySelectorAll('.wrow .when');
    for(var i=0;i<kids.length && i<events.length;i++) kids[i].textContent=ago(events[i].t);
    if(countEl) countEl.textContent=events.length? events.length+' fills' : '';
  }
  function empty(msg){
    if(rowsEl.children.length) return;
    rowsEl.innerHTML='<div class="wempty">'+msg+'</div>';
  }

  // ---------- one wallet ----------
  function poll(w){
    return jget(BS+'/addresses/'+w.a+'/token-transfers?type=ERC-20').then(function(j){
      var items=(j&&j.items)||[];
      var me=w.a.toLowerCase(), fresh=[];
      items.slice(0,25).forEach(function(it){
        var tok=it.token||{}, sym=String(tok.symbol||'').trim();
        if(!sym || QUOTE.test(sym)) return;                 // the pairing leg, not a position
        var to=String((it.to||{}).hash||'').toLowerCase();
        var fr=String((it.from||{}).hash||'').toLowerCase();
        var buy = to===me;
        if(!buy && fr!==me) return;
        var key=(it.transaction_hash||'')+':'+(it.log_index!=null?it.log_index:sym);
        if(seen[key]) return;
        seen[key]=1;
        fresh.push({who:w.h, buy:buy, sym:sym.replace(/[<>&]/g,'').slice(0,12),
          amt:amount((it.total||{}).value,tok.decimals),
          token:String(tok.address||''), t:Date.parse(it.timestamp)||Date.now(),
          tx:it.transaction_hash});
      });
      var known=!!w.__seen; w.__seen=1;                   // this wallet's first read is history
      if(!fresh.length) return;
      fresh.sort(function(a,b){ return a.t-b.t; });
      fresh.forEach(function(ev){
        if(rowsEl.querySelector('.wempty')) rowsEl.innerHTML='';
        events.unshift(ev);
        addRow(ev,known);
        if(known && alertsOn) queue.push(ev);              // one at a time, so they do not stack at once
      });
      events=events.slice(0,60);
      refreshTimes();
    }).catch(function(){});
  }

  // alerts leave the queue one per second, so a burst reads instead of piling up
  setInterval(function(){
    if(!alertsOn||!queue.length) return;
    toast(queue.shift());
    if(queue.length>6) queue=queue.slice(-6);
  },1100);

  // ---------- the loop ----------
  function step(){
    if(document.hidden) return;
    if(window.__dentedBusy && window.__dentedBusy()) return;
    var w=WALLETS[idx % WALLETS.length]; idx++;
    if(stampEl) stampEl.textContent='watching '+WALLETS.length+' wallets · checking '+w.h;
    poll(w).then(function(){
      if(idx>=WALLETS.length && !primed){
        primed=true;                                       // the first sweep is history, not news
        if(stampEl) stampEl.textContent='watching '+WALLETS.length+' wallets · live';
        empty('Nothing from these wallets yet. New fills land here as they happen.');
      }
    });
  }
  function start(){ if(!timer) timer=setInterval(step,3000); }
  function stop(){ if(timer){ clearInterval(timer); timer=null; } }
  document.addEventListener('visibilitychange',function(){ if(document.hidden) stop(); else start(); });
  setInterval(refreshTimes,5000);
  step(); start();

  // ---------- the button ----------
  function setOn(on){
    alertsOn=on;
    if(!btn) return;
    btn.classList.toggle('on',on);
    btn.textContent=on?'Alerts on':'Turn on alerts';
    if(note) note.textContent = on
      ? 'a card slides in on every new fill, with a sound — while this tab is open'
      : 'alerts off';
  }
  if(btn) btn.addEventListener('click',function(){
    if(alertsOn){ setOn(false); queue=[]; return; }
    setOn(true);
    blip(true);                                            // unlock the audio on the user's own click
    try{
      if('Notification' in window && Notification.permission==='default') Notification.requestPermission();
    }catch(e){}
  });
})();
</script>
