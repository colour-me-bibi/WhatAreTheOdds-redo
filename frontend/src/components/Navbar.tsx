import useAuth from "#/hooks/useAuth";
import { Link, NavLink, useNavigate } from "react-router-dom";
import getUser from "#/api/queries/getUser";

// import getUser from "#/api/queries/getUser";
// import useSignOut from "#/api/mutations/useSignOut";

const navbarLinks = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Markets",
    path: "/markets",
  },
  {
    name: "Leaderboards",
    path: "/leaderboards",
  },
  {
    name: "Profile",
    path: "/profile",
  },
  {
    name: "Dashboard",
    path: "/dashboard",
  },
];

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const { isLoggedIn, signOut } = useAuth();
  const user = getUser({ enabled: isLoggedIn });

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          What Are The Odds?
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {navbarLinks.map((link) => (
              <li key={link.name} className="nat-item">
                <NavLink to={link.path} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
          {/* if user, show their name and dropdown for more options like account, settings, and sign out */}
          {/* if not user, show sign in and sign up buttons */}
          {user.isSuccess ? (
            <div className="dropdown">
              <button
                className="btn btn-primary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Hello, {user.data.username}!
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <Link className="dropdown-item" to="/profile">
                  Profile
                </Link>
                <Link className="dropdown-item" to="/dashboard">
                  Dashboard
                </Link>
                <div className="dropdown-divider"></div>
                <button
                  className="dropdown-item"
                  onClick={() =>
                    signOut.mutate(undefined, {
                      onSuccess: () => navigate("/", { replace: true }),
                    })
                  }
                >
                  Sign out
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link className="btn btn-primary" to="/signIn">
                Sign In
              </Link>
              <div className="px-1" />
              <Link className="btn btn-primary" to="/signUp">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
