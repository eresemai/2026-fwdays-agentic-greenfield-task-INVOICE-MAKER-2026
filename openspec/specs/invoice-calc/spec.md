## Purpose

Invoice numbering, bilingual dates, amounts, prepayment, and payment-purpose strings.

## Requirements

### Requirement: FR-CALC-01 Invoice number format
The system SHALL generate invoice numbers in format `DDMM/0YY` (day, month, fixed `0`, two-digit year), e.g. `0305/025` for 2025-05-03.

#### Scenario: Number on issue date
- **WHEN** the invoice date is 2025-05-03
- **THEN** the default invoice number is `0305/025`

### Requirement: FR-CALC-02 Bilingual invoice date
The system SHALL render the invoice date bilingually: EN `May 03, 2025` and UA `03.05.2025` from one date instant.

#### Scenario: Date renderings
- **WHEN** the invoice date is 2025-05-03
- **THEN** the English rendering is `May 03, 2025` and the Ukrainian rendering is `03.05.2025`

### Requirement: FR-CALC-03 Unit price
The system SHALL compute unit price as total amount ÷ quantity with amounts formatted to two decimal places.

#### Scenario: Unit price derivation
- **WHEN** quantity is 2 and line total is 100.00
- **THEN** unit price displays as 50.00

### Requirement: FR-CALC-04 Prepayment and balance
The system SHALL compute prepayment amount as total × prepayment% and balance as total − prepayment.

#### Scenario: Fifty percent prepayment
- **WHEN** total is 1000.00 and prepayment is 50%
- **THEN** prepayment amount is 500.00 and balance is 500.00

### Requirement: FR-CALC-06 Payment purpose string
The system SHALL produce payment purpose text: `Payment by the invoice №{number} from {date_en}`.

#### Scenario: Purpose string
- **WHEN** invoice number is `0305/025` and English date is `May 03, 2025`
- **THEN** payment purpose is `Payment by the invoice №0305/025 from May 03, 2025`
