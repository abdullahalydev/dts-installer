#!/usr/bin/env node

// packages
import commander from "commander";

// commands
import installCommand from "../commands/install.command";
import uninstallCommand from "../commands/uninstall.command";
import scanCommand from "../commands/scan.command";

commander.program
  .name("types")
  .description("install your packages with his types")
  .version("0.0.1")
  .addCommand(installCommand)
  .addCommand(uninstallCommand)
  .addCommand(scanCommand)
  .parse();
