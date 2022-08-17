import styled, { keyframes } from "styled-components";
import video from "../data/video- background.mp4";

import { useNavigate } from "react-router-dom";
import LoginButton from "./LoginButton";
import { useAuth0 } from "@auth0/auth0-react";
import Header from "./Header";

// "/" route page component
// --------------------------------------------

const SignInPage = () => {
  const { isAuthenticated } = useAuth0();
  let navigate = useNavigate();

  return (
    <Wrapper>
      
      <VideoDiv>
        <Header />
        <Video src={video} autoPlay loop muted></Video>
        <ContentDiv>
          <ContentTitle>StudyPal</ContentTitle>
          <Content>
          StudyPal is a web application that saves a collection of questions from exercises, quizzes, and exams that you got wrong.  It helps you find your weak topics and identify which types of questions you missed.
          </Content>
          <ButtonDiv>
            {isAuthenticated? 
            <GoToYourPageButton onClick={() => {navigate("/homepage")}}>Go to your page</GoToYourPageButton>
          : <></>}
            <LoginButton header={false} />
            {/* <LogoutButton header={false}/> */}
          </ButtonDiv>
        </ContentDiv>
      </VideoDiv>
    </Wrapper>
  );
};

// --------------------------------------------

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const VideoDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative; ;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  position: absolute;
  object-fit: cover;
  z-index: -1;
`;

const slideleft = keyframes`
  0% {
      transform: translate(100px);
      opacity: 0;
    }

  100% {transform: translate(0px);
      opacity: 1; }
`

const ContentDiv = styled.div`
  z-index: 1;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  color: white;
  padding: 0 0 2% 2%;
  font-family:'Jost', sans-serif;
  animation: ${slideleft} 1s linear forwards;
`;

const Content = styled.p`
  margin-bottom: 5%;
  font-size: 24px;
`;

const ButtonDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const GoToYourPageButton = styled.button`
    width: 200px;
    height: 30px;
    background-color: var(--background-color, white);
    color: var(--font-color, #333);
    font: inherit;
    border: none;
    cursor: pointer;
    font-weight: 600;
    font-size: 18px;
    font-family:'Jost', sans-serif;
    border-radius: 40px;
`

const ContentTitle = styled.h1`
  font-size: 45px;
  margin-bottom: 5%;
`;


export default SignInPage;
