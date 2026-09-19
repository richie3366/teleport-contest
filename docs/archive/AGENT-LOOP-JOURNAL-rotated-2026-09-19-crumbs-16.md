# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-09-19 — D-2571 `zap.c` create_polymon whole-body port (material→golem table, bhitpile wire)

**C locus:** `nethack-c/upstream/src/zap.c:1546–1633` (`create_polymon`, staticfn; decl `:19`; sole C caller `bhitpile` `:2485`): bypassed pile-head skip `:1553–1561` + lone-object refusal `:1564–1565` + material→golem switch `:1568–1620` (rn2(2) lithic fork, straw default) + genocided-mdat null `:1622–1623` + makemon MM_NOMSG `:1625` + polyuse toward cwt `:1627` + visible meld/arise pline `:1628–1632`.
**JS:** `js/zap.js` `create_polymon` + two import names + const blocks + bhitpile wire (caller untouched otherwise).
**Change:** `js/zap.js` — new file-local async `create_polymon(obj, okind)` (C staticfn → file-local like `bhit_skiprange`) in C order with `:line` cites; `G_GENOD` joins the existing const.js import + `a_monnam` joins the existing do_name.js import (two ALREADY-edges, no new module); new `MAT_*` material consts (`objclass.h:14–35`) beside `MAT_GEMSTONE/MINERAL` + nine `PM_*_GOLEM`/`PM_SKELETON` consts beside the golem block (`monsterNames.indexOf`, all nine verified in `js/generated/`). `mons(pm_index)?.cwt` feeds polyuse even when genocided (C `mons[pm_index].cwt`, not mdat).
**Verify:** `node scripts/verify.mjs --fn create_polymon` → VERIFY: PASS. Tail pasted verbatim:
**Named:** none new — every arm and callee live or ported in this commit (`recreate_pile` restack + `fill_pit` stay named omits with own rows, review 1326).
**Next:** pop the next Open — coverage row (`uhitm.c` mhitm_ad_wrap).

## 2026-09-19 — D-2570 `shknam.c` shkinit restart in C order (live set_malign + mon_learns_traps)

**C locus:** `nethack-c/upstream/src/shknam.c:628–692` (`shkinit`, staticfn; decl `:17`; sole C caller `stock_room` `:733`): good_shopdoor `:636` + DEBUG wizard block `:638–655` + sh<0 return; MON_AT insurance rloc `:658–660`; makemon MM_ESHK `:663–664`; ESHK `:665`; isshk/mpeaceful + set_malign + msleeping + mon_learns_traps `:666–668`; shoproom/resident/shoptype/assign_level/shd/shk `:669–675`; zeroed books `:676–680`; mkmonmoney `:681`; touchstone `:682–683`; charging `:684–687`; nameshk `:688`; return sh `:690`.
**JS:** `js/shknam.js` `shkinit` + three import names only (caller untouched).
**Change:** `js/shknam.js` — restarted `shkinit` in C order with `:line` cites: `set_malign` joins the existing makemon.js import + `mon_learns_traps` joins the existing monsters.js import + `ALL_TRAPS` joins the existing const.js import (three ALREADY-edges, no new module); DEBUG wizard impossible/pline block named as compiled-out omit with the same `return -1`; `assign_level` kept as the inline dnum/dlevel copy (`dungeon.c:1978` equivalent-to-dest=source; no single live export — dig/do/dungeon/potion each carry a file-local clone); ESHK `|| neweshk` kept as dead insurance (makemon allocates MM_ESHK at `makemon.js:3300`). No new RNG draws (set_malign/traps are draw-free).
**Verify:** `node scripts/verify.mjs --fn shkinit --reach-all` → VERIFY: PASS. Tail pasted verbatim:
**Named:** `#ifdef DEBUG` wizard impossible/pline/display block (`:638–655`, DEBUG undefined in production); `assign_level` inline copy (above — the body, not a stub); ESHK fallback (above — dead on success). Every other arm and callee live (`good_shopdoor`/`nameshk` file-local like C staticfns; `rloc`/`makemon`/`mkmonmoney`/`mongets`/`rnd`/`rn2` live).
**Next:** pop the next Open — coverage row (`uhitm.c` mhitm_ad_ench).

