#!/usr/bin/env python3
"""Regenerate js/generated/monsters_data.js from NetHack monsters.h.

Requires: clang, NetHack sources at nethack-c/upstream/
"""
from __future__ import annotations

import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
INC = ROOT / "nethack-c/upstream/include"
OUT = ROOT / "js/generated/monsters_data.js"

G_FLAGS = {
    "G_UNIQ": 0x1000,
    "G_NOHELL": 0x0800,
    "G_HELL": 0x0400,
    "G_NOGEN": 0x0200,
    "G_NOCORPSE": 0x0100,
    "G_SGROUP": 0x0080,
    "G_LGROUP": 0x0040,
    "G_GENO": 0x0020,
    "G_FREQ": 0x0007,
}

M2_FLAGS = {
    # C ref: include/monflag.h — keep in sync
    "M2_NOPOLY": 0x00000001,
    "M2_PNAME": 0x00080000,
    "M2_SHAPESHIFTER": 0x00004000,
    "M2_MERC": 0x00000200,
    "M2_LORD": 0x00000400,
    "M2_PRINCE": 0x00000800,
    "M2_MINION": 0x00001000,
    "M2_GIANT": 0x00002000,
    "M2_MALE": 0x00010000,
    "M2_FEMALE": 0x00020000,
    "M2_NEUTER": 0x00040000,
    "M2_HOSTILE": 0x00100000,
    "M2_PEACEFUL": 0x00200000,
    "M2_DOMESTIC": 0x00400000,
    "M2_WANDER": 0x00800000,
    "M2_STALK": 0x01000000,
    "M2_NASTY": 0x02000000,
    "M2_STRONG": 0x04000000,
    "M2_ROCKTHROW": 0x08000000,
    "M2_GREEDY": 0x10000000,
    "M2_JEWELS": 0x20000000,
    "M2_COLLECT": 0x40000000,
    "M2_MAGIC": 0x80000000,
}

M3_FLAGS = {
    # C ref: include/monflag.h — subset used by ported predicates
    "M3_WANTSAMUL": 0x0001,
    "M3_WANTSBELL": 0x0002,
    "M3_WANTSBOOK": 0x0004,
    "M3_WANTSCAND": 0x0008,
    "M3_WANTSARTI": 0x0010,
    "M3_WANTSALL": 0x001f,
    "M3_WAITFORU": 0x0040,
    "M3_CLOSE": 0x0080,
    "M3_COVETOUS": 0x001f,
    "M3_WAITMASK": 0x00c0,
    "M3_INFRAVISION": 0x0100,
    "M3_INFRAVISIBLE": 0x0200,
    "M3_DISPLACES": 0x0400,
}

M1_FLAGS = {
    # C ref: include/monflag.h — subset used by ported predicates
    "M1_FLY": 0x00000001,
    "M1_SWIM": 0x00000002,
    "M1_AMORPHOUS": 0x00000004,
    "M1_WALLWALK": 0x00000008,
    "M1_CLING": 0x00000010,
    "M1_TUNNEL": 0x00000020,
    "M1_NEEDPICK": 0x00000040,
    "M1_CONCEAL": 0x00000080,
    "M1_HIDE": 0x00000100,
    "M1_AMPHIBIOUS": 0x00000200,
    "M1_BREATHLESS": 0x00000400,
    "M1_NOTAKE": 0x00000800,
    "M1_NOEYES": 0x00001000,
    "M1_NOHANDS": 0x00002000,
    "M1_NOLIMBS": 0x00006000,
    "M1_NOHEAD": 0x00008000,
    "M1_MINDLESS": 0x00010000,
    "M1_HUMANOID": 0x00020000,
    "M1_ANIMAL": 0x00040000,
    "M1_SLITHY": 0x00080000,
    "M1_UNSOLID": 0x00100000,
    "M1_THICK_HIDE": 0x00200000,
    "M1_OVIPAROUS": 0x00400000,
    "M1_REGEN": 0x00800000,
    "M1_SEE_INVIS": 0x01000000,
    "M1_TPORT": 0x02000000,
    "M1_TPORT_CNTRL": 0x04000000,
    "M1_ACID": 0x08000000,
    "M1_POIS": 0x10000000,
    "M1_CARNIVORE": 0x20000000,
    "M1_HERBIVORE": 0x40000000,
    "M1_OMNIVORE": 0x60000000,
    "M1_METALLIVORE": 0x80000000,
}


def eval_flags(expr: str, env: dict[str, int]) -> int:
    e = re.sub(r"\s+", " ", expr)
    for k, v in sorted(env.items(), key=lambda kv: -len(kv[0])):
        e = re.sub(r"\b" + k + r"\b", str(v), e)
    # Unknown identifiers → 0 (race flags etc. unused by rndmonst stubs)
    e = re.sub(r"[A-Za-z_][A-Za-z0-9_]*", "0", e)
    try:
        return int(eval(e, {"__builtins__": {}}))  # noqa: S307
    except Exception:
        return 0


