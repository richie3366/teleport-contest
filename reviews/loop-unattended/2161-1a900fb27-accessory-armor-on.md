# Review 2161 — 1a900fb27 — accessory_or_armor_on + already_wearing2

SHA `1a900fb27`, D-3201; 2026-10-01; `js/do_wear.js` only (+97/−26).
Two-function same-file cluster (do_wear.c; callee already_wearing2) +
8 stale-head ledger retires. Closes no prior review.

## Metadata

- Subject: "`do_wear.c` accessory_or_armor_on whole-body completion
  (helm quest arm, ring/hand C names, eyewear matrix, takeoff reset) +
  already_wearing2 port".
- Promises: helm-of-opposite-alignment quest refusal; four C-computed
  messages; full ublindf matrix; takeoff reset; live is_worn;
  set_bknown; ESC cancel; new already_wearing2; armor/accessory
  unreachable-arm impossibles.

## Intent vs deliverable

Kept in full. Diff adds the helm quest arm in C position, the There +
humanoid ring-fingers message, the C ring-hand question with ESC
cancel, Glib gloves_simple_name, set_bknown, welded body_part(HAND) +
bimanual makeplural, the complete ublindf matrix with both
already_wearing2 cross arms and the `something` fallthrough, the armor
takeoff reset, the is_worn replacement, both unreachable-arm
impossibles, and the new already_wearing2. Three import lines extended
on pre-existing edges; no new module edges.

## Inventory — accessory_or_armor_on

Changed: `accessory_or_armor_on` (helm arm, ring messages/gates,
ublindf matrix, armor-else, takeoff reset, ring is_worn,
accessory-else), `choose_ring_hand` (question + ESC), new
same-file `already_wearing2` (C staticfn → local is correct).
Deleted/re-pointed: none. New names resolve LIVE and are awaited
where async:

```text
There            js/display.js:7879   ASYNC — await required (awaited ✓; the export, not the 1 local clone)
You_cant         js/display.js:7871   ASYNC — await required (awaited ✓)
humanoid         js/monsters.js:382   sync ✓
something        js/const.js:541   sync export ✓
FACE             js/const.js:583 (= 2) ✓
```

Pre-existing-edge names used by the new arms (body_part polyself,
gloves_simple_name/makeplural/safe_typename objnam, makeknown/is_worn
invent, retouch_object artifact, canwearobj/ring_bimanual/
fingers_or_gloves same-file) all resolve to the same live bindings —
no clone added, no STUB in any live arm.

## C ↔ JS fidelity — accessory_or_armor_on

