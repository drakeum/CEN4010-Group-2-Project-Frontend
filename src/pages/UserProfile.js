//import { Box, Button, Container, Paper, TextField, ThemeProvider } from "@mui/material"; /*import for material ui stuffs*/
import { AppBar, CssBaseline, Typography, Toolbar, Container, alpha, styled, InputBase, Grid, Button, Stack, Avatar, AvatarGroup } from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import { Component, useRef } from 'react';
//import "../styles/Home.css";
import ComplexGrid from "./ComplexGrid";
import React from 'react'
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios'

const UserProfile = () => {

    const [openEditUser, setOpenEditUser] = React.useState(false);
    const handleClickOpenEditUser = () => {
        setOpenEditUser(true);
    };
    const EditUserForm = useRef(null)
    const handleCloseEditUser = (e) => {
        if (e.target.id === "EditUserBtn") {
            const form = EditUserForm.current
            const data = [form["Username"].value, form["UserFirstName"].value, form["UserLastName"].value, form["UserEmail"].value, form["UserCurrentPassword"].value, form["UserNewPassword"].value, form["UserConfirmPassword"].value, form["EditUserProfileImage"].value]
            console.log(data)
        }
        setOpenEditUser(false);
    };

    const [openAddUser, setOpenAddUser] = React.useState(false);
    const handleClickOpenAddUser = () => {
        setOpenAddUser(true);
    };
    const AddUserForm = useRef(null)
    const handleCloseAddUser = (e) => {
        if (e.target.id === "AddUserBtn") {
            const form = AddUserForm.current
            const data = form['OUserEmail'].value
            console.log(data)
        }
        setOpenAddUser(false);
    };

    return (
        <>
            <Stack>
                <Typography variant="h2" align="center" color="textPrimary" gutterBottom>Your Profile</Typography>
                <Avatar alt="User First name" src="" sx={{ height: 256, width: 256, paddingleft: 100 }} />
                <Typography variant="paragraph" align="center" color="textPrimary" gutterBottom>Username, real name, email, etc.</Typography>
                <Button onClick={handleClickOpenEditUser}>Edit User Profile</Button>
                <Button onClick={handleClickOpenAddUser}>Grant User Access</Button>
                <Typography variant="paragraph" align="center" color="textPrimary" gutterBottom>Users with access to this page:</Typography>
                <AvatarGroup max={2}>
                    <Avatar alt="User First name" src="" />
                    <Avatar alt="User First name" src="" />
                    <Avatar alt="User First name" src="" />
                    <Avatar alt="User First name" src="" />
                </AvatarGroup>
            </Stack>

            <div id="Edit User Profile Dialog">
                <Dialog open={openEditUser} onClose={handleCloseEditUser}>
                    <DialogTitle>Edit User Profile</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Need to add textfield for the different user info stuff.
                        </DialogContentText>
                        <form ref={EditUserForm}>
                            <Grid>
                                <Grid item>
                                    <img src="" alt="Profile Image" />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="Username"
                                        label="Username"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="UserFirstName"
                                        label="First name"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="UserLastName"
                                        label="Last name"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="UserEmail"
                                        label="Email"
                                        type="email"
                                        fullWidth
                                        variant="standard"
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="UserCurrentPassword"
                                        label="Current Password"
                                        type="password"
                                        fullWidth
                                        variant="standard"
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="UserNewPassword"
                                        label="New Password"
                                        type="password"
                                        fullWidth
                                        variant="standard"
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="UserConfirmPassword"
                                        label="Confirm New Password"
                                        type="password"
                                        fullWidth
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" component="label">
                                        Upload Image
                                        <input id="EditUserProfileImage" hidden accept="image/*" multiple type="file" />
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseEditUser}>Cancel</Button>
                        <Button id="EditUserBtn" onClick={handleCloseEditUser}>Apply</Button>
                    </DialogActions>
                </Dialog>
            </div>
            <div id="Add User Dialog">
                <Dialog open={openAddUser} onClose={handleCloseAddUser}>
                    <DialogTitle>Grant Other User Access</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Add User via email. A Confirmation email will be sent to both you and the other user.
                        </DialogContentText>
                        <form ref={AddUserForm}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="OUserEmail"
                                label="Email Address"
                                type="email"
                                fullWidth
                                variant="standard"
                            />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseAddUser}>Cancel</Button>
                        <Button id="AddUserBtn" onClick={handleCloseAddUser}>Send</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
        )
}

export default UserProfile;