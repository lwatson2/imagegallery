import React, { Component } from "react";
import axios from "axios";
import "./Login.css";
import styled from "styled-components";
const FormWrapper = styled.div`
  position: relative;
  top: 45px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Email = styled.input`
  margin-bottom: 10px;
`;
export default class Login extends Component {
  state = {
    email: "",
    password: ""
  };
  handleEmailChange = event => {
    const emailValue = event.target.value;

    this.setState({ email: emailValue });

    if (!emailValue) {
      return "";
    }
  };
  handlePassChange = event => {
    const passValue = event.target.value;

    this.setState({ password: passValue });

    if (!passValue) {
      return "";
    }
  };
  render() {
    return (
      <div>
        <FormWrapper>
          <form>
            <label for="email">Email</label>
            <Email
              type="text"
              id="email"
              name="email"
              value={this.state.email}
              onChange={this.handleEmailChange}
            />
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={this.state.password}
              onChange={this.handlePassChange}
            />
          </form>
        </FormWrapper>
      </div>
    );
  }
}
