import React, { useContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { InventoryContext } from './contexts/inventory.context';
import { useTempInStock } from './hooks/useTempStock';
import { faBox, faGear, faBagShopping, faMagnifyingGlass, faCircleXmark, faFile, faSquarePlus, faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import AppRouterContent from './AppRouterContent'
// import { fab } from '@fortawesome/free-brands-svg-icons' this is if we decide to use any branded icons

library.add(faBox, faGear, faBagShopping, faMagnifyingGlass, faCircleXmark, faFile, faSquarePlus, faCloudArrowUp);

function App() {


  return (
    <>
      <Router>
        <AppRouterContent />
      </Router>
    </>
  );
}

export default App;
