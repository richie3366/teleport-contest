# Review 457 — 08854746 — polyself.c body_part / mbodypart callers (D-1496)

## Metadata
- Full / short hash: `08854746816e25b4f2446aeac8cb4ef9880d34de` / `08854746`
- Parent: `4722df06` (D-1495). This file audits **this SHA only** (third of ten `js/` commits since review **454**). Archive **Addressed:** D-1496 `08854746` (filled in a later port if missing — check archive).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 21:27:40 +0200
- D-id: **D-1496**
- Stats: 32 files, +7078 / −206 — `js/` **+30 / −94** across 11 files. **No** `js/polyself.js` hunk. Rest is map reflow, new `scripts/sym.mjs`, loop prompts, and **banned** playbook/runbook/loop-script edits.
- Claims to close: Open-style clone deletion of exact-name `body_part` / trap `mbodypart` / zap `body_part_zap`. Not `body_part_head` / `body_part_hand`. `reviews/loop-2026-08-15/` has no unpaid body_part Must-fix.
- JS / map: callers + `objnam.js` `body_part_latebound`. `c-js-map/turns.md` / `data.md` (huge reflow, not a new C body).
- Prior reviews this SHA claims to close: none unpaid; zap comments had named “poly body_part” after D-1466 / D-1456.

## Intent vs deliverable

Git subject promises two things: (1) exact-name clones, trap `mbodypart`, and zap use live poly tables instead of humanoid stand-ins; (2) raise unattended density cap to 600/10 with a recursive symbol index.

Pinned C `polyself.c` `mbodypart` `:1972–2140` (tables + specials) and `body_part` `:2143–2146` = `mbodypart(&gy.youmonst, part)`. Callers pass `mbodypart(mon, part)` for a **monster** (steed FOOT, rust-trap ARM). `const.js` `ARM=0` … `TOE=13` matches C `mondata.h` part enum.

Old JS: nine local `body_part` returning `'foot'`/`'leg'`/`'head'`/`'body'`; trap `mbodypart(_mon, part)` **ignored `mon`** and called hero `body_part`; zap `body_part_zap` HEAD/FACE/FOOT only. Live tables already existed in `polyself.js` (not this diff).

The `js/` diff **does** delete those clones, import `body_part` (and trap `mbodypart`), append zap’s existing polyself import, and add `body_part_latebound` for wield. It **does not** edit `mbodypart`’s tables. It **does not** replace `mcastu.js` `body_part_head` or `pickup.js` `body_part_hand`. Named. It **does** edit `docs/GROK-PLAYBOOK.md`, `PORTING-RUNBOOK.md`, `AGENT-PORT-LOOP.md`, and `scripts/agent-port-loop.*` — Constitution / playbook **hard ban** for loop agents. D-log says “not a loop iter.” This review still records it: do not treat D-1496 as license to retouch those files.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `body_part` | C `:2143–2146`, **LIVE** `polyself.js:352` | already; this SHA imports it |
| `mbodypart` | C `:1972–2140`, **LIVE** `polyself.js:278` | trap now imports; tables not this hunk |
| `body_part_zap` | JS stand-in, **deleted** | zap uses LIVE `body_part` |
| local `body_part` ×9 | clones, **deleted** | detect/dokick/mhitu/pray/priest/sit/timeout/trap/wield |
| trap `mbodypart(_mon,…)` | clone, **deleted** | was hero-coupled |
| `body_part_latebound` | JS seam, **not C** | wield / doname; `set_body_part` at polyself load |
| `body_part_head` | **CLONE** `mcastu.js:172` | fungus/jelly HEAD only; named |
| `body_part_hand` | **CLONE** `pickup.js:1688` | always `'hand'`; named |
| `set_body_part` | JS bind, **not C** | cycle break |

`node scripts/sym.mjs` (deleted clones + re-points):

```
body_part        js/polyself.js:352   sync
mbodypart        js/polyself.js:278   sync
body_part_zap    NOT FOUND in js/**
body_part_latebound js/objnam.js:1634   sync
body_part_head   NOT EXPORTED — 1 LOCAL js/mcastu.js:172
body_part_hand   NOT EXPORTED — 1 LOCAL js/pickup.js:1688
set_body_part    js/objnam.js:1625   sync
```

Exactly one `body_part`. Do not write clone #2. No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` in scored `js/` / `fastforward` / seed gates / recorded coordinates. Rule #2 clean. **No new gameplay RNG.**

## C ↔ JS fidelity

Caller rewiring (this SHA). C `body_part(part)` is always the hero. JS imports now hit `mbodypart(game.youmonst || {}, part)`. C `youmonst` always has `data`; JS `{}` fallback returns `HUMANOID_PARTS[part] || 'body part'` (`mbodypart` null-data arm, pre-existing). After module init, `youmonst` is normally present. **Match the C wrapper** when `youmonst.data` is set.

Trap `mbodypart`. C bear-trap steed uses the **steed’s** FOOT (`horse_parts` / paw), not the hero’s. Old JS `mbodypart(_mon, part) { return body_part(part); }` printed the hero noun for a horse. New JS `mbodypart(u.usteed, FOOT)` / `mbodypart(mtmp, HEAD|ARM)` uses the live tables. **This SHA matches C** at those four trap call sites. Hero `body_part(FOOT|LEG|HEAD|ARM)` in the same file now also follows poly, not a four-word stand-in.

