//import { Box, Button, Container, Paper, TextField, ThemeProvider } from "@mui/material"; /*import for material ui stuffs*/
import { Typography, Grid, Button, Stack, Paper, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import { useEffect, useState } from "react";
import { useRef } from 'react';
import React from 'react'

import EditIcon from '@mui/icons-material/Edit';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import CottageIcon from '@mui/icons-material/Cottage';

const AdminProfile = () => {

    const accessToken = 'Bearer' + localStorage.getItem("jwtToken");

    const [user, setUser] = useState([])

    const [users, setUsers] = useState([])

    const [currUser, setCurrUser] = useState([])

    useEffect(() => {
        fetch("https://cen4010-pms-backend.herokuapp.com/api/cuser/me", {
            method: "GET",
            headers: { 'Authorization': accessToken }
        })
            .then(res => res.json())
            .then((result) => {
                setUser(result)
            })
            .catch(err => {
                console.log(err)
                setUser([])
            });

        fetch("https://cen4010-pms-backend.herokuapp.com/api/admin/getAllUsers", {
            method: "GET",
            headers: { 'Authorization': accessToken }
        })
            .then(res => res.json())
            .then((result) => {
                setUsers(result)
            });
    }, [])

    async function removeUser(uEmail) {
        const user = { email: uEmail}
        const response = await fetch("https://cen4010-pms-backend.herokuapp.com/api/admin/deleteUserAccount", {
            method: "DELETE",
            headers: ({ "Content-Type": "application/json", 'Authorization': accessToken }),
            body: JSON.stringify(user)
        });
        const data = await response.json();
        console.log(data)
    }

    const [openRemoveUser, setOpenRemoveUser] = React.useState(false);
    const handleClickOpenRemoveUser = (uEmail) => {
        setCurrUser(uEmail);
        setOpenRemoveUser(true);
    };
    const handleCloseRemoveUser = (e) => {
        if (e.target.id === "RemoveUserBtn") {
            removeUser(currUser)
        }
        setOpenRemoveUser(false);
    }


    return (
        <>
            <Stack display="flex" sx={{ bm: 2 }}>
                <Typography variant="h2" align="center" color="textPrimary" gutterBottom>All User Profiles</Typography>
                <Stack direction="row">
                    <Stack display="flex" sx={{ justifyContent: "center" }}>
                        <Typography variant="h4" align="left" color="textPrimary" gutterBottom>Username: {user.username}</Typography>
                        <Typography variant="h4" align="left" color="textPrimary" gutterBottom>Email: {user.email}</Typography>
                    </Stack>
                </Stack>
            </Stack>
            <Stack>
                {users.map(cuser => (
                    <Paper
                        sx={{
                            p: 2,
                            margin: 'auto',
                            maxWidth: 500,
                            minWidth: 500,
                            flexGrow: 1,
                            backgroundColor: (theme) =>
                                theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                            mb: 1
                        }}
                    >
                        <Grid container spacing={2}>

                            <Grid item xs={12} sm container>
                                <Grid item xs container direction="column" spacing={2}>
                                    <Grid item xs>
                                        <Stack direction="row">
                                            <CottageIcon />
                                            <Typography gutterBottom variant="subtitle1" component="div" sx={{ ml: 1 }}>
                                                Name: {cuser.username}
                                            </Typography>
                                        </Stack>
                                        <Typography variant="body2" gutterBottom>
                                            Email: {cuser.email}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <IconButton onClick={() => handleClickOpenRemoveUser(cuser.email)} color="error" aria-label="Remove"><RemoveCircleIcon /></IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                ))}
            </Stack>

            <div id="Remove User Dialog">
                <Dialog open={openRemoveUser} onClose={handleCloseRemoveUser}>
                    <DialogTitle>Remove User</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you Sure?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseRemoveUser}>Cancel</Button>
                        <Button id="RemoveUserBtn" onClick={handleCloseRemoveUser}>Remove</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    )
}

export default AdminProfile;