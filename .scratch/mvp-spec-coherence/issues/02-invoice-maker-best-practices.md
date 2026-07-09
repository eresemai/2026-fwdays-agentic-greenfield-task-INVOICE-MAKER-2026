# 02 — What serious invoice makers actually do

Type: research
Status: open
Blocked by: —

## Question

The user asked for the requirements to follow "best practices of invoice
makers". Establish what those practices are, from product documentation rather
than marketing pages, and name every place our current spec diverges.

Cover, for each of Wave, Zoho Invoice, Invoice Ninja, FreshBooks and Stripe
Invoicing (or a defensible subset — say which and why):

- **Numbering.** Scheme, uniqueness guarantees, collision handling, whether the
  number is editable, when it is assigned (on draft, or on send).
- **Rounding and authority.** Does the user enter the unit price or the total?
  Which is derived? What happens when `total ÷ quantity` does not divide
  evenly? Is `unit × quantity` ever allowed to disagree with the printed total?
- **Currency formatting.** Thousands and decimal separators, and whether a
  bilingual document formats numbers differently per language column.
- **Status models without a payment integration.** Which statuses exist, which
  are user-set, which are derived from dates.
- **Editing after send**, and duplicating an invoice.
- **Sharing**: file versus link, and what is exposed.

Then: **invoice content requirements** for a Ukrainian ФОП billing a foreign
client — what a compliant invoice must carry. Distinguish legal requirement
from convention, and cite the source for each.

Finally, list every point where `docs/requirements.md` diverges from what you
found, with the requirement ID.

## Output

A markdown summary at
`.scratch/mvp-spec-coherence/assets/02-best-practices.md`, with a source link
per claim, ending in a divergence table keyed by requirement ID.
