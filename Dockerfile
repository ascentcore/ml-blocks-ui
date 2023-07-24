# pull official base image
FROM node:latest

# set working directory
WORKDIR /app

RUN apt-get update 

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
ENV CHOKIDAR_USEPOLLING=true
# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install


# add app
COPY . ./

# start app
CMD ["npm", "start"]
