# Review 616 — d34f23ee — invent.c flags.invlet_constant / reassign (D-1655)

## Metadata
- Full / short hash: `d34f23eee573fd7d0b2cf9471dfb09a34fdf5fc7` / `d34f23ee`
- Parent: `e53a5df9` (D-1654). This file audits **this SHA only** (eighth of nine `js/` commits since review **608**). Archive **Addressed:** D-1655 `d34f23ee`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 13:49:24 +0200
- D-id: **D-1655**
- Stats: `js/invent.js` +91/−19, `js/jsmain.js` +3/−0, `js/objnam.js` +10/−3, `js/options.js` +11/−2. Band **150–350** (`js/` insertions **115** <250; id >454).
- Claims to close: Open `invent.c` `invlet_constant` after D-1641. Not `check_invent_gold`. Not `dounpaid`. `reviews/loop-2026-08-15/` has no unpaid `reassign` Must-fix.
- JS / map: `invent.js` `reassign`/`obj_to_let`; `options.js` `fixinv`→`invlet_constant`; `objnam.js` `xprname`; `jsmain.js` default On. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: map named after D-1641 (review **602** named `invlet_constant`).

## Intent vs deliverable

Git subject promises: `flags.invlet_constant` so `!fixinv` `reassign` packs a–z/A–Z and gold at `$` head, instead of leaving `assigninvlet` letters after D-1641.

Pinned C `invent.c` `reassign` `:4853–4884` (`node scripts/csym.mjs reassign`). `obj_to_let` `:2860–2868` (`staticfn`). `--callers reassign`: `invent.c:1857` getobj, `:2865` inside `obj_to_let`, `:3147` `display_pickinv`, `:3688` `dounpaid`, `:4995` `doorganize`; `options.c:5359` `optfn_boolean`. `--callers obj_to_let`: `prinv` `:2888`; `doprwep` `:4564`; `doprarm` `:4620–4632`; `doprring` `:4654/:4659`; `dopramulet` `:4689`; `doprtool` `:4727`. `xprname` is `extern.h` (csym body miss); use_invlet `:2907–2908` in `invent.c`.

```4853:4884:nethack-c/upstream/src/invent.c
void
reassign(void)
{
    /* first, remove [first instance of] gold from invent, if present */
    ...
        if (obj->oclass == COIN_CLASS) {
            goldobj = obj;
            ...
            break;
        }
    for (obj = gi.invent, i = 0; obj; obj = obj->nobj, i++)
        obj->invlet =
            (i < 26) ? ('a' + i) : (i < 52) ? ('A' + i - 26) : NOINVSYM;
    if (goldobj) {
        goldobj->invlet = GOLD_SYM;
        goldobj->nobj = gi.invent;
        gi.invent = goldobj;
    }
    if (i >= 52)
        i = 52 - 1;
    gl.lastinvnr = i;
}
```

```2860:2868:nethack-c/upstream/src/invent.c
staticfn char
obj_to_let(struct obj *obj)
{
    if (!flags.invlet_constant) {
        obj->invlet = NOINVSYM;
        reassign();
    }
    return obj->invlet;
}
```

Old JS: `assigninvlet` kept letters; `DOSET_BOOL_ADDR.fixinv` wrote `flags.fixinv`; `xprname` used `let_ ?? obj.invlet`; `#see*` concatenated raw `invlet`. The diff **does** `reassign`/`obj_to_let`/`invlet_constant`, default On, OPTIONS=`fixinv`, getobj/`display_pickinv`/`doorganize`/`prinv`/`dopr*`/`optfn_boolean` (minus wizweight), and `xprname` use_invlet. It **does not** port `dounpaid` `:3688`, wizcmds `sanity_check`, or wizweight. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `invlet_constant` | C `flag.h` / optlist `fixinv` opt_out On, **LIVE this SHA** | missing bag ≡ On |
| `reassign` | C `:4853–4884`, **LIVE this SHA** | array splice ≡ first `nobj` gold |
| `obj_to_let` | C `:2860–2868` static, **LIVE this SHA** (local) | not exported — do **not** add clone #2 |
| `prinv` | C `:2876–2890`, **LIVE** | now `obj_to_let` into `xprname` |
| `doprwep` | C `:4549–4568`, **LIVE** | `obj_to_let(uwep)` then raw `uswapwep`/`uquiver` invlet |
| `doprarm` / `doprring` / `dopramulet` / `doprtool` | C those `#see*`, **LIVE** | each slot `obj_to_let` |
| `getobj` | C `:1856–1857`, **LIVE** | `!invlet_constant` then `sortloot` |
| `getobj_adjust` | JS clone of getobj path, **CLONE** + `reassign` this SHA | C uses live `getobj` |
| `display_pickinv_reply` | C `display_pickinv` `:3145–3147`, **LIVE** | after `n==0` return |
| `display_inventory` | C same function, **LIVE** | extra gate on `invent.length` |
| `doorganize` | C `:4994–4995`, **LIVE** | |
| `optfn_boolean` fixinv/price_quotes/sortpack/implicit_uncursed | C `:5353–5361`, **LIVE this SHA** | `if (initial) return` skips config |
| `opt_wizweight` | C same case, **OMIT named** | Open row |
| `dounpaid` | C `:3688`, **OMIT named** | no live JS `dounpaid` |
| wizcmds `sanity_check` | C gold/invlet, **OMIT named** | |
| `xprname` use_invlet | C `:2907–2942`, **LIVE this SHA** on ordinary path | C rewrite only in cost/`*` block |
| `update_inventory` | C invent.c, **LIVE** | already in invent.js |
| `assigninvlet` | C addinv, **LIVE** (not this SHA) | `u_init.js` import |
| `doprinuse` | C `:4739+` no `obj_to_let`, **LIVE** | not this SHA |

