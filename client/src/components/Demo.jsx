import React from "react";
import './demo.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop, faRotateLeft } from '@fortawesome/free-solid-svg-icons';

export default function Demo() {


    return (
        <div className="demo-container">
            <h5>Demo Controls</h5>
            <div className="demo-flex-cont">
                <button >
                    <FontAwesomeIcon
                        icon={faPlay}
                        className="fa-icon"
                    />
                </button>
                <button >
                    <FontAwesomeIcon
                        icon={faStop}
                        className="fa-icon"
                    />
                </button>
                <button >
                    <FontAwesomeIcon
                        icon={faRotateLeft}
                        className="fa-icon"
                    />
                </button>
            </div >
        </div >

    )
}