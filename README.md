Employ Management System
This is a full-stack Employee Management application built with Node.js, Express, MongoDB, and EJS. The application enables organizations to manage employees, including creating, viewing, updating, and deleting employee records. Authentication and authorization are handled using Passport.js, with role-based access control for secure and personalized user experience.

Table of Contents
Features
Technologies Used
Installation
Usage
Folder Structure
API Endpoints
Contributing

Features
User Authentication: Secure login and registration with Passport.js.
Employee CRUD Operations: Create, read, update, and delete employee records.
Flash Messages: Display success and error messages for actions like login, logout, and employee management.
Session Management: User sessions with secure cookies to keep users logged in.
Data Validation: Validation of incoming data with Joi to ensure data consistency.
Authorization: Only logged-in users can access certain routes and actions.


Technologies Used
Backend: Node.js, Express.js, Mongoose (for MongoDB integration)
Database: MongoDB
Frontend: EJS templating, Bootstrap
Authentication: Passport.js, express-session, connect-flash
Validation: Joi
Development Tools: Nodemon for development, Method-Override for RESTful API handling

API Endpoints
GET /listings - Display all employees
POST /listings - Add a new employee (protected)
PUT /listings/
- Update employee details by ID (protected)
DELETE /listings/
- Delete an employee by ID (protected)
GET /login - Display login page
POST /login - Log in user
GET /logout - Log out user
Contributing
Fork the repository.
Create a new branch for your feature.
Commit your changes.
Open a pull request with a detailed description.
