import React, { useState, useContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { PinningProvider } from './contexts/pinning.context';
import { InventoryProvider, InventoryContext } from './contexts/inventory.context';
import {
  faBox,
  faGear,
  faBagShopping,
  faMagnifyingGlass,
  faCircleXmark,
  faFile,
  faSquarePlus,
  faCloudArrowUp,
  faHamburger,
  faFileLines,
  faXmarksLines,
  faBars,
} from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import AppRouterContent from './AppRouterContent';
// import { fab } from '@fortawesome/free-brands-svg-icons' this is if we decide to use any branded icons

library.add(
  faBox,
  faGear,
  faBagShopping,
  faMagnifyingGlass,
  faCircleXmark,
  faFile,
  faSquarePlus,
  faCloudArrowUp
);

import Sidebar from 'react-sidebar';
// import './components/sidebar.css'; // Or your custom CSS file
import SidebarContent from './components/Sidebar/SidebarContent';

const App = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const sidebarStyles = {
    background: 'var(--dark-grey)',
    position: 'fixed',
    width: sidebarCollapsed ? '45px' : '185px',
    transition: 'width .3s ease-in-out',
  };

  const sidebarContent = (
    <div>
      <SidebarContent onToggle={toggleSidebar} collapsed={sidebarCollapsed} />
    </div>
  );

  const { userData, userSettings } = useContext(InventoryContext);

  return (
    <>
      <Router>
        <div className="App">
          <Sidebar
            sidebar={sidebarContent}
            open={true}
            onSetOpen={() => { }}
            docked={true}
            styles={{ sidebar: sidebarStyles }}
            pullRight={false}
          >
            <div>
              <InventoryProvider>
                <PinningProvider userData={userData} userSettings={userSettings}>
                  <AppRouterContent />
                </PinningProvider>
              </InventoryProvider>
            </div>
          </Sidebar>
        </div >
      </Router >
    </>
  );
};

export default App;
