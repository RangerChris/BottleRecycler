const fs = require("fs");
const path = require("path");
const libCoverage = require("istanbul-lib-coverage");
const libReport = require("istanbul-lib-report");
const reports = require("istanbul-reports");

const coverageDir = path.resolve("coverage", "playwright");
const outDir = path.resolve("coverage", "report");

if (!fs.existsSync(coverageDir)) {
  console.log("No playwright coverage directory found:", coverageDir);
  process.exit(0);
}

const files = fs.readdirSync(coverageDir).filter((f) => f.endsWith(".json"));
const map = libCoverage.createCoverageMap({});

files.forEach((f) => {
  const p = path.join(coverageDir, f);
  const cov = JSON.parse(fs.readFileSync(p, "utf8"));
  try {
    map.merge(cov);
  } catch (err) {
    console.warn("Failed to merge", p, err.message);
  }
});

fs.mkdirSync(outDir, { recursive: true });
const combined = path.join(outDir, "coverage-final.json");
fs.writeFileSync(combined, JSON.stringify(map.toJSON()));

const context = libReport.createContext({
  dir: outDir,
  coverageMap: map,
});

const report = reports.create("html", { skipEmpty: false, skipFull: false });
report.execute(context);

console.log("Coverage merged and report generated at:", outDir);
