# Changelog

All notable changes to usage-band are listed here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versions follow
[Semantic Versioning](https://semver.org/).

## [0.3.1] - 2026-11-19

### Added
- `/usage-band <theme>` switches theme without the word `theme`.

### Changed
- The bar refreshes every 30 seconds, mid-turn included, instead of only at the
  end of a turn. The refresh re-reads figures Claude Code already holds: no
  request, no tokens, no usage spent.

## [0.3.0] - 2026-11-19

### Added
- Selectable themes: `classic` (default), `visual` (solid colored bars, bold
  figures) and `minimal` (figures only), chosen with `/usage-band theme <name>`
  and remembered across sessions.
- `/usage-band` lists the themes and marks the current one.

## [0.2.0] - 2026-11-19

### Added
- Pace mark per window: ▲ when usage runs ahead of the time gone and the window
  may run out before the reset, ▼ with margin, = on pace.

### Changed
- The reset time is shown as a countdown (`42m`, `2h14m`, `3g5h`).

## [0.1.0] - 2026-11-19

### Added
- A row above the prompt with the 5-hour and 7-day usage windows (bar, percent
  used, reset time) and the session's cost.
- Colors by threshold: green below 70%, yellow from 70%, red from 90%.
- A toast once per window when it passes 90%.

[0.3.1]: https://github.com/ste88/claude-usage-band/compare/0.3.0...0.3.1
[0.3.0]: https://github.com/ste88/claude-usage-band/compare/0.2.0...0.3.0
[0.2.0]: https://github.com/ste88/claude-usage-band/compare/0.1.0...0.2.0
[0.1.0]: https://github.com/ste88/claude-usage-band/releases/tag/0.1.0
