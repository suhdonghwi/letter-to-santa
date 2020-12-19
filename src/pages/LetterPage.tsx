import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import { RouteComponentProps, useHistory } from "react-router-dom";
import firebase from "firebase";
import Swal from "sweetalert2";
import emailjs from "emailjs-com";

const Main = styled.main`
  min-height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 3rem 2rem;
  box-sizing: border-box;
`;

const LoadingText = styled.p`
  font-size: 1.5rem;
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

export default function LetterPage({
  match,
}: RouteComponentProps<{ key: string }>) {
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const key = match.params.key;
  const history = useHistory();

  useEffect(() => {
    async function fetch() {
      const keySnapshot = await firebase.database().ref("data").once("value");
      if (!keySnapshot.hasChild(key)) {
        history.push("/");
        return;
      }

      const dataSnapshot = await firebase
        .database()
        .ref(`data/${key}`)
        .once("value");
      const data = dataSnapshot.val();

      if (data.sent) {
        history.push("/");
        return;
      }

      setName(data.name);
      setEmail(data.email);
      setLoading(false);
    }

    fetch();
  });

  async function onYes() {
    if (sending) return;
    if (content.trim().length < 10) {
      Swal.fire({
        icon: "error",
        title: "오류",
        text: "편지 내용이 너무 짧아요! 조금 더 입력해주세요.",
        heightAuto: false,
      });
      return;
    }

    const params = {
      from_name: name,
      to_email: email,
      message: content,
    };

    try {
      setSending(true);
      await emailjs.send("service_axuu45f", "template_fl5v0ub", params);
      await firebase.database().ref(`data/${key}/sent`).set(true);
      await Swal.fire({
        icon: "success",
        title: "성공!",
        text:
          "산타 할아버지께 편지를 보냈어요! 크리스마스까지 잘 기다릴 수 있죠?",
        heightAuto: false,
      });

      history.push("/");
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "오류",
        text: "편지를 보내기에 실패했어요. 이따가 다시 써주세요!",
        heightAuto: false,
      });

      setSending(false);
    }
  }

  function onNo() {
    if (sending) return;
    Swal.fire({
      icon: "error",
      title: "이런..",
      text: "산타 할아버지께서는 착한 아이에게만 소중한 선물을 준답니다.",
      heightAuto: false,
    });
  }

  return (
    <Main>
      {loading ? (
        <LoadingText>로딩중 ...</LoadingText>
      ) : (
        <>
          <Title>산타 할아버지께 편지 🎄</Title>
          <Description>
            {name} 친구! 올해는 산타 할아버지께 어떤 선물을 받고 싶나요? 산타
            할아버지께 쓰고 싶은 말과 함께 적어보아요! 정성스럽게 적을수록 산타
            할아버지께서 좋아하실 거예요!
          </Description>
          <Form>
            <Label htmlFor="letter">편지 내용</Label>
            <LetterInput
              name="letter"
              rows={13}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <Label>올해 정말 착하게 살았나요?</Label>
            <YesNo>
              <YesNoButton
                color={sending ? "#adb5bd" : "#20c997"}
                onClick={onYes}
              >
                네!
              </YesNoButton>
              <YesNoButton
                color={sending ? "#adb5bd" : "#ff6b6b"}
                onClick={onNo}
              >
                아니요..
              </YesNoButton>
            </YesNo>
          </Form>
        </>
      )}
    </Main>
  );
}
