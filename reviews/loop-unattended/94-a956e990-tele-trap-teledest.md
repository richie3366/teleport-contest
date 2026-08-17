# Review 94 — a956e990 — tele_trap teledest / else tele() (D-1133)

## Metadata
- Full / short hash: `a956e9909842c5789d1eb16418872a406b0404c3` / `a956e990`
- Parent: `89a8ca89` (review **90–93** + cadence #1440). This file audits **this SHA only**. Archive row **Addressed:** D-1133 `a956e990` was filled by D-1134.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 04:26:34 +0200
- D-id: **D-1133**
- Stats: 11 files, +125 / −44 — `js/teleport.js` +34 / −8 (`tele_trap` else-chain); `js/trap.js` +7 / −3 (comment only).
- Claims to close: Open queue `teleport.c` `tele()` / trap teledest (named). Not tele_trap wrenching. Review **93** next-port; **81** named teledest after wrenching. `reviews/loop-2026-08-15/` has no open teledest Must-fix.
- JS / map: `teleport.js` `tele_trap` / `tele` / `scrolltele` / `teleds` / `enexto` / `rloc_to`; `track.js` `settrack`; `trap.js` `trapeffect_telep_trap` comment. `c-js-map/turns.md` teleport. `dotele` trap-at-feet teledest, `vault_tele` tele() fallback, `mtele_trap` dest-occupied skip still named.
- Prior reviews this SHA claims to close: **93** next Open; **81** named omit teledest/`tele()`.

## Intent vs deliverable

Git subject promises: “Match C teleport.c tele_trap so a named teledest displaces via enexto/rloc_to then teleds, else tele(), instead of no-oping non-once TELEP.”

Old JS nested `next_to_u` inside `trap.once` and commented `// else teledest / tele() named omit`. A non-once TELEP therefore did nothing after the wrenching gate. C `teleport.c:1502–1532` is a five-way: wrenching; else `!next_to_u` shudder; else once → `deltrap`+`vault_tele`; else `isok(teledest)` `settrack` + dest `m_at` displace via `enexto`/`rloc_to` then `teleds(TELEDS_TELEPORT)`; else `tele()`. `next_to_u` is a **sibling** of once, so it also gates teledest and random `tele()`.

The diff **does** lift `next_to_u` and port both remaining arms. It does **not** port `dotele` trap-at-feet teledest (`teleport.c:1145–1152` goes to `teleds` without displace/`settrack`) or `vault_tele`’s `tele()` fallback when no vault/space. Named. `mtele_trap` still skips an occupied dest (C: no hero-style displace).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `tele_trap` else-chain | C body, **rewritten** | `teleport.c:1506–1532`; `next_to_u` sibling of once |
| `next_to_u` | C callee, **imported** | `apply.js`; was nested in once only |
| `isok(teledest)` | C predicate, **new** | local `teleport.js` `isok`; ≡ `cmd.c:4326–4329` `x>=1 && x<=COLNO-1` |
| `settrack` | C callee, **imported** | `track.js:69–80`; stealth-ring skip ≡ `track.c:26–28` |
| `m_at` / `enexto` | C callees, **imported** | `enexto` = `enexto_core(GP_CHECKSCARY)` then `0` |
| `rloc_to` | C callee, **imported** | D-1123 `rloc_to_core` RLOC_NOMSG |
| `teleds(..., TELEDS_TELEPORT)` | C callee, **imported** | flag **2** ≡ `hack.h:1426` |
| `tele` / `scrolltele` | C callee, **imported** | real wrapper; scrolltele still partial (named) |
| `in_tele_trap` | C static, **kept** | blocks dest-trap recursion from `teleds`→`spoteffects` |
| `dotele` trap-at-feet | C caller, **named omit** | `teleport.js:1533` still `// trap-at-feet arms deferred` |
| `vault_tele` tele() fallback | C callee arm, **named omit** | still `return false` |
| `mtele_trap` occupied dest | C body, **untouched** | C skips; JS already skipped |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. `trap.teledest.x/y` are live trap fields (default `{x:-1,y:-1}` fails `isok`). Rule #2 clean. Frozen contracts untouched.

**New RNG on this path:** none in the teledest displace itself (`enexto` may call `goodpos`; `rloc_to` worm tail may `rn2`). Unnamed dest → `tele()` → `scrolltele` may `rn2(3)` on the amulet gate then `safe_teleds` placement RNG — that is the existing helper, not a new lottery. `settrack` has no RNG.

## Constitution / playbook

Grep of the two JS hunks: no trace-index gates. Contest Rule #2: in-process ESM; dynamic `import('./apply.js')` / `trap.js` / `track.js` is cycle-breaking. Do not nest `next_to_u` inside `once` again. Do not displace in `mtele_trap`. Do not pull `dotele` trap-at-feet into this SHA.

## C ↔ JS fidelity

### Branch order

C `teleport.c:1497–1534` also sets `in_tele_trap` around the whole chain (static, skip if already true). JS `:1882–1924` same with try/finally so a thrown `teleds` still clears the flag. C always assigns `FALSE` at `:1534` (no C++ exceptions). Extra JS `if (!u) return` is after the flag is set; finally still clears.

C `teleport.c:1502–1532`:

```
if (In_endgame || Antimagic || noteleport_level)
    shieldeff if Antimagic; You_feel wrenching;
else if (!next_to_u())
    You1(shudder_for_moment);
else if (trap->once)
    deltrap; newsym; vault_tele();
else if (isok(trap->teledest.x, trap->teledest.y)) {
    mtmp = m_at(teledest);
    settrack();
    if (mtmp) {
        if (!enexto(&cc, mtmp->mx, mtmp->my, mtmp->data))
            You1(shudder_for_moment);
        else { rloc_to(mtmp, cc.x, cc.y); mtmp = 0; }
    }
    if (!mtmp) teleds(teledest, TELEDS_TELEPORT);
} else
    tele();
```

JS `1887–1921`: same outer wrenching (D-1120 `Antimagic()` youprop + `shieldeff`). Inner `else { if (!next_to_u) shudder; else if once; else if isok(teledest); else tele(); }` is the C else-if chain with `next_to_u` lifted out of `once`. `You shudder for a moment.` ≡ `shudder_for_moment`. `in_tele_trap` try/finally still clears after both new arms. Extra `if (!u) return` is after the flag is set; finally still clears. Match on the Open line.

`isok(0,0)` and `isok(-1,-1)` are false (`x>=1`). Ordinary `maketrap` teledest `{-1,-1}` falls through to `tele()`. Named dest from themerms `make_a_trap` is `isok` and takes the displace arm.

### Displace then teleds

C: `settrack` **before** the `if (mtmp)` body, even when dest is empty. JS `1902–1904` same. Stealth ring: both skip the ring write (`uleft`/`uright` `RIN_STEALTH`). `enexto` fail: shudder, `mtmp` stays set, skip `teleds` — hero stays. Success: `rloc_to` then `mtmp=null` then `teleds`. Empty dest: `mtmp` already null, `teleds` immediately. `TELEDS_TELEPORT` is 2. Match call-for-call.

### `tele()` is not a stub

Say it explicitly: this is **not** “Match C dispatch, callee is a stub.” `tele()` is `scrolltele(null)` (`teleport.js:1459–1461` / C `:841–845`). `scrolltele` runs noteleport pline, amulet `rn2(3)` disorient, Teleport_control `getpos`+`teleok`+`teleds`, else `safe_teleds`. Named omissions on **that** helper (not this peel): `make_blinded(0,FALSE)`; W-tower half of the amulet gate (`On_W_tower_level`); unconscious controlled fail; wizard `Override?` yn (JS treats wizard as accept); steed whobuf. Wiring `tele_trap`’s else arm makes those scrolltele omits reachable from random TELEP; they stay named on `scrolltele`, not silent no-ops of the Open `tele()` **call**.

`enexto` / `rloc_to` / `teleds` / `settrack` are the same imported functions D-1121–D-1123 already audited.

`enexto` (`teleport.js:630–632`) is C `enexto`: `enexto_core(..., GP_CHECKSCARY)` then `enexto_core(..., 0)`. Fail means the level is packed — C comment at `:1519–1520`. JS copies that comment. `rloc_to` is RLOC_NOMSG (C `rloc_to` macro); vanish text is not this arm.

### `mtele_trap` contrast (not a miss)

C `teleport.c:1981–1992` documents that a **monster** landing on an occupied teledest does **not** displace: `if (!(m_at || u_at)) rloc_to_core(..., RLOC_MSG);` else skip. JS `mtele_trap` (`:1136–1141`) already matches that skip. This SHA must not copy the hero displace into the mon path. Comment in `trap.js` names it. C-correct.

### `scrolltele` amulet / W-tower (named, now live)

C `teleport.c:865–871`: `(u.uhave.amulet || On_W_tower_level(&u.uz)) && !rn2(3)` then disorient; wizard `Override?`. JS `:1418–1421` checks amulet only and treats wizard as accept. `make_blinded(0, FALSE)` at `:862–863` is still a comment. Those omits were already on `scrolltele` for ^T / wand / scroll. The else `tele()` arm now reaches them from a random TELEP. Map debt on `scrolltele`, not a stub of this dispatch.

### Callers

Hero `trapeffect_telep_trap` already `await tele_trap`. This SHA does not add a caller. Comment-only `trap.js` update. `dotele` still skips trap-at-feet (`:1533`). Guard: C `in_tele_trap` blocks dest TELEP recursion; JS same.

## Hallucinations / overclaim

D-log / CURRENT / subject say a named teledest displaces via `enexto`/`rloc_to` then `teleds`, else `tele()`, instead of no-oping non-once TELEP, and that `next_to_u` is a sibling of once. That is the hunk. They name `dotele` trap-at-feet and `vault_tele` tele() fallback. Stamping **Addressed:** D-1133 is fair for the Open **tele_trap** line. Hash `a956e990` is on the archive row (filled by D-1134). Do **not** stamp it as a close of `dotele` teledest, `vault_tele` fallback, or complete `scrolltele`. Do **not** read “Match C else tele()” as “Match C `make_blinded` / W-tower.”

## Density

One C function’s remaining else-if envelope (teledest + `tele()`), plus the `next_to_u` lift C requires for those arms. Not “finish teleport.c.” `dotele` / `vault_tele` fallback left named. ~34 JS. Right size (§2b whole practical switch).

## Verification

Journal: private canary **32**/32 (source order; AM/uprops/noteleport wrench; `!next_to_u` non-once; once deltrap no teleds; free dest land+settrack; occupied displace; full-level shudder; unnamed dest RNG; dest TELEP recursion; teledest 0,0 not isok); green+strict seed8000/0900; cohort **22**/22 including 0012 vault + 0004 + 0007 snake + 0009 swim + 0360/0367/0373/4500/2200 + strict 0012/0360/4500/0004/2200/0367/0373/0030/0009/0002. Path **public-unhit** on named-dest / random TELEP. This audit’s full `sessions` (cadence **#1445**) **44**/44 Scr **11405**/11405 RNG **792838**/792838 — no regression.

C read of `teleport.c:841–845`, `:1502–1532`, `:1145–1152`, `cmd.c:4326–4329`, `track.c:24–36`, `hack.h:1426`; JS `teleport.js:87–89`, `:1459–1461`, `:1858–1866`, `:1878–1925`, `:1532–1566`, `track.js:69–80`. Hunk grepped FORCE/fs/seed.

| Case | C | JS after |
|------|---|---------|
| wrenching | skip rest | **same** (D-1120) |
| `!next_to_u`, non-once | shudder; no tele | **same** (lifted) |
| once | deltrap; vault_tele | **same** |
| `isok(teledest)`, empty | settrack; teleds | **same** |
| dest occupied, enexto ok | rloc_to; teleds | **same** |
| dest occupied, enexto fail | shudder; stay | **same** |
| unnamed dest | `tele()` | **same** |
| dest is TELEP | `in_tele_trap` skip | **same** |
| `dotele` on named trap | teleds, no displace | **named skip** |
| `vault_tele` no room | `tele()` | **named skip** |

## Actionable C-wrongs

None that Must-fix this next iter. The Open else-chain matches `teleport.c:1506–1532`. `tele()` is a real C callee.

Named omits / do-nots (map / Open, not Must-fix):

1. `dotele` trap-at-feet teledest (`teleport.c:1145–1152`) — `teleds` without displace/`settrack`.
2. `vault_tele` `tele()` fallback when no vault/space (`teleport.c:779` region; JS `:1865–1866`).
3. `scrolltele` `make_blinded(0,FALSE)` / W-tower half of amulet `rn2(3)` / unconscious / wizard Override yn. Now reachable from TELEP `tele()`.
4. Next Open after this SHA: `fountain.c` `dipfountain` after-switch `update_inventory` — **Addressed:** D-1134 `5f55ceba`.
5. Do not nest `next_to_u` inside `once`. Do not displace in `mtele_trap`. Do not pull `dotele` into a tele_trap peel.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: `tele_trap` now matches C’s sibling `next_to_u` then once / `isok(teledest)` displace+`teleds` / else real `tele()`, while `dotele` trap-at-feet and `vault_tele`’s fallback stay named.
- Must-fix stays empty for this SHA; next port popped Open `dipfountain` after-switch `update_inventory`. **Addressed:** D-1134 `5f55ceba`. Not Excalibur gift.
