# Review 2035 — 3a3d73a50 — create_particular_parse whole-body restart (D-3075)

Metadata: SHA `3a3d73a50`, D-3075, js/read.js (+181/−78).
Single function restart + `disintegrate_cursed_armor`
stale-retired.

## Intent vs deliverable

Promise: restart the gender-only thin local as the whole
C body with the C `(str, &d) → boolean` signature, caller
to `if (parse(bufp, d)) break`. Diff delivers that plus
imports (monster_census, strstri/strncmpi, ismnum,
PM_STALKER/PM_LONG_WORM). Kept — but the newly-TRUE class
arm feeds a creation envelope that cannot honor it (below).

## Inventory

- `create_particular_parse` (RESTARTED js/read.js:2744,
  local — C staticfn): all 12 `d` defaults, quan prefix +
  QUAN_LIMIT clamp, six blanked terms, mungspaces,
  disposition, wizard `*`/`random`, name_to_mon + gender
  merge, ismnum, name_to_monclass 4 arms. Callees all
  LIVE (monster_census, strstri, mungspaces, strncmpi,
  name_to_mon, name_to_monclass, ismnum). Locals:
  `blankTerm`/`isDigit` closures (C inline code, not C
  functions — not clones). `digit()` inlined 1-line
  (no JS export; disclosed). No deleted symbols.

## C ↔ JS fidelity

C read.c:3136–3249 (csym range). Defaults :3145–3152
all 12 ✓ (monclass −1 ≡ MAXMCLASSES, disclosed).
Digit run :3155–3160: parseInt ≡ atoi under the digit
guard ✓, space-only skip ✓, empty-string safe ✓.
QUAN_LIMIT ROWNO*(COLNO−1) + census clamp ✓.
blankTerm ×6 in C order, female-before-male ✓;
strstri returns tail-or-null (hacklib.js:585–625) so
`hit = len − tail.len` ✓; blank widths 8/9/10/7/7/5
≡ sizeof−1 ✓. mungspaces ✓. Disposition +5/+9/+8 ✓.
Wizard gate: C `wizard` ≡ flags.debug (flag.h:30); JS
wizard_mode() = debug||wizard, but flags.wizard is
never set true (only cleared cmd.js:275; both modes
set debug options.js:3606) → equivalent ✓. Gender
merge :3220–3229 ✓ (MALE=0/FEMALE=1 const.js:322–323
✓). ismnum ✓. monclass arms: species ✓, 'S_invisible'
→ stalker ✓, 'S_WORM_TAIL' → long worm ✓,
typeof-string ≡ C `> 0` (all real classes ≥ 1,
defsym.h:295–366; 0 = failure both sides) ✓.
Caller read.c:3387: bufp mungspaces'd ✓, d reused
across tries with all fields assigned at entry ✓,
d read only after TRUE ✓ → js/read.js:2928 exact C
form ✓. No RNG. Parse function: confirm.

Stale: disintegrate_cursed_armor single local
js/read.js:1207 (note cites :1202, same def) ✓.

## Hallucinations / overclaim

YES — material. The D-log claims class/`*` inputs are
contained: "acting on randmonst/class d belongs to
create_particular_creation (PARTIAL, open D-2004 —
unchanged envelope, returns false there as before)."
Creation (js/read.js:2858) returns false only for
`d.randmonst`. For class-`d` (monclass string set,
which = urole.mnum placeholder per :3247) it PROCEEDS:
creation never reads d.monclass (grep: zero reads
outside parse) and creates `d.quan` copies of the
player's role monster. C creation (read.c:3279–3282)
picks `mkclass(d->monclass, 0)` per iteration instead.
Pre-SHA, class letters hit parse-null → "I've never
heard..." re-prompt (contained); post-SHA they
silently create the wrong monster. The "returns false
there as before" sentence is false for class inputs,
and the SHA ships a live-path (^G is a held-out
surface) C-wrong that was not there before.

## Density

Single whole function + 1 stale — §2b-shaped ✓.
`Ledger:` parse ported ✓. Per-function verdict:
create_particular_parse ACCEPT as a body — but the
SHA verdict is the shipped behavior: QUALITY-RISK.

## Verification

Re-measured `hidden-proxy verify create_particular_parse
--base 3a3d73a50~1 --reach-all`: 0 blocked (honestly
vacuous — coverage row) + smoke 24/24 → REACH-OK, 0
regressed ✓. Ban-grep clean. Rulecheck clean (2033).

## Actionable C-wrongs

1. `create_particular_creation` consumes class-`d` as
   named-`d`: C read.c:3279–3282 `whichpm =
   mkclass(d->monclass, 0)` absent — JS creates urole.mnum
   (the :3247 placeholder) instead of a random class
   member. Fix: containment guard (`monclass` set →
   return false, like randmonst) or wire mkclass.

Verdict: **QUALITY-RISK**

**Addressed:** D-3083
