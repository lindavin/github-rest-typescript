import { appOctokit } from "./auth";

type Args = {
  owner: string,
  repo: string,
  path: string,
}

type FileResponseBody = {
  content?: string,
  encoding: string,
}

async function fetchFile(args: Args) {

  // Send requests as GitHub App
  const response = await appOctokit.request("GET /repos/{owner}/{repo}/contents/{path}", args);
  const { content, encoding } = response.data as FileResponseBody;

  if (content && Buffer.isEncoding(encoding)) {
    return Buffer.from(content, encoding).toString();
  }

  console.error('bad case')
}

fetchFile({
  owner: 'OAI',
  repo: 'OpenAPI-Specification',
  path: 'SPECIAL_INTEREST_GROUPS.md',
}).then(console.log);

