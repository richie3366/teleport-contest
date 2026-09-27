# Review 1937 — 4ce18a4e0 — ext_func_tab_from_func (D-2978)

- SHA: `4ce18a4e0` (Must-fix from review 1936; two `FUNCT_TXT` keys)
- Files: `js/cmd.js` (`+2/−0`)
- Queue row: review 1936 item 1, 0 corpus blocks cited
- Banned grep: the `js/` hunk is two map lines. No `FORCE`, `DIAG`, `getRngLog`, seed name, coordinate, or `fastforward`. `imports.mjs --rulecheck` on this tree: "Rule #2 clean: no bare/node specifiers or fs calls in js/."
- `sym.mjs` (keys the diff adds; nothing deleted or re-pointed):

```
doloot           js/pickup.js:4337   ASYNC — await required
dotip            js/pickup.js:5192   ASYNC — await required
ext_func_tab_from_func js/cmd.js:1850   sync
```

`FUNCT_TXT` is a module `Map`, not a function, so `sym.mjs` reports NOT FOUND. Both functions are the existing `pickup.js` import at `cmd.js:121`. No new edge, so no `--can`.

## Intent vs deliverable

Subject: `#loot` and `#tip` queued by function pointer stored empty `txt` and flags 0, because `FUNCT_TXT` had no key. C `cmd.c:1762` `"loot"` and `cmd.c:1905` `"tip"` are `AUTOCOMPLETE|CMD_M_PREFIX` (130). The map should return those rows.

The diff adds `[dotip, 'tip']` and `[doloot, 'loot']` and nothing else. The walk, `cmdq_add_ec`, and the generated table are unchanged.

## Inventory

| JS | Class | C |
|----|-------|---|
| `FUNCT_TXT` keys `doloot`, `dotip` | identity map, not a callee | `cmd.c:1762`, `:1905` |
| `ext_func_tab_from_func` | live sync, body not edited | `cmd.c:3015–3025` |
| `doloot` / `dotip` | imported `pickup.js` | those `ef_funct`s |
| `cmdq_add_ec` | live caller, not edited | `cmd.c:253–270` |

## C ↔ JS fidelity

No `rn2`. C walks `extcmdlist` while `ef_txt` is set and returns the first row whose `ef_funct` is `fn`, or NULL (`cmd.c:3020–3024`). Callers: `cmd.c:260` `cmdq_add_ec`, `cmd.c:3411` `dotypeinv` (`cmdbind_add`), `hack.c:1105` (autounlock kick compare), `extern.h:419` prototype.

JS (`cmd.js:1850–1856`) maps the function through `FUNCT_TXT` to a txt, then returns the first `EXTCMDLIST` row with that txt. A string argument looks up txt directly; C takes only a function pointer. That string arm is pre-existing and unused by `cmdq_add_ec`.

`"loot"` is one row: `doloot`, `AUTOCOMPLETE | CMD_M_PREFIX` (`cmd.c:1762–1763`). `"tip"` is one row: `dotip`, the same flags (`cmd.c:1905–1906`). Generated rows match: `extcmdlist_data.js` loot flags 130 (key 236) and tip flags 130 (key 212). `const.js` has `AUTOCOMPLETE = 0x0002` and `CMD_M_PREFIX = 0x0080`. No earlier row shares either txt, so the first-txt hit is the C first-pointer hit.

`cmdq_add_ec` (`cmd.js:432–439`) still prefers the lookup over a caller tab and stores `txt`, `flags`, and `ec_entry`. Live queues pass the same bindings the map keys:

- `act_on_act_here` `MCMD_LOOT` / `MCMD_TIP` (`cmd.js:2417–2418`)
- `IA_TIP_CONTAINER` dynamic-imports `dotip` from `pickup.js` and queues it with no tab (`iactions.js:209–212`)

Those nodes now carry txt `"loot"` / `"tip"` and flags 130. `rhack` can see `CMD_M_PREFIX`.

`hack.c:1104–1111` still does not compare `ec_entry` to `ext_func_tab_from_func(dokick)`. `js/hack.js:483–486` sets `door_opened = !closed_door` and the D-log names that. `cmd.c:4727` `doidtrap` stays the dynamic import, not a map key. Unported `ef_funct`s still miss and return null. None of those are this diff.

## Hallucinations / overclaim

The subject describes the two keys this diff adds. It does not say the whole `extcmdlist` is keyed. "No arm of `ext_func_tab_from_func` is omitted" matches the 9-line walk. The ledger flip from `partial` (D-2977) to `ported` matches the hole review 1936 named. The `hack.c` compare and unported commands stay in the Named sentence, not inside the walk.

## Density

Two lines close the one Must-fix family. The walk was already the C loop. Below the 200-line breadth target because this iteration is the queued C-wrong, not a new coverage row.

## Verification

```
verify ext_func_tab_from_func: baseline 4ce18a4e0~1 (scoreboard at 8d2439c0f, 2026-09-27T16:04:15.595Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify ext_func_tab_from_func: no corpus session is blocked on it at 4ce18a4e0~1 — a vacuous verify is NOT a corpus PASS. ...
smoke ext_func_tab_from_func: no RNG-tagged reach; fixed smoke spread (12 run, 3.6s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the vacuous note is the one the prompt allows. D-2978 records green 2/2, strict ×2, cohort 7/7, skip full. This re-run shows no `REGRESSED` session.

## Actionable C-wrongs

None. The review-1936 loot/tip hole is the two keys above.

Verdict: **ACCEPT**
