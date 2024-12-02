# Admin Dashboard: Role-Based Access Control (RBAC)

This project is a frontend implementation of an Admin Dashboard with Role-Based Access Control (RBAC). It allows an admin to manage users, assign roles (user or creator), and grant creators the ability to create and manage posts. Users can view posts and follow creators. The application leverages modern React techniques to ensure efficient role management and user interaction.

---

## **Table of Contents**
1. **Overview**
2. **Features**
3. **Technologies Used**
4. **Project Structure**
5. **State Management**
6. **Routing & Permissions**
7. **Getting Started**

---

## **Overview**

This dashboard provides the following functionalities:

### **Admin Features**
- View and manage users and creators.
- Assign or toggle user roles (user or creator).
- Add new members to the system.

### **Creator Features**
- Create and publish new posts.
- Manage previously published posts.

### **User Features**
- Browse and view posts created by creators.
- Follow or unfollow creators.

---

## **Features**

### **Admin Functionality**
- **Role Management**: Assign or change roles between "user" and "creator."
- **User Management**: Add or remove users from the system.

### **Creator Functionality**
- **Post Management**: Create, edit, and manage posts using the TinyMCE editor.
- **Post History**: Access and review past posts.

### **User Functionality**
- **Post Viewing**: Browse content created by creators.
- **Follow Creators**: Manage following or unfollowing creators.

### **Shared Features**
- **Protected Routes**: Restrict page access based on user roles.
- **Optimized UI**: Features a skeleton loading animation (shimmer effect) and debounce for smooth input handling.
- **Responsive Design**: Includes a mobile-friendly sidebar with toggle functionality.

---

## **Technologies Used**
- **React**: For building user interfaces.
- **React Context API**: For managing global application state.
- **React Router**: For navigation and protected route handling.
- **Reducer**: For centralized state updates.
- **Tailwind CSS**: For responsive and modern UI styling.
- **TinyMCE**: A rich text editor for post creation.
- **Shimmer Effect**: For visual loading placeholders.
- **Debounce**: To optimize user input handling, such as in forms or search.

---

## **Project Structure**

```plaintext
src/
├── components/
│   ├── forms/          # Login and user addition forms
│   ├── CreatorNav/     # Creator-specific navigation
│   ├── Shimmer/        # Loading animation component
│   ├── UserNav/        # User-specific navigation
├── context/
│   ├── AuthContext/    # Handles authentication and login state
│   ├── BlogContext/    # Manages posts and blog-related state
├── pages/
│   ├── Dashboard/      # Admin dashboard interface
│   ├── Following/      # User's follow/unfollow interface
│   ├── PastBlogs/      # Creator’s post history page
│   ├── UnAuthorized/   # Page shown for unauthorized access
│   ├── UserDashboard/  # User's dashboard for browsing posts
│   ├── Write/          # Page for creators to write and edit posts
├── utils/
│   ├── reducer.js      # Handles global state updates
├── App.jsx             # Defines application routes
├── protectedRoute.jsx  # Logic for role-based protected routes
```

---

## **State Management**

- **Context API**: Simplifies global state management by avoiding prop drilling. Manages login state, roles, and posts.
- **Reducer**: Centralizes application logic for actions like role toggling, adding users, or managing posts.

---

## **Routing & Permissions**

### **Protected Routes**
- Restricts access to specific pages based on user roles.
- Redirects unauthorized users to a dedicated "Unauthorized" page.

### **Role-Based Access**
- **Admin**: Manage users and their roles.
- **Creators**: Write, edit, and review their own posts.
- **Users**: Browse posts and manage their creator subscriptions.

---

## **Getting Started**

### **Prerequisites**
Ensure you have:
- Node.js
- npm or yarn installed on your system.

### **Setup Instructions**

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/MahindraGamini/VRV-security-assignment
   cd VRV-security-assignment
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the Development Server**:
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Access the Application**:
   Open your browser and visit: [http://localhost:3000](http://localhost:3000).

---

## **Conclusion**

This Admin Dashboard showcases a comprehensive implementation of Role-Based Access Control (RBAC) in React. It enables efficient management of users and roles, post creation for creators, and post viewing for users. With modern design and optimization techniques, this application is scalable, user-friendly, and responsive across devices.