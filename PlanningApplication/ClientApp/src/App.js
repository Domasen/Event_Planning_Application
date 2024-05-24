import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import {Layout} from './containers/Layout';
import { UserProvider } from './context/UserContext.js'; // Import UserProvider
import './custom.css';

const App = () => {
    return (
        <UserProvider>
            <Layout>
                <Routes>
                    {AppRoutes.map((route, index) => {
                        const { element, ...rest } = route;
                        return <Route key={index} {...rest} element={element} />;
                    })}
                    
                </Routes>
            </Layout>
        </UserProvider>
    );
};

export default App;
