import React, { useState, useEffect } from "react";
import "./Modal.style.scss";

const Modal = ({ type, title, message, onConfirm, onCancel, isOpen, defaultValue = "" }) => {
  const [inputValue, setInputValue] = useState(defaultValue);

  useEffect(() => {
    setInputValue(defaultValue);
  }, [defaultValue, isOpen]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (type === "prompt") {
      onConfirm(inputValue);
    } else {
      onConfirm();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleConfirm();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3>{title}</h3>
        </div>
        <div className="modal-body">
          <p>{message}</p>
          {type === "prompt" && (
            <input
              type="text"
              className="modal-input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              autoFocus
              placeholder="Enter UID..."
            />
          )}
        </div>
        <div className="modal-footer">
          {(type === "confirm" || type === "prompt") && (
            <button className="btn-cancel" onClick={onCancel}>
              Cancel
            </button>
          )}
          <button className="btn-confirm" onClick={handleConfirm}>
            {type === "confirm" ? "Confirm" : type === "prompt" ? "Update" : "OK"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
