# Review 151 — 15dddffe — cmd.c rhack Unknown command `visctrl` (D-1189)

## Metadata
- Full / short hash: `15dddffe76c39e7476200b4371264730a398206f` / `15dddffe`
- Parent: `3d33f603` (review **147–150** + cadence #1510). This file audits **this SHA only**. Archive row **Addressed:** D-1189 `15dddffe` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-18 00:36:28 +0200
- D-id: **D-1189**
- Stats: 10 files, +96 / −47 — `js/cmd.js` +5 / −1 (import `visctrl` + unknown-command interpolation).
- Claims to close: Must-fix human canary seed8243 leftover @117 `Unknown command '^C'` vs JS raw ETX, queued by review **150** / D-1188 next-port. `reviews/loop-2026-08-15/` has no unpaid `visctrl` Must-fix.
- JS / map: `cmd.js` `rhack` unknown arm; callee `dokeylist.js` `visctrl` (pre-existing). `c-js-map/turns.md` `cmd.c`. `custompline(SUPPRESS_HISTORY)`, `cmdq_clear(CQ_REPEAT)`, `sanity_no_check` still named.
- Prior reviews this SHA claims to close: **150** next-port `visctrl` `^C`.

## Intent vs deliverable

Git subject promises: “Match C cmd.c rhack Unknown command visctrl so Ctrl-C prints ^C instead of raw ETX.”

Old JS interpolated `ch = String.fromCharCode(key)` into ``Unknown command '${ch}'.``. For Ctrl-C, `key === 3`, so the topline carried a raw ETX instead of C’s `^C`.

The diff **does** import existing `dokeylist.js` `visctrl` and interpolate `visctrl(key)` (the numeric code, not `ch`). It does **not** pull `custompline(SUPPRESS_HISTORY)`, `cmdq_clear(CQ_CANNED|CQ_REPEAT)`, or `iflags.sanity_no_check`. Named. It does **not** pull `maybe_smudge_engr` or `kill_genocided`.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `rhack` unknown arm | C site, **changed** | `cmd.c:3833–3834` |
| `visctrl` | C callee, **imported** | `hacklib.c:469–493`; `dokeylist.js:40–55` |
| `custompline(SUPPRESS_HISTORY)` | C, **named omit** | JS `pline` (history still records) |
| `cmdq_clear` / `sanity_no_check` | C, **named omit** | after the pline |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean.

**New RNG on this path:** none. Path **public-unhit** unless a session types an unbound key (Ctrl-C on the private canary).

Grep of this SHA’s `js/` hunks: no banned gates.

## Constitution / playbook

No trace-index gate, no recorded coordinate, no `fastforward` write, no seed name in control flow. Contest Rule #2: the new import is `./dokeylist.js`, not `fs` / `node:*`. Frozen `isaac64.js` / `terminal.js` / `storage.js` untouched. Anti-pattern “pretty-print from the canary” would have been hardcoding `'^C'` when `key===3` — this SHA did not do that.

## C ↔ JS fidelity

### Call site vs `cmd.c:3829–3842`

C: after the extcmdlist walk fails, `bad_command = TRUE`; then

```
if (bad_command) {
    custompline(SUPPRESS_HISTORY, "Unknown command '%s'.", visctrl(key));
    cmdq_clear(CQ_CANNED);
    cmdq_clear(CQ_REPEAT);
    iflags.sanity_no_check = iflags.sanity_check;
}
svc.context.move = FALSE;
gm.multi = 0;
```

JS (`cmd.js:1595–1604`) already cleared forcefight / run / command_count / `_repeat_search` and set `move = 0` in this arm (pre-existing; C’s `reset_cmd_vars` / `end_running` live on other unknown paths). The **string** is now `Unknown command '${visctrl(key)}'.`. `key` is the numeric `nhgetch` / `get_count` result (`cmd.js:1071–1153`), not the `ch` string. Match the canary character.

`custompline(SUPPRESS_HISTORY)` vs `pline`: the current topline is the same text. History would keep a JS unknown-command that C would not. Named; canary screens the live line. Not Must-fix.

### `visctrl` vs `hacklib.c:469–493`

Pinned C (`hacklib.c:477–492`):

```
    if ((uchar) c & 0200) {
        ccc[i++] = 'M';
        ccc[i++] = '-';
    }
    c &= 0177;
    if (c < 040) {
        ccc[i++] = '^';
        ccc[i++] = c | 0100; /* letter */
    } else if (c == 0177) {
        ccc[i++] = '^';
        ccc[i++] = c & ~0100; /* '?' */
    } else {
        ccc[i++] = c; /* printable character */
    }
```

JS (`dokeylist.js:40–55`): `c = c & 0xff`; high bit `M-` then `c &= 0x7f`; `c < 0x20` → `^` + `(c | 0x40)`; `0x7f` → `^?`; else `fromCharCode`. Octal `0200/0177/040/0100` are `0x80/0x7f/0x20/0x40`. **Call-for-call match.**

Ctrl-C: `key === 3`, `3 < 0x20`, `3 | 0x40 === 0x43` → `^C`. C same. This is **not** “Match C dispatch, callee is a stub”: `visctrl` is the real `hacklib.c` function, already used by `dokeylist` / `key2txt`.

Passing `ch` (the one-char string) would be a C-wrong: `'\x03' & 0xff` is `0` (`ToNumber` → `NaN`). This SHA passes `key`. Do not “fix” it to `visctrl(ch)`.

| Case | C | JS after |
|------|---|---------|
| Ctrl-C (`key===3`) | `Unknown command '^C'.` | **same** |
| printable unbound | `visctrl` of that byte | **same** |
| DEL 127 | `^?` | **same** |
| high-bit | `M-` + 7-bit form | **same** |
| message history | suppressed | **named** `pline` |
| `cmdq_clear` / sanity skip | yes | **named skip** |

No RNG in `visctrl`.

C `visctrl` rotates `VISCTRL_NBUF` static buffers so nested `custompline` arguments do not alias. JS returns a fresh string. Observable match for a single `'%s'`. Do not invent a ring buffer in `dokeylist.js` to “match” that.

`rhack` entry (`cmd.js:1110–1153`): `key === 0` is canned / `get_count`; the unknown arm runs only after the bound-key walk. C `key` is the same command byte (`allmain.c` `rhack(0)` then `cmd_key`). Ctrl-C is not remapped to a string before this arm. Match.

JS already printed `Unknown command '${ch}'.` for space when `!rest_on_space`. `visctrl(32)` is a space (printable). C same. The canary is Ctrl-C, not space.

Prefix-error `which` in D-1186 still hardcodes `'g'`/`'G'` from `run===3`. That site does **not** use this import. Do not fold prefix `visctrl(cmd_from_func)` into this SHA — review **148** named that as out of envelope.

## Hallucinations / overclaim

D-log / CURRENT / subject say Ctrl-C prints `^C` via `visctrl(key)` instead of raw ETX. **That is the hunk.** Stamping **Addressed:** D-1189 is fair. This is **not** “Match C dispatch, callee is a stub.” Do **not** stamp “Match C `custompline(SUPPRESS_HISTORY)`” or “Match C `cmdq_clear`.”

Review **150** said the leftover canary @117 was this site and that `dokeylist.js` `visctrl` already existed. This SHA is that one-line wire. Not `maybe_smudge_engr`. Not `kill_genocided`.

### Clone classification (this SHA)

- `visctrl` — C function, imported, live, matches `:469–493`.
- Unknown-command pline — C site, interpolation only.
- No new clone. No no-op helper.

## Density

Five scored lines. §2b “one deferred if” is too small as a map peel; this was the **Must-fix** canary leftover after D-1188, and the C site is one `custompline`. Right-size for that queue row. Did not pull `kill_genocided` into the same SHA.

Canary leftover after this SHA is gone (Scr 129/129). Public 44 never types Ctrl-C. Verification is the private recording plus green/cohort, not a new public session.

## Verification

Journal: private canary Scr **129**/129 RNG **2768**/2768; green+strict seed8000/0900; cohort **18**/18 (1500/1800/0060/0102/0700/1150/0017/0009/0012/0015/0361/2200/4500/0002/0014/0367/0108/2600) + strict 1500/1800/2200/0009/0361/0012. Cadence **#1515** (this review) full `sessions` **44**/44 Scr **11405**/11405 RNG **792838**/792838 (100%) speed `32+0.27/turn` (R² 0.875) on `cf9eb066` — fortress held.

Grep of `git show 15dddffe -- js/`: no FORCE/DIAG/`getRngLog`/`readFileSync`/`fs`/`node:`/`fastforward`/seed names/hardcoded coordinates.

C read of `cmd.c:3833–3834`, `hacklib.c:469–493`. JS SHA `rhack` unknown arm + `dokeylist.js` `visctrl`.

`dokeylist.js` `key2txt` (`:57–65`) still maps space/esc/enter/del to angle-bracket names, then falls through to `visctrl`. The unknown-command arm does **not** use `key2txt` — C `:3834` is `visctrl` only. Ctrl-C via `key2txt` would still be `^C` (`3` is not 32/27/10/13/127). Do not switch the unknown arm to `key2txt` to “pretty-print” space; C would then say `Unknown command ' '.` not `<space>`.

## Actionable C-wrongs

None that Must-fix this next iter. The Open/Must-fix `^C` string matches `:3834`.

Named omits / do-nots (map, not new prepends):

1. `custompline(SUPPRESS_HISTORY)` — unknown-command stays out of C message history.
2. `cmdq_clear(CQ_CANNED)` / `CQ_REPEAT` / `sanity_no_check`.
3. Do not pass `ch` into `visctrl`. Do not pull `maybe_smudge_engr`. Next map work after this window is already Open (`deliver_obj_to_mon`), not another rhack peel.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: the unknown-command arm now formats the key with C’s `visctrl`, so Ctrl-C is `^C` instead of raw ETX.
- Must-fix stays empty for this SHA; archive hash `15dddffe` already filled. Not `kill_genocided`, not `SUPPRESS_HISTORY`.
