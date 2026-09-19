# Review 1558 — 98667b02 — `mail.c` read_simplemail whole-body port (D-2599)

- Commit: `98667b02` (2026-09-20) — "`mail.c` read_simplemail whole-body port (compiled-out SIMPLE_MAIL body, VFS spool read) (D-2599)."
- Queue row: coverage MISSING (no same-named JS symbol).
- JS touched: `js/mail.js` only (105 insertions, 2 deletions).

## Intent vs deliverable

Subject promises the SIMPLE_MAIL source-level body with a VFS spool read. Diff actually delivers: exported async `read_simplemail(mbox, adminmsg)` in C order + module-local `fgets128_chunks`, lock arms as named omits, VFS read/delete, no JS callers (matching C, whose callers are compiled out). The "compiled-out" framing is honest and verified below. Promise matches diff.

## Inventory

New: `read_simplemail` (exported), `fgets128_chunks` (module-local). New import: `vfsReadFile, vfsDeleteFile` from storage.js. No symbols deleted.

## C ↔ JS fidelity

C locus: `nethack-c/upstream/src/mail.c:588–680` (csym; body `:591–680`). Guard: `#if defined(SIMPLE_MAIL) || defined(SERVER_ADMIN_MSG)` (`mail.c:586`); both flags commented out (`unixconf.h:200/211`) — verified, so this build compiles neither the body nor the callers (`:696` adminmsg=TRUE, `:710` `readmail` FALSE). Porting it is dead-code by build, live-by-source — labeled as such; legitimate coverage (a live target for the scroll-mail path, zero behavior change since no JS callers exist either).

Arm-by-arm confirm (SIMPLE_MAIL arms):

- fopen→bail (`:591/:598–599`): `vfsReadFile` returns null on miss, never throws (`js/storage.js:27–33` — verified), so `text == null → bail` ≡ `!mb → goto bail`. Rule #2 clean (VFS, never `fs`; fopen_wizkit precedent cited).
- Lock arms (`:594–596`, `:601–606`, `:611–613`, `:622–627`, `:656–669`): named omit — advisory `fcntl` locking is meaningless for a single-threaded loop with an atomic VFS read; the `:607–613` block-gate therefore never fires (lock-success path). Legitimate OMIT.
- fgets loop (`:615`): `fgets128_chunks` yields ≤127-char chunks cut after `\n` with the newline kept — exactly `fgets(buf,128)` semantics, including the empty-file (zero chunks ≡ immediate NULL) and unterminated-tail cases.
- There nother-gate (`:628–629`, !adminmsg only) ✓; first-colon split (`:631`, `indexOf` ≡ `strchr`) ✓; `msglen < 3 → bail` (`curline.length - colon < 3` ≡ `strlen(msg) < 3`) ✓.
- Newline kill (`:636–638`): `slice(colon+1, -1)` kills the chunk's last char unconditionally — matching C, which kills `msg[msglen-1]` even when fgets split a long line mid-message (comment correctly notes both cases).
- endpunct (`:641–643`): `msg[msg.length-1]` ≡ C `msg[msglen-2]` post-kill last char (index arithmetic verified equal) ✓.
- adminmsg voice-of vs from/reads/quoted plines (`:645–653`) ✓; `seen_one_already` set after plines ✓.
- Tail (`:670–674`): adminmsg → `flush_topl_more()` for `display_nhwindow(WIN_MESSAGE, TRUE)` (live async `js/display.js:7354`, awaited; dig.js precedent) ✓; else → `vfsDeleteFile(mbox)` for `unlink(mailbox)` — C unlinks the global, but the only FALSE caller (`:710`) passes `mailbox` itself as `mbox`, so the passed path doubles as the global (stated in-body). `getmailstatus` mailbox-global stays a named omit (readmail D-1958 line) ✓.
- bail: gibberish only when !adminmsg, skips close/unlink/flush like C (which even leaks the FILE on mid-loop bail) ✓.

Callers: none in JS — correct, since both C callers are compiled out. "Both C callers compiled out" named in this commit ✓.

