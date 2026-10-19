# Review 2912 — 26a5b7338 — gb.buzzer unified on `game._buzzer`

- SHA: `26a5b7338` (cliff, writer port: field rename at 3 writers)
- D-entry: D-4071; Ledger: mthrowu.c (`breamm`), priest.c,
  timeout.c (D-4071)
- `js/` diff: mthrowu.js, priest.js, timeout.js (+6/−6)

## Intent vs deliverable

Promise: C's single `gb.buzzer` was split in JS. breamm, priest and
timeout wrote `game.buzzer`, while zhitu's port read `game._buzzer`. A
fatal breath therefore lost «exhaled by <mon>» in the killer text (3
sessions → FULL PASS). The diff renames the three writers' 6 uses to
`_buzzer`. Promise = diff.

## Inventory

Every C `gb.buzzer` use ↔ JS after the diff:

| C | JS |
|---|---|
| mcastu.c:1005/1008 | mcastu.js:1107/1111 |
| mthrowu.c:1122/1126 (breamm) | mthrowu.js:507/517 **(this SHA)** |
| muse.c:1619 (reader), 1853/1857/1866/1872/1883/1885 | muse.js:789, 1037/1043/1052/1060/1071/1073 |
| priest.c:868/869/871 (ghod_hitsu save/restore) | priest.js:403/404/409 **(this SHA)** |
| timeout.c:1871 | timeout.js:1630 **(this SHA)** |
| zap.c:4572–4576 (zhitu killer) | zap.js:2293–2297 |

That is 16 C sites ↔ 16 JS sites. `grep game.buzzer js/` returns 0.

## C ↔ JS fidelity

C zap.c:4572–4576 (zhitu, the reader that lost the writer):

```c
        if (type < 0 || (type == 0 && gb.buzzer != 0)) {
            /* if gb.buzzer is Null, kbuf[] will end up with just <fltxt> */
            (void) death_inflicted_by(kbuf, fltxt, gb.buzzer);
            ...
            if (gb.buzzer)
```

JS zap.js:2293–2297 has the same guard and call. With breamm writing
the field zhitu reads, «a blast of fire exhaled by a hell hound» is
rebuilt. priest.c's save/clear/restore around ghod_hitsu's buzz and
timeout.c's "unspecified attacker" null now clear the same field, so a
stale breather can't leak into a later god-zap killer. That was another
latent bug the split allowed.

## Hallucinations / overclaim

None. The worldtour-Valkyrie-587104 disintegration row is named as a
different writer, and the re-measure confirms it is unchanged.

## Density

The whole C global, every reader and writer accounted for. One
`Ledger:` entry. The D-log's 640-session sweep (0 regressed) covers the
breath reach.

## Verification

Re-measure (`--base 26a5b7338~1 --no-reach`):

```text
verify zhitu: 2 blocked
  scen-worldtour-Valkyrie-587104: still zhitu at step 634 (disintegration, named)
  scen-worldtour-Wizard-49955018: PASS
verify zhitu: 1 PASS, 0 moved past, 1 unchanged, 0 worse → PROGRESS
verify breamm: vacuous (rows were background_enlightenment-owned)
```

The two other probes (Wizard-51250064, Barbarian-50255201) PASS in
review 2911's re-measure. This is an exact match with the D-log. There
were no FORCE/DIAG/seed strings, and the rulecheck is clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
