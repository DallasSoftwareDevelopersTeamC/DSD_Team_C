import React from 'react';
import InventoryFilterRow from './InventoryFilSeaAdd';
import InventoryItems from './InventoryItems';

function InventoryContent() {
  return (
    <div>
      <InventoryFilterRow />
      <InventoryItems />
    </div>
  );
}

export default InventoryContent;
