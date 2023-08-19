import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreativeCommons } from '@fortawesome/free-brands-svg-icons';

import React from 'react';

function Footer() {
  return (
    <footer className="flex items-center gap-1 mt-4">
        <a
          rel="license"
          href="http://creativecommons.org/licenses/by-nc/4.0/"
        >
          <FontAwesomeIcon icon={faCreativeCommons} className='text-lg' />
        </a>
    
      <span className='text-sm'>Orderly 2023. Created by Clay Breland & Joshua Ow</span>
    </footer>
  );
}

export default Footer;
