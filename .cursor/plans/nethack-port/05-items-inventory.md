# Satellite plan: Items, inventory, shops, traps, dungeon features

Parent: global plan **NetHack JS port roadmap** (Workstream H + overlaps with D/F).

## Status (as of 2026-05-23)

- **Stub / overlay:** [`js/ini_inv_stub.js`](../../js/ini_inv_stub.js) for `#inventory` / discoveries; no linked **`game.invent`** from real **`mkobj`** / **`ini_inv`** yet.
- **Partial:** Floor objects mklev-shaped; [`js/shop.js`](../../js/shop.js), [`js/trap.js`](../../js/trap.js), [`js/pickup.js`](../../js/pickup.js) — large TODO surface.

---

## Goals

- `struct obj` parity for pickup, merge, stack, naming, BUC, erosion, charges, timers.
- Shops, traps, and static features behave identically to C for RNG and player-visible text.

## Upstream C anchors (illustrative)

- `obj.c`, `invent.c`, `pickup.c`, `dothrow.c`, `read.c`, `wear.c`, `wield.c`, `eat.c`, `potion.c`, `scroll.c`, `zap.c`
- `shk.c`, `shknam.c`, `trap.c`, `music.c` (shops / harps where relevant)
- Price and ID logic as sessions exercise them

## Checklist

### Core object system

- [ ] Allocate / deallocate `obj` equivalents; `oxfree` chains
- [ ] Container contents (`obj->cobj`), nesting, weight
- [ ] Floor `obj` chains vs map cell linkage

### Inventory and commands

- [ ] `addinv`, `freeinv`, reordering, `#adjust`
- [ ] Pickup (`,`), drop (`d`), throw (`t`), quaff (`q`), read (`r`), wear (`W`/`T`), wield (`w`), remove (`T`/`R`/`P` per C)

### Shops

- [ ] Shop room detection, shopkeeper generation, price calculation
- [ ] Buying, selling, credit, stealing, anger, block exit

### Traps

- [ ] Trap generation and arm/disarm
- [ ] Stepping effects, air traps, magic traps — as sessions hit

### Dungeon features (non-shop)

- [ ] Altars (`pray.c` interaction later), fountains, sinks, graves
- [ ] Doors beyond mklev: locking, secret door search

### Cross-links

- [06-commands-ui.md](./06-commands-ui.md) — item command keystrokes
- [07-display-terminal.md](./07-display-terminal.md) — inventory menus, object descriptions

## Exit criteria

- Item-heavy sessions pass P RNG through loot and use; no duplicate or missing `rnd` from stack merge bugs.
