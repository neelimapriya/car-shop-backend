# Car Store Backend (B4A2V3)

### This is a backend application project using **Express.js** with **TypeScript** and integrated with **MongoDB** using **Mongoose** and includes functionality for handling cars and orders.

## Features

- **Car Management**: Supports creating(post), updating(put), fetching(get), and deleting(delete) cars.
- **Order Management**: Allows placing orders for cars.
- **Middleware**:
  - **CORS**: Enables Cross-Origin Resource Sharing.
  - **Zod**: Ensures input data validation.

---

## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for building the server.
- **TypeScript**: Type-safe programming.
- **MongoDB**: Database for storing car and order data.
- **Mongoose**: ORM for MongoDB.
- **Zod**: Schema-based validation library.
- **CORS**: Middleware for cross-origin requests.

---

## API Endpoints

## **Car Routes**

1. **POST `/api/cars`**: Add a new car.
2. **GET `/api/cars`**: Retrieve a list of all cars.
3. **PUT `api/cars/:id`**: Update details of a specific car.
4. **DELETE `api/cars/:id`**: Delete a specific car.

## **Order Routes**

1. **POST `/api/orders`**: Place a new order.
1. **GET `/api/orders/revenue`**: Place a new order.

---

# How to Run the Project locally

### Prerequisites

1. **Node.js** installed (v16 or above).
2. **MongoDB** installed or a MongoDB Atlas account.
3. Package manager (**npm** or **yarn**) installed.

---

### Steps to Run locally

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/neelimapriya/car-shop-backend
   cd car-store-b4a2v3



