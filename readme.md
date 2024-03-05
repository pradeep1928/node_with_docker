
last played = 2:33:00


#### Open browser to see app in action
http://127.0.0.1:3000 

#### To build docker image
docker build -t image-name path-to-Dockerfile
docker build -t node-docker-image .

#### To create and run the docker container
docker run -p host-port:docker-port -d --name container-name image-name
docker run -p 3000:3000 -d --name node-docker-app node-docker-image

#### To access bash shell inside running docker    
docker exec -it node-docker-app /bin/bash

#### To create docker container with volume mount
docker run -v /host/path:/container/path -d --name container-name image-name    
docker run -v ${pwd}:/app -p 3000:3000 -d --name node-docker-app node-docker-image

* For powershell use ${pwd} for current path directory
* For  cmd use %cd% for current path directory
* For Mac use $(pwd) for current path directory.

#### To prevent docker from deleting node_modules
docker run -v ${pwd}:/app -v /app/node_modules -p 3000:3000 -d --name node-docker-app node-docker-image

#### To prevent docker container to write to host machine. Make it read only.
docker run -v ${pwd}:/app:ro -v /app/node_modules -p 3000:3000 -d --name node-docker-app node-docker-image

#### To create  a new file in the docker container from host machine
docker cp ./file_to_add.txt node-docker-app:/home/node/file_to_add.txt

#### To stop a running docker container    
docker kill $(docker ps -q)
docker stop container-id

#### To remove all stopped containers   
docker rm $(docker ps -a -q)  

#### To remove both running and stopped containers   
docker rmi $(docker images -q -f dangling=true)

#### Open browser to see app in action
http://127.0.0.1:3000 

#### Pass env variable while creating docker container
docker run --env "var_name=value"
docker run --env-file ./env_vars_file.txt

#### To see docker volume
docker volume ls

#### To delete docker volume
docker volume rm volumename
docker volume prune  (remove all unused volumes)

---
`Docker compose is used when you have multiple services that need to be deployed together`

---

#### Create docker image and container using docker compose file
docker-compose up -d

#### To run docker compose with multiple files
docker-compose -f docker-compose.yml -f db-compose.yml up -d
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build

#### Stop the service
docker-compose down
docker-compose -f docker-compose.yml -f docker-compose.prod.yml down

#### View logs of the service
docker-compose logs -f [service name]

#### Access shell inside the container
docker exec -it <container id / name> bash

#### Push Docker Image to Registry
bash buildAndPushImage.sh username/imag ename:tag
(Note: You will need a Docker Hub account for this.)

#### Inspect the docker container
docker inspect <container id / name>

#### Inspect the docker network
docker network inspect <network id / name>
docker network inspect node_docker_default

#### Mongodb url 
"mongodb://username:password@hostname:port/?authSource=admin"
    