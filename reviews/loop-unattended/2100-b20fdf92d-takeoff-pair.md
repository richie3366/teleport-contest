# Review 2100 — b20fdf92d — do_wear.c takeoff pair + cmd.js ECMD bitmask

- SHA: `b20fdf92d91c1370c4307785c3e8aedec3837fc4` (D-3140)
- Parent: `e5816afe0`
- Files: `js/do_wear.js` (+34/−40 incl. clone deletion), `js/cmd.js` (+4/−3); docs + ledger otherwise
- Cluster: 2 do_wear.c functions + a 1-arm caller fix in cmd.js

## Intent vs deliverable

Subject promises: "dotakeoff uskin/ECMD_CANCEL + wornarm_destroyed cancel_don/live-useup".
Diff actually adds: the uskin arm + ECMD returns in `dotakeoff`, cancel_don + live `useup` in
`wornarm_destroyed`, deletion of the `invent_useup` clone, a stale-omit doc touch, and the cmd.js
'T' bitmask. Promise matches deliverable.

## Inventory

| JS function | kind | C locus (csym) |
|---|---|---|
| `dotakeoff` (arms) | gap-fill | `do_wear.c:1832–1855` |
| `wornarm_destroyed` (arms) | gap-fill | `do_wear.c:3141–3182` |
| `invent_useup` | clone DELETED | invent.c useup (drifted: no in_use/weight/update_inventory) |
| cmd.js 'T' arm | caller fix | — |

No new imports across modules (`ECMD_CANCEL` joins the existing const edge; `useup` already
imported at do_wear.js:31). Required `sym.mjs` on the deleted symbol:
`invent_useup NOT FOUND in js/** (no export, no local function/const)` — clean deletion, no
second clone, no remaining caller.

## C ↔ JS fidelity

**dotakeoff** — confirm. uskin arm is text-exact vs C `:1839–1844`: commented-out assert kept as
a comment (C has it commented out too), `uskin->otyp >= GRAY_DRAGON_SCALES` with the
`"dragon scales are" / "dragon scale mail is"` split, `pline_The("%s merged with your skin!")`.
`GRAY_DRAGON_SCALES` via the file's `objectNames.indexOf` otyp idiom (:166; C otyp enum,
objects.h:531). `!otmp → ECMD_CANCEL` (`:1853`) replaces the wrong `return 0`; `ECMD_OK` replaces
`return 0` (`:1847`; same value 0x00, now named). `ECMD_CANCEL = 0x02` vs `ECMD_TIME = 0x01`
(const.js:1953–1956) proves the old cmd.js truthiness read (`tookTime ? 1 : 0`) would have consumed
a turn on cancel — the `(res & ECMD_TIME)` bitmask matches the 'A'/'d'/'D' siblings and is required,
not cosmetic. Other `dotakeoff()` callers are safe: `ia_dotakeoff` passes `res` through opaquely;
the getline EXT_CMDS runner returns it to generic ECMD dispatch.

**wornarm_destroyed** — confirm. `wornoid` captured first; `if (donning(wornarm)) cancel_don()`
with the C `:3151–3155` comment (both live sync exports, do_wear.js:3908/3956, called before the
slot tests as C requires); `*_\bff` chain in exact C slot order; invent scan with the
`invobj === wornarm && o_id === wornoid` guard calling live `useup` + `break` — the break makes
C's `nextobj` pre-fetch unnecessary, as the comment states. Named omissions cleared correctly
(the `cancel_don` omit drops from both this doc and `disintegrate_arm`'s). No RNG in either arm.

Grep: no FORCE/DIAG/getRngLog/seed-gates/fastforward/coords. Rule #2: clean (see 2096).

## Hallucinations / overclaim

None. "Drifted local invent_useup (no in_use clear, weight, or update_inventory)" is accurate —
the deleted body (visible in the diff) only splices + zeroes.

## Density

Breadth-phase cluster: 2 whole-C-function completions in one C file + the caller arm the ECMD
change requires, 81 js changed lines. Each function has its Ledger entry and Verify line.
Per-function verdicts: dotakeoff ACCEPT, wornarm_destroyed ACCEPT.

## Verification

Re-measured: `hidden-proxy.mjs verify dotakeoff,wornarm_destroyed --base b20fdf92d~1 --reach-all`
→ both `0 blocked` + `smoke 24 PASS, 0 regressed → REACH-OK`. No REGRESSED. Matches the D-log
Verify bullet (vacuous + REACH-OK, green/strict/cohort/full claimed in-commit).

## Actionable C-wrongs

None.

## Verdict

Verdict: **ACCEPT**