`node scripts/csym.mjs reassign` → `:4853-4884`. `obj_to_let` → `:2860-2868`. `--callers reassign`: six sites above. `--callers obj_to_let`: 16 refs (prototype + prinv + `#see*`). `--callers xprname`: prinv `:2888`, `display_pickinv` hands/lets, `dounpaid` unpaid columns, `shk.c` bill `'x'`.

RNG: none in `reassign`/`obj_to_let`. No seed gate.

`node scripts/sym.mjs` on new / re-pointed names:

```
reassign         js/invent.js:5480   sync
obj_to_let       NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/invent.js:5515
             => Do NOT write clone #2.
invlet_constant  js/invent.js:5469   sync
xprname          js/objnam.js:2545   sync
update_inventory js/invent.js:3290   sync
prinv            js/invent.js:4873   ASYNC — await required
             !! ALSO 1 LOCAL CLONE(S) — js/do_wear.js:175
doprwep          js/invent.js:4889   ASYNC — await required
doprarm          js/invent.js:4935   ASYNC — await required
doprring         js/invent.js:4958   ASYNC — await required
dopramulet       js/invent.js:4988   ASYNC — await required
doprtool         js/invent.js:5003   ASYNC — await required
doorganize       js/invent.js:6751   ASYNC — await required
getobj           js/invent.js:6014   ASYNC — await required
lastinvnr        NOT FOUND in js/** (no export). Uses game._lastinvnr.
```

`--can options.js invent.js reassign`: ALREADY. `--can options.js invent.js invlet_constant`: ALREADY. `--can options.js invent.js update_inventory`: ALREADY. `--can invent.js options.js update_inventory`: ALREADY (pre-existing SCC). `--can objnam.js invent.js obj_to_let`: NEW-CYCLE but `obj_to_let` is **not exported**; this SHA does **not** import it into objnam (prinv passes the char). Do **not** stamp “cycle-forced clone.” Do **not** add `obj_to_let` #2. Do **not** add `prinv` clone #2 in do_wear.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates in this SHA’s `js/` hunks. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

`reassign` gold. C first `oclass == COIN_CLASS` then unlink via `nobj`. JS `findIndex` + `splice` then `unshift`. **Match `:4861–4880`.** Letters: `i<26` `'a'+i`, `i<52` `'A'+i-26`, else `NOINVSYM` `'#'`. Gold `GOLD_SYM` `'$'` at head. **Match.** `i>=52` clamp `i=51`; C `gl.lastinvnr`; JS `game._lastinvnr`. **Match the clamp.** Empty invent: C loop does not run, `i` uninitialized in the `for` init… wait C `for (obj = gi.invent, i = 0; obj; …)` so empty → `i=0`. JS `if (!inv)` treats null only; `[]` still runs, `i=0`. **Match empty array.**

`obj_to_let`. C `!flags.invlet_constant` → `NOINVSYM` then `reassign`, return `obj->invlet`. JS same via `invlet_constant()`. **Match `:2860–2868`.**

Callers. getobj `:1856–1857` after inaccess switch, before `sortloot`. JS after the same switch. **Match.** `display_pickinv` `n==0` pline then return **before** reassign; then `!invlet_constant` reassign. JS `display_pickinv_reply` same order (`:2469` then `:2476`). **Match `:3140–3147`.** JS `display_inventory` also reassigns if `invent.length` before wizid — C is one function so wizid still sees packed letters after the `n==0` gate. Extra call is idempotent.

`doorganize` `:4994–4995` before `getobj`. JS before `getobj_adjust`. **Match the gate.** `getobj_adjust` also reassigns (C `getobj` would). Double like C `doorganize`+`getobj`.

