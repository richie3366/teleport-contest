# Private C-recorder sessions

Local oracles. **Not** the public contest set. Do not add these files to
`sessions/manifest.json`. Cadence `node frozen/ps_test_runner.mjs sessions`
must stay the public 44.

Score one:

```bash
node frozen/ps_test_runner.mjs private-sessions/<name>.session.json
node scripts/rng-diff.mjs private-sessions/<name>.session.json
```

Banner `built <date>` differs between the C binary and JS; that is not a
port bug. Elide it before treating a screen miss as gameplay.

Do not hardcode this seed, recorded coordinates, or RNG indices into `js/`.
