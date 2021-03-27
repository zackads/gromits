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
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install -g serve
COPY . .
CMD [ "npm", "start"]