# ==========================================
# Stage 1: Build the application
# ==========================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies, including devDependencies
RUN npm install --include=dev

# Copy project files
COPY . .

# Build the application
RUN npm run build


# ==========================================
# Stage 2: Run the application
# ==========================================
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY --from=builder /app/package*.json ./

# Install ALL dependencies, including Vite
RUN npm install --include=dev

# Copy built application
COPY --from=builder /app/dist ./dist

# Set production environment AFTER npm install
ENV NODE_ENV=production

# Render will provide the actual PORT
EXPOSE 3000

# Start server
CMD ["npm", "run", "start"]
