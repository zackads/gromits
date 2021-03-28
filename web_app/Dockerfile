# Development
FROM node:14 AS dev
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]

# Prodution
FROM dev AS prod
CMD [ "npm", "start"]