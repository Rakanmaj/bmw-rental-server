# BMW Rental Backend (Express + PostgreSQL)

This repository contains the backend server for the **BMW Rental System**, a full-stack web application that allows users to browse BMW vehicles, rent cars online, and manage reservations. Administrators can monitor, approve, or reject booking requests.

---

## Application Overview

**BMW Rental System** is designed to provide a smooth, secure, and user-friendly car rental experience.

### Customers can:
- Browse available BMW vehicles  
- Create rental reservations  
- Update or cancel pending bookings  
- View reservation history  

### Administrators can:
- View all reservations  
- Approve or reject bookings  
- Add administrative notes  
- Monitor system activity  

---

## Tech Stack

- **Node.js**
- **Express.js**
- **PostgreSQL**
- **pg**
- **dotenv**
- **cors**
- **bcryptjs**

---

## Getting Started

### 1️) Install dependencies

npm install

## 2️) Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
DATABASE_URL=postgres://postgres:0000@localhost:5433/bmw_rental_system
```
## 3️) Database Setup

Ensure PostgreSQL is running and create the database:
```sql
CREATE DATABASE bmw_rental_system;
```
## Database Schema

To create the tables:

```bash
psql -d bmw_rental_system -f schema.sql
```


## 4️) Start the Server

Run the server using:

```bash
node server.js
```

If successful, you should see:

Database connected

Server listening on PORT 3000
```md
## Project Structure
BMW-RENTAL-SERVER/
│
├── middlewares/
│   └── authMiddleware.js
│       ├── requireAuth      # checks x-user-id header
│       └── requireAdmin     # checks x-user-role header
│
├── routes/
│   ├── authRoutes.js
│   │   ├── POST /signup
│   │   └── POST /login
│   │
│   ├── carsRoutes.js
│   │   ├── GET  /api/cars
│   │   └── GET  /api/cars/:id
│   │
│   └── reservationsRoutes.js
│       ├── GET    /api/reservations/user/:userId
│       ├── POST   /api/reservations
│       ├── DELETE /api/reservations/:id
│       ├── GET    /api/reservations        (admin)
│       ├── PUT    /api/reservations/:id    (admin)
│       └── PUT    /api/reservations/user/:id
│
├── db.js
│   └── PostgreSQL client connection
│
├── server.js
│   └── Express application entry
│
├── .env
├── .gitignore
├── package.json
└── README.md
```
##  Base URL

http://localhost:3000

##  Authentication System

This backend uses **header-based authentication**.

### Required Headers

- `x-user-id` → logged-in user ID  
- `x-user-role` → admin access  

---

### Example Headers

x-user-id: 5

x-user-role: admin

## Authentication Routes

### Base URL

/api/auth

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /signup | Register new user |
| POST | /login | Login user |

---

## POST `/api/auth/signup`

Registers a new user.

### Request Body
```json
{
  "full_name": "Rakan",
  "email": "rakan@example.com",
  "password": "123456",
  "phone": "0790000000",
  "role": "user"
}
```  

### Notes

- Passwords are hashed using **bcrypt**
- Role defaults to **user** if not provided

## POST `/api/auth/login`

Logs in an existing user.

### Request Body

```json
{
  "email": "rakan@example.com",
  "password": "123456"
}
```  

## Cars Routes

### Base URL

---

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | / | Get all cars |
| GET | /:id | Get car by ID |

---

### Example Requests

- GET /api/cars
- GET /api/cars/2

## Reservations Routes

### Base URL

/api/reservations

### Reservation Statuses

pending | approved | rejected

## User Reservation Endpoints

### GET `/api/reservations/user/:userId`

Returns reservations for the **logged-in user only**.

### Required Header

x-user-id: same as :userId

## POST `/api/reservations`

Creates a new reservation.

### Request Body
---
```json
{
  "user_id": 5,
  "car_id": 2,
  "pickup_date": "2026-02-10",
  "pickup_time": "10:00",
  "return_date": "2026-02-12",
  "return_time": "12:00",
  "total_price": 240
}
```
### Reservation Defaults

When a reservation is created, it is saved with:

- `status`: **pending**
- `admin_note`: `""`

---

##  PUT `/api/reservations/user/:id`

Allows the user to update **pickup and return dates/times only**  
**if the reservation status is `pending`.**

##  DELETE `/api/reservations/:id`

Deletes a reservation **owned by the logged-in user**.

---

##  Admin Endpoints

###  GET `/api/reservations`

Returns **all reservations**.

### Required Headers

x-user-id: any
x-user-role: admin

---
## PUT `/api/reservations/:id`

Updates the reservation **status** and **admin note**.

### Request Body

```json
{
  "status": "approved",
  "admin_note": "Please arrive 15 minutes early."
}
```
---
## Features Summary

- User authentication  
- Role-based authorization  
- BMW car browsing  
- Reservation management system  
- Admin approval workflow  
- PostgreSQL relational database  
- Clean Express modular architecture


### ✅ Notes

- **Authentication** is handled via request headers:
  - `x-user-id`
  - `x-user-role`

- **No separate users routes exist**  
  User creation and login are handled through `authRoutes.js`.

- **Reservations** are fully protected using middleware:
  - Users can only access their own reservations
  - Admins can manage all reservations

- **Database relationships**:
  - `users → reservations` (one-to-many)
  - `cars → reservations` (one-to-many)

---
