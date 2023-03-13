import exp from 'constants';
import { Droppable, Draggable } from 'react-beautiful-dnd';

function InventoryItemsContainer({ inventory }) {
  return (
    <Droppable droppableId="inventory-items">
      {(provided) => (
        <tbody className="inventory-items-container" {...provided.droppableProps} ref={provided.innerRef}>
          {Array.isArray(inventory) &&
            inventory.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <tr
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    <td>{item.sku}</td>
                    <td>{item.brand}</td>
                    <td className="item-name">{item.productName}</td>
                    <td className="item-description">
                      <div className="desc-text">{item.description}</div>
                    </td>
                    <td className="item-in-stock">
                      {tempInStock[item.id] || item.inStock}
                    </td>
                    <td>
                      <input
                        className="dynamic-inputs"
                        id="reorderAt"
                        type="text"
                        defaultValue={item.reorderAt}
                        onKeyDown={(event) =>
                          handleKeyDown(
                            event,
                            item.id,
                            'reorderAt',
                            event.target.value
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        className="dynamic-inputs"
                        id="orderQty"
                        type="text"
                        defaultValue={item.orderQty}
                        onKeyDown={(event) =>
                          handleKeyDown(
                            event,
                            item.id,
                            'orderQty',
                            event.target.value
                          )
                        }
                      />
                    </td>
                    <td>
                      <button
                        id="incoming"
                        onClick={(event) => handleOpenPopup(item.id, event)}
                      >
                        <FontAwesomeIcon
                          icon={faFile}
                          className="fa-icon fa-regular"
                          style={{ pointerEvents: 'none' }}
                        />
                      </button>
                    </td>
                    <td>
                      <button
                        id="order"
                        onClick={(event) => {
                          handleOpenPopup(item.id, event);
                        }}
                      >
                        <FontAwesomeIcon
                          icon="fa-bag-shopping"
                          className="fa-icon"
                          style={{ pointerEvents: 'none' }}
                        />
                      </button>
                    </td>
                    <td>
                      <button
                        id="settings"
                        onClick={(event) => handleOpenPopup(item.id, event)}
                      >
                        <FontAwesomeIcon
                          icon="fa-gear"
                          className="fa-icon"
                          style={{ pointerEvents: 'none' }}
                        />
                      </button>
                    </td>
                    <td id="add-prod-td"></td>
                  </tr>
                )}
              </Draggable>
            ))}
          {provided.placeholder}
        </tbody>
      )}
    </Droppable>
  );
}

export default InventoryItemsContainer