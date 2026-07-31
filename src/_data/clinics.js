const fs = require('fs');
const path = require('path');

function parseClinicDate(dateStr) {
  if (!dateStr) return Infinity;
  const d = new Date(dateStr);
  if (!isNaN(d.getTime())) return d.getTime();
  return Infinity;
}

module.exports = function() {
  const dir = path.join(__dirname, 'clinics');
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
  const items = files.map(f => { const d = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf-8')); delete d.editor_label; return d; });
  items.sort((a, b) => parseClinicDate(a.date_label) - parseClinicDate(b.date_label));
  return items;
};
