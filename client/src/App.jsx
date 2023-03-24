import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { faBox, faGear, faBagShopping, faMagnifyingGlass, faCircleXmark, faFile, faSquarePlus, faCloudArrowUp, faHamburger, faFileLines, faXmarksLines, faBars } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import AppRouterContent from './AppRouterContent'
// import { fab } from '@fortawesome/free-brands-svg-icons' this is if we decide to use any branded icons

library.add(faBox, faGear, faBagShopping, faMagnifyingGlass, faCircleXmark, faFile, faSquarePlus, faCloudArrowUp);


const App = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const sidebarStyles = {
    background: 'var(--dark-grey)',
    position: 'fixed',
    width: sidebarCollapsed ? '45px' : '200px',
    transition: 'width 0.3s ease-in-out',
  };

  const sidebarContent = (
    <div>
      <SidebarContent onToggle={toggleSidebar} collapsed={sidebarCollapsed} />
    </div>
  );

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
