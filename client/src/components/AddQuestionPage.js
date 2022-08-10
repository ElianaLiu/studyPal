import { useState } from "react";
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

        // fetch("/api/tweet", requestOptions)
        // .then(response => response.json())
        // .then(data => {
        //     console.log(data);
        //     setUpdateFeed(!updateFeed);
        // });
        // setValue("");
    };

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
            </QuestionWrapper>
            <Input
                className="input"
                type='textarea'
                value={answer}
                onChange={(ev) => setAnswer(ev.target.value)} />
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