import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import styled from "styled-components";
import Upload from "./../upload/Upload";

export default class Navbar extends Component {
  render() {
    return (
      <div>
        HI
        <Route exact path="upload" component={Upload} content="Upload file" />
      </div>
    );
  }
}
