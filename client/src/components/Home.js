import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";

const Button = styled.button`
  display: inline-block;
  color: black;
  border: transparent;
`;
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;
export default class Home extends Component {
  getfile = () => {
    axios.get("/files").then(data => console.log(data.data));
  };
  render() {
    return (
      <div>
        <Button onClick={this.getfile}>Hi!</Button>
        <Title>Hello world</Title>
      </div>
    );
  }
}
