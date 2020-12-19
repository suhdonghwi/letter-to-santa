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
  margin: 2rem 0 5rem 0;

  @media screen and (max-width: 560px) {
    font-size: 1rem;
    margin: 1.5rem 0 3rem 0;
  }
`;

const Form = styled.div`
  width: 17rem;
`;

const Label = styled.label`
  display: block;

  font-family: "NanumBarunpen";
  color: #212529;
  font-size: 1.1rem;

  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  background-color: #e9ecef;
  border: none;
  border-radius: 10px;

  font-family: "NanumBarunpen";
  font-size: 1.2rem;
  padding: 0.6rem 0.7rem;

  width: 100%;
  box-sizing: border-box;

  margin-bottom: 2rem;
`;

const Submit = styled.input`
  cursor: pointer;

  font-family: "NanumBarunpen";

  appearance: none;
  background-color: #12b886;

  border: none;
  border-radius: 10px;

  padding: 0.5rem 1rem;
  font-size: 1.1rem;
  color: white;
  width: 100%;
`;

export default function GeneratePage() {
  return (
    <Main>
      <Title>산타 할아버지께 편지 🎄</Title>
      <Description>
        아이들이 갖고 싶은 선물들을 편지에 써서 전송하면 이메일 주소로
        전송됩니다. 크리스마스 선물 구입에 참고해보세요 :)
      </Description>

      <Form>
        <Label htmlFor="name">착한 아이 이름</Label>
        <Input type="text" name="name" />
        <Label htmlFor="email">보낼 이메일 주소</Label>
        <Input type="email" name="email" />

        <Submit type="submit" value="링크 생성" />
      </Form>
    </Main>
  );
}
