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
  color: #010400
  -webkit-transition-duration: 0.8s; /* Safari */
  transition-duration: 0.9s;
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  &:hover {
    border: 2px solid #0099cc
    color: #EAEAEA;
  }
  @media only screen and (max-width: 479px) {
    background-color: #0099cc;
    color: #010400;
    padding: 8px 20px;
    top: 14px;
    left: 46px;
    border: 2px solid #0099cc;
    font-size: 14px;
  }
  @media only screen and (min-width: 480px) and (max-width: 768px) {
    background-color: #0099cc;
    color: #010400;
    border: 2px solid #0099cc
    top: 35px;
    left: 38px;
    padding: 10px 25px;
  }
`;
const ErrorMessage = styled.span`
  color: #bb0000;
  position: relative;
  bottom: 30px;
`;
export default class FloatingLabel extends Component {
  state = {
    emailValue: "",
    passActive: false,
    passValue: "",
    emailActive: false,
    required: false
  };
  activateField = value => {
    if (value === "pass") {
      this.setState({ passActive: true });
    } else {
      this.setState({ emailActive: true });
    }
  };
  disableFocus = e => {
    if (e === "pass" && this.state.passValue === "") {
      this.setState({ passActive: false });
    }
    if (e === "email" && this.state.emailValue === "") {
      this.setState({ emailActive: false });
    }
  };

  handleEmailChange = e => {
    this.setState({ emailValue: e.target.value });
    e.preventDefault();
  };
  handlePassChange = e => {
    this.setState({ passValue: e.target.value });
    e.preventDefault();
  };
  handleLogin = e => {
    e.preventDefault();
    const { emailValue, passValue } = this.state;
    {
      emailValue === "" || passValue === ""
        ? this.setState({ required: true })
        : this.props.handleLoginSubmit({ emailValue, passValue });
    }
  };
  render() {
    const { emailValue, passValue, emailActive, passActive } = this.state;
    return (
      <div>
        {this.props.error ? (
          <ErrorMessage>Invalid Email / Password. </ErrorMessage>
        ) : (
          ""
        )}
        {this.state.required ? (
          <ErrorMessage>Both fields are required. </ErrorMessage>
        ) : (
          ""
        )}
        <form onSubmit={this.handleLogin}>
          <div className="field-group">
            <label
              onClick={() => this.activateField("email")}
              className={emailActive ? "field-active" : ""}
            >
              Email
            </label>
            <input
              className={
                this.state.emailActive
                  ? "floating-label-active"
                  : "floating-label"
              }
              type="text"
              value={emailValue}
              onFocus={() => this.activateField("email")}
              onBlur={() => this.disableFocus("email")}
              onChange={this.handleEmailChange}
            />
          </div>
          <div className="field-group">
            <label
              onClick={() => this.activateField("pass")}
              className={passActive ? "password-active" : ""}
            >
              Password
            </label>
            <input
              className={
                this.state.passActive
                  ? "floating-password-active"
                  : "floating-password"
              }
              type="password"
              value={passValue}
              onFocus={() => this.activateField("pass")}
              onBlur={() => this.disableFocus("pass")}
              onChange={this.handlePassChange}
            />
          </div>
          <LoginButton>Submit</LoginButton>
        </form>
      </div>
    );
  }
}
