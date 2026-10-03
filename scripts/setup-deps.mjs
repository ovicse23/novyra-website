import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const nmDir = path.join(rootDir, 'node_modules');
const pnpmTarget = path.join(nmDir, '.pnpm');
const binDir = path.join(nmDir, '.bin');

if (!fs.existsSync(nmDir)) {
  fs.mkdirSync(nmDir, { recursive: true });
}

if (fs.existsSync(path.join(rootDir, 'node_modules_pnpm')) && !fs.existsSync(pnpmTarget)) {
  fs.renameSync(path.join(rootDir, 'node_modules_pnpm'), pnpmTarget);
}

if (!fs.existsSync(binDir)) {
  fs.mkdirSync(binDir, { recursive: true });
}

// Find all packages inside .pnpm
const pnpmEntries = fs.readdirSync(pnpmTarget);

// We need to link packages into node_modules
for (const entry of pnpmEntries) {
  const pnpmPkgNm = path.join(pnpmTarget, entry, 'node_modules');
  if (fs.existsSync(pnpmPkgNm)) {
    const pkgs = fs.readdirSync(pnpmPkgNm);
    for (const pkg of pkgs) {
      if (pkg.startsWith('@')) {
        const scopeDir = path.join(nmDir, pkg);
        if (!fs.existsSync(scopeDir)) fs.mkdirSync(scopeDir, { recursive: true });
        const subPkgs = fs.readdirSync(path.join(pnpmPkgNm, pkg));
        for (const subPkg of subPkgs) {
          const target = path.join(scopeDir, subPkg);
          const source = path.join(pnpmPkgNm, pkg, subPkg);
          if (!fs.existsSync(target)) {
            try {
              fs.symlinkSync(source, target);
            } catch (e) {}
          }
        }
      } else {
        const target = path.join(nmDir, pkg);
        const source = path.join(pnpmPkgNm, pkg);
        if (!fs.existsSync(target)) {
          try {
            fs.symlinkSync(source, target);
          } catch (e) {}
        }
      }
    }
  }
}

// Also link binaries from .pnpm into .bin
const binMap = {
  vite: 'vite/bin/vite.js',
  wrangler: 'wrangler/bin/wrangler.js',
  tsc: 'typescript/bin/tsc',
  tsserver: 'typescript/bin/tsserver',
  tailwindcss: 'tailwindcss/lib/cli.js',
  vitest: 'vitest/vitest.mjs'
};

for (const [binName, relPath] of Object.entries(binMap)) {
  const targetBin = path.join(binDir, binName);
  const pkgName = relPath.split('/')[0];
  const pkgPath = path.join(nmDir, pkgName);
  if (fs.existsSync(pkgPath)) {
    const sourceScript = path.join(nmDir, relPath);
    if (fs.existsSync(sourceScript)) {
      if (!fs.existsSync(targetBin)) {
        try {
          fs.symlinkSync(sourceScript, targetBin);
        } catch (e) {}
      }
    }
  }
}

console.log('Dependencies successfully linked into node_modules!');
