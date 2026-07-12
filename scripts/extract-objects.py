#!/usr/bin/env python3
"""Regenerate js/generated/objects_data.js from NetHack objects.h.

Requires: clang, NetHack sources at nethack-c/upstream/
"""
from __future__ import annotations

import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
INC = ROOT / "nethack-c/upstream/include"
OUT = ROOT / "js/generated/objects_data.js"
TMP = Path("/tmp/nhobj")
TMP.mkdir(parents=True, exist_ok=True)


def main() -> int:
    if not INC.is_dir():
        print("missing", INC, file=sys.stderr)
        return 1

    enum_pp = subprocess.check_output(
        ["clang", "-E", "-P", "-DOBJECTS_ENUM", "-I", str(INC), str(INC / "objects.h")]
    )
    enum_names = [
        tok.strip().rstrip(";")
        for tok in enum_pp.decode().replace("\n", " ").split(",")
        if tok.strip() and "=" not in tok
    ]

    dump_c = TMP / "print_objects.c"
    dump_c.write_text(
        r"""
#include <stdio.h>
#include "prop.h"
typedef short xint16;
#include "skills.h"
#include "color.h"
#define NoDes ((char*)0)
enum obj_material_types {
  NO_MATERIAL=0,LIQUID=1,WAX=2,VEGGY=3,FLESH=4,PAPER=5,CLOTH=6,LEATHER=7,
  WOOD=8,BONE=9,DRAGON_HIDE=10,IRON=11,METAL=12,COPPER=13,SILVER=14,GOLD=15,
  PLATINUM=16,MITHRIL=17,PLASTIC=18,GLASS=19,GEMSTONE=20,MINERAL=21
};
enum obj_armor_types {
  ARM_SUIT=0,ARM_SHIELD=1,ARM_HELM=2,ARM_GLOVES=3,ARM_BOOTS=4,ARM_CLOAK=5,ARM_SHIRT=6
};
#define NODIR 1
#define IMMEDIATE 2
#define RAY 3
#define PIERCE 1
#define SLASH 2
#define WHACK 4
enum objclass_classes {
  RANDOM_CLASS=0,
#define OBJCLASS_CLASS_ENUM
#include "defsym.h"
#undef OBJCLASS_CLASS_ENUM
  MAXOCLASSES
};
struct objclass {
    short oc_name_idx;
    short oc_descr_idx;
    char *oc_uname;
    unsigned oc_name_known:1;
    unsigned oc_merge:1;
    unsigned oc_uses_known:1;
    unsigned oc_encountered:1;
    unsigned oc_magic:1;
    unsigned oc_charged:1;
    unsigned oc_unique:1;
    unsigned oc_nowish:1;
    unsigned oc_big:1;
    unsigned oc_tough:1;
    unsigned oc_spare1:6;
    unsigned oc_dir:3;
    unsigned oc_material:5;
    signed char oc_subtyp;
    unsigned char oc_oprop;
    char oc_class;
    signed char oc_delay;
    unsigned char oc_color;
    short oc_prob;
    unsigned oc_weight;
    short oc_cost;
    signed char oc_wsdam, oc_wldam;
    signed char oc_oc1, oc_oc2;
    unsigned short oc_nutrition;
    unsigned long oc_sell_minseen, oc_sell_maxseen, oc_buy_minseen, oc_buy_maxseen;
};
static struct objclass objects[] = {
#define OBJECTS_INIT
#include "objects.h"
};
int main(void) {
    int n = (int)(sizeof(objects)/sizeof(objects[0]));
    printf("{\"maxoclasses\":%d,\"count\":%d,\"rows\":[\n", MAXOCLASSES, n);
    for (int i = 0; i < n; i++) {
        struct objclass *o = &objects[i];
        printf("%s{\"i\":%d,\"class\":%d,\"name_known\":%d,\"magic\":%d,\"unique\":%d,\"tough\":%d,\"dir\":%d,\"material\":%d,\"color\":%d,\"prob\":%d,\"weight\":%d}",
            i?",\n":"", i, (int)o->oc_class, (int)o->oc_name_known, (int)o->oc_magic,
            (int)o->oc_unique, (int)o->oc_tough, (int)o->oc_dir, (int)o->oc_material,
            (int)o->oc_color, (int)o->oc_prob, (int)o->oc_weight);
    }
    printf("\n]}\n");
    return 0;
}
"""
    )
    r = subprocess.run(
        ["clang", "-std=c11", "-I", str(INC), "-Wno-everything", "-o", str(TMP / "print_objects"), str(dump_c)],
        capture_output=True,
        text=True,
    )
    if r.returncode:
        print(r.stderr, file=sys.stderr)
        return 1
    data = json.loads(subprocess.check_output([str(TMP / "print_objects")]))

    enums_c = TMP / "print_enums.c"
    enums_c.write_text(
        r"""
#include <stdio.h>
enum objects_nums {
#define OBJECTS_ENUM
#include "objects.h"
#undef OBJECTS_ENUM
    NUM_OBJECTS
};
int main(void) {
  #define P(x) printf(#x "=%d\n", (int)(x))
  P(NUM_OBJECTS); P(FIRST_OBJECT); P(LAST_GENERIC);
  P(TURQUOISE); P(AQUAMARINE); P(FLUORITE); P(SAPPHIRE); P(DIAMOND); P(EMERALD);
  P(WAN_NOTHING); P(POT_WATER); P(HELMET); P(HELM_OF_TELEPATHY);
  P(LEATHER_GLOVES); P(GAUNTLETS_OF_DEXTERITY);
  P(CLOAK_OF_PROTECTION); P(CLOAK_OF_DISPLACEMENT);
  P(SPEED_BOOTS); P(LEVITATION_BOOTS);
  P(FIRST_REAL_GEM); P(LAST_REAL_GEM);
  return 0;
}
"""
    )
    r = subprocess.run(
        ["clang", "-std=c11", "-I", str(INC), "-Wno-everything", "-o", str(TMP / "print_enums"), str(enums_c)],
        capture_output=True,
        text=True,
    )
    if r.returncode:
        print(r.stderr, file=sys.stderr)
        return 1
    enums = {
        k: int(v)
        for k, v in (
            line.split("=")
            for line in subprocess.check_output([str(TMP / "print_enums")], text=True).strip().splitlines()
        )
    }

    rows_raw = data["rows"][: enums["NUM_OBJECTS"]]
    if not (len(rows_raw) == len(enum_names) == enums["NUM_OBJECTS"]):
        print("count mismatch", len(rows_raw), len(enum_names), enums["NUM_OBJECTS"], file=sys.stderr)
        return 1

    lines = [
        "// AUTO-GENERATED from nethack-c/upstream/include/objects.h — do not edit.",
        "// Regenerate: python3 scripts/extract-objects.py",
        f'export const MAXOCLASSES = {data["maxoclasses"]};',
        f'export const NUM_OBJECTS = {enums["NUM_OBJECTS"]};',
    ]
    for k, v in sorted(enums.items()):
        if k != "NUM_OBJECTS":
            lines.append(f"export const {k} = {v};")
    classes = [
        "RANDOM_CLASS",
        "ILLOBJ_CLASS",
        "WEAPON_CLASS",
        "ARMOR_CLASS",
        "RING_CLASS",
        "AMULET_CLASS",
        "TOOL_CLASS",
        "FOOD_CLASS",
        "POTION_CLASS",
        "SCROLL_CLASS",
        "SPBOOK_CLASS",
        "WAND_CLASS",
        "COIN_CLASS",
        "GEM_CLASS",
        "ROCK_CLASS",
        "BALL_CLASS",
        "CHAIN_CLASS",
        "VENOM_CLASS",
    ]
    for i, c in enumerate(classes):
        lines.append(f"export const {c} = {i};")
    lines += ["export const NODIR = 1;", "export const IMMEDIATE = 2;", "export const RAY = 3;"]
    lines.append("export const objectNames = " + json.dumps(enum_names) + ";")
    rows = [
        [r["class"], r["name_known"], r["magic"], r["unique"], r["tough"],
         r["dir"], r["material"], r["color"], r["prob"], r["weight"]]
        for r in rows_raw
    ]
    lines.append("export function createObjectsArray() {")
    lines.append("  const raw = " + json.dumps(rows, separators=(",", ":")) + ";")
    lines.append(
        """  return raw.map((r, i) => ({
    oc_class: r[0],
    oc_name_known: r[1],
    oc_magic: r[2],
    oc_unique: r[3],
    oc_tough: r[4],
    oc_dir: r[5],
    oc_material: r[6],
    oc_color: r[7],
    oc_prob: r[8],
    oc_weight: r[9],
    oc_name_idx: i,
    oc_descr_idx: i,
  }));
}"""
    )
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text("\n".join(lines) + "\n")
    print(f"wrote {OUT} ({OUT.stat().st_size} bytes, {enums['NUM_OBJECTS']} objects)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
