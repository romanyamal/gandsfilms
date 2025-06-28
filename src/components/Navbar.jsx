import { useEffect } from "react";

export const Navbar = ({ menuOpen, setMenuOpen }) => {
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);
  return (
    <nav className="fixed top-0 w-full z-40 bg-accent mask-b-from-97% mask-b-to-100%">
      <div className="px-4">
        <div className="flex justify-center md:justify-between items-center  h-16 ">
          <a
            href="#home"
            className="min-w-64 font-logo text-4xl font-regular text-white"
          >
            Glimpse and Smile Films
          </a>
          <button
            className="absolute top-4 right-6 cursor-pointer text-lg z-40 md:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            &#9776;
          </button>
          <ul className="hidden md:flex items-center space-x-4 lg:space-x-8">
            <li>
              <a
                href="#home"
                className="text-grey-300 hover:text-action-hvr translation-colors"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="text-grey-300 hover:text-action-hvr translation-colors"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#portfolio"
                className="text-grey-300 hover:text-action-hvr translation-colors"
              >
                Portfolio
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="text-grey-300 hover:text-action-hvr translation-colors"
              >
                Contact
              </a>
            </li>
            {/* <li>
              <a
                href="#packages"
                className="text-grey-300 hover:text-action-hvr translation-colors"
              >
                Packages
              </a>
            </li>
            <li>
              <a
                href="#faq"
                className="text-grey-300 hover:text-action-hvr translation-colors"
              >
                FAQ
              </a>
            </li> */}
            <li>
              <a
                href="#contact"
                className="inline-block rounded-sm text-md font-action text-black px-4 py-1 text-center bg-action hover:bg-action-hvr"
              >
                Book Now
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
