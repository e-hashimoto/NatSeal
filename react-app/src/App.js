import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  NavLink,
  Redirect,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import * as sessionActions from "./store/session";
import Home from "./components/Home";
import Locations from "./components/Locations";
import SingleLocation from "./components/SingleLocation";
import Travels from "./components/Travels";
import SingleTravel from "./components/SingleTravel";
// import Arti

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(sessionActions.authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/home" exact={true}>
          <Home />
        </ProtectedRoute>
        <ProtectedRoute path="/locations" exact={true}>
          <Locations />
        </ProtectedRoute>
        <ProtectedRoute path="/locations/:id" exact={true}>
          <SingleLocation />
        </ProtectedRoute>
        <ProtectedRoute path="/travels" exact={true}>
          <Travels />
        </ProtectedRoute>
        <ProtectedRoute path="/travels/:id" exact={true}>
          <SingleTravel />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
