import React from "react";
import {
  useLoaderData,
  useNavigate,
  Form,
  // redirect,
  useActionData,
} from "react-router-dom";
import { loginUser } from "../../api";
import { redirect } from "../../solver";

export function loader({ request }) {
  return new URL(request.url).searchParams.get("message");
}

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const pathname =
    new URL(request.url).searchParams.get("redirectTo") || "/host";

  try {
    const data = await loginUser({ email, password });
    localStorage.setItem("loggedin", true);
    return redirect(pathname);
  } catch (err) {
    return err.message;
  }
}

export default function Login() {
  const [status, setStatus] = React.useState("idle");
  const errorMessage = useActionData();
  const message = useLoaderData();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    loginUser(loginFormData)
      .then((data) => {
        navigate("/host", { replace: true });
      })
      .finally(() => setStatus("idle"));
  }

  return (
    <div className="login-container">
      <h1>Sign in to your account</h1>
      {message && <h3 className="red">{message}</h3>}
      {errorMessage && <h3 className="red">{errorMessage}</h3>}

      <Form method="post" className="login-form" replace>
        <input name="email" type="email" placeholder="Email address" />
        <input name="password" type="password" placeholder="Password" />
        <button disabled={status === "submitting"}>
          {status === "submitting" ? "Logging in..." : "Log in"}
        </button>
      </Form>
    </div>
  );
}
// import React, { useState } from "react";
// import { useLoaderData, useNavigate, Form, redirect } from "react-router-dom";
// import { loginUser } from "../../api";

// export function loader({ request }) {
//   return new URL(request.url).searchParams.get("message");
// }

// export async function action({ request }) {
//   const formData = await request.formData();
//   const email = formData.get("email");
//   const password = formData.get("password");
//   const data = await loginUser({ email, password });
//   localStorage.setItem("loggedin", true);
//   return redirect("/host");
// }
// export default function Login() {
//   const [status, setStatus] = useState("idle");
//   const [error, setError] = useState(null);
//   const message = useLoaderData();
//   const navigate = useNavigate();

//   function handleSubmit(e) {
//     e.preventDefault();
//     setStatus("submitting");
//     setError(null);
//     loginUser(loginFormData)
//       .then((data) => {
//         navigate("/host", { replace: true });
//       })
//       .catch((err) => setError(err))
//       .finally(() => setStatus("idle"));
//   }

//   return (
//     <div className="login-container">
//       <h1>Sign in to your account</h1>
//       {message && <h3 className="red">{message}</h3>}
//       {error && <h3 className="red">{error.message}</h3>}

//       <Form method="post" className="login-form" replace>
//         <input name="email" type="email" placeholder="Email address" />
//         <input name="password" type="password" placeholder="Password" />
//         <button disabled={status === "submitting"}>
//           {status === "submitting" ? "Logging in..." : "Log in"}
//         </button>
//       </Form>
//     </div>
//   );
// }

// import React from "react";
// import { useLoaderData, useNavigate, redirect } from "react-router-dom";
// import { loginUser } from "../../api";

// export function loader({ request }) {
//   return new URL(request.url).searchParams.get("message");
// }

// export default function Login() {
//   const [loginFormData, setLoginFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [status, setStatus] = useState("idle");
//   const [error, setError] = useState(null);
//   const message = useLoaderData();
//   const navigate = useNavigate();

//   function handleSubmit(e) {
//     e.preventDefault();
//     setStatus("submitting");
//     setError(null);
//     loginUser(loginFormData)
//       .then((data) => {
//         navigate("/host", { replace: true });
//       })
//       .catch((err) => setError(err))
//       .finally(() => setStatus("idle"));
//   }

//   function handleChange(e) {
//     const { name, value } = e.target;
//     setLoginFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   }

//   return (
//     <div className="login-container">
//       <h1>Sign in to your account</h1>
//       {message && <h3 className="red">{message}</h3>}
//       {error && <h3 className="red">{error.message}</h3>}

//       <form onSubmit={handleSubmit} className="login-form">
//         <input
//           name="email"
//           onChange={handleChange}
//           type="email"
//           placeholder="Email address"
//           value={loginFormData.email}
//         />
//         <input
//           name="password"
//           onChange={handleChange}
//           type="password"
//           placeholder="Password"
//           value={loginFormData.password}
//         />
//         <button disabled={status === "submitting"}>
//           {status === "submitting" ? "Logging in..." : "Log in"}
//         </button>
//       </form>
//     </div>
//   );
// }
