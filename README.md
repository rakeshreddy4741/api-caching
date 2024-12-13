# API Caching Layer with Redis

A Node.js REST API implementation featuring Redis caching layer for improved performance and reduced database load.

## Features

- Express.js REST API
- MongoDB database integration
- Redis caching middleware
- Product CRUD operations
- Configurable cache expiration
- Error handling

## Prerequisites

Before running this project, make sure you have the following installed:
- Node.js (v14 or higher)
- MongoDB
- Redis Server

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/api-caching-layer.git
   cd api-caching-layer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory and add:
   ```
   MONGODB_URI=mongodb://localhost:27017/your_database
   REDIS_URL=redis://localhost:6379
   PORT=3000
   ```

## Usage

1. Start the server:
   ```bash
   npm start
   ```

2. The API will be available at `http://localhost:3000`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /api/products | Get all products |
| GET    | /api/products/:id | Get a single product |
| POST   | /api/products | Create a new product |
| PUT    | /api/products/:id | Update a product |
| DELETE | /api/products/:id | Delete a product |

## Cache Configuration

The Redis cache is configured with a default expiration time of 1 hour. You can modify this in `config/redis.js`.

## Error Handling

The API includes comprehensive error handling for:
- Invalid requests
- Database connection errors
- Cache failures
- Resource not found
- Validation errors