const fs = require('fs-extra');
const path = require('path');

const files = ['package.json', 'package-lock.json', 'README.md'];
const dir = path.join(__dirname, 'dist');

fs.ensureDirSync(dir)
files.forEach((file) => {
  if (fs.existsSync(file)) {
    const src = path.join(__dirname, file);
    const dest = path.join(dir, file);
    fs.copyFileSync(src, dest);
  }
});