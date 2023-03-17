import React, { useContext, useState, useEffect } from "react";
import './demo.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop, faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { InventoryContext } from "../contexts/inventory.context";
import { OrdersContext } from "../contexts/orders.context";
import { Switch, FormControlLabel } from "@mui/material";

export default function DemoControls() {
    const { startUsage, stopUsage, resetInventory } = useContext(InventoryContext);
    const { deliveryState, setDeliveryState } = useContext(OrdersContext);
    // keep track of buttons active for css .active colors
    const [playActive, setPlayActive] = useState(false);
    const [stopActive, setStopActive] = useState(false);

    useEffect(() => {
        // This empty useEffect will force the component to re-render whenever deliveryState changes.
    }, [deliveryState]);

    const startUsageWithState = () => {
        startUsage();
        setPlayActive(true);
        setStopActive(false);
    };

    const stopUsageWithState = () => {
        stopUsage();
        setPlayActive(false);
        setStopActive(true);
    };

    const resetInventoryWithState = () => {
        resetInventory();
        setPlayActive(false);
        setStopActive(false);
    };

    const handleToggleChange = (event) => {
        console.log(event.target.checked)
        setDeliveryState(event.target.checked);
    };


    return (
        <div className="demo-container">
            <h5>Demo Controls</h5>
            <div className="container-for-two-divs">
                <div className="use-inventory-container">
                    <p>Use Inventory</p>
                    <button
                        className={`${playActive ? "active" : ""}`}
                    >
                        <FontAwesomeIcon
                            icon={faPlay}
                            className="fa-icon"
                            // swapped these for now
                            onClick={startUsageWithState}
                        />
                    </button>
                    <button
                        className={`${stopActive ? "active" : ""}`}
                    >
                        <FontAwesomeIcon
                            icon={faStop}
                            className="fa-icon"
                            onClick={stopUsageWithState}
                        />
                    </button>
                    <button >
                        <FontAwesomeIcon
                            icon={faRotateLeft}
                            className="fa-icon"
                            onClick={resetInventoryWithState}
                        />
                    </button>
                </div >
                <div className="delivery-switch-container">
                    <p>Deliveries</p>
                    <FormControlLabel
                        control={
                            <Switch
                                size="small"
                                className="delivery-switch"
                                checked={deliveryState}
                                onChange={handleToggleChange}
                                inputProps={{ "aria-label": "Toggle switch" }}
                            />
                        }
                    // label="Toggle"
                    />
                </div>
            </div>
        </div >

    )
}