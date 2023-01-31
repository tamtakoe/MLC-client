'use strict';

import * as fs from 'fs';
import * as ts from 'typescript';
import * as path from 'path';
import { Module } from 'module';

const arg = process.argv.slice(2)[0] ?? '';
const env = process.env.NODE_ENV ?? 'development'; //arg.substr(2) ||
export const root = getRootPath();
const configPath = getConfigDirPath();
const webAppDir = path.join(root, 'apps/web');
const apiConfigPath = path.join(configPath, `api-config.${env}.ts`);
const webConfigPath = path.join(configPath, `web-config.${env}.ts`);
const localApiConfigPath = path.join(configPath, `api-config.local.ts`);
const webAppCache: any = {};
let apiConfig: any;
let localApiConfig: any;
let webConfig: any;

console.log('ENV:', env, '| ARGS:', arg, '| ROOT:', root, '| CONFIG:', configPath);

export function getApiConfig() {
  if (!apiConfig) {
    apiConfig = readConfig(apiConfigPath);
  }
  return apiConfig;
}

export function isLocalApiConfigExist() {
  return fs.existsSync(localApiConfigPath);
}

export function getLocalApiConfig() {
  if (!localApiConfig) {
    localApiConfig = readConfig(localApiConfigPath);

    if (process.env.API_CONFIG) {
      const localApiConfigFromEnv = JSON.parse(process.env.API_CONFIG);

      localApiConfig = Object.assign({}, localApiConfig, localApiConfigFromEnv);
      console.log('Environment variable API_CONFIG was merged with api-config');
    }
  }
  return localApiConfig;
}

export function updateLocalApiConfig(configToMerge) {
  const config = Object.assign({}, getLocalApiConfig(), configToMerge);

  fs.writeFileSync(localApiConfigPath, `export default ${JSON.stringify(config, null, 2)}`);
}

export function getWebConfig() {
  if (!webConfig) {
    webConfig = readConfig(webConfigPath);
  }
  return webConfig
}

export function injectWebConfigToBuild() {
  if (!fs.existsSync(webAppDir)) {
    return;
  }
  const fileList = scanDir(webAppDir, '.js');
  const webConfigStr = JSON.stringify(getWebConfig());

  fileList.forEach(filePath => {
    replacePlaceholder(filePath, 'this_placeholder_will_be_replaced_by_real_config_during_server_starts', webConfigStr, path.basename(webConfigPath));
  })
}

function readConfig(configPath: string) {
  configPath = path.isAbsolute(configPath) ? configPath : path.join(__dirname, configPath);

  if (!fs.existsSync(configPath)) {
    return;
  }

  const configContent = fs.readFileSync(configPath, 'utf-8');
  const transpiledContent = ts.transpileModule(configContent, { compilerOptions: { module: ts.ModuleKind.CommonJS}});
  const configModule = requireFromString(transpiledContent.outputText, path.basename(configPath, path.extname(configPath)));

  console.log(`Config ${path.basename(configPath)} is used`);
  return configModule.default || configModule;
}

function replacePlaceholder(filePath: string, placeholder: string, replacement: string, configName = '') {
  const fileContent = webAppCache[filePath] ?? fs.readFileSync(filePath, 'utf-8');
  const newFileContent = fileContent.replace(new RegExp(`['"]${placeholder}['"]`), replacement);

  if (newFileContent !== fileContent) {
    webAppCache[filePath] = fileContent;
    fs.chmodSync(filePath, 0o664); // Needs permissions 664
    fs.writeFileSync(filePath, newFileContent);
    console.log(`Config ${configName} has been injected to`, filePath);
  }
}

function scanDir(dir: string, extension?: string) {
  const results: string[] = [];

  try {
    let list = fs.readdirSync(dir);

    if (extension) {
      list = list.filter((fileName: string) => path.extname(fileName) === extension)
    }

    list.forEach((fileName: string) => {
      const filePath = path.join(dir, fileName);
      const stat = fs.statSync(filePath);

      if (stat && stat.isDirectory()) {
        /* Recurse into a subdirectory */
        results.push(...scanDir(filePath, extension));
      } else {
        /* Is a file */
        results.push(filePath);
      }
    });
  } catch (e) {
    console.warn(`Directory '${dir}' doesn't exist`)
  }

  return results;
}

/*
If we run app by Nest cli it uses one root path, if we run main.ts directly - uses other, etc.
That is why we need to detect correct project path for any case.
 */
function getRootPath() {
  const dir = path.resolve(__dirname)
  const segments = dir.split(path.sep);
  const index = segments.lastIndexOf('apps');

  return index !== -1 ? segments.slice(0, index).join(path.sep) : '';
}

// Use `./config` inside app root or top level `../config` if previous one doesn't exist
export function getConfigDirPath(configDirName = 'config') {
  const root = getRootPath();
  let configPath = path.join(root, configDirName);

  if (!fs.existsSync(configPath)) {
    console.log(`Config folder ${configPath} doesn't exist`);

    configPath = path.join(root, '..', configDirName);
    console.log(`Use ${configPath} instead`);
  }

  return configPath;
  // return path.join(root, segments[segments.length-1] === 'dist' ? '../' : '', configDirName);
}

function requireFromString(src: string, moduleName = '') {
  const m: any = new Module(moduleName);

  m.filename = moduleName;
  m._compile(src, moduleName);

  return m.exports;
}
