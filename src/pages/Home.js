import {  CssBaseline, Container, Stack } from "@mui/material";
import React from 'react'
import Navbar from './Navbar';
import UserProperties from './UserProperties';
import UserProfile from './UserProfile';

function Home() {

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