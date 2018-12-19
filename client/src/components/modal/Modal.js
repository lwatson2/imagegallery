import React, { Component } from "react";
import "./Modal.css";

const Modal = props => {
  return (
    <div>
      <div
        className="modal-wrapper"
        style={{
          transform: props.show ? "translateY(-50vh)" : "translateY(-100vh)",
          opacity: props.show ? "1" : "0"
        }}
      >
        <div className="modal-header">
          <span className="close-modal-btn" onClick={props.close}>
            ×
          </span>
        </div>
        <div className="modal-body">
          <p>{props.children}</p>
        </div>
        <div className="modal-footer">
          <button className="btn-cancel" onClick={props.close}>
            Yes
          </button>
          <button className="btn-continue">No</button>
        </div>
      </div>
    </div>
  );
};
export default Modal;
