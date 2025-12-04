import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AuthContext } from "../provider/AuthProvider";
import logo from "../assets/img/9562348.jpg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Logged out successfully!", { position: "top-center", autoClose: 2000 });
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Logout failed!", { position: "top-center", autoClose: 2000 });
      });
  };

  const navLinkClasses = ({ isActive }) =>
    isActive
      ? "text-[#D72050] font-bold"
      : "text-gray-800 hover:text-[#D72050] transition-colors";

  return (
    <div className="bg-slate-100 border-b border-b-slate-300 py-2 sticky top-0 z-50 shadow-md">
      <div className="w-11/12 mx-auto flex items-center justify-between">

        {/* Logo */}
        <figure>
          <img src={logo} className="w-[55px] rounded" alt="Logo" />
        </figure>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 font-medium">
          <ul className="flex items-center gap-6">
            <li>
              <NavLink to="/" className={navLinkClasses}>Home</NavLink>
            </li>
            <li>
              <NavLink to="/allgames" className={navLinkClasses}>All Games</NavLink>
            </li>

            {/* Profile only when logged in */}
            {user && (
              <li>
                <NavLink to="/profile" className={navLinkClasses}>Profile</NavLink>
              </li>
            )}
          </ul>

          <div className="flex items-center gap-3">
            {!user ? (
              <NavLink
                to="/auth/registration"
                className="bg-[#D72050] hover:bg-[#b60534] text-white px-4 py-2 rounded-md font-semibold"
              >
                Registration
              </NavLink>
            ) : (
              <>
                <img
                  src={user.photoURL || logo}
                  alt={user.displayName || "User"}
                  className="w-10 h-10 rounded-full border border-gray-300 cursor-pointer"
                  title={user.displayName}
                  onClick={() => navigate("/profile")}
                />
                <button
                  onClick={handleLogOut}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-semibold"
                >
                  Log Out
                </button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-purple-600">
          {menuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-slate-200 py-4">
          <ul className="flex flex-col items-center gap-4 font-medium">
            <li>
              <NavLink to="/" onClick={() => setMenuOpen(false)} className={navLinkClasses}>Home</NavLink>
            </li>

            {user && (
              <li>
                <NavLink to="/profile" onClick={() => setMenuOpen(false)} className={navLinkClasses}>Profile</NavLink>
              </li>
            )}

            {!user ? (
              <li>
                <NavLink
                  to="/auth/registration"
                  onClick={() => setMenuOpen(false)}
                  className="bg-[#D72050] text-white px-4 py-2 rounded-md"
                >
                  Registration
                </NavLink>
              </li>
            ) : (
              <li className="flex items-center gap-2">
                <img
                  src={user.photoURL || logo}
                  alt={user.displayName || "User"}
                  className="w-10 h-10 rounded-full border border-gray-300 cursor-pointer"
                  onClick={() => { navigate("/profile"); setMenuOpen(false); }}
                />
                <button
                  onClick={() => { handleLogOut(); setMenuOpen(false); }}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                >
                  Log Out
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
