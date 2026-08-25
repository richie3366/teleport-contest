# Review 450 — 83fa138f — zap.c zap_map lateral drawbridge / bhit (D-1489)

## Metadata
- Full / short hash: `83fa138f3d658e71374b8d1f79ca97b3e963a547` / `83fa138f`
- Parent: `00d5d4d6` (D-1488). This file audits **this SHA only** (fifth of nine `js/` commits since review **445**). Archive **Addressed:** D-1489 `83fa138f` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 17:48:14 +0200
- D-id: **D-1489**
- Stats: 10 files, +150 / −36 — `js/zap.js` +76 / −14.
- Claims to close: Open `zap.c` `zap_map` lateral drawbridge / bhit (named from D-1476 / reviews **437** / **446**). Not engraving. `reviews/loop-2026-08-15/` has no unpaid drawbridge Must-fix.
- JS / map: `zap.js` `zap_map` / `bhit`; callees `dbridge.js` already live (D-0959). `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **437** named lateral after down engraving; **446** kept it named after `zap_updown` default `break`.

## Intent vs deliverable

Git subject promises: a lateral IMMEDIATE wand opens, closes, or destroys a drawbridge instead of skipping the span and portcullis.

Pinned C `zap_map` `:3685–3717` (`!u.dz`): snapshot `ltyp`; `find_drawbridge(&dbx,&dby)`; OPENING/KNOCK only if `is_db_wall` then maybe `learn_it` + `open_drawbridge`; LOCKING/WIZARD_LOCK learn iff cansee and remapped cell is `DRAWBRIDGE_DOWN`, then always `close_drawbridge`; STRIKING/FORCE if `ltyp != DRAWBRIDGE_UP` learn + `destroy_drawbridge`. Caller `bhit` `:3919–3924`: every `ZAPPED_WAND` cell, `zap_map` then `typ = levl[x][y].typ`, **before** `m_at`. Up/down drawbridge stays `zap_updown` (D-1454/D-1456/D-1465).

Old JS: empty `else if (!u.dz)`; `bhit` never called `zap_map`.

The diff **does** port that switch and the `bhit` call. It **does not** add `force_decor`, Rogue `draft_message`, or Invocation_lev `the`. Named. It **does not** add muse `mbhit` `destroy_drawbridge`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `zap_map` `!u.dz` switch | C `:3685–3717`, **wired this SHA** | |
| `bhit` `ZAPPED_WAND` `zap_map` | C `:3919–3924`, **wired this SHA** | before `m_at`; refresh `typ` |
| `find_drawbridge` | C `dbridge.c` `:180–204`, **imported live** | mutates `{x,y}` |
| `is_db_wall` | C, **imported live** | |
| `open_drawbridge` / `close_drawbridge` / `destroy_drawbridge` | C, **imported live** | not stubs |
| `maybe_explode_trap` / down engraving | C `:3641–3683`, **unchanged** (D-1476) | still first |
| WAN_PROBING tail | C `:3720+`, **unchanged** (D-1444) | after lateral |
| `force_decor` / `draft_message` / VS `the` | C probing, **named omit** | |
| `mbhit` destroy body | C `muse.c`, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates in the new arms (`SPE_FORCE_BOLT` is the C spell). Rule #2 clean. **New gameplay RNG in this SHA:** none in the switch. Callees may roll (destroy). Public fortress does not zap a drawbridge laterally.

## C ↔ JS fidelity

`ltyp` is the zap cell **before** `find_drawbridge` remaps `dbxy`. STRIKING uses that `ltyp != DRAWBRIDGE_UP` so the empty moat in front of a raised bridge is skipped; portcullis / lowered span destroy. Match `:3707–3714`. Hallucination check: “Match C `destroy_drawbridge`” while **D-0959 already ported the callee** is **not** a dispatch-stub lie.

OPENING: `is_db_wall(x,y)` (portcullis), not the span. Learn if `cansee(db)` or `cansee(zap)`. Then `open_drawbridge`. Span OPENING no-op. Match `:3690–3698`.

LOCKING: learn only if cansee and `levl[dbx][dby].typ == DRAWBRIDGE_DOWN` **before** close (JS reads `at(dbxy)`). Then **always** `close_drawbridge` (raised already: no-op inside callee). Match `:3699–3706`.

Default otyp (POLY/cancel/tele): find may succeed; switch default. Cancel trap already ran. Match.

`bhit`: `weapon === ZAPPED_WAND` then `zap_map` then `typ = loc?.typ`. C re-reads `levl[x][y].typ`. JS uses the same cell object `loc` from before the call; `destroy_drawbridge` mutates that cell’s `typ`. Thrown/kicked skip. Match `:3919–3924`. Order vs `m_at` matches, so a just-opened portcullis can reveal a monster on the span.

`u.dz` set (up/down): skip this arm; `zap_updown` still owns those otyps. Match `:3685`. Probing still runs after lateral. Match `:3720`.

## Hallucinations / overclaim

Subject says a lateral IMMEDIATE wand opens/closes/destroys a drawbridge instead of skipping span and portcullis. **True** for OPENING on `is_db_wall`, LOCKING close, STRIKING when `ltyp != DRAWBRIDGE_UP`, via `weffects` → `bhit`. **False until named** for `force_decor`, Rogue draft, `mbhit` destroy. Stamping **Addressed:** D-1489 for `:3685–3717` + `:3919–3924` is fair. Do **not** stamp “Match C probing `force_decor`.” Do **not** treat fortress PASS as a castle zap.

## Density

One `zap_map` arm plus the one C caller that feeds it (`bhit` ZAPPED_WAND). ~70 JS lines. Playbook §2b. Did not glue `force_decor`. Acceptable.

## Branch-by-branch confirm

1. Lateral OPENING at portcullis: open + learn if seen. **Match `:3692–3697`.**
2. Lateral OPENING at `DRAWBRIDGE_UP` span: no `is_db_wall`, skip open. **Match.**
3. Lateral LOCKING at lowered span: learn + close. **Match `:3701–3705`.**
4. Lateral LOCKING at raised: close no-op, no learn. **Match.**
5. Lateral STRIKING at lowered / portcullis: destroy + learn. **Match `:3711–3714`.**
6. Lateral STRIKING at `DRAWBRIDGE_UP` (moat): skip. **Match.**
7. Lateral POLY: default. **Match.**
8. `u.dz != 0`: skip arm. **Match `:3685`.**
9. `weffects` lateral OPENING/LOCKING/STRIKING via `bhit`. **Match `:3448` / `:3919`.**
10. Thrown weapon: no `zap_map`. **Match.**
11. Down cancel engraving still D-1476. Unchanged.
12. Probing after lateral. Unchanged.
13. **Public-unhit.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed gates. Plain ESM. No hardcoded drawbridge coordinates.

## Verification

Journal: private canary **25**/25 (C/JS grep; portcullis OPENING/KNOCK open; UP span skip OPENING; DOWN LOCKING close; UP LOCKING no-op; DOWN STRIKING/FORCE destroy; UP STRIKING skip; portcullis STRIKING destroy; `u.dz` skip; POLY default; weffects via `bhit`; thrown skip; D-1476 down cancel; probing after lateral; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** This audit cadence: full `sessions` at HEAD after all nine SHAs.

## Actionable C-wrongs

None in the lateral switch or `bhit` call order.

Named omits (map / Open, not Must-fix):

1. `force_decor` ice/furniture; Rogue `draft_message`; Invocation_lev VS `the`
2. muse `mbhit` `destroy_drawbridge` body

Do not Must-fix “`destroy_drawbridge` is a stub” (D-0959). Do not Must-fix “up/down drawbridge should have moved into `zap_map`” (`zap_updown` owns it). Do not Must-fix “lateral should have shipped in D-1476.”

## Callers / RNG ledger

C callers: `zap_updown` down (dz>0 skips this arm) and `bhit` ZAPPED_WAND. JS both wired. New dice: none in the hunk. Public fortress does not hit a drawbridge zap.

Verdict: **ACCEPT-WITH-DEBT**
