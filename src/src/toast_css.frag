  /* ---------- side alerts ---------- */
  .toasts{position:fixed;top:5.4rem;right:clamp(.6rem,2vw,1.4rem);z-index:60;
    display:flex;flex-direction:column;gap:.5rem;width:min(20rem,calc(100vw - 1.6rem));
    pointer-events:none}
  .toast{pointer-events:auto;cursor:pointer;text-align:left;width:100%;
    background:linear-gradient(165deg,rgba(21,28,45,.985),rgba(10,15,25,.985));
    border:1px solid var(--line2);border-left:3px solid var(--gold);
    padding:.7rem .8rem;font-family:var(--ui);color:var(--cream);
    box-shadow:0 22px 44px -22px rgba(0,0,0,.98);
    animation:tIn .38s var(--ease) both;position:relative;overflow:hidden}
  .toast.buy{border-left-color:var(--green)}
  .toast.sell{border-left-color:var(--red)}
  .toast.out{animation:tOut .32s var(--ease) both}
  @keyframes tIn{from{opacity:0;transform:translateX(26px) scale(.97)}to{opacity:1;transform:none}}
  @keyframes tOut{from{opacity:1;transform:none}to{opacity:0;transform:translateX(26px) scale(.97)}}
  .toast .l1{display:flex;align-items:baseline;gap:.45rem;font-size:.62rem;letter-spacing:.13em;
    text-transform:uppercase}
  .toast .l1 b{color:var(--gold);font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .toast .l1 i{font-style:normal;font-weight:700}
  .toast.buy .l1 i{color:var(--green)}
  .toast.sell .l1 i{color:var(--red)}
  .toast .l1 u{margin-left:auto;text-decoration:none;color:var(--grey2);font-size:.54rem;flex:none}
  .toast .l2{margin-top:.4rem;font-size:.82rem;font-weight:700;overflow:hidden;
    text-overflow:ellipsis;white-space:nowrap}
  .toast .l2 span{color:var(--grey);font-weight:400;font-size:.72rem}
  .toast .l3{margin-top:.35rem;font-size:.54rem;letter-spacing:.12em;text-transform:uppercase;color:var(--grey2)}
  .toast:hover{border-color:var(--gold)}
  .toast:hover .l3{color:var(--gold)}
  .toast .bar{position:absolute;left:0;bottom:0;height:2px;background:var(--gold2);
    animation:tBar 12s linear forwards}
  @keyframes tBar{from{width:100%}to{width:0}}
  .toast.copied .l3{color:var(--green)}

  @media (max-width:620px){
    .toasts{top:auto;bottom:.7rem;right:.5rem;left:.5rem;width:auto}
  }
  @media (prefers-reduced-motion:reduce){
    .toast,.toast.out{animation:none!important}
    .toast .bar{animation:none!important;width:100%}
  }

