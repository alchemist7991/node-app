FROM node:15

WORKDIR /app

RUN npm install -g nodemon

COPY . .

RUN npm install

CMD ["npm", "start"]