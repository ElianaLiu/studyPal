import React from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = ({header}) => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    console.log(isAuthenticated)
    return (
        <>
        {!isAuthenticated && (
            <Button header={header} onClick={() => loginWithRedirect()}>Log In</Button>
            )
        }
        </>
    )
};

const Button = styled.button`
    width: 200px;
    height: 30px;
    background-color: var(--background-color, white);
    color: var(--font-color, black);
    font: inherit;
    border: none;
    cursor: pointer;
    font-weight: 700;

    ${({header}) => header && `--background-color: transparent; --font-color: white;`}
`;

export default LoginButton;