# 🚗 BMW Rental Backend (Express + PostgreSQL)

This repository contains the backend server for the **BMW Rental System**, a full-stack web application that allows users to browse BMW cars, rent vehicles online, and manage reservations. Administrators can monitor, approve, or reject booking requests.

---

## 📌 Application Overview

**BMW Rental System** is designed to provide a smooth and secure car rental experience.

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

## 🏗️ Tech Stack

- **Node.js**
- **Express.js**
- **PostgreSQL**
- **pg**
- **dotenv**
- **cors**
- **bcryptjs**

---

## 🚀 Getting Started

### 1️⃣ Install dependencies

```bash
npm install
2️)  Environment Variables
Create a .env file in the project root:

env
Copy code
PORT=3000
DATABASE_URL=postgres://postgres:0000@localhost:5433/bmw_rental_system
3️)  Database Setup
Ensure PostgreSQL is running and create the database:

sql
Copy code
CREATE DATABASE bmw_rental_system;
The application connects using:

js
Copy code
new pg.Client(process.env.DATABASE_URL);
4️)  Start the Server
bash
Copy code
node server.js
If successful, you will see:

pgsql
Copy code
Database connected
Server listening on PORT 3000
📁 Project Structure
text
Copy code
BMW-RENTAL-SERVER/
├── routes/
│   ├── authRoutes.js            # User signup & login
│   ├── carsRoutes.js            # BMW cars endpoints
│   └── reservationsRoutes.js    # Reservations logic
│
├── middlewares/
│   ├── authMiddleware.js        # Authentication & admin guard
│   └── db.js
│
├── db.js                        # PostgreSQL client
├── server.js                    # App entry point
├── package.json
├── package-lock.json
├── .env
└── README.md
  Base URL
arduino
Copy code
http://localhost:3000
 Authentication System
This backend uses header-based authentication.

Required Headers
Header	Description
x-user-id	Logged-in user ID
x-user-role	Required for admin routes

Example
pgsql
Copy code
x-user-id: 5
x-user-role: admin
 Authentication Routes
Base URL

bash
Copy code
/api/auth
Method	Endpoint	Description
POST	/signup	Register new user
POST	/login	User login

POST /api/auth/signup
json
Copy code
{
  "full_name": "Rakan",
  "email": "rakan@example.com",
  "password": "123456",
  "phone": "0790000000",
  "role": "user"
}
Notes:

Passwords are hashed using bcrypt

Role defaults to user if not provided

POST /api/auth/login
json
Copy code
{
  "email": "rakan@example.com",
  "password": "123456"
}
Returns user data excluding the password.

 Cars Routes
Base URL

bash
Copy code
/api/cars
Method	Endpoint	Description
GET	/	Get all cars
GET	/:id	Get car by ID

Example
bash
Copy code
GET /api/cars
GET /api/cars/2
 Reservations Routes
Base URL

bash
Copy code
/api/reservations
Reservation statuses:

nginx
Copy code
pending | approved | rejected
 User Endpoints
GET /api/reservations/user/:userId
Returns reservations for the logged-in user only.

Header required:

less
Copy code
x-user-id: same as :userId
POST /api/reservations
Create a reservation.

json
Copy code
{
  "user_id": 5,
  "car_id": 2,
  "pickup_date": "2026-02-10",
  "pickup_time": "10:00",
  "return_date": "2026-02-12",
  "return_time": "12:00",
  "total_price": 240
}
Reservation is created with:

vbnet
Copy code
status: pending
admin_note: ""
PUT /api/reservations/user/:id
User may update pickup and return times only if status is pending.

DELETE /api/reservations/:id
Deletes reservation owned by the logged-in user.

 Admin Endpoints
GET /api/reservations
Returns all reservations.

Required headers:

pgsql
Copy code
x-user-id: any
x-user-role: admin
PUT /api/reservations/:id
Update reservation status and admin note.

json
Copy code
{
  "status": "approved",
  "admin_note": "Please arrive 15 minutes early."
}
