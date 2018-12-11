import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import "./ImageGallery.css";
import Slider from "react-slick";
const url = "https://s3-us-east-2.amazonaws.com/imagegallerynode/";

const Image = styled.img`
@media only screen and (max-width: 479px){
  height: inherit
  width: 100%
}
@media only screen and (min-width: 480px) and (max-width: 767px){
  height: inherit
  width: 100%
}
@media only screen and (min-width: 768px) and (max-width: 991px){
 height: inherit
}
@media only screen and (min-width: 992px) and (max-width: 1488px){
  height: inherit
}
@media only screen and (min-width: 1489px){
  height: inherit
}
  
  width: 100%
}
`;
const Container = styled.div`
  @media only screen and (max-width: 479px) {
    height: 300px;
    width: 100%;
  }
  @media only screen and (min-width: 480px) and (max-width: 767px) {
    height: 400px;
  }
  @media only screen and (min-width: 768px) and (max-width: 991px) {
    height: 400px;
  }
  height: 400px;
`;
const Background = styled.div``;

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
    let settings = {
      dots: true,
      arrows: true,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 2,
      adaptiveHeight: true,
      responsive: [
        {
          breakpoint: 700,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 489,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    console.log(url + newurl);
    if (!isLoaded) {
      return <div>Loading...</div>;
    }
    return (
      <Background>
        <Slider {...settings}>
          {images.map(image => (
            <Container>
              <Image src={url + image.Key} alt="test" />
            </Container>
          ))}
        </Slider>
      </Background>
    );
  }
}
