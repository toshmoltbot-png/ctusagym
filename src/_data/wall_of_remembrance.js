const fs = require('fs');
const path = require('path');

module.exports = function() {
  const dir = path.join(__dirname, 'wall_of_remembrance');
  if (!fs.existsSync(dir)) return [];
  // Sort by filename - numbered prefixes preserve original post order,
  // new entries added via CMS sort to end (after numbered files)
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json')).sort();
  return files.map(f => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf-8')));
};
