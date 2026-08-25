# Review 467 — 1e1d1864 — makemon.c m_initinv S_GNOME begin_burn (D-1506)

## Metadata
- Full / short hash: `1e1d186499e1e36b400e47a4765d3f599cae8094` / `1e1d1864`
- Parent: `cac06f86` (D-1505). This file audits **this SHA only** (third of nine `js/` commits since review **464**). Archive **Addressed:** D-1506 `1e1d1864`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-26 00:18:02 +0200
- D-id: **D-1506**
- Stats: 9 files, +99 / −34 — `js/makemon.js` +9 / −2. Band 150–350.
- Claims to close: Open `makemon.c` gnome candle `begin_burn` after `!mpickobj` (named from D-1492 / review **453**). Not `mktrap_victim`. `reviews/loop-2026-08-15/` has no unpaid gnome-candle Must-fix.
- JS / map: `makemon.js` `m_initinv` S_GNOME; callee `timeout.js` `begin_burn`. `c-js-map/data.md`.
- Prior reviews this SHA claims to close: **453** named gnome `begin_burn` after merge.

## Intent vs deliverable

Git subject promises: a gnome candle on an unlit tile begins burning after a non-merge `mpickobj` instead of staying dark.

Pinned C `makemon.c` `m_initinv` S_GNOME `:809–816`:

```
if (!rn2((In_mines(&u.uz) && gi.in_mklev) ? 20 : 60)) {
    otmp = mksobj(rn2(4) ? TALLOW_CANDLE : WAX_CANDLE, TRUE, FALSE);
    otmp->quan = 1;
    otmp->owt = weight(otmp);
    if (!mpickobj(mtmp, otmp) && !levl[mtmp->mx][mtmp->my].lit)
        begin_burn(otmp, FALSE);
}
```

`steal.c` `mpickobj` `:618–684` returns `add_to_minv` (1 iff merged/freed). Callee `timeout.c` `begin_burn` `:1712–1797`: age-0 early out; TALLOW/WAX `:1749–1759` `candle_light_range`; `start_timer` + `new_light_source` `LS_OBJECT`.

Old JS: same `rn2`/`mksobj` envelope, then bare `mpickobj` with a comment “begin_burn deferred (no RNG)”.

The diff **does** import live `begin_burn` and write that `if (!mpickobj && !lit)`. It **does not** port `mktrap_victim` floor-candle burn. Named. It **does not** change `mpickobj`’s missing shop/snuff/unknow arms (pre-existing subset; a fresh `mksobj` candle does not hit them).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `m_initinv` S_GNOME `if` | C `:814–815`, **LIVE this SHA** | envelope already D-0172 |
| `mpickobj` | C `:618–684`, **LIVE** | returns `add_to_minv` |
| `add_to_minv` | C, **LIVE** D-1492 | merge → 1 → skip burn |
| `begin_burn` | C `:1712–1797`, **LIVE** import | D-0978; TALLOW/WAX in switch |
| `mksobj` / `weight` | C, **LIVE** | candle age for timer |
| `candle_light_range` | C, **LIVE** | callee of begin_burn |
| `mktrap_victim` floor candle | C, **OMIT named** | map |

`node scripts/sym.mjs begin_burn mpickobj m_initinv add_to_minv mksobj`:

```
begin_burn       js/timeout.js:684   sync
mpickobj         js/makemon.js:1108   sync
m_initinv        NOT EXPORTED — 1 LOCAL js/makemon.js:1708
add_to_minv      js/mkobj.js:217   sync
mksobj           js/mkobj.js:1531   sync
```

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. `timeout.js` does not import `makemon.js`.

**New gameplay RNG at the caller:** none. The `rn2(20|60)` / `rn2(4)` tallow lottery already ran. `begin_burn` has no `rn2`. Public-unhit unless a public gnome candle lands unlit.

## C ↔ JS fidelity

Envelope (pre-existing, still true). `!rn2(mines&&in_mklev ? 20 : 60)`; `mksobj(rn2(4) ? TALLOW : WAX, true, false)`; quan 1; `weight`. **Match `:810–813`.**

