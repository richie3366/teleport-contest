# Review 2909 — f73db3888 — waterbody_name reads the youprop.h Hallucination

- SHA: `f73db3888` (cliff, writer port: 1 predicate)
- D-entry: D-4068; Ledger: pager.c (`waterbody_name`, D-4068)
- `js/` diff: `js/hack.js` +4/−2 (import alias + predicate)

## Intent vs deliverable

Promise: pager.c `add_cmap_descr` sets `EHalluc_resistance = 1` while it
names terrain. JS `waterbody_name` read do_name.js's sticky-first
`Hallucination`, so the override was ignored and a hallucinated farlook
said «A deep water.» for «A moat.» (Samurai-49956004, Wizard-587219 →
FULL PASS). The diff switches the read to display.js's youprop.h
reader. Promise = diff.

## Inventory

- `waterbody_name` — hack.js:2220 (`youprop_Hallucination()`).
  C: pager.c:558–611 (`hallucinate` at :565).
- `Hallucination` (display.js:1374) imported as `youprop_Hallucination`,
  the alias do_name.js `hliquid` already uses (:408).
- The override: pager.c:1185 `EHalluc_resistance = 1;` …
  :1187 restore.

## C ↔ JS fidelity

C (csym pager.c:558–611, head + moat arm):

```c
    boolean hallucinate = Hallucination && !program_state.gameover;
    ...
    } else if (ltyp == MOAT) {
        if (hallucinate) {
            Snprintf(pooltype, sizeof pooltype, "deep %s", hliquid("water"));
            return pooltype;
        } else if (Is_medusa_level(&u.uz)) {
            return "shallow sea";
        } else if (Is_juiblex_level(&u.uz)) {
            return "swamp";
        } else if (Role_if(PM_SAMURAI) && Is_qstart(&u.uz)) {
            return "pond";
```

youprop.h:120: `Hallucination (HHallucination && !Halluc_resistance)`.
display.js `Hallucination` reads HHallucination flats ∪ uprops, minus
H/E resistance flats ∪ uprops. So the override (written to the
resistance) wins, as in C. do_name.js's reader returns true on the
sticky `u.Hallucination` mirror before it looks at resistance, which was
exactly the divergence. The rest of the body (lava / ice / pool / moat
specials, `hliquid` calls) is unchanged and already used the youprop
reader through `hliquid`.

## Hallucinations / overclaim

None. The D-log states the hidden verify is vacuous (both rows were
owner-null) and gives direct re-scores instead. The named residual
("other callers of do_name.js's sticky-first Hallucination not
audited") is real; review 2908 lists `hcolor` as one such reader.

## Density

A one-predicate writer. Both probe rows reach FULL PASS. One `Ledger:`
entry. No unreached work.

## Verification

```text
verify waterbody_name: vacuous (no owned row at f73db3888~1)
verify add_cmap_descr: vacuous
```

Substitute evidence from this audit's re-measures at HEAD (reviews 2906
and 2908): `scen-sweep-Wizard-587219: PASS` and
`scen-sweep-Samurai-49956004: PASS`. Both stopped at the moat farlook
before this SHA. So the D-log's direct re-score claim holds. The full
rescore has 0 PASS→FAIL (see the audit commit). There were no
FORCE/DIAG/seed strings, and the rulecheck is clean.

## Actionable C-wrongs

None in this diff.

Verdict: **ACCEPT**
