import React, { FC, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

export const HeaderNav: FC<{ auth?: boolean }> = ({ auth = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMenu, setShowMenu] = React.useState(false);

  useEffect(() => {
    location.pathname === "/" && navigate("/home");
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    console.log("Logging out...");
    toggleMenu();
  };

  return (
    <nav className="bg-white shadow-lg py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex">
            <Link
              to="/"
              className="font-bold text-2xl text-pink-600 hover:text-pink-500"
            >
              Habitually
            </Link>
          </div>

          <div className="flex items-center">
            <div className="mr-6">
              <Link
                to="/"
                className="text-gray-800 font-medium hover:text-pink-500"
              >
                Home
              </Link>
            </div>
            {auth && (
              <div className="mr-6">
                <Link
                  to="/profile"
                  className="text-gray-800 font-medium hover:text-pink-500"
                >
                  Profile
                </Link>
              </div>
            )}

            <div className="relative">
              <button
                className="flex items-center text-gray-800 font-medium focus:outline-none hover:text-pink-500"
                onClick={toggleMenu}
              >
                <span className="mr-2">Menu</span>
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-10">
                  <div className="py-1">
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-gray-800 font-medium hover:text-pink-500"
                    >
                      Login
                    </Link>
                    <Link
                      to="/createAccount"
                      className="block px-4 py-2 text-gray-800 font-medium hover:text-pink-500"
                    >
                      Sign Up
                    </Link>
                    {auth && (
                      <button
                        onClick={handleLogout}
                        className="w-full text-left block px-4 py-2 text-gray-800 font-medium hover:text-pink-500"
                      >
                        Log out
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
