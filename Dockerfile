# Stage 1: Build the application
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the application
FROM node:20-alpine
WORKDIR /app

ENV NODE_ENV=production

# Install production dependencies
COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev

# Copy built assets and server from builder
COPY --from=builder /app/dist ./dist

# Expose port 3000
EXPOSE 3000

# Start Server
CMD ["npm", "run", "start"]
