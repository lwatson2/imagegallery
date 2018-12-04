import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";

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
let loaded = [];

export default class ImageGallery extends Component {
  state = {
    images: [],
    isLoaded: false,
    loadedImages: []
  };

  componentDidMount = () => {
    axios
      .get("/images/files")
      .then(test => this.setState({ images: test.data }));
  };
  handleLoad = img => {
    let newImages = loaded.push(img);
    console.log(this.state.images.length);
    if (
      loaded.length === this.state.images.length &&
      loaded.sort().every(function(value, index) {
        return value === this.state.images.sort()[index];
      })
    ) {
      console.log("this worked");
    }
  };
  render() {
    const { images, isLoaded } = this.state;
    return (
      <div>
        {images.map(file => (
          <Background>
            <div>
              <Image
                src={"/images/image/" + file.filename}
                alt="test"
                display={isLoaded ? "" : "none"}
                onLoad={this.handleLoad}
              />
            </div>
          </Background>
        ))}
      </div>
    );
  }
}
