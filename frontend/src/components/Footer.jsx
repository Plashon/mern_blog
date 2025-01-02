import React from "react";

const Footer = () => {
  return (
    <footer className="footer footer-center bg-slate-400 text-base-content p-4 ">
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - Learn Ract Mongoss reserved by Phubate SE NPRU
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
