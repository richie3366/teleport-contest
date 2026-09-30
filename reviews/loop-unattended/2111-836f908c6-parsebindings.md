# Review 2111 — 836f908c6 — parsebindings restart + bind_specialkey + versinfo gacc

- SHA: `836f908c66b42e8b8673473a28d9fa10b305c64f` (D-3151)
- Date: 2026-09-30. `js/` delta: +171/−~60 options.js, +100/−~34 cmd.js,
  comment-only dokeylist.js; +212 test (22/22, re-ran myself).
- Cluster: `parsebindings` restart + new `bind_specialkey` (+ local
  `overlay_bind_key`) + `handler_versinfo` 1-char fix, two C files
  (`options.c` head + `cmd.c` callee — one caller/callee closure).
- Prior-review closure claimed: none.

## Intent vs deliverable

Subject promises: "parsebindings restart + bind_specialkey + versinfo
gacc". Diff actually adds: the restarted `parsebindings` with all arms,
`overlay_bind_key`, the SPKEYS name column + `bind_specialkey`, the
`'3'`→`'4'` fix, comment refreshes, and the test suite. Promise matches
deliverable — but one arm misreads C (below).

## Inventory (per function)

| JS function | Change | Class |
|---|---|---|
| `parsebindings` (options.js:946, export — C extern) | whole-body restart | whole, **1 C-wrong arm** |
| `bind_specialkey` (cmd.js:1854, sync export — C extern) | new, C order | whole |
| `overlay_bind_key` (options.js local, new) | `bind_key` flow over the outMap overlay | verified CLONE (pre-existing D-0897/D-2550 arch) |
| `handler_versinfo` (options.js:3286, 1 char) | gacc `'3'`→`'4'` | whole (fix verified) |

Callee closure, all LIVE: `txt2key` (same file), `bind_mousebtn`
(`cmd.js:1741`), `bind_specialkey` (new), `illegal_menu_cmd_key`
(same file `:1409`), `add_menu_cmd_alias` (`:1432`),
`default_menu_cmd_info` (`:1353`, 13 named rows — length loop ≡ C
NUL-end), `trimspaces` (`hacklib.js:682`), `visctrl`
(`dokeylist.js:68`), `bind_param_set/clear` (`dokeylist.js:411/420`),
`config_error_add` (void sink — calls present, text named). CMD_PARAM
imported from the generated table. No stubs.

`sym.mjs` (required — nothing deleted/re-pointed):

```text
bind_specialkey: bind_specialkey  js/cmd.js:1854   sync
overlay_bind_key: NOT EXPORTED — 1 LOCAL: js/options.js
bind_mousebtn:   js/cmd.js:1741   sync
```

New names join pre-existing static edges (cmd/dokeylist/generated) —
no `--can`/TDZ question.

## C ↔ JS fidelity (per function)

**`bind_specialkey`** — C `cmd.c:3193–3205`: row walk, `!name||strcmp`
skip, `spkeys[nhkf]=key`, TRUE/FALSE — exact. All 29 SPKEYS names +
defaults verified against C `:3161–3191` (incl. NHKF_ESC NULL name
`:3163` → JS null, never matches). Caller C `options.c:7651` → JS
`:1001`. Confirm.

**`overlay_bind_key`** — C `bind_key` `cmd.c:2661–2728`: "nothing"→
unbind+TRUE, C-exact paren cut (`strchr(`/`strrchr)`, ordered),
case-insensitive ef_txt match + INTERNALCMD skip, rebind param clear
(C `cmdbind_add` `:2141–2143` frees param — verified), CMD_PARAM
arms verbatim (`min(30,len)+1`, `<=1` empty error, `p[0..maxlen-1]`
store ≡ `strncpy`+NUL), `#if 0` omitted (dead in C), TRUE/FALSE —
exact. Confirm as a verified CLONE.

**`handler_versinfo`** — C `:6594` `n+'0'`, `n=VI_BRANCH=4` → `'4'`;
JS `VI_BRANCH=4` (`const.js:1195`). Fix correct. Confirm.

**`parsebindings`** — C `options.c:7593–7674` (`csym`). Separator scan
(key-comma-0, `\,'`/`','` skip, +2 rescan), tail-first recursion with
ret aggregation, first-colon split with outright FALSE, untrimmed key
side + `trimspaces` value side, mouse arm with C's fall-through on
bind failure (verified: failure records the error and continues to
txt2key — JS identical), txt2key arm (FALSE + error), special-key arm,
menu arm (FALSE on illegal key, alias + ret) — all exact. I also
verified the subtle `txt2key("mouse1")`=M-'o' (239) claim against C
`:7015–7033` (makemeta pending → `M(*txt)`): TRUE, C agrees.

**C-WRONG — the extcmd-miss arm.** C `:7668–7672`:

```c
    if (!bind_key(key, bind, TRUE)) {
        config_error_add("Unknown key binding command '%s'", bind);
        return FALSE;
    }
    return ret;
```

JS records the error but `return ret` — TRUE whenever the tail parsed
cleanly. The old left-to-right code returned false here (C-correct);
the restart introduced the divergence, and the committed test pins it
twice (`"a:boguscmd"` → true `:54`; `"mouse1:boguscmd"` → true `:99`,
both documented as "returns ret"). Impact is real: the boolean flows
`parsebindings` → `cnf_line_BINDINGS` (`cfgfiles.c:621`) →
`parse_config_line` → `parse_conf_buf` (`cfgfiles.c:1798`
`p->rv=FALSE`) → config-file rv; and since JS's `config_error_add` is
a void sink, the return is the *only* surviving error signal — a bogus
BINDINGS command is now totally silent. Verdict line: C-wrong.

Diff grep: no `FORCE`/`DIAG`/`getRngLog`/seed/step/coordinate reads,
`fastforward`, or hardcoded coordinates. Rule #2 clean (run this iteration).

## Hallucinations / overclaim

The D-entry ("extcmd miss → error + ret") and the test comments
present the miss arm as C behavior. C returns FALSE. This is a misread
sold as faithful — the review catch of this iteration.

## Density

- Whole-function verdicts: `bind_specialkey` whole;
  `handler_versinfo` whole; `parsebindings` whole **except** the miss-arm
  return (one Must-fix).
- Cluster: caller/callee closure across two C files, 3 functions ≤ 10,
  no Must-fix bundled. One `Ledger:` entry + one Verify sub-bullet per
  function — present.
- Size (+271/−~94) is in the breadth band.

## Verification

Re-measured myself (`--base 836f908c6~1 --reach-all`, all 3):

```text
verify <each of 3>: baseline 836f908c6~1 — 0 session(s) blocked on it
smoke <each of 3>: no RNG-tagged reach; fixed smoke spread (24 run): 24 PASS, 0 regressed → REACH-OK
```

Zero `REGRESSED`; D-log claims match. (The C-wrong is invisible to the
corpus: no session feeds a bogus BINDINGS line — config-error booleans
are unobserved. That is why the test pins matter, and why they must be
fixed, not deleted.) `parsebindings.test.mjs` → 22 pass, 0 fail
(re-ran). No seed/step/coordinate read.

## Actionable C-wrongs

1. `parsebindings` extcmd-miss arm returns `ret`, C returns FALSE
   (`options.c:7670–7671`): after the `config_error_add("Unknown key
   binding command ...")`, `return false` (keep `return ret` for the hit
   path). Fix the two test pins (`"a:boguscmd"`, `"mouse1:boguscmd"` →
   `false`) and re-run 22/22 + neighbor suites. One port iter.
   → Must-fix (prepended).

Verdict: **QUALITY-RISK**
