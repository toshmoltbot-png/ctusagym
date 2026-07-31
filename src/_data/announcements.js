const fs = require('fs');
const path = require('path');

module.exports = function() {
  const dir = path.join(__dirname, 'announcements');
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
  const items = files.map(f => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf-8')));
  // Sort by title alphabetically (stable fallback when dates are free text)
  items.sort((a, b) => (a.title || '').localeCompare(b.title || '', 'en', { sensitivity: 'base' }));
  return items;
};
