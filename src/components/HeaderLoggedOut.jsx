import { Link } from "react-router-dom"


function HeaderLoggedOut() {
    return (
      <div className="layout__header">
      <div className="dashboard-header">
        <div className="wrapper">
        <Link className="hover:tw-animate-bounce" to="/landing">
          <div className="dashboard-header__logo">
            <div className="logo" title="UptimeEngineer"></div>
          </div>
          </Link>
          
          
        </div>
      </div>
    </div>
    )
  }
  
  export default HeaderLoggedOut