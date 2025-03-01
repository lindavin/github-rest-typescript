import { environment } from "./environment";
import { getJWTForGH } from "./util/jwt";

type POSTInstallationAccessTokensResponseBody = {
  token: string,
  expires_at: string,
}

type GETRepoContentsResponseBody = {
  content: string,
  encoding: string,
}

async function getInstallationAccessToken() {
  const res = await fetch(
    `https://api.github.com/app/installations/${environment.ghAppInstallationId}/access_tokens`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${getJWTForGH()}`,
        'X-GitHub-Api-Version': '2022-11-28'
      }
    }
  );

  if (!res.ok) {
    throw Error(`response failed status=${res.status} statusText=${res.statusText} text=${await res.text()}`)
  }

  const body = await res.json() as POSTInstallationAccessTokensResponseBody;

  return body.token;
}

async function main() {
  const getUrl = ({ filePath, owner, repo }) => `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`
  const res = await fetch(
    getUrl({
      filePath: 'openapi/openapi.yaml',
      owner: 'Redocly',
      repo: 'openapi-starter'
    }),
    {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${await getInstallationAccessToken()}`,
        'X-GitHub-Api-Version': '2022-11-28'
      }
    }
  );

  if (!res.ok) {
    throw Error(`response failed status=${res.status} statusText=${res.statusText} text=${await res.text()}`)
  }

  const { content, encoding } = await res.json() as GETRepoContentsResponseBody;

  if (!Buffer.isEncoding(encoding)) {
    throw Error(`encoding "${encoding}" is not supported!`)
  }

  return Buffer.from(content, encoding).toString();
}

// getInstallationAccessToken()
//   .then(console.log);

main()
  .then(console.log);
