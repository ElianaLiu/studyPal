import styled from "styled-components";

const ErrorPage = () => {
    return (
        <Wrapper>
            <div>Please sign in to enable this feature.</div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
color: #fafafa;
font-size: 25px;
font-family:'Jost', sans-serif;
`

export default ErrorPage;