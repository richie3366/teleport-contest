# Review 1898 — e7f613e86 — helm_simple_name (D-2939)

- SHA: `e7f613e86` (coverage; `objnam.c` `helm_simple_name`, plus the wear and enlightenment call sites that still said "helmet")
- Files: `js/do_wear.js` flips the return to C's `!hard_helmet ? "hat" : "helm"` (same result as the old order). `canwearobj` uses `already_wearing` and the horn noun. `js/invent.js` `item_what` uses it for `W_ARMH`. The `dothrow.js`, `mhitu.js`, and `uhitm.js` copies are deleted. `polyself.js` imports the `do_wear.js` export. `pickup.js` piercer glance calls it.
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` diff. `imports.mjs --rulecheck`: "Rule #2 clean: no bare/node specifiers or fs calls in js/."
- `sym.mjs` (the diff deletes the local copies and re-points the calls at the export):

```
helm_simple_name js/do_wear.js:1719   sync
hard_helmet      js/do_wear.js:249   sync
```

No local clone remains. `imports.mjs --can` for `dothrow.js`, `mhitu.js`, `uhitm.js`, `invent.js`, `pickup.js`, and `polyself.js` into `do_wear.js` `helm_simple_name` → `ALREADY` on each.

## Intent vs deliverable

Subject promises one export that says "hat" or "helm", and the clones that always said "helmet" are gone. The diff is that, plus the two `canwearobj` sentences and the wizard `W_ARMH` noun.

## Inventory

| JS | Class | C |
|----|-------|---|
| `helm_simple_name` | live sync `do_wear.js:1719` | `objnam.c:5513–5528` |
| `hard_helmet` | live `:249` | `do_wear.c:567–573` |
| `already_wearing` | same-file `:307` | `do_wear.c:2011–2014` |
| `canwearobj` helm arms | `:2597`, `:2603` | `do_wear.c:2073`, `:2079` |
| `item_what` `W_ARMH` | `invent.js:5678` | `zap.c:5740` |

## C ↔ JS fidelity

`objnam.c:5527`: `return !hard_helmet(helmet) ? "hat" : "helm"`. JS is that expression. `hard_helmet` (`do_wear.c:570–572`) is false for a null object or a non-helm, and true when the helm is metallic or crackable. A leather hat and a fedora fail that, so they are hats. An iron helm passes, so it is a helm. The comment's examples are that predicate, not extra branches.

`do_wear.c:2073`: `already_wearing(an(helm_simple_name(uarmh)))`. `already_wearing` (`:2013`) is `You("are already wearing %s%c", cc, cc == c_that_ ? '!' : '.')`. JS `pline`s `You are already wearing ${cc}.` when the argument is not the string `that`. `an("helm")` / `an("hat")` is not `that`. `do_wear.c:2078–2079` is `pline_The("%s won't fit over your horn%s.", helm_simple_name(otmp), ...)`. JS builds `The ${noun} won't fit over your horn` plus `s` when `num_horns` is not 1. Same sentence.

`zap.c:5740` is the `W_ARMH` arm of `item_what`. JS assigns `helm_simple_name(u.uarmh)`. The other slot nouns stay short. Named.

Callers that already used this name, and that this SHA keeps on the export: `botl.c:574` → `botl.js:2276`. `do_wear.c:1943` doff → `do_wear.js:1796`. `do_wear.c:3236` dust → `do_wear.js:4026` via `armor_doff_simple_name`. `objnam.c:5448` → `do_wear.js:1769`. `dothrow.c:1312`, `:1390`, `:1396`, `:2690` → `dothrow.js:1662`, `:1730`, `:1737`, `:934` (the stub that returned `"helmet"` is gone). `hack.c:3427` → `pickup.js:2421`. `mhitu.c:602` → `mhitu.js:3968`. `mhitu.c:2126` → `mhitu.js:1379`. `polyself.c:1241` and `:1267` → `polyself.js:1459` and `:1484`. `sounds.c:1449`, `:1511`, `:1515` → `sounds.js:1978`, `:2052`, `:2055`. `trap.c:119`, `:1353`, `:1613`, `:1670` → `trap.js:4639`, `:3962`, `:3788`, `:3855`. `uhitm.c:3209` → `uhitm.js:2351`. `uhitm.c:3238` is the hero-defender arm of `mhitm_ad_drin` → `mhitu.js:2379`. `extern.h:2276` only declares it.

## Hallucinations / overclaim

The subject says no arm of `helm_simple_name` is omitted. The function is one return. It says the dothrow, mhitu, and uhitm clones are gone. `sym.mjs` shows one export and no clone. `burnarmor`'s empty helm slot still passes the literal `"helmet"`, which is C's `item ? buf : "helmet"` false arm (`trap.c` near `:119`) and does not call this function. Named.

## Density

The coverage row asked for `helm_simple_name`. The whole body shipped. The same-file `canwearobj` arms that still said "helmet" shipped with it, and the three clones were deleted rather than left as a second definition. Not an arm peel.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify helm_simple_name --base e7f613e86~1 --reach-all`.

```
verify helm_simple_name: baseline e7f613e86~1 (scoreboard at b88b8599f, 2026-09-27T02:19:54.792Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify helm_simple_name: no corpus session is blocked on it at e7f613e86~1 — a vacuous verify is NOT a corpus PASS. …
smoke helm_simple_name: no RNG-tagged reach; fixed smoke spread (12 run, 3.3s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. The D-log's green, strict, and cohort, and the skipped full suite, are the port's own verify line (seven files, no shared-file full suite).

## Actionable C-wrongs

None. Hard headgear is a helm, and the rest is a hat.

Verdict: **ACCEPT**
