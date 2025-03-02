import * as fs from "fs";

const GH_APP_CLIENT_ID = 'GH_APP_CLIENT_ID';
const GH_APP_CLIENT_SECRET = 'GH_APP_CLIENT_SECRET';
const GH_APP_ID = 'GH_APP_ID';
const GH_APP_INSTALLATION_ID = 'GH_APP_INSTALLATION_ID';
const GH_APP_PRIVATE_KEY = 'GH_APP_PRIVATE_KEY';
const GH_APP_PRIVATE_KEY_FILE = 'GH_APP_PRIVATE_KEY_FILE';

interface IEnvironment {
  ghAppClientId: string;
  ghAppClientSecret: string;
  ghAppId: string;
  ghAppInstallationId: string;
  ghAppPrivateKey: string;
}

class Environment implements IEnvironment {
  ghAppClientId: string;
  ghAppClientSecret: string;
  ghAppId: string;
  ghAppPrivateKey: string;
  ghAppInstallationId: string;

  constructor() {
    this.ghAppClientId = process.env[GH_APP_CLIENT_ID];
    this.ghAppClientSecret = process.env[GH_APP_CLIENT_SECRET];
    this.ghAppId = process.env[GH_APP_ID];
    this.ghAppInstallationId = process.env[GH_APP_INSTALLATION_ID];

    if (!this.ghAppClientId) {
      throw Error(this.errorMessage(GH_APP_CLIENT_ID));
    }

    if (!this.ghAppClientSecret) {
      throw Error(this.errorMessage(GH_APP_CLIENT_SECRET));
    }

    if (!this.ghAppId) {
      throw Error(this.errorMessage(GH_APP_ID));
    }

    if (!this.ghAppInstallationId) {
      throw Error(this.errorMessage(GH_APP_INSTALLATION_ID));
    }

    // const ghAppPrivateKeyFile = process.env[GH_APP_PRIVATE_KEY_FILE];
    // if (!ghAppPrivateKeyFile) {
    //   throw Error(this.errorMessage(GH_APP_PRIVATE_KEY_FILE));
    // }

    // this.ghAppPrivateKey = fs.readFileSync(ghAppPrivateKeyFile).toString('utf-8');

    this.ghAppPrivateKey = Buffer.from(process.env[GH_APP_PRIVATE_KEY], 'base64').toString('utf-8');
    if (!this.ghAppPrivateKey) {
      throw Error(this.errorMessage(GH_APP_PRIVATE_KEY));
    }
  }

  errorMessage(envVar: string) {
    return `environment variable "${envVar}" is not set!`;
  }
}

export const environment: IEnvironment = new Environment();