Callee closure: There/pline/urgent_pline/flush_topl_more (LIVE display imports), vfsReadFile/vfsDeleteFile (LIVE storage). One correction to the D-log: the mail→storage edge is NEW in this commit (parent `mail.js` has zero storage imports; `--can` says ALREADY only on the working tree). It is still safe — `storage.js` is a dependency leaf, bindings are hoisted functions read at call time, and green+smoke pass — but the "ALREADY, no new edge" phrasing is inaccurate. Not a C-wrong (no behavior impact); noted for precision.

## Hallucinations / overclaim

None material (see edge note above). No dispatch-over-stub; no "Match C" overstatement — the compiled-out status is front and center.

## Density

105 insertions for a 93-line C body, one module — right-sized.

## Verification

- Banned-pattern grep (incl. `readFileSync`/`fs`/`node:`): 0. `imports.mjs --rulecheck` (this review): clean.
- Re-ran here: `hidden-proxy.mjs verify read_simplemail --base 98667b02~1 --reach-all` → 0 blocked at parent (vacuous note, pre-stated) + smoke 24/24 REACH-OK. Matches D-log.

## Cited evidence

C loop core (`mail.c:615–643`, verified against `js/mail.js:341–363`):

```c
while (fgets(curline, 128, mb) != NULL) {
    const char *endpunct;
    int msglen;

    if (!adminmsg) {
#ifdef SIMPLE_MAIL
        fl.l_type = F_UNLCK;
        fcntl(fileno(mb), F_UNLCK, &fl);
#endif
        There("is a%s message on this scroll.",
              seen_one_already ? "nother" : "");
    }
    msg = strchr(curline, ':');

    /* if incorrectly formatted, or message is empty (':' and '\n' take
       up 2 chars, so must have at least 3 to be nonempty), give up */
    if (!msg || (msglen = (int) strlen(msg)) < 3)
        goto bail;

    *msg = '\0';
    msg++, msglen--;
    msg[msglen - 1] = '\0'; /* kill newline */

    /* supply ending punctuation only if the message doesn't have any */
    endpunct = "";
    if (!strchr(".!?", msg[msglen - 2]))
        endpunct = ".";
```

Compiled-out proof: `#if defined(SIMPLE_MAIL) || defined(SERVER_ADMIN_MSG)` at `mail.c:586`; `unixconf.h:200` (`/* #define SIMPLE_MAIL */`) and `:211` (`/* #define SERVER_ADMIN_MSG "adminmsg" */`) both commented. Callers `:696` (TRUE) / `:710` (`readmail`, FALSE) inside the same ifdefs — verified by sed.

VFS miss semantics (`js/storage.js:27–33`, the fopen-NULL equivalence):

```js
export function vfsReadFile(path) {
    const s = storage();
    if (!s) return null;
    try {
        const v = s.getItem(VFS_PREFIX + path);
        return v !== null ? v : null;
    } catch (e) { return null; }
```

Callee closure for this SHA:

| Callee | Status | Evidence |
|--------|--------|----------|
| vfsReadFile / vfsDeleteFile | LIVE | `js/storage.js:27/:43`; miss returns null, never throws |
| There / pline / urgent_pline / flush_topl_more | LIVE | display.js imports (`js/mail.js:19–22`); flush `js/display.js:7354 ASYNC` |
| fcntl / flock / getmailstatus | OMIT (named) | single-threaded + atomic VFS read; mailbox-global on the D-1958 line |
| both C callers | compiled out (named) | no JS callers — `grep read_simplemail(` finds only the def |

Tool outputs pasted (required):

```
$ node scripts/imports.mjs --can mail.js storage.js vfsReadFile
ALREADY: mail.js already statically imports storage.js. No new edge needed.
$ node scripts/sym.mjs flush_topl_more
flush_topl_more  js/display.js:7354   ASYNC — await required
$ node scripts/hidden-proxy.mjs verify read_simplemail --base 98667b02~1 --reach-all
verify read_simplemail: baseline 98667b02~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke read_simplemail: no RNG-tagged reach; fixed smoke spread (24 run, 3.4s): 24 PASS, 0 regressed → REACH-OK
```

Precision note (kept): the mail→storage edge is new at this commit (parent `mail.js` has zero storage imports) — safe regardless (`storage.js` is a dependency leaf, hoisted bindings, green+smoke pass).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
