# 1. Start with a lightweight Node.js environment
FROM node:20-alpine

# 2. Set the working directory
WORKDIR /app

# 3. Copy the package files FIRST (for that caching trick!)
COPY package.json package-lock.json ./

# 4. Install NPM packages
RUN npm install

# 5. Copy the rest of your Next.js frontend code
COPY . .

# 6. Build the Next.js production bundle (Optimizes all your React code)
RUN npm run build

# 7. Expose the port Next.js runs on
EXPOSE 3000

# 8. Start the Next.js production server
CMD ["npm", "start"]
