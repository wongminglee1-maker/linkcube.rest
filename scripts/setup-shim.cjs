const fs = require('fs');
const path = require('path');

const binDir = path.resolve('node_modules/.bin');
if (!fs.existsSync(binDir)) {
  fs.mkdirSync(binDir, { recursive: true });
}

// 1. Unix / Linux bash executable for Cloudflare Pages (Ubuntu)
const unixShim = `#!/usr/bin/env node
const path = require('path');
require(path.resolve(__dirname, '../../scripts/build-shim.cjs'));
`;
const unixFile = path.join(binDir, 'next');
try {
  fs.writeFileSync(unixFile, unixShim, { encoding: 'utf8', mode: 0o755 });
} catch (e) {
  // ignore
}

// 2. Windows cmd wrapper
const winCmd = `@ECHO off
node "%~dp0\\..\\..\\scripts\\build-shim.cjs" %*
`;
const cmdFile = path.join(binDir, 'next.cmd');
try {
  fs.writeFileSync(cmdFile, winCmd, 'utf8');
} catch (e) {
  // ignore
}

console.log('[LinkCube CI Setup] Multi-framework build compatibility shim configured.');
