# syntax=docker/dockerfile:1
FROM node:16
ENV NODE_ENV=development
WORKDIR /products
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3030

CMD [ "node", "index.js" ]
