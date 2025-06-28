import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { MobileMenu } from "./components/MobileMenu";
import { Home as Hero } from "./components/sections/Home";
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

      <Hero></Hero>

      <main style={{ maxWidth: "1920px" }} className="mx-auto">
        <About></About>
        <Portfolio></Portfolio>
        <Contact></Contact>
      </main>
    </>
  );
}

export default App;
