## Purpose

Browser-side supplier (ФОП) profile directory with dropdown selection.

## Requirements

### Requirement: Supplier profile storage
The system SHALL let the user create, edit, and delete supplier profiles stored only in the browser.

#### Scenario: Save supplier
- **WHEN** the user saves a new supplier profile with required fields
- **THEN** it appears in the supplier dropdown on the invoice form

### Requirement: Multiple supplier profiles
The system SHALL support multiple supplier profiles without authentication; this is not multi-tenancy.

#### Scenario: Switch supplier
- **WHEN** the user selects a different supplier from the dropdown
- **THEN** the form prefills from that profile's saved fields

### Requirement: No committed secrets
Supplier tax ID and IBAN values MUST NOT be hardcoded in the repository or client bundle; only user-entered or demo-seed data in browser storage.

#### Scenario: Empty install
- **WHEN** a fresh install loads without user data
- **THEN** no real tax IDs or IBANs ship in compiled assets