## 2026-09-19 — D-2569 `mkroom.c` mkshop whole-body restart (wizard/ep arms, nroom impossible guard)

**C locus:** `nethack-c/upstream/src/mkroom.c:95–216` (`mkshop`, staticfn; decl `:23`; sole C caller `do_mkroom` `:55` for roomtype ≥ SHOPBASE): wizard SHOPTYPE block `:101–155` (env `:103`, single-char dispatch `:105–144`, symb loop `:145–147`, g/v arms `:148–153`); `gottype` walk `:157–178` (hx<0 sentinel return `:163`, past-nroom impossible `:165–168`, OROOM/stairs gates `:169–172`, doorct `:173–177`); light `:180–187`; `rnd(100)` pick + big-room clamp `:189–201`; rtype/topologize/needfill `:203–215` (SPECIALIZATION off per `global.h:120`, so the 1-arg `topologize` arm).
**JS:** `js/mklev.js` `mkshop` only (caller untouched).
**Change:** `js/mklev.js` — restarted `mkshop` in C order with `:line` cites: `wizard` const (`flags.debug`/`flags.wizard`, pick_room precedent); `ep = null` with the `nh_getenv("SHOPTYPE")` named-omit comment (no environment in scored ESM per Rule #2, makemaz SPLEVTYPE precedent); unbounded `gottype` walk with sentinel return + `impossible('rooms[] not closed by -1?')` fire-and-forget (splev_create_monster sync precedent) + OROOM/stairs gates + `doorct==1 || (wizard && ep && doorct!=0)` arm + `invalid_shop_shape` break; light loop; `if (i<0)` `rnd(100)` walk + `isbig` wand/book→general clamp; rtype/topologize/needfill. No new imports, no new cross-module edges, no new RNG draws (REACH-safe by construction).
**Verify:** `node scripts/verify.mjs --fn mkshop` → VERIFY: PASS. Tail pasted verbatim:
**Named:** SHOPTYPE single-char dispatch (`:104–153` — env endpoint absent per the omit above; every dispatch callee — `mkzoo` all 8 types, `mktemple`, `mkswamp` — is live in `js/mklev.js`). No new `def_oc_syms` import (only the omitted symb-match loop needed it).
**Next:** pop the next Open — coverage row (`shknam.c` shkinit).

## 2026-09-19 — D-2568 `objnam.c` readobjnam_postparse2 whole-body port (o_ranges, stone/gem strip, glass arms)

**C locus:** `nethack-c/upstream/src/objnam.c:4666–4724` (`readobjnam_postparse2`, staticfn; decl `:58`; sole C caller `readobjnam` `retry:` `:4947–4955`): o_ranges exact loop (`:4671–4675`, table `:3346–3365`); ` stone`/` gem` strip + GEM_CLASS + actualn/dn (`:4677–4683`); `looking glass` empty guard (`:4684–4685`); ` glass`/`glass` arm (`:4686–4716`: broken→null, `worthless `/`piece of `/`colored `/`coloured ` strips, bare `glass`→`FIRST_GLASS_GEM+rn2(9)` iff still GEM_CLASS else punt, else canonical `worthless piece of <color>` rebuild); actualn/dn tail (`:4719–4723`). `d.p` is `eos(d.bp)` at entry (`:4488`), so the BSTRCMPI checks are suffix matches. Postparse1 `return 1` (wrp class-word arms, glob) goes straight to `srch`, skipping postparse2.
**JS:** `js/readobjnam.js` (table + function + two import names + caller gate); `docs/c-js-map/turns.md` readobjnam section (D-2568 note; `o_ranges`/`glass` retired from the D-0507/D-2021 named lists).
**Change:** `js/readobjnam.js` — `O_RANGES` (`:1006`, C order, indices resolved once like `ALT_SPELLINGS_RESOLVED`) + `FIRST/LAST/NUM_GLASS_GEMS` (`:1029–1031`, 9 contiguous, mhitm.js precedent) + exported `readobjnam_postparse2` (`:1041`) in C order with `:line` cites, reusing file-local `bstrcmpi_end`/`strncmpi_start` (exact for these sites: every pattern's length equals its `n`) and live `strstri`/`rn2`; `rnd_class` joins the existing mkobj.js import and `VENOM_CLASS` the existing objects.js import (both ALREADY-edges, no new module). Wired at the `retry:` site (`:1318–1329`): code 3 returns `d.otmp`, 2 leaves `d.typ` for the srch `!d.typ` gate, 0/1 run srch. First wiring ran postparse2 unconditionally and regressed 6 smoke sessions + cohort seed0383 (owner `rnd_otyp_by_namedesc` — the tail clobbered the class-words `actualn`, e.g.
**Verify:** `node scripts/verify.mjs --fn readobjnam_postparse2` → VERIFY: PASS. Tail pasted verbatim:
**Named:** postparse3 `case 6` retry re-entry (above); single-char class code (C postparse1 `return 4`, pre-existing gap — postparse2 no-ops on 1-char bp); `paperback`/`unlabeled`/`holy-water`/`orange`/`versus-poison` typ arms (pre-existing inline gaps — postparse2 no-ops on those strings, baseline flow kept). No new `strncmpi` clone (helpers reused).
**Next:** pop the next Open — coverage row (`mkroom.c` mkshop).

## 2026-09-19 — D-2567 `engrave.c` make_engr_at restart in C order (smem/havepristine, engr_szeach/engr_alloc, N_ENGRAVE random arm)

**C locus:** `nethack-c/upstream/src/engrave.c:407–457` (`make_engr_at`, extern via extern.h:1016, s NONNULLARG3): smem = strlen(s)+1, widened to pristine (`:414–422`); replace-at via engr_at/del_engr (`:423–424`); newengr(smem*3) + memset + prepend + coords (`:426–431`); three text slots all start as s, pristine overwritten only when passed (`:432–438`); Elbereth → guardobjects iff in_mklev else exercise(A_WIS,TRUE) (`:439–447`); time / (xint8) type-or-`rnd(N_ENGRAVE-1)` / engr_szeach / engr_alloc (`:448–454`); eread/erevealed left for the caller (`:455–456`).
**JS:** `js/engrave.js` (function restart + one import name); `docs/c-js-map/turns.md` engrave section (D-2567 note).
**Change:** `js/engrave.js` — restarted `make_engr_at` in C order with `:line` cites: smem/havepristine block, replace-at (del_engr no-ops on null, matching the `!= 0` guard), record literal with `engr_szeach: smem` + `engr_alloc: smem * 3`, pristine overwrite gated on havepristine, Elbereth guardobjects/exercise after list prepend; `N_ENGRAVE` joins the existing const.js import (ALREADY-edge, numerically 6 either way). `return ep` kept (C is void) — mklev lua/des handlers depend on it.
**Verify:** `node scripts/verify.mjs --fn make_engr_at` → VERIFY: PASS. Tail pasted verbatim:
**Named:** newengr/engr_text_space arena (by design — JS strings need no arena; sizes kept on the record); `return ep` JS extension noted above. Every arm live.
**Next:** pop the next Open — coverage row (`objnam.c` readobjnam_postparse2).

## 2026-09-19 — D-2566 `optlist.h` travel_debug negateok-No dropped from OPT_NEGATEOK_NO (review 1520 QUALITY-RISK)

**C locus:** `nethack-c/upstream/include/optlist.h:794–796` non-DEBUG arm `NHOPTB(travel_debug, Advanced, 0, opt_out, set_wizonly, Off, No, No, No, NoAlias, (boolean *) 0, Term_False, (char *)0)` — negateok `No`, so C has 64 negateok-No rows under the contest-linux `cc -E` set. JS `allopt` already carries the row (`js/options.js:3563–3564`, idx 193, SET_WIZONLY).
**JS:** `js/options.js` (one entry); `scripts/parseoptions.test.mjs` (one case); `docs/c-js-map/data.md` parseoptions row (63→64 + D-2566 note); queue row marked.
**Change:** `js/options.js` — add `'travel_debug'` after `'traps'` (64 names). `scripts/parseoptions.test.mjs` — new `it` pins `parseoptions("!travel_debug", true, true) === false` with `in_parseoptions` leaking exactly +1 per C `:628` (no `:644` decrement).
**Verify:** `node scripts/verify.mjs --fn parseoptions` → VERIFY: PASS. Tail pasted verbatim:
**Named:** none new — dormant optfn dispatch still unported (D-2561 named).
**Next:** pop the next Open — coverage row (`engrave.c` make_engr_at).
