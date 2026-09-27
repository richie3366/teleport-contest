# Review 1935 — 25beec7af — cmdq_add_key (D-2976)

- SHA: `25beec7af` (coverage; `cmd.c` `cmdq_add_key`, plus re-pointing the canned `cmdq_add_ec` clones onto `js/cmd.js`)
- Files: `js/invent.js` (`+13/−5`), `js/cmd.js` (`+6/−5`), `js/iactions.js` (`+73/−92`), `js/apply.js` (`+12/−21`), `js/dig.js` (`+7/−18`), `js/dothrow.js` (`+9/−13`), `js/getpos.js` (`+7/−1`), `js/spell.js` (`+4/−3`)
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed name in the `js/` hunks. `imports.mjs --rulecheck`: "Rule #2 clean: no bare/node specifiers or fs calls in js/."
- `sym.mjs` (clones the diff deletes):

```
cmdq_add_key       js/invent.js:8574   sync
cmdq_add_ec        js/cmd.js:428   sync
cmdq_add_ec_entry  NOT FOUND in js/** (no export, no local function/const).
```

`apply.js`, `dig.js`, and `iactions.js` no longer define `cmdq_add_key`. `apply.js`, `dig.js`, `dothrow.js`, and `iactions.js` no longer define a local `cmdq_add_ec`. `--can` from each of those importers to `js/cmd.js` `cmdq_add_ec`, and from `spell.js` / `getpos.js` to `js/invent.js` `cmdq_add_key`, prints `ALREADY`. At this SHA, `cmdq_add_ec` still does not call `ext_func_tab_from_func` (the following commit does). Callers that need an internal name pass `{ txt, flags }`.

**Addressed:** D-2979

## Intent vs deliverable

Subject: `invent.js` already tail-appended a `CMDQ_KEY` node, but `apply.js`, `dig.js`, and `iactions.js` each kept a canned-only clone (`typ: 'key'`, char code, no queue index). `docast` never recorded the spell letter, and `getpos` never recorded an interactive read.

The diff keeps one `cmdq_add_key`, deletes those clones, and points the extcmd clones at `cmd.js`. `docast` and `getpos` record a key. `IA_QUAFF_OBJ` still does not queue the m-prefix.

## Inventory

| JS | Class | C |
|----|-------|---|
| `cmdq_add_key` | live sync `invent.js:8574` | `cmd.c:274–290` |
| `cmdq_qname` | local queue index | `gc.command_queue[q]` |
| `cmdq_add_ec` at this SHA | live append; lookup omitted | `cmd.c:253–270`, ledger partial |
| deleted `cmdq_add_key` / `cmdq_add_ec` / `cmdq_add_ec_entry` | removed clones | — |

`CQ_CANNED` is 0 and `CQ_REPEAT` is 1 (`const.js:553–554`, `hack.h:194–195`). `CMDQ_KEY` is 0.

## C ↔ JS fidelity

No `rn2`. The node is `{ typ: CMDQ_KEY, key }`. A string key is kept; a number becomes `String.fromCharCode`. C stores a `char`. `next` is the array order: `push` is the tail walk, and `cmdq_pop` `shift`s the head. An empty queue is created and the node is the head. Any `q` other than `CQ_REPEAT` selects `_cmdq_canned`.

Wired key sites match the call: `apply.c:1809` / `:2967` / `:3443` / `:3746` are `CQ_CANNED` plus `obj.invlet` after the matching `cmdq_add_ec` (`js/apply.js:3303`, `:3771`, `:3921`, `:5246`). `dig.c:1104–1105` is the same pair (`js/dig.js:2480`). `dothrow.c:523–577` is the three fireassist sequences, including the `pushweapon` guard around `doswapweapon` and the invlet between `dowield` and `dofire` (`js/dothrow.js:2727–2781`). `spell.c:825` records `spellet(spell_no)` on `CQ_REPEAT` only after `getspell` succeeds (`js/spell.js:2848–2851`). `invent.c:2053` is `getobj_record_repeat` (`invent.js:8599`). `cmd.c:4018` `getdir` is `lock.js:639`. `cmd.c:4706–4805` herecmdmenu and `cmd.c:5543` `yn_function` (`getline.js:1844`) were already on this function.

`itemactions_pushkeys` matches `iactions.c:148–272` on every arm except quaff. Eat (`:177–182`) and tip (`:242–244`) still queue `do_reqmenu` then the command then the invlet. Unwield, name, dip, fire, adjust, sacrifice, buy, quiver, read, rub, throw, takeoff, invoke, wield, wear, swap, twoweapon, zap, and whatis (`'i'` then invlet) match, including the arms that queue no key. `IA_QUAFF_OBJ` does not. C `iactions.c:207–212` is `do_reqmenu`, then `dodrink`, then the invlet, so `#quaff` ignores a fountain or sink. `js/iactions.js:123–127` queues only `dodrink` and the invlet. The diff rewrote that arm (it added `CQ_CANNED`) and left the prefix out. The D-log's caller range `iactions.c:149–269` includes line 210.

`getpos.c:871` still does not `cmdq_pop` before the read. The add at `:885–886` is on the interactive `nhgetch` path (`js/getpos.js:1389–1395`), which is the C else, and the D-log names the missing pop. `allmain.c:486–494` is `#if defined(MICRO) || defined(WIN32CON)`; neither macro is in this tree. `nhlua.c:1424–1432` `nhl_pushkey` has no JS (the call is `:1432`; the D-log says `:1423`). `lock.c:887`, `end.c:1010`, and `pray.c:2215` (`#if 0`) are `cmdq_add_ec` sites, named, not key sites. `alloc` is the GC node.

## Hallucinations / overclaim

The key function is the C append. The D-log's "iactions.c:149–269 → js/iactions.js" does not hold for `IA_QUAFF_OBJ`'s `do_reqmenu`. `cmdq_add_ec`'s missing lookup is named and marked partial; it is not sold as the whole `cmd.c:253–270` body. The following commit is that lookup.

## Density

`cmdq_add_key` is the whole 11-line body, and the live key callers above are on it. The quaff prefix is a caller arm this commit edited and did not ship. That is one port iter: add `cmdq_add_ec(CQ_CANNED, do_reqmenu)` before `dodrink` in `IA_QUAFF_OBJ`.

## Verification

```
verify cmdq_add_key: baseline 25beec7af~1 (scoreboard at 3b405b65a, 2026-09-27T15:01:59.168Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify cmdq_add_key: no corpus session is blocked on it at 25beec7af~1 — a vacuous verify is NOT a corpus PASS. ...
smoke cmdq_add_key: no RNG-tagged reach; fixed smoke spread (12 run, 3.4s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks. D-2976 records green 2/2, strict ×2, cohort 7/7, skip full. This re-run shows no `REGRESSED` session. The quaff prefix is not one of those sessions.

## Actionable C-wrongs

1. `IA_QUAFF_OBJ` must queue `do_reqmenu` before `dodrink` and the invlet (`iactions.c:210–212`). `js/iactions.js:123–127` skips the m-prefix, so a fountain or sink is not ignored.

Verdict: **QUALITY-RISK**
