import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import React, { Component } from "react";
import axios from "axios";
import { Route, Link, Switch } from "react-router-dom";
import "./App.css";
import BrowserRouter from "react-router-dom/BrowserRouter";
import Home from "./components/Home";
import styled from "styled-components";
import Upload from "./components/upload/Upload";
import Navabars from "./components/navbar/Navbar";
import Signin from "./components/signin/Signin";
import Dummy from "./components/Dummy";
class App extends Component {
  state = {
    files: false,
    images: [],
    desc: [],
    isLoggedIn: false
  };
  successfulLogin = () => {
    this.setState({ isLoggedIn: true });
    console.log("yes");
  };
  logout = () => {
    this.setState({ isLoggedIn: false });
    console.log("also yes");
  };
  componentDidMount() {}

  render() {
    return (
      <BrowserRouter>
        <div>
          <Navabars isLoggedIn={this.state.isLoggedIn} logout={this.logout} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/upload" component={Upload} />
            <Route
              exact
              path="/signin"
              render={props => (
                <Signin {...props} successfulLogin={this.successfulLogin} />
              )}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
