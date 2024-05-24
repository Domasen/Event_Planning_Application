import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup"
import { CreateEvent } from "./pages/CreateEvent"
import { EventCosts } from "./pages/EventCosts"
import { Category } from "./pages/Category";
import {SearchResults } from "./pages/SearchResults"
import Profile from './pages/Profile';

const AppRoutes = [
    {
    index: true,
    element: <Home/>
    },
    {
        path: '/login',
        element: <Login/>

    },
    {
    path: '/signup',
    element: <Signup />

    },
    {
    path: '/createEvent',
    element: <CreateEvent />

    },
    {
    path: '/eventCosts',
    element: <EventCosts />
    },
    //{
    //    path: 'category/:id',
    //    element: <Category />
    //},
    {
        path: 'category',
        element: <Category />
    }, 
    {
        path: 'searchResults',
        element: <SearchResults />
    }
  },
  {
    path: '/profile',
    element: <Profile/>

  }
];

export default AppRoutes;
