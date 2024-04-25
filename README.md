
## Description

Nestjs Project for Task Management System with sqlite database and DrizzleORM. Swagger is also integrated for API documentation.

## Deployed on Digitalocean 
- Base URL: [https://tms.rohitgautam.com.np](https://tms.rohitgautam.com.np)
- Swagger API Documentation: [docs](https://tms.rohitgautam.com.np/api)

## Endpoints

### Create Task

- **Endpoint**: `/tasks`
- **HTTP Method**: `POST`
- **Request Body**: 
  `{ title: string, description: string, priority: number }`
  
- **Response**: 
  `{ id: string, title: string, description: string, priority: number, status: string, createdAt: string, updatedAt: string }`

### List Tasks

- **Endpoint**: `/tasks`
- **HTTP Method**: `GET`
- **Query Parameters**:
  - `status`: (optional) Filter tasks by status (pending, in progress, or completed).
  - `priority`: (optional) Filter tasks by priority (a number).
  
- **Response**: 
  `[{ id: string, title: string, description: string, priority: number, status: string, createdAt: string, updatedAt: string }, ...]`

### Update Task

- **Endpoint**: `/tasks/:id`
- **HTTP Method**: `PATCH`
- **Path Parameter**: `id` (required) - The ID of the task to update.
- **Request Body**: 
  `{ title: string, description: string, priority: number, status: string }`
  
- **Response**: 
  `{ id: string, title: string, description: string, priority: number, status: string, createdAt: string, updatedAt: string }`

### Delete Task

- **Endpoint**: `/tasks/:id`
- **HTTP Method**: `DELETE`
- **Path Parameter**: `id` (required) - The ID of the task to delete.
  
- **Response**: 
  `{ message: string }`

## Data Model

### Task

- `id`: Unique identifier for the task.
- `title`: A string representing the title of the task.
- `description`: A string containing a more detailed description of the task.
- `priority`: An integer where a higher number represents a higher priority.
- `status`: A string that can be "pending", "in progress", or "completed".
- `createdAt`: Timestamp for when the task was created.
- `updatedAt`: Timestamp for when the task was last updated.

## Installation

```bash
$ npm install
```
## Make migrations
```bash
$ npm run db:generate
```

## Run migrations
```bash
$ npm run db:migrate
```



## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run build
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e


```

## changes needed to make it production ready
- Use a production ready database like PostgreSQL
- Dummy database setup for testing
- Use a production ready logger like winston
- Dockerize the application

