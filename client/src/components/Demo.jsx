import React, { useContext } from "react";
import './demo.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop, faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { InventoryContext } from "../contexts/inventory.context";

export default function DemoControls() {
    const { startUsage, stopUsage, resetInventory } = useContext(InventoryContext);

    return (
        <div className="demo-container">
            <h5>Demo Controls</h5>
            <div className="demo-flex-cont">
                <button >
                    <FontAwesomeIcon
                        icon={faPlay}
                        className="fa-icon"
                        // swapped these for now
                        onClick={startUsage}
                    />
                </button>
                <button >
                    <FontAwesomeIcon
                        icon={faStop}
                        className="fa-icon"
                        onClick={stopUsage}
                    />
                </button>
                <button >
                    <FontAwesomeIcon
                        icon={faRotateLeft}
                        className="fa-icon"
                        onClick={resetInventory}
                    />
                </button>
            </div >
        </div >

    )
}