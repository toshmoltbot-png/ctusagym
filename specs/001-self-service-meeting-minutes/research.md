# Research: Self-Service Meeting Minutes

## Decision: One JSON file per minute record

**Rationale**: This matches the site's existing CloudCannon collections, gives each record an independent
editor screen, and minimizes merge conflicts.

**Alternatives considered**: A single JSON array was rejected because record-level add/remove workflows
are less clear. Editing the About template was rejected because Content Editors cannot access it.

## Decision: Preserve legacy assets and use a dedicated path for new uploads

**Rationale**: Existing `/docs/...` URLs must remain stable. CloudCannon can store future documents in
`/uploads/meeting-minutes/`, which is already covered by Eleventy passthrough.

**Alternatives considered**: Moving all old documents would break bookmarks. Uploading into `/docs/`
would mix managed uploads with preserved migration assets.

## Decision: Explicit order plus deterministic fallback

**Rationale**: A small numeric `order` field is understandable to editors and preserves the current
presentation exactly. Label fallback makes duplicate order values deterministic.

**Alternatives considered**: Date-only sorting cannot preserve the special August/June 2020 ordering and
would make archive grouping implicit.

## Decision: Validate without adding a dependency

**Rationale**: A small Node assertion script can parse every JSON record, enforce required fields and
groups, detect duplicate paths, and validate migration counts using the runtime already in the project.

**Alternatives considered**: Adding a schema library would increase dependency surface for 12 simple records.
