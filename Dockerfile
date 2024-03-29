FROM node:20-alpine3.19 AS builder

WORKDIR /build

# install dependencies
COPY package*.json ./
RUN npm ci
COPY . .

# build and install only production dependencies
RUN npm run build
RUN npm ci --omit=dev


######################################################################

FROM node:20-alpine3.19

WORKDIR /app

MAINTAINER Nico W. <info@ni-wa.de>

EXPOSE 8080

HEALTHCHECK --start-period=25s CMD npm run healthcheck

# copy files from build stage
COPY --from=builder /build/dist/ dist/
COPY --from=builder /build/package*.json ./
COPY --from=builder /build/node_modules/ node_modules/

ENTRYPOINT ["node", "."]
