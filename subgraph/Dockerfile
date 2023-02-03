FROM node:alpine
WORKDIR /usr/sidecar
COPY . .
RUN npm install
RUN npm run build
CMD ["node", "./dist/index.js"]