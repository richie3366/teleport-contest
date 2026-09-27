# Review 1921 — a6c00e025 — get_rnd_text (D-2962)

- SHA: `a6c00e025` (coverage; `rumors.c` `get_rnd_text` and callee `get_rnd_line`)
- Files: `js/rumors.js` rewrites the picker. `js/engrave.js` and `js/do_name.js` pass the C file names and pad constants.
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` hunks. `imports.mjs --rulecheck`: "Rule #2 clean: no bare/node specifiers or fs calls in js/."
- No import was re-pointed. The three callers dropped the raw-buffer imports. `sym.mjs`:

```
get_rnd_text     js/rumors.js:137   sync
get_rnd_line     NOT EXPORTED — local js/rumors.js:87
unpadline        NOT EXPORTED — local js/rumors.js:51
embed_fgets      NOT EXPORTED — local js/rumors.js:66
rnd_text_embed   NOT EXPORTED — local js/rumors.js:128
couldnt_open_file NOT EXPORTED — local js/rumors.js:276
xcrypt           js/rumors.js:34   sync
```

`get_rnd_line`, `unpadline`, and `couldnt_open_file` are `staticfn` in `rumors.c`. One file-local each. `embed_fgets` and `rnd_text_embed` are the dlb stand-ins, not a second copy of an export.

## Intent vs deliverable

Subject promises `get_rnd_text` on the embeds, a missing file calling `couldnt_open_file`, and `get_rnd_line` keeping the ten-try loop plus the read after it. The diff is that pair, `unpadline`, `embed_fgets`, and the three call sites. `dlb_*` stays off the scored filesystem.

## Inventory

| JS | Class | C |
|----|-------|---|
| `get_rnd_text` | live sync `rumors.js:137` | `rumors.c:499–526` |
| `get_rnd_line` | live file-local `:87` | `rumors.c:420–494` |
| `unpadline` | live file-local `:51` | `rumors.c:67–80` |
| `embed_fgets` | dlb stand-in `:66` | `dlb_fgets` into `BUFSZ` |
| `rnd_text_embed` | dlb stand-in `:128` | `dlb_fopen` |
| `xcrypt` | live sync `:34` | `hacklib.c` `xcrypt` |
| `couldnt_open_file` | live file-local `:276` | `rumors.c:769–782` |

## C ↔ JS fidelity

`rumors.c:505–524`. `dlb_fopen`, then `buf[0] = '\0'`. On success, one `dlb_fgets` skips the "don't edit" line, `dlb_fseek`/`dlb_ftell` set `starttxt`, `get_rnd_line(..., starttxt, 0L, padlength)`, then `dlb_fclose`. On failure, `couldnt_open_file`. No RNG in this function. The draw is inside `get_rnd_line`.

`global.h:41–42`: `MD_PAD_RUMORS` is 60 for rumors, epitaphs, and engravings; `MD_PAD_BOGONS` is 20. `js/const.js` has those values. `ENGRAVE_BUF` starts at ciphertext (`Om$equvaz…`), not a `#` line. The source `engrave.txt` comments are the makedefs input. `starttxt` 0 on that embed is the position after the skipped header. `endpos` 0 becomes `file.length` (`:89`), which is C's seek-to-EOF when `endpos` is 0 (`:435–437`).

`get_rnd_line` (`:464–492`). Each of up to ten tries calls `(*rng)((int) filechunksize)`, seeks to `startpos + offset`, and `fgets` the rest of that line. Accept when `padlength` is 0 or `strlen(buf) <= padlength + 1` (newline still counted). After the loop, if `ftell >= endpos` the `||` does not `fgets`; otherwise `fgets` the next line, and a failed read or a position already at `endpos` seeks to `startpos` and reads the first line. Then cut at newline, `xcrypt`, and `unpadline` only when `padlength` is non-zero. One `rng` call per try, none after the loop.

JS `:95–116` is that order. `embed_fgets` keeps the newline and stops at `bufsiz - 1` or `end`. The pad test uses that length before `xcrypt`. The post-loop read is skipped when `pos >= endpos`. A miss wraps to `startpos`. `unpadline` drops a leftover newline, then trailing `_`. `getrumor` (`rumors.c:167`) calls the same function on the true or false section buffer (`rumors.js:200`) with the defaults `rn2` and `MD_PAD_RUMORS`.

`do_name.c:1376` → `do_name.js:281` (`BOGUSMONFILE`, `rn2_on_display_rng`, `MD_PAD_BOGONS`). `engrave.c:58` → `engrave.js:221` (`ENGRAVEFILE`, `rn2`, `MD_PAD_RUMORS`). `engrave.c:1700` → `engrave.js:241` (`EPITAPHFILE`, `rn2`, `MD_PAD_RUMORS`). `extern.h:2809` is the prototype. `global.h:40` and `makedefs.c:1010` are comments. `csym` did not print the `get_rnd_line` body (the signature is split); the range above is the definition those three references sit on.

## Hallucinations / overclaim

The subject says no arm of the seek loop or the failed-file report is omitted. The ten tries, the accept test, the post-loop read, the wrap, and `couldnt_open_file` are present. It does not claim a live `dlb_fgets` of the comment; the embed has already dropped it, and the buffer confirms that. `couldnt_open_file` calls `impossible` without awaiting it. The success path does not yield. `MD_PAD_ENGRAVE` and `MD_PAD_EPITAPH` in the generated files are also 60; the callers now pass the C constant.

## Density

The coverage row asked for `get_rnd_text`. The body shipped with its callee `get_rnd_line`, which is the RNG. Not an arm peel. `outrumor` was already present and was not rewritten.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify get_rnd_text --base a6c00e025~1 --reach-all`.

```
verify get_rnd_text: baseline a6c00e025~1 (scoreboard at 78432069f, 2026-09-27T10:39:05.874Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify get_rnd_text: no corpus session is blocked on it at a6c00e025~1 — a vacuous verify is NOT a corpus PASS. …
smoke get_rnd_text: no RNG-tagged reach; fixed smoke spread (12 run, 3.2s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty blocked-line is the vacuous note. No `REGRESSED` session. The D-log's green, strict, and cohort are the port's own verify line; full suite was skipped because these files are not on the shared-file list.

## Actionable C-wrongs

None. The dlb calls are the named embeds. The header skip is the extractor, matched by a ciphertext start.

Verdict: **ACCEPT**
