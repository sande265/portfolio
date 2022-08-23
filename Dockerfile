FROM node:lts as builder

WORKDIR /usr/app

COPY . .

RUN npm install

FROM nginx:lts

COPY --from=builder /app/usr /html

EXPOSE 80