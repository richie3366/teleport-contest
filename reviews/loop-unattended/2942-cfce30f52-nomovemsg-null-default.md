# Review 2942 — cfce30f52 — C `nomovemsg = 0` is JS null, not the number 0

- SHA: `cfce30f52` (cliff, writer behind board owner `vomiting_dialogue`)
- D-entry: D-4101; Ledger: sounds.c (`domonnoise`), polyself.c
  (`dogaze`), D-4101
- `js/` diff: `js/sounds.js` ±1, `js/polyself.js` ±1

## Intent vs deliverable

Promise: C's `gn.nomovemsg = 0` is a NULL pointer, which unmul replaces
with «You can move again.». Two JS writers stored the number 0, which
unmul neither defaults (`== null`) nor prints (falsy). So a skeleton
rattle freeze or a poly'd gaze freeze ended silently. Diff: both
writers assign `null`, with a C cite. Promise = diff.

## Inventory

- `domonnoise` MS_BONES arm — sounds.js:1647–1654; C sounds.c
  `domonnoise` :968–975.
- `dogaze` gaze-freeze arm — polyself.js:2810–2819; C polyself.c
  `dogaze` :1742–1747.
- Consumer `unmul` — hack.js (reviewed in 2936); C hack.c :4181–4185.

## C ↔ JS fidelity

```c
nomul(-2); gm.multi_reason = "scared by rattling"; gn.nomovemsg = 0;   /* sounds.c :972–974 */
gm.multi_reason = "frozen by a monster's gaze"; gn.nomovemsg = 0;      /* polyself.c :1745–1746 */
…
else if (!gn.nomovemsg) gn.nomovemsg = You_can_move_again;            /* hack.c unmul */
```

`null` is the house mapping of a C NULL `nomovemsg` (uhitm.js:3251
documents it). JS unmul's `== null` default then gives C's message.
Neither line draws RNG, and the `nomul(-2)` / `-d(m_lev+1, damd)`
durations are unchanged.

The D-log's census holds. A regex over `js/` finds no
`nomovemsg = 0` / `false` writer left. The `''` writers are 11 hits,
but one is a comment (hack.js:1807). The 10 code sites map one-for-one
to C's 10 `= ""` sites: timeout 909, apply 1244/2160, pickup 3009/3989,
dothrow 1114, hack 2987 (it lives in cmd.js:7320, «dragging an iron
ball»), artifact 1361, detect 1262/1315. Before this fix, D-4095 took
away nomul(0)'s blanket nomovemsg clear. The two commits fit together:
nomovemsg now follows C's pointer lifetime, with null meaning «default»
and '' meaning «silent».

## Hallucinations / overclaim

None. The `vomiting_dialogue` owner label is a format match
(timeout.c:249). The D-log names the real writer.

## Density

Two one-token fixes at their C sites, plus a census of the remaining
writers. Ledger bullets for both functions.

## Verification

```text
verify vomiting_dialogue (--base cfce30f52~1): 2 blocked
  scen-sweep-Wizard-51450051, scen-worldtour-Archeologist-610028: PASS
verify vomiting_dialogue: 2 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
verify domonnoise: 1 blocked
  scen-options-Knight-50355037: still domonnoise at step 67 (another path,
  named in the D-log) → NO MOVEMENT
```

Exact match with the D-log. Full public 44/44 at this SHA (HEAD).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
