import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import Users from './Components/Users';
import Groups from './Components/Groups';
import UserDetail from './Components/UserDetail';
import GroupDetail from './Components/GroupDetail';
import { Collapse, Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

const routing = (
    <Router>
        <div>
            <Navbar color="light" light expand="md">
            <NavbarBrand href="/">User Management System</NavbarBrand>
            <Collapse  navbar>
                <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink href="/users">Users</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/groups">Groups</NavLink>
                </NavItem>              
                </Nav>
            </Collapse>
            </Navbar>
        </div>
        <Route exact path="/" component={App} />
        <Route exact path="/users" component={Users} />
        <Route exact path="/users/:id" component={UserDetail} />
        <Route exact path="/groups" component={Groups} />
        <Route exact path="/groups/:id" component={GroupDetail} />
    </Router>
  )

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
