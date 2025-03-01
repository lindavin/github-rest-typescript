import { createAppAuth } from "@octokit/auth-app";
import { Octokit } from "@octokit/core";

import { environment } from "./environment";

export const appOctokit = new Octokit({
  authStrategy: createAppAuth,
  auth: {
    appId: environment.ghAppId,
    privateKey: environment.ghAppPrivateKey,
    clientId: environment.ghAppClientId,
    clientSecret: environment.ghAppClientSecret,
    installationId: environment.ghAppInstallationId,
  },
});
