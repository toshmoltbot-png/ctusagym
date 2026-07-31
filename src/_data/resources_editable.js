const fs = require('fs');
const path = require('path');

module.exports = function() {
  const dir = path.join(__dirname, 'resources_editable');
  if (!fs.existsSync(dir)) return {};
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
  if (files.length === 0) return {};
  const data = JSON.parse(fs.readFileSync(path.join(dir, files[0]), 'utf-8'));
  delete data.editor_label;
  return data;
};
