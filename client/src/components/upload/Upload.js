import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";

const UploadWrapper = styled.div`
  @media only screen and (max-width: 479px) {
    position: relative;
    top: 45px;
    width: 234px;
  }
  position: relative;
  top: 100px;
  width: 300px;
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
  left: 59px
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
    left: 50px;
  }
`;

const FileForm = styled.form`
  position: relative;
  right: 15px;
  // Mobile styles
  @media only screen and (max-width: 479px) {
    right: 42px;
  }
`;
export default class Upload extends Component {
  state = {
    value: "Upload file...",
    submitted: false
  };
  componentDidMount = () => {
    const value = "C:\fakepathDestiny-2.jpg";
    console.log(/[^\\]*$/.exec(value)[0]);
  };

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
    console.log(this.state);
  };
  handleSubmit = e => {
    e.preventDefault();
  };
  render() {
    return (
      <UploadWrapper>
        <FileForm
          action="/images/upload"
          method="post"
          encType="multipart/form-data"
        >
          <div>
            <FileLabel>
              <InputUpload
                onChange={this.handleFile}
                type="file"
                id="file"
                name="file"
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
