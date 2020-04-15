FROM node:12.13.0-alpine
LABEL maintainer="fulfil0518"
WORKDIR /usr/src/app
COPY ["./package.json", "./"]
RUN node --version
RUN npm --version
RUN npm install
COPY . .
EXPOSE 80
CMD npm run start:staging
