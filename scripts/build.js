const {
  readdirSync,
  existsSync,
  writeFileSync,
  readFileSync,
  unlinkSync,
} = require('fs');
const { join } = require('path');

const paths = {
  tsconfig: join(__dirname, '../tsconfig.json'),
  packages: join(__dirname, '../packages'),
};

if (!existsSync(paths.tsconfig)) {
  throw new Error('Root tsconfig.json required!');
}

const tsconfig = readFileSync(paths.tsconfig);

const isPkg = (pkg) =>
  !pkg.startsWith('.') && existsSync(join(paths.packages, pkg, 'package.json'));
const pkgs = readdirSync(paths.packages).filter(isPkg);

const args = process.argv.slice(2);
const opt = args[0] || '';

switch (opt) {
  case '--pre':
    pkgs.forEach((pkg) => {
      const tsJSON = join(paths.packages, pkg, 'tsconfig.json');
      if (!existsSync(tsJSON)) {
        writeFileSync(tsJSON, tsconfig);
      }
    });
    break;
  case '--post':
    pkgs.forEach((pkg) => {
      const tsJSON = join(paths.packages, pkg, 'tsconfig.json');
      if (existsSync(tsJSON) && readFileSync(tsJSON).compare(tsconfig) === 0) {
        unlinkSync(tsJSON);
      }
    });
    break;
  default:
    break;
}
