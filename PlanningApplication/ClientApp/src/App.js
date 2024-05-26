import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import {Layout} from './containers/Layout';
import { EventProvider } from './context/EventContext';
import EventDetail from './components/EventDetail';
import { UserProvider } from './context/UserContext.js'; // Import UserProvider
import EventCosts from './components/EventCosts'
import './custom.css';

const App = () => {
    return (
        <UserProvider>
            <EventProvider>
                {/*<EventDetail />*/}
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
