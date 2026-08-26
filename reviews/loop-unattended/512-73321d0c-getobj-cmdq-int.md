# Review 512 — 73321d0c — invent.c getobj canned CMDQ_INT then KEY (D-1551)

## Metadata
- Full / short hash: `73321d0c27e3264b4e43436cff1f38fe65836550` / `73321d0c`
- Parent: `27feb511` (D-1550). This file audits **this SHA only** (third of nine `js/` commits since review **509**). Archive **Addressed:** D-1551 `73321d0c`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-26 12:44:54 +0200
- D-id: **D-1551**
- Stats: 6 JS files, +175 / −102 (`invent.js` +126, `apply.js` +14/−74, `wield.js` +15, `do.js` +12, `dothrow.js` +4/−17, `artifact.js` +4). Band 150–350 (js/ insertions **175**).
- Claims to close: Open canned `CMDQ_INT` (named from D-1530 / review **491**). Not `display_pickinv` `&ctmp`. `reviews/loop-2026-08-15/` has no unpaid getobj-INT Must-fix.
- JS / map: `invent.js` `getobj_from_cmdq` / `cmdq_add_int`; ALLOWCNT + apply KEY callers. `c-js-map/data.md` + `turns.md`.
- Prior reviews this SHA claims to close: **491** named canned INT.

## Intent vs deliverable

Git subject promises: a canned `CMDQ_INT` count then `KEY` splits the chosen stack when `ALLOWCNT`, instead of ignoring the count.

Pinned C `invent.c` `getobj` `:1751–2089` (`csym`); canned block `:1778–1830`. Producer `cmd.c` `cmdq_add_int` `:334–351` — **only C caller** `getobj` `:2052` (`CQ_REPEAT`). Callee `split_otmp` `:2075–2087` (D-1530). `cmdq_pop` switches REPEAT vs CANNED via `in_doagain`.

```1778:1825:nethack-c/upstream/src/invent.c
 need_more_cq:
    if ((cmdq = cmdq_pop()) != 0) {
        cq = *cmdq;
        free(cmdq);
        if (cq.typ != CMDQ_USER_INPUT) {
            otmp = 0;
            if (cq.typ == CMDQ_KEY) { /* HANDS_SYM or invent invlet + obj_ok */ }
            else if (cq.typ == CMDQ_INT) {
                if (!cntgiven && allowcnt) {
                    cnt = (long) cq.intval;
                    cntgiven = TRUE;
                    goto need_more_cq;
                } else {
                    cmdq_clear(CQ_CANNED);
                    return NULL;
                }
            }
            if (!otmp) cmdq_clear(CQ_CANNED);
            else if (cntgiven) {
                if (cnt < 1L || otmp->quan <= cnt) cntgiven = FALSE;
                goto split_otmp;
            }
            return otmp;
        }
    } else if (need_more_cq) {
        return NULL;
    }
```

`need_more_cq` **boolean** is never set TRUE; INT without a following KEY falls through to **interactive with `cntgiven` still set**. Throw-one / LRS (`:2028–2047`) do **not** run on the canned `goto split_otmp` path.

Old JS: throw/apply/grease/jelly/rub KEY-only (`typ === 'key'`); drop/wield/ready/charge/adjust interactive; no `cmdq_add_int`.

