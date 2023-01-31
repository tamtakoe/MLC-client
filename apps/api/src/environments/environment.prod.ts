import { getApiConfig, getWebConfig, injectWebConfigToBuild } from './environment-util';

console.log('Configuration: api-production');
// Inject production config to the build of web application
injectWebConfigToBuild();

export const config = getApiConfig();
export const webConfig = getWebConfig();
