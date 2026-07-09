## Purpose

Render bilingual invoices from `docs/invoice-template.html` by replacing placeholders.

## Requirements

### Requirement: FR-TPL-01 Template placeholder fill
The system SHALL render invoices from `docs/invoice-template.html` by replacing `{{VARIABLE_NAME}}` placeholders with computed values.

#### Scenario: Variable substitution
- **WHEN** all required placeholders have values
- **THEN** the output HTML contains no unreplaced `{{...}}` tokens for required fields

### Requirement: FR-TPL-03 Service rows expansion
The system SHALL expand `{{SERVICE_ROWS}}` into table rows with bilingual description, quantity, unit price, and line amount.

#### Scenario: Single service row
- **WHEN** one service line is provided
- **THEN** the service table contains one row with bilingual text and numeric columns

### Requirement: FR-TPL-05 Self-contained HTML
The output SHALL be self-contained HTML with embedded CSS and A4 print styles preserved from the template.

#### Scenario: Preview in browser
- **WHEN** the user opens HTML preview
- **THEN** styles render without external network dependencies beyond bundled fonts

### Requirement: BC-LEGAL-01 Immutable terms block
The TERMS AND CONDITIONS section (items 1–8) SHALL remain immutable in generated output.

#### Scenario: Terms unchanged
- **WHEN** any invoice is rendered
- **THEN** items 1–8 of the TERMS block match the template verbatim
