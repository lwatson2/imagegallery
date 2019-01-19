import React, { Component } from "react";
import ImageGallery from "./imagegallery/ImageGallery";
import Quote from "./quote/Quote";

export default class Home extends Component {
  render() {
    return (
      <div>
        <ImageGallery
          userEmail={this.props.userEmail}
          isLoggedIn={this.props.isLoggedIn}
        />
        <Quote />
      </div>
    );
  }
}
