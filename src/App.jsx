import {useState} from "react";
import {Outlet} from "react-router-dom";
import Header from "./Component/Header.jsx";
import Footer from "./Component/Footer.jsx";

function App() {
  return (
    <>
      <Header />
      <div className="min-h-[calc(100vh-106px)]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
