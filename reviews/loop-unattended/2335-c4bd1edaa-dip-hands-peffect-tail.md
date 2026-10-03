# Review 2335 — c4bd1edaa — dip_hands_ok + peffect_see_invisible reveal tail

**SHA:** `c4bd1edaa` — "`potion.c` dip_hands_ok + peffect_see_invisible reveal tail (D-3380)."
**Scope:** js/potion.js +30/−15 (import, msg snapshot + tail, getobj_dip rewire, new callback). No clone deleted — sym below classifies callees.
**Prior reviews closed:** none.

## Intent vs deliverable

Promise: new `dip_hands_ok` whole body + getobj_dip consuming its NULL verdict per invent.c mechanics, and the peffect see-invisible reveal tail (mimic/monster/hero refresh + self-msg + unkn--). Diff delivers both, with ledger flips absent→ported and partial→ported. No drift.

## Inventory

| # | JS change | Kind | C locus (csym range) |
|---|-----------|------|----------------------|
| 1 | dip_hands_ok js/potion.js:2640 | C callee port (whole staticfn body) | potion.c:2230–2237 |
| 2 | getobj_dip verdict/prefix rewire js/potion.js:2393–2410 | C caller mechanics (getobj NULL-verdict arms) | invent.c:1832–1837/:1904–1905/:1955–1958 via potion.c:2279 |
| 3 | peffect msg snapshot + tail js/potion.js:443–487 | missing tail of live fn | potion.c:840–878 (msg :843, tail :871–877) |

