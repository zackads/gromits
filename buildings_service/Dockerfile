# Development
FROM node:14 AS dev
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
CMD [ "npm",  "dev" ]

# Production
FROM node:14 as prod
ENV NODE_ENV=production
RUN npm install -g serve
COPY --from=dev /app app
WORKDIR /app
RUN npm test
CMD [ "npm", "start"]