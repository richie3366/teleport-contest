# Review 623 — 101d9d0b — questpgr.c qt_pager common fallback (D-1662)

## Metadata
- Full / short hash: `101d9d0b8540fd6960e65ca4e21d0b34c5b7bb0a` / `101d9d0b`
- Parent: `536904b4` (D-1661). This file audits **this SHA only** (sixth of nine `js/` commits since review **617**). Archive **Addressed:** D-1662 `101d9d0b`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 15:40:04 +0200
- D-id: **D-1662**
- Stats: `js/questpgr.js` +13/−9, `js/quest.js` +1/−1, `js/options.js` +1/−1 (comment). `js/` **15** insertions. Band **150–350**. C `qt_pager` is 6 lines — under-40 is allowed.
- Claims to close: Open qt_pager common fallback after D-1649. Not convert_arg. Not com_pager_core synopsis.
- JS / map: `questpgr.js` `qt_pager` / `com_pager_core`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **610** named qt_pager common. `reviews/loop-2026-08-15/` has no unpaid qt_pager Must-fix.

## Intent vs deliverable

Git subject promises: a missing role table retries `com_pager_core("common")` with a second `nhl_init`, instead of returning after the filecode call after D-1649.

Pinned C `qt_pager` `:629–634` (`node scripts/csym.mjs qt_pager`). `--callers qt_pager`: 31 `quest.c` sites (`firsttime`/`locate_*`/`goal_*`/`leader_*`/…). Callee `com_pager_core` `:467–621`; `nhl_init` `:487` every entry. `showerror` TRUE on the common retry (`:633`).

```629:634:nethack-c/upstream/src/questpgr.c
void
qt_pager(const char *msgid)
{
    if (!com_pager_core(gu.urole.filecode, msgid, FALSE, (char **) 0))
        (void) com_pager_core("common", msgid, TRUE, (char **) 0);
}
```

Old JS: one `com_pager_core(filecode, msgid, false)` and stop. The diff **does** `if (!await core(filecode, false)) await core('common', true)`. It **does not** port `showerror` `impossible`, lua VM, array `rn2`, `pauper_legacy`, `killed_nemesis` rawtext. Named. `options.js` drops `seed0007` from a comment (not control flow).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `qt_pager` | C `:629–634`, **LIVE this SHA** | **ASYNC** |
| `com_pager_core` | C `:467–621`, **LIVE** (D-1622) | local; second call = second shuffle |
| `nhl_nhlib_align_shuffle` | C `nhl_init` side, **LIVE** | dungeon.js; once per core |
| `skip_pager` | C, **CLONE** local | do **not** add #2 |
| `QUEST_COMMON` | C `quest.lua` common, **CLONE** | `quest_portal*` |
| `showerror` `impossible` | C `:489–538`, **OMIT named** | `void showerror` |
| array `rn2` / pauper / rawtext | **OMIT named** | |

`node scripts/csym.mjs qt_pager` → `:629-634`. `com_pager_core` → `:467-621`. `--callers qt_pager`: `quest.c:29` firsttime through `:447` guardtalk.

RNG: `nhl_nhlib_align_shuffle` per `com_pager_core` (C `nhl_init` loads nhlib which shuffles). Role miss → **two** shuffles. **Match C call count.** No seed gate. No extra `rn2` in `qt_pager` itself.

`node scripts/sym.mjs` on new / re-pointed names:

```
qt_pager         js/questpgr.js:857   ASYNC — await required
com_pager_core   NOT EXPORTED — 1 LOCAL js/questpgr.js:801
             => Do NOT write clone #2.
nhl_nhlib_align_shuffle js/dungeon.js:730   sync
skip_pager       NOT EXPORTED — 1 LOCAL js/questpgr.js:717
             => Do NOT write clone #2.
```

`--can questpgr.js dungeon.js nhl_nhlib_align_shuffle` not required (edge pre-existed). Do **not** add `com_pager_core` #2. Do **not** add `skip_pager` #2.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` in the **new** hunks. The diff **deletes** a `seed0007` comment in `options.js` (D-log recovery). `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

C: role `com_pager_core(..., FALSE)` ; if FALSE, common `..., TRUE`. Each core `nhl_init` (`:487`) then `lua_getfield(section)`. JS: `nhl_nhlib_align_shuffle` at the top of every core (`:805`), then `lookup_quest_entry(section, msgid)`. Miss → `return false` (`:809–813`). `qt_pager` then awaits common with `showerror=true`. **Match `:629–634` call order and the second shuffle.** `skip_pager` on the first call also returns false and would retry common; C does the same. Second core also skip_pager. Harmless.

