// packages
import path from "path";

export default class PackageHelper {
  private packageJsonFile: any;

  constructor() {
    const filePath = path.join(process.cwd(), "package.json");
    this.packageJsonFile = require(filePath);
  }

  public hasPackage({ name }) {
    return (
      !!this.packageJsonFile?.dependencies[name] ||
      !!this.packageJsonFile?.devDependencies[name]
    );
  }

  public fetchPackage({ name }) {
    return (
      this.packageJsonFile?.dependencies[name] ||
      this.packageJsonFile?.devDependencies[name]
    );
  }

  public fetchAllPackages() {
    const packages = {
      ...(this.packageJsonFile?.dependencies || {}),
      ...(this.packageJsonFile?.devDependencies || {}),
    };
    const packageNames = [];

    for (const _package in packages) {
      packageNames.push(_package);
    }

    return packageNames;
  }
}
