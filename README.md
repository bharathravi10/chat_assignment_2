# Chat Assignment
## :rocket: Overview
This project is an Express.js-based application that provides user authentication and chat history import functionality. It includes user registration, login with token-based authentication, and chat history import via an Excel file.
## :sparkles: Features
- **User Registration**: Allows new users to create an account with input validation and secure credential storage.
- **Login API (Token Generation)**: Implements JWT-based authentication for secure access.
- **Chat Import via Excel Sheet**: Enables users to upload chat history from an Excel file, ensuring data validation and integration.
## :hammer_and_wrench: Tech Stack
- **Backend**: Node.js, Express.js, TypeScript
- **Database**: MySQL
- **Security**: Bcrypt.js (Password Hashing), JSON Web Token (JWT), Helmet (Security Middleware)
- **File Handling**: Multer (File Upload), XLSX (Excel Parsing)
---
## :package: Installation
### Prerequisites
- Node.js (>=16.x)
- MySQL Database
### Steps to Run
1. **Clone the repository**:
   ```sh
   git clone https://github.com/bharathravi10/chat_assignment_2.git
   cd chat-assignment
   ```
2. **Install dependencies**:
   ```sh
   npm install
   ```
3. **Setup Environment Variables**:
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=MayMonth@2023
   DB_NAME=practice
   JWT_SECRET=123456
   ```
4. **Run the application**:
   - Development mode:
     ```sh
     npm run dev
     ```
   - Production mode:
     ```sh
     npm start
     ```
---
## :key: API Endpoints
### **Authentication APIs**
| Method | Endpoint             | Description                   |
| ------ | -------------------- | ----------------------------- |
| POST   | `/api/auth/register` | Register a new user           |
| POST   | `/api/auth/login`    | User login & token generation |
### **Chat Import APIs**
| Method | Endpoint           | Description                              |
| ------ | ------------------ | ---------------------------------------- |
| POST   | `/api/chat/import` | Upload and import chat history via Excel |
---
## :open_file_folder: Project Structure
```
/chat-assignment
│── /src
│   ├── /routes        # API Routes
│   ├── /controllers   # Request Handlers
│   ├── /middlewares   # Authentication & Validation
│   ├── /utils         # Helper Functions
│── /config            # Database Configuration
│── .env               # Environment Variables
│── package.json       # Project Dependencies
│── README.md          # Project Documentation
```
---
## :memo: License
This project is licensed under the **ISC License**.
---
## :handshake: Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.
---
## :telephone_receiver: Contact
For any queries or support, reach out at [bharathravi336@gmail.com](mailto:bharathravi336@gmail.com).