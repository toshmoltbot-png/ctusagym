const fs = require('fs');
const path = require('path');

module.exports = function() {
  const dir = path.join(__dirname, 'clubs');
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
  const clubs = files.map(f => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf-8')));
  // Always sort alphabetically by club name
  clubs.sort((a, b) => (a.name || '').localeCompare(b.name || '', 'en', { sensitivity: 'base' }));
  return clubs;
};
