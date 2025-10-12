# campus

This smart campus project helps colleges manage teaching staff, non-teaching staff, students, hostels, and more.

## Technologies Used
- Node.js (Express) for backend
- React.js with Mantine for frontend
- MySQL for database management

## Requirements
- Node.js v18.20.0
- MySQL

## How to Run the Server
1. Go to the `server` folder:
   ```sh
   cd server

## Install dependencies
npm install

## Start the development server
npm run dev

Admin APIs (/api/admin)

Method	Endpoint	Description	Auth Required	Body / Params
GET	/api/admin/:id	Get all admins by management ID	Yes	:id (managementId param)
POST	/api/admin/	Create new admin (with image)	Yes	FormData: firstName, lastName, emailId, password, status, managementId, phoneNumber, profileImage (file)
PUT	/api/admin/:id	Update admin by ID (with image)	Yes	:id (adminId param), FormData fields as above
DELETE	/api/admin/:id	Delete admin by ID	Yes	:id (adminId param)
GET	/api/admin/:id	Get admin by ID	Yes	:id (adminId param)
POST	/api/admin/login	Login admin by email	No	emailId, password


Management APIs (/api/management)
Method	Endpoint	Description	Auth Required	Body / Params
GET	/api/management/:id	Get all managements	Yes	:id (managementId param)
POST	/api/management/	Create new management	Yes	name, managementType
PUT	/api/management/:id	Update management by ID	Yes	:id (managementId param), fields to update
DELETE	/api/management/:id	Delete management by ID	Yes	:id (managementId param)
GET	/api/management/:id	Get management by ID	Yes	:id (managementId param)


## Project Structure
server/src/router/admin/ - Admin API controllers and services
server/src/router/mangement/ - Management API controllers and services
server/src/config/database/ - Database connection
server/src/config/fileUpload/ - File upload config
server/src/middleware/JWE/ - JWT authentication middleware
server/src/utils/ - Utility functions
