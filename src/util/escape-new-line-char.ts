import * as fs from "fs";

console.log(fs.readFileSync(process.env['GH_APP_PRIVATE_KEY_FILE']).toString('utf-8').replace(/\n/g, "\\n"));
