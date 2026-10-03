# Review 2334 — 4a4cc3e73 — poison_strdmg killer path (4-arg restart, 4 call sites)

**SHA:** `4a4cc3e73` — "`attrib.c` poison_strdmg killer path (4-arg restart, 4 call sites wired) (D-3379)."
**Scope:** js/eat.js +25/−22 (restart + 2 sites), js/fountain.js +3/−1, js/spell.js +3/−1. No clone deleted (the 2-arg inline is replaced by canonical calls, not re-pointed) — sym below is callee classification.
**Prior reviews closed:** none.

## Intent vs deliverable

Promise: restart the 2-arg inline as the 4-arg canonical `losestr`→`losehp` with killer routing, wiring all 4 C call sites. Diff delivers that: 3-line canonical body, losestr import, 4 sites passing C knam/k_format, eat.js death-handling idiom at both eat sites. Ledger partial→ported with the omit deleted (clean — no 2333-style paste error). No drift.

## Inventory

| # | JS change | Kind | C locus (csym range) |
|---|-----------|------|----------------------|
| 1 | poison_strdmg 4-arg restart js/eat.js:1389 | C callee port (whole body, replaces inline) | attrib.c:273–278 |
| 2–5 | 4 call-site wirings (eat.js ×2, fountain.js, spell.js) | C caller args | eat.c:1932/:2798, fountain.c:307, spell.c:164 |

`sym.mjs`: `poison_strdmg js/eat.js:1389 ASYNC` (awaited at all 4 sites ✓), `losestr js/attrib.js:359 ASYNC` (LIVE canonical, awaited ✓), `losehp js/hack.js:1881 sync` (LIVE, called sync like C ✓), `finish_maybe_wail` async awaited ✓, KILLED_BY/_AN consts ✓.

## C ↔ JS fidelity

**Body** — C `:276–277`: `losestr(strloss, knam, k_format); losehp(dmg, knam, k_format);`. JS: `await losestr(strloss, knam, k_format); if (!game.program_state?.gameover) losehp(dmg, knam, k_format);`. The guard is the correct noreturn model: C losestr's frailty damage can `done(DIED)` (noreturn) so C never reaches the second call; JS losestr returns after setting gameover, hence the skip. Order, args, and shared-killer semantics exact. The deleted inline (raw uhp decrement, flag-gameover without killer/done, no Upolyd mh, no max-HP frailty cuts) is fully superseded by the canonicals. **Confirm.**

**Call sites** (`--callers` lists exactly these 4 + no decl): each verified against C text — eat.c:1932 `(rnd(4), rnd(15), !glob?"poisonous corpse":"poisonous glob", KILLED_BY_AN)` ✓ verbatim; eat.c:2798 `(rnd(4), rnd(15), xname(otmp), KILLED_BY_AN)` ✓; fountain.c:307 `(rn1(4,3), rnd(10), "contaminated water", KILLED_BY)` ✓ (KILLED_BY, not _AN — matches); spell.c:164 `(Pr?rn1(2,1):rn1(4,3), rnd(Pr?6:10), "contact-poisoned spellbook", KILLED_BY_AN)` ✓. Clang LTR arg-eval order preserved (strloss/dmg evaluated before the call at every site). RNG call-for-call identical to C. **Confirm.**

**Death-path adaptation** — the two eat.js sites add fatal→`finish_losehp_done`+`return 1`, else `finish_maybe_wail`, idiom-verbatim from the neighboring acidic arm (eat.js:2527–2534, same comments). spell.js/fountain.js pass args only; the D-log's "neither file handles _losehp_needs_done anywhere" verified by grep (0 hits each), and the gameover flag carries death there — consistent with file precedent, and seed0030-deaths green is claimed in the verify tail. **Confirm.**

Callee closure: losestr LIVE-ported, losehp LIVE-partial (its own rehumanize/showdamage omits are its own queue row, explicitly out of scope — correct layering, not a silent stub).

Quoted C (body + all four call sites, verified against pinned text):

```c
/* attrib.c:273–278 */ void poison_strdmg(int strloss, int dmg, const char *knam, schar k_format) {
    losestr(strloss, knam, k_format); losehp(dmg, knam, k_format); }
/* eat.c:1932–1934 */   poison_strdmg(rnd(4), rnd(15),
                          !glob ? "poisonous corpse" : "poisonous glob", KILLED_BY_AN);
/* eat.c:2798 */         poison_strdmg(rnd(4), rnd(15), xname(otmp), KILLED_BY_AN);
/* fountain.c:307–308 */ poison_strdmg(rn1(4, 3), rnd(10), "contaminated water", KILLED_BY);
/* spell.c:164–166 */    poison_strdmg(Poison_resistance ? rn1(2, 1) : rn1(4, 3),
                          rnd(Poison_resistance ? 6 : 10), "contact-poisoned spellbook", KILLED_BY_AN);
```

The eat.js death idiom is verbatim from the neighboring acidic arm (eat.js:2527–2534: `losehp(rnd(15), …); if (_losehp_needs_done || gameover) { finish_losehp_done(); return 1; } finish_maybe_wail();`). Canonical `losestr` (attrib.js:359) handles the frailty loop (`while (ustr < attrMin) { ++ustr; --num; dmg += rn1(4,3); }`), Upolyd (`waspolyd`), and killer routing — the deleted inline's raw-uhp/gameover-flag behavior is fully superseded. spell.js/fountain.js carry 0 `_losehp_needs_done` references (grep-verified), so args-only matches file precedent with the gameover flag carrying death.

| Callee | Status | Evidence |
|---|---|---|
| losestr | LIVE | attrib.js:359 async, awaited |
| losehp | LIVE | hack.js:1881 sync, called sync like C |
| finish_maybe_wail | LIVE | hack.js:1934 async, awaited |
| finish_losehp_done | LIVE | end.js dynamic import (acidic idiom) |

## Hallucinations / overclaim

None. "Restart beats patching" applied correctly; the old inline is gone, not shimmed.

## Density

Breadth phase, §2b: 1 whole C function + all 4 C callers wired, own C-locus/Callers/Verify/Named sub-bullets, own `Ledger:` entry. Net ~+35/−25, below bar; D-log states the exception (attrib.c holds nothing more Open, both callees + helpers already live). Whole-function verdict: whole.

## Verification

Re-measured (`verify poison_strdmg --base 4a4cc3e73~1 --reach-all`): 0 blocked + vacuous-note + smoke 24/24 REACH-OK — matches the D-log. Verbatim:

```text
verify poison_strdmg: baseline 4a4cc3e73~1 … 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke poison_strdmg: no RNG-tagged reach; fixed smoke spread (24 run, 10.7s): 24 PASS, 0 regressed → REACH-OK
``` Diff grep: no FORCE/DIAG/RNG-log/fastforward hits.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
