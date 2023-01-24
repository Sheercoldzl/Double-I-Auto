import { NavLink } from 'react-router-dom';

function Nav() {
  return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
          <img src="https://thumbs.dreamstime.com/b/car-sale-benz-dealership-showroom-64985773.jpg" alt="" width="60" height="48"></img>
          </NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="@" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">Inventory</a>
                <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                  <li><NavLink className="dropdown-item bg-secondary"  aria-current="page" to="/manufacturers/list">Manufacturers</NavLink></li>
                  <li><NavLink className="dropdown-item bg-secondary"  aria-current="page" to="/manufacturers/create">Add a manufacturer</NavLink></li>
                  <li><NavLink className="dropdown-item bg-secondary"  aria-current="page" to="/models/create/">Add a Model</NavLink></li>
                  <li><NavLink className="dropdown-item bg-secondary"  aria-current="page" to="/inventory/list">Inventory</NavLink></li>
                  <li><NavLink className="dropdown-item bg-secondary"  aria-current="page" to="/inventory/create">Add an Automobile</NavLink></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="@" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">Models</a>
                <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                  <li><NavLink className="dropdown-item bg-secondary"  aria-current="page" to="/models/list">All Models</NavLink></li>
                  <li><NavLink className="dropdown-item bg-secondary"  aria-current="page" to="/models/Mercedes-Benz">Mercedes-Benz</NavLink></li>
                  <li><NavLink className="dropdown-item bg-secondary"  aria-current="page" to="/models/BMW">BMW</NavLink></li>
                  <li><NavLink className="dropdown-item bg-secondary"  aria-current="page" to="/models/Audi">Audi</NavLink></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="@" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">Sales</a>
                <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                  <li><NavLink className="dropdown-item bg-secondary"  aria-current="page" to="/sales/history/">Sales history</NavLink></li>
                  <li><NavLink className="dropdown-item bg-secondary"  aria-current="page" to="/customers/create">Add a Customer</NavLink></li>
                  <li><NavLink className="dropdown-item bg-secondary"  aria-current="page" to="/sales/create">Add a Sale</NavLink></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="@" role="button" aria-expanded="false">Service</a>
                <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                  <li><NavLink className="dropdown-item bg-secondary"  aria-current="page" to="/appointments/list">Appointment List</NavLink></li>
                  <li><NavLink className="dropdown-item bg-secondary"  aria-current="page" to="/appointments/history">Appointment History</NavLink></li>
                  <li><NavLink className="dropdown-item bg-secondary"  aria-current="page" to="/appointments/create">Add an Appointment</NavLink></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="@" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">Employees</a>
                <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                  <li><NavLink className="dropdown-item bg-secondary"  aria-current="page" to="/employee/list">All Employees</NavLink></li>
                  <li><NavLink className="dropdown-item bg-secondary"  aria-current="page" to="/employee/salesperson">Add Salesperson</NavLink></li>
                  <li><NavLink className="dropdown-item bg-secondary"  aria-current="page" to="/employee/technician">Add Technician</NavLink></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
  )
}

export default Nav;
