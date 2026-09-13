# Data Model: Self-Service Meeting Minutes

## Meeting Minute

| Field | Type | Required | Rules |
|---|---|---:|---|
| `editor_label` | string | yes | Clear CloudCannon list label; not rendered publicly |
| `label` | string | yes | Visitor-facing link text; non-empty |
| `meeting_date` | date string | yes | ISO `YYYY-MM-DD`; used for editor context, not display sorting |
| `document` | path string | yes | Site-relative path beginning `/docs/` or `/uploads/meeting-minutes/` |
| `display_group` | enum string | yes | Exactly `current` or `older` |
| `order` | integer | yes | Positive integer; ascending within each group |

## Validation Rules

- Invalid JSON fails the build and verification script.
- A record missing `label` or `document`, or with an invalid `display_group`, is omitted from rendering.
- Verification fails duplicate document paths or migrated-record count mismatches.
- Equal order values sort by `label` using English locale comparison.
- Deleting a record removes the public link but leaves its document asset intact.

## State Transitions

1. **Draft record**: editor creates a JSON record and supplies fields/document.
2. **Saved record**: CloudCannon commits the record and uploaded asset.
3. **Published record**: build validates and renders the record in its assigned group.
4. **Archived record**: editor changes `display_group` from `current` to `older` and adjusts order.
5. **Removed record**: editor deletes the JSON record; asset retention prevents accidental data loss.
