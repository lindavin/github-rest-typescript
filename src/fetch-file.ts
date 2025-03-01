import { appOctokit } from "./auth";

async function fetchFile() {

  // Send requests as GitHub App
  const response = await appOctokit.request("GET /app");
  console.log("authenticated as %s", response.data.slug as string);
}

fetchFile();

