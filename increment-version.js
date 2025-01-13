import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current directory and resolve the package.json path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageJsonPath = path.resolve(__dirname, 'package.json');

// Read and parse package.json
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Increment the patch version
const versionParts = packageJson.version.split('.').map(Number);
versionParts[2]++; // Increment patch version

// Update the version in package.json
packageJson.version = versionParts.join('.');
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log(`Version updated to ${packageJson.version}`);
