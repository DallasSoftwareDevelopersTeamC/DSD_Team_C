import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { faBox, faGear, faBagShopping, faMagnifyingGlass, faCircleXmark, faFile, faSquarePlus, faCloudArrowUp, faHamburger, faFileLines, faXmarksLines, faBars } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import AppRouterContent from './AppRouterContent'
// import { fab } from '@fortawesome/free-brands-svg-icons' this is if we decide to use any branded icons

library.add(faBox, faGear, faBagShopping, faMagnifyingGlass, faCircleXmark, faFile, faSquarePlus, faCloudArrowUp);


const App = () => {

  return (
    <>
      <Router>
        <div className="App">
          <div>
            <AppRouterContent />
          </div>
        </div>
      </Router>
    </>
  );
};

export default App;
