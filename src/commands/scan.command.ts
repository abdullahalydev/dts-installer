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
  .name("scan")
  .description("scan for installed packages")
  .aliases(["check"])
  .action(async (options) => {
    let packageIndex = 0;
    const packageJson = new PackageHelper();
    const allPackages = packageJson.fetchAllPackages();

    do {
      const packageName = allPackages[packageIndex];
      const debug = new DebugHelper({ header: packageName });

      try {
        debug.loading({ message: `fetching package details` });
        const packageDetails = await NpmAdapter.fetchPackage({
          name: packageName,
        });

        if (!packageDetails.types && !packageDetails.typings) {
          debug.loading({ message: `fetching types package` });

          const typesPackageName = packageName.startsWith("@")
            ? `@types/${packageName.replace(/@/g, "").replace(/\//g, "__")}`
            : `@types/${packageName}`;

          const typesPackageDetails = await NpmAdapter.fetchPackage({
            name: typesPackageName,
          });

          if (!typesPackageDetails) {
            debug.success({
              message: `package has no types`,
            });
            packageIndex++;
            continue;
          }

          debug.loading({
            message: `installing types`,
          });

          await NpmAdapter.installPackage({
            name: typesPackageName,
            production: false,
          });

          debug.success({
            message: `types installed (external-types)`,
          });

          packageIndex++;
          continue;
        }

        debug.success({
          message: `package already included types (includes-types)`,
        });

        packageIndex++;
      } catch (error) {
        debug.failure({ message: error });
        packageIndex++;
        continue;
      }
    } while (packageIndex < allPackages.length);
  });
