# Review 777 — f18f1523 — sounds.c domonnoise remaps + ORACLE/PRIEST/SELL (D-1808)

## Metadata
- Full / short hash: `f18f15232ddf427836106d0d64df3b43c468993b` / `f18f1523`
- Parent: `3d82312d` (D-1807 AWD). Map-driven Open.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-04 05:35:49 +0200
- D-id: **D-1808**
- Stats: priest +172; rumors +137; shk +110; sounds +65/−21; minion +35; mon +32; oracles_data +4; shknam +12; potion +9. `js/` insertions **576** (>250 → ceiling **450**). Band **80–350**.
- Claims to close: Open `sounds.c` `domonnoise` remaining: genus / gecko / doconsult / priest_talk / shk_chat. Not beg.
- JS / map: `sounds.js` remaps + three switch arms; `mon.js` `genus`; `rumors.js` `doconsult`/`outoracle`; `priest.js` `priest_talk`; `shk.js` `shk_chat` / `money_cnt`. `c-js-map/turns.md`. Archive **Addressed:** D-1808 `f18f1523`.

## Intent vs deliverable

Git subject promises: Match C `sounds.c` `domonnoise` remaps so `genus` / gecko / `doconsult` / `priest_talk` / `shk_chat` actually run, instead of skipping those arms and returning ECMD_OK with no talk.

`node scripts/csym.mjs domonnoise` → `sounds.c:678–1242` remaps `:697–715`. `mon_is_gecko` `:658–674`. `genus` `mon.c:469–531`. `doconsult` `rumors.c:695–767`. `outoracle` `:638–693`. `init_oracles` `:576–595`. `priest_talk` `priest.c:557–721`. `inhistemple` `:160–171`. `shk_chat` `shk.c:5520–5601`. `bribe` `minion.c:360–388`. `money_cnt` `hack.c:4513–4522`. `is_silent` `mondata.h:62`. `--callers genus`: `sounds.c:700`, `objnam.c:5219`. `--callers priest_talk`: only `sounds.c:726`.

Parent: silent check after remaps; no guardian/isshk/MOO/gecko; empty ORACLE/PRIEST/SELL; unknown → ECMD_OK. The diff **does** ship those remaps and three talk callees, plus Rule #2 `ORACLE_RECORDS`. Subject is delivered for the named arms.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `domonnoise` remaps + ORACLE/PRIEST/SELL/MOO/BELLOW | LIVE repaired | |
| `genus` | LIVE new | `monsndx` via `ptr.mndx` |
| `mon_is_gecko` | LIVE local | C `staticfn`; do NOT add #2 |
| `doconsult` / `outoracle` / `outrumor` BY_ORACLE | LIVE new | embed not dlb |
| `priest_talk` / `inhistemple` / `has_shrine` | LIVE | `teleport.js` inhistemple clone remains |
| `bribe` | LIVE new | getlin + `money2mon` |
| `shk_chat` / `is_izchak` | LIVE new | |
| `money_cnt` | LIVE repaired | **first** COIN quan (was a sum) |
| `incr_itimeout` | LIVE | Clairvoyant blessing |
| `quest_chat` | LIVE | NEMESIS/GUARDIAN too |
| remaining MS_* / `verbl_msg_mcan` / `night()` howl | OMIT named | |
| save/rest `oracle_loc` | OMIT named | |
| `mapseen_temple` / invent-full `money2u` dropy | OMIT named | |

`node scripts/sym.mjs` (clone → import / new):

```
genus            js/mon.js:381   sync
mon_is_gecko     NOT EXPORTED — 1 LOCAL sounds.js:799 (C staticfn)
doconsult        js/rumors.js:184   ASYNC
outoracle        js/rumors.js:151   ASYNC
priest_talk      js/priest.js:329   ASYNC
inhistemple      js/priest.js:106   sync  + teleport.js:415 clone — do NOT add #3
shk_chat         js/shk.js:5436   ASYNC
is_izchak        js/shknam.js:475   sync
bribe            js/minion.js:538   ASYNC
money_cnt        js/shk.js:3884   sync  + 5 clones (end/fountain/monmove/sit/vault) — do NOT add #7
money2mon        js/shk.js:3914   sync
incr_itimeout    js/potion.js:613   sync
quest_chat       js/quest.js:400   ASYNC
```