The diff **does** add `getobj_from_cmdq` + `cmdq_add_int`, wire ALLOWCNT throw/drop/wield/ready/charge/adjust, replace apply/grease/jelly/rub KEY clones (`allowcnt=false` so INT aborts), skip throw-one on canned split. It **does not** record REPEAT (`:2050–2054`), port eat/read/zap/tin NOFLAGS clones, `display_pickinv` `&ctmp`, stash getobj, `finish_splitting`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `getobj_from_cmdq` | C `:1778–1830`, **LIVE this SHA** | |
| `cmdq_add_int` | C `:334`, **LIVE this SHA** | **no JS caller yet** (REPEAT named) |
| `cmdq_pop_getobj` | C `cmdq_pop`, **CLONE** | cmd.js `cmdq_pop` is rhack canned-only |
| `cmdq_clear_canned` | C `cmdq_clear(CQ_CANNED)`, **CLONE** | |
| `getobj_split_otmp` | C `:2075`, **LIVE** | D-1530 |
| `adjust_ok` | C `:4916`, **LIVE this SHA** | |
| `drop_obj_ok` | C `any_obj_ok` `:1709`, **LIVE this SHA** | |
| throw/drop/wield/ready/charge/adjust | C ALLOWCNT, **LIVE this SHA** | |
| apply/grease/jelly/rub | C NOFLAGS, **LIVE this SHA** | INT aborts |
| eat/read/zap/tin KEY clones | C same getobj, **OMIT named** | |
| `display_pickinv` `&ctmp` | C, **OMIT named** | |
| `in_doagain` REPEAT record | C `:2050–2054`, **OMIT named** | |
| stash / `finish_splitting` | C, **OMIT named** | |

`node scripts/csym.mjs getobj --sig` → `invent.c:1751-2089`. `cmdq_add_int` body `:334–351`. `--callers cmdq_add_int`: `invent.c:2052`; `hack.h:181`.

`node scripts/sym.mjs getobj_from_cmdq cmdq_add_int getobj_split_otmp getobj_apply_count cmdq_pop cmdq_clear splitobj splittable`:

```
getobj_from_cmdq js/invent.js:3831   sync
cmdq_add_int     js/invent.js:3791   sync
getobj_split_otmp js/invent.js:3763   sync
getobj_apply_count js/invent.js:3896   ASYNC — await required
cmdq_pop         NOT EXPORTED — 1 LOCAL js/cmd.js:96
             => Do NOT write clone #2
cmdq_clear       NOT EXPORTED — 1 LOCAL js/cmd.js:91
splitobj         js/mkobj.js:332   sync
splittable       js/invent.js:3672   sync
```

**Re-point:** apply/throw **deleted** local KEY-only loops → import `getobj_from_cmdq`. Do **not** name invent’s `cmdq_pop_getobj` `cmdq_pop` (cmd.js already has that identifier for rhack). `cmdq_add_int` is a new export; REPEAT still does not call it.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. `node scripts/imports.mjs --rulecheck`: Rule #2 clean. **No core RNG** in this SHA (C canned block has none).

## C ↔ JS fidelity

INT then KEY. Peek; pop; `CMDQ_INT`/`'int'` with `allowcnt && !cntgiven` → `continue`; next KEY looks up invlet / `HANDS_SYM`; `cnt < 1 || quan <= cnt` clears `cntgiven`; `getobj_split_otmp`. **Match `:1805–1823`.** Second INT or INT when `!allowcnt` → `cmdq_clear` + NULL. **Match `:1811–1815`.** KEY miss → clear + NULL (not interactive). **Match `:1817–1825`.**

Throw-one. Canned goes to `split_otmp`, not `:2028–2047`. JS canned does **not** call `getobj_apply_count`. A canned count>1 on a non-gold throw **splits**. **Match C canned; not interactive throw-one.**

USER_INPUT. Pop, then interactive (`skip: true`). **Match** (node consumed). Function / `CMDQ_EXTCMD` heads: **skip without pop** (JS rhack queue). C has no function nodes. **Named as rhack.**

INT without KEY. C: empty pop, boolean `need_more_cq` is FALSE → interactive **with `cntgiven` still true**. JS: empty → `{ skip: true }`; callers **drop** `cnt`/`cntgiven`. **Diverges on a path with no current producer** (`cmdq_add_int` has zero call sites; REPEAT record named). Do not Must-fix until REPEAT queues INT+KEY; then the INT-alone hole is still not C. Name it.

