## Purpose

HTML preview, PDF download, print, and share surfaces for generated invoices.

## Requirements

### Requirement: FR-EXPORT-01 HTML preview
The user SHALL see an HTML preview of the generated invoice in the browser before export.

#### Scenario: Live preview
- **WHEN** required form fields are valid
- **THEN** the preview updates to show the rendered invoice document

### Requirement: FR-EXPORT-04 Stateless PDF download
The system SHALL provide PDF download via stateless `POST /api/pdf` that renders the same content as the HTML preview.

#### Scenario: PDF matches preview
- **WHEN** the user requests PDF export with the current invoice payload
- **THEN** the server returns `application/pdf` without persisting the payload

### Requirement: FR-EXPORT-05 Share PDF
The user SHALL be able to share the PDF via file download or Web Share API where the browser supports it.

#### Scenario: Download fallback
- **WHEN** Web Share API is unavailable
- **THEN** the user can still save the PDF file locally

### Requirement: TC-PDF-01 No server retention
The PDF route SHALL NOT store invoice data at rest, including logs, caches, or temporary files beyond the request lifecycle.

#### Scenario: Stateless render
- **WHEN** `POST /api/pdf` completes
- **THEN** no invoice fields remain in server memory or storage after the response is sent
