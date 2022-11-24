//import { Box, Button, Container, Paper, TextField, ThemeProvider } from "@mui/material"; /*import for material ui stuffs*/
import {  CssBaseline, Container, Stack } from "@mui/material";
import React from 'react'
import Navbar from './Navbar';
import UserProperties from './UserProperties';
import UserProfile from './UserProfile';

function Home() {       /*main function that holds the others for creating the POST and the actual html of the page.*/

    function HomeDiv() {    /*This function holds the html of the page, gotta edit this to make it look nice. AppBar is the navbar, main holds the main content*/

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