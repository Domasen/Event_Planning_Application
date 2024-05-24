import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import {Layout} from './containers/Layout';
import { EventProvider } from './context/EventContext';
import { UserProvider } from './context/UserContext.js'; // Import UserProvider
import './custom.css';

const App = () => {
    return (
        <UserProvider>
            <EventProvider>
                <Layout>
                    <Routes>
                        {AppRoutes.map((route, index) => {
                            const { element, ...rest } = route;
                            return <Route key={index} {...rest} element={element} />;
                        })}
                    </Routes>
                </Layout>
            </EventProvider>
        </UserProvider>
    );
};

export default App;
