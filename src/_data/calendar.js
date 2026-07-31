const fs = require('fs');
const path = require('path');

module.exports = function() {
  const dir = path.join(__dirname, 'calendar');
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
  const meets = files.map(f => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf-8')));
  // Sort by start date
  meets.sort((a, b) => String(a.start || '').localeCompare(String(b.start || '')));
  return meets;
};
