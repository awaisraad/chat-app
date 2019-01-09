FROM node:carbon

WORKDIR /usr/src/app

EXPOSE 3000

CMD ["yarn", "dev"]
