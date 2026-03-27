const fs = require("fs");
const path = require("path");

const neetcodePath = path.join(__dirname, "..", "src", "data", "neetcode.ts");
const solutionsPath = path.join(__dirname, "..", "src", "data", "solutions.ts");

const neet = fs.readFileSync(neetcodePath, "utf8");
const sol = fs.readFileSync(solutionsPath, "utf8");

const slugs = [...neet.matchAll(/"slug"\s*:\s*"([^"]+)"/g)].map((m) => m[1]);
const literalKeys = [...sol.matchAll(/"([^"]+)"\s*:\s*`/g)].map((m) => m[1]);
const assignedKeys = [...sol.matchAll(/SOLUTIONS\["([^"]+)"\]\s*=\s*`/g)].map((m) => m[1]);
const keys = [...new Set([...literalKeys, ...assignedKeys])];

const setKeys = new Set(keys);
const missing = slugs.filter((s) => !setKeys.has(s));
const extra = keys.filter((k) => !slugs.includes(k));

console.log("slugs", slugs.length, "solutionKeys", keys.length);
console.log("missingSolutions", missing.length);
console.log(missing.slice(0, 50));
console.log("extraKeys", extra.length);
console.log(extra.slice(0, 50));

