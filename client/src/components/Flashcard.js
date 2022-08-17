import { useContext, useState } from "react";
import styled from "styled-components";
import { GlobalContext } from "./GlobalContext";

const Flashcard = ({content}) => {
    const { userId, updateCollection, setUpdateCollection } = useContext(GlobalContext);
    const [flip, setFlip] = useState(false);

    const flipCard = (e) => {
        if (e.target.name === 'delete') {
            e.preventDefault();
            e.stopPropagation();
        } else {
            setFlip(!flip)
        }
    }

    const deleteQuestion = () => {
        const question = {
            _id: content._id
        };

        fetch(`/api/delete-question/${userId}`, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(question)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setUpdateCollection(!updateCollection)
        })
        .catch((error) => {
            console.log(error);
        });
    }

    return (
        <>
        {/* creating a flip card with 2 sides */}
            <Card flip={flip} onClick={(e) => flipCard(e)}>
                <Front>
                    <Stem>
                        {content.stem}
                    </Stem>
                    <Question>
                        {content.question}
                    </Question>
                    <DeleteBtn name="delete" onClick={() => {deleteQuestion()}}/>
                </Front> 
                <Back>
                    <Answer>
                        {content.answer}
                    </Answer>
                    <DeleteBtn name="delete" onClick={() => {deleteQuestion()}} />
                </Back>
            </Card>
        </>
    )
}

const Card = styled.div`
display: flex;
justify-content: center;
align-items: center;
position: relative;

border-radius: 40px;
box-shadow: 0 0 5px 2px gray;
background-color: white;
width: 300px;
height: 300px;

transition: 300ms;
transform-style: preserve-3d;
transform: perspective(1000px) rotateY(var(--rotate-y, 0));

cursor: pointer;
margin: 8px;

&:hover {
box-shadow: 0 0 5px 2px black;
translate: 2px;
}

${({flip}) => flip && `--rotate-y: 180deg;`}
`

const Front = styled.div`
width: 260px;
height: 260px;
position: absolute;
padding: 1rem;
left: 0;
backface-visibility: hidden;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`
// creating an X button
const DeleteBtn = styled.button`
background: white;
width: 30px;
height: 30px;
position: absolute;
right: 10px;
bottom: 10px;
border: none;
cursor: pointer;

&::after{
content: '';
height: 30px;
border-left: 1px solid #333;
position: absolute;
transform: rotate(45deg);
left: 12px;  
top: 0;
}

&::before{
content: '';
height: 30px;
border-left: 1px solid #333;
position: absolute;
transform: rotate(-45deg);
left: 12px;
top: 0;
}

&:hover {
border-radius: 50rem;
transform: scale(1.5);
transition: 0.5s;
}
`

const Back = styled.div`
width: 260px;
height: 260px;
position: absolute;
transform: rotateY(180deg);
backface-visibility: hidden;
display: flex;
justify-content: center;
align-items: center;
`

const Stem = styled.div`
margin-bottom: 20px;
font-weight: 700;
`

const Question = styled.div`
margin-bottom: 10px;
line-height: 1.2;
`

const Answer = styled.div`

`

export default Flashcard;