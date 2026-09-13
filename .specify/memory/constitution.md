# CTUSAGym Constitution

## Core Principles

### I. Public Continuity
Published URLs and user-visible content MUST remain stable during migrations unless a change is
explicitly required. Existing document links MUST continue to resolve, and normalized rendered
content comparisons MUST prove that unrelated content was preserved.

### II. Editor-First Content
Content that state administrators routinely manage MUST be exposed through clear CloudCannon data
collections. Content Editors MUST be able to complete the supported workflow without source-code,
repository, deployment, billing, or infrastructure access. Labels and field help MUST use plain
language appropriate for non-technical users.

### III. Deterministic Data
Editable collections MUST use a uniform schema, deterministic loading and ordering, and graceful
handling of incomplete optional fields. Required fields MUST prevent broken public links. Migration
scripts or checks MUST reconcile every legacy record exactly once.

### IV. Least Privilege
Rich retains technical ownership of GitHub, CloudCannon organization and billing, DNS, builds, and
deployment. Client editors receive content-only permissions. Secrets, credentials, private account
identifiers, and recovery material MUST NOT be committed to the repository or exposed in editor
fields.

### V. Proof Before Completion
Every production change MUST pass schema validation, a local Eleventy build, scoped Git review,
remote commit verification, a changed CloudCannon build identity, HTTP checks for every affected
route and asset, and a real browser render with screenshot evidence. A push alone is not proof of
deployment.

## Technical Constraints

- Preserve the existing Eleventy and Nunjucks architecture.
- Prefer simple JSON data and existing loaders over new dependencies.
- Uploaded public assets MUST use a proven Eleventy passthrough directory and an explicit content
  link field.
- Collection ordering MUST be encoded in data and MUST NOT depend on filesystem enumeration order.
- Public templates MUST omit incomplete records rather than render broken controls.

## Delivery Workflow

1. Establish the canonical clean repository and fetch the deploy branch before editing.
2. Write a feature specification, implementation plan, and dependency-ordered task list before code.
3. Migrate legacy content with counts, labels, URLs, and rendered output reconciled.
4. Validate the Content Editor workflow as well as generated site output.
5. Publish only intentionally scoped changes and complete all production proof gates.

## Governance

This constitution governs CTUSAGym feature work. Amendments require a documented rationale, semantic
version update, and review of active specs for conflicts. MAJOR versions remove or redefine a core
principle, MINOR versions add or materially expand governance, and PATCH versions clarify wording.
Every implementation plan MUST include a constitution check, and every completion report MUST cite
the verification evidence required by Principle V.

**Version**: 1.0.0 | **Ratified**: 2026-09-13 | **Last Amended**: 2026-09-13
