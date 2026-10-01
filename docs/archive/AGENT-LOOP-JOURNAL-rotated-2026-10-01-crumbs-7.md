# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-10-01 — D-3213 `pickup.c` ×2: doloot_core single-walk cache, able_to_loot reachability arms

**C locus:** - `doloot_core`: `nethack-c/upstream/src/pickup.c:2178–2346` whole (check_capacity; nohands; Confusion rn2(6)&&reverse_loot / rn2(2); menu_requested goto lootmon; lootcont count/able_to_loot/blind-cockatrice/PICK_ANY multi/single walk/grave; lootmon direction/underfoot/dz/m_at/loot_mon/Confusion||Stunned/!looted_mon arms).
**JS:** `js/pickup.js:45` (import), `:4334–4378` (`loot_floor_containers` walk cache), `:4731–4769` (`able_to_loot`).
**Change:** cache `nobj` before `do_loot_cont` in the single walk; restart `able_to_loot` in C order wiring the live `rider_cant_reach` (steed.js), `cant_reach_floor` (engrave.js, added to the existing static edge — `--can` ALREADY), and static `nolimbs` (monsters.js, already imported) exports; pool arm is now `(looting || !u.uinwater)` per C (Underwater ≡ u.uinwater).
**Verify:** `node scripts/verify.mjs --fn doloot_core,able_to_loot` → PASS syntax (1 file) · PASS rule2 · hidden none-blocked ×2 · reach REACH-OK ×2 (fixed smoke spread 24/24 PASS each) · green 2/2 · strict ×2 · cohort 7/7 · full skipped (no shared file) · VERIFY: PASS.
**Named:** - `doloot_core`: none in the body — PICK_ANY extras (invert/pages/>26 accelerators) are `select_menu` menu-machinery (by-design, same standing as D-3199).
**Next:** callee closure holds no more Open rows (`check_capacity` body whole, no change; `mon_beside`/`get_adjacent_loc`/`ceiling` declared ported; pline-family THIN is hot display machinery, out of scope); same-file `pickup.c` remainder measures ok.

## 2026-10-01 — D-3212 `zap.c` ×2: resist clone dlev+TELL completion, do_osshock stale hoist

**C locus:** - `resist`: `nethack-c/upstream/src/zap.c:6099–6158` whole (mplayer Conflict early return; WAND12/TOOL10/WEAPON10/SCROLL9/POTION6/RING5/ulevel alev; dlev clamp + mplayer-ulevel; `rn2(100+alev-dlev) < mr`; TELL `shieldeff_mon` + halve; HP apply + `m_using`?`monkilled(AD_RBRE)`:`killed`).
**JS:** `js/music.js:167` (arm), `js/pray.js:2852` (arm) + `:2896–2900` (shield), `js/mhitm.js:582` (arm) + `:634–636` (shield), `js/zap.js:3850` (`shieldeff_mon` export) + `:5012` (`do_osshock` top-level).
**Change:** mplayer dlev arm in all 3 clones (`is_mplayer` via existing monsters.js edges — mhitm already imported it); TELL `shieldeff_mon` at both async TELL sites (export from zap.js — body verified exact vs `mon.c:6056–6064` — via existing zap.js edges in pray/mhitm; names on existing edges only, both hoisted functions, so no new cycle/TDZ — `--can` skipped); hoist `do_osshock` to top level (byte-identical body, zero closure vars — pure visibility move so sym/ledger/measure resolve it).
**Verify:** `node scripts/verify.mjs --fn resist,do_osshock` → PASS syntax (4 files) · PASS rule2 · hidden none-blocked ×2 · green 2/2 · strict ×2 · cohort 7/7 · full skipped (no shared file) · VERIFY: PASS.
**Named:** - `resist`: caller-side only — mbhitm STRIKING vs-monster arm (`muse.c:1632–1644`: resists_magm/Boing/hit/resist/miss all absent from the `js/muse.js:827` RNG stub; owns its row); potionhit confusion/blindness/acid arms (`potion.c:1780/1824/1871`; `js/potion.js:28` D-1472). Body whole in all five JS incarnations (canonical + 4 sync clones).
**Next:** next Open — coverage row (`weapon.c` possibly_unwield PARTIAL); bhitpile restack+fill_pit rides its own ledger row.

## 2026-10-01 — D-3211 `uhitm.c` ×4: mhitm_ad_cold defended+seesu, hmon anger_guards tail, mhitm_ad_stun uhitm arm, mhitm_ad_slee defended/shieldeff

**C locus:** - `mhitm_ad_cold`: `uhitm.c:2626–2681` whole (uhitm `:2633–2652`, mhitu `:2654–2663`, mhitm `:2665–2680`).
**JS:** `js/uhitm.js` (cold disjunct, hmon tail, stun arm + dispatch, 3 import names), `js/mhitu.js` (cold seesu pair), `js/mhitm.js` (`stagger` export, async `sleep_slee_mm` + awaits).
**Change:** wire the live exports in C order — `defended(mdef, AD_COLD)` disjunct (`uhitm.c:2641`); `monstseesu(M_SEEN_COLD)` / `monstunseesu` else-branch (`:2660` / `:2663`); pre-`hmon_hitmon` anger snapshot + `angry_guards(!!Deaf)` tail (house inline Deaf disjunct); new `damageum_ad_stun` (`Blind_that` stagger pline via the now-exported mhitm.js `stagger` + house `makeplural`, `mstun=1`, sync `damageum_ad_phys` — the mhitm.js phys local is the mhitm arm) + AD_STUN dispatch; `sleep_slee_mm` async with `defended(AD_SLEE)` + `shieldeff` + 0 (`mhitm.c:1232–1234`), 3 call sites awaited. No new module edges (`imports.mjs --can` ALREADY ×2; names added to existing uhitm→mon/monsters/mhitm edges).
**Verify:** `node scripts/verify.mjs --fn mhitm_ad_cold,hmon,mhitm_ad_stun,mhitm_ad_slee` → PASS syntax (3 files) · PASS rule2 · hidden none-blocked ×4 · green 2/2 · strict ×2 · cohort 7/7 · full skipped (no shared file) · VERIFY: PASS.
**Named:** - `mhitm_ad_cold`: none — all three arms whole, every callee live.
**Next:** next Open — coverage row (`zap.c` resist PARTIAL).

