# Review 2166 — b76d68a29 — mkshop SHOPTYPE dispatch

SHA `b76d68a29`, D-3206; 2026-10-01; `js/mklev.js` only (+78/−~20).
Single-function cluster (mkroom.c mkshop) retiring the D-2569 Rule #2
omit. Closes no prior review.

## Metadata

- Subject: "`mkroom.c` mkshop SHOPTYPE dispatch live (retires the
  D-2569 Rule #2 omit)".
- Promises: live `nh_getenv('SHOPTYPE')` under the wizard gate; the ten
  single-char arms in C order with early returns; shtypes symb loop
  with a `matched` flag for `goto gottype`; g/G/v/V/else; zero behavior
  change in normal play.

## Intent vs deliverable

Kept except an unreachable-by-play corner. Diff delivers the live
endpoint, all ten arms, the symb loop, and the g/v/else exactly as
promised, and retires the omit in code + map + ledger. But the
message's "Empty-string env yields `undefined`, matching nothing like
C `'\0'`" is false: C's `'\0'` DOES match — `def_oc_syms[0].sym` is
the `'\0'` random-class placeholder (drawing.c:25) and `shtypes[0]`
is the general store (shknam.c:209–211), so C with SHOPTYPE="" takes
the general store deterministically while JS takes the random pick
(plus an RNG draw C skips). The `:173` multi-door arm (`wizard && ep`)
also diverges for `ep=""` (non-null in C, falsy in JS). Trigger needs
wizard mode + an explicitly-empty SHOPTYPE in the OS env — no session,
judge env, or player action produces it — so this ships as debt, not
Must-fix (below).

## Inventory — mkshop

Changed: `mkshop` (wizard SHOPTYPE block :101–155 now live; :173
comment updated, condition untouched). New imports: `def_oc_syms`
(objects.js, existing edge) + `nh_getenv` (mail.js, new edge — mail.js
has no mklev import, so no cycle; call-time use only). Deleted/
re-pointed: none. Callees all LIVE: nh_getenv (mail.js:490 sync,
single home), mkzoo/mktemple/mkswamp (same-file pre-existing),
def_oc_syms (objects.js:85). No STUB in the arm.

## C ↔ JS fidelity — mkshop

C `mkroom.c:94–216` (csym range); the rest of the body is the
D-2569/1528-ACCEPT restart, untouched — audited here is the :101–155
block. `if (wizard) { ep = nh_getenv; if (ep) {...} }` ✓ (JS
`ep != null` ≡ C null-pointer check). Ten arms in C order with early
returns — z/Z m/M b/B t/T/`\\` s/S a/A c/C l/L `_` `}` — all verified
against the csym body, incl. the three-way COURT arm ✓ (JS `'\\'` ≡ C
`'\\'` = backslash). Symb loop: `for (i = 0; shtypes[i].name; i++)`
≡ JS (plus a harmless length guard) ✓; `?.sym` never yields undefined
(all 12 shtypes symb values validated in-execution against the
18-entry table, so no `undefined === undefined` false match) ✓;
`matched` flag ≡ `goto gottype` (skips g/v on match, i = matched
index) ✓; g/G→0, v/V→FODDERSHOP−SHOPBASE, else→−1 ✓ (all three
overwrite the loop-exhausted i, like C). Non-empty env behavior is
C-exact in every arm. Caller: C mkroom.c:55 (mkrooms) — pre-existing
wiring, untouched ✓. RNG: no draws in the dispatch (mkzoo/mktemple/
mkswamp carry their own, in C positions) ✓.

THE CORNER (debt, unqueued): SHOPTYPE="" → C `*ep == '\0'` matches
shtypes[0] (general store, no rnd draw) and `wizard && ep` is TRUE at
:173; JS `c0 === undefined` matches nothing (i=−1 → rnd(100) pick)
and `wizard && ep` is FALSE. Two-word fix (`ep[0] ?? '\0'`,
`ep != null`) with falsifier (wizard + SHOPTYPE="" → general store,
multi-door eligible). Unreachable-by-play: scored Chrome has no
process.env (null); Node sessions inherit a runner env no session can
set; no judge env exports SHOPTYPE, let alone empty. Zero behavior
change in every reachable run — the 58-session reach below covers the
unset path.

Diff grep: no FORCE/DIAG/getRngLog/fastforward/seed/coordinate gates.
Rule #2 clean (iteration-wide rulecheck; the mail.js nh_getenv import
is the D-3203-sanctioned endpoint).

## Hallucinations / overclaim

"Matching nothing like C `'\0'`" is false (proven above — C matches
the general store). "Zero behavior change in normal play" is true
(env unset everywhere reachable). "Every arm live, every callee live"
holds for all reachable inputs. The verification claim (reach 58/58)
is true and reproduced below.

## Density

One whole C function completed (omit retired), ~60 js insertions, no
Must-fix bundled. Ledger (ported) and Verify lines present. The
closure held nothing more Open (sole mkroom.c row per the queue).

- Ledger: mkshop ported — ACCEPT-WITH-DEBT (SHOPTYPE="" corner).

## Verification

Re-measured (one call, current tree incl. this SHA):

```text
verify mkshop: baseline b76d68a29~1 (scoreboard at 55cdefbf9) — 0 session(s) blocked on it (0 at baseline, 0 working)
reach mkshop: 58 baseline-PASS session(s) reach it (58 run, 61.2s): 58 PASS, 0 regressed → REACH-OK
```

Matches the D-log exactly (genuine 58-session reach, all on the unset
path). No REGRESSED session. The wizard+env dispatch arms cannot fire
in the corpus (inherent to env-gated code); they are covered by the
C-reading above.

## Actionable C-wrongs

1. SHOPTYPE="" corner (above): `const c0 = ep[0] ?? '\0'` +
   `wizard && ep != null` at :173. One port iter with a targeted
   wizard+empty-env falsifier. Kept as map/live debt (unreachable-
   by-play), unqueued — see CURRENT live-debts.

Verdict: **ACCEPT-WITH-DEBT**
