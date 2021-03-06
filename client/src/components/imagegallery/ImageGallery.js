import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import "./ImageGallery.css";
import Slider from "react-slick";
import Modal from "./../modal/Modal";

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
    height: 370px;
    width: 100%;
  }
  @media only screen and (min-width: 480px) and (max-width: 767px) {
    height: 468px;
  }
  @media only screen and (min-width: 768px) and (max-width: 991px) {
    height: 479px;
  }
  height: 500px;
`;
const Background = styled.div`
  @media only screen and (max-width: 767px) {
    height: 400px;
  }
  height: 500px;
`;

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
  color: hsl(209, 35%, 98%);
  border: 0;
  border-radius: 10px;
  cursor: pointer;
`;

export default class ImageGallery extends Component {
  state = {
    images: [],
    isLoaded: false,
    slideIndex: "",
    isShowing: false,
    image: "",
    isDeleted: false,
    test: ""
  };
  componentDidMount = () => {
    this.getImages();
  };

  componentDidUpdate = (prevState, prevProps) => {
    if (this.state.isDeleted === true) {
      this.getImages();
    }
  };
  getImages = async () => {
    await axios.get("/image/getimages").then(all => {
      this.setState({
        images: all.data.images,
        isLoaded: true,
        isDeleted: false
      });
    });
  };
  showModal = image => {
    this.setState({ isShowing: true, image: image.Key });
  };

  closeModal = () => {
    this.setState({ isShowing: false });
  };
  deletedItem = () => {
    this.setState({ isShowing: false, isDeleted: true });
  };
  render() {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    const { images, isLoaded } = this.state;
    let settings = {
      dots: false,
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
            swipeToSlide: true
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
            <Container key={image.Key}>
              <Image src={image.Link} alt="test" />
              {isLoggedIn ? (
                <ModalContainer>
                  <ModalBtn
                    key={image.Key}
                    onClick={() => this.showModal(image)}
                  >
                    Delete
                  </ModalBtn>
                </ModalContainer>
              ) : null}
            </Container>
          ))}
        </Slider>
        <Modal
          className="modal"
          show={this.state.isShowing}
          close={this.closeModal}
          image={this.state.image}
          delete={this.deletedItem}
          test={this.state.test}
          userEmail={this.props.userEmail}
        >
          Are you sure you want to delete this item?
        </Modal>
      </Background>
    );
  }
}
