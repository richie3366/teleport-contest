#!/usr/bin/env python3
"""Regenerate js/generated/artifacts_data.js from NetHack artilist.h.

Requires: clang, NetHack sources at nethack-c/upstream/
"""
from __future__ import annotations

import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
INC = ROOT / "nethack-c/upstream/include"
OUT = ROOT / "js/generated/artifacts_data.js"

SPFX = {
    "SPFX_NONE": 0x00000000,
    "SPFX_NOGEN": 0x00000001,
    "SPFX_RESTR": 0x00000002,
    "SPFX_INTEL": 0x00000004,
    "SPFX_SPEAK": 0x00000008,
    "SPFX_SEEK": 0x00000010,
    "SPFX_WARN": 0x00000020,
    "SPFX_ATTK": 0x00000040,
    "SPFX_DEFN": 0x00000080,
    "SPFX_DRLI": 0x00000100,
    "SPFX_SEARCH": 0x00000200,
    "SPFX_BEHEAD": 0x00000400,
    "SPFX_HALRES": 0x00000800,
    "SPFX_ESP": 0x00001000,
    "SPFX_STLTH": 0x00002000,
    "SPFX_REGEN": 0x00004000,
    "SPFX_EREGEN": 0x00008000,
    "SPFX_HSPDAM": 0x00010000,
    "SPFX_HPHDAM": 0x00020000,
    "SPFX_TCTRL": 0x00040000,
    "SPFX_LUCK": 0x00080000,
    "SPFX_DMONS": 0x00100000,
    "SPFX_DCLAS": 0x00200000,
    "SPFX_DFLAG1": 0x00400000,
    "SPFX_DFLAG2": 0x00800000,
    "SPFX_DALIGN": 0x01000000,
    "SPFX_DBONUS": 0x01F00000,
    "SPFX_XRAY": 0x02000000,
    "SPFX_REFLECT": 0x04000000,
    "SPFX_PROTECT": 0x08000000,
}

ALIGN = {
    "A_NONE": -128,
    "A_CHAOTIC": -1,
    "A_NEUTRAL": 0,
    "A_LAWFUL": 1,
}

# monattk.h — attk.adtyp for PHYS/DRLI/… macros in artilist.h
ADTYP = {
    "PHYS": 0,   # AD_PHYS
    "MAGM": 1,   # AD_MAGM (unused in A() attk macros today)
    "FIRE": 2,   # AD_FIRE
    "COLD": 3,   # AD_COLD
    "ELEC": 6,   # AD_ELEC
    "DRST": 7,   # AD_DRST via POIS()
    "POIS": 7,   # alias
    "STUN": 12,  # AD_STUN
    "DRLI": 15,  # AD_DRLI
    "STON": 18,  # AD_STON
}

# DFNS(AD_*) / CARY(AD_*) in artilist A() dfn/cry (drain_item defends)
AD_NAMES = {
    "AD_PHYS": 0,
    "AD_MAGM": 1,
    "AD_FIRE": 2,
    "AD_COLD": 3,
    "AD_SLEE": 4,
    "AD_DISN": 5,
    "AD_ELEC": 6,
    "AD_DRST": 7,
    "AD_ACID": 8,
    "AD_BLND": 11,
    "AD_STUN": 12,
    "AD_SLOW": 13,
    "AD_PLYS": 14,
    "AD_DRLI": 15,
    "AD_STON": 18,
    "AD_WERE": 29,
    "AD_DISE": 33,
    "AD_HALU": 36,
}

# include/color.h — artilist A() acolor (glow, not item tint)
CLR = {
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
}

# monflag.h M2_* used as artilist mtype for SPFX_DFLAG2
M2 = {
    "M2_NOPOLY": 0x00000001,
    "M2_UNDEAD": 0x00000002,
    "M2_WERE": 0x00000004,
    "M2_HUMAN": 0x00000008,
    "M2_ELF": 0x00000010,
    "M2_ORC": 0x00000080,
    "M2_DEMON": 0x00000100,
    "M2_GIANT": 0x00002000,
}

