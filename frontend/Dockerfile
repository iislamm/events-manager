# Use Node.js LTS version as base image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy project files
COPY . .

# Build the app
RUN npm run build

# Install serve to run the built app
RUN npm install -g serve

# Expose port 3001
EXPOSE 3001

# Start the app
CMD ["serve", "-s", "build", "-l", "3001"]
