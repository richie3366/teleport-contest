import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { initRng, enableRngLog, getRngLog } from "../js/rng.js";
import { findword, strNsubst } from "../js/hacklib.js";
import {
    roles,
    races,
    randrole,
    randrace,
    randalign,
    plnamesuffix,
    role_init,
    str2role,
    str2race,
    str2gend,
    str2align,
} from "../js/roles.js";

// C ref: role.c role_init `:1980–2117` + helpers (D-2481).
// Headless pins of the C-order selection/plname arms: plnamesuffix never
// draws (no RNG in the C body), each rand* helper draws exactly one rn2
// when its candidate set is non-empty, and role_init with fully specified
// flags leaves them untouched while copying pl_character and fixing up
// quest state. Full-session RNG parity is proven by verify --fn role_init
// (full 44/44 + 91/91 REACH); these tests guard the arms against drift.
describe("role_init family (role.c:1980-2117)", () => {
    let saved;
    beforeEach(() => {
        saved = {
            plname: game.plname,
            pl_character: game.pl_character,
            plnamelen: game.plnamelen,
            flags: game.flags,
            iflags: game.iflags,
            sysopt: game.sysopt,
            urole: game.urole,
            urace: game.urace,
            quest_status: game.quest_status,
            pm_fixup: game.pm_fixup,
            objects: game.objects,
            trace: globalThis.__NH_RNG_TRACE,
        };
        game.flags = {};
        game.iflags = {};
        delete game.sysopt;
        delete game.urole;
        delete game.urace;
        delete game.quest_status;
        delete game.pm_fixup;
        delete game.pl_character;
        delete game.plnamelen;
        globalThis.__NH_RNG_TRACE = true;
    });
    afterEach(() => {
        game.plname = saved.plname;
        game.pl_character = saved.pl_character;
        game.plnamelen = saved.plnamelen;
        game.flags = saved.flags;
        game.iflags = saved.iflags;
        if (saved.sysopt === undefined) delete game.sysopt;
        else game.sysopt = saved.sysopt;
        game.urole = saved.urole;
        game.urace = saved.urace;
        game.quest_status = saved.quest_status;
        game.pm_fixup = saved.pm_fixup;
        game.objects = saved.objects;
        globalThis.__NH_RNG_TRACE = saved.trace;
    });

    it("findword matches whole space-separated words (hacklib.c:600-621)", () => {
        assert.equal(findword("player games wizard", "games", 5, false), "games");
        // prefix of a longer word is not a word match (p[wordlen] must be NUL/space)
        assert.equal(findword("player games", "game", 4, false), null);
        // case-sensitive when ignorecase is FALSE (plnamesuffix passes FALSE)
        assert.equal(findword("Player", "player", 6, false), null);
        assert.equal(findword("Player", "player", 6, true), "Player");
        assert.equal(findword("", "x", 1, false), null);
    });

    it("strNsubst replaces Nth/all occurrences (hacklib.c:555-597)", () => {
        assert.equal(strNsubst("a,b,c", ",", " ", 0), "a b c");
        assert.equal(strNsubst("aaa", "a", "b", 2), "aba");
        assert.equal(strNsubst("aaa", "a", "b", 0), "bbb");
        // no match: buffer unchanged (C only copies back when rcount)
        assert.equal(strNsubst("abc", "x", "y", 0), "abc");
        // empty orig inserts before the Nth char
        assert.equal(strNsubst("abc", "", "-", 2), "a-bc");
    });

    it("plnamesuffix splits -role-race-gender-align tokens, draws nothing", () => {
        game.plname = "hero-valkyrie-human-female-lawful";
        initRng(12345);
        enableRngLog();
        const before = getRngLog().length;
        return plnamesuffix().then(() => {
            assert.equal(game.plname, "hero"); // C: *eptr = '\0'
            assert.equal(game.flags.initrole, str2role("valkyrie"));
            assert.equal(game.flags.initrace, str2race("human"));
            assert.equal(game.flags.initgend, str2gend("female"));
            assert.equal(game.flags.initalign, str2align("lawful"));
            assert.equal(getRngLog().length - before, 0);
        });
    });

    it("plnamesuffix ignores unknown tokens, converts commas", () => {
        game.plname = "a-xyz";
        return plnamesuffix().then(() => {
            assert.equal(game.plname, "a");
            assert.equal(game.flags.initrole, undefined);
            game.plname = "a,b";
            return plnamesuffix().then(() => {
                assert.equal(game.plname, "a b");
            });
        });
    });

    it("rand helpers return valid picks with exactly one draw", () => {
        const tourist = roles.findIndex((r) => r.name.m === "Tourist");
        assert.notEqual(tourist, -1);
        initRng(4242);
        enableRngLog();
        let before = getRngLog().length;
        const race = randrace(tourist);
        assert.equal(getRngLog().length - before, 1);
        assert.match(getRngLog()[before], /^rn2\(\d+\)=\d+ @ randrace\(/);
        assert.ok(race >= 0 && race < races.length && races[race].noun);
        assert.ok(roles[tourist].allow & races[race].allow);
        before = getRngLog().length;
        const align = randalign(tourist, race);
        assert.equal(getRngLog().length - before, 1);
        assert.ok(align >= 0 && align < 3);
        before = getRngLog().length;
        const role = randrole(false);
        assert.equal(getRngLog().length - before, 1);
        assert.ok(role >= 0 && role < roles.length);
    });

    it("role_init with specified flags keeps them, copies pl_character", () => {
        const tourist = roles.findIndex((r) => r.name.m === "Tourist");
        const human = races.findIndex((r) => r.noun === "human");
        game.plname = "Contestant";
        game.flags = {
            initrole: tourist,
            initrace: human,
            initgend: 1,
            initalign: 1,
            female: true,
            pantheon: -1,
        };
        initRng(777);
        enableRngLog();
        return role_init().then(() => {
            // valid inputs: selection arms are no-ops
            assert.equal(game.flags.initrole, tourist);
            assert.equal(game.flags.initrace, human);
            assert.equal(game.flags.initgend, 1);
            assert.equal(game.flags.initalign, 1);
            // role name copied back (C: Strcpy + [PL_CSIZ-1] = 0)
            assert.equal(game.pl_character, "Tourist");
            assert.ok(game.pl_character.length < 32);
            // own-gods pantheon (Tourist lgod present, no randrole walk)
            assert.equal(game.flags.pantheon, tourist);
            assert.ok(game.urole.lgod);
            // neutral "_The Lady" reads as goddess (pray.c align_gtitle)
            assert.equal(game.quest_status.godgend, 1);
            // quest permonst fixups applied through the overlay
            assert.ok(game.pm_fixup);
            assert.equal(game.quest_status.ldrgend !== undefined, true);
            assert.equal(game.quest_status.nemgend !== undefined, true);
        });
    });
});
