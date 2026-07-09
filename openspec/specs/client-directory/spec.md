## Purpose

Browser-side client directory that prefills invoice forms.

## Requirements

### Requirement: Client directory CRUD
The system SHALL let the user create, edit, and delete client records stored only in the browser.

#### Scenario: Save client
- **WHEN** the user saves a client with name and contact fields
- **THEN** the client appears in the client dropdown on the invoice form

### Requirement: Client prefill only
Client directory entries SHALL prefill the invoice form and MUST NOT define content of already-issued invoice snapshots.

#### Scenario: Prefill new invoice
- **WHEN** the user selects a client while creating a new invoice
- **THEN** client fields on the form populate from the directory entry

#### Scenario: Issued invoice unchanged
- **WHEN** the user edits a client directory entry after issuing an invoice to that client
- **THEN** the issued invoice snapshot retains the client details from issue time
