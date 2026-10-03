# Review 2324 — 0887462dd — reset_oattached_mids whole port

Metadata: SHA `0887462dd`, D-3369, coverage row. C
`restore.c:1509–1530` (csym range), sole caller :1301.
Stat: 3 js files (+37/−0) + test 4/4.

Intent vs deliverable: subject promises
"reset_oattached_mids whole port + both getlev tails
wired". Diff actually: the whole body at
js/restore.js:237 + bones ghostly call + save Sy call.
Matches promise.

Inventory: 1 new **C callee** (exported; C staticfn →
exported because two JS tails call it — justified) + 2
call-site wirings + 4 import additions. No stub, no
clone. Callees all LIVE: has_omonst/OMONST/has_omid/OMID
(const.js:3184–3190, oextra-based ✓),
lookup_bones_id (bones.js:538, id-or-null collapse of
C :1484–1507 bucket scan ✓ same contract),
free_omid (mkobj.js:4278, unconditional clear = C
:150–154 ✓). OMID assign ⇔ `oextra.omid` direct —
sound, has_omid guarantees oextra.

C ↔ JS fidelity: line-for-line confirm. fobj walk ✓;
ghostly-gated omonst arm (`m_id=0`,
`mpeaceful=mtame=0` + "pet's owner died" ✓); ghostly-
gated omid arm (oldid → lookup → assign, else
free_omid) ✓. No RNG in C or JS. Callers: C :1301 is
the sole caller (csym: only :1301 + decl) after
relink_timers/relink_light_sources :1298–1299 and
before ghostly clear_id_mapping :1303–1304 — JS bones
tail mirrors exactly (reset :696 after remap/restores,
clear_bones_ids :700 after) ✓; save.js Sy tail passes
ghostly=false = C non-ghostly path (no-op walk by
construction) ✓. Reviews 657/659 named-omit retirement
claimed without stamp — correct, both ACCEPT-WITH-DEBT
with no Actionable item.

Hallucinations / overclaim: none. "--can SAFE/ALREADY"
re-measured below as ALREADY ×4 (brace extensions;
D-log's "same SCC" note agrees).

Density: single-function cluster with a stated density
exception (no other restore.c Open row). Each of
C-locus/Callers/Verify/Named + `Ledger:` present ✓.
No Must-fix bundled ✓.

Verification: re-measured — `verify
reset_oattached_mids --base 0887462dd~1 --reach-all` →
"0 blocked" + "smoke 24/24 → REACH-OK". Matches the
D-log. Diff grep: 0 banned hits. `sym.mjs` (required
paste; nothing re-pointed):

```text
has_omonst/js/const.js:3186  OMONST/:3184  has_omid/:3190
OMID/:3188  lookup_bones_id/js/bones.js:538  free_omid/js/mkobj.js:4278
```

All sync single definers.

Actionable C-wrongs: none.

Verdict: **ACCEPT**
