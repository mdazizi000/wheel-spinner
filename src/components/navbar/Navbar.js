import React from "react";
import { MenuItems } from "./MenuItems";
import "./Navbar.css";

class Navbar extends React.Component {
    state = {
        clicked: false
    };

    handleClick = () => {
        this.setState({
            clicked: !this.state.clicked
        });
    };

    render() {
        return (
            <nav className="navbarItems justify-content-end">

                <div className="menu-icon" onClick={this.handleClick}>
                    <i className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}
                    ></i>
                </div>
            </nav>
        );
    }
}

export default Navbar;