import React, { useState } from "react";
import styled from "styled-components/macro";
import Swal from "sweetalert2";
import firebase from "firebase";

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

const Form = styled.form`
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

  &.loading {
    background-color: #adb5bd;
  }
`;

function generateKey(existingKeys: string[]) {
  let result: string;
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  do {
    result = "";
    for (let i = 0; i < 5; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
  } while (existingKeys.includes(result));

  return result;
}

export default function GeneratePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;

    let trimmedName = name.trim();
    let trimmedEmail = email.trim();

    if (trimmedName.length === 0) {
      Swal.fire({
        icon: "error",
        title: "다시 확인해주세요!",
        text: "이름을 입력해주세요.",
        heightAuto: false,
      });
      return;
    }

    if (trimmedEmail.length === 0) {
      Swal.fire({
        icon: "error",
        title: "다시 확인해주세요!",
        text: "이메일을 입력해주세요.",
        heightAuto: false,
      });
      return;
    }

    setLoading(true);

    const dataSnapshot = await firebase.database().ref("data").once("value");
    const key = generateKey(Object.keys(dataSnapshot.val()));

    await firebase
      .database()
      .ref(`data/${key}`)
      .set({ name: trimmedName, email: trimmedEmail });

    setLoading(false);
    setName("");
    setEmail("");

    const link = "https://official.christmas/" + key;
    Swal.fire({
      icon: "success",
      title: "성공!",
      html: `생성된 링크 : <a href="${link}">${link}</a><br/>위 링크를 복사해서 아이에게 보내주세요.`,
      heightAuto: false,
    });
  }

  return (
    <Main>
      <Title>산타 할아버지께 편지 🎄</Title>
      <Description>
        아이들이 받고 싶은 크리스마스 선물들을 편지에 써서 전송하면 미리
        등록해두신 이메일 주소로 전송됩니다. 아이들의 크리스마스 선물 구입에
        참고해보시고, 행복한 연말 보내세요!
      </Description>

      <Form onSubmit={onSubmit}>
        <Label htmlFor="name">착한 아이 이름</Label>
        <Input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Label htmlFor="email">보낼 이메일 주소</Label>
        <Input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Submit
          type="submit"
          value="링크 생성"
          className={loading ? "loading" : ""}
        />
      </Form>
    </Main>
  );
}