`--can sounds.js` mon/priest/rumors/shk and `--can priest.js minion.js bribe`: **ALREADY**. FORCE/DIAG/`getRngLog`/`fastforward`/seed-in-control-flow: **none**. Rule #2 **clean** (oracles embed, not `fs`).

## C ↔ JS fidelity

**Silent + remaps (`:689–715`).** `is_silent && !isshk` **before** remaps. Leader poly → MS_LEADER. Guardian `ptr != &mons[urole.guardnum]` → `mons[genus(monsndx(ptr), 1)].msound` (JS mndx, not a `mons()` pointer). `isshk` → SELL. ORC same-race/Hallu → HUMANOID. untamed MOO → BELLOW. Hallu gecko → SELL. Then `!canspotmon` `map_invisible`. **Match.** `mon_is_gecko` gecko / long-worm / `glyph_to_mon(glyph_at)`. **Match.**

**Shipped switch arms.** ORACLE `return doconsult`. PRIEST `priest_talk` then ECMD_TIME. LEADER/NEMESIS/GUARDIAN `quest_chat`. SELL: `!Hallu \|\| is_silent \|\| (isshk && !rn2(2))` → `shk_chat`, else GEICO `currency(15)`. MOO/BELLOW plines (Soundeffect compiled out). Unknown / omitted MS_* now **ECMD_TIME** (C `:1241`), not ECMD_OK. **Match those arms.**

**`doconsult` (`:695–767`).** `ynq` minor 50 / `y_n` major `500+50*ulevel`; `money2mon`; ACH_ORCL; minor `outrumor(1, BY_ORACLE)` nested `rn2`; major `outoracle(cheapskate, TRUE)` `rnd(cnt-1)` (JS `rnd` is 1..n). **Match.** File offsets → record indices in `ORACLE_RECORDS` (extractor + makedefs special). save/rest loc **named**.

**`priest_talk` (`:557–721`).** gnostic++, flee/stray, `inhistemple`/helpless cranky `rn2(3)`, desecrate, no-gold ale `money2u` 1-or-2, else `rn1(101, 150+cheap*40)` suggested + `bribe` + Clairvoyant `incr_itimeout` / Protection `ublessed` / cleanse. **Match the live donation ladder.** `mapseen_temple` named.

**`shk_chat` (`:5520–5601`).** !isshk; ANGRY / following `strncmp` PL_NSIZ / bill+debit / debit / credit / robbed / surcharge / `money_cnt(minvent)` 50/4000 / Izchak `rn2` / shoplifters. Deaf via `hero_deaf()` (H/E/roleplay). **Match.**

**`money_cnt` (`:4513–4522`).** First COIN `quan`, not a sum. This SHA’s talk arms import the export. Five leftover clones may still sum — clone drift, not a stub in these arms.

**Callee closure.** Every callee those shipped arms reach is LIVE or OMIT named. No STUB in a live arm.

## Hallucinations / overclaim

Do **not** stamp “Match C remaining `domonnoise` MS_*” (vampire / were `night()` / bribe / …). Do **not** stamp “Match C `dlb` ORACLEFILE.” Do **not** export a second `genus` or a sixth `money_cnt` clone. Public `#chat` to a temple priest / Oracle / shk is the hit path; gecko Hallu SELL is public-unhit.

## Density

§2b: one Open row = remaps + the three talk callees that row named. +576. Did **not** glue vampire/were/bribe. Large but one cluster.

## Verification

D-log: save-oracle skip; green + cohort 7/7. No dedicated `#chat` Oracle/priest session in the public set — admit **public-unhit** for those arms; green does not prove them. This audit: `csym` remaps `:697–715` + the three callees vs HEAD `js/sounds.js:810–877`, `priest.js:329–471`, `rumors.js:184–256`, `shk.js:5436–5513`. Rule #2 clean.

## Actionable C-wrongs

None for Must-fix. Named: other MS_*; `verbl_msg_mcan`; `night()` FULL_MOON howl; save/rest `oracle_loc`; `mapseen_temple`; invent-full `money2u` dropy; `money_cnt` clones in end/fountain/monmove/sit/vault; `inhistemple` teleport clone.

Verdict: **ACCEPT-WITH-DEBT**
