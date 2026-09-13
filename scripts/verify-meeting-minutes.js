const assert = require('assert');
const fs = require('fs');
const path = require('path');
const loadMinutes = require('../src/_data/meeting_minutes');

const root = path.resolve(__dirname, '..');
const expected = [
  ['current', 'June 2026 Committee Minutes', '/docs/2026-committee-minutes.doc'],
  ['current', 'June 2025 Committee Minutes', '/docs/2025-committee-minutes.doc'],
  ['current', 'June 2024 Committee Minutes', '/docs/2024-committee-minutes.doc'],
  ['current', 'June 2023 Committee Minutes', '/docs/2023-committee-minutes.doc'],
  ['current', 'June 2022 Committee Minutes', '/docs/2022-committee-minutes.docx'],
  ['current', 'June 2021 Committee Minutes', '/docs/2021-committee-minutes.docx'],
  ['current', 'August 2020 Committee Minutes', '/docs/2020-aug-committee-minutes.docx'],
  ['older', 'June 2020 Committee Minutes', '/docs/2020-jun-committee-minutes.docx'],
  ['older', 'June 2019 Committee Minutes', '/docs/2019-committee-minutes.docx'],
  ['older', 'June 2018 Committee Minutes', '/docs/2018-committee-minutes.docx'],
  ['older', 'June 2017 Committee Minutes', '/docs/2017-committee-minutes.docx'],
  ['older', 'June 2016 Committee Minutes', '/docs/2016-committee-minutes.docx'],
  ['older', '2015 Committee Minutes', '/docs/2015-committee-minutes.docx']
];

const groups = loadMinutes();
const actual = [
  ...groups.current.map(item => ['current', item.label, item.document]),
  ...groups.older.map(item => ['older', item.label, item.document])
];

assert.deepStrictEqual(actual, expected, 'Migrated labels, paths, groups, or order changed');
assert.strictEqual(new Set(actual.map(item => item[2])).size, expected.length, 'Duplicate document path');

for (const [, label, document] of actual) {
  const sourcePath = path.join(root, 'src', document.replace(/^\//, ''));
  assert.ok(fs.existsSync(sourcePath), `Missing source document for ${label}: ${sourcePath}`);
  assert.ok(fs.statSync(sourcePath).size > 1000, `Document is unexpectedly small: ${sourcePath}`);
}

assert.strictEqual(loadMinutes.isRenderable({
  label: 'Valid', document: '/docs/valid.pdf', display_group: 'current', order: 10
}), true);
assert.strictEqual(loadMinutes.isRenderable({
  label: '', document: '/docs/valid.pdf', display_group: 'current', order: 10
}), false);
assert.strictEqual(loadMinutes.isRenderable({
  label: 'Missing document', document: '', display_group: 'current', order: 10
}), false);
assert.strictEqual(loadMinutes.isRenderable({
  label: 'Invalid group', document: '/docs/valid.pdf', display_group: 'archive', order: 10
}), false);
assert.strictEqual(loadMinutes.isRenderable({
  label: 'Invalid order', document: '/docs/valid.pdf', display_group: 'current', order: 0
}), false);

const ties = [
  { label: 'Zulu', order: 10 },
  { label: 'Alpha', order: 10 }
].sort(loadMinutes.compareMinutes);
assert.deepStrictEqual(ties.map(item => item.label), ['Alpha', 'Zulu'], 'Tie-break is not deterministic');

const builtAbout = path.join(root, '_site', 'about', 'index.html');
if (fs.existsSync(builtAbout)) {
  const html = fs.readFileSync(builtAbout, 'utf8');
  for (const [, label, document] of expected) {
    assert.strictEqual(html.split(label).length - 1, 1, `Built label count is not one: ${label}`);
    assert.strictEqual(html.split(`href="${document}"`).length - 1, 1, `Built link count is not one: ${document}`);
    const builtDocument = path.join(root, '_site', document.replace(/^\//, ''));
    assert.ok(fs.existsSync(builtDocument), `Built document missing: ${builtDocument}`);
    assert.strictEqual(
      fs.readFileSync(builtDocument).compare(fs.readFileSync(path.join(root, 'src', document.replace(/^\//, '')))),
      0,
      `Built document differs from source: ${document}`
    );
  }
  for (const marker of ['State Committee', 'Competition Policies', 'Older Minutes']) {
    assert.ok(html.includes(marker), `Unrelated About-page marker missing: ${marker}`);
  }
}

console.log(`Meeting minutes verification passed: ${expected.length} records, ${groups.current.length} current, ${groups.older.length} older.`);
