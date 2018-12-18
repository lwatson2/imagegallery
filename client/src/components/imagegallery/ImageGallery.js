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
const InputContainer = styled.div`
  text-align: center;
  background-color: #007bff;
`;

const InputButton = styled.button`
  background-color: #902d41;
  color: white;
  border: none;
`;
const CustomInput = styled.input`
  width: 145px;
  border: none;
  padding-left: 6px;
`;
export default class ImageGallery extends Component {
  state = {
    images: [],
    isLoaded: false,
    slideIndex: ""
  };

  componentDidMount = () => {
    axios
      .get("/image/getimages")
      .then(all =>
        this.setState({ images: all.data.data.Contents, isLoaded: true })
      );
  };
  handleChange = e => {
    this.setState({ slideIndex: e.target.value });
  };
  handleSubmit = event => {
    const index = this.state.slideIndex;
    event.preventDefault();
    this.setState({ slideIndex: "" });
    const value = parseInt(index) - 1;
    this.slider.slickGoTo(value.toString());
    console.log(value);
  };

  render() {
    const { images, isLoaded } = this.state;
    const newurl = "1544238831421.jpg";
    let settings = {
      dots: true,
      arrows: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 2,
      autoplay: true,
      autoplaySpeed: 5000,
      pauseOnHover: true,
      cssEase: "linear",
      adaptiveHeight: true,
      responsive: [
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            swipeToSlide: true
          }
        },
        {
          breakpoint: 489,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            swipeToSlide: true,
            fade: true
          }
        }
      ]
    };
    if (!isLoaded) {
      return <div>Loading...</div>;
    }
    return (
      <Background>
        <InputContainer>
          <form onSubmit={this.handleSubmit}>
            <CustomInput
              value={this.state.slideIndex}
              onChange={this.handleChange}
              placeholder="Jump to image"
              type="number"
              min="0"
              max={this.state.images.length}
            />
            <InputButton>Submit</InputButton>
          </form>
        </InputContainer>
        <Slider ref={slider => (this.slider = slider)} {...settings}>
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
