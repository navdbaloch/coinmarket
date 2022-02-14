FROM node:14-alpine
WORKDIR /usr/src
COPY package*.json ./
RUN npm install -g @angular/cli @angular-devkit/build-angular && npm install
COPY . .