# include/prop.h LAST_PROP = LIFESAVED; artifact.h enum invoke_prop_types
LAST_PROP = 68
INV_PROP = {
    "0": 0,
    "INVIS": 40,
    "CONFLICT": 44,
    "LEVITATION": 48,
    "TAMING": LAST_PROP + 1,
    "HEALING": LAST_PROP + 2,
    "ENERGY_BOOST": LAST_PROP + 3,
    "UNTRAP": LAST_PROP + 4,
    "CHARGE_OBJ": LAST_PROP + 5,
    "LEV_TELE": LAST_PROP + 6,
    "CREATE_PORTAL": LAST_PROP + 7,
    "ENLIGHTENING": LAST_PROP + 8,
    "CREATE_AMMO": LAST_PROP + 9,
    "BANISH": LAST_PROP + 10,
    "FLING_POISON": LAST_PROP + 11,
    "FIRESTORM": LAST_PROP + 12,
    "SNOWSTORM": LAST_PROP + 13,
    "BLINDING_RAY": LAST_PROP + 14,
}


def parse_attk(expr: str) -> tuple[int, int, int]:
    """Parse NO_ATTK / PHYS(a,b) / DRLI(a,b) / … → (adtyp, damn, damd)."""
    expr = strip_c_comments(expr).strip()
    if expr == "NO_ATTK" or expr == "NO_DFNS" or expr == "NO_CARY":
        return (0, 0, 0)
    m = re.match(r"^(PHYS|DRLI|COLD|FIRE|ELEC|STUN|POIS)\(\s*(\d+)\s*,\s*(\d+)\s*\)$", expr)
    if not m:
        raise ValueError(f"unparsed attk {expr!r}")
    return (ADTYP[m.group(1)], int(m.group(2)), int(m.group(3)))


def parse_defn_or_cary(expr: str) -> tuple[int, int, int]:
    """Parse NO_DFNS / DFNS(AD_*) / CARY(AD_*) / DRLI(0,0) / … → (adtyp, damn, damd)."""
    expr = strip_c_comments(expr).strip()
    if expr in ("NO_ATTK", "NO_DFNS", "NO_CARY"):
        return (0, 0, 0)
    m = re.match(r"^(?:DFNS|CARY)\(\s*(AD_\w+)\s*\)$", expr)
    if m:
        ad = AD_NAMES.get(m.group(1))
        if ad is None:
            raise ValueError(f"unparsed DFNS/CARY {expr!r}")
        return (ad, 0, 0)
    return parse_attk(expr)


def parse_mtype(tok: str) -> tuple[str, int]:
    """Return (kind, value): kind is 'num'|'m2'|'s'|'pm'."""
    tok = strip_c_comments(tok).strip()
    if tok == "0":
        return ("num", 0)
    if tok in M2:
        return ("m2", M2[tok])
    if tok.startswith("S_"):
        return ("s", 0)  # value resolved at JS runtime from token
    if tok.startswith("PM_") or tok == "NON_PM":
        return ("pm", 0)  # value resolved at JS runtime
    raise ValueError(f"unparsed mtype {tok!r}")


def strip_c_comments(s: str) -> str:
    s = re.sub(r"/\*.*?\*/", "", s, flags=re.S)
    s = re.sub(r"//.*?$", "", s, flags=re.M)
    return s


def eval_spfx(expr: str) -> int:
    expr = strip_c_comments(expr).strip()
    if expr == "0":
        return 0
    # strip outer parens
    while expr.startswith("(") and expr.endswith(")"):
        expr = expr[1:-1].strip()
    total = 0
    for part in expr.split("|"):
        tok = part.strip()
        if not tok:
            continue
        if tok not in SPFX:
            raise ValueError(f"unknown SPFX token {tok!r} in {expr!r}")
        total |= SPFX[tok]
    return total


def split_args(s: str) -> list[str]:
    """Split top-level comma-separated args, respecting quotes/parens."""
    args: list[str] = []
    cur: list[str] = []
    depth = 0
    in_str = False
    i = 0
    while i < len(s):
        ch = s[i]
        if in_str:
            cur.append(ch)
            if ch == "\\" and i + 1 < len(s):
                cur.append(s[i + 1])
                i += 2
                continue
            if ch == '"':
                in_str = False
            i += 1
            continue
        if ch == '"':
            in_str = True
            cur.append(ch)
        elif ch in "({[":
            depth += 1
            cur.append(ch)
        elif ch in ")}]":
            depth -= 1
            cur.append(ch)
        elif ch == "," and depth == 0:
            args.append("".join(cur).strip())
            cur = []
        else:
            cur.append(ch)
        i += 1
    if cur:
        args.append("".join(cur).strip())
    return args


