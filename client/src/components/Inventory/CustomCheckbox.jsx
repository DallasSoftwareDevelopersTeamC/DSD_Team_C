import React from 'react';
import Checkbox from '@mui/material/Checkbox';


const CustomCheckboxPopupButton = ({ checked, onClick }) => {
    return (
        <div
            className={`custom-checkbox ${checked ? 'checked' : ''}`}
            // calling the onClick function passed down through props
            onClick={onClick}
        ></div>
    );
};

const renderHeaderContent = (header, handleOpenPopup) => {
    switch (header) {
        case 'Checkbox':
            return (
                <div className="heading-select">
                    <button className="checkbox-options-button">
                        <CustomCheckboxPopupButton
                            id="selectedCheckboxOptions"
                            onClick={(event) => {
                                handleOpenPopup(null, event);
                            }}
                        />
                    </button>
                </div>
            );
        default:
            return header;
    }
};

const CustomCheckbox = ({ itemId, onChange, selectedItems }) => {
    const isChecked = selectedItems.includes(itemId);

    const handleCheckboxToggle = (event) => {
        onChange(itemId);
    };

    return (
        <Checkbox
            checked={isChecked}
            onChange={handleCheckboxToggle}
            color="primary"
        />
    );
};


export { CustomCheckbox, CustomCheckboxPopupButton, renderHeaderContent };
