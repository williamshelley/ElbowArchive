import React from "react";
import { ProtectedRoute } from "../util/route_util";
import NavBarContainer from "./navigation/nav_bar_container";
import MainContentContainer from "./session/main_content_container";

const App = () => {
    return (
        <div className="app">
            <ProtectedRoute path="/" component={NavBarContainer} />
            <MainContentContainer />
        </div>
    );
};

export default App;