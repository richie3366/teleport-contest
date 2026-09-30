# Review 2138 — 232081f95 — CRLF and bounded string length

SHA `232081f95`, D-3178; 2026-09-30; +45 JS. No closure claimed.

## Intent vs deliverable

“String-buffer CRLF expansion and bounded Strlen” adds two exports beside
existing strbuf helpers. No caller/import replacement or removed symbol.

## Inventory — strbuf_nl_to_crlf

New whole export; strbuf_reserve is existing LIVE C callee, strings replace
buffer allocation/ownership. No no-op or divergent helper introduced.

## C ↔ JS fidelity — strbuf_nl_to_crlf

strutil.c:57–77: non-null guard, scan to first NUL, count every LF, reserve
len+count+1 only when needed, backwards copy including terminator, insert
CR and decrement count match. Existing CRLF becomes CRCRLF like C;
no-newline path retains buffer. Reserve :27–45 books initial/grown capacity.
No RNG. Callers query finds only comment/prototype: no production C caller
to wire, and none invented.

## Inventory — Strlen_

New whole export; panic represented by named nonreturning Error, not
silently dropped. No clone of an existing export.

## C ↔ JS fidelity — Strlen_

strutil.c:80–98 bounded loop checks character before increment, stops at
NUL, rejects length exactly 32767, returns unsigned. Probe 32766 succeeds;
32767 throws `probe:4 string too long`, preserving formatted source/line.
C panic subsystem and global.h:288 Strlen macro integration are explicitly
map-named missing; JS `.length` callers are not falsely claimed wired.
No RNG; callers query shows macro/prototypes only for this spelling.

## Hallucinations / overclaim

“Whole bodies” is supported within the named panic/macro adaptation.
No dispatch/stub claim. No removed/repointed symbol requiring sym output.
Diff FORCE/DIAG/getRngLog/seed/fastforward/coordinate scan empty; full
Rule #2 check clean. No import or cycle-forced clone claim.

## Density

- Ledger: strbuf_nl_to_crlf ported — ACCEPT.
- Ledger: Strlen_ partial — ACCEPT-WITH-DEBT.

Below 80 JS insertions, but remaining same-file functions already resolve:
strbuf_init/append/reserve/empty in options, pmatch/pmatchi/internal in cmd.
No eligible missing sibling concealed. Two whole functions, each its own
Ledger/Verify entry; no Must-fix bundled.

## Verification

Historical `verify strbuf_nl_to_crlf,Strlen_ --base 232081f95~1 --reach-all`:

```text
verify strbuf_nl_to_crlf: 0 blocked (vacuous)
smoke strbuf_nl_to_crlf: 24 PASS, 0 regressed → REACH-OK
verify Strlen_: 0 blocked (vacuous)
smoke Strlen_: 24 PASS, 0 regressed → REACH-OK
```

Independent probes confirm empty, LF, existing CRLF, embedded NUL and
32766/32767 boundary. D-log green/strict, cohort 7/7, full 44/44;
no hidden PASS/movement claimed from zero blocks.

## Actionable C-wrongs

None newly found; panic subsystem/macro integration remain named omissions.

Verdict: **ACCEPT-WITH-DEBT**
