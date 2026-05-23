# Satellite plan: Monsters and combat

Parent: global plan **NetHack JS port roadmap** (Workstream G).

## Status (as of 2026-05-23)

- **Partial:** [`js/makemon.js`](../../js/makemon.js) + [`js/makemon_rndmonst.js`](../../js/makemon_rndmonst.js) / [`js/walkable.js`](../../js/walkable.js) **`goodpos`** slices; land-eel / `rndmonst_adj` still has documented guards (`skipLandEelRn2`) until full geno/`mons[]` parity.
- **Partial:** [`js/monmove.js`](../../js/monmove.js) / [`js/m_move_mon.js`](../../js/m_move_mon.js) — real **`distfleeck`** / **`m_move`** for canary path; **`stepNum`** sequencing must shrink as **`dochug`** order matches C.
- **Stub:** [`js/attack.js`](../../js/attack.js) bump damage — no real **`uhitm`** pipeline yet.

---

## Goals

- Correct **creation**, **placement**, **movement**, **attacks**, **damage**, **death**, and **corpse** RNG relative to `mon.c`, `mhitu.c`, `mhitm.c`, `dog.c`, etc.
- `do_monsters` scheduling order matches C for end-of-turn and during-move triggers.

## Module strategy

- Prefer new files aligned with upstream boundaries, e.g. `js/mon.js`, `js/dog.js`, `js/mhitu.js` (names illustrative — match your architecture).
- Avoid dumping thousands of lines into [js/mklev.js](../../js/mklev.js) or [js/cmd.js](../../js/cmd.js); Phase 2 diff favors clear modules ([docs/PHASES.md](../../docs/PHASES.md)).

## Checklist

### Data structures

- [ ] `struct monst` fields needed for movement, attack, inventory, `mtrait`, timed intrinsics
- [ ] Monster class / symbol / difficulty tables vs [js/const.js](../../js/const.js) and upstream `monst.c`, `permonst.c`

### Lifecycle

- [ ] `makemon`, `rloc`, `enexto`, `goodpos` parity
- [ ] Monster generation on level load and over time (`mrespawn`, `timeout`, …) as sessions need

### AI and movement

- [ ] Hostile movement: `dochug`, `m_move`, maze vs room rules
- [ ] Pet / tame AI: `dog.c` / `dogmove.c` slices
- [ ] Conflict resolution when two monsters want the same square

### Combat

- [ ] `attack`, `hit`, `damage`, `passive`, `longworms`, ranged attacks
- [ ] Armor class, enchantment, two-weapon, bare-handed — only as needed for failing sessions

### Death and drops

- [ ] Corpse generation (`mondied`, `corpse_chance`)
- [ ] Tinning, globs, extinction counters

### Integration

- [ ] Wire [js/cmd.js](../../js/cmd.js) bump-attack into shared combat path
- [ ] Replace `fastforward_step` monster-related RNG with real `do_monsters` pipeline ([02-init-chargen.md](./02-init-chargen.md))

## Exit criteria

- Sessions that fight or spawn monsters pass P RNG through combat-heavy segments; screens match after [07-display-terminal.md](./07-display-terminal.md) work.
