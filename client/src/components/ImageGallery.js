import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Image = styled.img`
  width: 50px;
  height: 50px;
  display: ${props => props.display};
`;
const Background = styled.div`
  background-color: red;
  padding: 10px;
  width: 50px;
  height: 50px;
`;

export default class ImageGallery extends Component {
  state = {
    images: [],
    isLoaded: false
  };

  componentDidMount = () => {
    axios
      .get("/images/files")
      .then(test => this.setState({ images: test.data }));
  };
  placeholderSrc(width, height) {
    return `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"%3E%3C/svg%3E`;
  }
  render() {
    const { images, isLoaded } = this.state;
    return (
      <div>
        <div>
          <LazyLoadImage
            src={
              "https://imagegallerynode.s3.us-east-2.amazonaws.com/1544075882075"
            }
            alt="test"
            height={150}
            width={150}
          />
        </div>
      </div>
    );
  }
}
