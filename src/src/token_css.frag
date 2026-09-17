  /* ---------- the $DENTED view ---------- */
  .hero{display:grid;grid-template-columns:auto 1fr;gap:clamp(1.4rem,4vw,2.8rem);align-items:center}
  .hero canvas{width:clamp(78px,11vw,116px);height:auto;
    filter:drop-shadow(0 20px 34px rgba(0,0,0,.85));animation:float 6.5s ease-in-out 1.2s infinite}
  @keyframes float{0%,100%{translate:0 0}50%{translate:0 -8px}}
  .lead{font-size:1.1em;max-width:54ch}

  .countdown{--n:16px;width:100%;margin-top:1.6rem;padding:clamp(1.4rem,4vw,2.2rem);
    background:linear-gradient(165deg,rgba(21,28,45,.96),rgba(12,17,28,.96));
    border:1px solid var(--line2);position:relative;overflow:hidden;
    box-shadow:0 34px 80px -46px rgba(0,0,0,.98);
    clip-path:polygon(var(--n) 0,calc(100% - var(--n)) 0,100% var(--n),100% calc(100% - var(--n)),
      calc(100% - var(--n)) 100%,var(--n) 100%,0 calc(100% - var(--n)),0 var(--n))}
  .countdown::before{content:"";position:absolute;inset:0;pointer-events:none;
    background:radial-gradient(70% 120% at 50% 0%,rgba(232,181,75,.12),transparent 70%)}
  .clock{display:flex;flex-wrap:wrap;gap:clamp(.5rem,2vw,1.1rem);align-items:flex-end;position:relative}
  .unit{display:flex;flex-direction:column;align-items:center;gap:.5rem;min-width:0}
  .unit b{font-family:var(--title);font-size:clamp(1.5rem,1rem + 3.2vw,3rem);line-height:1.15;
    color:var(--cream);font-weight:400;letter-spacing:-.02em;font-variant-numeric:tabular-nums;
    text-shadow:3px 3px 0 rgba(0,0,0,.75),0 0 40px rgba(232,181,75,.3)}
  .unit span{font-family:var(--ui);font-size:.56rem;letter-spacing:.24em;text-transform:uppercase;color:var(--grey2)}
  .sep{font-family:var(--title);font-size:clamp(1.1rem,.8rem + 2vw,2rem);color:var(--gold2);
    line-height:1.25;padding-bottom:1.5rem;animation:tick 1s steps(1,end) infinite}
  @keyframes tick{0%,55%{opacity:1}56%,100%{opacity:.25}}
  .cdline{font-family:var(--ui);font-size:.72rem;letter-spacing:.1em;line-height:2.1;color:#D6CDB6;
    margin-top:1.4rem;max-width:52ch;position:relative}
  .cdline b{color:var(--gold);font-weight:700}
  .cdnote{font-family:var(--ui);font-size:.62rem;letter-spacing:.14em;text-transform:uppercase;
    color:var(--grey2);margin-top:.9rem;line-height:1.9;position:relative}
  .cdopen{display:none;font-family:var(--title);font-size:clamp(1rem,.8rem + 1.4vw,1.6rem);
    color:var(--green);text-shadow:0 0 34px rgba(95,201,106,.45);line-height:1.6}
  .countdown.open .clock,.countdown.open .cdline{display:none}
  .countdown.open .cdopen{display:block}

  .beats{display:flex;flex-direction:column;gap:0;width:100%}
  .beat{display:grid;grid-template-columns:4.2rem 1fr;gap:clamp(1rem,3vw,2rem);
    padding-block:clamp(1.6rem,4vw,2.4rem);border-top:1px solid var(--line);align-items:start}
  .beat:first-child{border-top:0;padding-top:0}
  .beat .n{font-family:var(--title);font-size:1.5rem;color:var(--gold2);line-height:1.2;
    text-shadow:0 0 30px rgba(232,181,75,.25)}
  .beat h3{margin:0 0 .7rem;font-family:var(--title);font-size:.7rem;color:var(--gold);line-height:1.85}
  .beat p{color:#DCD3BB}
  .beat p + p{margin-top:.75rem}
  .beat em{font-style:normal;color:var(--cream);border-bottom:1px solid var(--gold2);padding-bottom:1px}

  .turn{--n:14px;width:100%;padding:clamp(1.5rem,4vw,2.3rem);
    background:linear-gradient(170deg,rgba(21,28,45,.95),rgba(15,21,35,.95));
    border:1px solid var(--line2);box-shadow:0 30px 70px -40px rgba(0,0,0,.95);
    clip-path:polygon(var(--n) 0,calc(100% - var(--n)) 0,100% var(--n),100% calc(100% - var(--n)),
      calc(100% - var(--n)) 100%,var(--n) 100%,0 calc(100% - var(--n)),0 var(--n))}
  .turn h3{margin:0 0 1rem;font-family:var(--title);font-size:.76rem;color:var(--cream);line-height:1.85}
  .split{display:grid;grid-template-columns:repeat(auto-fit,minmax(15rem,1fr));gap:1px;
    background:var(--line);border:1px solid var(--line2);margin-top:1.3rem}
  .side{background:linear-gradient(180deg,rgba(21,28,45,.9),rgba(15,21,35,.9));padding:1.2rem 1.15rem}
  .side .k{font-family:var(--ui);font-size:.6rem;letter-spacing:.18em;text-transform:uppercase;
    color:var(--grey2);margin-bottom:.6rem}
  .side .v{font-family:var(--ui);font-size:.82rem;line-height:2;color:#DCD3BB}
  .side.good .k{color:var(--green)}
  .side.bad .k{color:var(--red)}

  .prog{display:grid;grid-template-columns:repeat(6,1fr);gap:1px;background:var(--line);
    border:1px solid var(--line2);width:100%;margin-top:.4rem}
  .step{background:linear-gradient(180deg,rgba(17,23,37,.95),rgba(11,15,26,.95));
    padding:1.1rem .5rem 1.15rem;display:flex;flex-direction:column;align-items:center;gap:.5rem;text-align:center}
  .step canvas{width:34px;height:auto;filter:drop-shadow(0 8px 14px rgba(0,0,0,.7))}
  .step .g{font-family:var(--ui);font-size:.53rem;letter-spacing:.14em}

  .cta{display:inline-flex;align-items:center;gap:.7rem;text-decoration:none;position:relative;overflow:hidden;
    font-family:var(--ui);font-weight:700;font-size:.76rem;letter-spacing:.15em;text-transform:uppercase;
    color:#0A0803;background:linear-gradient(180deg,#F3C763,var(--gold) 52%,#C2903A);
    border:1px solid rgba(255,232,170,.5);padding:.9rem 1.4rem;
    box-shadow:0 8px 0 -4px rgba(0,0,0,.55),0 16px 34px -16px rgba(232,181,75,.75);
    transition:transform .18s var(--ease),box-shadow .18s var(--ease),filter .18s var(--ease)}
  .cta::after{content:"";position:absolute;top:0;bottom:0;left:-60%;width:40%;
    background:linear-gradient(100deg,transparent,rgba(255,255,255,.55),transparent);
    transform:skewX(-18deg);animation:sheen 5.5s var(--ease) infinite}
  .cta:hover{transform:translateY(-2px);filter:brightness(1.06)}
  .cta:active{transform:translateY(2px);box-shadow:0 4px 0 -3px rgba(0,0,0,.55)}

  .facts{display:grid;grid-template-columns:repeat(auto-fit,minmax(10rem,1fr));gap:1px;
    background:var(--line);border:1px solid var(--line2);width:100%}
  .fact{background:linear-gradient(180deg,rgba(21,28,45,.9),rgba(15,21,35,.9));padding:.95rem 1rem;
    font-family:var(--ui);position:relative;min-width:0;overflow:hidden}
  .fact::after{content:"";position:absolute;left:0;top:0;width:100%;height:1px;
    background:linear-gradient(90deg,rgba(232,181,75,.22),transparent 60%)}
  .fact span{display:block;font-size:.57rem;letter-spacing:.16em;text-transform:uppercase;
    color:var(--grey2);margin-bottom:.45rem}
  .fact b{display:block;font-size:.86rem;color:var(--cream);font-weight:700;
    overflow:hidden;text-overflow:ellipsis;white-space:nowrap}

  @media (max-width:620px){
    .hero{grid-template-columns:1fr}
    .beat{grid-template-columns:1fr;gap:.5rem}
    .beat .n{font-size:1.1rem}
    .prog{grid-template-columns:repeat(3,1fr)}
    .lead{font-size:1em}
  }

