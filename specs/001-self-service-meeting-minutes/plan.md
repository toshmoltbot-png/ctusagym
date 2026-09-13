# Implementation Plan: Self-Service Meeting Minutes

**Branch**: `main` | **Date**: 2026-09-13 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/001-self-service-meeting-minutes/spec.md`

## Summary

Replace the hardcoded About-page minutes links with a data-backed CloudCannon collection. Migrate all
13 existing records into uniform JSON files, load and validate them deterministically, render the same
current/older UI, and configure a document upload field that stores new files under the existing
passthrough `src/uploads/meeting-minutes/` path.

## Technical Context

**Language/Version**: Node.js CommonJS; Nunjucks templates; JSON content

**Primary Dependencies**: Eleventy 3.1.6 and CloudCannon collection configuration

**Storage**: Git-backed JSON files plus Word documents in `src/docs/` and future uploads in `src/uploads/meeting-minutes/`

**Testing**: Node assertion script, Eleventy production build, normalized HTML comparison, HTTP and browser checks

**Target Platform**: CloudCannon-hosted static website

**Project Type**: Static web application with Git-backed CMS

**Performance Goals**: No material build-time or page-weight regression; archive renders in one page build

**Constraints**: Preserve all public URLs and visible labels; no new runtime dependency; Content Editor-only workflow

**Scale/Scope**: 13 migrated records and low-volume annual additions

## Constitution Check

- **Public Continuity**: PASS. Every existing label, URL, group, and visual style is preserved.
- **Editor-First Content**: PASS. A visible `Meeting Minutes` collection replaces template editing.
- **Deterministic Data**: PASS. Loader validates fields and sorts by numeric order, then label.
- **Least Privilege**: PASS. No role or infrastructure permission changes are required.
- **Proof Before Completion**: PASS. Plan includes local, CMS, Git, production, HTTP, and visual gates.

Post-design re-check: PASS. Research and contracts introduce no constitutional exception.

## Project Structure

### Documentation (this feature)

```text
specs/001-self-service-meeting-minutes/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── meeting-minute-schema.md
└── tasks.md
```

### Source Code (repository root)

```text
src/
├── _data/
│   ├── meeting_minutes.js
│   └── meeting_minutes/*.json
├── pages/about.njk
├── docs/                         # existing stable document URLs
└── uploads/meeting-minutes/      # future CloudCannon uploads

cloudcannon.config.yml
scripts/verify-meeting-minutes.js
```

**Structure Decision**: Follow the established one-JSON-file-per-record collection pattern used by
announcements and policies. Keep legacy assets at their stable paths; route only new uploads to the
dedicated passthrough folder.

## Complexity Tracking

No constitution violations or additional architectural layers are required.
