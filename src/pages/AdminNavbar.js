import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import { AppBar, Typography, Toolbar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";


const AdminNavbar = () => {

    let navigate = useNavigate();

    function logout() {
        navigate('/')
        localStorage.removeItem('jwtToken')
    }

    return (
        <>
            <AppBar position="relative">
                <Toolbar>
                    <HomeIcon />
                    <Typography variant="h6" sx={{ mx: 1 }}>Home</Typography>
                    <Button onClick={() => logout()} color="inherit">Logout</Button>
                </Toolbar>

            </AppBar>
        </>
    )
};

export default AdminNavbar;
