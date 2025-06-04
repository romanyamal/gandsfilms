import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { MobileMenu } from "./components/MobileMenu";
import { Home } from "./components/sections/Home";
import { About } from "./components/sections/About";
import { Portfolio } from "./components/sections/Portfolio";
import { Contact } from "./components/sections/Contact";
import { Packages } from "./components/sections/Packages";
import { Faq } from "./components/sections/Faq";

import "./App.css";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen}></Navbar>
      <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen}></MobileMenu>
      <Home></Home>
      <About></About>
      <Portfolio></Portfolio>
      {/* <Packages></Packages>
      <Faq></Faq> */}
      <Contact></Contact>
    </>
  );
}

export default App;
