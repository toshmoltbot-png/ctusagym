const fs = require('fs');
const path = require('path');

// Parse "Mon YYYY" or "Mon DD, YYYY" or ISO dates to comparable timestamps
function parseAnnouncementDate(dateStr) {
  if (!dateStr) return 0;
  const d = new Date(dateStr);
  if (!isNaN(d.getTime())) return d.getTime();
  return 0;
}

module.exports = function() {
  const dir = path.join(__dirname, 'announcements');
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
  const items = files.map(f => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf-8')));
  // Sort by date, newest first (order announced)
  items.sort((a, b) => parseAnnouncementDate(b.date) - parseAnnouncementDate(a.date));
  return items;
};
