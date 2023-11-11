# Stage 1
FROM node:14.19.0-slim as build-step
ENV WORK=/app
WORKDIR ${WORK}
COPY package.json package-lock.json ${WORK}/
RUN npm install
COPY . .
RUN npm run build:prod

# Stage 2
FROM nginx:1.21.6
COPY --from=build-step /app/dist/nids /usr/share/nginx/html
# When the container starts, replace the env.js with values from environment variables
CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/environment.template.js > /usr/share/nginx/html/assets/environment.js && exec nginx -g 'daemon off;'"]
EXPOSE 80