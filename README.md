# 🚗 BMW Rental Backend (Express + PostgreSQL)

This repository contains the backend server for the **BMW Rental System**, a full-stack web application that allows users to browse BMW vehicles, rent cars online, and manage reservations. Administrators can monitor, approve, or reject booking requests.

---

## 📌 Application Overview

**BMW Rental System** is designed to provide a smooth, secure, and user-friendly car rental experience.

### 👤 Customers can:
- Browse available BMW vehicles  
- Create rental reservations  
- Update or cancel pending bookings  
- View reservation history  

### 🧑‍💼 Administrators can:
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
2️⃣ Environment Variables
Create a .env file in the project root:

env
Copy code
PORT=3000
DATABASE_URL=postgres://postgres:0000@localhost:5433/bmw_rental_system
3️⃣ Database Setup
Ensure PostgreSQL is running and create the database:

sql
Copy code
CREATE DATABASE bmw_rental_system;
The application connects using:

js
Copy code
new pg.Client(process.env.DATABASE_URL);
4️⃣ Start the Server
bash
Copy code
node server.js
If successful, you should see:

pgsql
Copy code
Database connected
Server listening on PORT 3000
📁 Project Structure
text
Copy code
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
🌐 Base URL
arduino
Copy code
http://localhost:3000
🔐 Authentication System
This backend uses header-based authentication.

Required Headers
pgsql
Copy code
x-user-id     → logged-in user ID
x-user-role   → admin access
Example:

pgsql
Copy code
x-user-id: 5
x-user-role: admin
🔐 Authentication Routes
Base URL

bash
Copy code
/api/auth
Endpoints
Method	Endpoint	Description
POST	/signup	Register new user
POST	/login	Login user

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
Notes

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

🚘 Cars Routes
Base URL

bash
Copy code
/api/cars
Method	Endpoint	Description
GET	/	Get all cars
GET	/:id	Get car by ID

Example:

bash
Copy code
GET /api/cars
GET /api/cars/2
📅 Reservations Routes
Base URL

bash
Copy code
/api/reservations
Reservation statuses:

nginx
Copy code
pending | approved | rejected
👤 User Endpoints
GET /api/reservations/user/:userId
Returns reservations for the logged-in user only.

Required header:

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
Allows user to update pickup and return times only if reservation status is pending.

DELETE /api/reservations/:id
Deletes a reservation owned by the logged-in user.

🧑‍💼 Admin Endpoints
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
✅ Features Summary
User authentication

Role-based authorization

BMW car browsing

Reservation management system

Admin approval workflow

PostgreSQL relational database

Clean Express modular architecture

🏁 Conclusion
The BMW Rental Backend System provides a secure, scalable, and well-structured backend solution for an online car rental platform.
It ensures data consistency, access control, and a smooth reservation lifecycle for both customers and administrators.

yaml
Copy code

---

## ✅ Result

When you click **Preview**, your README will look:

- ✔ exactly like your screenshot  
- ✔ professional GitHub style  
- ✔ clean spacing  
- ✔ readable  
- ✔ perfect for grading  

---

If you want, next I can help you:

- 🧩 ERD explanation  
- 🗄️ SQL schema documentation  
- 🧠 system architecture diagram text  
- 📘 report-ready explanation paragraphs  

Just tell me 👍






You said:
i want it all in GitHub-style Markdown,


ChatGPT said:
Perfect — thanks for clarifying 👍
Below is everything written in pure GitHub-style Markdown, exactly how popular repositories look.

✅ No extra formatting
✅ No HTML
✅ No weird labels
✅ Clean headings, tables, code blocks
✅ Looks correct in GitHub Preview

✅ COPY EVERYTHING BELOW INTO README.md
md
Copy code
# 🚗 BMW Rental Backend (Express + PostgreSQL)

This repository contains the backend server for the **BMW Rental System**, a full-stack web application that allows users to browse BMW vehicles, rent cars online, and manage reservations. Administrators can monitor, approve, or reject booking requests.

---

## 📌 Application Overview

The **BMW Rental System** provides a secure and user-friendly car rental experience.

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

- Node.js  
- Express.js  
- PostgreSQL  
- pg  
- dotenv  
- cors  
- bcryptjs  

---

## 🚀 Getting Started

### Install dependencies

```bash
npm install
Environment variables
Create a .env file in the project root:

env
Copy code
PORT=3000
DATABASE_URL=postgres://postgres:0000@localhost:5433/bmw_rental_system
Database setup
Make sure PostgreSQL is running and create the database:

sql
Copy code
CREATE DATABASE bmw_rental_system;
The application connects using:

js
Copy code
new pg.Client(process.env.DATABASE_URL);
Start the server
bash
Copy code
node server.js
If successful, you should see:

pgsql
Copy code
Database connected
Server listening on PORT 3000
📁 Project Structure
text
Copy code
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
🌐 Base URL
arduino
Copy code
http://localhost:3000
🔐 Authentication System
This backend uses header-based authentication.

Required headers
pgsql
Copy code
x-user-id     → logged-in user ID
x-user-role   → admin access
Example:

pgsql
Copy code
x-user-id: 5
x-user-role: admin
🔐 Authentication Routes
Base URL:

bash
Copy code
/api/auth
Method	Endpoint	Description
POST	/signup	Register new user
POST	/login	Login user

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

🚘 Cars Routes
Base URL:

bash
Copy code
/api/cars
Method	Endpoint	Description
GET	/	Get all cars
GET	/:id	Get car by ID

Example:

bash
Copy code
GET /api/cars
GET /api/cars/2
📅 Reservations Routes
Base URL:

bash
Copy code
/api/reservations
Reservation statuses:

nginx
Copy code
pending | approved | rejected
User endpoints
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
Allows the user to update pickup and return times only if the reservation is pending.

DELETE /api/reservations/:id
Deletes a reservation owned by the logged-in user.

Admin endpoints
GET /api/reservations
Returns all reservations.

Headers required:

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
✅ Features Summary
Header-based authentication

Role-based access control

BMW car listing

Reservation creation and management

Admin approval workflow

PostgreSQL relational database

Modular Express architecture
