# User Management App

## Overview

This application allows users to manage user accounts, including adding, editing, and deleting users. It provides an interface to update basic user information such as name, email, role, and status.

## Features

- **CRUD Operations**: Add, update, and delete users.
- **Sorting**: Users can be sorted by name, email, role, or status.
- **Filtering**: Filter users by their status (Active/Inactive).
- **Search**: Search users by name or email.

## Setup Instructions

1. **Clone the repository**:
    ```bash
    git clone <repository_url>
    cd user-management-app
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Start the development server**:
    ```bash
    npm start
    ```

4. Open the app in your browser at `http://localhost:3000`.

## API Endpoints

- `GET /users`: Fetch all users.
- `POST /users`: Add a new user.
- `PUT /users/{id}`: Update an existing user.
- `DELETE /users/{id}`: Delete a user.

## Security Practices

- Input validation is implemented to ensure proper data is sent to the server.
- Error handling is in place for API interactions.
- Only authorized users can perform actions on the user data.
