## Purpose

NACE 2.1-UA service catalog for creative-services invoice lines (replaces legacy KVED).

## Requirements

### Requirement: FR-NACE-01 NACE 2.1-UA class codes
The catalog SHALL store entries keyed by NACE 2.1-UA class code in `XX.XX` format, not legacy KVED labels.

#### Scenario: Code format
- **WHEN** a catalog entry is loaded
- **THEN** its code matches the NACE 2.1-UA pattern and is sourced from `docs/191_2025.pdf`

### Requirement: FR-NACE-05 Keyword matcher
The system SHALL map user service text to the best NACE entry and ask a clarifying question when ambiguous.

#### Scenario: Unambiguous match
- **WHEN** the user enters service text that matches one catalog entry uniquely
- **THEN** the system selects that NACE code and bilingual line text

#### Scenario: Ambiguous match
- **WHEN** the user enters service text matching multiple entries equally
- **THEN** the system prompts the user to choose among the candidates

### Requirement: FR-NACE-06 NACE code on document
The generated invoice SHALL display the NACE code alongside the service description when ticket 09 resolves placement.

#### Scenario: Code visible on invoice
- **WHEN** an invoice is rendered with a selected NACE entry
- **THEN** the NACE class code appears on the printed document per the resolved template rule

### Requirement: BC-NACE-01 Official taxonomy only
The system SHALL use NACE 2.1-UA (State Statistics Service order No. 191, 2025) only and SHALL NOT reference obsolete KVED DK 009:2010 in new docs or UI.

#### Scenario: No KVED in UI
- **WHEN** the user browses NACE selection in the app
- **THEN** only NACE 2.1-UA labels and codes are shown
