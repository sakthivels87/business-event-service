# Business Event Service API

Business Event Service is a **Node.js and Express based REST API** that
receives business notification events, validates them, stores them in
MongoDB, and sends them to Kafka topics based on priority.

This service can be used in **microservice architectures** where
multiple applications send notifications such as emails, alerts, or
messages.

------------------------------------------------------------------------

## Features

-   Validate incoming API requests
-   Basic Authentication
-   Schema validation using Zod / Joi
-   Store event data in MongoDB
-   Send messages to Kafka topics
-   Centralized logging using Winston
-   Environment configuration using config
-   Proper error handling (400, 401, 404, 500)
-   Clean project structure

------------------------------------------------------------------------

## Tech Stack

-   Node.js
-   Express.js
-   MongoDB
-   Mongoose
-   Kafka
-   KafkaJS
-   Winston
-   Zod / Joi
-   Config

------------------------------------------------------------------------

## Project Architecture

Client Application\
↓\
BusinessEventService API\
↓\
Request Validation + Authentication + Logging\
↓\
MongoDB (store event with status QUEUED)\
↓\
Kafka Producer\
↓\
priority-high / priority-medium / priority-low

------------------------------------------------------------------------

## Project Folder Structure

    BusinessEventService
    │
    ├── config
    │   └── default.json
    │
    ├── controllers
    │   └── eventController.js
    │
    ├── middleware
    │   ├── authMiddleware.js
    │   ├── errorHandler.js
    │   └── validateMiddleware.js
    │
    ├── models
    │   └── Notification.js
    │
    ├── routes
    │   └── eventRoutes.js
    │
    ├── services
    │   ├── kafkaProducer.js
    │   └── eventService.js
    │
    ├── utils
    │   └── logger.js
    │
    ├── app.js
    ├── server.js
    └── package.json

------------------------------------------------------------------------

## API Endpoint

POST `/api/v1/events`

------------------------------------------------------------------------

## Request Payload

``` json
{
  "trackingId": "uuid",
  "from": "systemA",
  "to": "customer",
  "subject": "Welcome",
  "body": "Welcome to our service",
  "channel": "email",
  "priority": "high",
  "customerId": "12345"
}
```

------------------------------------------------------------------------

## Priority Routing

  Priority   Kafka Topic
  ---------- -----------------
  high       priority-high
  medium     priority-medium
  low        priority-low

If priority is not provided, message will go to **priority-medium**.

------------------------------------------------------------------------

## Database Storage

MongoDB Collection:

`notification-interactions`

Default status:

`QUEUED`

Example document:

``` json
{
  "trackingId": "uuid",
  "from": "systemA",
  "to": "customer",
  "subject": "Welcome",
  "body": "Welcome to our service",
  "channel": "email",
  "priority": "high",
  "customerId": "12345",
  "status": "QUEUED",
  "createdAt": "timestamp"
}
```

------------------------------------------------------------------------

## Authentication

Uses **Basic Authentication**.

Example header:

Authorization: Basic base64(username:password)

------------------------------------------------------------------------

## Logging

Logging is handled using **Winston**.

Logs include:

-   API request received
-   Validation success/failure
-   MongoDB insert status
-   Kafka publish status
-   Error logs

Example:

    INFO: Event received with trackingId 12345
    INFO: Event stored in MongoDB
    INFO: Message sent to Kafka topic priority-high

------------------------------------------------------------------------

## Error Handling

  Status Code   Description
  ------------- -----------------------
  400           Bad Request
  401           Unauthorized
  404           Not Found
  500           Internal Server Error

------------------------------------------------------------------------

## Installation

Clone repository:

    git clone https://github.com/yourusername/business-event-service.git

Go to project directory:

    cd business-event-service

Install dependencies:

    npm install

------------------------------------------------------------------------

## Configuration

Update `config/default.json`

Example:

``` json
{
  "server": {
    "port": 3000
  },
  "mongodb": {
    "uri": "mongodb://localhost:27017/business-events"
  },
  "kafka": {
    "clientId": "business-event-service",
    "brokers": ["localhost:9092"]
  },
  "auth": {
    "username": "admin",
    "password": "admin123"
  }
}
```

------------------------------------------------------------------------

## Running the Application

Start MongoDB and Kafka first.

Then run:

    npm start

Server runs at:

`http://localhost:3000`

------------------------------------------------------------------------

## Testing API

Example using curl:

    curl -X POST http://localhost:3000/api/v1/events -u admin:admin123 -H "Content-Type: application/json" -d '{
    "trackingId":"123",
    "from":"systemA",
    "to":"customer",
    "subject":"Welcome",
    "body":"Welcome message",
    "channel":"email",
    "priority":"high",
    "customerId":"12345"
    }'

------------------------------------------------------------------------

## Future Improvements

-   Kafka consumer service
-   Retry mechanism
-   Dead Letter Queue (DLQ)
-   Swagger / OpenAPI documentation
-   Rate limiting
-   OAuth / JWT authentication
-   Kubernetes deployment
-   CI/CD pipeline

------------------------------------------------------------------------

## Author

Sakthivel\
Full Stack Developer
