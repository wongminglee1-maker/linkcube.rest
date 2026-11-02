const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\USERR\\AppData\\Local\\Programs\\antigravity';
const dstDir = path.resolve('node_modules/@bruits/satteri-win32-x64-msvc');

if (fs.existsSync(srcDir) && fs.existsSync(dstDir)) {
  ['msvcp140.dll', 'msvcp140_1.dll', 'vcruntime140.dll', 'vcruntime140_1.dll'].forEach(f => {
    const srcFile = path.join(srcDir, f);
    const dstFile = path.join(dstDir, f);
    try {
      if (fs.existsSync(srcFile) && !fs.existsSync(dstFile)) {
        fs.copyFileSync(srcFile, dstFile);
      }
    } catch (e) {
      // ignore
    }
  });
}
