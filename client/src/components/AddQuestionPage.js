import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import ErrorPage from "./ErrorPage";
import { GlobalContext } from "./GlobalContext";
import Header from "./Header";
import video from "../data/video- background.mp4";

const AddQuestionPage = () =>{
    const { userId, updateCollection, setUpdateCollection } = useContext(GlobalContext);
    const { isAuthenticated } = useAuth0();

    const [stem, setStem] = useState("");
    const [subject, setSubject] = useState("");
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault()

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({question: question, answer: answer})
        };

        // fetch("https://api.ocr.space/parse/image")
        // .then(response => response.json())
        // .then(data => {
        //     console.log(data);
        //     setUpdateFeed(!updateFeed);
        // });
        // setValue("");
    };

    const uploadImage = async (e, flag) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        console.log(base64);
        console.log(process.env.REACT_APP_OCR_APIKEY)
        
        const formData = new FormData();
        formData.append('base64Image', base64)

        fetch("https://api.ocr.space/parse/image", {
            // mode: 'no-cors',
            method: "POST",
            headers: {
                apikey: process.env.REACT_APP_OCR_APIKEY
            },
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.ParsedResults[0].ParsedText);
            
            flag == 1 ? setQuestion(data.ParsedResults[0].ParsedText) : setAnswer(data.ParsedResults[0].ParsedText)
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = ((error) => {
                reject(error)
            });
        })
    }

    const submitQuestion = (e) => {
        e.preventDefault()

        const newQuestion = {
            stem: stem,
            subject: subject.toUpperCase(),
            question: question,
            answer: answer
        };

        console.log(newQuestion);

        fetch(`/api/add-question/${userId}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newQuestion)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.data);
            setUpdateCollection(!updateCollection);
        })
        .catch((error) => {
            console.log(error);
        });

        setStem("");
        setSubject("");
        setQuestion("");
        setAnswer("");
    }

    return (
    <>
    <Wrapper>
        <VideoDiv>
            <Header />
            <Video src={video} autoPlay loop muted></Video>
        {(isAuthenticated && userId) ? 
        
            <Form onSubmit={handleSubmit}>
                <QuestionWrapper>
                    <Label>Stem</Label>
                    <InputStem
                        type='textarea'
                        value={stem}
                        onChange={(ev) => setStem(ev.target.value)} />
                    <Label>Question</Label>
                    <Input
                        className="input"
                        type='textarea'
                        value={question}
                        onChange={(ev) => setQuestion(ev.target.value)} /> 
                    <input 
                    type="file"
                    onChange={(e) => uploadImage(e, 1)} />          
                </QuestionWrapper>
                <QuestionWrapper>
                <Label>Category</Label>
                <InputStem
                    type='textarea'
                    value={subject}
                    onChange={(ev) => setSubject(ev.target.value)} />
                <Label>Answer</Label>
                <Input
                    className="input"
                    type='textarea'
                    value={answer}
                    onChange={(ev) => setAnswer(ev.target.value)} />
                <input 
                    type="file"
                    onChange={(e) => uploadImage(e, 2)} />
                </QuestionWrapper>
                <Submit
                type="submit"
                value="submit"
                onClick={submitQuestion}
                disabled={(question === "" || answer === "" || subject === "")} />
            </Form>:
        <ErrorPage />}
        </VideoDiv>
        </Wrapper>
    </>)
};

const Wrapper = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: flex-end;
width: 100vw;
height: 100vh;
`;

const VideoDiv = styled.div`
width: 100%;
height: 100%;
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

const Label = styled.label`
font-weight: 700;
font-size: larger;
`;

const Form = styled.form`
width: 80vw;
height: 70vh;
display: flex;
flex-direction: row;
justify-content: center;
align-items: flex-end;
color: wheat;
`;

const QuestionWrapper = styled.div`
width: 45vw;
height: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
color: #fafafa;
`;

const InputStem = styled.textarea`
margin-bottom: 5px;
width: 25vw;
border-radius: 10px;
background-color: rgba(255,255,255, 0.8);
`;

const Input = styled.textarea`
width: 45%;
height: 100%;
padding-top: 0;
font-size: 22px;
margin-bottom: 10px;
width: 25vw;
border-radius: 10px;
background-color: rgba(255,255,255, 0.8);


&:focus {
border-color:blue ;
border: 2px;
box-shadow: 2px 2px 8px blue;
}
`;

const Submit = styled.input`
height: 30px;
width: 150px;
background-color: #fafafa;
color: #333;
font-size: 20px;
font-weight: 700;
border-radius: 20px;
margin-top: 16vh;
margin-left: 3vw;
cursor: pointer;

&:disabled {
filter: contrast(40%);
};
`;

export default AddQuestionPage;