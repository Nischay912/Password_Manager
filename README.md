# Password Manager

A modern, responsive password manager application designed to help users securely store and manage their credentials. Built with **React** and **Tailwind CSS**, this project features two distinct versions: one for local storage and one for a cloud-based database, offering flexible and secure data management.

---

## Key Features

* **Secure Credential Storage:** Store website links, usernames, and encrypted passwords.
* **Two Data Storage Options:** Choose between a client-side **`localStorage`** solution or a robust server-side **MongoDB** database for persistent storage.
* **Full CRUD Functionality:** Easily **add, edit, and delete** your saved passwords.
* **One-Click Copy:** Quickly copy passwords to your clipboard with a single click.
* **Intuitive UI/UX:** A sleek, responsive design that looks great on all devices, from mobile phones to desktops.
* **Animated Icons:** The interface is enhanced with beautifully animated icons to provide a more dynamic and engaging user experience.
* **Toast Notifications:** Uses **React Toasts** to provide clear, unobtrusive feedback for all actions (e.g., "Password copied!").

---

## Technologies Used

* **Frontend:**
    * **React:** For building the dynamic user interface.
    * **Tailwind CSS:** For a utility-first approach to styling, ensuring a fully responsive design.
    * **React Toasts:** For elegant, non-blocking user notifications.
* **Backend & Database (MongoDB Version):**
    * **MongoDB:** A flexible NoSQL database for secure, scalable password storage.
    * **Express.js/Node.js:** (Assumed) for the API to handle database interactions.

---

## How to Use

### Version 1: `localStorage`

This version is perfect for personal use, as it stores all data directly in your browser. No backend or database setup is required. Simply clone the repository and run the React app.

### Version 2: MongoDB

For a more secure and persistent solution, this version connects to a MongoDB database. You will need to set up your own backend API and configure the database connection.

* **Prerequisites:** Node.js, npm, and a MongoDB instance (local or cloud).
* **Setup:**
    1.  Install the necessary dependencies.
    2.  Create a `.env` file with your MongoDB connection string.
    3.  Start the backend server and the React application.

---

## Future Enhancements

* **Password Encryption:** Implement more advanced encryption algorithms for an extra layer of security.
* **Password Generation:** Add a built-in password generator to create strong, unique passwords.
* **User Authentication:** Implement a full user authentication system to manage individual accounts.
* **Search Functionality:** Add a search bar to quickly find specific credentials.

---

## Acknowledgements

* Inspired by popular password management solutions.
* Styled with the power of **Tailwind CSS**.
* Built using the flexibility of the **React** framework.