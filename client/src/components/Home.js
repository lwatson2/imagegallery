import React, { Component } from "react";
import styled from "styled-components";
import ImageGallery from "./ImageGallery";
import axios from "axios";

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
  border: line-dotted;
`;
export default class Home extends Component {
  getfile = () => {
    axios.get("/files").then(data => console.log(data.data));
  };
  render() {
    return (
      <div>
        <Title>Hello world</Title>
        <div>
          <ImageGallery />
        </div>
      </div>
    );
  }
}
