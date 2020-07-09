import React from "react";
import ReactDOM from "react-dom";
import Experts from "./experts/Experts";
import Profile from "./experts/Profile";
import BookForm from "./experts/BookForm";
import NavBar from "./partials/NavBar";
import Footer from "./partials/Footer";
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
