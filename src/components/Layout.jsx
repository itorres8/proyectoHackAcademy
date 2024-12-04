import React from "react";
import { Outlet } from "react-router-dom";
import NavScrollExample from "./Navbar";
import styles from "../styles/Layout.module.css";

const Layout = () => {
  return (
    <div className={styles.layout}>
      <header>
        <NavScrollExample />
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <p>
          Hack Academy Copyright <i className="bi bi-c-circle"></i>{" "}
          {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
};

export default Layout;
