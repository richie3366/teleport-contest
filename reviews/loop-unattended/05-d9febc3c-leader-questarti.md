# Review 05 — d9febc3c — special_obj_hits_leader urole.questarti (D-1044)

## Metadata
- Full / short hash: `d9febc3c2c00376f5207f0cf2a2161d3efc3e54c` / `d9febc3c`
- Parent: `0f1e7e1c` (reviews 03/04; no new Must-fix)
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-15 22:04:02 +0200
- D-id: **D-1044**
- Stats: 11 files, +185 / −119 — `js/dothrow.js` +18 (one helper + predicate)
- Claims to close: review 02 **item 3** (`special_obj_hits_leader` must use C `is_quest_artifact` / `urole.questarti`, not `u.questarti`). Stamped **Addressed:** D-1044 in that review (hash filled in this review commit).
- JS / map: `js/dothrow.js` only; `c-js-map/turns.md` dothrow row; cadence still **#1310**

## Intent vs deliverable

Git subject promises: “Match C special_obj_hits_leader is_quest_artifact so quest artifacts use urole.questarti not u.questarti.”

Review 02 found D-1041’s local clone:

```
qart = obj.oartifact && obj.oartifact === game.u?.questarti
```

`questarti` lives on **`gu.urole`** (`questpgr.c:69`), not `struct you`. `game.u.questarti` is unset, so the quest-artifact arm of the macro was dead. Unique/`oc_unique` and unknown fake Amulet still gated. A non-unique quest artifact thrown at the leader fell into the WEAPON `tmp >= rnd(20)` arm — C never rolls that d20 (`hmode != HMON_APPLIED`).

The diff **does** retarget the comparison to `game.urole.questarti`, switch fake-Amulet to an `otyp` index (C `obj->otyp == FAKE_AMULET_OF_YENDOR`), and leave unique / `leader_m_id` / APPLIED skip unchanged.

It does **not** port the catch / `finish_quest` / `addinv` body (still `msleeping=0`, clear `STRAT_WAITMASK`, `return false`). The subject does not claim that body. Named omit stays named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `is_quest_artifact` | clone of `questpgr.c:67–70` | local in `dothrow.js`; detect.js / dogmove.js already have the same comparison. **Not** imported from a shared module |
| `special_obj_hits_leader` | clone of `dothrow.c:1969–1972` macro | now calls the local clone; **exported** (private tests) |
| `FAKE_AMULET_OF_YENDOR` | otyp index | `objectNames.indexOf`; value 212 in generated table |
| unique / `leader_m_id` | pre-existing | `objects[].oc_unique`; `quest_status.leader_m_id` |

No new `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates in the JS hunk. Rule #2 clean. Frozen contracts untouched.

## C ↔ JS fidelity

### C macro + callee

C `dothrow.c:1969–1972` (undefined after `thitmonst`):

```
#define special_obj_hits_leader(obj, mon) \
    ((is_quest_artifact(obj) || objects[obj->otyp].oc_unique \
      || (obj->otyp == FAKE_AMULET_OF_YENDOR && !obj->known)) \
     && mon->m_id == svq.quest_status.leader_m_id)
