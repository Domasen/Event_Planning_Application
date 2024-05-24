import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup"
import { CreateEvent } from "./pages/CreateEvent"
import { EventCosts } from "./pages/EventCosts"
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
  {
    path: '/profile',
    element: <Profile/>

  }
];

export default AppRoutes;
