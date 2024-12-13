import React from "react";
import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";
const Layout = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-500 via-blue-700 to-purple-500 fl">
        <header>
          <Navbar />
        </header>
        <main className=" flex-grow flex items-center justify-center container max-h-screen mx-auto p-4 sm:p-6">
          <Outlet />
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default Layout;
