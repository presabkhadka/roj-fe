import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ProfilePage from "./pages/view/Profile";
import Jobs from "./pages/view/Jobs";
import RojgarLanding from "./pages/view/Landing";
import QueryPage from "./pages/view/Queries";

function App() {

  return (
    <>
      <RouterProvider
        router={createBrowserRouter([
          { path: '/', element: <RojgarLanding /> },
          { path: '/login', element: <Login /> },
          { path: '/signup', element: <Signup /> },
          { path: '/user/home', element: <Jobs /> },
          { path: '/user/profile', element: <ProfilePage /> },
          { path: '/user/query', element: <QueryPage /> },

        ])}
      >
      </RouterProvider>
    </>
  )
}

export default App
