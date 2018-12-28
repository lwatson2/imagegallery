import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Modal.css";

export default class Modal extends Component {
  state = {
    loading: false
  };
  handleSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });
    console.log(this.props.image);
    const itemKey = this.props.image;

    axios.post("/image/delete", { itemKey }).then(data => {
      if(data.message === 'success'){
        console.log('true')
        this.setState({loading: false})
      }
    });
  };
  render() {
    return (
      <div
        className="modal-wrapper"
        style={{
          transform: this.props.show
            ? "translateY(-50vh)"
            : "translateY(-100vh)",
          opacity: this.props.show ? "1" : "0"
        }}
      >
        <div className="modal-header">
          <span className="close-modal-btn" onClick={this.props.close}>
            ×
          </span>
        </div>
        <div className="modal-body">
          <p>{this.props.children}</p>
        </div>
        <div className="modal-footer">
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
