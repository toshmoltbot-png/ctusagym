# Feature Specification: Self-Service Meeting Minutes

**Feature Branch**: `main`

**Created**: 2026-09-13

**Status**: Ready for planning

**Input**: User description: "Let Mark publish future committee minutes himself through his existing CloudCannon Content Editor account."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Publish New Minutes (Priority: P1)

As a state-site Content Editor, Mark can open a clearly labeled Meeting Minutes collection, add a
record, upload the supplied document, enter the public label and meeting date, save, and have the new
entry appear on the public About page without editing source code.

**Why this priority**: This removes the exact blocker that required Rich and Tosh to publish the June
2026 document for Mark.

**Independent Test**: In the CloudCannon editor, create a harmless test record with a document,
confirm all required fields are understandable, save it, and verify that the built About page contains
one working link with the expected label. Remove the test record after proof.

**Acceptance Scenarios**:

1. **Given** Mark is signed in as a Content Editor, **When** he opens Meeting Minutes, **Then** he can
   see existing records and an option to add a new one.
2. **Given** a new record, **When** Mark enters a label, date, document, and display group and saves,
   **Then** the public archive shows one working link without source-code access.
3. **Given** a record lacks a document, **When** the site builds, **Then** no broken public link is
   rendered for that record.

---

### User Story 2 - Manage Archive Order (Priority: P2)

As a Content Editor, Mark can place recent minutes in the main list and older minutes in the existing
collapsed archive while keeping newest meetings first.

**Why this priority**: The public page already separates current and older minutes, and that behavior
must remain manageable without technical help.

**Independent Test**: Change a test record's display group and order value, rebuild, and verify that it
moves to the correct section and sequence without changing other records.

**Acceptance Scenarios**:

1. **Given** multiple minute records, **When** they have distinct order values, **Then** the public page
   displays them deterministically from lowest order value to highest.
2. **Given** a record assigned to Older Minutes, **When** the site builds, **Then** it appears only
   inside the collapsed Older Minutes section.

---

### User Story 3 - Preserve Historical Minutes (Priority: P3)

As a visitor, I can continue opening every historical minutes document from the same public URL after
the archive becomes editor-managed.

**Why this priority**: Self-service editing cannot break the existing public archive or bookmarks.

**Independent Test**: Compare all labels and URLs before and after migration and request every linked
document, requiring exactly one matching record and HTTP 200 for each asset.

**Acceptance Scenarios**:

1. **Given** the current 13 published links, **When** the migration is complete, **Then** every label,
   public URL, and main/older grouping is unchanged.
2. **Given** an unrelated About-page section, **When** rendered before and after migration, **Then** its
   normalized text and controls are unchanged.

### Edge Cases

- Records with an empty label or document are omitted from the public archive.
- Duplicate order values fall back to label sorting so builds remain deterministic.
- Uploaded filenames containing spaces are accepted through the document field and rendered using the
  stored public path.
- A record with an unrecognized display group is omitted rather than appearing in the wrong section.
- Deleting a record removes its link but does not silently delete the uploaded file.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The editor MUST expose a visible collection named `Meeting Minutes` to Content Editors.
- **FR-002**: Editors MUST be able to add, edit, and remove individual minute records without source-code access.
- **FR-003**: Each record MUST have a plain-language public label, meeting date, document path, display group, and numeric order.
- **FR-004**: The document field MUST provide an upload control that stores files in an Eleventy passthrough directory.
- **FR-005**: The public About page MUST render current and older records using one deterministic data loader and template loop per group.
- **FR-006**: Records missing a label or document, or using an invalid display group, MUST NOT render a public link.
- **FR-007**: All 13 existing labels, URLs, order positions, and group assignments MUST be migrated exactly once.
- **FR-008**: The archive's current visual structure, link styling, and collapsed Older Minutes behavior MUST remain unchanged.
- **FR-009**: The feature MUST NOT grant Mark repository, deployment, billing, DNS, organization-owner, or source-editor permissions.
- **FR-010**: Field help MUST tell editors what visitors will see, where to upload, and how order and display group work.

### Key Entities *(include if feature involves data)*

- **Meeting Minute**: One public archive item with editor label, public label, meeting date, document path,
  display group (`current` or `older`), and numeric order.
- **Minutes Archive**: The About-page presentation of valid Meeting Minute records split into current and
  older groups.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A Content Editor can create and publish a new minutes link in under three minutes without source-code access.
- **SC-002**: All 13 migrated documents retain their exact existing public URLs and return HTTP 200.
- **SC-003**: A schema/build test proves every valid record renders exactly once and every incomplete record renders zero links.
- **SC-004**: Normalized About-page output differs only in the approved data-backed rendering mechanism, not visible content or styling.
- **SC-005**: Production verification shows a new CloudCannon build identity, zero browser errors, and a working editor collection.

## Assumptions

- Mark's existing CloudCannon Content Editor membership remains active.
- JSON collection files are the established and preferred editing model for this site.
- Existing documents stay under `/docs/`; new uploads may use `/uploads/meeting-minutes/` while the record stores the public path.
- The current `current` and `older` presentation is retained rather than redesigning the About page.
