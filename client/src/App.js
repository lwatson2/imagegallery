import React, { Component } from "react";
import axios from "axios";
import { Route, Link, Switch } from "react-router-dom";
import "./App.css";
import BrowserRouter from "react-router-dom/BrowserRouter";
import Login from "./components/Login";
import Home from "./components/Home";
import styled from "styled-components";
import Upload from "./components/upload/Upload";

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
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/upload" component={Upload} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
