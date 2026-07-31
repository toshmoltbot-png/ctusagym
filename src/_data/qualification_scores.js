const fs = require('fs');
const path = require('path');

module.exports = function() {
  const dir = path.join(__dirname, 'qualification_scores');
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json')).sort();
  return files.map(f => { const d = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf-8')); delete d.editor_label; return d; });
};
