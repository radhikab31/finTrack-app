import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {FirebaseProvider} from "./Component/context/firebase.jsx";
import Home from "./Component/common/Home.jsx";
import Features from "./Component/common/Features.jsx";
import About from "./Component/common/About.jsx";
import Contact from "./Component/common/Contact.jsx";
import SignUpPage from "./Component/auth/SignUpPage.jsx";
import SignInPage from "./Component/auth/SignInPage.jsx";
import Dashboard from "./Component/dashboard/Dashboard.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {path: "/", element: <Home />},
      {path: "/features", element: <Features />},
      {path: "/about", element: <About />},
      {path: "/contact", element: <Contact />},
    ],
  },
  {path: "/signup", element: <SignUpPage />},
  {path: "/login", element: <SignInPage />},
  {path: "/dashboard", element: <Dashboard />},
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FirebaseProvider>
      <RouterProvider router={router} />
    </FirebaseProvider>
  </StrictMode>
);
