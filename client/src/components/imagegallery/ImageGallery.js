import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import "./ImageGallery.css";
import Slider from "react-slick";
import Modal from "./../modal/Modal";
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

const ModalContainer = styled.div`
  width: 250px;
  margin: 0 auto;
  padding: 6px 0px 10px 0px;
`;
const ModalBtn = styled.button`
  display: block;
  background-color: #ff2323;
  min-width: 100%;
  outline: 0;
  border: 0;
  border-radius: 10px;
`;

export default class ImageGallery extends Component {
  state = {
    images: [],
    isLoaded: false,
    slideIndex: "",
    isShowing: false
  };
  componentDidMount = () => {
    let reversed = [];
    axios.get("/image/getimages").then(all => {
      reversed = all.data.data.Contents.reverse();
      this.setState({ images: reversed, isLoaded: true });
    });
  };
  showModal = () => {
    this.setState({ isShowing: true });
  };
  closeModal = () => {
    this.setState({ isShowing: false });
  };
  render() {
    const { images, isLoaded } = this.state;
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
        {this.state.isShowing ? (
          <div onClick={this.closeModal} className="back-drop" />
        ) : null}
        <Slider ref={slider => (this.slider = slider)} {...settings}>
          {images.map(image => (
            <Container>
              <Image
                onClick={() => console.log("this")}
                src={url + image.Key}
                alt="test"
              />
              <ModalContainer>
                <ModalBtn onClick={this.showModal}>Delete</ModalBtn>
              </ModalContainer>
            </Container>
          ))}
        </Slider>
        <Modal
          className="modal"
          show={this.state.isShowing}
          close={this.closeModal}
        >
          Are you sure you want to delete this item?
        </Modal>
      </Background>
    );
  }
}
