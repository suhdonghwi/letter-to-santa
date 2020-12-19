import React from "react";
import styled from "styled-components/macro";

const Main = styled.main`
  min-height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 3rem 2rem;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-family: "NanumBarunpen";
  font-size: 3rem;
  color: #212529;

  margin: 0.5rem 0;

  @media screen and (max-width: 560px) {
    font-size: 1.7rem;
  }
`;

const Description = styled.p`
  font-family: "NanumBarunpen";
  font-size: 1.4rem;

  color: #868e96;
  max-width: 40rem;
  margin: 2rem 0 3rem 0;

  @media screen and (max-width: 560px) {
    font-size: 1rem;
    margin: 1.5rem 0 3rem 0;
  }
`;

const Form = styled.div`
  width: 30rem;

  @media screen and (max-width: 560px) {
    width: 20rem;
  }

  @media screen and (max-width: 350px) {
    width: 16rem;
  }
`;

const Label = styled.label`
  display: block;

  font-family: "NanumBarunpen";
  color: #212529;
  font-size: 1.1rem;

  margin-bottom: 0.5rem;
`;

const LetterInput = styled.textarea`
  background-color: #f1f3f5;
  border: none;
  border-radius: 10px;

  font-family: "NanumBarunpen";
  font-size: 1.2rem;
  padding: 1rem;

  width: 100%;
  box-sizing: border-box;

  margin-bottom: 2rem;
  resize: vertical;
  outline: none;
`;

const YesNo = styled.div`
  display: flex;
  margin-top: 1rem;
`;

const YesNoButton = styled.button<{ color: string }>`
  cursor: pointer;
  outline: none;

  flex: 1;

  background-color: ${(props) => props.color};
  appearance: none;

  padding: 0.5rem 0;
  color: white;

  font-family: "NanumBarunpen";
  font-size: 1.2rem;

  border: none;
  border-radius: 10px;

  margin: 0 0.5rem;
`;

export default function LetterPage() {
  return (
    <Main>
      <Title>산타 할아버지께 편지 🎄</Title>
      <Description>
        올해는 산타 할아버지께 어떤 선물을 받고 싶나요? 산타 할아버지께 쓰고
        싶은 말과 함께 적어보아요! 정성스럽게 적을수록 산타 할아버지께서
        좋아하실 거예요!
      </Description>
      <Form>
        <Label htmlFor="letter">편지 내용</Label>
        <LetterInput name="letter" rows={13} />
        <Label>올해 정말 착하게 살았나요?</Label>
        <YesNo>
          <YesNoButton color="#20c997">네!</YesNoButton>
          <YesNoButton color="#ff6b6b">아니요..</YesNoButton>
        </YesNo>
      </Form>
    </Main>
  );
}
