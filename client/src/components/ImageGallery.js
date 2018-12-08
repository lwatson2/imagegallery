import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import { Carousel } from "react-responsive-carousel";
const url = "https://s3-us-east-2.amazonaws.com/imagegallerynode/";

const Image = styled.img`
  @media only screen and (max-width: 479px){
    display: grid;
    grid-template-row: 1
    grid-gap: .5rem;
    height: 300px;
    width: 300px;
  }
`;
const Background = styled.div`
  @media only screen and (max-width: 479px) {
    padding: 5px;
    background-color: dark-red;
  }
`;

export default class ImageGallery extends Component {
  state = {
    images: [],
    isLoaded: false
  };

  componentDidMount = () => {
    axios
      .get("/image/getimages")
      .then(test =>
        this.setState({ images: test.data.data.Contents, isLoaded: true })
      );
  };
  placeholderSrc(width, height) {
    return `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"%3E%3C/svg%3E`;
  }
  render() {
    const { images, isLoaded } = this.state;
    const newurl = "1544238831421.jpg";
    console.log(url + newurl);
    if (!isLoaded) {
      return <div>Loading...</div>;
    }
    return (
      <React.Fragment>
        <Carousel
          centerMode
          showThumbs={false}
          centerSlidePercentage={50}
          emulateTouch={true}
          autoPlay
          infiniteLoop
        >
          {images.map(image => (
            <div>
              <img src={url + image.Key} alt="test" />
            </div>
          ))}
        </Carousel>
      </React.Fragment>
    );
  }
}
