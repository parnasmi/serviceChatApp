import React, { lazy, Suspense } from "react";
import { ToastProvider } from "react-toast-notifications";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import App from "App";

const FaqPage = lazy(() => import("pages/Faq"));
const ProfilePage = lazy(() => import("pages/Profile"));
const ServicesPage = lazy(() => import("pages/Services/Services"));
const ServicesDetailsPage = lazy(() => import("pages/ServicesDetails"));
const LoginPage = lazy(() => import("pages/Login"));
const RegisterPage = lazy(() => import("pages/Register"));
const HomePage = lazy(() => import("pages/Home"));
const ServicesCreate = lazy(() => import("pages/Services/Create"));
const UserServicesList = lazy(() => import("pages/Services/List"));

export default function(props) {
  return (
    <Router>
      <App>
        <ToastProvider>
          <Suspense fallback={<p>Loading</p>}>
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/profile" exact component={ProfilePage} />
              <Route path="/faq" exact component={FaqPage} />
              <Route path="/services/new" exact component={ServicesCreate} />
              <Route path="/services/me" exact component={UserServicesList} />
              <Route path="/services/:id" exact component={ServicesDetailsPage} />
              <Route path="/services" exact component={ServicesPage} />
              <Route path="/login" exact component={LoginPage} />
              <Route path="/register" exact component={RegisterPage} />
            </Switch>
          </Suspense>
        </ToastProvider>
      </App>
    </Router>
  );
}
