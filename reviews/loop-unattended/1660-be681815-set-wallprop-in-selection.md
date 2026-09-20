# Review 1660 — be681815 — `sp_lev.c` set_wallprop_in_selection whole body (D-2701)

Metadata: commit `be681815`, D-2701, `js/mklev.js` only (+~100). Pops the first Open-coverage row. No prior review claimed closed.

## Intent vs deliverable

Subject promises: whole C body of `set_wallprop_in_selection`. Diff actually adds it plus two callees (`sel_set_wall_property` file-local, `selection_clear` exported) and two thin caller forwarders (`lspo_non_diggable/passwall`). Promise matches deliverable; nothing stubbed.

## Inventory

New JS: `set_wallprop_in_selection`, `selection_clear`, `lspo_non_diggable`, `lspo_non_passwall` (all sync exports, `sym.mjs`-confirmed), file-local `sel_set_wall_property`. No deleted/re-pointed symbols. No new cross-module edge (same-file locals + already-imported consts).

## Callee closure

```text
lspo_non_diggable js/mklev.js:3271   sync
selection_clear  js/mklev.js:26746   sync
```

(`sel_set_wall_property` file-local by design like C's `static`;
`set_wallprop_in_selection` same-file export.) No symbol deleted or
re-pointed. Callee table:

| JS callee | Class |
|---|---|
| `create_des_coder` | LIVE (same-file local) |
| `selection_new` / `selection_free` / `selection_iterate` | LIVE (same-file; iterate is x-outer/y-inner, C order) |
| `sel_set_wall_property` | verified CLONE (body read vs `:985–995` above) |
| `selection_clear` | verified port (encoding verified via `selection_getpoint :167–178` above) |
| `IS_STWALL` / `IS_TREE` / `IRONBARS` / `isok` / `W_NONDIGGABLE` / `W_NONPASSWALL` | LIVE (already-imported consts) |

No STUB in any live arm. `l_selection_check` has no JS counterpart by
architecture (no Lua stack) — the single named omit, with the mechanism
stated (a non-selection argument is a caller bug C fatals on).

## C ↔ JS fidelity

C loci (all whole bodies read): `set_wallprop_in_selection` `sp_lev.c:5910–5932` (csym, 23 L), `sel_set_wall_property :985–995` (csym, 11 L), `selection_clear` `selvar.c:47–62` (csym, 16 L). Callers: exactly `:5939`/`:5948` → the two forwarders. Confirm. Forwarder
bodies read (`sp_lev.c:5934–5951`):

```c
lspo_non_diggable(lua_State *L)
{
    set_wallprop_in_selection(L, W_NONDIGGABLE);
    return 0;
}
/* ... same shape for non_passwall with W_NONPASSWALL ... */
```

One call each plus the lua-convention `return 0` — the JS thin
forwarders (`set_wallprop_in_selection(sel, W_*)`) are exact; the `return
0` has no JS carrier (no Lua stack to report arity to) and nothing
consumes it. The `/* non_diggable(selection); */` doc comments above each
C body confirm the sel-or-nothing calling convention the JS `sel == null`
dispatch mirrors.

- Arity dispatch: C argc==1 → caller's selection; argc==0 → new+clear(1)+free; other → null → `if (sel)` no-op. JS maps null/undefined → whole-map arm, selection object → caller arm, gate kept. The `l_selection_check` fatal-on-garbage has no JS counterpart by architecture (no Lua stack) — named in-commit. Confirm as the only divergence, and it is a no-Lua-stack necessity, not a C-wrong.
- `sel_set_wall_property`: prop deref → by-value param; STWALL/TREE/IRONBARS (incl. 3.6.2 note) → `wall_info |= prop`, with `(|| 0)` for JS-undefined fields. The isok+null guards reproduce C `selection_iterate`'s isok gate (`selvar.c:736`), which the JS same-file iterate lacks — `sel_set_ter` precedent cited. Effect-equivalent, not a C-wrong.
- `selection_clear`: verified the encoding, not just the bounds. C memsets `1+val` and `selection_getpoint` (`selvar.c:167–178`, csym-read) returns `map[…]−1`, so clear(1)=full / clear(0)=empty — exactly the JS fill/empty arms. Bounds shapes match C line-for-line (full `0..COLNO-1/0..ROWNO-1`, empty `lx=COLNO/ly=ROWNO/hx=hy=0`), `bounds_dirty=FALSE` ✓. JS `pts`-Set representation is internal to the file's selection model (D-2696 shape); probe confirms 1680/1680 fill + getpoint 1.
- The ~30 pre-existing inline `des.non_diggable` sites keep their bodies — explicitly not this row's deliverable (no silent claim otherwise).

## Hallucinations / overclaim

None. The D-2696 "mutating selection_clear" deferral is retired by this port with the mechanism shown, not hand-waved.

## Density

Breadth phase: one whole C function + 2 callees + 2 caller forwarders, ~100 lines, one module. Right-sized.

## Verification

Full verify transcript (both summary lines cited):

```text
verify set_wallprop_in_selection: baseline befd3a1a — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify set_wallprop_in_selection: no corpus session is blocked on it at be681815~1 — a vacuous verify is NOT a corpus PASS. [...]
smoke set_wallprop_in_selection: no RNG-tagged reach; fixed smoke spread (24 run, 24 PASS, 0 regressed → REACH-OK
```

0-blocked vacuous + REACH-OK, as disclosed. No REGRESSED. Encoding proof
recap: C `selection_getpoint` returns `map[…] − 1`, so the `1+val` memset
makes clear(1)=full / clear(0)=empty — the JS fill/empty arms are
observably identical, and the probe confirms 1680/1680 fill with getpoint
1. Diff grep: no FORCE/DIAG/seed/fastforward/coords. Rulecheck clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
