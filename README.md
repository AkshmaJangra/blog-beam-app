# Blog Application

A basic blog application built with **React.js** and **Firebase** for user authentication and data storage. Users can create, view, edit, and delete blog posts.

## Features

- User authentication (sign-up, log-in) via Firebase
- CRUD (Create, Read, Update, Delete) functionality for blog posts
- Posts have a title, description, and optional cover image
- Uses Redux Toolkit for state management

## Tech Stack

- **Frontend**: React.js, Redux Toolkit, React Router
- **Backend**: Firebase Authentication

## Setup Instructions

### Prerequisites

- Node.js and npm
- Firebase project setup

### Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/blog-app.git
   cd blog-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up Firebase:

   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Enable **Firestore Database** and **Authentication** (email/password).
   - Copy Firebase credentials in the project root:

   ```plaintext
   VITE_FIREBASE_API_KEY=YOUR_API_KEY
   VITE_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
   VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
   ```

4. Start the development server:

   ```bash
   npm start
   ```

5. Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `src/`
  - `components/` - Reusable components (e.g., BlogCard, Navbar)
  - `slices/` - Redux slices for managing state
  - `firebaseConfig.js` - Firebase configuration and initialization

## Usage

### Add, Edit, Delete Posts

- **Add Post**: Available to logged-in users; enter title, description, and cover image.
- **Edit/Delete Post**: Users can edit or delete only their posts.

## Future Enhancements

- Comments on posts
- Image uploads to Firebase Storage
- Improved styling and responsiveness
