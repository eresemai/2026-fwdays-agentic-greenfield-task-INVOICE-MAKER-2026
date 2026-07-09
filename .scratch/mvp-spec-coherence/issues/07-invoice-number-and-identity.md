# 07 — The invoice number, and what identifies an invoice

Type: grilling
Status: open
Blocked by: 02

## Question

`FR-CALC-01` fixes the number format as `DDMM/0YY` — day, month, a literal `0`,
two-digit year. An invoice issued on 2025-05-03 is `0305/025`.

Two invoices issued on the same day therefore carry the **same number**. And
`FR-EDIT-01` identifies an invoice for editing **by its number**. The format
cannot both collide and serve as an identifier.

Decide, with the numbering survey from ticket `02` in hand:

- **What identifies an invoice record.** A number, or an opaque id with the
  number as a display field?
- **Must the number be unique**, and what happens on the second invoice of a
  day? A sequence suffix, a different format, or a refusal?
- **Is the number editable** by the user?
- **What is the literal `0`** in `DDMM/0YY`, and must it stay? `docs/research.md:26-32`
  states the rule but never explains the character.
- **When is the number assigned** — when the draft is created, or when the user
  marks it `sent`? A draft that reserves a number and is then cancelled leaves a
  gap; a number assigned on send means the draft has no name.
- **Is a cancelled number reused?** Map decision 4 keeps `cancelled` as a stored
  status precisely so the record survives — confirm that the number dies with it.
- **Is numbering per supplier profile, or global?** Map decision 5 allows several
  ФОП profiles in one browser. Two entrepreneurs sharing one number sequence is
  probably wrong; sharing one browser is not.

## Consumers

Ticket `08` needs the identity rule before it can describe the record.
The **Not yet specified** entry on edit and duplicate semantics graduates from
here.
