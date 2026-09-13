# Tasks: Self-Service Meeting Minutes

**Input**: Design documents from `specs/001-self-service-meeting-minutes/`

## Phase 1: Setup

- [x] T001 Create dedicated future-upload directory at `src/uploads/meeting-minutes/`
- [x] T002 [P] Add the Meeting Minute schema verification harness at `scripts/verify-meeting-minutes.js`

## Phase 2: Foundational

- [x] T003 Create deterministic loader and validation behavior in `src/_data/meeting_minutes.js`
- [x] T004 Migrate all 13 published records into `src/_data/meeting_minutes/*.json`
- [x] T005 Run the pre-template verification script and require 13 unique valid records in `scripts/verify-meeting-minutes.js`

## Phase 3: User Story 1 - Publish New Minutes (P1)

**Goal**: Content Editors can add a record and upload its document without source access.

**Independent Test**: A temporary valid record produces one working link; an incomplete record produces none.

- [x] T006 [US1] Add visible Meeting Minutes collection and six ordered inputs in `cloudcannon.config.yml`
- [x] T007 [US1] Configure document uploads under `/uploads/meeting-minutes/` in `cloudcannon.config.yml`
- [x] T008 [US1] Replace current hardcoded links with the data-backed current-group loop in `src/pages/about.njk`
- [x] T009 [US1] Add incomplete-record assertions to `scripts/verify-meeting-minutes.js`

## Phase 4: User Story 2 - Manage Archive Order (P2)

**Goal**: Editors can control current/older grouping and deterministic order.

**Independent Test**: Changing a fixture's group/order moves only that fixture to the expected section and position.

- [x] T010 [US2] Render the data-backed older-group loop inside the existing details element in `src/pages/about.njk`
- [x] T011 [US2] Add order, tie-break, and invalid-group assertions to `scripts/verify-meeting-minutes.js`

## Phase 5: User Story 3 - Preserve Historical Minutes (P3)

**Goal**: Preserve all historical labels, URLs, grouping, and unrelated About-page content.

**Independent Test**: The before/after manifest reconciles 12 records exactly and every built asset hash matches its source.

- [x] T012 [US3] Add legacy label/URL/group manifest assertions to `scripts/verify-meeting-minutes.js`
- [x] T013 [US3] Compare normalized pre/post About output and all document hashes using `scripts/verify-meeting-minutes.js`

## Phase 6: Polish and Delivery

- [x] T014 Remove the temporary constitution Sync Impact Report from `.specify/memory/constitution.md`
- [x] T015 Run schema verification and `npx @11ty/eleventy` using `specs/001-self-service-meeting-minutes/quickstart.md`
- [ ] T016 Verify the real CloudCannon Content Editor collection, save a reversible test record, and remove it before publish
- [ ] T017 Commit and push the intentional feature scope, then verify remote HEAD and a changed CloudCannon build ID
- [ ] T018 Request `/about/` and all 13 documents, inspect browser errors, and capture production visual proof

## Dependencies & Execution Order

- Phase 1 precedes Phase 2.
- Phase 2 blocks all user stories.
- User Story 1 precedes User Story 2 because both update `src/pages/about.njk`.
- User Story 3 depends on the completed migration and both rendering loops.
- Delivery begins only after all story checks pass.

## Parallel Opportunities

- T001 and T002 touch independent paths.
- Once T003 exists, record migration files in T004 can be created independently.
- CMS configuration review and verification-script expansion can proceed independently after the schema is fixed.

## Implementation Strategy

Deliver the complete P1 workflow first, then preserve the existing older archive and prove all legacy
content. Publish only after the real Content Editor workflow and full production proof gates pass.
