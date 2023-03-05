import React from 'react'
import './headerFooter.css'

function Header(){
    return (
        <div className='header-nav'>
            <nav>
                <a href="#"><img src="./src/assets/logo.png" alt="logo" className='logo'/></a>
                <ul className='nav-links'>
                    <li><a href="/" className='header-li-a'>Inventory</a></li>
                    <li><a href="/Orders" className='header-li-a'>Orders</a></li>
                    <li><a href="/Settings" className='header-li-a'>Settings</a></li>
                </ul>
            </nav>
        </div>
    )
}

export default Header