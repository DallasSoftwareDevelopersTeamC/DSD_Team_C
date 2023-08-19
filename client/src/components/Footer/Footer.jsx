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
          <FontAwesomeIcon icon={faCreativeCommons} className='text-lg text-black/60' />
        </a>
    
      <span className='text-sm text-black/60'>Orderly 2023. Created by Clay Breland & Joshua Ow</span>
    </footer>
  );
}

export default Footer;
