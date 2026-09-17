  /* ---------- smart wallets ---------- */
  .wbar{display:flex;flex-wrap:wrap;align-items:center;gap:.6rem;margin-top:1.6rem}
  .wbar .cbtn.on{color:#0A0803;background:var(--green);border-color:var(--green)}

  .wfeed{width:100%;margin-top:1.3rem;border:1px solid var(--line2);
    background:linear-gradient(180deg,rgba(9,13,22,.94),rgba(13,18,30,.94))}
  .wfhead{display:flex;align-items:center;gap:.6rem;padding:.6rem .8rem;
    border-bottom:1px solid var(--line);font-family:var(--ui);font-size:.58rem;
    letter-spacing:.16em;text-transform:uppercase;color:var(--grey2)}
  .wfhead::before{content:"";width:.42rem;height:.42rem;border-radius:50%;background:var(--green);
    box-shadow:0 0 10px rgba(95,201,106,.9);animation:blip 1.9s var(--ease) infinite;flex:none}
  .wfcount{margin-left:auto;color:var(--gold)}
  .wfrows{max-height:26rem;overflow-y:auto}
  .wrow{display:grid;grid-template-columns:7.5rem 4.2rem 1fr auto;gap:.7rem;align-items:center;
    padding:.62rem .8rem;border-bottom:1px solid rgba(33,44,69,.6);
    font-family:var(--ui);font-size:.72rem;cursor:pointer;background:transparent;border-left:0;border-right:0;border-top:0;
    color:var(--cream);text-align:left;width:100%;
    transition:background .2s var(--ease)}
  .wrow:hover{background:rgba(232,181,75,.06)}
  .wrow.fresh{animation:wIn .5s var(--ease) both}
  @keyframes wIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:none}}
  .wrow .who{color:var(--gold);font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .wrow .act{font-size:.6rem;letter-spacing:.14em;font-weight:700}
  .wrow .act.buy{color:var(--green)}
  .wrow .act.sell{color:var(--red)}
  .wrow .what{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .wrow .what b{color:var(--cream);font-weight:700}
  .wrow .what span{color:var(--grey2)}
  .wrow .when{font-size:.58rem;letter-spacing:.1em;color:var(--grey2);white-space:nowrap}
  .wempty{padding:1.4rem .8rem;font-family:var(--ui);font-size:.66rem;color:var(--grey2);
    letter-spacing:.1em;line-height:1.9}

  .wlist{display:grid;grid-template-columns:repeat(auto-fill,minmax(13rem,1fr));gap:1px;
    background:var(--line);border:1px solid var(--line2);width:100%}
  .wcard{background:linear-gradient(180deg,rgba(21,28,45,.9),rgba(15,21,35,.9));padding:.85rem .9rem;
    font-family:var(--ui);min-width:0;position:relative}
  .wcard .h{display:flex;align-items:baseline;gap:.5rem}
  .wcard .h b{font-size:.78rem;color:var(--gold);font-weight:700;overflow:hidden;
    text-overflow:ellipsis;white-space:nowrap}
  .wcard .h i{font-style:normal;margin-left:auto;font-size:.58rem;color:var(--grey2);flex:none}
  .wcard .ad{font-size:.56rem;letter-spacing:.06em;color:var(--grey2);margin-top:.4rem;
    overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .wcard .st{font-size:.54rem;letter-spacing:.12em;text-transform:uppercase;color:var(--grey);margin-top:.35rem}

  @media (max-width:620px){
    .wrow{grid-template-columns:1fr auto;row-gap:.25rem}
    .wrow .act{grid-column:2;text-align:right}
    .wrow .what{grid-column:1 / -1}
    .wrow .when{grid-column:2;text-align:right}
  }

