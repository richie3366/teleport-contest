# Review 2232 — 675a0c998 — exclam canonical export

Metadata: SHA `675a0c998f8623f94b6a82c9f0e409a82c9527ee` (D-3271,
2026-10-02). `js/zap.js` + `js/mthrowu.js` + `js/muse.js` +
`js/spell.js` + `js/uhitm.js` (+51/−48, mostly deletions).
Single pure function `exclam` (C zap.c:3546–3553).

Intent vs deliverable: subject promises "exclam canonical
export + 5-file caller sweep (clone consolidation)". The diff
promotes the zap.js local to export, deletes 3 same-named
clones + `exclam_chain`, and converts the muse.js ternary.
Delivers what it promises.

Inventory:

- `exclam` (`js/zap.js:1544`): local → `export function`
  (identical if-chain, C-cited doc). C-home file ✓.
- Deleted: mthrowu.js:282–288 local, uhitm.js:437–443
  local, spell.js:2255–2264 `exclam_chain` (all three
  bodies byte-identical to the canonical); muse.js:1813
  ternary `dmg<0?'?':dmg<=4?'.':'!'` → `exclam(dmg)` ✓
  (predicate order identical).
- Imports: `exclam` added to the pre-existing zap.js edge
  in all four consumers (verified in-hunk); no new module
  edge, hoisted decl, no TDZ ✓.
- `sym.mjs exclam` (required: symbols deleted/re-pointed):
  `exclam js/zap.js:1544 sync` — single export, zero
  clones remain; repo-wide grep confirms one `function
  exclam` and all 12 wired call sites resolving to it.
  Output pasted as required.

**C ↔ JS fidelity — `exclam`**: JS if-chain ≡ C's
`(force<0) ? "?" : (force<=4) ? "." : "!"` exactly ✓.
Pure, no RNG, no callees ✓. C callers: 17 refs = 15 true
calls in 5 files + :3559 comment + extern decl — the
D-log's "15 call sites" count is exact ✓. All 12 wired JS
sites spot-verified with C-matching shapes (thitu
:666/:668, ohitmon :919/:924, joust :1620, hmd :1762/:1773,
hmonas :3815, chain :2380, unslime :1813, dobuzz :2464,
bhitm :4001; ±drift vs D-log lines is from later SHAs in
this window). The 3 unwired C callers (muse.c:1639,
zap.c:4812/4875) are pre-existing arm omissions, each
doc-named (spot-checked muse.js:786–788 ✓) — named, not
silent.

Hallucinations / overclaim: none. "Zero behavior change by
construction" holds — every deleted body was identical.

Density: single callee-free function, +51/−48 (net +3),
with the below-80 exception documented (zap.c holds no
other Open row; coverage generator returns 0 rows —
confirmed: the block is empty at HEAD). `Ledger: exclam
ported` + Verify line present.

Verification: D-log Verify shows PASS + vacuous note +
smoke REACH-OK + green/strict/cohort (full skipped —
no shared file). Re-measured (`hidden-proxy.mjs verify
exclam --base 675a0c998~1 --reach-all`): vacuous (0
blocked — the queue row cited none, pure function, so the
note is honest) + smoke 24/24 PASS → REACH-OK. Zero
regressed. Banned-pattern grep: clean. Rule #2 clean (2229).

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
