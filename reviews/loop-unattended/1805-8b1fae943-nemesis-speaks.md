# Review 1805 — 8b1fae943 — nemesis_speaks (D-2846)

- SHA: `8b1fae943` (coverage; `quest.c` `nemesis_speaks` plus the `quest_stat_check` writer)
- Files: `js/quest.js` (+53/−7)
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, seed name, or `fastforward` in the hunk. `imports.mjs --rulecheck`: "Rule #2 clean".

**Addressed:** D-2853 `d15d25c20`

## Intent vs deliverable

Subject promises one `nemesis_speaks`: out of battle, `nemesis_wantsit` / `nemesis_first` / `nemesis_next` / `nemesis_other` / `discourage` on `rn2(5)==0`, then bump `made_goal` while it is under 7 and set `met_nemesis`. In battle, `discourage` on `rn2(5)==0` and leave the scorecard. `quest_stat_check` sets `in_battle` for `MS_NEMESIS` when the monster is not helpless and `monnear` the hero. The diff is that function, the `MS_NEMESIS` arm of `quest_talk`, and a `quest_stat_check` that no longer discards its argument.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `nemesis_speaks` | async export `quest.js:534` | `quest.c:403–422` |
| `quest_talk` MS_NEMESIS | live arm `quest.js:568` | `quest.c:502–504` |
| `quest_stat_check` | sync export `quest.js:587` | `quest.c:513–518` |
| `qt_pager` | LIVE import `questpgr.js:1139` | `questpgr.c:629–634` |
| `monnear` | LIVE import `mon.js:1120` | `mon.c` |
| `rn2` | LIVE | the two `rn2(5)` sites |
| `helpless` | inlined macro | `monst.h:251` |

`sym.mjs` (nothing deleted or re-pointed):

```
nemesis_speaks   js/quest.js:534   ASYNC — await required
quest_stat_check js/quest.js:587   sync
qt_pager         js/questpgr.js:1139   ASYNC — await required
monnear          js/mon.js:1120   sync
quest_talk       js/quest.js:560   ASYNC — await required
```

## C ↔ JS fidelity

`csym` body is `quest.c:402–422`. The only call is `quest_talk` at `:503`. JS awaits `nemesis_speaks()` in that case, after the leader `m_id` return. `MS_NEMESIS` is 37 (`monflag.h:52`). The local const matches.

Out of battle, the chain matches `:406–415`: `u.uhave.questart` (JS stores 1/0, `u_init.js:1008`), else `made_goal == 1 || !met_nemesis`, else `made_goal < 4`, else `made_goal < 7`, else `!rn2(5)` then `qt_pager("discourage")`. Then, still out of battle, `made_goal` increments while `< 7` (`quest.h:20` is a 3-bit field; the guard stops the wrap) and `met_nemesis = 1`. In battle, the `else if (!rn2(5))` is the only roll, and the scorecard is not written. The two `rn2(5)` calls are mutually exclusive. That part of the function matches.

`quest_stat_check`: `msound == MS_NEMESIS` then `in_battle = (!helpless(mtmp) && monnear(mtmp, u.ux, u.uy))`. JS inlines `msleeping || !mcanmove` and assigns 1 or 0. A non-nemesis leaves the flag alone. `csym --callers`: `monmove.c:715`, before the frozen early-out. JS `dochug` already calls it there (`monmove.js:2388`), then `quest_talk` on the close and nearby paths (`:2396`, `:2629`). A null `quest_talk` argument returns before the switch. Named. C would dereference it.

The break is `qt_pager`. `QUEST_ROLE_TEXT` (`questpgr.js:571–584`) has no `nemesis_wantsit`, `nemesis_first`, `nemesis_next`, `nemesis_other`, or `discourage`. Those keys are per-role tables in `dat/quest.lua` (Archeologist block: `nemesis_first` at `:354`, `discourage` as a 10-string array at `:232–242`; the same keys repeat for the other roles). `qt_pager` (`questpgr.c:629–634`) calls `com_pager_core(urole.filecode, msgid, FALSE)`. That first call succeeds in C, so the `"common"` retry does not run.

JS `com_pager_core` (`questpgr.js:1028–1043`) always calls `nhl_nhlib_align_shuffle` (`dungeon.js:1078–1084`: `rn2(3)` then `rn2(2)`) and then looks up. A miss returns false. `qt_pager` then calls `com_pager_core('common', msgid, true)`, which shuffles again and misses again. `impossible` on that second miss is a named no-op (`void showerror`). Net: every speech arm burns two shuffles (four `rn2` calls) and shows nothing. C burns one shuffle and shows the line. `discourage` is an array, so C's hit path also draws `rn2(nelems)` inside `com_pager_core` (`questpgr.c` array arm; JS `:1059–1069`). That roll never happens. The string-form keys (`nemesis_other`, and the long-string `text` fields) have no extra `rn2` in C, but they still take the double-shuffle miss here.

`chat_with_nemesis` (`quest.c:393–400`) and `chat_with_guardian` (`:441–448`) are not callers of `nemesis_speaks`. The map leaves them out of `quest_chat`. That omit is real.

## Hallucinations / overclaim

The subject says the function delivers the quest text or a battle curse. The branch chooses the right msgid. `qt_pager` does not deliver it: the embedded tables do not contain those keys, and the miss path is silent. The "missing quest text still returns through the existing miss path" sentence describes that silence. It does not mention the second align shuffle or the `discourage` array `rn2`. The `in_battle` / `made_goal` / `rn2(5)` claims match the `quest.js` body. "Match C" is true of the `if` chain and false of the callee's data.

## Density

The whole `nemesis_speaks` body, the one C caller, and the `in_battle` writer. The text tables those calls need were left as a miss. That is a stubbed delivery on a live arm, not a named omit of a different function.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify nemesis_speaks --base 8b1fae943~1 --reach-all`.

```
verify nemesis_speaks: baseline 8b1fae943~1 (scoreboard at a2fe5c1c5) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke nemesis_speaks: no RNG-tagged reach; fixed smoke spread (12 run, 3.3s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. The gap is off the corpus: no session reaches a nemesis speech. Green and cohort were not re-run in this audit.

## Actionable C-wrongs

1. Embed the per-role `nemesis_wantsit`, `nemesis_first`, `nemesis_next`, `nemesis_other`, and `discourage` tables from `dat/quest.lua` so the first `com_pager_core(filecode, msgid)` hits. That shows the line, keeps a single `nhl_nhlib_align_shuffle`, and lets the existing array arm draw `rn2(nelems)` for `discourage`.

Verdict: **QUALITY-RISK**
