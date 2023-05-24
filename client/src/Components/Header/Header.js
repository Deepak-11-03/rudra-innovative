import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate()
  function Logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/");
  }
  return (
    <header
      as="nav"
      className=" h-13 p-5 pb-3 text-[#ffffff] bg-cyan-600 font-semibold"
    >
      <nav className="flex">
        <ul className=" ml-auto flex flex-row gap-4">
        <li><Link to='/'>Home</Link></li>
          {localStorage.getItem("token") ? (
            <>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li onClick={Logout}>
                <Link>Logout</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
