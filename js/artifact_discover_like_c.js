// artifact_discover_like_c.js — C artifact.c **`artidisco[]`** / **`discover_artifact`** / **`init_artifacts`** discovery tail.
// C refs: artifact.c **`init_artifacts`** (**`memset(artidisco,0)`**), **`discover_artifact(xint16 m)`**;
//         pray.c **`gcrownu`** tail (**`discover_artifact(ART_* )`** after crown weapon exists).

/**
 * C: **`NROFARTIFACTS`** from **`hack.h`** (**`AFTER_LAST_ARTIFACT - 1`**). NH 5.0 is on the order of **~36**;
 * use a fixed upper bound so we never shrink the discovery table vs C.
 */
const NROFARTIFACT_DISCOVERY_SLOTS = 64;

/**
 * C: **`init_artifacts`** — zero **`artidisco[]`** (and in C **`artiexist[]`**; JS tracks discovery list only here).
 * @param {import('./gstate.js').game} g
 */
export function initArtidiscoHeroLikeC(g) {
    g.artidisco = new Array(NROFARTIFACT_DISCOVERY_SLOTS).fill(0);
}

/**
 * C: **`discover_artifact(m)`** — append artifact index **m** to **`artidisco`** in first empty or matching slot.
 * @param {import('./gstate.js').game} g
 * @param {number} m — 1-based **`oartifact`** / **`ART_*`**
 */
export function discoverArtifactHeroLikeC(g, m) {
    const a = m | 0;
    if (a <= 0) return;
    if (!Array.isArray(g.artidisco) || g.artidisco.length !== NROFARTIFACT_DISCOVERY_SLOTS) {
        initArtidiscoHeroLikeC(g);
    }
    const disc = g.artidisco;
    for (let i = 0; i < NROFARTIFACT_DISCOVERY_SLOTS; i++) {
        const slot = disc[i] | 0;
        if (slot === 0 || slot === a) {
            disc[i] = a;
            return;
        }
    }
    /* C: **`impossible("couldn't discover artifact")`** — no-op in contest JS */
}
