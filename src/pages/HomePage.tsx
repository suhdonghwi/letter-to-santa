import React from "react";
import styled from "styled-components/macro";

const Main = styled.main`
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  background-image: url("./images/snow.svg");
  background-repeat: no-repeat;
  background-position: center bottom;
  background-size: 60vh;
  background-color: #e9ecef;
`;

export default function HomePage() {
  return <Main>Hello</Main>;
}
