# Development
FROM node:14 AS dev
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
CMD [ "npm", "run", "dev" ]

# Production
FROM node:14 AS prod
ENV NODE_ENV=production
COPY --from=dev /app app
WORKDIR /app
CMD [ "npm", "start"]