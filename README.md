# Meli Mutant Api Challenge

- [Project implementation summary](#project-implementation-summary)
- [Compiling and running the project](#compiling-and-running-the-project)
    - [Requirements](#requirements)
    - [Instructions](#instructions)
- [Run load script](#run-load-script)
    - [Resources](#resources)
- [Adicional information (Optional)](#adicional-information-optional)
    - [Docker compose commands](#docker-compose-commands)
    - [Execute on development mode](#execute-on-development-mode)


# Project implementation summary

This project was implemented using the next tools or libraries:

- Nodejs, Typescript, HapiJs, Mongodb and Docker.
- For compile and run this project you only will need Docker and Docker compose since everything is encapsulated on a Docker image.
- The documentation endpoints was made with [raml](https://raml.org).
- The server runs in [http://127.0.0.1:8888](http://127.0.0.1:8888).


# Compiling and running the project

### Requirements

- Docker Engine version `19.03.12` or similar. If you don't have it installed, you can see instructions [here](https://docs.docker.com/engine/install/).
- Docker Compose version `1.26.2` or similar. If you don't have it installed, you can see instructions [here](https://docs.docker.com/compose/install/).
- (Optional) If you want to connect to Mongo database, you could install [MongoDB Compass](https://www.mongodb.com/try/download/compass).
- Use the variable `DATABASE_CONNECTION_URI` available on `config/.env.dev`.
- (Optional) If you want to execute project on development mode, you need to install `NodeJs v14.17.3` and `NPM v6.14.13

### Instructions

1. Install Docker Engine and Docker Compose services, then start Docker Engine.
2. Open a terminal or console and navigate to project directory.
3. Create the docker network bridge used to allows communication between both containers server and database:

    ```bash
    docker network create -d bridge --subnet 172.0.1.0/24 --gateway 172.0.1.1 mutant-net
    ```
4. Execute only database for initialite it:

    ```bash
    docker-compose up database
    ```
5. When log finish of moving, press `Ctrl + C` on your terminal to end database execution.
6. Execute database and server:

    ```bash
    docker-compose up
    ```
7. You should see a log on your terminal that looks like the following:
    ```bash
    Server running on http://0.0.0.0:8888
    ```
    - If you don't see this log, please try executing database and server by separated (two terminal), first the database and when it's ready then the server:
        ```bash
        docker-compose up database
        docker-compose up server
        ```

# Run load script

### **Resources**

- `docs/api.html`
- `docs/postman/Meli-mutant-api.postman_collection.json`
- `docs/postman/Meli-mutant-api.postman_environment.json`

# Adicional information (Optional)

### **Docker compose commands**

**IMPORTANT:** The next commands must be executed on root project directory.

- Execute database and server:

    ```bash
    docker-compose up
    ```

- Execute only database:

    ```bash
    docker-compose up database
    ```

- Execute only server:

    ```bash
    docker-compose up server
    ```

- Execute containers forcing the build:

    ```bash
    # Both
    docker-compose up --build
    # Only server
    docker-compose up --build server
    # Only database
    docker-compose up --build database
    ```

### **Execute on development mode**

**IMPORTANT:** The next commands must be executed on root project directory.

1. Install NPM dependencies:

    ```bash
    npm i
    ```

2. Execute only database service using `docker-compose`:

    ```bash
    docker-compose up database
    ```

3. On another terminal execute server on development mode:

    ```bash
    npm run dev
    ```

4. (Optional) Execute test:

    ```bash
    npm test
    ```

