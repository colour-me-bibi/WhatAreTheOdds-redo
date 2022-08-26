import Navbar from "#/components/Navbar";
import useAuth from "#/hooks/useAuth";
import CreateMarket from "#/pages/CreateMarket";
import Home from "#/pages/Home";
import MarketDetail from "#/pages/MarketDetail";
import MarketsList from "#/pages/MarketsList";
import Profile from "#/pages/Profile";
import SignIn from "#/pages/SignIn";
import SignOut from "#/pages/SignOut";
import SignUp from "#/pages/SignUp";
import { ReactElement } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";

/**
 * This function forces a redirect instead of rendering the given component based on a given condition.
 *
 * @param {boolean} condition - The condition to check.
 * @param {(ReactElement | null)} element - The component to render if the condition is true.
 * @param {string} redirectTo - The path to redirect to if the condition is true.
 * @return {*} The component to render if the condition is false.
 */
const guardedRoute = (condition: boolean, element: ReactElement | null, redirectTo: string): any => {
  return condition ? element : <Navigate to={redirectTo} replace />;
};

/**
 * This component is the application's main component.
 *
 * @return {} The App component.
 */
const App: React.FC = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/signIn" element={guardedRoute(!isLoggedIn, <SignIn />, "/")} />
        <Route path="/signUp" element={guardedRoute(!isLoggedIn, <SignUp />, "/")} />
        <Route path="/signOut" element={guardedRoute(isLoggedIn, <SignOut />, "/")} />

        <Route path="/profile" element={guardedRoute(isLoggedIn, <Profile />, "/signIn")} />

        <Route path="/markets" element={<MarketsList />} />
        <Route path="/markets/new" element={<CreateMarket />} />
        <Route path="/markets/:marketId" element={<MarketDetail />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="*" element={<div className="fw-bold fs-1">404, good luck...</div>} />
      </Routes>
    </Router>
  );
};

export default App;
