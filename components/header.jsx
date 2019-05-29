import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap/lib';
import { Link } from 'react-router-dom';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {

        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav pullRight>
                        <NavItem componentClass={Link} href="/" to="/">Home</NavItem>
                        <NavItem componentClass={Link} href="/add" to="/add">Create Job</NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
export default Header;
