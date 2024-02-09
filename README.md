# Emergency Supplies Management Server

## Overview

This project is a server designed for the management of emergency supplies, utilizing MongoDB for data storage. It supports operations such as saving, viewing, updating, and creating records of emergency supplies. The API is accessible through a Postman collection, enabling straightforward interaction with the server for various CRUD operations.

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- Postman (for API testing)

### Installation

1. Clone the repository to your local machine.
2. Install dependencies by running `npm install` in the project directory.
3. Ensure MongoDB is running on your system.
4. Create a `.env` file in the root directory and configure the following environment variables:
   - `MONGO_HOST`
   - `MONGO_USERNAME`
   - `MONGO_PASSWORD`
   - `MONGO_CLUSTER`
   - `MONGO_DBNAME`
   - `PORT`
5. Start the server with `node index.js`.

### Environment Variables

Ensure the `.env` file contains the following variables for MongoDB connection:

```
MONGO_HOST=
MONGO_USERNAME=
MONGO_PASSWORD=
MONGO_CLUSTER=
MONGO_DBNAME=
```

## API Endpoints

The server provides the following endpoints for managing emergency supplies. The notation `/:param` indicates that a parameter is expected in the URL path, not as a query string.

- `GET /supplies`: Retrieve all emergency supplies.
- `GET /supplies/:name`: Get a single emergency supply by name.
- `POST /supplies`: Add a new emergency supply record.
- `PUT /supplies/:name`: Update an existing emergency supply record by name.
- `DELETE /supplies/:name`: Delete an emergency supply record by name.


For detailed usage and examples, refer to the [Postman collection](https://www.postman.com/technical-explorer-46268065/workspace/or-basker-api-s/collection/28337524-61e532b4-e30a-42f6-b92b-8b837ebf2c11).

