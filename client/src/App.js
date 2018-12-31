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
import Login from "./components/login/Login";
class App extends Component {
  state = {
    files: false,
    images: [],
    desc: [],
    isLoggedIn: false
  };

  componentDidMount() {}

  render() {
    return (
      <BrowserRouter>
        <div>
          <Navabars />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/upload" component={Upload} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