`obj_ok` ranks. Helper accepts `GETOBJ_SUGGEST||DOWNPLAY` (const.js 2 and 1). apply/charge/drop/adjust use those values. `throw_ok` uses **local** `THROW_SUGGEST=1` / `THROW_DOWNPLAY=2` (swapped labels vs C, **pre-existing**); both 1 and 2 still pass the helper, so canned throw still accepts both ranks like C. `wield_ok` local SUGGEST=1 / DOWNPLAY=2: same accident. **Canned rank gate matches C’s two-value test; do not treat the local swap as this SHA’s Must-fix.** `charge_ok` `EXCLUDE_SELECTABLE` is rejected canned — **Match C.**

Hands. wield/grease pass `hands_obj`; apply/throw do not. **Match those `obj_ok(NULL)` ranks.** wield canned `otmp===hands_obj` → `null` like interactive `-`. Miss → `undefined` vs C NULL (falsy).

Callee closure (ALLOWCNT canned arm). LIVE: `getobj_from_cmdq`, `getobj_split_otmp`, `splitobj`/`splittable`. CLONE: `cmdq_pop_getobj` / `cmdq_clear_canned` (verified vs C pop/clear of canned; REPEAT when `in_doagain`). OMIT named: REPEAT record, pickinv `&ctmp`, eat/read/zap/tin, stash, `finish_splitting`. STUB: **none in the wired ALLOWCNT arms.** Apply NOFLAGS INT-abort is LIVE, not a stub. The arm may ship.

`cmdq_add_int` body matches C append-INT. Shipping it without the REPEAT caller is **not** “dispatch ported, callee stubbed” — the **canned consumer** is the shipped dispatch; the producer is named omit.

## Hallucinations / overclaim

Subject INT then KEY splits when ALLOWCNT: **true** of throw/drop/wield/ready/charge/adjust. Stamping **Addressed:** D-1551 is fair for **491’s** canned-INT omit. Do **not** stamp “Match C REPEAT `cmdq_add_int`.” Do **not** stamp “Match C eat/read/zap getobj.” Do **not** stamp “Match C `display_pickinv` `&ctmp`.” Do **not** stamp “Match C stash ALLOWCNT.” Apply INT abort is C (`!allowcnt`), not a miss. This is **not** “dispatch ported, callee stubbed” for the wired clones — `splitobj` is LIVE.

## Density

+175 JS: one C `getobj` canned envelope + every already-split ALLOWCNT/apply KEY clone. Consecutive Open of the same `invent.c:getobj` family. Did not glue pickinv `&ctmp` / `finish_splitting`. §2b OK.

## Branch-by-branch confirm

1. ALLOWCNT INT n then KEY letter, `quan > n ≥ 1`: split n. **Match.**
2. `quan <= n` or `n < 1`: whole stack (`cntgiven` false). **Match.**
3. KEY only: no split. **Match.**
4. INT when `!allowcnt` (apply/rub/…): NULL, canned cleared. **Match.**
5. Second INT: NULL. **Match.**
6. KEY miss: NULL, not prompt. **Match.**
7. Throw canned count>1 non-gold: split, no “only one”. **Match canned C.**
8. INT, empty queue: JS interactive without count; C interactive **with** count. **Named; no producer.**
9. eat/tin still KEY-only local. **Named.**

## Callers / RNG ledger

C: every `getobj`. JS: six ALLOWCNT + four apply-family. Public-unhit until a session queues canned INT+KEY (itemactions today queues KEY only). No seed gate. No new `rn2`.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. invent→ already imported by apply/wield/do/dothrow/artifact.

## Verification

D-log canary (INT+KEY split / whole-stack / KEY-only / !ALLOWCNT abort / second INT / throw skip throw-one / Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** Admit it.

## Actionable C-wrongs

None for Must-fix. Named: eat/read/zap/tin NOFLAGS clones; `display_pickinv` `&ctmp`; `finish_splitting` / `unsplitobj`; stash getobj ALLOWCNT; `in_doagain` REPEAT record (`cmdq_add_int` unused); INT-without-KEY dropping `cntgiven`; pickinv count; `silly_thing` on canned EXCLUDE. Do **not** add `cmdq_pop` clone #2 under that name.

Verdict: **ACCEPT-WITH-DEBT**