## 2026-10-01 — D-3210 `hacklib.c` s_suffix suffixed-clone completion (review 2160: drop `|| endsWith('S')` ×4 + zap 4-arm rewrite)

**C locus:** `nethack-c/upstream/src/hacklib.c:344–359` whole — Strcpy + strcmpi it→+s / you→+r / trailing-'s'→+' / else→+'s, in order (static-buf aliasing needs no JS counterpart — fresh strings are safe).
**JS:** `js/eat.js:3392–3400`, `js/mhitm.js:5814–5822`, `js/dothrow.js:872–880`, `js/potion.js:3010–3018`, `js/zap.js:2688–2696` (sole edits; 5 files) + `scripts/s_suffix_clones.test.mjs` (new).
**Change:** the 4 one-line clones drop the `|| endsWith('S')` disjunct (comment now cites the lowercase-only C predicate); zap restarted as the C-exact 4-arm body (toLowerCase strcmpi it/you; lowercase-`endsWith('s')` only; `String(s ?? '')` input), deleting the falsy passthrough and the z/x/ch/sh arm. Fix in place, zero new module edges (D-3200 precedent); every caller keeps its callee; behavior changes only where JS≠C, so baseline-PASS sessions cannot newly diverge.
**Verify:** `node scripts/verify.mjs --fn s_suffix` → VERIFY: PASS (ran after the last js/ edit). Tail pasted verbatim:
**Named:** - `s_suffix`: none in the body — all 11 homes now C-exact (D-3200's caller-level omits files.c:3215 SYSCF / nhlua.c:888 / insight.c:1137 stand unchanged).
**Next:** breadth queue continues (Must-fix row leaves via archive; s_suffix split now covers all 11 homes).

## 2026-10-01 — D-3209 `mon.c` iter_mons splice-safety (review 2162 savebones removal-skip)

**C locus:** - `iter_mons`: `nethack-c/upstream/src/mon.c:4526–4538` whole — `for (mtmp = fmon; mtmp; mtmp = mtmp2)` with `mtmp2 = mtmp->nmon` cached before the DEADMONSTER/mon_offmap skip and the `(*vfunc)(mtmp)` call.
**JS:** `js/mon.js:2968–2980`; 1 js file.
**Change:** walk `[...(game.fmon || [])]` — the snapshot is C's mtmp2 chain (C-created mons prepend to fmon and are likewise unvisited mid-walk, so the snapshot matches C for both removal and insertion); DEADMONSTER (`mhp < 1`) + `mon_offmap` checks stay at visit time against live refs. JSDoc corrected to cite the unlink hazard and the snapshot. No new module edges; export name/signature unchanged.
**Verify:** `node scripts/verify.mjs --fn iter_mons` → VERIFY: PASS (ran after the last js/ edit). Tail pasted verbatim:
**Named:** - `iter_mons`: none — whole 13-line C body live.
**Next:** next Must-fix row (`s_suffix` suffixed clones, review 2160).

## 2026-10-01 — D-3208 `attrib.c` from_what negative INVIS + CLAIRVOYANT arms (review 2165 finding 2)

**C locus:** - `from_what`: `nethack-c/upstream/src/attrib.c:986–995` whole — `case INVIS: if (uprops[INVIS].blocked & W_ARMC) Sprintf(buf, because_of, ysimple_name(uarmc))` (mummy wrapping); `case CLAIRVOYANT: if (wizard && (uprops[CLAIRVOYANT].blocked & W_ARMH)) Sprintf(buf, because_of, ysimple_name(uarmh))` (cornuthaum). BLINDED arm (`:979–983`) untouched.
**JS:** `js/attrib.js:1225–1254` (negative block), imports `:37–38,44–45`; 1 js file.
**Change:** the two `if` arms in C switch order after the BLINDED arm. Blocked masks read the JS dual store (flat `BInvis`/`BClairvoyant` mirror OR `uprops[].blocked` — `apply_w_blocks` in `js/do_wear.js:620–637` writes both, and every live reader in `js/do_wear.js:869`/`js/invent.js:6687/6755` ORs them); the tested slot bit (`W_ARMC`/`W_ARMH`) and the `ysimple_name(uarmc/uarmh)` suffix are C-exact, as is the inner `wizard &&` on CLAIRVOYANT (vacuous under the outer wizard gate, ported as written). No new module edges — `INVIS`/`CLAIRVOYANT`/`W_ARMC`/`W_ARMH` join the existing static `./const.js` import; `ysimple_name` already imported.
**Verify:** `node scripts/verify.mjs --fn from_what` → VERIFY: PASS (ran after the last js/ edit). Tail pasted verbatim:
**Named:** - `from_what`: none added — birth blind/deaf + Blindfolded_only/cream stay named in the JSDoc (pre-existing, positive-propidx arms outside this Must-fix).
**Next:** next Must-fix row (`savebones` removal-skip via `iter_mons`, review 2162).
