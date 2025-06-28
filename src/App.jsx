import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { MobileMenu } from "./components/MobileMenu";
import { Home as Hero } from "./components/sections/Home";
import { About } from "./components/sections/About";
import { Portfolio } from "./components/sections/Portfolio";
import { Contact } from "./components/sections/Contact";
// import { Packages } from "./components/sections/Packages";
// import { Faq } from "./components/sections/Faq";
import { TextureBG } from "./utils/TextureBG";

import "./App.css";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen}></Navbar>
      <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen}></MobileMenu>
      <div className="relative w-full min-h-screen">
        <TextureBG />
        <Hero></Hero>

        <main style={{ maxWidth: "1920px" }} className="mx-auto">
          <About></About>
          <Portfolio></Portfolio>
          {/* <Packages></Packages>
      <Faq></Faq> */}
          <Contact></Contact>
        </main>
      </div>
    </>
  );
}

export default App;
