import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import "./ImageGallery.css";
import Slider from "react-slick";
const url = "https://s3-us-east-2.amazonaws.com/imagegallerynode/";

const Image = styled.img`
  height: 400px;
}
`;
const Background = styled.div`
backgroundPosition: 'center',
backgroundSize: 'cover',
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
    let settings = {
      dots: true,
      arrows: true,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1
    };
    console.log(url + newurl);
    if (!isLoaded) {
      return <div>Loading...</div>;
    }
    return (
      <div className="carousel-container">
        <Slider {...settings}>
          {images.map(image => (
            <div>
              <Image src={url + image.Key} alt="test" />
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}
