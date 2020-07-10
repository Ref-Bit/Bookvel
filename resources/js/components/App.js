import React from "react";
import ReactDOM from "react-dom";
import { NavBar, Footer, Experts, Profile, BookForm } from "./index";
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
                        <Route exact path="/experts" component={Experts} />
                        <Route exact path="/experts/:id" component={Profile} />
                        <Route excat path="/book" component={BookForm} />
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
