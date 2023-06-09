FROM node:20-alpine

# Copies application files
COPY src/ /app/src/
COPY package*.json /app/

WORKDIR /app

# Installs application dependencies
RUN npm update
RUN npm install

# Exposes the port on which your application listens
EXPOSE 3030

CMD [ "npm", "start"]
