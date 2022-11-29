import { CssBaseline, Container, Stack } from "@mui/material";
import React from 'react'
import AdminNavbar from './AdminNavbar';
import AdminProperties from './AdminProperties';
import AdminProfile from './AdminProfile';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';




function AdminHome() {

    const accessToken = 'Bearer' + localStorage.getItem("jwtToken");

    let navigate = useNavigate();

    useEffect(() => {
        fetch("https://cen4010-pms-backend.herokuapp.com/api/cuser/getRole", {
            method: "GET",
            headers: { 'Authorization': accessToken }
        })
            .then(res => res.json())
            .then((result) => {
                if (result[0] !== "ROLE_ADMIN")
                    navigate('/')
        });

        if (localStorage.getItem("jwtToken") === "undefined")
            navigate('/')
    }, []);

    function AdminHomeDiv() {

        return (
            <div>
                <CssBaseline />
                <AdminNavbar />
                <main>
                    <div>
                        <Stack direction="row">
                            <Container maxWidth="lg">
                                <AdminProperties />
                            </Container>

                            <Container maxWidth="sm">
                                <Stack>
                                    <AdminProfile />
                                </Stack>
                            </Container>
                        </Stack>
                    </div>
                </main>

            </div>
        )

    }
    return (
        AdminHomeDiv()
    );

}

export default AdminHome;