# Current state — agent handoff

> **Read this file at the start of every agent session.**  
> **Update it at the end of a session or when stopping mid-task.**

Last updated: 2026-07-10T10:20:00Z

## Snapshot

| Field | Value |
| --- | --- |
| **Branch** | `main` @ `22bdda7`; S3 work parked on a **PR stack** |
| **Active capability** | S3 — `document-render` **implemented + reviewed** |
| **Active OpenSpec changes** | `add-embedded-fonts` (13/13) — spec-synced on PR #9; archive after merge |
| **PR stack (human merge needed)** | [#9 embedded fonts](https://github.com/eresemai/2026-fwdays-agentic-greenfield-task-INVOICE-MAKER-2026/pull/9) |
| **Slice / gate** | S4 `form-input` (demo milestone M4) opens once #8 lands |
| **Gate check** | `npm run capability:check -- --capability form-input` (after merge) |

## Capability backlog

Source: `openspec/capability-map.yaml` · order: [capability.md](capability.md)

| Slice | Capability | Owner | Status | Notes |
| --- | --- | --- | --- | --- |
| S0 | `shell` | ui | **shipped** | PR #3 |
| S1 | `nace-catalog`, `invoice-calc` | domain | **shipped** | archived 2026-07-10 |
| S2 | `supplier-profile` | ui | **shipped** | PR #5; archived |
| S2 | `client-directory` | ui | **shipped** | PR #4; archived |
| S2 | `banking` | domain | **shipped** | PR #7; archived 2026-07-10 |
| S3 | `document-render` | domain | **shipped** | archived 2026-07-10 |
| S4 | `form-input` | ui | not_started | **next** — demo milestone M4 |

## Completed recently

| Date | Commit / work | Outcome |
| --- | --- | --- |
| 2026-07-10 | `/opsx:archive add-document-render` | `2026-07-10-add-document-render` in archive |
| 2026-07-10 | PR #8 merged | S3 `document-render` on `main` |
| 2026-07-10 | PR #7 merged | S2 `banking` on `main` |
| 2026-07-10 | `/opsx:archive add-banking` | `2026-07-10-add-banking` in archive |
| 2026-07-10 | PR #6 merged | S2 hardening on `main` |
| 2026-07-10 | PR #4 + #5 merged | S2 directories on `main` |
| 2026-07-10 | Vitest | 161 tests green |

## Stopped at

PR #8 (`document-render`) is merged and archived. **PR #9 — `feat/embedded-fonts`**
is the remaining merge gate. It resolves FR-TPL-05 (embedded Inter v20 subsets);
198 tests on that branch.

After #9 merges: `/opsx:archive add-embedded-fonts`, then
`/opsx:propose add-form-input` (S4 — the M4 demo milestone).

## Blockers & open decisions

| Ticket | Topic | Blocks capability |
| --- | --- | --- |
| 05 | PDF fidelity — Chromium embeds glyphs as `Type 3` (see below) | export-share pdf |
| 16 | Edit after send (immutability) | invoice-edit |
| 11 | Design system reconciliation | form-input polish |

### Fonts — resolved (PR #9), ticket 05 narrowed

The template's Google Fonts `@import` was a **remote**, not bundled, font, so
FR-TPL-05 was unmet even in the browser preview: a PII-bearing invoice issued a
third-party request on every render, and offline Chromium would lose glyphs.

Evidence from `pdffonts` on `.scratch/pdf-prototype/*.pdf`: weights were
**synthesised** (`Inter-Regular_Bold`, `_SemiBold`) because only Regular was
fetched while the template uses 500–800; and `№` (U+2116) lives in Google's
**cyrillic** subset, so even English-only invoices depended on it (FR-CALC-06
emits `№` in an English string). Cyrillic rendered in those prototypes only
because that run had network.

PR #9 embeds the fonts; FR-TPL-05 is now `shipped`. **Still open in ticket 05:**
Chromium's print path embeds glyphs as `Type 3` procedures (text may not be
selectable/searchable). Font *availability* is no longer a variable there.

## Next up (priority order)

1. **Human: merge PR #9**; archive `add-embedded-fonts`
2. **`/opsx:propose add-form-input`** — S4, the M4 demo milestone
3. Wayfinder 05: `Type 3` glyph embedding in the PDF path (fonts now solved)
4. Update mentor PR #50 body with S3 progress (198 tests)

## Repository sync

| Remote | Branch | Role |
| --- | --- | --- |
| `origin` | `main` | Primary |
| `origin` | `fwdays-submission` | Mentor PR #50 |
| `upstream` | `main` | Course template |

## Session log

| Date (UTC) | Session | Action | Outcome |
| --- | --- | --- | --- |
| 2026-07-10 | SDD loop | `add-embedded-fonts` propose → apply → review (PR #9, stacked on #8) | Vendored Inter v20 variable subsets + OFL; `sync-template.mjs` swaps the `@import` for base64 `@font-face`; output has zero external refs. `template:check` (in `build`) now guards fonts too — verified it fails on a font swap and on a template edit. FR-TPL-05 `accepted`→`shipped`. 198 tests |
| 2026-07-10 | OpenSpec | Archived `add-document-render` | `2026-07-10-add-document-render`; specs already synced |
| 2026-07-10 | SDD loop | `add-document-render` propose → apply → review (PR #8) | `src/lib/render/` shipped on `main` |
| 2026-07-10 | OpenSpec | Archived `add-banking` | `2026-07-10-add-banking`; specs already synced |
| 2026-07-10 | PRs | #7 merged to `main` | `banking` shipped; `document-render` unblocked |
| 2026-07-10 | OpenSpec | Archived S2 changes | `2026-07-10-add-supplier-profile`, `2026-07-10-add-client-directory` |
| 2026-07-10 | PRs | #4 + #5 merged to `main` | Both S2 UI capabilities shipped |