Zap. C `zap_updown` rock/blood uses `body_part(HEAD|FACE|FOOT)`. JS deleted `body_part_zap` and calls imported `body_part`. Zap already imported `rehumanize`/`polymon` from polyself; the cycle comment was **stale**. **Match.** A poly’d bird FACE is `"face"` in both tables; a sphere FACE is `"body"` — now live, not `'face'`.

Wield. C `body_part(HAND)` for tingle/twitch. JS cannot import polyself (polyself→wield). `body_part_latebound` after `set_body_part(body_part)` at polyself load is the same function. Unset fallback `'hand'` / `'body part'` is the null-data humanoid arm, not a seed string. **Match at runtime** once polyself has loaded (always has, before `chwepon`).

Tables (pre-existing, used now). Branch order in `js/polyself.js:278–348` follows C `:2062–2139`: dog/feline/rodent/owlbear paws; yeti humanoid; claw overload + `NOT_CLAWS`; mumak trunk; shark hair; jellyfish tentacle; floating-eye cornea; humanoid ARM/HAND; cockatrice; raven; centaur/unicorn/ki-rin/rothe; light rays; stalker HEAD; eel/worm/spider; slithy/dragon hair; eye/jelly/vortex/fungus; else humanoid else animal. `mlet` in this port is `'S_DOG'` strings (`generated/monsters_data.js` `mlets`), matching the JS tests (not C’s char `S_DOG`). `ARM=0` aligns arrays. Local `attacktype` / imported `humanoid` / local `slithy`. **Not this hunk;** no evidence this SHA regressed it.

Named leftovers. `body_part_head`: fungus `"cap area"`, jelly/blob/pudding `"cerebral area"`, else `"head"`. C sphere HEAD is `"body"`; mcastu psi-bolt would still say `"head"`. `body_part_hand`: always `"hand"` (pickup `u_handsy`); C `body_part(HAND)` can be `"paw"`/`"claw"`/`"forehoof"`. Named, not deleted.

Callee closure. There is no switch arm. Imports are LIVE. Clones deleted, not replaced with stubs. `body_part_latebound` is a verified seam, not a humanoid stand-in once bound.

## Hallucinations / overclaim

Subject “clones, trap mbodypart, and zap use the live poly tables”: **true**. Subject “raise density cap to 600/10”: **true of the banned docs/scripts**, **not** of `js/`. D-log “docs claimed a zap↔polyself cycle; `zap.js` already imported polyself”: **true**. Stamping **Addressed:** D-1496 for **caller rewiring** is fair. Do **not** stamp “Match C `mbodypart` tables in this SHA” (tables were already there). Do **not** stamp “Match C `body_part_head`.” Do **not** stamp “loop agents may edit GROK-PLAYBOOK.” Do **not** treat fortress PASS as a poly’d `"rear hoof"` string. Full `sessions` 44/44 does not prove horse FOOT.

This is **not** “dispatch ported, callee stubbed.” The callee was already LIVE; the clones were the lie.

## Density

JS is one C function’s **callers** (~30 insertions, net deletion). Tables already shipped. Playbook §2b “C is that small” for **new** JS is fair. The same SHA also reflowed thousands of map lines and edited architecture docs. That is an unrelated packet, **banned**, and too big on the docs side. Next port: do not glue `check-hot-docs` / playbook work onto a C peel.

## Branch-by-branch confirm

1. Hero humanoid `body_part(FOOT)` → `"foot"`. **Match** (was already the stand-in; still true via tables).
2. Hero horse poly `body_part(FOOT)` → `"rear hoof"`. Old clones said `"foot"`. **This SHA’s hero-path fix.**
3. Steed horse, bear trap: `mbodypart(steed, FOOT)` → `"rear hoof"`. Old JS used hero noun. **Match C trap.c.**
4. Rust-trap monster `mbodypart(mtmp, ARM)`. **Uses `mon->data`. Match.**
5. Zap down rock: `body_part(HEAD)` live. **Match `zap.c`.**
6. Zap blood FACE/FOOT. **Match.** `body_part_zap` gone (`sym` NOT FOUND).
7. Wield HAND tingle after init: latebound → live `body_part`. **Match.**
8. Pickup `body_part_hand()` still `"hand"`. **Named omit.**
9. mcastu `body_part_head()` sphere still `"head"` not `"body"`. **Named omit.**
10. **Public-unhit** for non-humanoid nouns. Cohort is “did not break strings on humanoid hero.”

## Callers / RNG ledger

C `body_part` / `mbodypart` are string tables, no dice. JS same. Public traces stay `"foot"`/`"hand"` for a human Tourist.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No fs. No FORCE. Latebound is cycle avoidance, not a glyph stand-in. `'hand'` fallback is C’s humanoid HAND, not a seed.

## Verification

D-log: `node --check` on touched JS; green+strict seed8000/0900; full `sessions` **44**/44. `sym.mjs`: one `body_part`. No private canary of horse FOOT / steed mbodypart / sphere HEAD. **Public-unhit** for the poly nouns. Green+full suite is relevant as a **regression** check (string churn in trap/zap/wield), not as proof of horse tables.

## Actionable C-wrongs

None that belong on Must-fix. The cited clones are gone; trap `mbodypart` uses `mon`. Remaining named (map / Open, already queued as `body_part_head` / `body_part_hand`): replace those two aliases with `body_part`/`mbodypart` (watch mcastu/pickup import cycles). Do not Must-fix “re-port `mbodypart` tables in this SHA.” Do not Must-fix “revert GROK-PLAYBOOK” in a port iter (architecture files stay frozen). Do not Must-fix “wield should import polyself.”

Verdict: **ACCEPT-WITH-DEBT**
