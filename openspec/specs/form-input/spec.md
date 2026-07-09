## Purpose

Structured invoice form with validation and live preview trigger (no chat/LLM in MVP).

## Requirements

### Requirement: FR-INPUT-01 Full structured input
The system SHALL accept full structured input covering client, address, contacts, currency, service, quantity, amount, and payment terms.

#### Scenario: Complete form submission
- **WHEN** the user fills all required structured fields with valid values
- **THEN** the system produces an invoice preview payload without server round-trips for mutation

### Requirement: FR-INPUT-02 Short key-value input
The system SHALL accept a short key-value format with keys `client`, `addr`, `email`, `phone`, `web`, `curr`, `service`, `qty`, `amount`, `prepay`, `pay_days`, `exec_days`.

#### Scenario: Short format parsed
- **WHEN** the user pastes or enters the short key-value format with recognized keys
- **THEN** the form fields populate from the parsed values

### Requirement: FR-INPUT-04 Field validation
The system SHALL validate email, phone, numeric amounts, currency (USD or EUR only in MVP), and prepayment percentage (0–100).

#### Scenario: Invalid email
- **WHEN** the user enters a malformed email
- **THEN** the system shows an error explaining the problem and an example of valid format per BC-UX-01

#### Scenario: Invalid currency
- **WHEN** the user selects a currency other than USD or EUR
- **THEN** the system rejects the value before preview generation
