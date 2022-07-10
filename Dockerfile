FROM node:latest

COPY ./package*.json ./


WORKDIR "/usr/src"

RUN npm install --force

COPY  [".","/usr/src/"]

EXPOSE 3000

CMD ["npm", "start"]
