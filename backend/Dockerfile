FROM node:alpine as development

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

COPY . .
# COPY libs libs

RUN npm install

RUN npm run build

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm install --omit=dev

COPY --from=development /usr/src/app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main"]