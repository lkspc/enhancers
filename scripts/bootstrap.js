const { readdirSync, existsSync, writeFileSync } = require('fs');
const { join } = require('path');

const paths = {
  packages: join(__dirname, '../packages'),
};

const pkgs = readdirSync(paths.packages).filter((pkg) => !pkg.startsWith('.'));

pkgs.forEach((name) => {
  const pkgJSON = join(paths.packages, name, 'package.json');
  const json = {
    name: `@lkspc/${name}-enhancers`,
    version: '1.0.0',
    description: `Enhancers for ${name}`,
    author: 'lkspc <lkspc@qq.com>',
    homepage: `https://github.com/lkspc/enhancers/tree/master/packages/${name}#readme`,
    license: 'MIT',
    main: 'dist/index.js',
    module: 'dist/index.esm.js',
    types: 'dist/index.d.ts',
    files: ['dist'],
    publishConfig: {
      access: 'public',
    },
    repository: {
      type: 'git',
      url: 'https://github.com/lkspc/enhancers.git',
    },
    bugs: {
      url: 'https://github.com/lkspc/enhancers/issues',
    },
  };

  if (existsSync(pkgJSON)) {
    const pkg = require(pkgJSON);
    [
      'dependencies',
      'devDependencies',
      'peerDependencies',
      'bin',
      'version',
      'files',
      'authors',
      'types',
      'sideEffects',
      'main',
      'module',
      'description',
    ].forEach((key) => {
      if (pkg[key]) json[key] = pkg[key];
    });
  }

  writeFileSync(pkgJSON, JSON.stringify(json, null, 2) + '\n');
});