`prinv`. C `xprname(obj, NULL, obj_to_let(obj), !total_of, 0L, quan)`. JS `xprname(obj, obj_to_let(obj), !totalOf, q)`. **Match `:2888`.**

`doprwep` `:4562–4568`: comment that one `obj_to_let(uwep)` packs all invent; then `uswapwep->invlet` / `uquiver->invlet` without a second `obj_to_let`. JS `obj_to_let(u.uwep)` then `u.uswapwep.invlet` / `u.uquiver.invlet`. **Match.** `doprarm` SORTPACK_INUSE slot order, `obj_to_let` per slot. **Match `:4615–4632`.** `doprring` meat-ring `use_inuse_mode` + `obj_to_let` each. **Match `:4653–4662`.** `dopramulet` `obj_to_let(uamul)`. **Match `:4689`.** `doprtool` invent walk `tool_being_used` + cap `invlet_basic` + `obj_to_let`. **Match `:4721–4728`.**

`optfn_boolean`. C after `*(addr)=!negated`, cases `opt_fixinv`/`price_quotes`/`sortpack`/`implicit_uncursed`/`wizweight`: `if (!flags.invlet_constant) reassign(); update_inventory();`. JS after writing `invlet_constant`, same four names minus wizweight; `if (initial) return` skips nethackrc. C after-change still runs at `opt_initial` but `update_inventory` no-ops without `in_moveloop`; invent is usually empty. **Match the in-game toggle.** `DOSET_BOOL_ADDR.fixinv` now `flags.invlet_constant` (was `flags.fixinv` — that field is not C). parseNethackrc `fixinv` → `invlet_constant`. jsmain default `true` ≡ opt_out On. **Match.**

`xprname` use_invlet. C `:2907–2908` `flags.invlet_constant && obj && let != CONTAINED_SYM && let != HANDS_SYM`. Then **only** in `if (cost != 0L || let == '*')` with `dot && use_invlet` does C set `let = obj->invlet`. Ordinary prinv uses the `let` argument (`obj_to_let`). JS always `if (use_invlet) ilet = obj.invlet`. Default On: `obj_to_let` returns `obj.invlet` without reassign, so overwrite is the same char. `!fixinv`: C `use_invlet` false; JS `flagOn` false; both keep the packed letter from `obj_to_let`. Hands: `xprname(null, HANDS_SYM, …)` — `obj` null, no overwrite. **Match ordinary + hands.** cost/Iu/Ix unpaid columns still **OMIT named** (`dounpaid` / shk `'x'`). JS pickup `xprname(otmp, letch)`: when fixinv On, `letch` is already `otmp.invlet`; overwrite is the same.

Callee closure (`!fixinv` pack + `#see*` + doset). LIVE: `reassign`, `obj_to_let`, `getobj`, `display_pickinv`, `doorganize`, `prinv`, `dopr*`, `update_inventory`, `invlet_constant`. CLONE: `getobj_adjust` reassign matches C `getobj`. OMIT named: `dounpaid`, wizcmds, wizweight, Iu/Ix. STUB: **none** in a live arm. Combined-arm ships. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject `reassign` packs a–z/A–Z/`$` head: **true.** D-log “first COIN_CLASS like GOLD_SYM unlink”: C is **oclass** `COIN_CLASS`, not invlet `GOLD_SYM` — the JS `findIndex` is the C test. Do **not** stamp “Match C `dounpaid` reassign.” Do **not** stamp “Match C wizweight doset.” Do **not** stamp “Match C `xprname` cost/Iu `let = obj->invlet` only.” Public traces keep fixinv On; `!fixinv` pack is **public-unhit**.

## Density

+115: `reassign` 32 + `obj_to_let` 9 + `invlet_constant` + C call sites + optfn four names. §2b one `invlet_constant` family. Did not glue `dounpaid`. Above a one-`if` peel.

## Verification

Wired: default On; `!fixinv` pack; getobj/pickinv/organize/prinv/`#see*`; fixinv OPTIONS/doset. Unwired C: `dounpaid`; wizcmds; wizweight. Conf: no `rn2`. No seed gate.

D-log private canary gold-head/abc / 52+`#` / parse !fixinv; green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** for `!fixinv` (opt_out On). Fortress does not prove packed letters.

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): `dounpaid` `reassign` (`invent.c:3688`); wizcmds `sanity_check`; `opt_wizweight` after-change; `xprname` cost/`*` Iu/Ix columns; `getobj_adjust` remains a getobj clone. Do **not** add `obj_to_let` export/`#2`. Do **not** add `prinv` clone #2. Do **not** re-port `check_invent_gold` (D-1641). Do **not** re-port `safe_qbuf` (D-1654).

Verdict: **ACCEPT-WITH-DEBT**