`sym.mjs`: `Glib js/potion.js:802` in-file export (the objnam clone is not used here), `can_reach_floor js/engrave.js:579 sync`, `dip_ok` local static (pre-existing, C-arm-exact — verified below), `set_mimic_blocking`/`see_monsters`/`newsym`/`Invis` all LIVE imports. dip_hands_ok/dip_ok local-at-C-home is correct for C staticfns (sym's "clone drift" boilerplate does not apply to same-file statics).

## C ↔ JS fidelity

**dip_hands_ok** — C `:2234–2237`: `if (!obj && (Glib && can_reach_floor(FALSE))) return GETOBJ_SUGGEST; return dip_ok(obj);`. JS is the identical expression with `false`. Sole C user is the :2279 function-pointer selection (`at_here ? dip_hands_ok : dip_ok` — verified; `--callers` shows only the fwd decl because nothing calls it directly, consistent). JS selects `obj_ok` once the same way. **Confirm.**

**getobj mechanics** — C invent.c:1832 NULL-verdict switch: SUGGEST → allownone + `- ` prefix (:1833–1836); :1904–1905 strips the trailing space when nothing else suggested (`-` alone); DOWNPLAY et al → allownone unlisted (:1838–1844). JS: `handsListed = obj_ok(null)===SUGGEST` before the loop; `handsListed ? (rawLets ? '- '+rawLets : '-') : rawLets` — exact. `-` key always returns hands_obj: correct because the NULL verdict here is SUGGEST-or-DOWNPLAY always (dip_ok(NULL)=DOWNPLAY both sides, verified C :2216–2217 vs JS), and both set allownone — C :1955–1958's NULL/mime arm is unreachable on this path. **Confirm.**

**peffect tail** — C :843 `msg = Invisible && !Blind` captured before `make_blinded(0)` clears Blind; JS `const msg = Invis() && !See_invisible() && !Blind()` at the top — exact given `Invisible ≡ Invis && !See_invisible` (youprop.h:199, verified). Tail :871–877 in C order: set_mimic_blocking / see_monsters / newsym(ux,uy) / `msg && !Blind` → verbatim `You("can see through yourself, but you are visible!")` + unkn--. No RNG in the tail on either side. **Confirm.**

Callee closure: every callee LIVE (or same-file static). No stubs. The cmdq HANDS_SYM gap (invent.c:1790–1794, no JS cmdq path in getobj_dip) is NAMED in the D-log and already has its own Open queue row — correctly out of scope, not a silent stub.

Quoted C (callback + getobj mechanics + peffect tail):

```c
/* potion.c:2230–2237 */ staticfn int dip_hands_ok(struct obj *obj) {
    if (!obj && (Glib && can_reach_floor(FALSE))) return GETOBJ_SUGGEST;
    return dip_ok(obj); }
/* potion.c:2279 */      obj = getobj("dip", at_here ? dip_hands_ok : dip_ok, GETOBJ_PROMPT);
/* invent.c:1832–1836 */ switch ((*obj_ok)((struct obj *) 0)) {
    case GETOBJ_SUGGEST: allownone = TRUE; *bp++ = HANDS_SYM; *bp++ = ' '; break;
/* invent.c:1838–1844 */ case GETOBJ_DOWNPLAY: /* acceptable but not shown */
    case GETOBJ_EXCLUDE_INACCESS: case GETOBJ_EXCLUDE_SELECTABLE:
        allownone = TRUE; *ap++ = HANDS_SYM; break;
/* invent.c:1904–1905 */ if (suggested == 0 && bp > buf && bp[-1] == ' ') *--bp = '\0';
/* invent.c:1955–1958 */ if (ilet == HANDS_SYM) { if (!allownone) mime_action(word);
        return (allownone ? &hands_obj : (struct obj *) 0); }
/* potion.c:2214–2217 */ dip_ok: if (!obj) return GETOBJ_DOWNPLAY; …
/* youprop.h:199 */      #define Invisible (Invis && !See_invisible)
/* potion.c:843,871–877 */ int msg = Invisible && !Blind; …
    set_mimic_blocking(); see_monsters(); newsym(u.ux, u.uy);
    if (msg && !Blind) { You("can see through yourself, but you are visible!");
        gp.potion_unkn--; }
```

The `-`→hands_obj unconditional return is provably correct: the NULL verdict on this path is SUGGEST-or-DOWNPLAY always (dip_ok(NULL)=DOWNPLAY both sides), and both set allownone — C's :1955 NULL/mime arm is unreachable here.

| Callee | Status | Evidence |
|---|---|---|
| Glib | LIVE | potion.js:802 in-file export |
| can_reach_floor | LIVE | engrave.js:579 import |
| dip_ok | same-file static | potion.js:2627, C-arm-exact |
| set_mimic_blocking / see_monsters / newsym | LIVE | vision/display imports |
| Invis / See_invisible / Blind | LIVE | local youprop predicates |

## Hallucinations / overclaim

None. "Whole C body live" for dip_hands_ok is literal (4-line body). The getobj line citations (:1832/:1835–1836/:1905/:1955–1958) all check out against pinned C.

## Density

Breadth phase, §2b: 1 whole C function + 1 whole C tail closing a ledger partial, same file (potion.c), each with own C-locus/Callers/Verify/Named sub-bullets and own `Ledger:` entry. ~+30 lines, below bar; D-log states the exception (potion.c holds nothing more Open, all callees live). Whole-function verdicts: dip_hands_ok whole, peffect_see_invisible whole — unanimous.

## Verification

Re-measured (`verify dip_hands_ok,peffect_see_invisible --base c4bd1edaa~1 --reach-all`): dip_hands_ok 0 blocked + smoke 24/24 REACH-OK; peffect 0 blocked + reach 1/1 PASS REACH-OK. Matches the D-log. Verbatim:

```text
smoke dip_hands_ok: no RNG-tagged reach; fixed smoke spread (24 run, 10.9s): 24 PASS, 0 regressed → REACH-OK
reach peffect_see_invisible: 1 baseline-PASS session(s) reach it (1 run, 1.4s): 1 PASS, 0 regressed → REACH-OK
``` Diff grep: no FORCE/DIAG/RNG-log/fastforward hits.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
