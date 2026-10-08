# Review 2563 — bb3890046 — rhack S-arm save veto (D-3690)

- SHA: `bb38900465fed7453b7d0abc14e71513191491e8`
- Subject: next-live-head `cmd.c` rhack: `S` arm bypassed can_do_extcmd, prompted Really-save in the tutorial (triple →PASS) (D-3690)
- D-entry: D-3690. Type: next-live-head owner-null triple (tutorial Really-save).
- Diff size: `js/cmd.js` +10/-1 (S-arm gate); +1 new test (3 its); ledger D-tag.

## Intent vs deliverable

Promise: the rhack if/else `S` arm called `dosave()` directly,
bypassing C `rhack :3689–3694`'s `can_do_extcmd(tlist)` gate;
JS prompted "Really save?" where recorded C is a silent no-op
(lua tutorial veto). Gate the arm on the live save row; FALSE
skips dosave with no pline; same ECMD_OK tail. Triple → FULL PASS.

Diff actually does: the gate as described — `saveTab` lookup +
`await can_do_extcmd(saveTab)` around `dosave()`, tail
unchanged. The gate direction is right and the sessions moved;
the veto path omits one C statement (below).

## Inventory

| JS site | Change | C locus |
|---|---|---|
| `js/cmd.js:6003` S arm | `dosave()` gated on `can_do_extcmd(saveTab)` | `cmd.c:3689–3694`, `:3814–3816` |
| helpers (unchanged, newly called) | `ext_func_tab_from_txt`, `can_do_extcmd` | `cmd.c:462–489`, `:1841–1842` |

Name resolution (`sym.mjs`; diff deletes/re-points nothing):

```text
can_do_extcmd    js/cmd.js:852   ASYNC — await required
ext_func_tab_from_txt js/cmd.js:747   sync
dosave           js/save.js:1423   ASYNC — await required
```

All LIVE, single definitions, no clones. Callee closure of the
arm: `ext_func_tab_from_txt` LIVE, `can_do_extcmd` LIVE (all 4
arms, C order: lua veto silent-FALSE `:467–476`, wizard pline
`:478–481`, buried `You_cant` `:481–483`, fuzzer silent-FALSE
`:484–485`), `dosave` LIVE, `reset_cmd_vars` LIVE. No STUB.

## C ↔ JS fidelity

Row confirm: C cmdlist `:1841–1842` is
`{ 'S', "save", dosave, IFBURIED|GENERALCMD|NOFUZZERCMD }`;
generated `extcmdlist_data.js:76` is
`{ key: 83, txt: "save", flags: 41 }` (41 = 1|8|32 ✓) — the same
row C's `cmdbind_get('S')->cmd` yields. Rebind-safe: a BIND=
overlay on S routes to `rhack_dispatch_bound` before the if/else
(`js/cmd.js:5618/:5679`), so the hardcoded `'save'` lookup only
fires on the unbound path. ✓ No RNG in the arm either side.

The gap is the veto path. C (`cmd.c:3690–3694`):

```c
if (!can_do_extcmd(tlist)) {
    /* can_do_extcmd() already gave a message */
    reset_cmd_vars(TRUE);
    res = ECMD_OK;
}
```

then the `:3814–3816` tail re-resets with `(multi<0)` (= FALSE
after the first reset). Net C effect: **queues cleared**.
JS veto (tutorial, multi = 0): skips `dosave()`, falls into the
shared tail `reset_cmd_vars(multi<0)` = `reset(FALSE)` — queues
**kept**. In particular `_cmdq_repeat` holds the S/dosave entry:
JS adds it pre-gate (`js/cmd.js:5620–5625`) while C's add is
post-gate (`:3732–3737`), and nothing on the veto path clears it
(the arm falls through to `return`, `:6374`). Observable: S
then `^A` in the tutorial — C prints `do_repeat :1643–1646`
`Norep("There is no command available to repeat.")`; JS
(JS `do_repeat` faithful) finds REPEAT=[S], re-runs save, and
re-vetoes silently. The house veto shape in this file
(`rhack_dispatch_bound`, `:2813–2816`) does `reset_cmd_vars(true)`.

## Hallucinations / overclaim

Two, both in prose, one load-bearing. (1) "exactly C's
`:3690–3694` + `:3814–3816` convergence" omits `:3691–3693`'s
`reset_cmd_vars(TRUE)` — the sentence is false as written (see
above). (2) "buried `S` now refuses like C": save carries
IFBURIED (`func_tab.h:10`, `0x0001` ⊂ 41), so C's buried arm
never fires for save — **both** sides allow buried S; behavior
matches but the description is backwards. No FORCE/DIAG/seed/
coordinate reads in the `js/` hunks; Rule #2 clean (global
`--rulecheck`, SHA 2562).

## Density

Legit next-live-head pop (Must-fix empty then, `mon_wield_item`
park-maxed, coverage empty, batch dry — Status bullet honest).
Arm-level fix on already-`ported` rhack with the remainder named
(other arms bypass; lua blacklist holds exactly "save";
full-rescore remainder clean) — acceptable under the D-3681…
owner-null precedent; ledger only prepends D-3690 to the
existing row (no new status claim). One cliff, code + test +
rescore in one handoff: right density.

## Verification

D-log claim: focused 0/3 → 3/3; targeted rescore 934→937 (triple
FULL PASS); full 937/953, 0 regressed; `verify rhack --full` →
note hidden (owner-null) · REACH-OK · green · strict · cohort ·
full 44/44. Audit re-measure
(`verify rhack --base bb3890046~1 --reach-all`):

```text
verify rhack: baseline bb3890046~1 (scoreboard at 0560c51fd, 2026-10-08T16:44:45.462Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke rhack: no RNG-tagged reach; fixed smoke spread (24 run, 12.5s): 24 PASS, 0 regressed → REACH-OK
```

Reproduced. Movement independently confirmed: `show` on the
triple reads PASS/PASS/PASS (RNG 3175/3175, 3097/3097,
3097→3097/2809→3079 flat as logged; 83/83 screens on Healer).
No REGRESSED session. The vacuous-verify caveat does not apply
(owner-null class, honestly framed, rescore-proven).

## Actionable C-wrongs

1. S-arm veto path omits C `cmd.c:3691–3693`
   `reset_cmd_vars(TRUE)`: with multi ≥ 0 the ECMD_OK tail's
   `reset(FALSE)` leaves stale `_cmdq_repeat`=[S] (and CANNED)
   where C's REPEAT is empty — tutorial S then `^A` prints C's
   "no command available to repeat" but JS silently re-vetoes.
   Fix (one port iter): veto branch does `reset_cmd_vars(true)`
   before the shared tail (C's double-reset shape; house
   precedent `js/cmd.js:2813–2816`); test pins tutorial-S→`^A`
   Norep; correct the D-3690 "buried S refuses" sentence
   (IFBURIED exempts save on both sides).

Verdict: **QUALITY-RISK**
