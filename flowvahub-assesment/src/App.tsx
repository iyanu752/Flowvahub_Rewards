import './App.css'
import { ToastContainer } from 'react-toastify';
import { AuthModal } from './components/auth/authModal';
import { ProtectedRoute } from './components/protectedRoute';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Dashboard from './page/dashboard';
import { RewardsPage } from './page/rewardPage';
import { LockedPage } from './page/lockedPages';
import AuthCallback from './page/authcallback';

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthModal/>
  },
  {
    path: "/auth/v1/callback",
    element: <AuthCallback/>
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard/>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard/rewards" replace />
      },
      {
        path: "rewards",
        element: <RewardsPage />
      },
      {
        path: "home",
        element: <LockedPage pageName="Home" />
      },
      {
        path: "discover",
        element: <LockedPage pageName="Discover" />
      },
      {
        path: "library",
        element: <LockedPage pageName="Library" />
      },
      {
        path: "tech-stack",
        element: <LockedPage pageName="Tech Stack" />
      },
      {
        path: "subscriptions",
        element: <LockedPage pageName="Subscriptions" />
      },
      {
        path: "settings",
        element: <LockedPage pageName="Settings" />
      },
    ]
  }
])

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="light"
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        draggable={false} 
      />
      <RouterProvider router={router}/>
    </>
  )
}

export default App
