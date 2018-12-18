import React, { Component } from "react";
import styled from "styled-components";
import ImageGallery from "./imagegallery/ImageGallery";
import Quote from "./quote/Quote";

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
  render() {
    return (
      <div>
        <ImageGallery />
        <Quote />
      </div>
    );
  }
}
