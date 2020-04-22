FROM node
WORKDIR /user/src/app
RUN ls
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5002
CMD ["npm", "start"]