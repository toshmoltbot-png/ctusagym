const fs = require('fs');
const path = require('path');

module.exports = function() {
  const dir = path.join(__dirname, 'hall_of_fame');
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
  const items = files.map(f => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf-8')));
  // Sort by year descending (newest class first)
  items.sort((a, b) => (b.year || 0) - (a.year || 0));
  return items;
};
