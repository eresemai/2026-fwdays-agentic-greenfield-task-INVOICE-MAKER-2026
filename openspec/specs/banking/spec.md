## Purpose

Supplier banking details and currency-specific IBAN selection on the invoice.

## Requirements

### Requirement: FR-BANK-01 Currency selects IBAN
The system SHALL select the USD IBAN when currency is USD and the EUR IBAN when currency is EUR from the active supplier profile.

#### Scenario: USD invoice
- **WHEN** currency is USD and the supplier profile has a USD IBAN
- **THEN** the invoice SUPPLIER section shows the USD IBAN

### Requirement: FR-BANK-02 Supplier profile fields
A supplier profile SHALL hold bilingual name and address, tax ID, bank name, SWIFT, and separate IBANs for USD and EUR.

#### Scenario: Profile completeness
- **WHEN** the user saves a supplier profile with required fields
- **THEN** both currency IBANs are available for invoice generation

### Requirement: FR-BANK-03 Supplier block on document
The invoice SHALL display IBAN, bank name, and SWIFT in the SUPPLIER section per `docs/invoice-template.html` placeholders.

#### Scenario: Banking on rendered invoice
- **WHEN** an invoice is rendered for EUR
- **THEN** the EUR IBAN, bank name, and SWIFT from the snapshot appear in the supplier block
