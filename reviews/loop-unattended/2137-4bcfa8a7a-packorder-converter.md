# Review 2137 — 4bcfa8a7a — packorder and class converter

SHA `4bcfa8a7a`, D-3177; 2026-09-30; +219 JS. No closure claimed.

## Intent vs deliverable

“Packorder and object-class string conversion with obsolete symbol handlers”
adds six bodies, replaces pickup converter, wires option-table/rc/menu
requests and makes getter/config-writer adapters propagate diagnostic promises.

## Inventory — optfn_packorder

New export; change_inv_order verified C callee, oc_to_str LIVE;
with_oc_string/set_optbuf are result/buffer adapters.

## C ↔ JS fidelity — optfn_packorder

options.c:2669–2692 init→set empty/error→change→get/cnf→default matches.
get values use live converter; allopt/rc/both menus wired. Standalone
flags bag preserves initialized game order rather than replacing it.

## Inventory — oc_to_str

New export; impossible imported LIVE; pickup storage adapter converts
symbols to class bytes, no duplicate converter.

## C ↔ JS fidelity — oc_to_str

options.c:8061–8073 signed-char promotion→NUL→invalid diagnostic/valid
write→final NUL matches. Destination old suffix survives intermediate
writes and diagnostic; promise resumes before next byte. All five options
caller loci wired; insight.c:812 caller explicitly omitted in map.

## Inventory — optfn_dungeon

New export; buffer adapter only.

## C ↔ JS fidelity — optfn_dungeon

options.c:1571–1591 init/set success, get `(to be done)`, cnf empty,
default success match. No-op setting is C behavior, not a stub.

## Inventory — optfn_effects

New export; buffer adapter only.

## C ↔ JS fidelity — optfn_effects

options.c:1593–1613 same complete request envelope; registered allopt/rc.

## Inventory — optfn_objects

New export; buffer adapter only.

## C ↔ JS fidelity — optfn_objects

options.c:2647–2667 same complete request envelope; registered allopt/rc.

## Inventory — optfn_traps

New export; buffer adapter only.

## C ↔ JS fidelity — optfn_traps

options.c:4417–4437 same complete request envelope; registered allopt/rc.
All four callers queries have zero direct calls; function-pointer dispatch
is the C entry, and each is wired. No RNG in six bodies.

## Inventory — changed C callers

change_inv_order, optfn_pickup_types/handler split, dotogglepickup,
get_option_value, all_options_strbuf, do_write_config_file retained.

## C ↔ JS fidelity — changed C callers

change_inv_order :7465–7510 still prepends gold, rejects bad/disallowed/
duplicate classes, retains valid entries, appends omitted old classes and
mutates order even on ERR. Signature change only supplies rc bag.
Pickup :3307–3401/:6113–6121 and toggle :9255–9274 now call canonical
converter before clearing/printing, with their inherited async split.
get_option_value :8480–8505 waits then tests OK/nonempty; serialization
:9677–9748 waits before appending; cfgfiles.c:168–210 awaits serialization
before VFS write. C doset :8757–8975 non-handler getlin/ESC/parse arm is
wired for packorder; inherited selection grouping remains map-named.

JS-only adapters changed: doset_compopt_get_val, simple_opt_get_val,
format_simple_opt_line, doset_simple_menu, pickup_class_syms,
with_oc_string, pickup_type_classes and parseNethackrc. They pass values or
promises through these same C loci; no alternate game rule or RNG added.

## Hallucinations / overclaim

No dispatch/stub overclaim; obsolete handlers faithfully port C no-ops.
Required historical sym output:

```text
pickup_class_syms NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/options.js:5645
oc_to_str js/options.js:1420 sync
optfn_packorder js/options.js:1520 sync
optfn_dungeon js/options.js:1463 sync
optfn_effects js/options.js:1482 sync
optfn_objects js/options.js:1501 sync
optfn_traps js/options.js:1542 sync
all_options_strbuf js/options.js:12852 ASYNC — await required
get_option_value js/options.js:12295 sync
```

Converter/getter are sync-or-promise despite sym labels. Rule #2 and diff
anti-pattern scans clean. Existing import edges; no cycle-forced clone.

## Density

Six new whole same-file bodies; caller/result adapter edits are closure:

- Ledger: optfn_packorder ported — ACCEPT.
- Ledger: oc_to_str partial — ACCEPT-WITH-DEBT.
- Ledger: optfn_dungeon ported — ACCEPT.
- Ledger: optfn_effects ported — ACCEPT.
- Ledger: optfn_objects ported — ACCEPT.
- Ledger: optfn_traps ported — ACCEPT.

Each Ledger/Verify line present. Named insight caller keeps partial status;
no new silent arm omission or unrelated port.

## Verification

Historical six together, `--base 4bcfa8a7a~1 --reach-all`:

| Function | verify | smoke |
|---|---|---|
| optfn_packorder | 0 blocked, vacuous | 24 PASS, 0 regressed, REACH-OK |
| oc_to_str | 0 blocked, vacuous | 24 PASS, 0 regressed, REACH-OK |
| optfn_dungeon | 0 blocked, vacuous | 24 PASS, 0 regressed, REACH-OK |
| optfn_effects | 0 blocked, vacuous | 24 PASS, 0 regressed, REACH-OK |
| optfn_objects | 0 blocked, vacuous | 24 PASS, 0 regressed, REACH-OK |
| optfn_traps | 0 blocked, vacuous | 24 PASS, 0 regressed, REACH-OK |

D-log green/strict, cohort 7/7, full 44/44. Earlier empty worker failure
was rechecked without code changes, not disguised as a corpus omission.

## Actionable C-wrongs

None newly found; insight caller and inherited option-menu debt remain named.

Verdict: **ACCEPT-WITH-DEBT**
