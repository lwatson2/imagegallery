import React from "react";
import styled from "styled-components";
const QuoteStyle = styled.h2`
  font-family: "Arizonia", cursive;
`;
const QuoteContainer = styled.div`
  position: relative;
  top: 62px;
  @media only screen and (min-width: 768px) and (max-width: 991px) {
    left: 102px;
    width: 600px;
  }
  @media only screen and (min-width: 992px) {
    width: 600px;
    left: 400px;
  }
`;
const Quote = props => {
  return (
    <QuoteContainer>
      <QuoteStyle>
        What I like about photographs is that they capture a moment that's gone
        forever, impossible to reproduce"
      </QuoteStyle>
    </QuoteContainer>
  );
};
export default Quote;
