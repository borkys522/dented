# DENTED

A condition report for Robinhood Chain tokens. Paste a contract, find out what you are about to buy.

No backend, no accounts, no tracking. The whole thing is one HTML file that reads the chain from your own browser.

---

## Why

Vlad Tenev grew up on dented cans — his family bought them because dented was cheaper and the food inside was the same. The dent was a discount.

He then built Robinhood, and after that a chain where roughly 850,000 tokens landed in 92 days. There the dent means the opposite. A token down 90% is usually not a discount on the same contents — the liquidity is gone, the deployer left, the can is empty. The dent went all the way through.

Same dent, opposite meaning, and from the outside the two look identical. Telling them apart is the whole job of this page.

---

## What it checks

**Can you get back out** — the first thing it does, before anything cosmetic. It simulates a transfer from a real holder straight into the pool, with `eth_call` against the chain. If the contract rejects it, money goes in and does not come out. If the transfer to the pool is refused but a transfer to a dead address goes through, you could hold it and not sell it — reported separately.

**Is the liquidity nailed down** — whether the launch position sits in the launchpad's locker, and whether that locker's published ABI exposes any function that could release it. A lock nobody can open is the only kind worth counting.

**Who is holding it** — top ten share, largest single wallet, how much sits in pools and lockers (that is liquidity, not a holder, so it is excluded from the concentration figure), how many of the top holders are contracts rather than wallets, and whether the biggest wallets are brand new addresses.

**What the contract can still do** — whether the source is published, whether it can mint, blacklist, change fees, pause or cap transfers; whether anyone still owns it (`owner()` read straight off the chain); whether it is an upgradeable proxy; and which launchpad deployed it.

**What is behind the price** — liquidity across every pool, how much of the market cap that liquidity actually backs, volume, buys against sells, and the age of the pair.

**The pulse** — trades in the last hour against the token's own average hour, the drawdown from its high, and whether it is green on the day while already rolling over.

**The label** — website, X, Telegram; whether somebody paid DexScreener for a profile or boosts; whether the name leans on a real one; and how many other tokens on this chain already use the same ticker.

It ends on one word — MINT, SCUFFED, DENTED, CRUSHED, FLATTENED, EXPIRED, or SEALED SHUT. It never says buy.

## What else is in there

- **New pairs** — a live feed of everything launching on the chain, refreshed every 20 seconds, with a counter of how many of them are already untouched
- **Smart wallets** — a tape of what a set of heavily-trading wallets is buying and selling, with optional in-page alerts
- **Chart** — candles from 1m to 1d, price or market cap, crosshair with OHLC, a drag-to-measure tool and an entry line

---

## How it works

Everything runs in the browser. There is no server, so there is nothing to trust and nothing to pay for.

| Source | Used for |
|---|---|
| Blockscout (`robinhoodchain.blockscout.com`) | holders, contract source, deployer, token transfers |
| Chain RPC (`rpc.mainnet.chain.robinhood.com`) | `owner()`, the transfer simulation, the liquidity lock |
| DexScreener | pairs, liquidity, volume, price, socials, paid profiles |
| GeckoTerminal | OHLCV candles, new pools, top pools |

Candles are fetched as three base series (1-minute, 15-minute, 4-hour) and every timeframe is folded out of them in memory, so switching a timeframe costs no request and answers in about 50ms. All calls to the candle source go through one throttled queue with a per-minute budget, because the free tier rate-limits and a 429 from the edge arrives without CORS headers — the browser only reports "failed to fetch".

---

## Honest limitations

Worth reading before you lean on any of it.

- **"Bought" and "sold" are inferred from token movements**, not from decoded swap events. A plain wallet-to-wallet transfer looks the same as a sale from the outside. The pairing leg (USDG, WETH) is filtered out so the position is what you see.
- **Market cap is price times a supply assumed constant.** True for most memecoins, not true for a token that can still mint — which the report flags separately.
- **The smart-wallet handles and ranking are not ours.** They come from the FOMO Radar leaderboard. That provider's profit figures are account-wide totals across every chain, so most of it was not earned here — Robinscan says the same on its own Top Traders page — and the project itself reports roughly one fill in eleven credited to a tracked wallet was not actually that wallet's trade. The fills shown on this page are read off the chain directly; the names and scores are somebody else's opinion.
- **A clean report is not a good token.** It means these particular checks came back clean. A deep dent is far more often a corpse than a discount, and no tool can tell you which.
- **Alerts live only while the tab is open.** Push to a phone would need a server, and there isn't one.

---

## Running it

Open `index.html` in a browser. That is all — no build step, no dependencies, no install.

To host it: drop `index.html` on any static host (Netlify, Cloudflare Pages, GitHub Pages, or a folder behind nginx). A report has its own link — `yoursite/?t=0x...` opens straight on that token.

## Building from source

`index.html` is generated. The pieces live in `src/`:

```
src/check_head.html     styles
src/check_body.html     the checker markup
src/check_js.html       the checker: chain reads, scoring, chart
src/token_view.html     the $DENTED page and launch countdown
src/wallets_view.html   the smart-wallets page
src/wallets_js.frag     the wallet tape, alerts and sound
src/view_js.frag        routing between the views, the countdown
src/*.frag              styles for the above
```

```sh
python3 build.py
```

writes `index.html`. No packages needed.

The launch countdown is one line in `src/view_js.frag`:

```js
var LAUNCH = Date.parse('2026-09-17T18:00:00Z');
```

---

## Not affiliated

$DENTED is an independent community token. It is not affiliated with, endorsed by, sponsored by or connected to Robinhood Markets, Inc., Robinhood Chain, or Vlad Tenev. Naming a public figure as the origin of an idea is not a claim of involvement, and none is claimed.

The line about the dented cans is quoted from "The Philosophies of Vlad Tenev" by Hashir Jaffry (narrativ, 18 March 2026). We looked for a primary source and did not find one, and we do not present it as one.

Nothing here is financial advice or a recommendation to buy or sell anything. Trading tokens on any chain can result in the total loss of what you commit.

## License

MIT — see [LICENSE](LICENSE).
