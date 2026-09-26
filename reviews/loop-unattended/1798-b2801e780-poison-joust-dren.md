# Review 1798 — b2801e780 — poison, joust, bare hands, AD_DREN (D-2839)

- SHA: `b2801e780` (coverage; `uhitm.c` `hmon_hitmon_poison` and the joust / bare-hand / `AD_DREN` siblings)
- Files: `js/uhitm.js`, `js/mhitm.js`, `js/mhitu.js`
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, seed, or `fastforward` in the hunk. `imports.mjs --rulecheck`: "Rule #2 clean".

## Intent vs deliverable

Subject promises `hmon_hitmon_poison` after damage recalc, `joust` plus `hmon_hitmon_jousting` instead of stagger or knockback, `hmon_hitmon_barehands` with gloves and silver rings, and one `mhitm_ad_dren` that zeroes leftover damage on every arm. The diff is those functions, `mhurtle_to_doom`, `xdrainenergym`, the ring `hmon_hitmon_msg_silver` call, and the three `AD_DREN` dispatch sites. The old `mhitm_ad_dren_u` is deleted.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `hmon_hitmon_poison` | `uhitm.js:1549` | `uhitm.c:1510–1538` |
| `joust` | local, C is `static` | `uhitm.c:2096–2129` |
| `hero_Stunned` | local clone of the macro | `youprop.h:81` `Stunned` is `HStun` |
| `hmon_hitmon_jousting` | `uhitm.js:1635` | `uhitm.c:1541–1567` |
| `mhurtle_to_doom` | local | `uhitm.c:1942–1958` (cited in the function) |
| `hmon_hitmon_barehands` | `uhitm.js:1582` | `uhitm.c:838–882` |
| `hmon_hitmon_msg_silver` | local; rings call it | `uhitm.c:1663–1699` |
| `special_dmgval` | LIVE `weapon.js:694` | gloves / rings |
| `mhitm_ad_dren` | async `mhitm.js:4217` | `uhitm.c:2418–2442` |
| `xdrainenergym` | async `uhitm.js:3596` | `mhitm.c:1460–1470` |
| `drain_en` | LIVE async `trap.js:2827` | hero-defender arm |
| `Fumbling` | LIVE `attrib.js:1013` | joust gate |

`sym.mjs`:

```
xdrainenergym    js/uhitm.js:3596   ASYNC — await required
mhitm_ad_dren    js/mhitm.js:4217   ASYNC — await required
drain_en         js/trap.js:2827   ASYNC — await required
joust            NOT EXPORTED — local js/uhitm.js:1523
hero_Stunned     NOT EXPORTED — local js/uhitm.js:1512 (also js/dbridge.js:405)
```

`imports.mjs --can mhitm.js uhitm.js xdrainenergym` and `mhitm.js trap.js drain_en`: `ALREADY`.

## C ↔ JS fidelity

`csym` callers: `hmon_hitmon_poison` is `uhitm.c:1810` after `hmon_hitmon_dmg_recalc` when `hmd.ispoisoned`. JS calls it only when the melee context set `ispoisoned` and `obj` is present, after recalc, before the shade floor. Thrown ammo/missile with `opoisoned && is_poisonable`, and `permapoisoned && dieroll <= 5`, set that flag (`uhitm.c:1048–1066`). `nopoison` is `10 - owt/10`, at least 2. Samurai `You` + `adjalign(-sgn(type))`, else lawful record above −10 `You_feel` + `adjalign(-1)`. Then `!permapoisoned && !rn2(nopoison)` clears `opoisoned` and sets `unpoisonmsg`. Resist sets `needpoismsg`. Else `rn2(10)` adds `rnd(6)`, else `poiskilled`. Those messages run after the hit line; a poison kill is `xkilled` and the unpoison line still prints. That order matches `:1515–1537` and the post-hit block the caller already had.

