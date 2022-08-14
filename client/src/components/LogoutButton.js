import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const LogoutButton = ({header}) => {
    const { logout, isAuthenticated } = useAuth0();

    return (
        isAuthenticated && (
            <Button header={header} onClick={() => logout()}>Log Out</Button>
            )
        );
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
export default LogoutButton;