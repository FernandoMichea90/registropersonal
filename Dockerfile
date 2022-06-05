FROM node:lastest

COPY  [".","/usr/src/"]

WORKDIR "/usr/src"

COPY ./package*.json ./

RUN npm install 

EXPOSE 3000

CMD ["npm", "start"]
