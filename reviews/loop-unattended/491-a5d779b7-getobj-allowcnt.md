# Review 491 — a5d779b7 — invent.c getobj GETOBJ_ALLOWCNT count prefix (D-1530)

## Metadata
- Full / short hash: `a5d779b7bf733452df39c03c58f359378b00660c` / `a5d779b7`
- Parent: `72c1fcdd` (D-1529). This file audits **this SHA only** (ninth of nine `js/` commits since review **482**). Archive **Addressed:** D-1530 missing `%h` — fill `a5d779b7` in this review commit.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-26 05:25:55 +0200
- D-id: **D-1530**
- Stats: 14 files, +367 / −69 — `js/invent.js` +196 / −8, `js/wield.js` +40 / −13, `js/dothrow.js` +30 / −10, `js/artifact.js` +25 / −8, `js/do.js` +19 / −5. Band **200–450** (js/ insertions **310**).
- Claims to close: Open `invent.c` `getobj` GETOBJ_ALLOWCNT (named from D-1529 / D-1502 charge). Not Palantir. `reviews/loop-2026-08-15/` has no unpaid getobj-count Must-fix.
- JS / map: shared helpers in `invent.js`; six ALLOWCNT clones. `c-js-map/turns.md` + `data.md`.
- Prior reviews this SHA claims to close: **490** named ALLOWCNT. Charge omit after D-1502.

## Intent vs deliverable

Git subject promises: a digit prefix splits the chosen stack (throw-one, gold count, loadstone/weld gates), not charging/dropping/throwing the whole stack.

Pinned C `invent.c` `getobj` `:1937–2088` + `splittable` `:1664–1668`. `cmd.c` `get_count` `:5009–5089` (`inkey` = first digit, `LARGEST_INT`, `GC_SAVEHIST`). Callers with `GETOBJ_ALLOWCNT`: charge (`artifact.c:1852` / `read.c:1824`), drop (`do.c:35–36`), throw (`dothrow.c:371`), wield/ready (`wield.c:373`/`:532`), adjust (`invent.c:5001`), stash (`pickup.c:3176–3177`).

```1937:1948:nethack-c/upstream/src/invent.c
        if (digit(ilet)) {
            long tmpcnt = 0L;
            if (!allowcnt) {
                pline("No count allowed with this command.");
                continue;
            }
            ilet = get_count(NULL, ilet, LARGEST_INT, &tmpcnt, GC_SAVEHIST);
            if (tmpcnt) {
                cnt = tmpcnt;
                cntgiven = TRUE;
            }
        }
```

```2076:2088:nethack-c/upstream/src/invent.c
    if (cntgiven) {
        if (cnt == 0L)
            return (struct obj *) 0;
        if (cnt != otmp->quan) {
            if (splittable(otmp))
                otmp = splitobj(otmp, cnt);
            else if (otmp->otyp == LOADSTONE && otmp->cursed)
                otmp->corpsenm = (int) cnt;
        }
    }
    return otmp;
```

Old JS: six getobj clones treated digits as unknown letters (charge named the omit).

The diff **does** add `getobj_take_count` / `getobj_get_count` / `getobj_apply_count` / `getobj_split_otmp` / `splittable` / `getobj_will_weld`, wire charge/drop/throw/wield/ready/adjust. Child spliced after parent on `invent[]` because `splitobj` still omits that array (D-0924). It **does not** wire pickup stash, NOFLAGS clones (`No count allowed` live in the helper, unused by eat/read/zap/…), pickinv `&ctmp`, `CMDQ_INT`, `GC_SAVEHIST` `putmsghistory`, or `finish_splitting`/`unsplitobj` after wield/quiver. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `getobj` digit→split | C `:1937–2088`, **LIVE** as helpers | clones call them |
| `splittable` | C `:1664–1668`, **LIVE this SHA** | |
| `get_count` | C `cmd.c:5009`, **CLONE** `getobj_get_count` | GC_SAVEHIST hist **OMIT named** |
| `splitobj` | C `mkobj.c`, **LIVE** | invent[] splice here only |
| `will_weld` | C `wield.c:68`, **CLONE** `getobj_will_weld` | cycle vs wield.js |
| `welded` bknown | C `:1053`, **LIVE in splittable** | |
| six ALLOWCNT clones | C callers above, **LIVE** | stash **OMIT named** |
| `finish_splitting` | C wield.c, **OMIT named** | |
| Palantir | artilist `#if 0`, **OMIT named** | |

