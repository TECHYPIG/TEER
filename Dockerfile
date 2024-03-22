# Use a lean Node.js base image with the appropriate version
FROM node:18-alpine  

# Create a working directory for the app
WORKDIR /app

# Copy package.json and package-lock.json (if you have one) for efficient install
COPY package*.json ./

# Install dependencies 
RUN npm install

# Copy the rest of your Next.js project files
COPY . .

# Build your Next.js project for production
RUN npm run build

# Expose the port on which the Next.js server runs
EXPOSE 3000

# Specify the command to start your Next.js production server
CMD ["npm", "run", "start"]