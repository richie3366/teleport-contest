# Review 1978 — 20875982e — arti_speak whole + both callers

Metadata: SHA `20875982e` (D-3018). Scored diff: `js/artifact.js` (+36) +
`js/apply.js` (+~20/−5) + `js/wield.js` (+~4/−2). Subject promises: new
`arti_speak` whole in C order; wire wield unconditionally; wire doapply
via one tail helper at the 5 artifact-eligible arms.

## Intent vs deliverable

Promise: speaking artifacts (pinned table: only the Mirror and the Master
Key carry SPFX_SPEAK) whisper rumors on wield/apply; both former Named
omits (`js/wield.js:546`, `js/apply.js:2349`) retired.
Diff actually adds exactly that. Promise kept.

## Inventory

- `arti_speak` (artifact.js:668, exported — C `artifact.c:2278–2296`
  extern): whole body.
- `doapply_arti_tail` (apply.js file-local helper): OR-then-booleanize of
  the C `:4421–4424` tail, wired at 5 arms (SKELETON_KEY/CREDIT_CARD,
  MIRROR, CRYSTAL_BALL, LENSES, graystones).
- wield.js ready_weapon: `if (wep.oartifact) await arti_speak(wep)` at C
  `:241–243`, replacing the Named-omit comment.

## C ↔ JS fidelity

### arti_speak body — verdict: exact-C, ACCEPT

Against `artifact.c:2278–2296` (csym range):

```c
if (oart == &artilist[ART_NONARTIFACT] || !(oart->spfx & SPFX_SPEAK))
    return ECMD_OK; /* nothing happened */
line = getrumor(bcsign(obj), buf, TRUE);
if (!*line)
    line = "NetHack rumors file closed for renovation.";
pline("%s:", Tobjnam(obj, "whisper"));
SetVoice((struct monst *) 0, 0, 80, voice_talking_artifact);
verbalize1(line);
return ECMD_TIME;
```

JS follows in order with the `||` short-circuit kept, the renovation
fallback text exact, `verbalize(line)` for the `verbalize1` macro
(`hack.h:1029` ≡ `verbalize("%s", line)`), ECMD_TIME return. `getrumor`
call shape matches: JS `getrumor(truth, exclude_cookie)` (rumors.js:159)
← C `(bcsign, buf, TRUE)`. RNG: none in C, none added. Confirm.

### Callee closure — all LIVE, verdict: ACCEPT

Required `sym.mjs` outputs:

```text
getrumor         js/rumors.js:159   sync
bcsign           js/rumors.js:225   sync
SetVoice         js/sndprocs.js:52   sync
voice_talking_artifact js/sndprocs.js:25   sync   export const
Tobjnam          js/objnam.js:1806   sync
verbalize        js/display.js:7853   ASYNC — await required
get_artifact     js/artifact.js:648   sync
```

`Tobjnam`: artifact.js:123 imports the export — not one of the 6
pre-existing local clones elsewhere (untouched by this SHA). `verbalize`
awaited. No clones, no stubs, no new edges (rumors/sndprocs joins verified
in-diff; `ECMD_OK`/`ECMD_TIME` pre-imported at artifact.js:61–62).

### Caller wiring — the hard part, independently verified, ACCEPT

C has ONE doapply tail (`apply.c:4420–4423`, read in situ):

```c
if (obj && obj->oartifact) {
    res |= arti_speak(obj); /* sets ECMD_TIME bit if artifact speaks */
}
```

reached by every `break` arm; JS early-returns per arm, so it wires 5.
Behavior-complete, verified independently of the D-log's citation: only
two pinned artifacts carry SPFX_SPEAK (Mirror → MIRROR arm ✓ wired;
Master Key → SKELETON_KEY arm ✓ wired); `arti_speak` on any non-speaking
artifact returns ECMD_OK with zero output, so skipping the call at
unwired arms (incl. CANDELABRUM/quest-artifact arms) is observably
identical. The helper `timeSpent || r === ECMD_TIME` ≡ C `res |= (0|1)`.
Wield (`wield.c:240–243`): C `if (wep->oartifact) res |= arti_speak(wep)`;
JS drops the return — sound, verified in situ: ready_weapon falls
straight through to `return 1` (TIME), so the OR is a proven no-op and the
await preserves the rumor/pline side effect. `wep.oartifact` matches C's
unconditional deref shape. Confirm.

## Hallucinations / overclaim

None. "Named: none" is accurate for the body; the unwired-arm reasoning
is written in the helper comment with a C citation
(`artifact_exists :380–384`), not hidden. Live probe of guard arms
(`null`/`oartifact:0`/Excalibur → ECMD_OK, no output) claimed in D-log.
Diff grep: no banned patterns.

## Density

Breadth-phase: 1 whole function + 6 wiring points across its 2 C
callers, ~60 insertions. The helper avoids 5× duplication. Compliant.

## Verification

Re-measured (`hidden-proxy.mjs verify arti_speak --base 20875982e~1
--reach-all`):

```text
verify arti_speak: 0 session(s) blocked at baseline (vacuous, honest)
smoke arti_speak: no RNG-tagged reach; fixed smoke spread (24 run): 24 PASS, 0 regressed → REACH-OK
```

Zero REGRESSED. D-log's `--full` 44/44 stands with the fortress.

## Actionable C-wrongs

None.

Ledger: `arti_speak` ported, REACH-OK via smoke.
Verify lines: hidden vacuous (honest) + smoke + green/cohort/full per
D-log, re-run confirms.

Verdict: **ACCEPT**
