import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup"
import { CreateEvent } from "./pages/CreateEvent"
import { EventCosts } from "./pages/EventCosts"
import { Category } from "./pages/Category";
import {SearchResults } from "./pages/SearchResults"
import {RegisterEmployee } from "./pages/RegisterEmployee"
import {WorkList} from "./pages/WorkList"
import Profile from './pages/Profile';
import EventList from './components/EventList';
import EventDetail from './components/EventDetail';


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
    {
        path: 'category/:categoryName',
        element: <Category />
    },
    {
        path: '/searchResults',
        element: <SearchResults />
    },
    {
        path: '/profile',
        element: <Profile/>
    
    },
    {
        path: '/registerEmployee',
        element: <RegisterEmployee/>

    },
    {
        path: '/workList',
        element: <WorkList/>

    },
    {
        path: '/',
        element: <EventList />
    },
    {
        path: '/event/:id',
        element: <EventDetail />
    }

];

export default AppRoutes;
