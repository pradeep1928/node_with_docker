
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

#### While rebuilding the docker container only build specific container
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build --no-deps node-docker-app 

#### Scale up docker container. Create multiple container  instances of one service
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --scale node-docker-app=2

#### Stop the service
docker-compose down
docker-compose -f docker-compose.yml -f docker-compose.prod.yml down

#### View logs of the service
docker-compose logs -f [service name]

#### Access shell inside the container
docker exec -it <container id / name> bash

#### Inspect the docker container
docker inspect <container id / name>

#### Inspect the docker network
docker network inspect <network id / name>
docker network inspect node_docker_default

#### Automate the process of pulling  images, building containers, starting them etc in production machine using watchtower container
```
 docker run -d \
  --name watchtower \
  -e REPO_USER=username \
  -e REPO_PASS=password \
  -v /var/run/docker.sock:/var/run/docker.sock \
  containrrr/watchtower container_to_watch --debug
  ```
  
### Use docker swarm to manage containers
  1) Initialize a new Docker Swarm: `docker swarm init`
  2)  If you want to create a single node swarm , use this command instead: `docker swarm init --advertise-addr <YOUR ip address>`
          
  
  
  
      
      

#### Mongodb url 
"mongodb://username:password@hostname:port/mongo-db-name?authSource=admin"

#### Set the environment variable in linux machine  
export VARIABLE_NAME="value"
echo $VARIABLE_NAME
printenv VARIABLE_NAME 
    
### Process to create .env file and export all env variable in linux machine
1) Open terminal
2) Navigate to project directory
3) touch .env (create an empty .env file)   
4) open .env file using vi or vim  editor
5) Write or paste your variables like below format, save & close it.
```
VARIABLE_NAME="Value"
Example : DB_HOST="localhost"
          DB_PORT="5000"
          DB_USERNAME="root"
          DB_PASSWORD="rootpass"    
          DB_DATABASE="nodeappdb"      
          JWT_SECRET="jwtsecretkey"       
          NODE_ENV="production"
```

1) Run command "source .env" in terminal to load the .env file content as environment variables. If you want to set these values permanently PORT="8080"
2) Run command "source .env"  in terminal
3) Now you can access all the variables using process.env.VARIABLE_NAME in NodeJS app
4) Or you can search for .profile file in linux root. open it and add the following line to it and save it.
  `set -o  allexport; source /root/.env; set +o allexport`
     Now you can use any where in system using $VARIABLE_NAME
