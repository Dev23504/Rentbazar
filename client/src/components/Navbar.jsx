import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Search,
  User,
  LogOut,
  Package,
  ShieldCheck,
} from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const profileRef = useRef(null);

  const loadUser = () => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (token && savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Invalid user data:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    loadUser();

    window.addEventListener("authChanged", loadUser);
    window.addEventListener("storage", loadUser);

    return () => {
      window.removeEventListener("authChanged", loadUser);
      window.removeEventListener("storage", loadUser);
    };
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setIsProfileOpen(false);
    setIsOpen(false);

    window.dispatchEvent(new Event("authChanged"));

    navigate("/login", { replace: true });
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const value = searchValue.trim();

    if (value) {
      navigate(`/rentals?search=${encodeURIComponent(value)}`);
    } else {
      navigate("/rentals");
    }

    setIsOpen(false);
  };

  const closeMobile = () => {
    setIsOpen(false);
    setIsProfileOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            onClick={closeMobile}
            className="text-3xl font-extrabold text-green-600 tracking-wide"
          >
            RentBazar
          </Link>

          <form
            onSubmit={handleSearch}
            className="hidden lg:flex items-center bg-gray-100 rounded-full px-4 py-2 w-96"
          >
            <Search size={18} className="text-gray-500" />

            <input
              type="text"
              placeholder="Search products..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="bg-transparent outline-none ml-2 w-full"
            />
          </form>

          <div className="hidden md:flex items-center gap-7 font-medium">
            <Link
              to="/"
              className="hover:text-green-600 transition"
            >
              Home
            </Link>

            <Link
              to="/rentals"
              className="hover:text-green-600 transition"
            >
              Rentals
            </Link>

            <Link
              to="/categories"
              className="hover:text-green-600 transition"
            >
              Categories
            </Link>

            <Link
              to="/about"
              className="hover:text-green-600 transition"
            >
              About
            </Link>

            <Link
              to="/contact"
              className="hover:text-green-600 transition"
            >
              Contact
            </Link>

            <Link
              to="/add-product"
              className="bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700 transition"
            >
              List Item
            </Link>

            {user ? (
              <div
                className="relative"
                ref={profileRef}
              >
                <button
                  type="button"
                  onClick={() =>
                    setIsProfileOpen((prev) => !prev)
                  }
                  className="flex items-center gap-2 focus:outline-none"
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name || "User"}
                      className="w-9 h-9 rounded-full object-cover border-2 border-green-600"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-green-100 text-green-700 font-bold flex items-center justify-center border-2 border-green-600">
                      {user.name
                        ? user.name.charAt(0).toUpperCase()
                        : "U"}
                    </div>
                  )}
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-60 bg-white rounded-xl shadow-xl border overflow-hidden">
                    <div className="px-4 py-3 border-b bg-gray-50">
                      <p className="font-semibold text-gray-800">
                        {user.name || "User"}
                      </p>

                      <p className="text-xs text-gray-500 truncate">
                        {user.email || ""}
                      </p>

                      {user.role === "admin" && (
                        <span className="inline-block mt-1 text-xs font-semibold text-green-600">
                          Administrator
                        </span>
                      )}
                    </div>

                    <Link
                      to="/profile"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-green-50 hover:text-green-600 transition"
                    >
                      <User size={17} />
                      Profile
                    </Link>

                    <Link
                      to="/my-bookings"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-green-50 hover:text-green-600 transition"
                    >
                      <Package size={17} />
                      My Bookings
                    </Link>

                    <Link
                      to="/my-listings"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-green-50 hover:text-green-600 transition"
                    >
                      <Package size={17} />
                      My Listings
                    </Link>

                    {user.role === "admin" && (
                      <Link
                        to="/admin"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-green-600 hover:bg-green-50 transition border-t"
                      >
                        <ShieldCheck size={17} />
                        Admin Dashboard
                      </Link>
                    )}

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition border-t text-left"
                    >
                      <LogOut size={17} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="border border-green-600 text-green-600 px-5 py-2 rounded-full hover:bg-green-600 hover:text-white transition font-medium"
              >
                Login
              </Link>
            )}
          </div>

          <button
            type="button"
            className="md:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-5 border-t space-y-4">
            <form
              onSubmit={handleSearch}
              className="flex items-center border rounded-lg px-4 py-2"
            >
              <Search size={18} className="text-gray-500" />

              <input
                type="text"
                placeholder="Search products..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full ml-2 outline-none"
              />
            </form>

            <Link
              to="/"
              onClick={closeMobile}
              className="block hover:text-green-600"
            >
              Home
            </Link>

            <Link
              to="/rentals"
              onClick={closeMobile}
              className="block hover:text-green-600"
            >
              Rentals
            </Link>

            <Link
              to="/categories"
              onClick={closeMobile}
              className="block hover:text-green-600"
            >
              Categories
            </Link>

            <Link
              to="/about"
              onClick={closeMobile}
              className="block hover:text-green-600"
            >
              About
            </Link>

            <Link
              to="/contact"
              onClick={closeMobile}
              className="block hover:text-green-600"
            >
              Contact
            </Link>

            <Link
              to="/add-product"
              onClick={closeMobile}
              className="block bg-green-600 text-white text-center py-2 rounded-lg"
            >
              List Your Item
            </Link>

            {user && (
              <div className="pt-3 border-t space-y-3">
                <div className="flex items-center gap-3 px-2">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name || "User"}
                      className="w-10 h-10 rounded-full object-cover border-2 border-green-600"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 font-bold flex items-center justify-center border-2 border-green-600">
                      {user.name
                        ? user.name.charAt(0).toUpperCase()
                        : "U"}
                    </div>
                  )}

                  <div>
                    <p className="font-semibold">
                      {user.name || "User"}
                    </p>

                    <p className="text-xs text-gray-500">
                      {user.email || ""}
                    </p>
                  </div>
                </div>

                <Link
                  to="/profile"
                  onClick={closeMobile}
                  className="block px-2 text-gray-700 hover:text-green-600"
                >
                  My Profile
                </Link>

                <Link
                  to="/my-bookings"
                  onClick={closeMobile}
                  className="block px-2 text-gray-700 hover:text-green-600"
                >
                  My Bookings
                </Link>

                <Link
                  to="/my-listings"
                  onClick={closeMobile}
                  className="block px-2 text-gray-700 hover:text-green-600"
                >
                  My Listings
                </Link>

                {user.role === "admin" && (
                  <Link
                    to="/admin"
                    onClick={closeMobile}
                    className="block px-2 text-green-600 font-semibold"
                  >
                    Admin Dashboard
                  </Link>
                )}

                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full text-left px-2 text-red-600 font-medium py-1"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;