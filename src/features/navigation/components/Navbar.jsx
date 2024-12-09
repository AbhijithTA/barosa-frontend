import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Profile, Cart, Search, Love } from "../../../assets/icons";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleOutsideClick = (e) => {
    if (!e.target.closest(".dropdown-container")) {
      setDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  });

  useEffect(() => {
    const handleScroll = () => {
      // Add scroll handling logic if needed
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="fixed top-0 w-full h-[65px] bg-white text-black shadow-md z-[1000]">
      <div className="flex items-center justify-between px-4 md:px-8 h-full">
        {/* Desktop Links */}
        <div className="hidden md:flex gap-10 sm:gap-5 w-2/6 ">
          <div className="relative flex dropdown-container">
            <button
              className="hover:text-black/50 flex"
              onClick={() => setDropdown(!dropdown)}
            >
              SHOP
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`w-4 h-4 ml-1 transform transition-transform duration-200 ${
                  dropdown ? "rotate-180" : "rotate-0"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {dropdown && (
              <div className="absolute left-0 bg-white shadow-lg z-10 w-[97vw] mt-10 flex flex-wrap justify-between py-8">
                <div className="w-1/4 flex flex-col items-center">
                <ul>
                <h1 className="font-semibold">Women</h1>
                  <li>Top </li>
                  <li>Mid Dress</li>
                  <li>Long Dress</li>
                  <li>Sets</li>
                  <li>Pants</li>
                  <li>shorts</li>
                  <li>Sleepware</li>
                  <li>Blazers</li>
                </ul>
                </div>
                <div className="w-1/4 flex  flex-col items-center">
                <ul>
                <h1 className="font-semibold ">Men</h1>
                  <li>Shirts </li>
                  <li>Pants</li>
                  <li>Casual Pants</li>
                  <li>Suits</li>
                  <li>shorts</li>
                  <li>Sleepware</li>
                  <li>Blazers</li>
                  <li>Sets</li>
                </ul>
                </div>
                <div className="w-1/4 flex  flex-col items-center">
                
                <ul>
                <h1 className="font-semibold">Kids</h1>
                  <li>Shirts </li>
                  <li>Pants</li>
                  <li>shorts</li>
                  <li>Sleepware</li>
                  <li>Sets</li>
                  

                </ul>
                </div>
               
                
                <div className="w-1/4 flex flex-col  items-center">
                <ul>
                <h1 className="font-semibold">Gifts</h1>
                  <li>
                    Gifts
                  </li>
                </ul>
                </div>
                
              </div>
            )}
          </div>

          <Link to="/" className="text-black text-sm">
            ABOUT
          </Link>
          <Link to="/" className="text-black text-sm">
            CONTACT
          </Link>
          <Link to="/" className="text-black text-sm">
            MORE
          </Link>
        </div>

        {/* Left section */}
        <div className="w-2/6 flex justify-center">
          <h2 className="text-xl sm:text-3xl font-semibold">BAROZA</h2>
        </div>

        {/* Right section */}
        <div className="flex items-center justify-end gap-5 w-2/6 ">
          <Link to="/login" className="hidden md:block">
            <Profile className="w-5 h-5" />
          </Link>
          <Link to="/contact" className="hidden md:block">
            <Love className="w-6 h-6" />
          </Link>
          <Link to="/contact" className="hidden md:block">
            <Cart className="w-6 h-6" />
          </Link>

          {/* Hamburger menu */}
          <div className="flex flex-row space-x-1 mt-1  sm:hidden">
            <Link
              to="/login"
              className="text-black text-sm mb-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Profile height="18px" className="w-3 h-3 inline mr-2" />
            </Link>
            <Link
              to="/contact"
              className="text-black text-sm mb-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Cart height="20px" className="w-3 h-3 inline mr-2" />
            </Link>
            <Link
              to="/contact"
              className="text-black text-sm"
              onClick={() => setIsMenuOpen(false)}
            >
              <Love height="20px" className="w-3 h-3 inline mr-2" />
            </Link>
          </div>
          <button
            className="block md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-[65px] right-0 w-1/2 bg-white shadow-md z-[999] flex flex-col items-center p-4">
          <Link
            to="/"
            className="text-black text-sm mb-2"
            onClick={() => setIsMenuOpen(false)}
          >
            SHOP
          </Link>
          <Link
            to="/"
            className="text-black text-sm mb-2"
            onClick={() => setIsMenuOpen(false)}
          >
            ABOUT
          </Link>
          <Link
            to="/"
            className="text-black text-sm mb-2"
            onClick={() => setIsMenuOpen(false)}
          >
            CONTACT
          </Link>
          <Link
            to="/"
            className="text-black text-sm mb-2"
            onClick={() => setIsMenuOpen(false)}
          >
            MORE
          </Link>
        </div>
      )}
    </div>
  );
};

// export default Navbar;
