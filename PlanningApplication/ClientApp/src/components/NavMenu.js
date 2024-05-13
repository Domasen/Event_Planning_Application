import React, { useState } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink as RSNavLink } from 'reactstrap';
import { Searchbar } from './Searchbar';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import logo from './logo.jpg';

export const NavMenu = () => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleNavbar = () => setCollapsed(!collapsed);

    return (
        <header>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
                <NavbarBrand tag={Link} to="/">
                    <img
                        src={logo} 
                        alt="Logo"
                        style={{ width: '40px', height: '40px', marginRight: '10px' }}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/40"; // Fallback to a placeholder image
                        }}
                    />
                   Cherry On Top
                </NavbarBrand>
                <NavbarToggler onClick={toggleNavbar} className="mr-2" />
                <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
                    <ul className="navbar-nav flex-grow">
                        <NavItem>
                            <Searchbar />
                        </NavItem>
                        <NavItem>
                            <RSNavLink tag={Link} className="text-dark" to="/">Find Events</RSNavLink>
                        </NavItem>
                        <NavItem>
                            <RSNavLink tag={Link} className="text-dark" to="/createEvent">Create Event</RSNavLink>
                        </NavItem>
                        <NavItem>
                            <RSNavLink tag={Link} className="text-dark" to="/">Help Center</RSNavLink>
                        </NavItem>
                        <NavItem>
                            <RSNavLink tag={Link} className="text-dark" to="/login">Log In</RSNavLink>
                        </NavItem>
                        <NavItem>
                            <RSNavLink tag={Link} className="text-dark" to="/signup">Sign up</RSNavLink>
                        </NavItem>
                    </ul>
                </Collapse>
            </Navbar>
        </header>
    );
};
