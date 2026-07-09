## Purpose

App shell, navigation, and deployment health for the browser-first invoice generator.

## Requirements

### Requirement: FR-SHELL-01 Landing and dashboard navigation
The system SHALL provide a landing page and a dashboard area with navigation to invoice creation, invoice list, clients, and settings.

#### Scenario: User opens the app
- **WHEN** the user visits the root URL
- **THEN** they see a landing page with a path into the dashboard

#### Scenario: User navigates the dashboard
- **WHEN** the user is in the dashboard shell
- **THEN** they can reach invoice creation, invoices list, clients, and settings without authentication

### Requirement: FR-SHELL-02 Responsive layout
The system SHALL adapt layout at a 768 px breakpoint so invoice preview remains readable on mobile.

#### Scenario: Mobile viewport
- **WHEN** the viewport width is below 768 px
- **THEN** navigation and preview layout reflow without horizontal overflow on the preview surface

### Requirement: FR-SHELL-03 Health endpoint
The system SHALL expose `GET /api/health` returning `{ status: "ok", service: "invoice-maker" }`.

#### Scenario: Health check
- **WHEN** a client requests `GET /api/health`
- **THEN** the response status is 200 and the JSON body includes `status: "ok"` and `service: "invoice-maker"`
