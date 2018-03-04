import React, {Component} from 'react';
import './css/Header.css';



class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Header">
                <nav className="navbar navbar-expand-lg navbar-light bg-faded">
                    {/* <a className="navbar-brand">
                        <img src={logo} width="50" height="30"
                             className="d-inline-block align-top" alt=""/>
                    </a> */}
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link">Feed</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Header;