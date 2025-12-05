#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectoryPath = path.dirname(currentFilePath);
const workspaceDirectories = ["../client", "../server"];
const environmentFiles = [
  { temporaryFileName: "temporary.env.development.local", environmentFileName: ".env.development.local" },
  { temporaryFileName: "temporary.env.production.local", environmentFileName: ".env.production.local" }
];

const copyFileWithBackup = (sourceFilePath, destinationFilePath) => {
  if (!fs.existsSync(sourceFilePath)) {
    return;
  }
  if (fs.existsSync(destinationFilePath)) {
    const backupFileName = `backup.${Date.now()}${path.basename(destinationFilePath)}`;
    const backupFilePath = path.join(path.dirname(destinationFilePath), backupFileName);
    fs.renameSync(destinationFilePath, backupFilePath);
  }
  fs.copyFileSync(sourceFilePath, destinationFilePath);
}

const main = () => {
  for (const workspaceDirectory of workspaceDirectories) {
    const absoluteWorkspaceDirectory = path.resolve(currentDirectoryPath, workspaceDirectory);
    for (const { temporaryFileName, environmentFileName } of environmentFiles) {
      const absoluteSourceFilePath = path.join(absoluteWorkspaceDirectory, temporaryFileName);
      const absoluteDestinationFilePath = path.join(absoluteWorkspaceDirectory, environmentFileName);
      copyFileWithBackup(absoluteSourceFilePath, absoluteDestinationFilePath);
    }
  }
}

main();
