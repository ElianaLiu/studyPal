import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
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
    const navigate = useNavigate();

    // upload image to OCR API to extract the text
    const uploadImage = async (e, flag) => {
        // get uploaded file
        const file = e.target.files[0];
        // call convertBase64 function to convert the uploaded file
        const base64 = await convertBase64(file);
        
        // create a multip-part form data
        const formData = new FormData();
        formData.append('base64Image', base64);

        // call OCR api to extract text from base64 image file
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
            
            // check which input field corresponds to this file and update their value accordingly
            flag == 1 ? setQuestion(data.ParsedResults[0].ParsedText) : setAnswer(data.ParsedResults[0].ParsedText)
        })
        .catch((error) => {
            console.log(error);
        });
    }

    // convert image file to base64 string
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

    // submit a question to backend
    const submitQuestion = (e) => {
        e.preventDefault()

        // create an object containing all values from input fields
        const newQuestion = {
            stem: stem,
            subject: subject.toUpperCase(),
            question: question,
            answer: answer
        };

        // call add-question api to submit the question content
        fetch(`/api/add-question/${userId}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newQuestion)
        })
        .then(response => response.json())
        .then(data => {
            // change updateCollection value to trigger question collection update in GlobalContext
            setUpdateCollection(!updateCollection); 
        })
        .catch((error) => {
            console.log(error);
        });

        // reset all input fields
        setStem("");
        setSubject("");
        setQuestion("");
        setAnswer("");

        //nabigate to homepage
        navigate("/homepage");
    }

    return (
    <>
    <Wrapper>
        <VideoDiv>
            <Header />
            <Video src={video} autoPlay loop muted></Video>
        {(isAuthenticated && userId) ? 
        
            <Form>
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
                <Label>Subject</Label>
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