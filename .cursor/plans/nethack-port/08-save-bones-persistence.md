# Satellite plan: Save, restore, bones, and `storage` VFS

Parent: global plan **NetHack JS port roadmap** (Workstream K).

## Goals

- Multi-segment sessions: state in `input.storage` survives across `runSegment` calls per [docs/API.md](../../docs/API.md).
- Bones files, save games, and topten behave like C for path names and visibility **as observed through continued play** (binary on-disk layout can differ if judge only cares about P/S after restore).

## Frozen contract

- [js/storage.js](../../js/storage.js) — **do not edit**; implement game-side serializers only.

## Checklist

### API usage

- [ ] All persistent paths go through `game`’s storage handle from `NethackGame` / `runSegment`
- [ ] Keys compatible with judge sandbox (no escape from allowed prefixes if any)

### Save / restore

- [ ] Port `save.c` / `restore.c` semantics: `you`, levels, `obj`, timers, light sources
- [ ] Verify RNG stream after restore matches C continuation segments

### Bones

- [ ] `bones.c` naming, level eligibility, ghost equipment
- [ ] Loading bones on new game consumes correct RNG

### Topten / record

- [ ] If sessions append high scores, port `topten.c` minimal slice

### Cross-links

- [02-init-chargen.md](./02-init-chargen.md) — new game after bones
- [09-qa-sessions.md](./09-qa-sessions.md) — multi-segment test cases

## Exit criteria

- Sessions with `segments.length > 1` pass full P+S after save/restore or bones chains.
