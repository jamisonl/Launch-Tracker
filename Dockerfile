FROM node:alpine
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 1336
RUN npm run build