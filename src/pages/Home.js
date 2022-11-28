import {  CssBaseline, Container, Stack } from "@mui/material";
import React from 'react'
import Navbar from './Navbar';
import UserProperties from './UserProperties';
import UserProfile from './UserProfile';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';




function Home() {

    const accessToken = 'Bearer' + localStorage.getItem("jwtToken");

    let navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("jwtToken") === "undefined")
            navigate('/')

        fetch("https://cen4010-pms-backend.herokuapp.com/api/cuser/getRole", {
            method: "GET",
            headers: { 'Authorization': accessToken }
        })
            .then(res => res.json())
            .then((result) => {
                if (result[0] === "ROLE_ADMIN")
                    navigate('/AdminHome')
            });
    }, []);

    function HomeDiv() {

        return (
            <div>
                <CssBaseline />
                <Navbar />
                <main>
                    <div>
                        <Stack direction="row">
                            <Container maxWidth="lg">
                                <UserProperties />
                            </Container>

                            <Container maxWidth="sm">
                                <Stack>
                                    <UserProfile />
                                </Stack>
                            </Container>
                        </Stack>
                    </div>
                </main>

            </div>
        )

    }
    return (
        HomeDiv()
    );

}

export default Home;