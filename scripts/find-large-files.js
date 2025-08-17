const fs = require("fs");
const path = require("path");

function formatBytes(bytes) {
  return (bytes / 1024).toFixed(2) + " KB";
}

function findLargeFiles(dir, threshold = 100 * 1024) {
  // 100KB
  const results = [];

  function traverse(currentPath) {
    const files = fs.readdirSync(currentPath);

    for (const file of files) {
      const filePath = path.join(currentPath, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        if (!file.includes("node_modules") && !file.startsWith(".")) {
          traverse(filePath);
        }
      } else if (stat.isFile()) {
        if (stat.size > threshold) {
          results.push({
            path: filePath,
            size: stat.size,
            sizeFormatted: formatBytes(stat.size),
          });
        }
      }
    }
  }

  traverse(dir);
  return results.sort((a, b) => b.size - a.size);
}

// Проверяем разные директории
const directories = ["./docs", "./blog", "./src", "./static", "./build"];

console.log("🔍 Поиск больших файлов...\n");

directories.forEach((dir) => {
  if (fs.existsSync(dir)) {
    const largeFiles = findLargeFiles(dir);
    if (largeFiles.length > 0) {
      console.log(`📁 ${dir}:`);
      largeFiles.forEach((file) => {
        const relPath = path.relative(process.cwd(), file.path);
        console.log(`  - ${relPath}: ${file.sizeFormatted}`);
      });
      console.log("");
    }
  }
});
