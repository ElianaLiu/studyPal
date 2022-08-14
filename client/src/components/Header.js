import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import logo from '../data/kisspng-education-school-logo-learning-teaching-5ac3affb224110.4004622015227740111403.png'
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'

const Header = () => {
    let navigate = useNavigate()
    return (
        <Nav>
            <Logo src={logo} onClick={() => navigate("/")}/>
            <UL>
                <MyCollection onClick={() => {navigate("/my-collections")}}>
                    My Collection
                </MyCollection>
                <AddQuestion onClick={() => {navigate("/add-question")}}>
                    Add Question
                </AddQuestion>
                <LoginButton header={true}/>
                <LogoutButton header={true}/>
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
width: 100%;
left: 0;
top: 0;
position: absolute;
`

const Logo = styled.img`
width: 5vw;
cursor: pointer;
`

const UL = styled.ul`

`

const MyCollection = styled.button`
width: 200px;
height: 30px;
background-color: transparent;
color: white;
font: inherit;
border: none;
cursor: pointer;
font-weight: 700;
margin-right: 20px;
`

const AddQuestion = styled.button`
width: 200px;
height: 30px;
background-color: transparent;
color: white;
font: inherit;
border: none;
cursor: pointer;
font-weight: 700;
margin-right: 20px;
`

export default Header;