import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const CustomCheckboxPopupButton = ({ checked, onClick }) => {
  return (
    <div
      className={`custom-checkbox ${checked ? "checked" : ""}`}
      onClick={onClick}
    >
      <FontAwesomeIcon
        icon={faCheck}
        className="fa-icon check-icon"
        style={{ pointerEvents: "none" }}
      />
    </div>
  );
};

const renderHeaderContent = (header, handleOpenPopup) => {
  switch (header) {
    case "Checkbox":
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

const CustomCheckbox = ({ itemId, onChange, selectedItems, sx }) => {
  const isChecked = selectedItems ? selectedItems.includes(itemId) : false;

  const handleCheckboxToggle = (event) => {
    onChange(event, itemId);
};


  return (
    <input type="checkbox"
      checked={isChecked}
      onChange={handleCheckboxToggle}
      color="primary"
      sx={sx}
    >
        </input>
  );
};

export { CustomCheckbox, CustomCheckboxPopupButton, renderHeaderContent };
