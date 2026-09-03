# Review 712 — 97f49d11 — dokick.c ghitm hidden_gold(TRUE) / throw_gold (D-1751)

## Metadata
- Full / short hash: `97f49d11b221ab0b62436200d615a07ff71120aa` / `97f49d11`
- Parent: `b6c42dd0` (D-1750). This file audits **this SHA only** (third of nine `js/` commits since review **709**). Archive **Addressed:** D-1751 `97f49d11`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-03 02:00:46 +0200
- D-id: **D-1751**
- Stats: `js/dothrow.js` +100/−16; `js/dokick.js` +25/−31; `js/mthrowu.js` +2/−2. Total `js/` insertions **127** <250. Band **150–350** (id >454 ⇒ 200-floor).
- Claims to close: Open dokick `hidden_gold(TRUE)` after D-1731 / D-1740 / review **701** (shop `$` named the kick clone). Not SetVoice. Not `unsplitobj`. `reviews/loop-2026-08-15/` has no unpaid ghitm Must-fix.
- JS / map: `dokick.js` `ghitm`; `dothrow.js` `throw_gold`; `mthrowu.js` `miss`. `c-js-map/turns.md`.
- Prior: **701** named `hidden_gold_kick`; **692** named vault `hidden_gold` LIVE.

## Intent vs deliverable

Git subject promises: kicking gold at a vault guard uses `hidden_gold(TRUE)` (nested `contained_gold`) instead of a non-recursive dokick clone, and `throw_gold` reaches that site, after D-1750.

`node scripts/csym.mjs ghitm` → `dokick.c:294–407`. `--callers ghitm`: `dokick.c:747` `really_kick_object`; `dothrow.c:2712` `throw_gold`. `hidden_gold` `vault.c:1256–1268` (callers include `:361`). `contained_gold` `shk.c:3045–3061`. `throw_gold` `dothrow.c:2655–2731` (callers proto `:23`; `:115`). `miss` `zap.c:3570–3576`. `money_cnt` `hack.c:4513–4522`.

```352:365:nethack-c/upstream/src/dokick.c
        } else if (mtmp->isgd) {
            umoney = money_cnt(gi.invent);
            SetVoice(mtmp, 0, 80, 0);
            verbalize(umoney ? "Drop the rest and follow me."
                      : hidden_gold(TRUE)
                        ? "You still have hidden gold.  Drop it now."
                        : mtmp->mpeaceful
                          ? "I'll take care of that; please move along."
                          : "I'll take that; now get moving.");
        }
```

```2706:2713:nethack-c/upstream/src/dothrow.c
            mon = bhit(u.dx, u.dy, range, THROWN_WEAPON, ...);
            if (!obj)
                return ECMD_TIME;
            if (mon) {
                if (ghitm(mon, obj))
                    return ECMD_TIME;
```

Parent: `hidden_gold_kick` walked only immediate `cobj` coins (no nested `contained_gold`); `throw_gold` returned 0 after swallow; `ghitm` not exported; miss inlined `canseemon` only; robbed used `female?her:his`; value used `oc_cost||1`; merc tip used `flags.female||u.female`. The diff **does** import vault `hidden_gold`, delete `hidden_gold_kick`, export `ghitm`, port `throw_gold` dz/`bhit`/`ghitm`/`ship_object`/`flooreffects`/`sellobj`, import `miss`, `mhis` for robbed, `oc_cost|0`, `flags.female` only. It **does not** call `unsplitobj` on self-throw. Named (D-0720). It **does not** emit `SetVoice` (named; contest empty; D-1752 adds the no-ops). It **does not** port quivered gold via `throwit`. Named. It **does not** port `dungeon.c` `ceiling()` labels. Named.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `ghitm` `:294–407` | LIVE repaired | export; guard uses vault `hidden_gold(true)` |
| `hidden_gold` `:1256–1268` | LIVE import | vault.js D-1731; `contained_gold` recurse |
| `hidden_gold_kick` | deleted clone | sym: NOT FOUND |
| `contained_gold` | LIVE (vault local) | matches `shk.c:3045–3061`; shk.js also exports |
| `throw_gold` `:2655–2731` | LIVE repaired | was swallow-only stub after self-cancel |
| `miss` `:3570–3576` | LIVE import | mthrowu.js; `cansee(bhitpos)||canspotmon` + verbose |
| `money_cnt_kick` | CLONE | still **sums**; C returns first gold `quan` |
| `mhis` | LIVE import | fountain.js; robbed line |
| `mpickobj` / `wakeup` / `setmangry` / `finish_meating` / `make_happy_shk` | LIVE | |
| `bhit` / `ship_object` / `flooreffects` / `sellobj` | LIVE | dynamic import in throw_gold |
| `SetVoice` in ghitm | OMIT named | contest empty; D-1752 source calls |
| `unsplitobj` | OMIT named | self-throw merge |
| quivered gold `throwit` | OMIT named | |
| `ceiling()` / full `surface()` | OMIT named | |

