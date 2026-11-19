# usage-band

A Claude Code mod that keeps your usage in view: a row above the prompt shows the
5-hour and 7-day rate-limit windows (bar, percent used, reset time) and the
current session's cost, so you don't have to open `/usage`.

```
5h ▓▓▓▓▓▓░░░░ 62% · reset 14:30 │ 7g ▓▓▓░░░░░░░ 31% · reset lun 09:00 │ sessione $1.84
```

- Green below 70%, yellow from 70%, red from 90%.
- A toast warns once per window when it passes 90%.
- Updates by itself after every turn and whenever a window moves a whole point.

Rate-limit windows appear after the first API response of a session, and only on
a subscription; otherwise just the session cost is shown.

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

## License

MIT, see [LICENSE](LICENSE).
