# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker, Docker-compose or Docker Desktop 

## Downloading

```
git clone https://github.com/RealOneReal/nodejs2023Q2-service.git
```

## Installing NPM modules

```
npm install
```

## Running application in container

```
docker-compose build
```

After building containers u can ckeck them with docker buil-it utility with command: 
```
docker scan nodejs2023q2-service_app
docker scan nodejs2023q2-service_db 
```

If u set other name of images u should write a scan command:
```
docker scan <IMAGE>
```
For starting application with migrations, ceeding db run next command:
```
docker-compose up 
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests with authorization

```
npm run test:auth
```

File with logs u can find in logger/logs/app.log
(I don't know how it find in container but u can run client localy and find it in dist/src/logger/logs/app.log)
