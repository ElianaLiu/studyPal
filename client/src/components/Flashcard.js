import { useState } from "react";
import styled from "styled-components";

const Flashcard = ({content}) => {
    const [flip, setFlip] = useState(false);

    return (
        <>
            <Card flip={flip} onClick={() => setFlip(!flip)}>
                <Front>
                    <Stem>
                        {content.stem}
                    </Stem>
                    <Question>
                        {content.question}
                    </Question>
                </Front> 
                <Back>
                    <Answer>
                        {content.answer}
                    </Answer>
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

border-radius: 0.25rem;
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
position: absolute;
padding: 1rem;
left: 0;
backface-visibility: hidden;
`

const Back = styled.div`
position: absolute;
transform: rotateY(180deg);
backface-visibility: hidden;
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