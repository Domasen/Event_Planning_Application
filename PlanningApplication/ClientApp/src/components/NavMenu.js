import React, { useState } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Searchbar } from './Searchbar'
import { Link } from 'react-router-dom';
import './NavMenu.css';

export const NavMenu = () => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleNavbar = () => setCollapsed(!collapsed);

    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
          <NavbarBrand tag={Link} to="/">PlanningApplication</NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} className="mr-2" />
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
                    <ul className="navbar-nav flex-grow">
            <NavItem>
                <Searchbar/>
            </NavItem>
              <NavItem>     
                <NavLink tag={Link} className="text-dark" to="/">Find Events</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/">Create Event</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/">Help Center</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/login">Log In</NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} className="text-dark" to="/signup">Sign up</NavLink>
            </NavItem>
            </ul>
          </Collapse>
        </Navbar>
      </header>
    );
  }
