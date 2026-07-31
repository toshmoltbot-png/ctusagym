const fs = require('fs');
const path = require('path');

module.exports = function() {
  const dir = path.join(__dirname, 'state_meets');
  if (!fs.existsSync(dir)) return { reminders: {}, meets: [] };
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json')).sort();
  
  let reminders = {};
  const meets = [];
  
  for (const f of files) {
    const data = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf-8'));
    if (f.includes('reminders')) {
      reminders = data;
    } else {
      meets.push(data);
    }
  }
  
  return { reminders, meets };
};
