/** @format */

import React, { useState } from "react";
import "./App.css";

const Dropdown = ({ options }) => {
  const [displayMenuBox, setDisplayMenuBox] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [dropDownEmoji, setDropDownEmoji] = useState("⬇️");
  const [checkItemState, setCheckItemState] = useState([]);
  const [multiOptionState, setmultiOptionState] = useState(false);

  const toggleSingleOption = () => {
    setmultiOptionState(!multiOptionState);
    setSelectedOptions([]);
    setCheckItemState([]);
    setDropDownEmoji("⬇️");
  };

  const getCurrentMode = () => {
    return multiOptionState ? "Multi Select Mode" : "Single Select Mode";
  };

  const toggling = () => {
    setIsOpen(!isOpen);
    setDisplayMenuBox(!displayMenuBox);
    dropDownEmoji === "⬇️" ? setDropDownEmoji("⬆️") : setDropDownEmoji("⬇️");
  };

  const onSingleOptionClicked = (value) => () => {
    setDisplayMenuBox(true);
    setSelectedOptions([value]);
    setIsOpen(false);
    setDisplayMenuBox(!displayMenuBox);
    checkItemState[value] = !checkItemState[value];
    toggling();
  };

  const onOptionClicked = (value) => () => {
    setDisplayMenuBox(true);
    checkItemState[value] = !checkItemState[value]; //checks & unchecks the checkbox

    if (checkItemState[value]) {
      if (!selectedOptions.includes(value)) {
        setSelectedOptions([...selectedOptions, value]);
      }
    } else {
      setSelectedOptions(selectedOptions.filter((item) => item !== value));
    }

    setIsOpen(false);
  };

  const getSelectAllOrDeselectAll = () => {
    if (selectedOptions.length === options.length) {
      return "❌ Deselect All";
    } else {
      return "✅ Select All";
    }
  };

  const getButtonTextStatus = () => {
    if (selectedOptions.length === 0) {
      return "Select name(s) ";
    } else {
      return selectedOptions.join(", ");
    }
  };

  const selectOrDeselectAll = () => {
    if (selectedOptions.length === options.length) {
      setSelectedOptions([]);
      setCheckItemState({});
    } else {
      setSelectedOptions(options);
      setCheckItemState(options.reduce((acc, curr) => ({ ...acc, [curr]: true }), {}));
    }
  };

  return (
    <div className="dropdown">
      <div>
        <button className="toggle-modes" onClick={toggleSingleOption}>
          Toggle between Single vs. Multi Select Modes 🔄
        </button>
        <p className="current-mode">
          Current Mode: <span style={{ fontWeight: "bold" }}>{getCurrentMode()}</span>{" "}
        </p>
      </div>

      <div className="dropdown-header" onClick={toggling}>
        <span className="options-selected">{getButtonTextStatus()}</span>
        <span style={{ position: "absolute", right: 8 }}>{dropDownEmoji}</span>
      </div>

      {multiOptionState && displayMenuBox && (
        <div className="dropdown-content">
          <label className="highlight-row" onClick={selectOrDeselectAll}>
            {getSelectAllOrDeselectAll()}
          </label>

          {options.map((option) => (
            <label className="highlight-row">
              <input type="checkbox" checked={checkItemState[option] || false} onClick={onOptionClicked(option)} />
              👉 {option}
            </label>
          ))}
        </div>
      )}

      {!multiOptionState && displayMenuBox && (
        <div className="dropdown-content">
          {options.map((option) => (
            <label className="highlight-row" onClick={onSingleOptionClicked(option)}>
              👉 {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
