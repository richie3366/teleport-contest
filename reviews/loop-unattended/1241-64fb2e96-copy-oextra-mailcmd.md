# Review 1241 — 64fb2e96 — copy_oextra + mailcmd helpers + mergable gate

- SHA: `64fb2e96` — "`mkobj.c` copy_oextra + mailcmd helpers (D-2275)"
- D-log: D-2275. Queue row: `mkobj.c` copy_oextra tails (data.md:300-301
  named omit). No corpus session reaches a named/traits stack split.
- Character: omission fix + new accessors, no corpus divergence.

## Intent vs deliverable

Subject promises: `copy_oextra` in C order, `new_omailcmd`/`free_omailcmd`,
`OMAILCMD`/`has_omailcmd` accessors, `splitobj` + `bill_dummy_object`
wiring, `mergable` mailcmd gate. Diff actually adds exactly those, plus the
LUAFREE normalize in `splitobj` and six named-omits queued as REFILL Open
rows in the same commit. Promise matches diff exactly.

## Inventory

- New JS: `copy_oextra`, `new_omailcmd`, `free_omailcmd` (`js/mkobj.js`);
  `OMAILCMD`/`has_omailcmd` (`js/const.js`); wired call sites in `splitobj`
  and `js/shk.js bill_dummy_object`; `mergable` gate (`js/mkobj.js`).
- Required `sym.mjs` output (all LIVE, none deleted/re-pointed):
  `oname js/do_name.js:1212 sync`; `copy_mextra js/mon.js:2858 sync`;
  `ONAME_SKIP_INVUPD js/const.js:1877 export const`;
  `newomid js/mkobj.js:2945 sync` (in-module).
- Required `--can` output: `ALREADY: mkobj.js already statically imports
  do_name.js` — pasted, confirmed (the D-log's "new edge" phrasing is
  overcautious in the safe direction; no new module edge exists).
  `copy_oextra`/`free_omid` ride the existing `shk→mkobj` edge.

## C ↔ JS fidelity

C loci (via `csym.mjs`): `copy_oextra` `mkobj.c:416-448`;
`new_omailcmd` `:156-164`; `free_omailcmd` `:166-173`;
`splitobj` `:456-503`; `bill_dummy_object` oextra lines;
`mergable` mailcmd gate `invent.c:4477-4481`.

- `copy_oextra`: guards → `newoextra` when missing → oname with
  `ONAME_SKIP_INVUPD` → omonst whole-struct copy (stale-key wipe ≡ C
  `memcpy`, `mextra`/`nmon` nulled, `#if 0` m_id renewal stays out so m_id
  is copied, `copy_mextra(dst, src)` gated on the *source* keeping mextra
  exactly like C) → omailcmd via `new_omailcmd` → omid via `newomid` +
  assign. C order verbatim. ✓
- `new_omailcmd`/`free_omailcmd`: ensure-bag, drop-old, dup (`String()`);
  free + key delete (≡ C `free` + NULL; `has_omailcmd` reads false after).
  The extra `if (!otmp) return` and `''`-on-falsy guards are safe supersets
  of C (no caller passes null/empty — `copy_oextra` guards with
  `has_omailcmd`). One latent nuance: C `has_omailcmd` is pointer-nonnull
  while JS is string-truthiness, but no path produces `''` in steady state
  (free deletes the key), so both sides agree everywhere reachable. ✓
- `splitobj`: LUAFREE→FREE normalize, named `splitbill`, `copy_oextra`,
  `free_omid`, `obj_split_timers` — C `:493-499` order verbatim. ✓
- `bill_dummy_object`: `copy_oextra` + `free_omid` ahead of `lamplit = 0`,
  matching C's oextra/lamplit order. ✓
- `mergable` gate: `!has_omailcmd(obj) ? has_omailcmd(otmp) :
  (!has_omailcmd(otmp) || OMAILCMD(obj) !== OMAILCMD(otmp))` — C verbatim
  (`!==` ≡ `strcmp != 0`). ✓ No RNG in any arm.

Debt (omit-class, not a contradiction on any ported arm): the
`#ifdef MAIL_STRUCTURES` SCR_MAIL flavor arm four lines below the gate
(`otyp == SCR_MAIL && spe > 0 && (o_id % 2) != (otmp->o_id % 2)` → FALSE)
is live — `MAIL_STRUCTURES` is unconditionally defined
(`global.h:430`) — but unported and unnamed in data.md:302. JS merges
stamped-mail flavors C keeps separate. Rare path (wished/bones/hand-stamped
mail), same-function adjacent residual.

## Hallucinations / overclaim

None. The 23/23 throwaway probe is out-of-tree; no corpus PASS claimed;
hidden notes honestly vacuous.

## Density

~85 insertions for a 33-line C function + two 9-line helpers + two call
sites + one gate, one falsifier. Right-sized; REFILL rows are same-envelope
oextra tails.

## Verification

- Re-measured: `node scripts/hidden-proxy.mjs verify copy_oextra --base
  64fb2e96~1` → "0 session(s) blocked on it (0 at baseline, 0 in the working
  scoreboard)". Matches the D-log; row cited 0 blocks so no older `--base`
  owed.
- Diff-hunk grep clean; `imports.mjs --rulecheck` clean (re-run review
  1239). D-log cites green 2/2 + strict ×2 + cohort 7/7; the
  end-of-iteration cadence run re-covers the fortress.

## Actionable C-wrongs

1. `mergable` SCR_MAIL MAIL_STRUCTURES flavor arm (`invent.c`, below
   `:4481`) — port or name in data.md:302 alongside the mailcmd gate. One
   port iter; needs a stamped-mail merge probe, not a corpus session.

Verdict: **ACCEPT-WITH-DEBT**
