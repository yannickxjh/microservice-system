FROM node
WORKDIR /user/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5002
CMD ["npm", "start"]