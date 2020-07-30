import React from "react";
import { ProtectedRoute } from "../util/route_util";
import NavBarContainer from "./navigation/nav_bar_container";
import MaiContent from "./session/main_content";

const App = () => {
    return (
        <div className="app">
            <ProtectedRoute path="/" component={NavBarContainer} />
            <MaiContent />
        </div>
    );
};

export default App;