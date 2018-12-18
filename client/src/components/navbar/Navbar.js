import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import styled from "styled-components";
import Upload from "./../upload/Upload";
import { Button } from "reactstrap";

const PhotoSpan = styled.span`
  position: absolute;
  right: 12px;
  top: 17px;
  color: white;
`;
export default class Navbar extends Component {
  state = {
    isOpen: false
  };

  toggleNav = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  render() {
    const show = this.state.isOpen ? "show" : "";
    return (
      <div>
        <nav className=" navbar navbar-expand-sm navbar-dark bg-primary">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarToggleExternalContent"
            aria-controls="navbarToggleExternalContent"
            onClick={this.toggleNav}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className={"collapse navbar-collapse " + show}
            id="navbarToggleExternalContent"
          >
            <div className="navbar-nav bg-primary">
              <ul className="navbar-nav mr-auto">
                <Link to={"/"}>
                  <li>
                    <button className="btn btn-primary" size="sm">
                      Home
                    </button>
                  </li>
                </Link>
                <Link to={"/upload"}>
                  <li>
                    <button className="btn btn-primary" size="sm">
                      Upload
                    </button>
                  </li>
                </Link>
              </ul>
            </div>
          </div>
          <PhotoSpan>Danielle lee photography</PhotoSpan>
        </nav>
        <Route exact path="upload" component={Upload} content="Upload file" />
      </div>
    );
  }
}
