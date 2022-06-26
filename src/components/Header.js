import { Link, Navigate, useNavigate } from 'react-router-dom';

const Header = () => {
  const path = window.location.pathname;
  const navigate = useNavigate();


  const CustomLink = ({href, children, ...props}) => {
    return (
      <Link to={href} {...props} className={path === href ? "active nav-link" : "nav-link"}>{children}</Link>
    )
  }

  const logout = () => {
    navigate('/logout');
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
      <Link to={"/"} className="nav-link"><img src="pics/logo-nobg100.png" alt="Reko-ring logo"/></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
            <CustomLink href="/home">Hem</CustomLink>
            </li>
            <li className="nav-item">
              <Link to={"/myOrders"} className="nav-link">Mina Orders</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                Producent
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><Link to={"/profile"} className="dropdown-item">Profil</Link></li>
                <li><Link to={"/create"} className="dropdown-item">Skapa artikel</Link></li>
                <li><Link to={"/farmOrders"} className="dropdown-item">Beställningar</Link></li>
              </ul>
            </li>
          </ul>
          <button type="button" className="btn btn-primary" id="logoutBtn" onClick={logout}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-facebook mb-1" viewBox="0 0 16 16">
              <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z">
              </path>
            </svg>
            Logga ut
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Header