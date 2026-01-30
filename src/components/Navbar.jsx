import { useState, useCallback } from "react";
import logoimg from "../assets/GS logo short.png";

export const Navbar = () => {
  const [showModal, setShowModal] = useState(false);

  const navLinks = [
    { title: "Home", anchor: "#home" },
    { title: "My Work", anchor: "#mywork" },
    { title: "Contact", anchor: "#contact" },
    { title: "About", anchor: "#about" },
  ];

  const toggleModal = useCallback(() => {
    setShowModal((prevShowModal) => !prevShowModal);
  }, []);

  return (
    <>
      <nav className="absolute top-0 w-full z-40">
        <div className="flex justify-between items-center px-4 h-20">
          <a href="#home" className=" w-15 md:max-w-20">
            <img src={logoimg} alt="G and S Logo" />
          </a>
          <div className="flex items-center space-x-8 md:space-x-10">
            <a
              href="#contact"
              className="inline-block text-base font-light font-body uppercase text-wht px-2 sm:px-4 tracking-[5px] py-1 sm:py-2 text-center bg-wht/15 backdrop-blur-[1px] hover:backdrop-blur-[5px] border border-transparent hover:border-wht/30"
            >
              Book Now
            </a>
            <button
              className={`
                absolute top-6 right-6 cursor-pointer text-lg z-40 text-wht
                transition-opacity duration-500 ease-in-out
                ${showModal ? "opacity-0 pointer-events-none no-doc-scroll" : "opacity-100"}
              `}
              onClick={toggleModal}
              aria-label="Open menu"
            >
              &#9776;
            </button>
          </div>
        </div>
        <div className="mx-auto flex justify-center items-center">
          <button
            className={`
                absolute top-6 right-6 cursor-pointer text-lg z-40 text-wht
                transition-opacity duration-500 ease-in-out
                ${showModal ? "opacity-100" : "opacity-0 pointer-events-none"}
              `}
            onClick={toggleModal}
            aria-label="Close menu"
          >
            &#x2715;
          </button>
        </div>
        <div
          className={`
              fixed top-0 left-0 w-full h-full bg-menu z-30 transform
              transition-all duration-500 ease-in-out
              ${
                showModal
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-full opacity-0 pointer-events-none"
              }
            `}
        >
          <div className="flex flex-col gap-8 items-center justify-center h-full">
            <div className="flex flex-col gap-8 items-center justify-center h-full">
              {navLinks.map((section) => (
                <a
                  key={section.title}
                  href={section.anchor}
                  className="text-wht font-light text-2xl cursor-pointer hover:text-blk transition-colors "
                  onClick={toggleModal}
                >
                  {section.title}
                </a>
              ))}
              <button
                href="#contact"
                className="min-w-24 my-4 border px-4 py-2 text-center text-2xl font-light hover:bg-gr transform transition-transform duration-500"
                onClick={toggleModal}
              >
                <a href="#contact">Book Now</a>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
