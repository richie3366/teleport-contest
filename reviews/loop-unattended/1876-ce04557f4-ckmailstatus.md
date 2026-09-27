# Review 1876 — ce04557f4 — ckmailstatus (D-2917)

- SHA: `ce04557f4` (coverage; UNIX `mail.c` `ckmailstatus`, plus `getmailstatus` / `free_maildata`)
- Files: `js/mail.js` (bodies), `js/allmain.js` (`moveloop_core`), `js/jsmain.js` (startup)
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: the only `getRngLog` hit is the pre-existing `jsmain.js` import in hunk context, not a new call. No `FORCE`, `DIAG`, `fastforward`, or seed names. `imports.mjs --rulecheck`: "Rule #2 clean: no bare/node specifiers or fs calls in js/."
- `sym.mjs`:

```
ckmailstatus     js/mail.js:584   ASYNC — await required
getmailstatus    js/mail.js:539   sync
free_maildata    js/mail.js:526   sync
newmail          js/mail.js:408   ASYNC — await required
ck_server_admin_msg NOT EXPORTED — 1 local js/mail.js:575
```

`ck_server_admin_msg` is the file-local function. One local is that function. `newmail` is awaited.

## Intent vs deliverable

Subject promises the UNIX `ckmailstatus` (`mail.c:549–584`), `moveloop` calling it when `multi == 0` before `rhack(0)`, and `getmailstatus` before `set_playmode`. The diff does that. `stat` is a VFS read. `newmail` is the existing async export.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `ckmailstatus` | async export `mail.js:584` | `mail.c:549–584` (UNIX) |
| `ck_server_admin_msg` | file-local empty `mail.js:575` | `mail.c:684–700`, body empty |
| `getmailstatus` | export `mail.js:539` | `mail.c:96–141` |
| `free_maildata` | export `mail.js:526` | `mail.c:89–94` |
| `vfsStat` / `vfsStatInto` | file-local | `stat()` into `nmstat` / `omstat` |
| `flagsBiff` | file-local | `flags.biff` (`options.js` stores `flags.mail`) |
| `nh_getenv` | file-local | `nh_getenv("MAIL")` |
| caller | `allmain.js:1408` | `allmain.c:534` |
| startup | `jsmain.js:237` | `unixmain.c:189` |

`csym` also prints the uncompiled bodies at `mail.c:460–479` (`!UNIX`) and `:743–760` (VMS). `config.h:18` defines `UNIX`. `unixconf.h:146` defines `MAIL`. `MAILCKFREQ` is 50 (`unixconf.h:204`).

## C ↔ JS fidelity

`ck_server_admin_msg` runs first. `SERVER_ADMIN_MSG` is commented out (`unixconf.h:212`), so the compiled function is empty. JS is an empty function, called.

Return when `!mailbox || u.uswallow || !flags.biff || moves < laststattime + 50`. Then `laststattime = moves`. Failed `stat` sets `nmstat.st_mtime = 0` (`PERMANENT_MAILBOX` undefined, so no pline and no `free_maildata`). Newer `st_mtime` with `st_size` calls `newmail` of `MSG_MAIL` / `"I have some mail for you"` (`NO_MAILREADER` is commented out), then `getmailstatus` in both the size and the zero-size arms. JS does that. `newmail` reads `message_typ`, `display_txt`, `object_nam`, `response_cmd`.

`getmailstatus`: if `mailbox` is already set, skip setup. Else `nh_getenv("MAIL")` and keep that string (`dupstr`). Then `stat` into `omstat`; failure zeroes `st_mtime` only. `debugpline3` is a no-op unless `DEBUG`. JS matches those arms.

The `MAILPATH` else is compiled on this tree: `mail.c:76–77` sets `MAILPATH` to `"/var/spool/mail/"` because `unixconf.h:41` defines `LINUX`, then `getmailstatus` (`:116–123`) appends `getpwuid()->pw_name`. JS leaves `mailbox` null when `MAIL` is unset. That arm is named in `turns.md` and in the subject (no passwd database). It is not compiled out.

`moveloop`: C calls `ckmailstatus` only in the `multi == 0` arm (`allmain.c:532–536`), then `rhack(0)`. The `multi < 0` arm and `run` / `search` do not. JS gates the call with `multi === 0` inside the existing else that already ends in `rhack(0)`. `jsmain` calls `getmailstatus` before `set_playmode`, matching `unixmain.c:189–193`. `readmail` calls it after the message flush (`mail.c:732`); the `child` / `execl` above that call stays the D-1958 omit.

`free_maildata` clears `mailbox`. Live C calls are the `PERMANENT_MAILBOX` sites (`mail.c:136`, `:565`), which are not compiled, and `save.c:1082` `freedynamicdata`, which has no JS binding (named). `libnhmain.c:220` is the same `getmailstatus` call in the library entry; this build's startup is `unixmain.c`.

A present VFS key gets `st_size` = text length and `st_mtime` = 1. A second stat of the same key is not newer, so a spool that exists at the first `getmailstatus` never takes the `newmail` arm. The subject names that. A key that appears later goes from mtime 0 to 1 and does deliver once.

## Hallucinations / overclaim

The subject does not claim the `getpwuid` arm shipped. It names the `!UNIX` and VMS bodies as compiled out, which matches `config.h`. The dead `st_mtime` comparison for a stable VFS file is named, not sold as OS `stat`. `ck_server_admin_msg` is the empty compiled function, not a stub of the `#ifdef SERVER_ADMIN_MSG` block.

## Density

One C function plus the two helpers it needs (`getmailstatus`, `free_maildata`) and the empty admin check. The `MAILPATH` else is a named omit, not a TODO inside the `newmail` arm. Callers that this build compiles are wired.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify ckmailstatus --base ce04557f4~1 --reach-all`.

```
verify ckmailstatus: baseline ce04557f4~1 (scoreboard at a4cc08e9a, 2026-09-27T00:53:36.087Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify ckmailstatus: no corpus session is blocked on it at ce04557f4~1 — a vacuous verify is NOT a corpus PASS. …
smoke ckmailstatus: no RNG-tagged reach; fixed smoke spread (12 run, 3.5s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. The D-log's green, strict, cohort, and full 44/44 are the port's own verify line.

## Actionable C-wrongs

None. The guard, the failed-stat mtime, and the `MSG_MAIL` delivery match `mail.c:554–582`. The spool path from `getpwuid` is the named omit.

Verdict: **ACCEPT**
