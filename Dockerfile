FROM node:carbon
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .

# Env setup
COPY .env.local .env

#Expose port and begin application
EXPOSE 4444

# Start the app
CMD [ "npm", "run", "start:dev"]