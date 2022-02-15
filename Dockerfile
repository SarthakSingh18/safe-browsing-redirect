FROM node:12.18.0 as base
WORKDIR /usr/nodejs/
COPY ./ /usr/nodejs/
RUN npm ci


FROM node:alpine
WORKDIR /usr/nodejs/
COPY --from=base /usr/nodejs /usr/nodejs/
EXPOSE 6000
CMD ["node", "server.js"]