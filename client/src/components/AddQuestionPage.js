import { useEffect, useState } from "react";
import styled from "styled-components";

const AddQuestionPage = () =>{
    const [stem, setStem] = useState("");
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

    return (<>
    <Wrapper>
        <Form onSubmit={handleSubmit}>
            <QuestionWrapper>
                <Label>ewf</Label>
                <InputStem
                    type='textarea'
                    value={stem}
                    onChange={(ev) => setStem(ev.target.value)} />
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
            <Input
                className="input"
                type='textarea'
                value={answer}
                onChange={(ev) => setAnswer(ev.target.value)} />
            <input 
                type="file"
                onChange={(e) => uploadImage(e, 2)} />
            </QuestionWrapper>
            <Submit type="submit" value="submit" />
        </Form>
    </Wrapper>
    </>)
};

const Wrapper = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: flex-end;
`;

const Label = styled.label`
`;

const Form = styled.form`
border: solid 2px black;
width: 90vw;
height: 70vh;
display: flex;
flex-direction: row;
justify-content: center;
align-items: flex-end;
`;

const QuestionWrapper = styled.div`
width: 45vw;
height: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;

const InputStem = styled.textarea`
`;

const Input = styled.textarea`
border: solid 2px red;
width: 45%;
height: 100%;
padding-top: 0;
font-size: 22px;

&:focus {
border-color:blue ;
border: 2px;
box-shadow: 2px 2px 8px blue;
}
`;

const Submit = styled.input`
height: 4vh;
width: 6vw;
background-color: hsl(258deg, 100%, 50%);
color: white;
font-size: 20px;
font-weight: 700;
border-radius: 20px;
margin-top: 16vh;
margin-left: 3vw;

&:disabled {
filter: contrast(40%);
};
`;

export default AddQuestionPage;