`joust` (`uhitm.c:1043`, body `:2098–2129`): `Fumbling || Stunned` returns 0. `Stunned` is `HStun`. `hero_Stunned` is `u.HStun` or `uprops[STUNNED].intrinsic`. Not wielded (and not the offhand while twoweapon) returns 0. `u.utrap` returns 0. Skill is the lance, or two-weapon if that is worse. `P_ISRESTRICTED` becomes `P_UNSKILLED`. `rn2(5) < skill` is a joust. `rn2` 0 and `rnl(50) == 49` and not `unsolid` and not `obj_resists(obj, 0, 100)` returns −1. Otherwise 1. A miss returns 0. The `rnl` / `obj_resists` calls are inside that `&&`. A non-zero result sets `train_weapon_skill`. `hmon_hitmon_jousting` adds `d(2, obj == uwep ? 10 : 2)`, the joust line, `first_weapon_hit` when `weaphit <= 1`, and on −1 clears twoweapon, `uwepgone` for `uwep`, the shatter line, and `useup`. Then `mhurtle_to_doom`. `hittxt` is set. A non-zero `jousting` skips stagger and the knockback flag (`:1825–1832`).

`hmon_hitmon_barehands` (`:1393`): shade damage stays 0; else `rnd(2)` or `rnd(4)` when `martial_bonus()`, and skill flags when damage is above 1. `spcdmgflg` is gloves, else the right ring on hit 0 or 1 and the left ring on hit 0 or 2. `special_dmgval` writes `silverhit_p.v`. The switch stores 1 or 0, never 2. `silvermsg` follows. The ring pline is `hmon_hitmon_msg_silver` when that count is above 0. Flesh is appended for a corporeal target before the pline, which is where C's `s_suffix` lands (`:1694` after the format choice). Weapon and misc `silvermsg` still do not call it. Named.

`mhitm_ad_dren` (`uhitm.c:2418–2442`): `mhitm_mgc_atk_negated(..., FALSE)` runs before the arms, so its `rn2(10)` burns even when `rn2(4)` will not. Hero attacker: `!negated && !rn2(4)` then `xdrainenergym(mdef, TRUE)`, damage 0. Hero defender: `hitmsg`, then `drain_en(damage, FALSE)`, damage 0. JS passes `null` for the hero so `magic_negation_you` runs; C's `magic_negation(&youmonst)` is that. Monster vs monster: `xdrainenergym` with `vis && canspotmon && aatyp != AT_ENGL`, damage 0. Callers: `mhitm.js` `mdamagem` (`:4808`), `mhitu.js` `mhitm_adtyping_u`, `uhitm.js` hero `AD_DREN`. `xdrainenergym` (`mhitm.c:1460–1470`): `mspec_used < 20` and `AT_MAGC` or `AT_BREA` (`attacktype_fordmg` with `AD_ANY`), then `d(2, 2)` and the lethargy line. `gulpum` `:5174–5177` still calls `xdrainenergym` itself. Named.

`hmon_hitmon_stagger` (`:1570–1584`) still returns `hittxt` without the `canspotmon` pline or `mhurtle_to_doom`. The non-shade `get_dmg_bonus` bump to 1 (`:1817`) still forces 0. Both are named.

## Hallucinations / overclaim

The subject says poison runs after recalc when melee set `ispoisoned`. The flag is set in the melee tail and the call is after `hmon_hitmon_dmg_recalc`. It says joust replaces stagger and knockback. The `if (jousting)` arm does. It says every `AD_DREN` arm zeroes damage. All three do. It does not claim stagger, weapon silver, or the shade bump were finished.

## Density

Poison, the lance joust pair, bare hands, and `AD_DREN` are one hit-resolution family. The line count is those bodies plus the three dispatch sites.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify hmon_hitmon_poison --base b2801e780~1 --reach-all`.

```
verify hmon_hitmon_poison: baseline b2801e780~1 (scoreboard at 8e53e2c60) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke hmon_hitmon_poison: no RNG-tagged reach; fixed smoke spread (12 run, 3.4s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. D-2839's green, strict, and cohort were not re-run here. The commit's full `sessions` 44/44 is the public suite, not this reach line.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
