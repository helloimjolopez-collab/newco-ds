import { copyFileSync, mkdirSync } from "fs";

// The npm package's published payload lives in npm/ (peer to nuget/).
mkdirSync("npm", { recursive: true });
copyFileSync("src/tokens/tokens.css", "npm/tokens.css");
copyFileSync("src/tokens/tokens.js", "npm/tokens.js");
copyFileSync("tokens/newco-design-tokens.json", "npm/tokens.json");
console.log("npm/ built: tokens.css, tokens.js, tokens.json");
