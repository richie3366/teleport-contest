# Review 852 — db5d8f30 — objnam.c xname ROCK_CLASS STATUE historic + unique/pname article (D-1882)

## Metadata

- SHA: `db5d8f30` ("objnam.c xname ROCK_CLASS STATUE historic + unique/pname article (dolook corpus owner) (D-1882).")
- D-id: D-1882. Queue row: Open (dolook corpus owner), popped in order.
- Files: `js/objnam.js` (+13/−3), docs + map + scoreboard. Same-module
  import additions only (`PM_ARCHEOLOGIST`, `CORPSTAT_HISTORIC`).

## Intent vs deliverable

Subject promises: port the C STATUE Snprintf envelope (historic prefix,
pname/unique/`just_an` article, gender-aware pm name) into
`pretty_base`. Diff does exactly that, replacing the
`` `statue of ${an(mon_name)}` `` stand-in. Promise kept.

## Inventory

| JS change | Status |
|---|---|
| STATUE arm in `pretty_base` | changed: full C envelope port |

Deleted/re-pointed: `mon_name` + `an()` use removed from this arm (both
remain used elsewhere — no symbol deleted, so no Required `sym.mjs`
deletion paste; new callees classified below).

## C ↔ JS fidelity

C locus `xname_flags` ROCK_CLASS STATUE (`objnam.c:802–814`, read via
csym; the `Snprintf(buf, "%s%s of %s%s", historic?, actualn, article,
statue_pmname)` over `obj_pmname(obj)`). JS
`` `${historic}statue of ${pmart}${statue_pmname}` `` reproduces the
envelope exactly:

- `historic`: C `(Role_if(PM_ARCHEOLOGIST) && (spe & CORPSTAT_HISTORIC))
  ? "historic " : ""` → JS identical predicate. `Role_if` clone
  (`objnam.js:145`, `game.urole?.mnum === pm`) matches C
  `you.h:247` `(gu.urole.mnum == (X))`. ✓
- `statue_pmname`: `obj_pmname_corpse` clone (`objnam.js:1068`) walked
  against C `obj_pmname` (`do_name.c:1320–1359`): same otyp gate, same
  `spe & CORPSTAT_GENDER` mapping, same aligned-cleric RANDOM→CLERIC
  remap, `pmnames[mndx][g]` = `pmname()`. The only divergence is the
  off-gate fallback (`'thing'` vs C `impossible()` +
  `"two-legged glorkum-seeker"`), unreachable from this arm since the
  call site guards `ismnum`. Verified CLONE. ✓
- `article`: `type_is_pname_objnam` clone = C `mondata.h:135`
  `(mflags2 & M2_PNAME)` exactly; `the_unique_pm` is a LIVE export;
  `just_an` LIVE (`objnam.js:1838`). Ternary order pname → unique →
  `just_an` matches. ✓
- Outer article: C `doname :1686–1692` redoes `just_an` over an "a "
  prefix, so `historic statue…` → `a historic statue…`. JS outer
  `doname` untouched on the same path. End-to-end: `You see here a
  historic statue of a forest centaur.` = the C row. ✓
- `NON_PM`/non-`ismnum` → bare `'statue'`: C's `omndx != NON_PM` gate
  falls through to `Strcpy(buf, actualn)` = `"statue"`. JS adds an
  `!ismnum` guard C lacks — defensive (C would index `mons[]` out of
  bounds on a corrupt corpsenm), same outcome for every valid input.
  Not a C-wrong.

No RNG on the path. No STUB. Named (not hidden): wizmgender `(%s)`
suffix (`:1550–1558`), FIGURINE arm, `readobjnam` wish-parse
(`:5164`) — all cited with loci, no corpus block.

## Hallucinations / overclaim

None. "Same-module imports only — no new module edge" true (both names
join existing import lists). The `spe`-was-correct level-source claim
(`oracle.lua` → `sp_lev.c:3706–3713` → `mklev.js`, already ported) is
consistent with the symptom (only the prefix was missing, monster
correct).

## Density

+13/−3 against a 13-line C arm — C-locus-sized. Fine.

## Verification

- Diff grep: no FORCE/DIAG/seed/coordinate content (name strings only).
  Rule #2 untouched.
- Re-measured myself: `node scripts/hidden-proxy.mjs verify dolook
  --base db5d8f30~1` → `1 PASS → PROGRESS`
  (`tour-Archeologist-70010-d3-6-10-11-12: PASS`). Matches the D-log
  exactly.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
