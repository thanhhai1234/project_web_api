
  
FROM ubuntu:18.04
RUN apt-get update \
 && apt-get install -y curl \
 && curl -sL https://deb.nodesource.com/setup_12.x | bash - \
 && apt-get install -y nodejs 

WORKDIR /home/cuong/DevOps/Todolist/todolist_frontend
COPY . .
RUN npm install
RUN npm run build
CMD ["npm", "start"]
