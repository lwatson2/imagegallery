import React, { Component } from "react";
import styled from "styled-components";
import ImageGallery from "./imagegallery/ImageGallery";
import Upload from "./upload/Upload";
import axios from "axios";
import { Route, Link, Switch } from "react-router-dom";

const Sidebar = styled.div`
  position: fixed;
  z-index: 999;
`;

const UploadLink = styled.button`
  display: inline-block;
  width: 61px;
  height: 20px;
`;
export default class Home extends Component {
  getfile = () => {
    axios.get("/files").then(data => console.log(data.data));
  };
  render() {
    return (
      <div>
        {/* <Sidebar>
          <Link to={`/upload`}>
            <UploadLink>Upload</UploadLink>
          </Link>
        </Sidebar> */}
        <div>
          <ImageGallery />
        </div>

        <Route exact path="upload" component={Upload} content="Upload file" />
      </div>
    );
  }
}