```

C `questpgr.c:67–70`:

```
boolean
is_quest_artifact(struct obj *otmp)
{
    return (boolean) (otmp->oartifact == gu.urole.questarti);
}
```

Caller `dothrow.c:2104`: `if (hmode != HMON_APPLIED && special_obj_hits_leader(obj, mon))`.

JS `dothrow.js:447–462` after this SHA:

```
function is_quest_artifact(obj) {
    const want = game.urole?.questarti | 0;
    return want !== 0 && (obj?.oartifact | 0) === want;
}
export function special_obj_hits_leader(obj, mon) {
    const unique = !!(game.objects?.[obj.otyp]?.oc_unique);
    const fake = obj.otyp === FAKE_AMULET_OF_YENDOR && !obj.known;
    if (!(is_quest_artifact(obj) || unique || fake)) return false;
    const lid = game.quest_status?.leader_m_id | 0;
    return !!lid && (mon.m_id | 0) === lid;
}
```

JS caller `dothrow.js:538`: `hmode !== HMON_APPLIED` then the helper. **No RNG** in the predicate on either side.

### Branch-by-branch

1. **Quest artifact.** C: raw `oartifact == urole.questarti`. Old JS: `u.questarti` (always unset) **and** `obj.oartifact &&`, so `oartifact==0` never matched. New JS: `urole.questarti`. That is the queued C-wrong.

2. **`want !== 0`.** C has no such guard. C `role.c` gives every playable role a nonzero `questarti` (`ART_ORB_OF_DETECTION` … `ART_EYE_OF_THE_AETHIOPICA`). When JS `urole.questarti` is populated, `want !== 0` does not change the result: a real artifact id is never 0, so non-artifacts still fail the compare. When JS `roles.js` leaves `questarti` unset, `u_init.js` copies `role.questarti ?? 0`. Raw C compare would then treat **every** `oartifact==0` object as the quest item — worse than C Tourist, which has `ART_YENDORIAN_EXPRESS_CARD`. The guard is the same incomplete-data clamp already in `detect.js:216–218` and `dogmove.js:90–93`. D-log names remaining sparse `roles.js` fields. **Named omit of role-table fill, not a live peel of this helper.**

3. **`oc_unique`.** Unchanged. C `objects[obj->otyp].oc_unique`. JS `game.objects[obj.otyp].oc_unique`. Amulet of Yendor / invocation items still intercept without `questarti`.

4. **Fake Amulet.** C `otyp == FAKE_AMULET_OF_YENDOR && !obj->known`. Old JS compared `objectNames[otyp] === 'FAKE_AMULET_OF_YENDOR'` (same index). New JS uses the cached index (212). Known fake does **not** intercept on either side.

5. **Leader id.** C `mon->m_id == quest_status.leader_m_id` with no zero check. JS `!!lid && m_id === lid` was **pre-existing**. `leader_m_id==0` would make C match `m_id==0`; JS would refuse. Not introduced here. Production leaders get a real `m_id` when `ldrnum` is set (Wizard/Arc/Bar/Pri already have quest fields).

6. **APPLIED skip.** C comment at `dothrow.c:2101–2103`: a kicked artifact is allowed into this intercept; `HMON_APPLIED` would only arise if a quest artifact polearm or grapnel were added, and must **not** take it. JS `dothrow.js:538` keeps `hmode !== HMON_APPLIED`. Pole/grapple `use_pole` / `use_grapple` pass `HMON_APPLIED` into `thitmonst` and still roll tmp-vs-d20 against the leader. That is C, not a leftover always-`tmiss`.

7. **Short-circuit order.** C ORs quest-arti, then unique, then fake, then ANDs `m_id`. JS computes unique/fake first, then `if (!(qart || unique || fake)) return false`, then lid. No extra RNG. Evaluating unique before `is_quest_artifact` does not skip the quest compare when unique is false. When unique is true, JS never calls `is_quest_artifact` — C would still evaluate it (no short-circuit inside the OR that skips work with a side effect). **`is_quest_artifact` has no RNG and no mutation.** Order is observationally equal.

### Which objects actually change path

C `is_quest_artifact` is **role-relative**, not `oc_unique`. `obj.h:270`: it “only applies to the current role's artifact.” `any_quest_artifact` is `oartifact >= ART_ORB_OF_DETECTION`. A Priest throwing the Mitre at the High Priest takes this intercept because `questarti == ART_MITRE_OF_HOLINESS`, even if some other artifact is also unique. Old JS used `u.questarti` (unset) so only `oc_unique` / unknown fake fired. After this SHA, Arc/Bar/Pri/Wiz (`roles.js` already stores `questarti`) take the C arm. Tourist Platinum Card still needs `roles.js` to copy `ART_YENDORIAN_EXPRESS_CARD` (`role.c:476`) — named in `startup.md`, not this helper.

`detect.js` / `quest.js` / `dogmove.js` already compared `urole.questarti` with the same `want!==0` clamp. Dothrow was the **wrong field**, not a missing concept. Importing a shared `questpgr.js` export would be style; the clone matches those sites.

### Body after the gate — still the named stub

C `dothrow.c:2107–` clears sleep/`STRAT_WAITMASK`, then if `mcanmove` `Some_Monnam` catch, keep-vs-return, `finish_quest`, `addinv`. JS `dothrow.js:538–542` clears sleep/WAITMASK and **returns false**. Thrown object is not caught. D-1041 named that omit; this SHA’s D-log repeats it. The queued C-wrong was the **predicate** sending quest artifacts into `rnd(20)`. After this SHA they skip the d20. That is what review 02 asked for.

`thitmonst` returning false here means the throw path treats the hit as “did not connect” for the caller (`ohitmon` / `hmon` skip). C, after catch, either `mpickobj` (keep) or hands the object back (`hold_another_object` / `addinv`) and returns 1. JS may then `place_object` / stack as a miss. That is the named body omit, visible only when the predicate is true **and** `mcanmove`. Unique Amulet-at-leader already took this stub before D-1044; quest artifacts now join it instead of rolling combat. Worse would have been leaving them on the d20.

This is **not** the playbook case “Match C dispatch, callee is a stub.” The subject names the field. The catch body is not claimed.

## Hallucinations / overclaim

“Match C … is_quest_artifact … urole.questarti not u.questarti” is **true for the comparison when `urole.questarti` is set.** It is **not** a claim that Tourist/`roles.js` now carries `ART_YENDORIAN_EXPRESS_CARD`, nor that catch/`finish_quest` is C. D-log deferred both honestly (`startup.md` already: “other roles’ quest fields still sparse”).

Stamping review 02 item 3 **Addressed** is fair for the field. Private tests (credit-card vs leader with `urole.questarti` set; `u.questarti` alone false; unique; unknown fake; known fake skip; no `leader_m_id`) exercise the branches the public set never hits.

Cadence **#1310** 44/44 does not prove a quest-artifact-at-leader throw. Journal admits public **unhit**. Honest, not fortress-as-proof.

## Density (§2b)

One deferred predicate (~18 lines of JS). Playbook “too small” applies to map-driven peels. The unattended loop **must** pop one Must-fix and must not combine with yname. Thin is mandated. Not a dump.

## Verification

Journal: green+strict PASS; throw/combat/zap cohort **4**/4 (seed0361 Scr 366/366; seed1800 throw; seed0060 kick; seed2200 zap). Private node **11**/11. Path **unhit** by public traces — admitted. Shared `thitmonst` gate: APPLIED poles still skip this intercept as C does. Adequate for this locus.

## Actionable C-wrongs

None that belong on Must-fix from **this** SHA. Review 02 item 3 is actually closed.

Named omits (map, not queue): catch / `finish_quest` / `addinv` body; `gem_accept`; remaining `roles.js` `questarti` / `ldrnum` for roles other than Arc/Bar/Pri/Wiz (`startup.md`); pre-existing `!!leader_m_id` zero guard. Remaining Must-fix **below** this review (`light_cocktail` `obj **`, …) are not regressions of this predicate.

Do not restore `game.u.questarti`. Do not dump tut-1 as a substitute while D-1023 risk 4 is still open.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: the leader intercept now compares `oartifact` to `urole.questarti` like C `is_quest_artifact`, so non-unique quest artifacts no longer fall into the weapon d20; catch/`finish_quest` stays a named omit.