`mpickobj` return. C `freed_otmp = add_to_minv; return freed_otmp` (`:680–684`). JS `return add_to_minv(mtmp, otmp)`. Merge is 1. `!mpickobj` means the pointer still lives. **Match the gnome arm.** C `mpickobj` also does unpaid/engulf snuff/`unknow_object` before `add_to_minv`. A brand-new candle is not unpaid, not `thrownobj`, and gnomes are not AT_ENGL. Those missing arms do not fire here.

Short-circuit. C `if (!mpickobj(mtmp, otmp) && !levl[mx][my].lit)`. JS `if (!mpickobj(...) && !game.level?.at?.(mx,my)?.lit)`. Merge-true skips `begin_burn` **and** skips the lit read. **Match.** Unlit 0/false → burn. Lit 1/true → skip. Optional `at?.` on a placed gnome is a JS seam: missing cell would treat `undefined` as unlit and burn. C always indexes `levl[mx][my]`. A gnome who finished `makemon` has a valid cell. Not Must-fix.

`begin_burn(otmp, false)`. C `FALSE`. JS `false`. **Match.** Callee: age-0 return; TALLOW/WAX turns 75/15/age; `start_timer`; `lamplit`; `new_light_source` `LS_OBJECT`. **LIVE, not a stub.** JS skips `update_inventory` and `impossible` on missing location (named/deferred in timeout). Minvent `get_obj_location` should yield `mx,my`. D-0978 debt, not this `if`.

Candle `oc_merge`: if a gnome already holds a matching stack, `add_to_minv` frees `otmp` and C would not `begin_burn` the freed object (nor light the kept stack from this call). JS same. Lighting the **kept** stack is not C. Named `oc_merge` on the map is about mergable candle fields, not this predicate.

Callee closure. LIVE: `mpickobj`, `add_to_minv`, `begin_burn`, `mksobj`. OMIT named: `mktrap_victim` floor burn. STUB: none. **Arm may ship.**

## Hallucinations / overclaim

Subject unlit non-merge candle begins burning: **true**. D-log “short-circuit skips a freed merge”: **true**. Stamping **Addressed:** D-1506 for **`:814–815`** is fair. Do **not** stamp “Match C `mktrap_victim` floor candle.” Do **not** stamp “Match C full `mpickobj` snuff/unknow.” Do **not** treat fortress PASS as a gnome on an unlit mines tile. Old comment “no RNG” was true of `begin_burn` itself and is not a reason to have skipped the call.

This is **not** “dispatch ported, callee stubbed.”

## Density

C is seven lines in an existing case. +9 JS. Playbook §2b “unless C is that small.” Did not glue `throws_rocks`. Acceptable.

## Branch-by-branch confirm

1. Mines+`in_mklev` `rn2(20)` else `rn2(60)`. **Match** (pre-existing).
2. `rn2(4)` tallow else wax. **Match.**
3. Merge `mpickobj` → skip burn. **Match.**
4. Non-merge + lit tile → skip burn. **Match.**
5. Non-merge + unlit → `begin_burn(otmp, false)`. **Match.**
6. Callee lights TALLOW/WAX + `LS_OBJECT`. **Match timeout.c.**
7. Floor-trap gnome candle still unnamed here. **Named omit.**
8. **Public-unhit** unless a public gnome candle is unlit.

## Callers / RNG ledger

C: `makemon` → `m_initinv` after place. JS same. No new dice. Lighting changes vision later, not this call’s RNG stream.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No fs. No FORCE.

## Verification

D-log: private canary **10**/10 (predicate, unlit lights + timer + LS_OBJECT, lit skip, merge skip, `makemon` gnome unlit mines, Rule #2). Green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** unless a public gnome candle is unlit. Cohort is shared-startup, not a gnome lamp.

## Actionable C-wrongs

None that belong on Must-fix. The cited `if` matches C and the callee is LIVE.

Remaining named (map / Open, already queued): `mktrap_victim` floor candle `begin_burn`; `throws_rocks` Sokoban first-try (next Open at this SHA); S_KOP / non-salamander S_LIZARD; candle `oc_merge` fields. Do not Must-fix “`mpickobj` should have ported engulf snuff in this SHA.” Do not Must-fix “`begin_burn` should `update_inventory` for a monster.” Do not Must-fix “`at?.` must be a raw `levl` index” for a placed gnome.

Verdict: **ACCEPT-WITH-DEBT**
