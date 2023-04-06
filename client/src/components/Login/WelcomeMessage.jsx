import React, { useContext, useState, useEffect } from "react";
import './welcomeMessage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
library.add(faLinkedin, faGithub);
import { Switch, FormControlLabel, Slider } from "@mui/material";

export default function WelcomeMessage() {

    const [expandDemoControls, setExpandDemoControls] = useState(false);
    const toggleDemoControlsBox = (event) => {
        setExpandDemoControls(!expandDemoControls);
    };


    const handleDeliveriesToggleChange = (event) => {
        setDeliveriesOn(event.target.checked);
    };
    const handleUseSelectedOnlyToggleChange = (event) => {
        setUseSelectedOnlyOn(event.target.checked);
    };


    return (
        <div className="welcome-message-container">
            <div className="welcome-message">
                <h5>Welcome!</h5>
                <p>This group project was organized by Danny Thompson and Scott Thompson of <a
                    href="https://www.meetup.com/dallas-software-developers-meetup/"
                    target="_blank"
                    rel="noreferrer"
                >
                    Dallas Software Developers
                </a>.</p>
                <p>It was developed by:
                    <span className="developer-names"><br></br>
                        <a href="https://www.linkedin.com/in/clayton-breland/" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon
                                className="linkedin-icon"
                                icon={faLinkedin}
                                style={{ pointerEvents: 'none' }}
                            />
                            <span>Clayton Breland</span>
                        </a><br></br>
                        <a href="https://www.linkedin.com/in/joshuaowdev/" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon
                                className="linkedin-icon"
                                icon={faLinkedin}
                                style={{ pointerEvents: 'none' }}
                            />
                            <span>Joshua Ow</span>
                        </a><br></br>
                        <a href="https://www.linkedin.com/in/erik-hunter/" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon
                                className="linkedin-icon"
                                icon={faLinkedin}
                                style={{ pointerEvents: 'none' }}
                            />
                            <span>Erik Hunter</span>
                        </a><br></br>
                    </span>
                </p>
                <p>If you would like to see all of the features in action, click Add Company, get a companyId, and create a user with that compnayId.</p>
                <p className="github-p">
                    <a href="https://github.com/DallasSoftwareDevelopersTeamC/orderly" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon
                            className="linkedin-icon"
                            icon={faGithub}
                            style={{ pointerEvents: 'none' }}
                        />
                        <span>Github Repo</span>
                    </a>
                </p>
            </div>


        </div >

    )
}