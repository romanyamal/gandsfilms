export const MobileMenu = ({ menuOpen, setMenuOpen }) => {
  return (
    <div
      className={`fixed top-0 left-0 w-full bg-accent mask-b-from-97% mask-b-to-100% z-40 flex flex-col items-center justify-center transition-all duration-300 ease-in-out ${
        menuOpen
          ? "h-screen opacity-100 pointer-events-auto"
          : "h-0 opacity-0 pointer-events-none"
      }`}
    >
      <button
        onClick={() => setMenuOpen(false)}
        className="absolute top-6 right-9 text-white text-3xl focus:outline-none cursor-pointer"
        aria-label="Close Menu"
      >
        &times;
      </button>
      <ul className="text-center cursor-pointer space-y-6">
        <li>
          <a
            href="#home"
            onClick={() => setMenuOpen(false)}
            className={`text-2xl font-semibold text-white my-4 transform transition-transform duration-300 ${
              menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="#about"
            onClick={() => setMenuOpen(false)}
            className={`text-2xl font-semibold text-white my-4 transform transition-transform duration-300 ${
              menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            About
          </a>
        </li>
        <li>
          <a
            href="#portfolio"
            onClick={() => setMenuOpen(false)}
            className={`text-2xl font-semibold text-white my-4 transform transition-transform duration-300 ${
              menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            Portfolio
          </a>
        </li>
        <li>
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className={`text-2xl font-semibold text-white my-4 transform transition-transform duration-300 ${
              menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            Contact
          </a>
        </li>
        {/* <li>
          <a
            href="#packages"
            onClick={() => setMenuOpen(false)}
            className={`text-2xl font-semibold text-white my-4 transform transition-transform duration-300 ${
              menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            Packages
          </a>
        </li>
        <li>
          <a
            href="#faq"
            onClick={() => setMenuOpen(false)}
            className={`text-2xl font-semibold text-white my-4 transform transition-transform duration-300 ${
              menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            FAQ
          </a>
        </li> */}
        <li>
          <button
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className={`text-2xl min-w-24 my-4 items-center space-x-8 rounded-sm font-action text-black px-4 py-2 text-center bg-action hover:bg-action-hvr transform transition-transform duration-300 ${
              menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            <a href="#contact">Book Now</a>
          </button>
        </li>
      </ul>
    </div>
  );
};