`node scripts/sym.mjs splittable getobj_take_count getobj_apply_count getobj_split_otmp splitobj welded get_count finish_splitting unsplitobj getobj_will_weld`:

```
splittable       js/invent.js:3657   sync
getobj_take_count js/invent.js:3727   ASYNC — await required
getobj_apply_count js/invent.js:3776   ASYNC — await required
getobj_split_otmp js/invent.js:3748   sync
splitobj         js/mkobj.js:332   sync
welded           js/wield.js:110   sync
get_count        NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/cmd.js:1384
finish_splitting NOT FOUND in js/**
unsplitobj       NOT FOUND in js/**
getobj_will_weld NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/invent.js:3646
```

This SHA does **not** delete a symbol. C has **one** `get_count`; JS `cmd.js:1384` is the rhack/parse clone (no `inkey`, cap 500). This SHA added `getobj_get_count` (`inkey`, `LARGEST_INT`) instead of extending that local — clone #2 vs C, matched to the **getobj** call (`:1944`). `getobj_will_weld` is a cycle clone of `wield.js` `will_weld` (C one macro).

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **No gameplay RNG** (digit parse + split). **Public-unhit** until a session types a digit at getobj. Inherited seed0367 FAIL is D-1526.

## C ↔ JS fidelity

Digit gate. C `digit(ilet)`; `!allowcnt` → `"No count allowed with this command."` + `continue`. JS `getobj_take_count(ch, allowcnt)` the same (`retry`). Six wired clones pass `true`. NOFLAGS clones (eat/read/zap/wear/…) still do not call it — **named**, helper is ready. **Match the C `if`.**

`get_count`. `inkey` first digit; further `nhgetch`; `cnt = 10*cnt+dgt`; `cnt<0` → 0; cap `LARGEST_INT` (32767, `global.h:135` / `const.js`). Echo `"Count: N"` when `cnt>9 \|\| backspaced` (not first digit alone). Backspace empty: return that key. ESC: cnt 0. JS `:3674–3717` the same (`key` 8/127, `clear_nhwindow_message` + `_pending_message`). **Match `:5044–5080`.** `putmsghistory` GC_SAVEHIST **named**. `AppendLongDigit` vs JS number: cap at 32767 avoids C overflow. **Match for typed counts.**

`cntgiven`. C `if (tmpcnt) { cnt=tmpcnt; cntgiven=TRUE; }`. Zero count (`0a` / `00a`) does **not** set cntgiven. JS `cntgiven: got.cnt !== 0`. **Match `:1945–1948`.**

Gold LRS. C `:2021–2026` coins + cntgiven + `cnt<=0`: `cnt<0` → LRS pline; always return 0. JS `getobj_apply_count` the same string. **Match.** (JS number will not go negative from the digit parser.)

Throw-one. C `:2028–2047` `word=="throw"`: `cnt==0 \|\| !otmp` → return 0; `cnt>1 && (!coins \|\| cnt>quan)` → You only-have / only-one + `continue`. Ready/fire skip this. JS `word === 'throw'` then `{retry:true}`. **Match the messages and retry** when `otmp` is found. **Gap:** C `:2036–2037` throw+cntgiven+**missing letter** returns NULL (abort). JS `getobj_throw` prints `"You don't have that object."` and **re-prompts** before `apply_count`. Not named in the D-log. Edge; not a stubbed callee.

`don't have that many`. C `:2063–2067` `cnt<0 \|\| quan<cnt` → continue. JS retry. **Match.** `disp.botl`: JS `flags.botl = true`. **Match `:2049`.**

`split_otmp`. cntgiven; cnt==0 → null; cnt==quan → same obj; `splittable` → `splitobj` else cursed loadstone `corpsenm=cnt`. JS splices child at `indexOf(parent)+1` and sets `OBJ_INVENT` because `mkobj.js` `splitobj` still must not insert `invent[]` (D-0924). C `nobj` insert is inside `splitobj`. **Match the getobj result object** (child of size `cnt`). **Match loadstone kludge.**

`splittable`. C `!(LOADSTONE&&cursed \|\| obj==uwep && welded(uwep))`. `welded` sets `bknown`. JS `getobj_will_weld` = C `will_weld` (`cursed` && (weapon/weptool/ball/chain/tin opener)). **Match `:1666–1667` + `wield.c:68–69`.**

