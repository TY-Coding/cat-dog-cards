FROM node:14
WORKDIR /app

COPY package.json ./
RUN npm install

COPY . /app
RUN npx apidoc -i src/routers/ -o apidoc/
RUN npm run build
RUN rm -rf src/

CMD [ "npm", "run", "start" ]