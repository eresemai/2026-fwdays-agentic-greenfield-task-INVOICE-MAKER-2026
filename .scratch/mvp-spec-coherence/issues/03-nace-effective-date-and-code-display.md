# 03 — When NACE 2.1-UA took effect, and whether an invoice prints the code

Type: research
Status: open
Blocked by: —

## Question

`BC-NACE-01` ("use NACE 2.1-UA only, never legacy КВЕД") and the whole
`nace-catalog` capability rest on facts that are only partly verified.

**Already verified** against `docs/191_2025.pdf` during charting — re-confirm
the quotes, do not re-derive:

- Держстат order No. 191 of 28 Oct 2025 approves NACE 2.1-UA.
- The preamble states it is "на заміну національного класифікатора ДК 009:2010".
- The document contains exactly 651 class codes in `XX.XX` form.
- `74.11`, `74.12`, `74.13`, `74.14` and `59.12` exist with the names quoted in
  `docs/requirements.md:69-74`.

**Not verified, and load-bearing:**

**(a) Effective date.** The PDF contains **no** "набирає чинності" clause —
grep confirms it. Yet `docs/product-brief.md:75` asserts "From **2025**,
Ukraine uses NACE 2.1-UA". From what date is NACE 2.1-UA actually in force, and
is there a transition period during which ДК 009:2010 remains valid? Primary
sources: the order itself, Держстат publications, `zakon.rada.gov.ua`.

**(b) What the register holds.** As of today (2026-07), does a ФОП's entry in
the ЄДР carry a NACE 2.1-UA code, or still a legacy КВЕД code? If the two can
disagree, an invoice that prints a NACE code may not match the entrepreneur's
registration.

**(c) Does an invoice print the activity code at all?** `FR-NACE-06` requires
the code to appear next to the service description, calling it an "audit trail
for FOP activity type". Is that a legal requirement, a convention, or an
invention? This decides whether `FR-NACE-06` survives — which matters, because
`docs/invoice-template.html` has **no placeholder for a NACE code**, and
`TC-STACK-03` / `BC-BRAND-01` / `BC-LEGAL-01` freeze the template.

**(d) Catalog key.** `FR-NACE-01` says entries are keyed by class code, but the
seed table in `docs/requirements.md:69-74` has **two different rows keyed
`74.12`**. Establish whether a class code can legitimately carry more than one
invoice line text, so ticket `08` can model the catalog correctly.

## Output

A markdown summary at `.scratch/mvp-spec-coherence/assets/03-nace.md`, giving
the provenance of every NACE claim currently made in `docs/product-brief.md`
and `docs/requirements.md`, and marking each as confirmed, corrected, or
unsourced.