Six clones. charge/drop/throw/wield/ready/adjust all `take_count` then letter then `apply_count`. **Match those C callers.** Stash `pickup.c:3176` **named**. `?`/`*` pickinv `&ctmp` **named** (throw/charge still menu-select without menu count). `CMDQ_INT` **named**. `finish_splitting` after wield/quiver **named** (cancel can leave a split child).

Callee closure (ALLOWCNT arm). LIVE: `splitobj`, `splittable`, `nhgetch`, `pline`. CLONE: `get_count` (getobj flags), `will_weld` (cycle). STUB: none in the six wired verbs. OMIT named: stash, pickinv count, CMDQ_INT, GC_SAVEHIST hist, finish_splitting, Palantir, NOFLAGS clones. **Arm may ship.** Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject digit prefix splits (throw-one, gold, loadstone/weld): **true of the helpers + six clones**. D-log canary 32/32 (split 2 of 5, loadstone, welded, !ALLOWCNT helper, Count: echo, ESC, 00a, drop too-many, throw-one, gold): **true of that canary**. Stamping **Addressed:** D-1530 for **`:1937–2088` + `:1664` + those callers** is fair. Do **not** stamp “Match C stash getobj.” Do **not** stamp “Match C pickinv `&ctmp`.” Do **not** stamp “Match C `finish_splitting`.” Do **not** stamp “Match C eat/read NOFLAGS `No count allowed`.” D-log “not a public FAIL” is true of **this** delta; seed0367 is D-1526. Helpers are **not** stubs.

## Density

+310 JS: one C getobj family (digit + get_count + apply + split) and the six ALLOWCNT clones that must call it. Did not glue Palantir or stash. §2b: this is the C function, not six unrelated peels. Acceptable.

## Branch-by-branch confirm

1. Non-digit: `cntgiven` false; whole stack. **Match.**
2. `2` + letter, quan 5, splittable: child quan 2, parent 3, child after parent. **Match.**
3. Count == quan: no split. **Match `:2079`.**
4. Cursed loadstone: no split, `corpsenm=cnt`. **Match `:2083–2085`.**
5. Welded uwep: no split, `bknown`. **Match `welded`.**
6. `0a` / `00a`: cntgiven false. **Match `:1945`.**
7. Throw `2` non-gold: only-one, retry. **Match `:2039–2046`.**
8. Throw gold count ≤ quan: split. **Match coins exception.**
9. Drop `9` when quan 3: don’t-have-that-many, retry. **Match `:2063`.**
10. Gold cntgiven cnt≤0: LRS / cancel. **Match `:2021`.**
11. ESC in get_count: Never_mind path via quitchar. **Match.**
12. `!ALLOWCNT`: No count allowed. Helper **Match**; eat/read clones **named omit** of the call.
13. Stash / pickinv count / CMDQ_INT / finish_splitting. **Named.**
14. Throw+count+bad letter: C abort, JS re-prompt. **C-wrong, not Must-fix this iter.**
15. **Public-unhit** (no public digit at getobj).

## Callers / RNG ledger

C ALLOWCNT: charge, drop, throw, wield, ready, adjust, stash. JS: first six. No `rn2`. No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No fs. No FORCE. `will_weld` clone is a cycle, not a second invent.c function.

## Verification

D-log: private canary **32**/32; green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** until a session types a digit at getobj. Honest for this SHA. Full-suite FAIL remains seed0367 from D-1526.

## Actionable C-wrongs

1. **Throw + cntgiven + missing invlet** (`dothrow.js` `getobj_throw`): C `:2036–2037` returns NULL; JS re-prompts `"You don't have that object."` Map / later invent polish — do **not** Must-fix ahead of review **487** Pri-strt `mk_roamer`. Remaining **named**: stash ALLOWCNT; pickinv `&ctmp`; `CMDQ_INT`; `GC_SAVEHIST` hist; `finish_splitting`/`unsplitobj`; doorganize nobj-unsplit; NOFLAGS clones; Palantir `#if 0`; unify `cmd.js` `get_count` + `getobj_get_count` (C one function). Do not Must-fix splicing `invent[]` inside shared `splitobj` (D-0924).

Verdict: **ACCEPT-WITH-DEBT**
