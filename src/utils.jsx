import React from "react";
// import { redirect } from "react-router-dom";
import { redirect } from "../solver";

export async function requireAuth(request) {
  const pathname = new URL(request.url).pathname;
  const isLoggedIn = localStorage.getItem("loggedin");

  if (!isLoggedIn) {
    throw redirect(
      `/login?message=You must log in first.&redirectTo=${pathname}`
    );
  }
  return null;
}

// import { redirect, Navigate } from "react-router-dom";

// export async function requireAuth() {
//   const isLoggedIn = false;

//   if (!isLoggedIn) {
//     return <Navigate to="/Login" />;
//   }
// }

// import { redirect } from "react-router-dom";

// export async function requireAuth() {
//   const isLoggedIn = false;

//   if (!isLoggedIn) {
//     throw redirect("/login?message=You must log in first.");
//   }
// }
// import { redirect, Navigate } from "react-router-dom";

// export async function requireAuth() {
//   const isLoggedIn = localStorage.getItem("loggedin");

//   if (!isLoggedIn) {
//     return <Navigate replace to="/login" />;
//   } else {
//     return (
//       <div>
//         <p>Welcome to your Dashboard</p>
//       </div>
//     );
//   }
// }
