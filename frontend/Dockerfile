# Use a node image as the base image
FROM node:16
ENV REACT_APP_SERVER_BASE_URL https://k8a801.p.ssafy.io/api
# Set the working directory
WORKDIR /usr/src/front
# Copy the package.json and package-lock.json files to the working directory
COPY ./package* /usr/src/front/
# Install the dependencies
RUN npm i --legacy-peer-deps
# Copy the rest of the source code to the working directory
COPY ./ /usr/src/front/
# Build the React app
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]
