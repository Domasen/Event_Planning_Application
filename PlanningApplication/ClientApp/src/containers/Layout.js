import React from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from '../components/NavMenu';

export const Layout = ({ children }) => {
    return (
        <div>
            <NavMenu />
            <Container>
                {children}
            </Container>
        </div>
    );
};