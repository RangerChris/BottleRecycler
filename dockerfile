# Stage 1: Build
FROM node:18 AS builder

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Install all dependencies, including devDependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the project and compile the server
RUN npm run build

# Stage 2: Run
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Ensure the directory exists and change ownership of the application files to the non-root user
RUN mkdir -p /usr/src/app && chown -R node:node /usr/src/app

# Copy only the necessary files from the build stage
COPY --from=builder /usr/src/app/dist /usr/src/app
COPY --from=builder /usr/src/app/node_modules /usr/src/app/node_modules

# List contents of /usr/src/app to verify
RUN ls -la /usr/src/app

# Make port 80 available to the world outside this container
EXPOSE 80

# Define environment variable
ENV NODE_ENV=production

# Use the official Node.js user instead of creating a new one
USER node

# Health check to ensure the container is running correctly
HEALTHCHECK CMD curl --fail http://localhost:80 || exit 1

# Run app when the container launches
CMD ["node", "server.js"]
