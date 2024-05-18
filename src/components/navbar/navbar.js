/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'

const navbar = () => {
    return (
        <div className='navbar_container'>
            <div className='navbar'>
                <div className='logo'>
                    <Link to={'/'}><img src={"https://movix-taupe.vercel.app/assets/movix-logo-d720c325.svg"}></img></Link>
                </div>
                <div className='bar'>
                    <ul>
                        <li></li>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/series'>Series</Link></li>

                        <li><Link to='/movie/popular'>Popular</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default navbar;