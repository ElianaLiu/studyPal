import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const LogoutButton = ({header, hover}) => {
    const { logout, isAuthenticated } = useAuth0();

    return (
        isAuthenticated && (
            <Button header={header} hover={hover} onClick={() => logout()}>Log Out</Button>
            )
        );
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
    font-size: 18px;
    font-family:'Jost', sans-serif;

    ${({header}) => header && `--background-color: transparent; --font-color: white;`}

    ${({hover}) => hover && `--font-color: #333;`}
`;
export default LogoutButton;