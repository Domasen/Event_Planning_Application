import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup"

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

  }
];

export default AppRoutes;
