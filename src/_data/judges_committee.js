const fs = require('fs');
const path = require('path');

module.exports = function() {
  const dir = path.join(__dirname, 'judges_committee');
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
  const items = files.map(f => { const d = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf-8')); delete d.editor_label; return d; });
  items.sort((a, b) => (a.name || '').localeCompare(b.name || '', 'en', { sensitivity: 'base' }));
  return items;
};
