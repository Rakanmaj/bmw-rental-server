# bmw-rental-server

BMW Rental Backend (Express + PostgreSQL)

This repository contains the backend server for the BMW Rental System, a full-stack web application that allows customers to rent BMW vehicles online and enables administrators to manage reservations efficiently.

Tech Stack

Node.js

Express.js

PostgreSQL

pg

dotenv

cors

bcryptjs

Getting Started

1️) Install dependencies
npm install

2) Environment Variables

Create a .env file in the project root:

PORT=3000
DATABASE_URL=postgres://postgres:0000@localhost:5433/bmw_rental_system

3) PostgreSQL Database

Make sure PostgreSQL is running and that the database exists:

CREATE DATABASE bmw_rental_system;


Your backend connects using:

new pg.Client(process.env.DATABASE_URL);

4️) Start the server
node server.js


If successful, you should see:

Database connected
Server listening on PORT 3000

 Project Structure
BMW-RENTAL-SERVER/
├── routes/
│   ├── authRoutes.js
│   ├── carsRoutes.js
│   └── reservationsRoutes.js
│
├── middlewares/
│   ├── authMiddleware.js
│   └── db.js
│
├── db.js
├── server.js
├── package.json
├── package-lock.json
├── .env
└── README.md

 Base URL
http://localhost:3000

 Authentication System

This backend uses header-based authentication.

Required Headers
Header	Description
x-user-id	Logged-in user ID
x-user-role	Must be admin for admin endpoints
Example Headers
x-user-id: 5
x-user-role: admin

 Auth Routes

Base URL

/api/auth

POST /api/auth/signup

Create a new user account.

{
  "full_name": "Rakan",
  "email": "rakan@example.com",
  "password": "123456",
  "phone": "0790000000",
  "role": "user"
}


Notes:

Passwords are hashed using bcrypt

Role defaults to "user" if not provided

POST /api/auth/login

Login using email and password.

{
  "email": "rakan@example.com",
  "password": "123456"
}


Returns user data with the password removed.

 Cars API

Base URL

/api/cars

GET /api/cars

Returns all BMW cars.

GET /api/cars/:id

Returns car details by ID.

If not found:

{ "message": "Car not found" }

 Reservations API

Base URL

/api/reservations


Reservation statuses:

pending | approved | rejected

 User Routes
GET /api/reservations/user/:userId

Returns reservations for the logged-in user only.

Required header

x-user-id: <same as :userId>


Access is denied if the user attempts to view another user’s data.

POST /api/reservations

Create a reservation.

Headers

x-user-id: USER_ID


Body

{
  "user_id": 5,
  "car_id": 2,
  "pickup_date": "2026-02-10",
  "pickup_time": "10:00",
  "return_date": "2026-02-12",
  "return_time": "12:00",
  "total_price": 240
}


Created with:

status = "pending"

admin_note = ""

PUT /api/reservations/user/:id

Update reservation schedule.

Rules:

User must own the reservation

Status must be pending

DELETE /api/reservations/:id

Delete a reservation owned by the logged-in user.

 Admin Routes
GET /api/reservations

Returns all reservations.

Headers

x-user-id: 1
x-user-role: admin

PUT /api/reservations/:id

Admin can update reservation status and note.

{
  "status": "approved",
  "admin_note": "Please arrive 10 minutes early."
}

 Target Users
Customers

Browse BMW vehicles

Create and manage reservations

Modify pending bookings

View booking history

Administrators

View all reservations

Approve or reject bookings

Add administrative notes

Monitor rental operations
