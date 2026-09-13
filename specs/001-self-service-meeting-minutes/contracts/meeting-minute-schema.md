# Editor and Rendering Contract: Meeting Minute

## Editor contract

CloudCannon exposes a visible collection named **Meeting Minutes**. Each record form presents, in order:

1. Editor Label
2. Public Link Label
3. Meeting Date
4. Minutes Document upload
5. Additional PDF Version upload (optional)
6. Display Section (`Current Minutes` or `Older Minutes`)
7. Display Order

The collection permits add, edit, and delete operations available to existing Content Editors. The
document input uploads beneath `/uploads/meeting-minutes/` and stores a site-relative path.

## Data example

```json
{
  "editor_label": "2026 - June Committee Minutes",
  "label": "June 2026 Committee Minutes",
  "meeting_date": "2026-06-26",
  "document": "/docs/2026-committee-minutes.doc",
  "pdf_document": "/docs/2026-committee-minutes.pdf",
  "display_group": "current",
  "order": 1
}
```

## Rendering contract

- `current` records render in the always-visible list.
- `older` records render only inside the existing collapsed `Older Minutes` details element.
- Valid records render the public label as a link. If `pdf_document` is present, the public label opens the PDF and a separate Word link opens `document`. Otherwise the public label opens `document`.
- Invalid or incomplete records render no anchor.
- Link classes and arrow markup remain byte-equivalent to the pre-migration template.
