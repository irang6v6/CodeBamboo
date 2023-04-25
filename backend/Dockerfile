# Use a node image as the base image
FROM node:16
# Set the working directory
WORKDIR /usr/src/back
# Copy the package.json and package-lock.json files to the working directory
COPY ./package* /usr/src/back/
# Install the dependencies
RUN npm install
# Copy the rest of the source code to the working directory
COPY ./ /usr/src/back/
# Build the React app
RUN npm run build

FROM nginx:alpine
COPY --from=0 /usr/src/back/build /usr/share/nginx/html
# Copy the Nginx configuration file to the appropriate location
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8000
# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
