# Use the official Node.js image as the base image
FROM node:latest

COPY . .
# Create and set the working directory in the container
WORKDIR .


# Install dependencies
RUN npm install

# Expose the port your app runs on
# EXPOSE 4000

# Command to start your Node.js app
CMD ["npm", "start"]