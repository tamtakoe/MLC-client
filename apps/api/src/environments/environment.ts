// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `app.config.production.ts` with `app.config.production.ts`.
// The list of file replacements can be found in `angular.json`.

import { default as _apiConfig } from '../../../../config/api-config.development'
import { default as _webConfig } from '../../../../config/web-config.development'
import { getLocalApiConfig } from './environment-util';

console.log('Configuration: api-development');
console.log(`Config api-config.development.ts is used`);
console.log(`Config web-config.development.ts is used`);

type ApiConfigWithLocalType = typeof _apiConfig & { [field: string]: any };

// Use api-config.local.ts for local data. Don't add it to git repository
export const config: ApiConfigWithLocalType = Object.assign(_apiConfig, getLocalApiConfig());
export const webConfig = _webConfig;

