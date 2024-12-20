FROM node:14-alpine as builder
COPY build ./build
RUN npm install -g serve
CMD ["serve", "-s", "build"]