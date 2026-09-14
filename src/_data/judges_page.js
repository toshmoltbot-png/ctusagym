const fs = require('fs');
const path = require('path');

module.exports = function() {
  return JSON.parse(fs.readFileSync(path.join(__dirname, 'judges_page', 'settings.json'), 'utf-8'));
};
