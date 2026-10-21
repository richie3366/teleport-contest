# Branch `experimental`: the re-read pass

This checkout runs the re-read pass (Constitution §10.22,
`docs/REREAD-PASS.md`).

- "Do a port iteration" here means one iteration of
  `scripts/agent-port-loop.reread.prompt.md`. Read that prompt first; it
  names everything else to read.
- D-ids on this branch start at D-6001.
- No grow iterations: a short cliffs block is not a grow trigger. Run the
  fresh cohort or an audit only when asked.
- `.cache/hidden/sessions`, `.cache/callheat`, `.cache/fuzz` and
  `nethack-c/recorder` are symlinks into the main checkout
  (`../teleport-contest-revisited`); never delete, rebuild or `git add`
  them from here.
