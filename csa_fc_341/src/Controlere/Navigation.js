import React from "react";
import { NavLink } from "react-router-dom";
import './Navigation.css';
function Navigation() {
  return (
    <div>
     
    <div className="navigation ">
      <nav className="navbar navbar-expand  ">
        <div className="container">

          <div>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                  
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/tostadion">
                  Stadium
                </NavLink>
              </li>
              
            </ul>
          </div>
        </div>
      </nav>
    </div></div>
  );
}
export default Navigation;