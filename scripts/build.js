const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const source = path.join(root, "public");
const output = path.join(root, "dist");

function copyDir(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const sourcePath = path.join(from, entry.name);
    const outputPath = path.join(to, entry.name);
    if (entry.isDirectory()) {
      copyDir(sourcePath, outputPath);
    } else {
      fs.copyFileSync(sourcePath, outputPath);
    }
  }
}

try {
  fs.rmSync(output, { recursive: true, force: true });
  copyDir(source, output);
  console.log("Static app built to dist/");
} catch (error) {
  console.error(error);
  process.exit(1);
}
