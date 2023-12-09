FROM node:latest
WORKDIR /app
# ENV PATH /app/node_modules/.bin:$PATH
COPY package.json .
# COPY package-lock.json .
RUN npm install 
COPY . .
EXPOSE 8000
CMD ["npm", "run", "dev"]