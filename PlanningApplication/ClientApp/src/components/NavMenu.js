import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {
    Collapse,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink as RSNavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Container
} from 'reactstrap';
import { Searchbar } from './Searchbar';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import logo from './logo.jpg';
import { UserContext } from '../context/UserContext.js'; // Import UserContext

export const NavMenu = () => {
    const [collapsed, setCollapsed] = useState(true);
    const { user, setUser } = useContext(UserContext); // Use UserContext

    const toggleNavbar = () => setCollapsed(!collapsed);

    const handleLogout = async () => {
        try {
            const response = await axios.post('/User/logout');
            if (response.status === 200) {
                setUser(null);
            }
        } catch (error) {
            console.error('There was an error logging out:', error);
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('/User/currentUser', {
                    headers: {
                        'Content-Type': 'text/plain',
                    },
                });
                if (response.status === 200) {
                    setUser(response.data);
                }
            } catch (error) {
                console.error('Failed to fetch user', error);
            }
        };

        fetchUser();
    }, [setUser]);

    return (
        <header>
            <Navbar color="light" light expand="md" className="border-bottom box-shadow mb-3">
                <Container className="d-flex justify-content-between">
                    <div className="d-flex align-items-center">
                        <NavbarBrand tag={Link} to="/" className="d-flex align-items-center">
                            <img
                                src={logo}
                                alt="Logo"
                                style={{ width: '40px', height: '40px', marginRight: '10px' }}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://via.placeholder.com/40";
                                }}
                            />
                            <span className="font-weight-bold">Cherry On Top</span>
                        </NavbarBrand>
                        <NavbarToggler onClick={toggleNavbar} />
                        <Collapse isOpen={!collapsed} navbar>
                            <ul className="navbar-nav">
                                <NavItem>
                                    <RSNavLink tag={Link} className="text-dark" to="/">Find Events</RSNavLink>
                                </NavItem>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret className="text-dark">
                                        Create Event
                                    </DropdownToggle>
                                    <DropdownMenu left>
                                        <DropdownItem tag={Link} to="/createEvent">Create New Event</DropdownItem>
                                        <DropdownItem tag={Link} to="/eventCosts">Event Costs</DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                                <NavItem>
                                    <RSNavLink tag={Link} className="text-dark" to="/">Help Center</RSNavLink>
                                </NavItem>
                                {user ? (
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav caret className="text-dark">
                                            {user.name}
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            <DropdownItem tag={Link} to="/profile">Profile</DropdownItem>
                                            <DropdownItem tag={Link} onClick={handleLogout} to="/">Logout</DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                ) : (
                                    <>
                                        <NavItem>
                                            <RSNavLink tag={Link} className="text-dark" to="/login">Log In</RSNavLink>
                                        </NavItem>
                                        <NavItem>
                                            <RSNavLink tag={Link} className="text-dark" to="/signup">Sign Up</RSNavLink>
                                        </NavItem>
                                    </>
                                )}
                            </ul>
                        </Collapse>
                    </div>
                    <Searchbar className="ml-auto" />
                </Container>
            </Navbar>
        </header>
    );
};