`com_pager_core` miss vs hit. C `:500–528` looks up `questtext[section][msgid]`; not a table → return FALSE (role) or `impossible` when `showerror` (common). JS `lookup_quest_entry` returns undefined → `false` without `impossible`. Role miss is what this SHA exists to retry. Common miss still silent. **Named `showerror`.** `QUEST_COMMON` holds `quest_portal`, `quest_portal_blocked`, `quest_portal_offlevel` — the three C `dat/quest.lua` common keys tourist/other roles share. A msgid only in a role file never reaches common. **Match C:** common is not a dump of every role line.

`qt_pager` callers. C `quest.c` `firsttime` / `locate_*` / `goal_*` / `leader_*` / `nemesis` / `guardtalk` (`--callers` 31). JS `quest.js` already awaited `qt_pager`. This SHA does not add callers. Tourist `firsttime` hits the role table (no second shuffle on that msgid). A role without `quest_portal` still burns two shuffles and delivers common. Cohort quest sessions can hit that; seed8000 Tourist firsttime does not.

`showerror`. C `impossible(...)` when the common section/msgid is not a lua table (`:530–538`). JS `void showerror` still. **Named omit, not a stub that pretends to deliver text.** `QUEST_COMMON.quest_portal*` can satisfy a common msgid the role table lacks. D-log canary `quest_portal` via common. **Match that delivery path** for those three keys only.

Callee closure (`qt_pager` arm). LIVE: `com_pager_core`, `nhl_nhlib_align_shuffle`, `lookup_quest_entry`. CLONE: `skip_pager`; `QUEST_COMMON` for portal lines. OMIT named: `impossible`; lua; array rn2; pauper; rawtext nemesis. STUB: **none** in the retry arm (`return false` is C’s miss). Combined-arm ships. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject role miss → common + second nhl_init: **true.** D-log `QUEST_COMMON` portal: **true for those msgids.** Do **not** stamp “Match C `impossible` on common miss.” Do **not** stamp “Match C lua `questtext`.” Do **not** stamp “Match C `killed_nemesis` rawtext.” Do **not** re-port `convert_arg` (D-1649) or `com_pager_core` synopsis (D-1622). Tourist `firsttime` is **role-hit** (filecode hit, no retry). Other-role miss → common is **public-unhit** except quest-cohort roles that lack a msgid.

## Density

+15: C `qt_pager` is 6 lines. §2b one caller. Did not glue array rn2. C is that small.

## Verification

Wired: second core on false; shuffle twice; `'common'` section; `showerror` still unused. Unwired C: impossible; lua fallbacks; rawtext. Conf: shuffle count as C. No seed gate.

`com_pager_core` `inprogress` / convert_line / `%p` remain D-1622/D-1649. This SHA only adds the FALSE→common TRUE retry. `quest.js` comment tweak is not a second Open. `options.js` dropping `seed0007` from a comment is Rule #2 hygiene, not a BIND= change.

C fourth argument `(char **) 0` is output-lines unused by `qt_pager`. JS has no out-param. **Match the void caller.** `showerror` TRUE on common is the only boolean that differs between the two calls.

`lookup_quest_entry(section, msgid)` is the JS stand-in for `lua_getfield` twice. Role section is `urole.filecode`; common section is the string `'common'`. A hit returns the cloned line(s); a miss returns undefined → `false`. **Match C’s boolean.**

`qt_pager` itself has no `rn2`. The only RNG this SHA changes is the extra `nhl_nhlib_align_shuffle` when the role table misses. Do not treat two shuffles as a seed-shaped gate.

D-log private canary (two shuffles; missing common silent; `quest_portal` via common); green+strict seed8000/0900; cohort **7**/7 + quest **4**/4 + strict. **Public-unhit** for a role-miss that only exists in common. Fortress Tourist firsttime does not prove `:633`.

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): `showerror` `impossible`; lua VM / `msg_fallbacks`; array `rn2` (`angel_cuss`/`demon_cuss`); `pauper_legacy`; `killed_nemesis` rawtext / `stinky_nemesis`; other-role bodies. Do **not** add `com_pager_core` #2. Do **not** re-port `convert_arg` (D-1649). Do **not** re-port synopsis (D-1622). Do **not** put seed names back into `js/` comments.

Do **not** add `skip_pager` #2.

Verdict: **ACCEPT-WITH-DEBT**
