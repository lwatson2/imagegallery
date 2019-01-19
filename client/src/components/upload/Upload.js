import React, { Component } from "react";
import styled from "styled-components";

const UploadWrapper = styled.div`
  @media only screen and (max-width: 479px) {
    position: relative;
    top: 45px;
    width: 300px;
  }
  @media only screen and (min-width: 480px) and (max-width: 768px) {

  }

  position: relative;
  width: 400px
  top: 100px;
  border: 2px solid #0099cc;
  border-radius: 6px;
  padding: 50px 4px 82px 66px;
  margin: 0 auto;
`;
const InputUpload = styled.input`
  opacity: 0;
`;
const CustomFile = styled.span`
  &::before {
    background-color: #eee;
    position: absolute;
    top: -0.075rem;
    right: -0.075rem;
    bottom: -0.075rem;
    z-index: 6;
    display: block;
    content: "Browse";
    height: 2.5rem;
    padding: 0.5rem 1rem;
    line-height: 1.5;
    color: #555;
    color: ${props => props.inputColor};
    border: 0.075rem solid #ddd;
    border-radius: 0 0.25rem 0.25rem 0;
  }
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: 5;
  height: 2.5rem;
  padding: 0.5rem 1rem;
  line-height: 1.5;
  color: #555;
  background-color: #fff;
  border: 0.075rem solid #ddd;
  border-radius: 0.25rem;
  box-shadow: inset 0 0.2rem 0.4rem rgba(0, 0, 0, 0.05);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  @media only screen and (max-width: 479px) {
    width: 269px;
  }
`;
const FileLabel = styled.label`
  position: relative;
  display: inline-block;
  cursor: pointer;
  height: 2.5rem;
`;
const FileSubmit = styled.button`
  color: #0099cc;
  background: transparent;
  border: 2px solid #0099cc;
  border-radius: 6px;
  position: relative;
  top: 50px;
  left: 77px
  padding: 16px 32px;
  text-align: center;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.5s;
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  &:hover {
    background-color: #008cba;
    color: white;
  }
  @media only screen and (max-width: 479px) {
    background-color: #008cba;
    color: white;
    top: 50px;
    left: 68px;
  }
  @media only screen and (min-width: 480px) and (max-width: 768px){
    background-color: #008cba;
    color: white;
    top: 50px;
    left: 68px;
  }
`;

const FileForm = styled.form`
  position: relative;
  right: 15px;
  // Mobile styles
  @media only screen and (max-width: 479px) {
    right: 50px;
  }
`;
export default class Upload extends Component {
  state = {
    value: "Upload file...",
    submitted: false
  };
  componentDidMount = () => {};

  handleFile = e => {
    let n = e.target.value;
    let result = /[^\\]*$/.exec(n)[0];
    this.setState(prev => ({
      value: result,
      submitted: !prev.submitted
    }));
    setTimeout(() => {
      this.setState(prev => ({ submitted: prev.submitted }));
    }, 1000);
  };
  handleSubmit = e => {
    this.props.history.push("/");
  };
  render() {
    return (
      <UploadWrapper>
        <FileForm
          action="/image/image-upload"
          method="post"
          encType="multipart/form-data"
        >
          <div>
            <FileLabel>
              <InputUpload
                onChange={this.handleFile}
                type="file"
                id="image"
                name="image"
              />
              <CustomFile>
                {this.state.submitted ? this.state.value : "Upload file..."}
              </CustomFile>
            </FileLabel>
          </div>
          <FileSubmit type="submit" value="Submit">
            Submit
          </FileSubmit>
        </FileForm>
      </UploadWrapper>
    );
  }
}
