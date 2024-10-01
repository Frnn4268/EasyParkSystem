# Use the official Node.js image to build the app
FROM node:18 AS build

# Config the working directory
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the app
RUN npm run build

# Use an Nginx base image to serve the app
FROM nginx:alpine

# Copy the built files to the Nginx container
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port Nginx runs in
EXPOSE 80

# Command to run the Nginx server
CMD ["nginx", "-g", "daemon off;"]