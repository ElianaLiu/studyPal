import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import logo from '../data/kisspng-education-school-logo-learning-teaching-5ac3affb224110.4004622015227740111403.png'
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'

const Header = () => {
    let navigate = useNavigate()

    const [hover, setHover] = useState(false)
    
    return (
        <Nav onMouseEnter={()=>{setHover(true)}} onMouseLeave={() => {setHover(false)}}>
            <Logo src={logo} onClick={() => navigate("/")}/>
            <UL>
                <Button onClick={() => {navigate("/my-collections")}}>
                    My collections
                </Button>
                <Button onClick={() => {navigate("/add-question")}}>
                    Add a question
                </Button>
                <LoginButtonDiv>
                    <LoginButton header={true} hover={hover} />
                    <LogoutButton header={true} hover={hover}/>
                </LoginButtonDiv>
            </UL>
        </Nav>
    )
}

const Wrapper = styled.div`

`

const Nav = styled.nav`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
width: 100%;
height: 100px;
left: 0;
top: 0;
position: absolute;
transition: background 1s;

&:hover{
background: rgba(255,255,255, 0.8);
}
`

const Logo = styled.img`
width: 5vw;
cursor: pointer;
margin: 20px;
`

const UL = styled.div`
display: flex;
flex-direction: row;
`

const Button = styled.button`
width: 200px;
height: 30px;
background-color: transparent;
color: #fafafa;
font: inherit;
border: none;
cursor: pointer;
font-weight: 600;
margin-right: 20px;
font-family:'Jost', sans-serif;
font-size: 18px;

${Nav}:hover &{
    color: #333;
}
`
const LoginButtonDiv = styled.div`
${Nav}:hover &{
    color: #333;
}
`

export default Header;