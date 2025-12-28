import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./Component/Home.jsx";
import Features from "./Component/Features.jsx";
import About from "./Component/About.jsx";
import Contact from "./Component/Contact.jsx";

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
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </StrictMode>
);
