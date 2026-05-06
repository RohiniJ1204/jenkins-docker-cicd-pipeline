# Use official Node.js image as base
FROM node:18-alpine

# Set working directory inside container 
WORKDIR /app

# Copy package.json first for dependency installation
COPY package.json .

# Install dependencies
RUN npm install

# Copy remaining application code
COPY . .

# Expose port backend runs here
EXPOSE 7000

# Command to start the backend server
CMD ["node", "server.js"]
