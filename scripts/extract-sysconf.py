#!/usr/bin/env python3
"""Embed the pinned Unix sysconf with the recorder's install transformation."""
import json
import re
import shlex
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
source = ROOT / 'nethack-c/upstream/sys/unix/sysconf'
build = (ROOT / 'nethack-c/build-recorder.sh').read_text()
build = build[build.index('SYSCONF='): ]
# Keep the installed settings tied to the checked-in recorder recipe.
command = re.search(r'(?m)^(sed .*?)\s+sys/unix/sysconf >"\$SYSCONF"',
                    build, re.S).group(1)
argv = shlex.split(command.replace('\\\n', ' ').rstrip(' \\'))
installed = subprocess.run(argv, input=source.read_text(), text=True,
                           check=True, capture_output=True).stdout
out = ROOT / 'js/generated/sysconf_data.js'
out.write_text(
    '// AUTO-GENERATED from sys/unix/sysconf + build-recorder.sh install recipe.\n'
    '// Regenerate: python3 scripts/extract-sysconf.py\n'
    '// Rule #2: in-process text; startup installs it only into storage.js VFS.\n'
    'export const SYSCONF_TEXT = ' + json.dumps(installed) + ';\n')
print(f'wrote {out.relative_to(ROOT)}')