C `do_wear.c:2208–2428` (csym range), audited arm by arm. Helm quest
`:2232–2243`: post-canwearobj position ✓, dnum-only compare
(`qstart_level` is dungeon-def-populated, never null-quest zero —
C dungeon.c:733, so the JS null guard only covers pre-init) ✓,
alignbase current-vs-original ✓, both messages verbatim ✓,
ublessed=0 + makeknown + disp.botl ✓, ECMD_TIME ✓. Ring
`:2256–2301`: nolimbs ✓, There + humanoid + fingers_or_gloves(FALSE)
✓ verbatim, uleft/uright masks ✓, question `Which %s%s, Right or
Left?` ✓, l/L/r/R + `\0`/`\x1b` cancel ✓ (the ESC surfaces via the
getline.js remap path with def `\0`, mirroring C `:5559–5581`; the
`while (!mask)` loop is the `for(;;)` ✓). Glib `:2289–2293`:
Your + gloves_simple_name + always-TIME ✓. Cursed gloves
`:2295–2299`: learned-before-set ✓, set_bknown ✓, message ✓
(`c_gloves` is the constant `"gloves"` — C do_wear.c:12 — so the kept
hardcoded string is C-exact), learned?TIME:OK ✓. Welded `:2301–2314`:
res-before-welded ✓, hand condition ✓, bimanual makeplural ✓,
message ✓, res-gated return ✓. Amulet `:2316–2320` ✓, eyewear
has_head ✓, matrix `:2334–2352` (towel/FACE, both cross arms with
exact string pairs, something fallthrough) ✓, neither
(`You can't wear that!` ≡ You_cant) ✓. Retouch `:2361–2362` ✓
(C's `*objp = 0` write is unobservable here — that path returns
before obj is touched). Armor `:2364–2415`: W_WEAPONS release ✓,
wasinwater snapshot ✓, setworn ✓, afternmv chain ✓, delay/nomul vs
unmul+on_msg ✓, takeoff mask/what = 0 ✓ (wasinwater kept, as C
comments). Ring set `:2418–2422`: setworn + Ring_on + live is_worn —
the replacement FIXES the old inline, which missed W_BLINDFOLD (via
W_ACCESSORY) and W_SADDLE (C invent.c:2156–2161; JS invent.js:1313 is
C-exact) ✓. Amulet_on/Blindf_on ✓, accessory-else impossible
`:2425–2426` verbatim + live safe_typename ✓. Armor-else `:2397`
panic → impossible + afternmv-null per the cited house precedent;
diagnostic text matches for non-negative masks (negative-masks hex
differs — unreachable arm, diagnostic-only; noted, not queued).
Callers: C `:2449` dowear → js/do_wear.js:3500 return-through ✓,
C `:2468` doputon → :3520 return-through ✓; no other JS callers.
Verdict: ACCEPT.

## Inventory + fidelity — already_wearing2

New same-file async fn; C `:2016–2020` is one You_cant line — JS
verbatim (`wear %s because you're wearing %s there already.`) ✓.
C's only two call sites (`:2335`, `:2340`, csym-verified) both wired
in the new matrix with the exact argument pairs ✓. Verdict: ACCEPT.

Diff grep: no FORCE/DIAG/getRngLog/fastforward/seed/coordinate gates.
Rule #2 clean (iteration-wide rulecheck).

## Hallucinations / overclaim

None material. "Whole-body completion" holds (every arm above live or
precedent-covered; Named: none is accurate). Two glosses, both
pre-existing and unqueued, noted for precision: (1) the D-log's
"`!otmp → 0` matches the no-turn convention" elides that C returns
ECMD_CANCEL (0x02) — move=0 matches either way, but the dispatch
additionally cmdq_clears on CANCEL (js/cmd.js:5296); untouched caller
lines, no corpus evidence, not this SHA's wrong. (2) The armor-else
`%08lx` rendering differs for negative masks (unreachable,
diagnostic-only).

## Density

Two whole C functions of one C file in caller/callee shape, +97 js
insertions, no Must-fix bundled — textbook §2b. The 8 same-iteration
stale retires are ledger sets with notes, not ports. Per-function
Ledger (both ported) and Verify lines present.

- Ledger: accessory_or_armor_on ported — ACCEPT.
- Ledger: already_wearing2 ported — ACCEPT.

## Verification

Re-measured (one call, current tree incl. this SHA):

```text
verify accessory_or_armor_on: baseline 1a900fb27~1 (scoreboard at 057174e0c) — 0 session(s) blocked on it (0 at baseline, 0 working)
smoke accessory_or_armor_on: no RNG-tagged reach; fixed smoke spread (24 run, 10.6s): 24 PASS, 0 regressed → REACH-OK
verify already_wearing2: baseline 1a900fb27~1 — 0 session(s) blocked on it (0 at baseline, 0 working)
smoke already_wearing2: no RNG-tagged reach; fixed smoke spread (24 run, 10.6s): 24 PASS, 0 regressed → REACH-OK
```

Matches the D-log tail verbatim (syntax/rule2/hidden notes/reach
smoke 24/24 both/green/strict/cohort, full skipped — no shared file).
No REGRESSED session; vacuity stated plainly.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
