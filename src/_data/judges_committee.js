const fs = require('fs');
const path = require('path');

module.exports = function() {
  const dir = path.join(__dirname, 'judges_committee');
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(f => f.endsWith('.json')).sort()
    .map(f => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf-8')))
    .filter(d => typeof d.name === 'string' && d.name.trim())
    .map(({ editor_label, ...d }) => ({ ...d,
      external_links: (Array.isArray(d.external_links) ? d.external_links : [])
        .filter(link => link && link.label && /^https?:\/\//i.test(link.url || ''))
    }))
    .sort((a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }));
};
