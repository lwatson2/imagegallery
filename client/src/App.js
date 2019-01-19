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
class App extends Component {
  state = {
    files: false,
    images: [],
    desc: [],
    isLoggedIn: false,
    userEmail: ""
  };
  successfulLogin = email => {
    this.setState({ userEmail: email });
  };
  logout = () => {
    sessionStorage.removeItem("isLoggedIn");
    this.props.history.push("/");
  };
  componentDidMount() {
    console.log(sessionStorage.getItem("isLoggedIn"));
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Navabars />
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <Home {...props} userEmail={this.state.userEmail} />
              )}
            />
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
