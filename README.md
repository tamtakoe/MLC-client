# MLC-client

## Development

Run `npm install` to install dependencies.


## First start
Run
```sh
npm run build:web
```
first to create `dist` directory

### Run WEB server by command line
```sh
npm run start:web
```
Navigate to http://localhost:4100 (you can change web-server port in package.json). The app will automatically reload if you change any of the source files.
You can debug web-application in browser.

### Run API server by command line
```sh
npm run start:api
```
Navigate to http://localhost:5100 (you can change api-server port in api-config.development.ts). The app will automatically reload if you change any of the source files.

For comfortable work api-server asks IB credentials and saves token to the `config/api-config.local.ts` (it is in .gitignore). If your token expired restart api server

Press `cmd/ctrl + C` to stop dev servers

### Docker
```sh
docker build -t mlc-client .
docker run -p 8081:8080 mlc-client

docker tag <IMAGE ID> tamtakoe/mlc-client:latest
docker push tamtakoe/mlc-client:latest
docker pull tamtakoe/mlc-client
```

### Update dependencies
```sh
nx migrate latest
npm install
nx migrate --run-migrations
```
Read [Updating Nx](https://nx.dev/l/a/core-concepts/updating-nx) for details

## Build

Run `ng build` to build all projects. The build artifacts will be stored in the `dist/` directory. Run the `npm run build:web` or `npm run build:api` for build separate project.

Navigate to `http://localhost:5100` to see built version of site (from the `dist/` directory)
