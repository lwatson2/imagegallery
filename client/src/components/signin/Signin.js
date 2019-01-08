import React, { Component } from "react";
import axios from "axios";
import "./Signin.css";
import styled from "styled-components";
const FormWrapper = styled.div`
  @media only screen and (max-width: 479px) {
    width: 300px;
  }
  width: 400px;
  position: relative;
  top: 45px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 50px 0px 82px 0px;
  align-items: center;
  margin: 0 auto;
  border: 2px solid #0099cc;
  border-radius: 6px;
`;
const Email = styled.input`
  margin-bottom: 10px;
  &:focus {
    border: 0;
    border-bottom: 2px solid;
    background: transparent;
  }
`;
const LoginButton = styled.button`
  color: #0099cc;
  background: transparent;
  border: 2px solid #0099cc;
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

const Background = styled.div`
  background: ${props => props.backgroundImage};
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
`;
export default class Login extends Component {
  state = {
    email: "",
    password: "",
    image: []
  };
  componentDidMount = () => {
    this.getImage();
    console.log(this.props);
  };
  getImage = async () => {
    try {
      const fetchImage = await axios.get("/image/RandomImage");
      this.setState({ image: fetchImage.data[0].Link });
    } catch (error) {}
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
  handleLoginSubmit = async event => {
    event.preventDefault();
    const creds = {
      password: this.state.password,
      email: this.state.email
    };
    try {
      const res = await axios.post("/user/login", { creds });

      if (res.data.isLoggedIn === true) {
        console.log(this.props);
        this.props.successfulLogin();
      } else {
        console.log("test");
      }
    } catch (error) {}
  };
  render() {
    return (
      <Background backgroundImage={`url(${this.state.image})`}>
        <FormWrapper>
          <form onSubmit={this.handleLoginSubmit}>
            <label for="email">Email</label>
            <Email
              type="text"
              id="email"
              name="email"
              value={this.state.email}
              onChange={this.handleEmailChange}
            />
            <label for="pass">Password</label>
            <input
              type="password"
              id="pass"
              name="pass"
              value={this.state.password}
              onChange={this.handlePassChange}
            />
            <LoginButton>Submit</LoginButton>
          </form>
        </FormWrapper>
      </Background>
    );
  }
}