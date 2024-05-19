FROM node:alpine AS build

COPY package.json /src/package.json
COPY server.js /src/server.js
COPY . /src
WORKDIR /src
RUN npm install -g npm@10.5.2
RUN npm install --legacy-peer-deps
EXPOSE 3000
CMD ["node", "server.js"]