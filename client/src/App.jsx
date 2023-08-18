import React, { useState, useContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  InventoryProvider,
  InventoryContext,
} from './contexts/inventory.context';
import { AuthProvider } from "./contexts/auth.context";
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
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import AppRouterContent from "./AppRouterContent";
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


const App = () => {
  const { userData, userSettings } = useContext(InventoryContext);

  return (
    <>
      <Router>
        <div className="bg-zinc-300 h-screen ">
          <div>
            <AuthProvider>
              <InventoryProvider>
                  <AppRouterContent />
              </InventoryProvider>
            </AuthProvider>
          </div>
        </div>
      </Router>
    </>
  );
};

export default App;
