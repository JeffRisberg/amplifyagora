import React from "react";
import {Menu as Nav} from "element-react";
import {NavLink} from "react-router-dom";

const Navbar = () => (
    <Nav mode="horizontal" theme="dark" defaultActive="1">
        dfdf
        <div className="nav-container">
            ghgh
            {/* App Title / Icon */}
            <Nav.Item index="1">
                <NavLink to="/" className="nav-link">
                    <span className="app-title">
                        <img src="https://icon.now.sh/account_balance/f90" alt="App Icon"
                        className="app-icon"/>
                        Amplify Agora
                    </span>
                </NavLink>
            </Nav.Item>
        </div>
    </Nav>
);

export default Navbar;
