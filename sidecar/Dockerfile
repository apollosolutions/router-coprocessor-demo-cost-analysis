FROM node:alpine
WORKDIR /usr/sidecar
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
CMD ["node", "./dist/index.js"]