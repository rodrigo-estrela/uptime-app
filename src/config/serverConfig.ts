interface EnvType {
  httpPort: number;
  httpsPort: number;
  envName: string;
}

interface Environments {
  [name: string]: EnvType;
}

const environments: Environments = {
  staging: {
    httpPort: 3000,
    httpsPort: 3001,
    envName: 'staging'
  },

  production: {
    httpPort: 5000,
    httpsPort: 5001,
    envName: 'production'
  }
};

const currentEnv = process.env.NODE_ENV ? process.env.NODE_ENV.toLowerCase() : '';

const envToExport = environments[currentEnv] ? environments[currentEnv] : environments.staging;

export default envToExport;
