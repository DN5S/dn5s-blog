// pnpm configuration for handling packages with build scripts
module.exports = {
  hooks: {
    readPackage(pkg) {
      if (pkg.name === 'sharp') {
        return pkg;
      }
      return pkg;
    }
  }
};