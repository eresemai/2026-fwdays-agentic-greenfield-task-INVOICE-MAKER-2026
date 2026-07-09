# 15 — Six requirements vanished in the migration. Was each a decision?

Type: research
Status: open
Blocked by: —

## Why this ticket exists

Commit `8d45456` ("Align MVP docs and OpenSpec with browser-first architecture")
executed most of this map before its decisions were taken. It created eleven
`openspec/specs/<capability>/spec.md` files, rewrote `docs/requirements.md`,
`CONTEXT.md`, `docs/ARCHITECTURE.md`, both ADRs, `Design.md`, `AGENTS.md` and
`openspec/config.yaml`, and touched `src/`.

Much of it is right, and it matches the map's settled decisions. But
`openspec validate --all --strict` reports **11 passed, 0 failed**, and that
green tick means only that the headings are well-formed. It checks structure,
not coverage, and not consistency.

## Question

**(a) Six requirement IDs exist in `docs/requirements.md` and appear in no spec.**
For each, establish whether the omission was a decision or an accident, and say
which:

| Dropped ID | What it said | Where it should have landed |
| --- | --- | --- |
| `FR-NACE-02` | 74.12 — graphic design seed entry | `nace-catalog` |
| `FR-NACE-03` | 74.12 / 74.14 — 3D visualisation seed entry | `nace-catalog` |
| `FR-NACE-04` | **59.12 — video post-production** seed entry | `nace-catalog` |
| `FR-TPL-02` | Fixed title, **subtitle `Graphic Design Service`**, signature | `document-render` |
| `FR-TPL-04` | Optional `{{PROJECT_BLOCK}}` | `document-render` |
| `FR-CALC-05` | Payment deadline and execution term computation | `invoice-calc` |

Note the shape of it: `FR-NACE-04` (video) and `FR-TPL-02` (frozen
graphic-design subtitle) are the two halves of the conflict ticket `09` exists to
resolve. **Both disappeared.** Dropping both does make the contradiction go
away — but it also silently removes video-editing invoices from the product. If
that was intended, it is a scope decision and belongs in the map's *Out of
scope*. If it was not, the catalog has lost a third of its seed data.

`FR-CALC-05` is not a conflict at all. Payment and execution deadlines are
printed on every invoice and drive the derived `overdue` status. Its absence
looks like an accident.

**(b) Three requirements survived but assert what nobody has decided.** Confirm,
and route each to the ticket that owns it:

- `invoice-calc/spec.md:22` — *"SHALL compute unit price as total amount ÷
  quantity, formatted to two decimal places."* No rounding rule. Meanwhile
  `src/types/invoice.ts` stores `unitPrice` on the line item and computes
  `calculateLineTotal = quantity × unitPrice` — **the opposite direction.** The
  new spec and the new code contradict each other, both were committed together,
  and both pass their checks. → ticket `06`.
- `invoice-registry/spec.md:29` — *"SHALL persist in browser storage
  (localStorage **or** IndexedDB)."* A requirement containing "or" cannot be
  implemented or tested. → ticket `10`.
- `nace-catalog/spec.md:26` — *"SHALL display the NACE code … **when ticket 09
  resolves placement**."* A `SHALL` that defers to an open planning ticket. And
  ticket `03` is at this moment establishing whether printing the code is a legal
  requirement, a convention, or an invention. → tickets `03`, `09`.

**(c) The `Invoice` type contradicts settled decision 7.**
`src/types/invoice.ts` holds `clientId` — a *reference* — and carries no supplier
snapshot and no NACE field. The map says an issued invoice stores a **snapshot**
of everything printed on it, precisely so that editing a supplier's IBAN does not
rewrite last year's invoices. → ticket `08`.

**(d) What does `openspec validate --strict` actually guarantee?** Establish its
checks, and state plainly which of the defects above it is structurally
incapable of catching. The team needs to know what the green tick is worth
before it is trusted again.

## Output

A markdown summary at `.scratch/mvp-spec-coherence/assets/15-migration-audit.md`:
a per-ID verdict table (decision / accident / open), and a short statement of
what `openspec validate --strict` does and does not prove.
