FROM node:20-alpine

COPY ./components /app/components
COPY ./app /app/app
COPY ./utilsTypeScript /app/utilsTypeScript
COPY ./public /app/public
COPY ./docker/node-docker.env /app/.env
COPY ./*.json /app/
COPY ./*.ts /app/
COPY ./*.mjs /app/

WORKDIR app

RUN npm i
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
