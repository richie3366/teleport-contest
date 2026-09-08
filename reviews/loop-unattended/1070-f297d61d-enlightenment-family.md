# Review 1070 — f297d61d — enlightenment final-disclosure family (D-2104)

Metadata: SHA `f297d61d`, D-2104 (Open row `enlightenment`, 4 sessions). JS: `js/invent.js` +186/−~60 (4 functions). Next NN 1070.

## Intent vs deliverable

Subject promises the final-disclosure family: Upolyd background/handed/XP/hit-dice/transformed/hide + wallet hidden_gold + Invisible + Jump/Teleport. Diff actually adds: import-name extensions on four pre-existing edges + new blocks in `status_core_lines`, `enlightenment`, `one_characteristic_line_final`, `doattributes`. Promise matches deliverable; Named list defers the rest in map startup.md:24.

## Inventory

Changed JS functions: `status_core_lines` (transformed block), `enlightenment` (Upolyd form, actually, handed, XP gate, hit dice, wallet, Invisible trio, Jump/Teleport/Teleport_control), `one_characteristic_line_final` (Upolyd early return), `doattributes` (Invisible trio). No new modules, no deleted symbols — imports only extend existing `from` clauses (const/roles/objnam/monsters), so no new edge and no TDZ surface.

Callee liveness (`sym.mjs`, this iteration — all live sync unless noted):

```text
hidden_gold      js/vault.js:78   sync   (import pre-existing, invent.js:63)
hero_Teleport_control NOT EXPORTED — 1 LOCAL CLONE in js/invent.js:4750
genders          js/roles.js:695   sync
just_an          js/objnam.js:2105   sync
vampshifted      js/monsters.js:851   sync
nonliving / weirdnonliving  js/monsters.js:722 / :711   sync
is_male/is_female/is_neuter js/monsters.js:740/743/746 sync
```

`hero_Teleport_control` is a pre-existing file-local clone with a C-ref comment (youprop.h Teleport_control shape), not added here — out of this diff's scope.

## C ↔ JS fidelity

Walked every cited C range against the port (all reads from pinned upstream this iteration):

- Upolyd form (`insight.c:491–511`): `currently ` iff !final, sexless-gender adj via `genders`, vampshift `pmname(cham) in `, `just_an : "in "`, `pmname(uasmon) + form` — all match, branch order preserved. `uasmon = youmonst.data`, `vampshifted(&youmonst)` match. No RNG.
- `actually ` role prefix (`:518`: `Strcpy(buf, "actually ")`) ✓ verbatim.
- Handed (`:593–594`): C predicate is unconditional (`body_part(HANDED)!="handed"` → `"normally "`); JS adds a `!Upolyd → ""` gate. Unobservable: non-poly heroes are always humanoid, and C `mbodypart` returns `humanoid_parts[HANDED]` ("handed") there — both sides print `""`. The gate only masks the JS fallback's `'body part'` string (objnam.js:2284). Benign deviation, not a wrong output.
- XP suppress-while-poly (`:688`, `if (!Upolyd)`) ✓ — but see Actionable 1 for the inner delta gate.
- Hit dice (`:757–769`): `0 hit dice (actually 1/2)` / `1 hit die` / `N hit dice` ✓ verbatim, positioned between energy and AC as in C.
- Wallet (`:782–806`): `is empty` / `contains`, `"."` / `", but"` / `", and"` terminators, lowercase `you have/had … stashed away in your pack` continuation ✓ verbatim:

```c
Strcat(buf, !hmoney ? "." : !umoney ? ", but" : ", and");
...
Sprintf(buf, "%ld %s stashed away in your pack",
        hmoney, umoney ? "more" : currency(hmoney));
enl_msg("you ", "have ", "had ", buf, "");
```

- Transformed (`:968–973`): `ugenocided()` = mvitals G_GENOD on role/race (polyself.c:2265 ✓) + `udeadinside()` dead/condemned/empty (:2273, via nonliving/weirdnonliving ✓), felt/feel ✓, before Riding ✓.
- Invisible trio (`:1657–1664`): C `Invisible = Invis && !See_invisible`, `Invis = (H||E) && !B` (youprop.h:198–199) — JS `isInvis = (hInv||eInv) && !bInv` with the file's uprops expansion, then the three arms incl. `from_what(-INVIS)` ✓. `seeInvis` reads H/E flats only, but the sole `u.See_invisible` writer (potion.js:401–406) co-sets `HSee_invisible`, so no observable miss. Order before Displaced ✓, duplicated into the overlay path exactly as the two C sites require.
- Jump/Teleport/Teleport_control (`:1675–1685`) ✓ predicates (`Jumping/Teleportation/Teleport_control` incl. uprops) and order before Regeneration.
- `one_characteristic` Upolyd (`:854–894`): hide → skips base/peak/limit parens → plain `Your X is <val>`; C `enl_msg(subjbuf,"is ","was ",valubuf)` takes the identical path when `hide_innate_value` ✓. Deferred Fixed_abil/stuck-ring/cursed arms are map-named; the MAGIC-mode unhide (`(mode&MAGIC) && !Upolyd → hide=FALSE`) only matters with those arms ✓.

## Hallucinations / overclaim

None. No dispatch-over-stub; every new arm's callees are LIVE or pre-existing named. The "no new module, no TDZ" claim checks out (import diff is names-only on existing edges).

## Density

One C locus family (final disclosure), one JS module, related arms together. §2b-compliant despite the line count — ten small arms, each a few lines of C.

## Verification

D-log claims `verify --fn enlightenment` → 2 PASS + 2 moved past + green/strict/cohort. Re-measured this iteration:

```text
verify enlightenment: baseline f297d61d~1 — 4 session(s) blocked on it
  scen-death-Monk-92000: moved → chwepon at step 68 (was 67)
  scen-death-Wizard-92120: moved → chwepon at step 49 (was 48)
  scen-wish-Healer-92147: PASS
  scen-wish-Knight-92045: PASS
verify enlightenment: 2 PASS, 2 moved past, 0 unchanged, 0 worse → PROGRESS
```

Exact match — strictly later steps, different owner (chwepon). Diff grep: no FORCE/DIAG/getRngLog/fastforward/seed/coordinate reads. Rule #2 per commit (rule2 PASS); global rulecheck clean (review 1067).

## Actionable C-wrongs

1. XP next-level delta drops C's `(final || wizard)` gate (`insight.c:701`: `if (ulvl < 30 && (final || wizard))`; JS tests `ulvl < 30` only). Non-wizard overlay `^X` prints "N more needed…" where C prints bare "N experience points". Display-only, overlay-only (final path has `final=1`, so no measured session is affected), one-line fix in the touched block — debt for the next port iter to map-name or fix. Not map-named in this commit's Named list, hence listed here rather than silently absorbed.

Verdict: **ACCEPT-WITH-DEBT**
