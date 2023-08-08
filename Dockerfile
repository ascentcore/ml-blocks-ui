# pull official base image
FROM node:latest

RUN apt-get update 

# set working directory
WORKDIR /app
# add app
COPY . /app

RUN chmod +x /app/start.sh

ENV PATH /app/node_modules/.bin:$PATH
ENV CHOKIDAR_USEPOLLING=true
