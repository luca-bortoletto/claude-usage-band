# usage-band

A Claude Code mod that keeps your usage in view: a row above the prompt shows the
5-hour and 7-day rate-limit windows (bar, percent used, pace, time to reset) and the
current session's cost, so you don't have to open `/usage`.

```
5h ▓▓▓▓▓▓░░░░ 62% ▲ · 2h14m │ 7g ▓▓▓░░░░░░░ 31% ▼ · 3g5h │ sessione $1.84
```

- Green below 70%, yellow from 70%, red from 90%.
- Pace: ▲ you are using the window faster than time passes (it may run out before
  the reset), ▼ you have margin, = on pace.
- A toast warns once per window when it passes 90%.
- Updates by itself after every turn, whenever a window moves a whole point, and
  every 30 seconds, mid-turn included.

Rate-limit windows appear after the first API response of a session, and only on
a subscription; otherwise just the session cost is shown.

The percentages come from the API responses of the session the bar is in: usage
spent from another session or from claude.ai shows up here with this session's
next response. The 30-second refresh only re-reads figures Claude Code already
holds, so it sends no request and spends no tokens or usage.

## Themes

Pick a look with `/usage-band <name>` (or `/usage-band theme <name>`); the choice
is remembered across sessions. `/usage-band` alone lists the themes and marks the
current one.

- `classic` (default): text bars, compact, as above.
- `visual`: solid colored bars, bold labels and figures, cost aligned right.
- `minimal`: figures only, `5h 62% ▲ 2h14m · 7g 31% ▼ 3g5h · $1.84`.

## Install

At the prompt of a Claude Code terminal session:

```
/plugin install usage-band --marketplace ste88/claude-usage-band
```

From a shell:

```bash
claude plugin install usage-band --marketplace ste88/claude-usage-band
```

In the desktop app, where `/plugin` does not run: click + next to the prompt box,
then Plugins, Add marketplace with `ste88/claude-usage-band`, then Add plugin.

## Develop from a local clone

Add the clone as a marketplace and install from it. Its entry points at `./`, so
Claude Code reads the plugin straight from the folder, in every new session,
terminal and desktop app alike:

```bash
claude plugin marketplace add ~/Projects/usage-band
claude plugin install usage-band@claude-usage-band
```

After editing a file, run `/reload-plugins` in an open session (no new version or
reinstall needed); `claude plugin list` shows the folder it is read from.

To load the folder without installing it, start a single session with
`claude --plugin-dir ~/Projects/usage-band`, or name it in the `env` block of
`~/.claude/settings.json` to have it in every session:

```json
{ "env": { "CLAUDE_CODE_PLUGIN_DIRS": "/home/<you>/Projects/usage-band" } }
```

Use one of the two, not both, or the band is loaded twice.

A mod Claude writes for you lands in that session's own mods folder
(`~/.claude/dev-mods/<session-id>/`) and loads only in that session: copy it
here and install it as above to see it everywhere.

## License

MIT, see [LICENSE](LICENSE).
