# Project Title

An events management application built with Node.js and React TypeScript.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Running the Application](#running-the-application)
  - [Using Docker](#using-docker)
    - [With Docker Compose](#with-docker-compose)
    - [Manually Starting Backend and Frontend](#manually-starting-backend-and-frontend)
  - [Using Node.js Directly](#using-nodejs-directly)
    - [Running the Backend](#running-the-backend)
    - [Running the Frontend](#running-the-frontend)
- [Additional Information](#additional-information)
- [Learn More](#learn-more)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js** (v14 or later)
- **npm** (comes with Node.js)
- **Docker** (optional, for containerized setup)
- **Docker Compose** (optional, for orchestrating multiple containers)

## Running the Application

You can run both the backend and frontend either using Docker or directly with Node.js. Choose the method that best fits your development workflow.

### Using Docker

#### With Docker Compose

Docker Compose allows you to run both the backend and frontend services with a single command.

1. **Build and Start Services**

   Navigate to the project root directory and run:

   ```bash
   docker-compose up --build
   ```

2. **Access the Application**

   - **Backend:** [http://localhost:3000](http://localhost:3000)
   - **Frontend:** [http://localhost:3001](http://localhost:3001)

3. **Stopping Services**

   To stop the services, press `Ctrl+C` in the terminal where Docker Compose is running, then run:

   ```bash
   docker-compose down
   ```

#### Manually Starting Backend and Frontend

If you prefer to run the backend and frontend containers separately:

1. **Build Backend Docker Image**

   ```bash
   docker build -t your-backend-image-name ./backend
   ```

2. **Run Backend Container**

   ```bash
   docker run -d -p 3000:3000 --name backend your-backend-image-name
   ```

3. **Build Frontend Docker Image**

   ```bash
   docker build -t your-frontend-image-name ./frontend
   ```

4. **Run Frontend Container**

   ```bash
   docker run -d -p 3001:3001 --name frontend your-frontend-image-name
   ```

5. **Access the Application**

   - **Backend:** [http://localhost:3000](http://localhost:3000)
   - **Frontend:** [http://localhost:3001](http://localhost:3001)

6. **Stopping Containers**

   ```bash
   docker stop backend frontend
   docker rm backend frontend
   ```

### Using Node.js Directly

If you prefer to run the applications without Docker, follow these steps.

#### Running the Backend

1. **Navigate to Backend Directory**

   ```bash
   cd backend
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Start the Backend in Development Mode**

   ```bash
   npm run dev
   ```

4. **Access the Backend**

   [http://localhost:3000](http://localhost:3000)

#### Running the Frontend

1. **Navigate to Frontend Directory**

   Open a new terminal window and navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Start the Frontend in Development Mode**

   ```bash
   npm start
   ```

4. **Access the Frontend**

   [http://localhost:3001](http://localhost:3001)

## Additional Information

- **Environment Variables:** Ensure that any required environment variables are set appropriately for both backend and frontend. You can create a `.env` file in each respective directory if needed.

- **Testing:** To run tests for the backend or frontend, use the following commands within their respective directories:

  - **Backend:**

    ```bash
    npm run test
    ```

  - **Frontend:**

    ```bash
    npm test
    ```

## Learn More

- [Fastify Documentation](https://fastify.dev/docs/latest/) - Learn more about building fast and low-overhead web services with Fastify.
- [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started) - Discover how to build single-page React applications with zero configuration.
- [Docker Documentation](https://docs.docker.com/) - Get started with containerizing your applications.
- [Docker Compose Documentation](https://docs.docker.com/compose/) - Manage multi-container Docker applications.
