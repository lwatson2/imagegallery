import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";

const Image = styled.img`
  width: 50px;
  height: 50px;
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
    isLoaded: true,
    image: ""
  };

  componentDidMount = () => {
    axios
      .get("/images/files")
      .then(test => this.setState({ images: test.data, isLoaded: true }));
  };

  render() {
    const { images, isLoaded } = this.state;
    if (!isLoaded) {
      return <h1>loading....</h1>;
    }
    if (isLoaded) {
      return (
        <div>
          {images.map(file => (
            <Background>
              <div>
                <Image src={"/images/image/" + file.filename} alt="test" />
              </div>
            </Background>
          ))}
        </div>
      );
    }
  }
}