`node scripts/sym.mjs`:

```
ghitm            js/dokick.js:1130   ASYNC
hidden_gold      js/vault.js:74   sync
hidden_gold_kick NOT FOUND
throw_gold       js/dothrow.js:885   ASYNC
contained_gold   js/shk.js:2041   sync  (+ vault.js:58 local — do NOT add #3)
miss             js/mthrowu.js:627   ASYNC
money_cnt_kick   NOT EXPORTED — 1 LOCAL  js/dokick.js:1245
make_happy_shk   js/shk.js:1533   ASYNC
wakeup           js/mon.js:1134   ASYNC
ship_object      js/dokick.js:1849   ASYNC
flooreffects     js/do.js:663   ASYNC
sellobj          js/shk.js:2370   ASYNC
```

Re-point: `hidden_gold_kick` → import `hidden_gold`; inlined miss → import `miss`. `node scripts/imports.mjs --can dokick.js vault.js hidden_gold`: **ALREADY**. `--can dothrow.js dokick.js ghitm`: **SAFE** (hoisted; this SHA used dynamic `import()` which is also lazy). `--can dokick.js mthrowu.js miss`: **ALREADY**. FORCE/DIAG/`getRngLog`/`fastforward`/seed names: **none** (HURTLING/FORCEBUNGLE are C constants). `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**.

## C ↔ JS fidelity

**Dislike gold (`:299–301`).** C `!likes_gold && !isshk && !ispriest && !isgd && !mercenary` → `wakeup(TRUE)`. JS the same. **Match.**

**`!mcanmove` (`:302–308`).** C `canseemon` → `pline_The` xname + otense hit + `mon_nam`. JS `The(xname)` (parent dropped `The`). **Match.** `msg_given`.

**Catch (`:310–324`).** Clear `msleeping`; `finish_meating`; `!isgd && !rn2(4)` `setmangry(TRUE)`; `cansee(mx,my)` catch pline with awaken prefix; `mpickobj`; gold freed. JS `value = quan * (oc_cost|0)` — parent invented `||1`; C has no `||1`. **Match C.** One `rn2(4)` unless guard.

**Shop (`:325–345`).** Robbed: subtract value, floor 0, “partially” + `mhis(mtmp)`, `make_happy_shk` when 0. Else SetVoice (named omit) then peaceful credit + “You have N currency” else “Thanks, scum!”. JS `mhis` LIVE (parent `female?her:his`). **Match except named SetVoice.**

**Priest (`:346–351`).** SetVoice named; thank / scum. JS verbalize only. **Match the words.**

**Guard (`:352–365`).** `umoney = money_cnt(invent)`; SetVoice named; verbalize wallet / `hidden_gold(TRUE)` / peaceful / hostile. JS `money_cnt_kick` then `hidden_gold(true)`. Vault helper: invent Has_contents && (cknown || even_if_unknown) → `contained_gold` recurse. C `contained_gold` same recurse. Parent kick clone did **not** recurse into nested bags. **Match the Open.** `money_cnt_kick` still **sums** all `COIN_CLASS` (comment this SHA claims “first quan”). C `hack.c:4513–4522` returns the **first** gold object’s `quan`. Gold merge makes them equal. Same clone family as D-1750 `money_cnt_invent`.

**Mercenary (`:366–399`).** Rank goldreqd 100/250/500/750; `goldreqd && rn2(3)` then `goldreqd += (umoney + ulevel*rn2(5)) / Cha`; `value > goldreqd` → peaceful. Then not peaceful: not enough / unbribable; was_angry beat it; else tip `flags.female` lady/buddy. JS `mndx` vs `data==&mons[PM_*]`; `acurr(A_CHA)||1` (C divides by Cha, 3–25 typical). **Match rng:** `rn2(3)` then maybe `rn2(5)`. Tip: this SHA drops `u.female` fallback — **Match C `flags.female`.** SetVoice named.

**Miss (`:404–406`).** C `miss(xname(gold), mtmp)` → `The` + `vtense miss` + `(cansee(bhitpos)||canspotmon) && verbose ? mon_nam : "it"`. JS imports mthrowu `miss` with that predicate (`verbose !== false`). Parent used `canseemon` only. **Match C.** Kick path may have stale `bhitpos`; mthrowu falls back to `mtmp.mx/my`. Kick gold miss without a throw `bhitpos` can therefore use the monster cell — closer to `canspotmon` than to a kick-origin `bhitpos`. C kick still passes `gb.bhitpos` from the kick. Possible kick-vs-throw `bhitpos` debt, not a stub.

**`throw_gold` self (`:2661–2668`).** C `!dx&&!dy&&!dz` You cannot + `unsplitobj` if split ids. JS pline + return 0 (`ECMD_CANCEL`). `unsplitobj` named. **Match the refuse; omit the merge.**

**`freeinv` before swallow (`:2670`).** Parent `freeinv` only inside swallow. C always `freeinv` after the self gate. This SHA moves `freeinv` (and JS `_goldCount` botl) before swallow. **Match C order.** Extra `_goldCount` is JS wallet, not a C branch.

**Swallow (`:2671–2679`).** `digests` → `s_suffix` + entrails; `add_to_minv`; `ECMD_TIME`. JS the same. **Match.**

**dz (`:2682–2693`).** Up, not air/underwater/waterlevel: gold hits `ceiling()` then `body_part(HEAD)`; helm `an(helm_simple_name)`. JS hardcodes `"ceiling"` (named dungeon.c labels). `Underwater || uinwater` vs C `Underwater` only. Then `bhitpos = ux,uy`. **Match the bounce; ceiling string named.**

**Horizontal (`:2695–2718`).** Range `ACURRSTR/2 - owt/40`. JS `acurrstr()/2 - weight(obj)/40` (`weight` vs cached `owt` — same if owt is kept). `!isok || !ZAP_POS || closed_door` → bhitpos hero. Else `bhit(..., THROWN_WEAPON)`; gone → TIME; mon → `ghitm` catch TIME; else `ship_object`. JS dynamic `bhit`/`ghitm`/`ship_object`. `closed_door` via `D_LOCKED|D_CLOSED`. **Match the envelope.** `--can` said static ghitm is SAFE; dynamic import is extra-safe, not a clone.

**Land (`:2721–2730`).** `flooreffects(..., "fall")`; dz>0 `surface()`; `place_object`; `ushops` `sellobj`; `stackobj`; `newsym`; TIME. JS `surface` as room→floor else ground (named full `surface()`). **Match the calls.**

**`really_kick_object` (`:747`).** C `isgold ? ghitm(mon, gk.kickedobj)` — same function throw_gold now reaches. JS kick path already called local `ghitm`; this SHA only **exports** it. No second body. **Match the shared callee.**

**`hidden_gold` / `contained_gold` (call-for-call).** C `vault.c:1262–1264`: invent nobj; `Has_contents && (cknown || even_if_unknown)` then `contained_gold`. C `shk.c:3054–3058`: cobj nobj; coin `quan` else recurse if contents known or even_if_unknown. JS vault: invent **array**; cobj still nobj; same predicates. Nested bag of gold: parent kick clone added only top-level `cobj` coins; LIVE helper recurses. **Match C TRUE.** `even_if_unknown` FALSE still requires `cknown` (doprgold D-1731).

**`money_cnt` vs `money_cnt_kick`.** C returns on the first `COIN_CLASS` (`hack.c:4516–4518`). JS sums. Comment this SHA added (“first quan”) does **not** match the loop. Wallet-empty guard line uses `umoney` then `hidden_gold(TRUE)` — if two gold objects existed, JS could say “Drop the rest” when C would use only the first pile’s quan. NetHack merges gold. Debt, not Must-fix.

**Kick `bhitpos` into `miss`.** C `miss` reads `gb.bhitpos` from the kick/throw. JS `miss` uses `game.bhitpos` or `mtmp.mx/my`. `throw_gold` sets `game.bhitpos` / `game._bhitpos`. Kick gold miss may not have thrown `bhitpos`; fallback is the monster cell. `canspotmon` still gates the nam. Not a stub.

**`likes_gold` / `is_mercenary`.** LIVE monsters.js predicates. Rank chain uses `mndx` vs C `data == &mons[PM_SOLDIER]` etc. **Match those four ranks.** Watchman goldreqd stays 0 → unbribable line. **Match.**

**`setmangry(TRUE)` (`:317–318`).** C `!isgd && !rn2(4)`. Guard never angry from the catch. JS the same. **Match.** One rng unless isgd.

**`finish_meating`.** LIVE dogmove.js. C always on the catch arm. **Match.**

**`mpickobj` frees gold.** C `gold = 0` after. JS `gold = null` then `return true` before `miss(xname(gold))`. Uncaught paths never null gold. **Match.**

**`throwit` quivered gold (`dothrow.c:115` / JS `:1003–1006`).** Non-quiver coins → `throw_gold`. Quivered still named omit (return 0). This SHA did not silently throw quiver gold. **Named.**

**`closed_door`.** C `closed_door(odx,ody)`. JS `IS_DOOR && (D_LOCKED|D_CLOSED)`. Open door is ZAP_POS. **Match the block.**

**`THROWN_WEAPON`.** Parent throw_gold never called `bhit`. This SHA passes `THROWN_WEAPON` (imported). **Match C `:2706`.**

**`weight` vs `owt`.** C range uses `obj->owt`. JS `weight(obj)` from mkobj (this SHA imports it). If `owt` is stale, JS recomputes; C uses the field. Gold `owt` is set on split/freeinv. Not a stub; name if it ever desyncs.

**`ACURRSTR`.** C `ACURRSTR/2`. JS `acurrstr()/2`. LIVE attrib. Integer trunc via `Math.trunc`. C integer division. **Match.**

**`Is_airlevel` / `Is_waterlevel`.** LIVE const. JS extra `uinwater` beside `Underwater` on the ceiling bounce. C is `Underwater` only (`youprop`). Extra JS skip of the bounce while swimming in a pool: possible extra miss of the ceiling pline. Rare. Named-adjacent to Underwater, not Must-fix.

**`an(helm_simple_name)`.** dothrow already clones `helm_simple_name` (objnam.c). This SHA uses it. Do **not** add clone #5. **Match hat vs helm.**

**`s_suffix` swallow.** Local `s_suffix_throw_gold` (D-1302). C `s_suffix` returns modifiable buffer then `strcat` entrails. JS template. **Match the words.**

**`add_to_minv`.** LIVE makemon. C swallow uses `add_to_minv` not `mpickobj`. JS the same (comment). **Match.**

**`ECMD_TIME` vs `0`.** Catch/ship/floor/swallow return TIME. Self-cancel JS `0` because cmd.js treats truthy as spent time. **Match cancel vs time.**

**`ushops` sellobj.** C `if (*u.ushops)`. JS `if (u.ushops)` (non-empty string). **Match.**

**Kick gold and throw gold share `ghitm`.** Export is the only change to the kick caller. Thrown gold no longer dies after swallow. **That is the subject.**

**`really_kick_object` gold caught.** C `:747` `ghitm` true → kick consumed. JS already awaited local `ghitm`. Export does not change kick RNG. **Match.**

**`bhit` argument order.** C `bhit(dx, dy, range, THROWN_WEAPON, NULL, NULL, &obj)`. JS `bhit(dx, dy, range, THROWN_WEAPON, null, null, pref)` with pref obj getter/setter so C `obj` may be freed. **Match the pointer.**

**`ship_object` FALSE.** C `ship_object(obj, bhitpos.x, bhitpos.y, FALSE)`. JS `false`. LIVE dokick. **Match.**

**`flooreffects` "fall".** C and JS the same verb. LIVE do.js. **Match.**

**`stackobj` / `newsym` after place.** C `:2728–2729`. JS the same. **Match.**

**`digests` swallow.** LIVE monsters.js. Only then entrails suffix. **Match.**

**Self-throw before `freeinv`.** C does not `freeinv` on cancel. JS the same (freeinv after the `0` return). **Match — gold stays in invent.**

**`_goldCount`.** JS-only wallet. Not a C `if`. Does not skip `ghitm`. OK.

**`game._bhitpos` alias.** JS sets both `game.bhitpos` and `game._bhitpos` so `miss`/`bhit` share coords. C one `gb.bhitpos`. Not a C-wrong.

**RNG in this SHA.** `ghitm` catch: `!isgd && !rn2(4)` `setmangry`. Merc: `goldreqd && rn2(3)` then `ulevel*rn2(5)`. No rng in `hidden_gold`/`contained_gold`. `throw_gold` `bhit` may rng inside `bhit` (pre-existing). Guard verbalize: no rng. **Match those burns.** Nested-gold canary does not need kick rng.

**`likes_gold` wakeup.** No rng. Hostile non-greedy monsters wake. **Match.**

**Parent `throw_gold` after swallow.** Returned `0` (JS cancel) so thrown gold never `ghitm`. C always continues to dz/bhit. This SHA is the missing half of the function, not a new theory. **Density OK.**

**`ZAP_POS`.** LIVE const. Closed door excluded separately like C. **Match.**

**Callee closure (ghitm isgd arm + throw_gold → ghitm).** LIVE: `hidden_gold` (body ports C), `contained_gold` (vault clone matches shk.c), `money_cnt_kick` (sum clone), `verbalize`, `mpickobj`, `ghitm` (throw_gold), `bhit`, `ship_object`, `flooreffects`, `sellobj`, `miss`. OMIT named: SetVoice; `unsplitobj`; `ceiling()`; full `surface()`; quivered gold. STUB in the isgd / throw_gold→ghitm arms: **none**. Review **701** named omit is now LIVE. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject “guard uses `hidden_gold(TRUE)` nested `contained_gold`; `throw_gold` reaches that site”: **true**. D-log “delete non-recursive clone”: **true** (`hidden_gold_kick` NOT FOUND). Comment on `money_cnt_kick` “first COIN_CLASS quan”: **false** — the body still sums (same as `end.js:369`). Do **not** stamp “Match C `unsplitobj`.” Do **not** stamp “Match C `SetVoice` in ghitm” at this SHA. Do **not** stamp “Match C `dungeon.c` `ceiling()`.” Do **not** stamp “Match C quivered gold `throwit`.” Journal “fortress held” is not a vault-guard kick screen. **Public-unhit**; canary node 21/21 (nested TRUE vs unknown FALSE; guard stash/wallet/empty; throw self/swallow/down). Admit that.

## Density

§2b: `ghitm` isgd callee + the other C caller `throw_gold` so thrown gold hits the same site. +127. Related miss/`mhis`/value/`flags.female`. Did **not** glue SetVoice / `unsplitobj` / `c_sa_no`. Did **not** reopen D-1750 doseduce.

## Verification

D-log: save-oracle skip (untagged `dokick.c:hidden_gold`); node 21/21; green+strict seed8000/0900; CURRENT cohort **9**/9 + strict. Rule #2 clean. Vault-guard nested gold **public-unhit**. Admit that.

## Actionable C-wrongs

None for Must-fix (the isgd `hidden_gold(TRUE)` path and `throw_gold`→`ghitm` match C; SetVoice/`unsplitobj`/`ceiling` are named). Named: SetVoice in ghitm (D-1752); `unsplitobj` self-throw; quivered gold; `ceiling()`; full `surface()`. `money_cnt_kick` still sums — do **not** treat the new comment as C-first-quan. Do **not** restore `hidden_gold_kick`. Do **not** add `contained_gold` #3 in dokick. Do **not** `||1` on `oc_cost`. Do **not** use `u.female` for merc tip. Do **not** re-port D-1731 vault helper. Do **not** re-port D-1750.

Verdict: **ACCEPT-WITH-DEBT**
