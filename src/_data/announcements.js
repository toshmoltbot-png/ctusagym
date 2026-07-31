const fs = require('fs');
const path = require('path');

function parseAnnouncementDate(dateStr) {
  if (!dateStr) return 0;
  const d = new Date(dateStr);
  if (!isNaN(d.getTime())) return d.getTime();
  return 0;
}

module.exports = function() {
  const dir = path.join(__dirname, 'announcements');
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json')).sort();
  const items = files.map((f, i) => {
    const data = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf-8'));
    data._sortIndex = i;
    delete data.editor_label;
    return data;
  });
  items.sort((a, b) => {
    const dateDiff = parseAnnouncementDate(b.date) - parseAnnouncementDate(a.date);
    if (dateDiff !== 0) return dateDiff;
    return a._sortIndex - b._sortIndex;
  });
  items.forEach(item => delete item._sortIndex);
  return items;
};
