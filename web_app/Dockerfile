# Development
FROM node:14 AS dev
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]

# Prodution
FROM node:14 AS prod
ENV NODE_ENV=production
RUN npm install -g serve
COPY --from=dev /app app
WORKDIR /app
RUN npm test
CMD [ "npm", "start"]