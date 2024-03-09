import React, { Fragment, useState, useEffect } from "react";
import styles from './admin.module.css';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const password = prompt("Enter the admin password:");
    if (password === "admin") {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password.");
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <Fragment>
        {/* Displaying nothing or a message because the password was incorrect. 
        Alternatively, you could redirect them to another page. */}
        <div className={styles.adminContainer}>
          <p>Access Denied</p>
        </div>
      </Fragment>
    );
  }

  // Admin content to show if the correct password is entered
  return (
    <Fragment>
      <div className={styles.adminContainer}>
        {/* Your admin page content here */}
        <h1>Admin Dashboard</h1>
        {/* Example content */}
        <p>Welcome to the Admin Dashboard.</p>
      </div>
    </Fragment>
  );
};

export default Admin;
