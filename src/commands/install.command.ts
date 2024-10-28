// packages
import commander from "commander";

// adapters
import NpmAdapter from "../adapters/npm.adapter";

// helpers
import RegistryHelper from "../helpers/registry.helper";
import DebugHelper from "../helpers/debug.helper";

export default commander
  .createCommand()
  .name("install")
  .description("install packages")
  .aliases(["add"])
  .argument("<package_names...>")
  .option("-f --force", "don't output anything", false)
  .option("-d --save-dev", "don't output anything", false)
  .option("-s --save", "don't output anything", false)
  .action(async (packageNames, options) => {
    let packageIndex = 0;

    do {
      const [name, version] = packageNames[packageIndex].split("@");
      const debug = new DebugHelper({ header: name });

      try {
        debug.loading({ message: `fetching package details` });
        const packageDetails = await NpmAdapter.fetchPackage({
          name: name,
          version: version,
        });

        if (!packageDetails) {
          debug.failure({ message: "package doesn't found" });
          packageIndex++;
          continue;
        }

        if (!packageDetails.types && !packageDetails.typings) {
          debug.loading({ message: `fetching types package` });

          const typesPackageName = name.startsWith("@")
            ? `@types/${name.replace(/@/g, "").replace(/\//g, "__")}`
            : `@types/${name}`;

          const typesPackageDetails = await NpmAdapter.fetchPackage({
            name: typesPackageName,
            version: version,
          });

          if (!typesPackageDetails) {
            debug.loading({
              message: `instaling package (no-types)`,
            });

            await NpmAdapter.installPackage({
              name: name,
              version: version,
              force: options.force,
              production: options.production,
              development: options.development,
            });

            debug.success({
              message: `package installed (no-types)`,
            });

            packageIndex++;
            continue;
          }

          debug.loading({
            message: `installing package (external-types)`,
          });

          await NpmAdapter.installPackage({
            name: name,
            version: version,
            force: options.force,
            production: options.production,
            development: options.development,
          });

          await NpmAdapter.installPackage({
            name: typesPackageName,
            version: version,
            development: true,
          });

          debug.success({
            message: `package installed (external-types)`,
          });

          packageIndex++;
          continue;
        }

        debug.loading({
          message: `instaling package (already-typed)`,
        });

        await NpmAdapter.installPackage({
          name: name,
          version: version,
          force: options.force,
          production: options.production,
          development: options.development,
        });

        debug.success({
          message: `package installed (includes-types)`,
        });

        packageIndex++;
      } catch (error) {
        debug.failure({ message: error });
        packageIndex++;
        continue;
      }
    } while (packageIndex < packageNames.length);
  });
