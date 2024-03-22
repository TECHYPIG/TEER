# Base image (Choose Node.js version suitable for your Next.js app)
FROM node:16-alpine AS base

# Create working directory
WORKDIR /app

# Install essential build dependencies 
RUN apk add --no-cache libc6-compat

# Copy dependency files
COPY package*.json ./ 

# Install dependencies 
RUN npm install

# Copy the rest of your Next.js project
COPY . .

# Generate Prisma Client 
RUN npx prisma generate

# Build the Next.js project
RUN npm run build

# Expose the port used by Next.js 
EXPOSE 3000

# Define the command to run the container
CMD ["npm", "run", "start"]