def split_top_commas(body: str) -> list[str]:
    parts: list[str] = []
    cur: list[str] = []
    depth = 0
    for ch in body:
        if ch == "(":
            depth += 1
            cur.append(ch)
        elif ch == ")":
            depth -= 1
            cur.append(ch)
        elif ch == "," and depth == 0:
            parts.append("".join(cur).strip())
            cur = []
        else:
            cur.append(ch)
    if cur:
        parts.append("".join(cur).strip())
    return parts


def main() -> int:
    if not INC.is_dir():
        print("missing", INC, file=sys.stderr)
        return 1

    enum_pp = subprocess.check_output(
        ["clang", "-E", "-P", "-DMONS_ENUM", "-I", str(INC), str(INC / "monsters.h")]
    ).decode()
    names = [
        tok.strip().rstrip(";")
        for tok in enum_pp.replace("\n", " ").split(",")
        if tok.strip().startswith("PM_")
    ]

    text = (INC / "monsters.h").read_text()
    text = re.sub(r"/\*.*?\*/", "", text, flags=re.S)

    entries: dict[str, dict] = {}
    i = 0
    while True:
        m = re.search(r"\bMON\s*\(", text[i:])
        if not m:
            break
        start = i + m.end()
        depth = 1
        j = start
        while j < len(text) and depth:
            if text[j] == "(":
                depth += 1
            elif text[j] == ")":
                depth -= 1
            j += 1
        body = text[start : j - 1]
        i = j
        parts = split_top_commas(body)
        if len(parts) < 14:
            continue
        lvl, gen, flg1, flg2, flg3, diff, col, bn = (
            parts[2],
            parts[3],
            parts[8],
            parts[9],
            parts[10],
            parts[11],
            parts[12].strip(),
            parts[13].strip(),
        )
        # C ref: align.h — LVL maligntyp may be A_NONE / A_CHAOTIC / …
        align_map = {
            "A_NONE": -128,
            "A_CHAOTIC": -1,
            "A_NEUTRAL": 0,
            "A_LAWFUL": 1,
        }
        lvl_norm = lvl
        for name, val in align_map.items():
            lvl_norm = re.sub(rf"\b{name}\b", str(val), lvl_norm)
        lm = re.match(
            r"LVL\s*\(\s*(-?\d+)\s*,\s*(-?\d+)\s*,\s*(-?\d+)\s*,\s*(-?\d+)\s*,\s*(-?\d+)\s*\)",
            lvl_norm,
        )
        if not lm:
            continue
        # SIZ(wt, nut, sound, msize) — C ref: monflag.h MZ_*
        mz_map = {
            "MZ_TINY": 0,
            "MZ_SMALL": 1,
            "MZ_MEDIUM": 2,
            "MZ_HUMAN": 2,
            "MZ_LARGE": 3,
            "MZ_HUGE": 4,
            "MZ_GIGANTIC": 7,
        }
        # C ref: color.h — mcolor for corpse/body glyphs (display.c mon_color)
        color_map = {
            "CLR_BLACK": 0,
            "CLR_RED": 1,
            "CLR_GREEN": 2,
            "CLR_BROWN": 3,
            "CLR_BLUE": 4,
            "CLR_MAGENTA": 5,
            "CLR_CYAN": 6,
            "CLR_GRAY": 7,
            "NO_COLOR": 8,
            "CLR_ORANGE": 9,
            "CLR_BRIGHT_GREEN": 10,
            "CLR_YELLOW": 11,
            "CLR_BRIGHT_BLUE": 12,
            "CLR_BRIGHT_MAGENTA": 13,
            "CLR_BRIGHT_CYAN": 14,
            "CLR_WHITE": 15,
            "HI_OBJ": 7,
            "HI_METAL": 7,
            "HI_COPPER": 3,
            "HI_SILVER": 7,
            "HI_GOLD": 11,
            "HI_LEATHER": 3,
            "HI_CLOTH": 3,
            "HI_ORGANIC": 3,
            "HI_WOOD": 3,
            "HI_PAPER": 15,
            "HI_GLASS": 6,
            "HI_MINERAL": 7,
            "HI_ZAP": 12,
            "HI_DOMESTIC": 15,
            "HI_LORD": 13,
            "DRAGON_SILVER": 7,
        }
        msize = 2  # MZ_MEDIUM default
        if len(parts) > 5:
            sm = re.search(r"SIZ\s*\([^)]*?,\s*([A-Z0-9_]+)\s*\)", parts[5])
            if sm:
                msize = mz_map.get(sm.group(1), eval_flags(sm.group(1), mz_map))
        # parts[4] is A(ATTK(...), ...); is_armed ≡ attacktype(AT_WEAP)
        atks = parts[4] if len(parts) > 4 else ""
        mcolor = color_map.get(col, eval_flags(col, color_map))
        entries[bn] = {
            "mlevel": int(lm.group(1)),
            "mmove": int(lm.group(2)),
            "ac": int(lm.group(3)),
            "maligntyp": int(lm.group(5)),
            "geno": eval_flags(gen, G_FLAGS),
            "difficulty": int(diff.strip()),
            "mflags1": eval_flags(flg1, M1_FLAGS),
            "mflags2": eval_flags(flg2, M2_FLAGS),
            "mflags3": eval_flags(flg3, M3_FLAGS),
            "sym": parts[1].strip(),
            "msize": msize,
            "has_at_weap": "AT_WEAP" in atks,
            "mcolor": mcolor,
        }

    # Wizard of Yendor may be defined outside MON walker edge-cases
    mons = []
    for n in names:
        bn = n[3:]
        e = entries.get(bn)
        if not e:
            mons.append(
                {
                    "mlevel": 0,
                    "mmove": 12,
                    "ac": 10,
                    "maligntyp": 0,
                    "geno": 0x1200,  # G_NOGEN|G_UNIQ fallback
                    "difficulty": 0,
                    "mflags1": 0,
                    "mflags2": 0,
                    "mflags3": 0,
                    "sym": "S_HUMAN",
                    "msize": 2,
                    "has_at_weap": False,
                    "mcolor": 7,  # CLR_GRAY
                }
            )
        else:
            mons.append(e)

    special_pm = names.index("PM_LONG_WORM_TAIL")
    nummons = len(names)

    export_pms = [
        "GIANT_SPIDER",
        "GRID_BUG",
        "LICHEN",
        "ACID_BLOB",
        "JACKAL",
        "FOX",
        "KOBOLD",
        "GOBLIN",
        "HUMAN",
        "ELF",
        "DWARF",
        "ORC",
        "GNOME",
        "ARCHEOLOGIST",
        "BARBARIAN",
        "CAVE_DWELLER",
        "HEALER",
        "KNIGHT",
        "MONK",
        "CLERIC",
        "RANGER",
        "ROGUE",
        "SAMURAI",
        "TOURIST",
        "VALKYRIE",
        "WIZARD",
        "LONG_WORM_TAIL",
    ]

    lines = [
        "// AUTO-GENERATED from nethack-c/upstream/include/monsters.h — do not edit.",
        "// Regenerate: python3 scripts/extract-monsters.py",
        f"export const NUMMONS = {nummons};",
        "export const LOW_PM = 0;",
        f"export const SPECIAL_PM = {special_pm};",
        "export const NON_PM = -1;",
    ]
    for key in export_pms:
        nm = f"PM_{key}"
        if nm in names:
            lines.append(f"export const {nm} = {names.index(nm)};")
    lines.append("export const monsterNames = " + json.dumps(names) + ";")
    lines.append("export const mlevels = " + json.dumps([m["mlevel"] for m in mons]) + ";")
    lines.append("export const mmoves = " + json.dumps([m["mmove"] for m in mons]) + ";")
    lines.append("export const macs = " + json.dumps([m.get("ac", 10) for m in mons]) + ";")
    lines.append("export const maligntyps = " + json.dumps([m["maligntyp"] for m in mons]) + ";")
    lines.append("export const genos = " + json.dumps([m["geno"] for m in mons]) + ";")
    lines.append("export const difficulties = " + json.dumps([m["difficulty"] for m in mons]) + ";")
    lines.append("export const mflags1s = " + json.dumps([m.get("mflags1", 0) for m in mons]) + ";")
    lines.append("export const mflags2s = " + json.dumps([m["mflags2"] for m in mons]) + ";")
    lines.append("export const mflags3s = " + json.dumps([m.get("mflags3", 0) for m in mons]) + ";")
    lines.append("export const msizes = " + json.dumps([m["msize"] for m in mons]) + ";")
    lines.append("export const mlets = " + json.dumps([m["sym"] for m in mons]) + ";")
    lines.append(
        "export const has_at_weaps = "
        + json.dumps([bool(m.get("has_at_weap")) for m in mons])
        + ";"
    )
    lines.append(
        "export const mcolors = "
        + json.dumps([int(m.get("mcolor", 7)) for m in mons])
        + ";"
    )
    OUT.write_text("\n".join(lines) + "\n")
    n_armed = sum(1 for m in mons if m.get("has_at_weap"))
    print(f"wrote {OUT} ({nummons} monsters, SPECIAL_PM={special_pm}, AT_WEAP={n_armed})")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
