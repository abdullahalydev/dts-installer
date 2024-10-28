// packages
import * as child_process from "node:child_process";

export default class NpmAdapter {
  static fetchPackage({ name, version = "latest" }): Promise<any> {
    return new Promise((resolve, reject) => {
      child_process.exec(
        `npm view --json ${name}@${version}`,
        (error, stdout, stderr) => {
          if (error) {
            resolve(undefined);
          }

          resolve(JSON.parse(stdout));
        },
      );
    });
  }

  static installPackage({
    name,
    version = "latest",
    production = false,
    development = false,
    force = false,
  }) {
    return new Promise((resolve, reject) => {
      child_process.exec(
        `npm install ${production ? "--save" : ""}${development ? "--save-dev" : ""}${force ? " --force" : ""} ${name}@${version}`,
        (error, stdout, stderr) => {
          if (error) {
            if (error.message.includes("npm error code E404")) {
              return reject("package not found");
            }

            return reject("error while installing");
          }

          return resolve("package installed");
        },
      );
    });
  }

  static uninstallPackage({ name }) {
    return new Promise((resolve, reject) => {
      child_process.exec(`npm remove ${name}`, (error, stdout, stderr) => {
        return resolve("package uninstalled");
      });
    });
  }
}
