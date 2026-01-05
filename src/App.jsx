import {useState} from "react";
import {Outlet} from "react-router-dom";
import Header from "./Component/common/Header.jsx";
import Footer from "./Component/common/Footer.jsx";

function App() {
  const pageURL = window.location.pathname;
  console.log(pageURL);

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
