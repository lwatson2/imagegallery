import React, { Component } from "react";
import axios from "axios";
import "./Modal.css";

export default class Modal extends Component {
  state = {
    loading: false,
    message: ""
  };
  handleSubmit = async event => {
    this.setState({ loading: true });
    const params = {
      itemKey: this.props.image,
      userEmail: this.props.userEmail
    };
    try {
      const response = await axios.post("/image/delete", { params });
      const data = response.data;
      if (data.message === "success") {
        this.setState({ loading: false });
      }
    } catch (error) {}
  };
  render() {
    return (
      <div
        className="modal-wrapper"
        style={{
          transform: this.props.show
            ? "translateY(-50vh)"
            : "translateY(-118vh)",
          opacity: this.props.show ? "1" : "0"
        }}
      >
        <div className="modal-head">
          <span className="close-modal-btn" onClick={this.props.close}>
            ×
          </span>
        </div>
        <div className="modal-body">
          <p>{this.props.children}</p>
        </div>
        <div className="modal-footers">
          <form onSubmit={this.handleSubmit}>
            <button
              type="submit"
              value="Submit"
              className="btn-cancel"
              onClick={this.props.delete}
            >
              Yes
            </button>
          </form>
          <button className="btn-continue" onClick={this.props.close}>
            No
          </button>
        </div>
      </div>
    );
  }
}
