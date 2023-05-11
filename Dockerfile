# Use the official Node.js slim image as the base image
FROM node:20-slim

RUN mkdir -p /usr/src/app

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app files to the working directory
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the Node.js app
#CMD ["node", "./dist/app.js"]
CMD [ "npm", "start" ]