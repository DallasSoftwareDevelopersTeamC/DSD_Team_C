import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

function Footer(){
    return (
        <div className='footer-container'>
            <p>&copy;Orderly 2023. All Rights Reserved.</p>
            <ul className='footer-links'>
                <li><Link to='/' href="#" className='footer-li-a'>Inventory</Link></li>
                <li><Link to='/orders' className='footer-li-a'>Orders</Link></li>
                <li><Link to='/settings' className='footer-li-a'>Settings</Link></li>
            </ul>
    </div>
    )
}

export default Footer