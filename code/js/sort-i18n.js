import dict from "../_data/i18n/index.js";
import fs from "fs";

const sorted = Object.keys(dict)
  .sort((a, b) => a.localeCompare(b))
  .reduce((acc, k) => {
    acc[k] = dict[k];
    return acc;
  }, {});

fs.writeFileSync(
  new URL("../_data/i18n/index.js", import.meta.url),
  "export default " + JSON.stringify(sorted, null, 2)
);
