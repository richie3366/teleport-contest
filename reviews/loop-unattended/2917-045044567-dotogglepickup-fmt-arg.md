# Review 2917 — 045044567 — dotogglepickup passes buf as a pline argument

- SHA: `045044567` (cliff, owner `dotogglepickup`)
- D-entry: D-4076; Ledger: options.c (`dotogglepickup`, D-4076)
- `js/` diff: `js/options.js` +3 −1

## Intent vs deliverable

Promise: JS interpolated `buf` into pline's format text. With
`pickup_types` containing `%` (food), JS pline's vsnprintf emulation read
`% o` as a conversion and printed «Autopickup: ON, for 0bjects.» where C
printed «… for % objects.» (4 sessions). Diff:
`pline('Autopickup: %s.', buf)`. Promise = diff.

## Inventory

- `dotogglepickup` — options.js:5826–5840; C options.c:9255-9274.

## C ↔ JS fidelity

```c
flags.pickup = !flags.pickup;
if (flags.pickup) {
    oc_to_str(flags.pickup_types, ocl);
    Sprintf(buf, "ON, for %s objects%s", ocl[0] ? ocl : "all",
            (ga.apelist) ? ((count_apes() == 1) ? ", with one exception"
                                                : ", with some exceptions") : "");
} else Strcpy(buf, "OFF");
pline("Autopickup: %s.", buf);
```

JS walks the body in the same order: toggle, `oc_to_str`, `ocl || 'all'`,
the apelist one/some suffix, 'OFF', then pline with buf as the argument.
C's `Sprintf` puts `ocl` in as an argument too, so `%` in `ocl` is safe
in both at that step. The JS template literal for buf is equivalent. No
RNG.

## Hallucinations / overclaim

None. The Named line says other template-into-format plines were not
audited. That is a real family. A `%` in any runtime text (a christened
monster name, a fruit name, an engraving) reaches vsnprintf the same
way. Examples: `makemon_appear_msg`'s `Norep(\`${what}…\`)`
(makemon.js:3991) and castmu's `pline(\`${who} casts a spell…\`)`
(mcastu.js:1015). Neither is a corpus block today.

## Density

One call site, the whole C function confirmed. One Ledger bullet.

## Verification

```text
verify dotogglepickup: 4 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
  scen-symset-Knight-50555046, scen-symset-Rogue-50455062,
  scen-symset-Valkyrie-50255069, scen-questtour-Barbarian-50255416: PASS
```

This is an exact match with the D-log. No FORCE/DIAG/seed strings.

## Actionable C-wrongs

None queued. The template-into-format family is named debt. Ship a site
when a session that reaches it shows `%`-mangled text.

Verdict: **ACCEPT**
