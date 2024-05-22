FROM node:alpine

WORKDIR /app

EXPOSE 4000

COPY package*.json .
RUN npm i

COPY . /app

CMD [ "npm", "run", "start" ]