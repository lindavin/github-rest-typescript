import * as fs from "fs";

console.log(fs.readFileSync(process.env['GH_APP_PRIVATE_KEY_FILE']).toString('utf-8').replace(/\n/g, "\\n"));
console.log(fs.readFileSync(process.env['GH_APP_PRIVATE_KEY_FILE']).toString('base64')); //b64 is an easy way to put contents on one line