const fs = require('fs');
const path = require('path');

const VALID_GROUPS = new Set(['current', 'older']);

function isRenderable(item) {
  return Boolean(
    item &&
    typeof item.label === 'string' && item.label.trim() &&
    typeof item.document === 'string' && item.document.trim() &&
    VALID_GROUPS.has(item.display_group) &&
    Number.isInteger(item.order) && item.order > 0
  );
}

function compareMinutes(a, b) {
  return a.order - b.order || a.label.localeCompare(b.label, 'en');
}

module.exports = function() {
  const dir = path.join(__dirname, 'meeting_minutes');
  const groups = { current: [], older: [] };
  if (!fs.existsSync(dir)) return groups;

  const files = fs.readdirSync(dir).filter(file => file.endsWith('.json')).sort();
  for (const file of files) {
    let item;
    try {
      item = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'));
    } catch (error) {
      throw new Error(`Invalid meeting minute JSON in ${file}: ${error.message}`);
    }

    if (!isRenderable(item)) continue;
    delete item.editor_label;
    groups[item.display_group].push(item);
  }

  groups.current.sort(compareMinutes);
  groups.older.sort(compareMinutes);
  return groups;
};

module.exports.isRenderable = isRenderable;
module.exports.compareMinutes = compareMinutes;
