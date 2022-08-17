import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import Flashcard from "./Flashcard";
import { GlobalContext } from "./GlobalContext";
import './collection.css'
import ErrorPage from "./ErrorPage";
import Header from "./Header";
import video from "../data/video- background.mp4";

const MyCollectionPage = () => {
    const {questionCollection, subjectList, status} = useContext(GlobalContext);
    const { isAuthenticated } = useAuth0();  
    const [selectedQuestions, setSelectedQuestions] = useState(null)
    
    const handleClick = (e, subject) => {
        e.preventDefault()

        if (subject === "All") {
            setSelectedQuestions(null);
        } else {
            let newQuestionArray = questionCollection.filter((question) => {
                console.log(question.subject)
                return question.subject === subject;
            });
            setSelectedQuestions(newQuestionArray);
        }
    }

    return(
        <>
        <Wrapper>
            <VideoDiv>
                <Header />
                <Video src={video} autoPlay loop muted></Video>

        {/* if user already logged in, then questionCollections will show */}
            {isAuthenticated ?
            <ContentWrapper>
                {(questionCollection && subjectList && status === "idle") &&
                <QuestionsDiv>
                    <BtnDiv>
                        <Btn
                            onClick={(e) => {handleClick(e, "All")}}>
                            All
                        </Btn>
                        {/* <Btn>All</Btn>
                        <Btn>MATH</Btn>
                        <Btn>ENGLISH</Btn> */}
                        {subjectList.map((subject) => {
                            return (
                                <Btn
                                    onClick={(e) => {handleClick(e, subject)}}>
                                    {subject}
                                </Btn>)
                        })}
                    </BtnDiv> 
                    {selectedQuestions ? <Questions>
                        {selectedQuestions.map((item) => {
                            return <Flashcard content={item} />;
                        })}
                    </Questions> : <Questions>
                        {questionCollection.map((item) => {
                            return <Flashcard content={item} />;
                        })}
                    </Questions>}
                </QuestionsDiv>}
                {status === "loading" && 
                <Loading>
                    <Circle /> 
                </Loading>}
            </ContentWrapper>
            :
            <ErrorPage />}
        </VideoDiv>
        </Wrapper>
        </>
    )
};

const Wrapper = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: flex-end;
width: 100vw;
`;

const VideoDiv = styled.div`
width: 100%;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
position: relative; 
`;

const Video = styled.video`
width: 100%;
height: 100%;
position: absolute;
object-fit: cover;
z-index: -1;
`;

const ContentWrapper = styled.div`
position: absolute;
width: 100%;
top: 100px;
`

const QuestionsDiv = styled.div`
display: flex;
flex-direction: column;
`

const Questions = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
align-items: center;
justify-content: center;
position: absolute;
top: 100px;
width: 100%;
`

const BtnDiv = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
width: 100%;
height: 90px;
position: absolute;
top: 10px;
`

const Btn = styled.button`
width:fit-content;
height: 30px;
margin-right: 50px;
background: transparent;
color: #fafafa;
border: solid 1px #fafafa;
border-radius: 10px;
font-weight: 600;
cursor: pointer;

&:focus {
    background-color: rgba(0, 0, 0, 0.8);
}
`

const Loading = styled.div`

`

const circleSpin = keyframes`
0% { transform: rotate(0deg); }
100% { transform: rotate(360deg); }
`

const Circle = styled.div`
border: 8px solid #f3f3f3;
border-top: 8px solid #3498db;
border-radius: 50%;
width: 150px;
height: 150px;
animation: ${circleSpin} 1s ease-in-out infinite;
margin: 0 auto;
`

export default MyCollectionPage;