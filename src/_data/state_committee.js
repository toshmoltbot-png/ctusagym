const fs = require('fs');
const path = require('path');

module.exports = function() {
  const dir = path.join(__dirname, 'state_committee');
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir)
    .filter(file => file.endsWith('.json'))
    .sort()
    .map(file => {
      const member = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'));
      return {
        ...member,
        emailLabel: member.emailLabel || (member.role || member.name ? `Email ${member.role || member.name}` : 'Email'),
        order: Number.isFinite(member.order) ? member.order : Number.MAX_SAFE_INTEGER
      };
    })
    .sort((a, b) => a.order - b.order || (a.name || '').localeCompare(b.name || '', 'en'));
};
