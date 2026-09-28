# Review 1998 — a7a0f55e5 — o_init.c objdescr_is + 4-clone fold (D-3038)

Metadata: SHA `a7a0f55e5` (D-3038). Canonical-export restart
+ folding four drifted local clones onto it (eat, muse,
steed, mon-meat). Subject promises the C-order restart with
the null-arm `impossible` cited as omitted.

## Intent vs deliverable

Promise: restarted canonical export (js/apply.js:1142) —
null guard keeping `return FALSE`, OBJ_DESCR fetch,
null-descr fallthrough on its own line, `===` match; all 4
clones folded onto the import; the eat.js edge stays inside
the existing SCC with runtime-only use. Diff adds exactly
that (5 `js/` files). Promise kept.

## Inventory

- `objdescr_is` (js/apply.js:1142, exported sync):
  restarted whole.
- Deleted clones: eat.js, muse.js, steed.js (same-name),
  mon.js (`objdescr_is_meat` — renamed at its call site).
- Import widenings: eat/mon/muse/steed from apply.js.
- No other symbols touched.

## C ↔ JS fidelity

### Body — verdict: exact-C, ACCEPT

C (`o_init.c:351–365`, csym range) whole:

```c
if (!obj) {
    impossible("objdescr_is: null obj");
    return FALSE;
}
objdescr = OBJ_DESCR(objects[obj->otyp]);
if (!objdescr)
    return FALSE; /* no obj description, no match */
return !strcmp(objdescr, descr);
```

JS walks all four arms in C order. The `impossible`
pline is omitted with the control flow kept — correctly a
named omit, not a miss: `impossible()` is async while all
9 C call sites are sync boolean tests (D-2608 precedent),
and C's own `extern.h:2187` notes callers rely on the
FALSE return, which JS preserves. `!strcmp` → `===`
exact for strings. The `?? obj.otyp` fallback and the
`!oc` guard pre-existed and are kept byte-identical.
No RNG.

### Clone fold — verdict: verified, ACCEPT

All four deleted clones were byte-identical in semantics
(`dn != null && dn === descr` ≡ the canonical split
fallthrough + `===`). The mon.js rename
(`objdescr_is_meat` → canonical at the YUM YUM site) is
the same function under its C name. `sym.mjs` (required):

```text
objdescr_is      js/apply.js:1142   sync
```

One definition repo-wide; zero stragglers (grep).

### Callee closure — verdict: ACCEPT

`OBJ_DESCR` read is a table lookup (live `objectDescrs`);
no C callee. No stub, no omit in a live arm.

### Caller — verdict: wired, ACCEPT

All nine C call families resolve to the canonical import
in-tree: apply.c fragile (same-file), eat.c / mon.c YUM
YUM, hack.c snow boots, mondata.c visored helmet (mhitu +
uhitm imports), muse.c milky/smoky, potion.c milky/smoky,
spell.c dull, steed.c riding gloves/boots. Required
`--can` output for the widened edge:

```text
ALREADY: eat.js already statically imports apply.js. No new edge needed.
```

(mon/muse/steed edges pre-existed via get_mleash,
mon_has_amulet, m_unleash.) Runtime-only boolean use, no
top-level read — no TDZ risk.

## Hallucinations / overclaim

None. The commit message is unusually honest (opens with
the PARTIAL coverage that motivated it).

## Density

One whole C function + 4-clone fold across 5 files.
Right-sized.

## Verification

Re-measured (`hidden-proxy.mjs verify objdescr_is --base
a7a0f55e5~1 --reach-all`):

```text
verify objdescr_is: 0 session(s) blocked (vacuous, honest)
smoke objdescr_is: no RNG-tagged reach; fixed smoke spread (24 run): 24 PASS, 0 regressed → REACH-OK
```

Zero REGRESSED. Matches the pasted tail.

## Actionable C-wrongs

None.

Ledger: `objdescr_is` ported, REACH-OK via smoke.
Verify lines: hidden vacuous (honest) + smoke.

Verdict: **ACCEPT**
