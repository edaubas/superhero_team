import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => (
    <nav className='navbar sticky-top navbar-expand-lg navbar-dark bg-dark justify-content-center'>
        <Link className='nav-link active p-3 border-end border-secondary link-success'  to="/addHero">Add Hero</Link>
        <Link className='nav-link p-3 border-start border-secondary link-danger' to="/team">Team</Link>
    </nav>
);

export default NavBar;