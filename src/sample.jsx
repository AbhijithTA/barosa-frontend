import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Profile, Cart, Love } from "../../../assets/icons";
import { logoutAsync, selectLoggedInUser } from "../../auth/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../cart/CartSlice";
import { selectWishlistItems } from "../../wishlist/WishlistSlice";

export const Navbar = () => {
  const [shopDropdown, setShopDropdown] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const loggedInUser = useSelector(selectLoggedInUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);
  const wishlistItems = useSelector(selectWishlistItems);
  const cartItemsCount = cartItems.length;
  const wishlistItemsCount = wishlistItems.length;

  console.log(cartItemsCount, "cartItemsCount");

  const handleOutsideClick = (e) => {
    if (!e.target.closest(".dropdown-container")) {
      setShopDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  useEffect(() => {
    const handleScroll = () => {};

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleRedirect = (path) => {
    if (!loggedInUser) {
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  const handleLogout = () => {
    // Perform logout logic here
    dispatch(logoutAsync());
    navigate("/login");
  };

  return (
    <div className="fixed top-0 w-full h-[65px] bg-white text-black shadow-md z-[1000]">
      <div className="flex items-center justify-between px-4 md:px-8 h-full">
        {/* Desktop Links */}
        <div className="hidden md:flex gap-10 sm:gap-5 w-2/6 ">
          <div className="relative flex dropdown-container">
            <button
              className="hover:text-black/50 flex"
              onClick={() => {
                setShopDropdown(!shopDropdown);
                setProfileDropdown(false);
              }}
            >
              SHOP
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={w-4 h-4 ml-1 transform transition-transform duration-200 ${
                  shopDropdown ? "rotate-180" : "rotate-0"
                }}
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
            {shopDropdown && (
              <div className="absolute left-0 bg-white shadow-lg z-10 w-[97vw] mt-10 flex flex-wrap justify-between py-8">
                <div className="w-1/4 flex flex-col items-center">
                  <ul>
                    <h1 className="font-semibold">Women</h1>
                    <li>Top</li>
                    <li>Mid Dress</li>
                    <li>Long Dress</li>
                    <li>Sets</li>
                    <li>Pants</li>
                    <li>Shorts</li>
                    <li>Sleepwear</li>
                    <li>Blazers</li>
                  </ul>
                </div>

                <div className="w-1/4 flex flex-col items-center">
                  <ul>
                    <h1 className="font-semibold">Men</h1>
                    <li>Shirts</li>
                    <li>Pants</li>
                    <li>Casual Pants</li>
                    <li>Suits</li>
                    <li>Shorts</li>
                    <li>Sleepwear</li>
                    <li>Blazers</li>
                    <li>Sets</li>
                  </ul>
                </div>

                <div className="w-1/4 flex flex-col items-center">
                  <ul>
                    <h1 className="font-semibold">Kids</h1>
                    <li>Shirts</li>
                    <li>Pants</li>
                    <li>Shorts</li>
                    <li>Sleepwear</li>
                    <li>Sets</li>
                  </ul>
                </div>

                <div className="w-1/4 flex flex-col items-center">
                  <ul>
                    <h1 className="font-semibold">Gifts</h1>
                    <li>Gifts</li>
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

        <div className="w-2/6 flex justify-center">
          <Link to="/">
            <h2 className="text-xl sm:text-3xl font-semibold">BAROZA</h2>
          </Link>
        </div>

        <div className="flex items-center justify-end gap-5 w-2/6">
          {loggedInUser ? (
            <>
              <div className="relative flex items-center gap-2 dropdown-container">
                <Profile
                  className="w-5 h-5 cursor-pointer"
                  onClick={() => {
                    setProfileDropdown(!profileDropdown);
                    setShopDropdown(false);
                  }}
                />
                <span className="font-semibold text-sm">
                  {loggedInUser.name}
                </span>

                {profileDropdown && (
                  <div className="absolute top-10 right-4 mt-2 bg-white border border-gray-200 rounded shadow-md">
                    {loggedInUser.isAdmin ? (
                      <>
                        <Link
                          to="/admin-dashboard"
                          className="block px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Admin Dashboard
                        </Link>
                        <Link
                          to="/admin/add-product"
                          className="block px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Add Products
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Profile
                        </Link>
                        <Link
                          to="/orders"
                          className="block px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          My Orders
                        </Link>
                      </>
                    )}
                    <button
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>

              <Love
                className="w-6 h-6 cursor-pointer"
                onClick={() => handleRedirect("/wishlist")}
              />
              <Cart
                className="w-6 h-6 cursor-pointer"
                onClick={() => handleRedirect("/cart")}
              >
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartItems.length}
                  </span>
                )}
              </Cart>
            </>
          ) : (
            <>
              <Profile
                className="w-5 h-5 cursor-pointer"
                onClick={() => navigate("/login")}
              />
              <Love
                className="w-6 h-6 cursor-pointer"
                onClick={() => navigate("/login")}
              />
              <Cart
                className="w-6 h-6 cursor-pointer"
                onClick={() => navigate("/login")}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};