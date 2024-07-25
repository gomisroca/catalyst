# Use the official Node image as the base image
FROM node:20

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose port 3030
EXPOSE 3030

# Start the server
CMD ["node", "src/app.ts"]