import React from "react";
import { NavLink } from "react-router-dom";
import './Navigation.scss';
function Navigation() {
  return (
    <div >
     
    <div className="navigation ">
      <nav className="navbar navbar-expand  ">
        <div className="container">

          <div>
            <ul className="navbar-nav ml-auto" class="menu">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                  
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/tostadion">
                  Stadioane
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/tomeci">
                  Meciuri
                  
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/tojucator">
                  Jucatori
                  
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/tostaff">
                  Staff
                  
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/tocontract">
                  Contracte
                  
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