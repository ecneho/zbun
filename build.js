const fs = require('fs-extra');
const path = require('path');

const files = ['package.json', 'package-lock.json', 'README.md'];
const distDir = path.join(__dirname, 'dist');

fs.ensureDirSync(distDir);

files.forEach((file) => {
  const srcPath = path.join(__dirname, file);
  const destPath = path.join(distDir, file);

  if (fs.existsSync(srcPath)) {
    if (file === 'package.json') {
      const pkg = fs.readJsonSync(srcPath);
      if (pkg.bin) pkg.bin.zbun = 'index.js';
      if (pkg.scripts) pkg.scripts.build = "npx tsc && npx tsc-alias";
      fs.writeJsonSync(destPath, pkg, { spaces: 2 });
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
});