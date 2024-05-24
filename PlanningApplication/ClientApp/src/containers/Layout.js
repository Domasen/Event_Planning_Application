import React from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from '../components/NavMenu';
import Footer from '../components/Footer';
import { useLocation } from 'react-router-dom';

export const Layout = ({ children }) => {
    const location = useLocation();
    const noFooterPaths = ['/login', '/signup']; // Paths where Footer should not be rendered

    return (
        <div>
            <NavMenu />
            <Container>
                {children}
            </Container>
            {!noFooterPaths.includes(location.pathname) && <Footer />}
        </div>
    );
};
