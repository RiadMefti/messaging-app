# Messaging App

This repository contains a full-stack messaging application built with Bun, React, and TypeScript.

## Project Structure

- [`client/`](command:_github.copilot.openRelativePath?%5B%22client%2F%22%5D "client/"): This directory contains the client-side application built with React and TypeScript. It uses Vite for the build process and Tailwind CSS for styling. The Dockerfile for the client application is located here.
- [`server/`](command:_github.copilot.openRelativePath?%5B%22server%2F%22%5D "server/"): This directory contains the server-side application built with Bun and TypeScript. It uses Drizzle for database migrations, express and socket.io and sqlite3 . The Dockerfile for the server application is located here.
- [`docker-compose.yml`](command:_github.copilot.openRelativePath?%5B%22docker-compose.yml%22%5D "docker-compose.yml"): This file is used to define and run the multi-container Docker applications for the client and the server.
- [`.github/workflows/`](command:_github.copilot.openRelativePath?%5B%22.github%2Fworkflows%2F%22%5D ".github/workflows/"): This directory contains the GitHub Actions workflow definitions.

## Available Scripts

In each  project directory (client and server ), you can run:
- `bun run install`: Runs the app in the development mode.
- `bun run dev`: Runs the app in the development mode.

the ports are 3000 for the server and 3001 for the front-end


## Run it Locally with docker 

This project uses Docker for containerization. There are Dockerfiles for both the client and the server applications.

To  run the Docker containers for both the client and the server, use Docker Compose:

```sh
docker-compose up
```



