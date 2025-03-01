# GitHUB REST Typescript

## Setup
```sh
npm i -g @dotenvx/dotenvx
npm i -g ts-node
```

Example run:
```sh
dotenvx run -- ts-node src/environment.ts
```

This repo shows have to fetch files using GitHub's REST API, a GitHub app, and nodejs.
and typescript.
For authentication, you'll need to:
1. create a new GitHub app and
  1. install it your account
  2. generate a private key for it. This repo leverages the private key; you won't need 
  to generate a client secret. 
2. duplicate the template.env file into .env and fill out the latter
  1. for GH_APP_PRIVATE_KEY store the base64 encoded form of one your GH app's private key.
  We use base64 as an easy way to get its contents into one line.

`src/fetch-file.ts` and `src/gh-installation-access-token.ts#main` demonstrates
how to fetch a file by authenticating as an GitHub App Installation (i.e. leveraging
an [installation access token](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-an-installation-access-token-for-a-github-app#about-installation-access-tokens))
via two different ways (octokit sdk and manual authentication respectively).
[Here](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/authenticating-as-a-github-app-installation) is the official documentation on how to do that.
