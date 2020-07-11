import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { NavBar, Footer } from "./index";

const Experts = React.lazy(() => import("./experts/Experts"));
const Profile = React.lazy(() => import("./experts/Profile"));
const BookForm = React.lazy(() => import("./experts/BookForm"));
const NotFound = React.lazy(() => import("./partials/NotFound"));

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
                    <Switch>
                        <Redirect exact from="/" to="/experts" />
                        <Suspense
                            fallback={
                                <div className="mx-auto mt-16 loading"></div>
                            }
                        >
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
                        </Suspense>
                        <Suspense>
                            <Route component={NotFound} />
                        </Suspense>
                    </Switch>
                </div>
                <Footer />
            </Router>
        </GlobalProvider>
    );
}

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
