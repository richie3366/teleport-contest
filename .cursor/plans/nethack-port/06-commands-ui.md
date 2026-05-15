# Satellite plan: Commands and UI (menus, `#`, extended)

Parent: global plan **NetHack JS port roadmap** (Workstream F).

## Goals

- Every **keystroke** in recorded `moves` dispatches to the correct C-equivalent handler and consumes RNG in order.
- Menus, prompts, and `--More--` behave like C (coordinate with [07-display-terminal.md](./07-display-terminal.md)).

## Current repo anchor

- [js/cmd.js](../../js/cmd.js) — `rhack`; movement only today
- [js/input.js](../../js/input.js) — `nhgetch`, queue from harness

## Checklist

### Taxonomy

- [ ] Spreadsheet: key → C function (`rhack`, `parse`, `doextlist`, …)
- [ ] Extended commands (`#`), meta (`S` save, `O` options), `^Z` if applicable

### Movement family

- [ ] Run, `g` travel, `G`, controlled teleport, fight (`F`), `m` move without fight
- [ ] Displace into pets, boulders

### Item and dungeon interaction

- [ ] Full alphabet of item commands from [05-items-inventory.md](./05-items-inventory.md)
- [ ] Search (`s`), kick (`^D`), zap (`z`), apply (`a`), dip (`#dip`)

### Count and repeat

- [ ] `0`–`9` repeat prefixes where C uses them
- [ ] `n.` repeat last command if sessions record it

### Meta / special

- [ ] `#quit`, `#version`, `#` inventory variants
- [ ] Sandbox: no real shell; match C refusal or stub per API

## Exit criteria

- No `Unknown command` for keys present in target session traces.
- Command dispatch order matches C before RNG-heavy effects run.
