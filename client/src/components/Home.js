import React, { Component } from "react";
import styled from "styled-components";
import ImageGallery from "./imagegallery/ImageGallery";
import Navbars from "./navbar/Navbar";
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
  render() {
    return (
      <div>
        <Navbars />
        <div>
          <ImageGallery />
        </div>
      </div>
    );
  }
}
