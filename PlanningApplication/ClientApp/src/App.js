import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import {Layout} from './containers/Layout';
import './custom.css';

const App = () => {
    return (
        <Layout>
            <Routes>
                {AppRoutes.map((route, index) => {
                    const { element, ...rest } = route;
                    return <Route key={index} {...rest} element={element} />;
                })}
            </Routes>
        </Layout>
    );
};

export default App;
