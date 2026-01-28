import { Navbar } from "./components/Navbar";
import { Home as Hero } from "./components/sections/Home";
import { About } from "./components/sections/About";
import { Portfolio } from "./components/sections/Portfolio";
import { Contact } from "./components/sections/Contact";

import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <div className="relative w-full min-h-screen">
        <Hero></Hero>
        <main style={{ maxWidth: "1920px" }} className="mx-auto">
          <Portfolio></Portfolio>
          <Contact></Contact>
          <About></About>
        </main>
      </div>
    </>
  );
}

export default App;
