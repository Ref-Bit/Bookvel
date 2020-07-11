import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { NavBar, Footer } from "./index";

const Experts = lazy(() => import("./experts/Experts"));
const Profile = lazy(() => import("./experts/Profile"));
const BookForm = lazy(() => import("./experts/BookForm"));
const NotFound = lazy(() => import("./partials/NotFound"));

import { GlobalProvider } from "../context/Global";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

export default function App() {
    return (
        <GlobalProvider>
            <Router>
                <NavBar />
                <div className="container relative min-h-screen mx-auto">
                    <Suspense
                        fallback={<div className="mx-auto mt-16 loading"></div>}
                    >
                        <Switch>
                            <Redirect exact from="/" to="/experts" />
                            <Route exact path="/experts" component={Experts} />
                            <Route
                                exact
                                path="/experts/:id"
                                component={Profile}
                            />
                            <Route
                                excat
                                path="/book/:id"
                                component={BookForm}
                            />
                            <Route component={NotFound} />
                        </Switch>
                    </Suspense>
                </div>
                <Footer />
            </Router>
        </GlobalProvider>
    );
}

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
