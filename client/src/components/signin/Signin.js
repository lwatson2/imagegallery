import React, { Component } from "react";
import axios from "axios";
import "./Signin.css";
import FloatingLabel from "../floatingLabel/FloatingLabel";
import styled from "styled-components";

const FormWrapper = styled.div`
  @media only screen and (max-width: 479px) {
    width: 300px;
  }
  background-color: #003559
  width: 400px;
  position: relative;
  top: 45px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 50px 0px 82px 0px;
  align-items: center;
  margin: 0 auto;
  border: 2px solid black;
  border-radius: 6px;
`;

const Background = styled.div`
  background: ${props => props.backgroundImage};
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  background-position: center;
`;
export default class Login extends Component {
  state = {
    image: [],
    error: false
  };
  componentDidMount = () => {
    this.getImage();
  };
  getImage = async () => {
    try {
      const fetchImage = await axios.get("/image/RandomImage");
      this.setState({ image: fetchImage.data[0].Link });
    } catch (error) {}
  };

  handlePassChange = event => {
    const passValue = event.target.value;

    this.setState({ password: passValue });

    if (!passValue) {
      return "";
    }
  };
  handleLoginSubmit = async (email, event) => {
    const creds = {
      email: email.emailValue,
      password: email.passValue
    };
    try {
      const res = await axios.post("/user/login", { creds });
      if (res.data.isLoggedIn === true) {
        this.props.successfulLogin(res.data.user.email);
        sessionStorage.setItem("isLoggedIn", true);
        this.props.history.push("/");
      } else if (res.data.error === true) {
        this.setState({ error: true });
      }
    } catch (error) {}
  };
  render() {
    return (
      <Background backgroundImage={`url(${this.state.image})`}>
        <FormWrapper>
          <FloatingLabel
            error={this.state.error}
            handleLoginSubmit={this.handleLoginSubmit}
          />
        </FormWrapper>
      </Background>
    );
  }
}
