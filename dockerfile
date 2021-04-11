FROM node:12

WORKDIR /usr/src/b1nd_tech_blog

COPY . .

RUN npm install
RUN npm run build

CMD ["npm", "run", "start:prod"]