import React, { Component } from "react";
import styled from "styled-components";

import "./FloatingLabel.css";

const LoginButton = styled.button`
  background: transparent;
  border: 2px solid;
  border-radius: 6px;
  position: relative;
  padding: 10px 28px;
  top: 40px;
  left: 34px;
  text-align: center;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.5s;
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  &:hover {
    background-color: #008cba;
    color: white;
  }
  @media only screen and (max-width: 479px) {
    background-color: #008cba;
    color: white;
    padding: 8px 20px;
    top: 14px;
    left: 46px;
    font-size: 14px;
  }
  @media only screen and (min-width: 480px) and (max-width: 768px) {
    background-color: #008cba;
    color: white;
    top: 35px;
    left: 38px;
    padding: 10px 25px;
  }
`;

export default class FloatingLabel extends Component {
  state = {
    emailValue: "",
    passActive: false,
    passValue: "",
    fieldActive: false
  };
  activateField = value => {
    if (value === "pass") {
      this.setState({ passActive: true });
    } else {
      this.setState({ fieldActive: true });
    }
  };
  disableFocus = (e, value) => {
    if (e === "pass") {
      this.setState({ passActive: false });
    }
    if (e === "email") {
      this.setState({ fieldActive: false });
    }
  };
  handleEmailChange = e => {
    console.log(e.target.value);

    this.setState({ emailValue: e.target.value });
    this.activateField();
    e.preventDefault();
  };
  handlePassChange = e => {
    console.log(e.target.value);
    this.setState({ passValue: e.target.value });
    this.activateField();
    e.preventDefault();
  };
  render() {
    const { emailValue, passValue } = this.state;
    return (
      <div className="test">
        <form
          onSubmit={() =>
            this.props.handleLoginSubmit({ emailValue, passValue })
          }
        >
          <div className="field-group">
            <label
              onClick={() => this.activateEmailField("email")}
              className={this.state.fieldActive ? "field-active" : ""}
            >
              Email
            </label>
            <input
              className={
                this.state.fieldActive
                  ? "floating-label-active"
                  : "floating-label"
              }
              type="text"
              value={this.state.inputValue}
              onFocus={() => this.activateEmailField("email")}
              onBlur={() => this.disableFocus("email")}
              onChange={this.handleEmailChange}
            />
          </div>
          <div className="field-group">
            <label
              onCLick={this.activatePassField}
              className={this.state.passActive ? "password-active" : ""}
            >
              Password
            </label>
            <input
              className={
                this.state.passActive
                  ? "floating-password-active"
                  : "floating-password"
              }
              type="text"
              value={this.state.inputValue}
              onFocus={() => this.activatePassField}
              onBlur={() => this.disablePassFocus}
              onChange={this.handlePassChange}
            />
          </div>
          <LoginButton>Submit</LoginButton>
        </form>
      </div>
    );
  }
}
