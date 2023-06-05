import { NavigationBar } from "./NavigationBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { DataQuery } from "./pages/DataQuery";
import { Login } from "./pages/LogIn";
import { QueryHistory } from "./pages/QueryHistory";
import { Signup } from "./pages/SignUp";
import { DataReport } from "./pages/DataReport";
import { DataTubeLogo } from "./Titles";

function App() {
    
    const home_button: [string, string, string] = ["home-button", "Home", "/"];
    const login_button: [string, string, string] = ["login-button", "Log In", "/login"];
    const signup_button: [string, string, string] = ["signup-button", "Sign Up", "/signup"];
    const query_button: [string, string, string] = ["query-button", "Data Querying", "/query"];
    const history_button: [string, string, string] = ["history-button", "Query History", "/history"]
    const report_button: [string, string, string] = ["report-button", "Data Report", "/report"]

    const buttons: Array<[string, string, string]> = [home_button, login_button, signup_button, query_button, history_button, report_button]

    return (
        <BrowserRouter>

            <DataTubeLogo />
            <NavigationBar bar_id="nav-bar" buttons={buttons}/>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/query" element={<DataQuery />} />
                <Route path="/history" element={<QueryHistory />} />
                <Route path="/report" element={<DataReport />} />
            </Routes>

        </BrowserRouter>
    );
}

export default App;