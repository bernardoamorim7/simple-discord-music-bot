FROM node:lts-alpine
RUN apk add libtool ffmpeg make gcc g++ python3 autoconf automake --no-cache
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
ENV NODE_ENV=production
RUN npm install --production --silent && mv node_modules ../
COPY . .
ENV BOT_PREFIX=?
ENV BOT_TOKEN=YOUR_BOT_TOKEN
CMD ["npm", "start"]