import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Experts from "./experts";
import Profile from "./experts/Profile";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function App() {
    const [experts, setExperts] = useState([]);

    useEffect(() => {
        axios
            .get("/api/experts")
            .then(({ data }) => {
                setExperts(data);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <Router>
            <div className="container">
                <Experts experts={experts} />
                <Switch>
                    <Route path="/experts/:id" component={Profile} />
                </Switch>
            </div>
        </Router>
    );
}

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
