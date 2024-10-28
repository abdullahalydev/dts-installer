// packages
import commander from "commander";

// adapters
import NpmAdapter from "../adapters/npm.adapter";

// helpers
import RegistryHelper from "../helpers/registry.helper";
import DebugHelper from "../helpers/debug.helper";
import PackageHelper from "../helpers/package.helper";

export default commander
  .createCommand()
  .name("uninstall")
  .description("uninstall packages")
  .aliases(["delete", "remove"])
  .argument("<package_names...>")
  .action(async (packageNames, options) => {
    let packageIndex = 0;
    const packageJson = new PackageHelper();

    do {
      const packageName = packageNames[packageIndex];
      const debug = new DebugHelper({ header: packageName });

      debug.loading({ message: `uninstalling package` });

      await NpmAdapter.uninstallPackage({
        name: packageName,
      });

      if (packageJson.hasPackage({ name: `@types/${packageName}` })) {
        await NpmAdapter.uninstallPackage({
          name: `@types/${packageName}`,
        });
      }

      debug.success({ message: `package uninstalled` });

      packageIndex++;
    } while (packageIndex < packageNames.length);
  });
