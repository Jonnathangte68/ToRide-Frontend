FROM node:16 AS builder
# Set working directory
WORKDIR /app
# Copy all files from current directory to working dir in image
COPY ./to-ride-webapp .
# install node modules and build assets
RUN yarn install && yarn build

FROM nginx:1.20.1
#copies React to the container directory
# Set working directory to nginx resources directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static resources
RUN rm /etc/nginx/conf.d/default.conf
# Copies static resources from builder stage
COPY --from=builder /app/build /usr/share/nginx/html
COPY ./to-ride-webapp/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]