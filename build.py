import io

B = "src/"
BUILD = '2026-09-15-g2'

head = io.open(B+'check_head.html', encoding='utf-8').read()
body = io.open(B+'check_body.html', encoding='utf-8').read()
js   = io.open(B+'check_js.html',   encoding='utf-8').read()
tokv = io.open(B+'token_view.html', encoding='utf-8').read()
walv = io.open(B+'wallets_view.html', encoding='utf-8').read()
tcss = io.open(B+'token_css.frag',  encoding='utf-8').read()
wcss = io.open(B+'wallets_css.frag',encoding='utf-8').read()
tcast= io.open(B+'toast_css.frag',  encoding='utf-8').read()
vjs  = io.open(B+'view_js.frag',    encoding='utf-8').read()
wjs  = io.open(B+'wallets_js.frag', encoding='utf-8').read()
b64  = io.open(B+'quote.b64',       encoding='utf-8').read().strip()

# ---------- 1. styles ----------
anchor = "  footer{border-top:1px solid var(--line);"
assert anchor in head
if '.countdown{' not in head:
    head = head.replace(anchor, tcss + anchor, 1)
if '.wfeed{' not in head:
    head = head.replace(anchor, wcss + anchor, 1)
if '.toasts{' not in head:
    head = head.replace(anchor, tcast + anchor, 1)

# ---------- 2. nav ----------
body = body.replace('<a class="tab" href="token.html">$DENTED</a>',
                    '<a class="tab" href="#dented">$DENTED</a>', 1)
if 'href="#wallets"' not in body:
    body = body.replace('<a class="tab" href="#dented">$DENTED</a>',
        '<a class="tab" href="#wallets"><span class="lg">Smart wallets</span><span class="sm">Wallets</span></a>\n'
        '        <a class="tab" href="#dented">$DENTED</a>', 1)

# ---------- 3. the screenshot lives in the story only ----------
fig_start = body.find('      <figure class="reveal" style="margin:0;width:100%;--d:90ms">')
if fig_start > -1:
    fig_end = body.index('</figure>', fig_start) + len('</figure>\n')
    body = body[:fig_start] + body[fig_end:]
body = body.replace('<a href="token.html#steps" style=', '<a href="#steps" style=', 1)

# ---------- 4. wrap the checker, append the other two views ----------
open_wrap = '<div class="wrap">\n\n  <section class="top" id="check">'
if '<main id="view-check">' not in body:
    assert open_wrap in body
    body = body.replace(open_wrap, '<div class="wrap">\n\n<main id="view-check">\n\n  <section class="top" id="check">', 1)
    tail = body.rstrip()
    assert tail.endswith('</div>')
    body = (tail[:-len('</div>')] + '</main>\n\n<main id="view-wallets" hidden>\n' + walv +
            '\n</main>\n\n<main id="view-token" hidden>\n' + tokv + '\n</main>\n\n</div>\n')

if 'id="toasts"' not in body:
    body = body.replace('<div class="topbar">', '<div class="toasts" id="toasts" aria-live="polite"></div>\n\n<div class="topbar">', 1)

body = body.replace('__B64__', b64)

# ---------- 5. the story's canvases reuse the checker's pixel routine ----------
extra = r'''
<script>
(function(){
  if(!window.__dentedDraw) return;
  var draw=window.__dentedDraw, tween=window.__dentedTween;
  var hero=document.getElementById('heroCan');
  if(hero){
    var o={id:'DENTED',dent:0,age:.35,rust:.12,expired:false};
    if(tween) tween(950,function(k){ o.dent=54*k; draw(hero,o); });
    else { o.dent=54; draw(hero,o); }
  }
  var GRADES=[
    {g:'MINT',c:'g-mint',d:4,r:0,x:false},
    {g:'SCUFFED',c:'g-scuffed',d:24,r:.05,x:false},
    {g:'DENTED',c:'g-dented',d:50,r:.14,x:false},
    {g:'CRUSHED',c:'g-crushed',d:74,r:.26,x:false},
    {g:'FLATTENED',c:'g-flattened',d:94,r:.38,x:false},
    {g:'EXPIRED',c:'g-expired',d:88,r:.6,x:true}
  ];
  var prog=document.getElementById('prog');
  if(prog) GRADES.forEach(function(G,idx){
    var d=document.createElement('div'); d.className='step';
    var cv=document.createElement('canvas'); cv.width=18; cv.height=30;
    cv.setAttribute('role','img'); cv.setAttribute('aria-label',G.g);
    var lb=document.createElement('div'); lb.className='g '+G.c; lb.textContent=G.g;
    d.appendChild(cv); d.appendChild(lb); prog.appendChild(d);
    var op={id:G.g,dent:0,age:Math.min(1,G.d/140),rust:G.r,expired:G.x};
    draw(cv,op);
    setTimeout(function(){
      if(tween) tween(700,function(k){ op.dent=G.d*k; draw(cv,op); });
      else { op.dent=G.d; draw(cv,op); }
    }, 400+idx*110);
  });
})();
</script>
'''

# ---------- 6. hooks the other views need ----------
js = js.replace("  function draw(cv,o){",
                "  window.__dentedDraw=draw;\n  function draw(cv,o){", 1)
js = js.replace("  function watchReveals(root){",
                "  window.__dentedReveal=function(r){ watchReveals(r); };\n  function watchReveals(root){", 1)
js = js.replace("  function tween(ms,step,done){",
                "  window.__dentedTween=function(ms,step){ tween(ms,step); };\n  function tween(ms,step,done){", 1)
js = js.replace("  btn.addEventListener('click', function(){ run(); });",
                "  window.__dentedRun=function(a){ run(a); };\n"
                "  window.__dentedBusy=function(){ return !!reportBusy; };\n"
                "  btn.addEventListener('click', function(){ run(); });", 1)

doc = ('<!doctype html>\n<!-- DENTED build ' + BUILD + ' -->\n<html lang="en">\n<head>\n<meta charset="utf-8">\n'
       '<meta name="viewport" content="width=device-width,initial-scale=1">\n'
       '<meta http-equiv="cache-control" content="no-cache">\n'
       '<meta name="theme-color" content="#06080E">\n'
       '<meta name="description" content="Paste a Robinhood Chain token and get its condition report. '
       'Live chart, a feed of everything launching right now, and a live tape of what the busiest wallets are buying.">\n'
       + head + '</head>\n<body>\n' + body + js + extra + wjs + vjs + '</body>\n</html>\n')

io.open('index.html', 'w', encoding='utf-8').write(doc)
print('index.html', len(doc), 'bytes | build', BUILD)
print('views:', doc.count('id="view-check"'), doc.count('id="view-wallets"'), doc.count('id="view-token"'))
print('nav tabs:', doc.count('class="tab"'))
print('screenshot copies:', doc.count('data:image/png;base64,'))
