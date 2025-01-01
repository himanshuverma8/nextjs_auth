# Full-Stack Authentication System

A secure and modern full-stack authentication system built with **Next.js**, **TypeScript**, and **MongoDB**. It includes password hashing, JWT-based session management, and email verification using **Nodemailer** and **Mailtrap**.

---

## Features

- **Full-Stack Integration**: Combines a modern frontend and backend for a complete solution.
- **Secure Password Hashing**: Utilizes `bcryptjs` to hash passwords securely.
- **JWT Authentication**: Implements JSON Web Tokens for session management.
- **Email Verification**: Sends verification emails using **Nodemailer** and **Mailtrap**.
- **Database Integration**: Efficiently stores user data using MongoDB.
- **Type Safety**: Written in **TypeScript** for scalable and maintainable code.

---

## Setup Instructions

### Prerequisites

- **Node.js** (v14+ recommended)
- **MongoDB** (local or cloud instance)
- **Mailtrap** account for testing email functionality

### Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/full-stack-authentication.git
   cd full-stack-authentication
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   - Create a `.env` file in the root directory and populate it with the following:
     ```env
     MONGODB_URI=<your-mongodb-uri>
     JWT_SECRET=<your-jwt-secret>
     MAILTRAP_USER=<your-mailtrap-username>
     MAILTRAP_PASS=<your-mailtrap-password>
     ```

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```

5. **Access the Application**:
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Folder Structure

```
full-stack-authentication/
├── components/          # Reusable React components
├── pages/               # Next.js pages (API and frontend)
├── utils/               # Utility functions (e.g., JWT handling)
├── models/              # MongoDB models
├── styles/              # CSS/SCSS files
├── .env                 # Environment variables
└── README.md            # Project documentation
```

---

## Future Enhancements

- Add social authentication (Google, GitHub, etc.).
- Implement password recovery functionality.
- Improve UI/UX with a modern design framework.

---

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m "Add new feature"`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

---

## License

This project is open-source and available under the MIT License.

---

**Note**: This project is intended for educational purposes. Please review and enhance security measures before using it in a production environment.

