FROM node:lts-alpine
RUN apk add libtool ffmpeg make gcc g++ python3 autoconf automake git vim nano --no-cache
WORKDIR /usr/src/app
RUN git clone "https://github.com/bernardoamorim7/simple-discord-music-bot.git"
WORKDIR /usr/src/app/simple-discord-music-bot
ENV NODE_ENV=production
RUN npm install --production --silent && mv node_modules ../
COPY . .
ENV BOT_PREFIX=?
ENV BOT_TOKEN=YOUR_BOT_TOKEN
CMD ["npm", "start"]