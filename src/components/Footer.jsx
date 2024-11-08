import React from "react";

export default function Footer() {
  return (
    <footer className="position-relative bottom-0 w-100 bg-dark" style={{height:"10vh"}} >
      <div
        className="text-center text-white p-3"
      >
        © 2020 Copyright:
        <a className="text-white px-1" href="#">
          blogbeam.com
        </a>
      </div>
    </footer>
  );
}
