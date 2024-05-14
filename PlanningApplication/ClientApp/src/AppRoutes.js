import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup"
import { CreateEvent } from "./pages/CreateEvent"

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

  }
];

export default AppRoutes;
