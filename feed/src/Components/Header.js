import React, {Component} from 'react';
import './css/Header.css';
import logo from '../Feed2.png'

class Header extends Component {
    render() {
        return (
            <div className="Header">
                <nav className="navbar1 navbar-expand-lg navbar-light bg-faded">
                    <a className="navbar-brand">
                        <img src={logo} width="50" height="30"
                             className="d-inline-block align-top" alt=""/>
                    </a>
                    <div className="collapse1 navbar1-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link1">Feed</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Header;