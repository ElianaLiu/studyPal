import React from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    console.log(isAuthenticated)
    return (
        <>
        {!isAuthenticated && (
            <Button onClick={() => loginWithRedirect()}>Log In</Button>
            )
        }
        </>
    )
};

const Button = styled.button`
    width: 200px;
    height: 30px;
    background-color: white;
    color: black;
    font: inherit;
    border: none;
    cursor: pointer;
    font-weight: 700;
`;

export default LoginButton;