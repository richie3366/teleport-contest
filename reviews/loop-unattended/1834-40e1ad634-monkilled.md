# Review 1834 — 40e1ad634 — monkilled (D-2875)

- SHA: `40e1ad634` (coverage; `mon.c` `monkilled`)
- Files: `js/mhitm.js` (+71/−), `js/trap.js` (−65), `js/uhitm.js` (+1), `js/zap.js` (+1). 62 `js/` insertions.
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` hunk. `imports.mjs --rulecheck`: "Rule #2 clean".

## Intent vs deliverable

Subject promises one `monkilled`: seen non-null `fltxt` is `pline_mon` with destroyed/killed and " by the " only when the text is non-empty; otherwise `sad_feeling` is set from `mtame`; digestion, disintegration, or a burned paper/straw golem calls `mondead`; every other `how` calls `mondied`; a monster still alive returns; a dead tame golem then gets the roast/rust/rot line. The trap clone is deleted. The diff does that. `sym.mjs`:

```
monkilled        js/mhitm.js:3902   ASYNC — await required
mondied          js/mhitm.js:3888   ASYNC
mondead          js/mhitm.js:3803   ASYNC
noit_mon_nam     js/do_name.js:1260   sync
completelyburns  js/explode.js:203   sync
completelyrusts  NOT FOUND
completelyrots   NOT FOUND
```

The rust/rot predicates are `completelyrusts_mm` / `completelyrots_mm` in `mhitm.js` (iron; wood or leather), matching `mondata.h:225–227`. `imports.mjs --can trap.js mhitm.js monkilled` → `ALREADY: trap.js already statically imports mhitm.js`.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `monkilled` | export `mhitm.js:3902` | `mon.c:3376–3418` |
| `completelyburns_mm` | local, already present | `mondata.h:223–224` |
| `completelyrusts_mm` / `completelyrots_mm` | new locals, match the macros | `mondata.h:225–227` |
| `pline_mon` / `noit_mon_nam` | imports | `pline_mon`; `do_name.c:1051–1060` |
| trap `monkilled` | deleted | was a second body |

## C ↔ JS fidelity

`csym` body is `mon.c:3376–3418`. `mptr` is `mdef.data` before any call that can change it.

`fltxt != null` and (`wormno ? worm_known : cansee(mx, my)`) calls `pline_mon(mdef, '%s is %s%s%s!', Monnam, nonliving ? destroyed : killed, fltxt[0] ? ' by the ' : '', fltxt)`. An empty string is not null, and `fltxt[0]` is missing, so there is no " by the ". That is `*fltxt`. Otherwise `sad_feeling` becomes `mtame ? true : false`, including clearing a stale true on a non-tame unseen death (`mon.c:3389–3391`). `mondead` reads that flag at entry (`mhitm.js:3805`) and clears it, so the epitaph follows the sad line.

`disintegested` is `AD_DGST`, `-AD_RBRE`, or `AD_FIRE` on a paper or straw golem. That arm `await`s `mondead`. The other arm `await`s `mondied` (`mondead`, then `corpse_chance` / `make_corpse`). `DEADMONSTER` is `mhp < 1` (`monst.h:214`). `deadmonster` is the same test. A life-saved monster returns. A dead tame golem then picks roast (fire and `completelyburns`), rust (rust and iron), or rot (decay and wood/leather), and `pline`s `May ${noit_mon_nam} ${rxt} in peace.` No RNG in this function.

Trap's copy ignored `how`, always said "killed", and set `sad_feeling` only when tame. Those call sites now `await` the export: `trap.c:6756` (`''`, `-AD_RBRE` or `AD_PHYS`), `:1716` (null, `AD_RUST`), `:1803` (`''`, `AD_FIRE`), `:2436` (the compression string or null, `-AD_MAGM`). `uhitm.c:6439` passes `AD_BLND` (11, `monattk.h:53`), not the old literal 10. `zap.c:4918` passes `flash_str(fltyp, FALSE)`; the one-arg default is `nohallu = true`, so the second argument is what enables the hallucination name. `wiz_kill` (`wizcmds.c:326`) is the named unwired caller.

## Hallucinations / overclaim

The subject says the trap clone is gone and the export is the C order. `sym.mjs` shows one `monkilled`. `corpse_chance` still has locals in `mhitm.js` and `uhitm.js`; the trap copy of that helper went away with the trap `mondied`. The kill line is `pline_mon`, not `pline`. The epitaph is `pline`.

## Density

One 43-line function, the trap clone deleted, two call-site argument fixes. 62 insertions. Rust and rot are one-line macros, not stubbed callees.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify monkilled --base 40e1ad634~1 --reach-all`.

```
verify monkilled: baseline 40e1ad634~1 (scoreboard at f7125aef2) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke monkilled: no RNG-tagged reach; fixed smoke spread (12 run, 3.4s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
