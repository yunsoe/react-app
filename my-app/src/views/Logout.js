import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Button } from "react-bootstrap";


export default function Logout() {
    const logout = () => {
        localStorage.clear();
        window.location.replace("http://localhost:3000/login");
    };

    return(
        <div
            style={{
                height: "20vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Button variant="primary" onClick={logout}>Confirm</Button>
        </div>
    )
}