import React, { Component } from "react";
import styled from "styled-components";
import ImageGallery from "./ImageGallery";
import Upload from "./upload/Upload";
import axios from "axios";
import { Route, Link, Switch } from "react-router-dom";

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
  border: line-dotted;
`;
const UploadLink = styled.button`
  display: inline-block;
  width: 61px;
  height: 20px;
  position: absolute;
  right: 0px;
  top: 0px;
`;
export default class Home extends Component {
  getfile = () => {
    axios.get("/files").then(data => console.log(data.data));
  };
  render() {
    return (
      <div>
        <Link to={`/upload`}>
          <UploadLink>Upload</UploadLink>
        </Link>
        <Title>Hello world</Title>
        <div>
          <ImageGallery />
        </div>
        <Route exact path="upload" component={Upload} content="Upload file" />
      </div>
    );
  }
}
