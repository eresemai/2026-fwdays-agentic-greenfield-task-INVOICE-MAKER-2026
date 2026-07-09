# Capability map — order & dependencies

Last updated: 2026-07-10

**This file answers:** what order? what blocks what? what unlocks next?

| Read this for… | File |
| --- | --- |
| Order, dependencies, next steps | **This file** |
| Expanded scope per capability | [capabilities/](capabilities/) |
| Authoritative behavior | `openspec/specs/<id>/spec.md` |
| Gate enforcement | `openspec/capability-map.yaml` |

```bash
npm run capability:check -- --capability <id>
/opsx:propose add-<id>
```

> **Preview tip (Cursor):** `Cmd+Shift+V` — Markdown preview. Wide tables are hard to read in any viewer; this file uses **narrow tables per slice** instead of one mega-table.

---

## 1. Roadmap by slice

Work top → bottom. Within a slice, rows without mutual dependency can run **in parallel**.

### S0 — Foundation

| Step | Capability | Owner | Status | Doc |
| --- | --- | --- | --- | --- |
| 1 | `shell` | ui | in_progress | [detail](capabilities/shell.md) |

### S1 — Domain core (parallel, no UI)

| Step | Capability | Owner | Status | Doc |
| --- | --- | --- | --- | --- |
| 2a | `nace-catalog` | domain | not_started | [detail](capabilities/nace-catalog.md) |
| 2b | `invoice-calc` | domain | not_started | [detail](capabilities/invoice-calc.md) |

### S2 — Directories

| Step | Capability | Owner | Status | Doc |
| --- | --- | --- | --- | --- |
| 3a | `supplier-profile` | ui | not_started | [detail](capabilities/supplier-profile.md) |
| 3b | `client-directory` | ui | not_started | [detail](capabilities/client-directory.md) |
| 3c | `banking` | domain | not_started | [detail](capabilities/banking.md) |

### S3 — Render

| Step | Capability | Owner | Status | Doc |
| --- | --- | --- | --- | --- |
| 4 | `document-render` | domain | not_started | [detail](capabilities/document-render.md) |

### S4 — Create flow (demo milestone)

| Step | Capability | Owner | Status | Doc |
| --- | --- | --- | --- | --- |
| 5a | `form-input` | ui | not_started | [detail](capabilities/form-input.md) |
| 5b | `export-share` (preview) | ui | not_started | [detail](capabilities/export-share.md) |

### S5 — Persistence

| Step | Capability | Owner | Status | Doc |
| --- | --- | --- | --- | --- |
| 6 | `invoice-registry` | ui | not_started | [detail](capabilities/invoice-registry.md) |

### S6 — Lifecycle

| Step | Capability | Owner | Status | Doc |
| --- | --- | --- | --- | --- |
| 7a | `export-share` (pdf) | ui | not_started | [detail](capabilities/export-share.md#pdf-gate-s6) |
| 7b | `invoice-edit` | ui | not_started | [detail](capabilities/invoice-edit.md) |

**Unblocked now:** `shell`, `nace-catalog`, `invoice-calc` — run `npm run capability:check`

---

## 2. Dependency matrix

Blocked until every **Depends on** row is `shipped` in `capability-map.yaml`.

| Capability | Depends on | Then unblocks |
| --- | --- | --- |
| `shell` | — | supplier-profile, client-directory |
| `nace-catalog` | — | document-render, form-input |
| `invoice-calc` | — | document-render, invoice-registry, invoice-edit |
| `supplier-profile` | shell | banking |
| `client-directory` | shell | form-input |
| `banking` | supplier-profile | document-render |
| `document-render` | invoice-calc, banking, nace-catalog | form-input, export-share, invoice-registry |
| `form-input` | shell, supplier-profile, client-directory, nace-catalog, banking, document-render | export-share, invoice-registry |
| `export-share` preview | document-render, form-input | pdf gate |
| `invoice-registry` | form-input, document-render, invoice-calc | invoice-edit |
| `export-share` pdf | preview shipped | — |
| `invoice-edit` | invoice-registry, form-input, invoice-calc | MVP complete |

### Critical path to demo (M4)

```
shell
  → nace-catalog ∥ invoice-calc
  → supplier-profile + client-directory → banking
  → document-render
  → form-input → export-share (preview)
```

---

## 3. Dependency graph

```
S0  shell ─────────────────────────────────────────────► shipped?
         │
         ├──────────────────┬─────────────────────────────┐
         ▼                  ▼                             ▼
S1  nace-catalog      invoice-calc                    (parallel)
         │                  │
         ▼                  │
S2  supplier-profile ──► banking                        client-directory
         │                  │                             │
         └────────┬─────────┴─────────────┬───────────────┘
                  ▼                       │
S3           document-render ◄────────────┘
                  │
                  ▼
S4           form-input ──► export-share (preview)
                  │
                  ▼
S5           invoice-registry
                  │
                  ▼
S6           export-share (pdf) + invoice-edit
```

---

## 4. Slice chain (what opens next)

| Finish slice | Unlocks | User sees |
| --- | --- | --- |
| S0 | S2 directories | App shell + nav |
| S1 | (part of S3) | Domain tests in Vitest |
| S2 | S3 render | Supplier/client in browser |
| S3 | S4 create flow | HTML from template |
| S4 | S5 registry | **Form → live preview** |
| S5 | S6 lifecycle | Saved invoices |
| S6 | — | PDF + edit |

---

## 5. Milestones

| ID | Slice | Outcome |
| --- | --- | --- |
| M0 | S0 | Shell + health |
| M1 | S1 | `src/lib/` + Vitest |
| M2 | S2 | Directories |
| M3 | S3 | Rendered HTML |
| **M4** | **S4** | **Form → preview** |
| M5 | S5 | Invoice register |
| M6 | S6 | PDF + edit |

---

## 6. Workflow

1. Pick a step from **§1** — check **§2** dependencies are shipped
2. `npm run capability:check -- --capability <id>`
3. Read expanded doc in [capabilities/](capabilities/)
4. `/opsx:propose add-<id>` → `/opsx:apply`
5. `status: shipped` in `capability-map.yaml`