def main() -> int:
    if not INC.is_dir():
        print("missing", INC, file=sys.stderr)
        return 1

    # ART_* enum via ARTI_ENUM
    enum_pp = subprocess.check_output(
        [
            "clang",
            "-E",
            "-P",
            "-DARTI_ENUM",
            "-I",
            str(INC),
            str(INC / "artilist.h"),
        ],
        text=True,
    )
    # Also need NONARTIFACT from the dummy entry — enum starts after includes
    # Dump is a comma list of ART_* tokens
    tokens = [
        t.strip().rstrip(",")
        for t in re.split(r"[,\s]+", enum_pp)
        if t.strip().startswith("ART_")
    ]
    # Deduplicate while preserving order
    seen: set[str] = set()
    art_enums: list[str] = []
    for t in tokens:
        if t not in seen:
            seen.add(t)
            art_enums.append(t)
    seen_art = set(art_enums)

    text = (INC / "artilist.h").read_text()
    # Parse A("...") rows with nested-paren awareness (PHYS(...), etc.).
    entries = []
    i = 0
    while True:
        m = re.search(r'\bA\(\s*"', text[i:])
        if not m:
            break
        start = i + m.start() + 1  # points at '(' of A(
        # walk from that '('
        depth = 0
        j = start
        in_str = False
        while j < len(text):
            ch = text[j]
            if in_str:
                if ch == "\\" and j + 1 < len(text):
                    j += 2
                    continue
                if ch == '"':
                    in_str = False
                j += 1
                continue
            if ch == '"':
                in_str = True
            elif ch == "(":
                depth += 1
            elif ch == ")":
                depth -= 1
                if depth == 0:
                    j += 1
                    break
            j += 1
        inner = text[start + 1 : j - 1]
        i = j
        args = split_args(inner)
        if len(args) < 17:
            print("skip short A()", len(args), args[:3], file=sys.stderr)
            continue
        name = args[0].strip().strip('"')
        otyp_name = args[1].strip()
        try:
            spfx = eval_spfx(args[2])
        except ValueError as e:
            print("spfx fail", name, e, file=sys.stderr)
            continue
        # A() s2 — carry-only specials (cspfx). MKoT/Orb of Fate WARN|…
        try:
            cspfx = eval_spfx(args[3])
        except ValueError as e:
            print("cspfx fail", name, e, file=sys.stderr)
            continue
        mtype_tok = args[4].strip()
        try:
            mtype_kind, mtype_val = parse_mtype(mtype_tok)
        except ValueError as e:
            print("mtype fail", name, e, file=sys.stderr)
            continue
        try:
            attk_adtyp, attk_damn, attk_damd = parse_attk(args[5])
        except ValueError as e:
            print("attk fail", name, e, file=sys.stderr)
            continue
        try:
            defn_adtyp, defn_damn, defn_damd = parse_defn_or_cary(args[6])
        except ValueError as e:
            print("defn fail", name, e, file=sys.stderr)
            continue
        try:
            cary_adtyp, cary_damn, cary_damd = parse_defn_or_cary(args[7])
        except ValueError as e:
            print("cary fail", name, e, file=sys.stderr)
            continue
        inv_tok = strip_c_comments(args[8]).strip()
        if inv_tok not in INV_PROP:
            print("bad inv_prop", name, inv_tok, file=sys.stderr)
            continue
        inv_prop = INV_PROP[inv_tok]
        align_tok = args[9].strip()
        role_tok = args[10].strip()
        race_tok = args[11].strip()
        # A() gs/gv (gen_spe/gift_value) still named; cost is arti_cost.
        cost_raw = strip_c_comments(args[14]).strip()
        m_cost = re.match(r"^(\d+)[Ll]?$", cost_raw)
        if not m_cost:
            print("bad cost", name, args[14], file=sys.stderr)
            continue
        cost = int(m_cost.group(1))
        clr_tok = strip_c_comments(args[15]).strip()
        bn = args[16].strip()
        if clr_tok not in CLR:
            print("bad acolor", name, clr_tok, file=sys.stderr)
            continue
        if align_tok not in ALIGN:
            print("bad align", name, align_tok, file=sys.stderr)
            continue
        # Skip conditional entries not present in ART_* enum (e.g. ELF palantir)
        art_sym = f"ART_{bn}" if bn != "NONARTIFACT" else "ART_NONARTIFACT"
        if bn != "NONARTIFACT" and art_sym not in seen_art:
            print("skip conditional", name, art_sym, file=sys.stderr)
            continue
        entries.append(
            {
                "name": name,
                "otypName": otyp_name,
                "spfx": spfx,
                "cspfx": cspfx,
                "mtypeTok": mtype_tok,
                "mtypeKind": mtype_kind,
                "mtypeVal": mtype_val,
                "attkAdtyp": attk_adtyp,
                "attkDamn": attk_damn,
                "attkDamd": attk_damd,
                "defnAdtyp": defn_adtyp,
                "defnDamn": defn_damn,
                "defnDamd": defn_damd,
                "caryAdtyp": cary_adtyp,
                "caryDamn": cary_damn,
                "caryDamd": cary_damd,
                "inv_prop": inv_prop,
                "alignment": ALIGN[align_tok],
                "roleName": role_tok,
                "raceName": race_tok,
                "cost": cost,
                "acolor": CLR[clr_tok],
                "bn": bn if bn != "NONARTIFACT" else "NONARTIFACT",
            }
        )

    if not entries:
        print("no artifact entries parsed", file=sys.stderr)
        return 1

    # NROFARTIFACTS = last real index (C: AFTER_LAST_ARTIFACT - 1 style)
    # C nartifact loops 1..NROFARTIFACTS; dummy is 0.
    nrof = len(entries) - 1  # exclude dummy index 0

    lines = [
        "// AUTO-GENERATED from nethack-c/upstream/include/artilist.h — do not edit.",
        "// Regenerate: python3 scripts/extract-artifacts.py",
        f"export const NROFARTIFACTS = {nrof};",
    ]
    for i, name in enumerate(art_enums):
        lines.append(f"export const {name} = {i};")
    # Ensure NONARTIFACT = 0 if present
    if "ART_NONARTIFACT" not in art_enums and any(
        e["bn"] == "NONARTIFACT" for e in entries
    ):
        lines.insert(3, "export const ART_NONARTIFACT = 0;")

    # Emit table; otyp/role/race/S_*/PM_* mtype resolved at runtime
    lines.append("export const artilistRaw = [")
    for e in entries:
        lines.append(
            "  {"
            f' name: {e["name"]!r},'
            f' otypName: {e["otypName"]!r},'
            f' spfx: {e["spfx"]},'
            f' cspfx: {e["cspfx"]},'
            f' mtypeTok: {e["mtypeTok"]!r},'
            f' mtypeKind: {e["mtypeKind"]!r},'
            f' mtypeVal: {e["mtypeVal"]},'
            f' attkAdtyp: {e["attkAdtyp"]},'
            f' attkDamn: {e["attkDamn"]},'
            f' attkDamd: {e["attkDamd"]},'
            f' defnAdtyp: {e["defnAdtyp"]},'
            f' defnDamn: {e["defnDamn"]},'
            f' defnDamd: {e["defnDamd"]},'
            f' caryAdtyp: {e["caryAdtyp"]},'
            f' caryDamn: {e["caryDamn"]},'
            f' caryDamd: {e["caryDamd"]},'
            f' inv_prop: {e["inv_prop"]},'
            f' alignment: {e["alignment"]},'
            f' roleName: {e["roleName"]!r},'
            f' raceName: {e["raceName"]!r},'
            f' cost: {e["cost"]},'
            f' acolor: {e["acolor"]},'
            f' bn: {e["bn"]!r}'
            " },"
        )
    lines.append("];")

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text("\n".join(lines) + "\n")
    print(f"wrote {OUT} ({len(entries)} entries, NROFARTIFACTS={nrof})")
    return 0


if __name__ == "__main__":
    sys.exit(main())
