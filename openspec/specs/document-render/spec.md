## Purpose

Render bilingual invoices from `docs/invoice-template.html` by replacing placeholders.

## Requirements

### Requirement: FR-TPL-01 Template placeholder fill
The system SHALL render invoices from `docs/invoice-template.html` by replacing `{{VARIABLE_NAME}}` placeholders with computed values. All substituted text values SHALL be HTML-escaped by the fill step; only markup fragments produced by this capability's own builders (`{{SERVICE_ROWS}}`, `{{PROJECT_BLOCK}}`) SHALL be inserted as raw HTML, and those builders SHALL escape every value they interpolate. Rendering SHALL fail closed: a missing value for a placeholder present in the template, or a supplied variable with no matching placeholder, SHALL raise a typed error naming the variable instead of emitting a document.

#### Scenario: Variable substitution
- **WHEN** all required placeholders have values
- **THEN** the output HTML contains no unreplaced `{{...}}` tokens for required fields

#### Scenario: Hostile text value
- **WHEN** a variable value contains HTML metacharacters such as `<script>alert(1)</script>`
- **THEN** the output renders them as inert escaped text and never as markup

#### Scenario: Missing value
- **WHEN** a placeholder present in the template has no supplied value
- **THEN** rendering raises a typed error naming that placeholder and produces no output

### Requirement: FR-TPL-02 Fixed document sections
The rendered document SHALL preserve the template's fixed sections verbatim: the invoice title, the subtitle, the TERMS AND CONDITIONS block, and the signature block. No placeholder substitution SHALL alter their markup or text.

#### Scenario: Fixed sections survive rendering
- **WHEN** an invoice is rendered with any variable values
- **THEN** the title, subtitle, TERMS block, and signature block in the output are byte-identical to `docs/invoice-template.html`

### Requirement: FR-TPL-03 Service rows expansion
The system SHALL expand `{{SERVICE_ROWS}}` into table rows with bilingual description, quantity, unit price, and line amount. Monetary columns SHALL be formatted with thousands separators and two decimals (`1,234.56`), and every interpolated value SHALL be HTML-escaped.

#### Scenario: Single service row
- **WHEN** one service line is provided
- **THEN** the service table contains one row with bilingual text and numeric columns

#### Scenario: Multiple service rows
- **WHEN** several service lines are provided
- **THEN** the table contains one row per line, in the supplied order, each showing quantity, unit price, and the line amount as unit price × quantity

### Requirement: FR-TPL-04 Optional project block
The system SHALL render `{{PROJECT_BLOCK}}` as a labelled block when a project name is supplied, and as an empty string when it is absent.

#### Scenario: Project supplied
- **WHEN** the invoice carries a project name
- **THEN** the customer section contains the project block with the escaped project name

#### Scenario: No project supplied
- **WHEN** the invoice carries no project name
- **THEN** `{{PROJECT_BLOCK}}` is replaced with an empty string and no empty markup wrapper remains

### Requirement: FR-TPL-05 Self-contained HTML
The output SHALL be self-contained HTML with embedded CSS and A4 print styles preserved from the template.

#### Scenario: Preview in browser
- **WHEN** the user opens HTML preview
- **THEN** styles render without external network dependencies beyond bundled fonts

### Requirement: NFR-PERF-02 Render latency
Rendering a single invoice SHALL complete in under 200 ms on a developer machine.

#### Scenario: Single invoice render
- **WHEN** one invoice with a typical line-item count is rendered
- **THEN** the render completes in under 200 ms

### Requirement: BC-LEGAL-01 Immutable terms block
The TERMS AND CONDITIONS section (items 1–8) SHALL remain immutable in generated output.

#### Scenario: Terms unchanged
- **WHEN** any invoice is rendered
- **THEN** items 1–8 of the TERMS block match the template verbatim
