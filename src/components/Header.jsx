import { Link } from "react-router-dom"

function Header() {

  const logout = () => {
    // Remove token and type from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    // Navigate to '/'
    window.location.href = '/login'; // Redirect to the home page
  };

  return (
    <div className="layout__header">
    <div className="dashboard-header">
      <div className="wrapper">
        <div className="dashboard-header__logo">
          <div className="logo" title="UptimeEngineer"></div>
        </div>
        <nav className="dashboard-nav">
          <Link className="dashboard-nav__item dashboard-nav__item--dashboard" to="/">Dashboard</Link>
          <Link className="dashboard-nav__item dashboard-nav__item--settings" to="/settings">My Settings</Link>
        <button onClick={logout} className="dashboard-nav__item dashboard-nav__item--logout" href="#">Logout</button>
        </nav>
        <div className="dashboard-header__mobile-menu-opener">
          <div className="mobile-menu-opener">
            <button className="hamburger hamburger--3dxy"><span className="hamburger-box"><span className="hamburger-inner"></span></span></button>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Header