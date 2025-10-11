export const frequentFolders = [
    { 
        name: 'lua',
        value: 'lua'
    },
    { 
        name: 'scripts',
        value: 'scripts'
    },
];

import fs from 'fs';
import path from 'path';

const mediaPath = ""; // adjust later

export const allFolders = fs.readdirSync(mediaPath, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => ({
    name: dirent.name,
    value: dirent.name
  }));