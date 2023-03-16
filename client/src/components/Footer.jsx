import React from 'react'
import './Header/headerfooter.css'

function Footer(){
    return (
        <div className='footer-nav'>
        <footer>
            <p>&copy;Orderly 2023. All Rights Reserved.</p>
            <ul className='footer-links'>
                <li><a href="#" className='footer-li-a'>Inventory</a></li>
                <li><a href="#" className='footer-li-a'>Orders</a></li>
                <li><a href="#" className='footer-li-a'>Settings</a></li>
            </ul>
        </footer>
    </div>
    )
}

export default Footer