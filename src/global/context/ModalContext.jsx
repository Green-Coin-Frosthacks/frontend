import React, { createContext, useContext, useState, useCallback } from "react";
import Modal from "../components/Modal/Modal";

const ModalContext = createContext();

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

export const ModalProvider = ({ children }) => {
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    type: "alert", // 'alert' or 'confirm'
    title: "",
    message: "",
    onConfirm: null,
    onCancel: null,
  });

  const showAlert = useCallback((title, message) => {
    return new Promise((resolve) => {
      setModalConfig({
        isOpen: true,
        type: "alert",
        title,
        message,
        onConfirm: () => {
          setModalConfig((prev) => ({ ...prev, isOpen: false }));
          resolve(true);
        },
      });
    });
  }, []);

  const showConfirm = useCallback((title, message) => {
    return new Promise((resolve) => {
      setModalConfig({
        isOpen: true,
        type: "confirm",
        title,
        message,
        onConfirm: () => {
          setModalConfig((prev) => ({ ...prev, isOpen: false }));
          resolve(true);
        },
        onCancel: () => {
          setModalConfig((prev) => ({ ...prev, isOpen: false }));
          resolve(false);
        },
      });
    });
  }, []);

  const showPrompt = useCallback((title, message, defaultValue = "") => {
    return new Promise((resolve) => {
      setModalConfig({
        isOpen: true,
        type: "prompt",
        title,
        message,
        defaultValue,
        onConfirm: (value) => {
          setModalConfig((prev) => ({ ...prev, isOpen: false }));
          resolve(value);
        },
        onCancel: () => {
          setModalConfig((prev) => ({ ...prev, isOpen: false }));
          resolve(null);
        },
      });
    });
  }, []);

  const closeModal = () => {
    setModalConfig((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <ModalContext.Provider value={{ showAlert, showConfirm, showPrompt, closeModal }}>
      {children}
      {modalConfig.isOpen && (
        <Modal
          {...modalConfig}
          onClose={closeModal}
        />
      )}
    </ModalContext.Provider>
  );
};
