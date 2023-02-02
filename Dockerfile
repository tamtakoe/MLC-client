##
#Don't use images from docker.hub because of toomanyrequests error is possible
FROM node:16 as build-stage
#

MAINTAINER MLC team
USER root

#Only full version of Node image has update-ca-certificates command.
#For other version of node images we should install it manually. E.g.
#FROM node:14-alpine as build-stage
#RUN apk update && apk add git
#RUN apk update && apk add ca-certificates && rm -rf /var/cache/apk/*
##

ENV APPLICATION_NAME=MLC-client
ENV SASS_BINARY_PATH=/opt/$APPLICATION_NAME/bin/vendor/linux-x64/binding.node
WORKDIR /opt/$APPLICATION_NAME

# Optimization. If package.json etc. have no changes Docker skips `npm ci`
COPY package.json package-lock.json decorate-angular-cli.js ./
RUN npm ci

COPY ./ ./
#RUN echo $(ls -a)
ENV NODE_ENV=production

#RUN npm run test
RUN npm run build
#RUN npm run test:e2e
RUN npm prune --production

####
FROM node:16-alpine as production-stage

ENV APPLICATION_NAME=MLC-client
WORKDIR /opt/$APPLICATION_NAME

COPY --from=build-stage /opt/$APPLICATION_NAME/node_modules /opt/$APPLICATION_NAME/node_modules
COPY --from=build-stage /opt/$APPLICATION_NAME/dist/ /opt/$APPLICATION_NAME/start.sh /opt/$APPLICATION_NAME/

EXPOSE 3200

# Run with --restart=on-failure
CMD ["./start.sh"]
