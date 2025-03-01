// import * as fs from 'fs';
import jwt from "jsonwebtoken";

import { environment } from "../environment";

export function getJWTForGH(): string {
  const nowInSeconds = Math.floor(Date.now()/1000);
  const payload = {
    iat: nowInSeconds - 60,
  }

  // const privateKey = fs.readFileSync(process.env['GH_APP_PRIVATE_KEY_FILE']);

  const privateKey = environment.ghAppPrivateKey;

  return jwt.sign(payload, privateKey, { issuer: environment.ghAppClientId, algorithm: 'RS256', expiresIn: '10m' })
}

async function main() {
  console.log(getJWTForGH())
  const res = await fetch('https://api.github.com/app', {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${getJWTForGH()}`,
      'X-GitHub-Api-Version': '2022-11-28',
    }
  });

  if (!res.ok) {
    throw Error(`response failed status=${res.status} statusText=${res.statusText} text=${await res.text()}`)
  }

  return await res.json();
}

// main()
//   .then(console.log);
