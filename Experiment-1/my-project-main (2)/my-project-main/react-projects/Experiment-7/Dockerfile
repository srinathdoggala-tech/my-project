# ---- Stage 1: Build the React app ----
FROM node:20 AS build
# Use an official Node image. Using a specific version (node:18) gives reproducibility.

WORKDIR /app
# Set working directory inside the container.

# Copy package manifests first to take advantage of Docker cache
COPY package*.json ./
# If you use yarn, copy yarn.lock instead

RUN npm ci --silent
# Install dependencies. `npm ci` is preferred in CI and produces deterministic installs.
# Doing this before copying source files allows Docker to cache installs when package.json hasn't changed.

COPY . .
# Copy the rest of the source code into the container.

RUN npm run build
# Build the React app (creates static files in /app/dist). This is the heavy build step.

# ---- Stage 2: Serve with nginx (production) ----
FROM nginx:1.25-alpine
# A small Nginx image to serve static files. Alpine keeps the image small.

COPY --from=build /app/dist /usr/share/nginx/html
# Copy built static files from the build stage into nginx's html directory.

# (Optional) Replace default nginx.conf with custom config if you need SPA routing
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
# Document that the container serves on port 80 (does not publish it).

CMD ["nginx", "-g", "daemon off;"]
# Start nginx in the foreground (container runs while nginx runs).
