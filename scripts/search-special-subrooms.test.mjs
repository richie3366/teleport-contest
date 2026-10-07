import { describe, it } from "node:test";
import assert from "node:assert/strict";

const { game } = await import("../js/gstate.js");
const { search_special } = await import("../js/sounds.js");
const C = await import("../js/const.js");

// C ref: mkroom.c search_special `:764–780` + decl.c:1169
// (`gs.subrooms = &svr.rooms[MAXNROFROOMS+1]`): subrooms live at
// rooms[41+], and the second search loop walks them. JS stored
// subrooms at rooms[41+] (mklev.js add_subroom) but search_special
// read the never-populated `game.level.subrooms`, so Minetown shops
// (subrooms) were invisible: dosounds skipped the shop sound
// (scen-town-Ranger-94002 step 197, scen-town-Tourist-94062 step 161)
// and even cleared `has_shop`. This pins the town layout shape:
// compact rooms, hx<0 sentinel, then shop subrooms at 41+.
function townLevel() {
    const rooms = new Array(2 * (C.MAXNROFROOMS + 1)).fill(null);
    for (let i = 0; i < 4; i++) {
        rooms[i] = { lx: 1, ly: 1, hx: 5, hy: 5, rtype: C.OROOM };
    }
    rooms[4] = { lx: 0, ly: 0, hx: -1, hy: -1, rtype: C.OROOM };
    const base = C.MAXNROFROOMS + 1;
    rooms[base] = { lx: 30, ly: 13, hx: 32, hy: 15, rtype: C.SHOPBASE + 9 };
    rooms[base + 1] = { lx: 0, ly: 0, hx: -1, hy: -1, rtype: C.OROOM };
    return { rooms, nroom: 5, nsubroom: 1 };
}

describe("mkroom.c search_special subroom alias (decl.c:1169)", () => {
    it("finds shop/vault subrooms at rooms[MAXNROFROOMS+1+]", async () => {
        const keep = game.level;
        game.level = townLevel();
        try {
            const shop = search_special(C.ANY_SHOP);
            assert.ok(shop, "ANY_SHOP must find the town shop subroom");
            assert.equal(shop.rtype, C.SHOPBASE + 9);
            // Plain rooms still resolve, and absent types still miss.
            game.level.rooms[1].rtype = C.VAULT;
            assert.equal(search_special(C.VAULT), game.level.rooms[1]);
            game.level.rooms[1].rtype = C.OROOM;
            assert.equal(search_special(C.VAULT), null);
        } finally {
            game.level = keep;
        }
    });
});
