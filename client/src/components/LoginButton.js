import React from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = ({header, hover}) => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    console.log(isAuthenticated)
    return (
        <>
        {!isAuthenticated && (
            <Button header={header} hover={hover} onClick={() => loginWithRedirect()}>Log In</Button>
            )
        }
        </>
    )
};

const Button = styled.button`
    width: 200px;
    height: 30px;
    background-color: var(--background-color, white);
    color: var(--font-color, #333);
    font: inherit;
    border: none;
    cursor: pointer;
    font-weight: 700;

    ${({header}) => header && `--background-color: transparent; --font-color: white;`}

    ${({hover}) => hover && `--font-color: #333;`}
`;

export default LoginButton;