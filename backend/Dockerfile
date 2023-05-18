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
EXPOSE 8000
CMD ["node", "dist/main.js"]
