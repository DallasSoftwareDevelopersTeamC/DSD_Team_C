import React, { useContext, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { InventoryContext } from './contexts/inventory.context';
import { useTempInStock } from './hooks/useTempStock';
import { faBox, faGear, faBagShopping, faMagnifyingGlass, faCircleXmark, faFile, faSquarePlus, faCloudArrowUp, faHamburger, faFileLines, faXmarksLines, faBars } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import AppRouterContent from './AppRouterContent'
// import { fab } from '@fortawesome/free-brands-svg-icons' this is if we decide to use any branded icons

library.add(faBox, faGear, faBagShopping, faMagnifyingGlass, faCircleXmark, faFile, faSquarePlus, faCloudArrowUp);

import Sidebar from 'react-sidebar';
// import './components/sidebar.css'; // Or your custom CSS file
import SidebarContent from './components/SidebarContent';


const App = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const sidebarStyles = {
    background: 'var(--dark-grey)',
    position: 'fixed',
    width: sidebarOpen ? '200px' : '50px', // Set the width based on the sidebarOpen state
    transition: 'width 0.3s ease-in-out',
  };


  const sidebarContent = <div><SidebarContent onToggle={toggleSidebar}/>
  </div>;

  return (
    <>
      <div className="App">
      <Sidebar
          sidebar={sidebarContent}
          open={sidebarOpen || !sidebarOpen} // Always set the open prop to true
          onSetOpen={setSidebarOpen}
          docked={true} // Always dock the sidebar
          styles={{ sidebar: sidebarStyles }}
          pullRight={false}
      >
        <div>
        <Router>
        <AppRouterContent />
        </Router>
        </div>
        </Sidebar>
    </div>
    </>
  );
}

export default App;
