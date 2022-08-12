import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
const LogoutButton = () => {
    const { logout, isAuthenticated } = useAuth0();

    return (
        isAuthenticated && (
            <Button onClick={() => logout()}>Log Out</Button>
            )
        );
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
export default LogoutButton;