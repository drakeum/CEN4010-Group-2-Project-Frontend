//import { Box, Button, Container, Paper, TextField, ThemeProvider } from "@mui/material"; /*import for material ui stuffs*/
import { Typography, Grid, Button, Stack, Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { useRef } from 'react';
import React from 'react'
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import EditIcon from '@mui/icons-material/Edit';

const UserProfile = () => {

    const accessToken = 'Bearer' + localStorage.getItem("jwtToken");

    const [user, setUser] = useState([])

    useEffect(() => {
        fetch("https://cen4010-pms-backend.herokuapp.com/api/cuser/me", {
            method: "GET",
            headers: { 'Authorization': accessToken }
        })
            .then(res => res.json())
            .then((result) => {
                setUser(result)
        });
    }, [])

    

    async function editUser(username, oldPass, newPass) {
        const user = {username: username, oldPassword: oldPass, newPassword: newPass}
        const response = await fetch("https://cen4010-pms-backend.herokuapp.com/api/cuser/editAccount", {
            method: "PUT",
            headers: ({ "Content-Type": "application/json", 'Authorization': accessToken }),
            body: JSON.stringify(user)
        });
        const data = await response.json();
        console.log(data)
    }

    async function addUser(otherUserEmail) {
        const otherUser = { email: otherUserEmail }
        const response = await fetch("https://cen4010-pms-backend.herokuapp.com/api/cuser/share", {
            method: "POST",
            headers: ({ "Content-Type": "application/json", 'Authorization': accessToken }),
            body: JSON.stringify(otherUser)
        });
        const data = await response.json();
        console.log(data)
    }

    async function removeUser(otherUserEmail) {
        const otherUser = { email: otherUserEmail }
        const response = await fetch("https://cen4010-pms-backend.herokuapp.com/api/cuser/unshare", {
            method: "POST",
            headers: ({ "Content-Type": "application/json", 'Authorization': accessToken }),
            body: JSON.stringify(otherUser)
        });
        const data = await response.json();
        console.log(data)
    }


    const [openEditUser, setOpenEditUser] = React.useState(false);
    const handleClickOpenEditUser = () => {
        setOpenEditUser(true);
    };
    const EditUserForm = useRef(null)
    const NewPassField = useRef(null)
    const NewPassConfirm = useRef(null)
    const handleCloseEditUser = (e) => {
        if (e.target.id === "EditUserBtn") {
            const form = EditUserForm.current
            const data = [form["Username"].value, form["UserCurrentPassword"].value, form["UserNewPassword"].value, form["UserConfirmPassword"].value]
            console.log(data)
            if (NewPassField.value === NewPassConfirm.value) {  //this should be changed to check if the passwords match BEFORE the apply button is clicked.
                console.log("Passwords match!")
                if (data[0] == "" && form["UserNewPassword"].value != "")
                    editUser(user.username, form["UserCurrentPassword"].value, form["UserNewPassword"].value);
                else if (form["UserNewPassword"].value == "" && form["username"].value != "")
                    editUser(form["Username"].value, form["UserCurrentPassword"].value, form["UserCurrentPassword"].value);
                else if (form["UserNewPassword"].value != "" && form["Username"].value != "")
                    editUser(form["Username"].value, form["UserCurrentPassword"].value, form["UserNewPassword"].value);
                else
                    return;
            }
            
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
            addUser(data)
        }
        setOpenAddUser(false);
    };

    const [openRemoveUser, setOpenRemoveUser] = React.useState(false);
    const handleClickOpenRemoveUser = () => {
        setOpenRemoveUser(true);
    };
    const RemoveUserForm = useRef(null)
    const handleCloseRemoveUser = (e) => {
        if (e.target.id === "RemoveUserBtn") {
            const form = RemoveUserForm.current
            const data = form['OUserEmail'].value
            console.log(data)
            removeUser(data)
        }
        setOpenRemoveUser(false);
    }


    return (
        <>
            <Stack display="flex" sx={{ bm: 2 }}>
                <Typography variant="h2" align="center" color="textPrimary" gutterBottom>Your Profile</Typography>
                <Stack direction="row">
                    <Stack display="flex" sx={{ justifyContent: "center" }}>
                        <Typography variant="h4" align="left" color="textPrimary" gutterBottom>Username: {user.username}</Typography>
                        <Typography variant="h4" align="left" color="textPrimary" gutterBottom>Email: {user.email}</Typography>
                    </Stack>
                </Stack>
                <Button onClick={handleClickOpenEditUser}><EditIcon /> Edit Profile</Button>
                <Button onClick={handleClickOpenAddUser}><AddIcon /> Grant Access</Button>
                <Button onClick={handleClickOpenRemoveUser}><RemoveIcon />Revoke Access</Button>
            </Stack>

            <div id="Edit User Profile Dialog">
                <Dialog open={openEditUser} onClose={handleCloseEditUser}>
                    <DialogTitle>Edit User Profile</DialogTitle>
                    <DialogContent>
                        <form ref={EditUserForm}>
                            <Grid>
                                <Grid item>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="Username"
                                        label="New Username"
                                        type="text"
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
                                        ref={NewPassField}
                                        autoFocus
                                        margin="dense"
                                        id="UserNewPassword"
                                        label="New Password"
                                        type="password"
                                        fullWidth
                                        variant="standard"
                                    />
                                    <TextField
                                        ref={NewPassConfirm}
                                        autoFocus
                                        margin="dense"
                                        id="UserConfirmPassword"
                                        label="Confirm New Password"
                                        type="password"
                                        fullWidth
                                        variant="standard"
                                    />
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
                            Grant a user access to this page via their email.
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

            <div id="Remove User Dialog">
                <Dialog open={openRemoveUser} onClose={handleCloseRemoveUser}>
                    <DialogTitle>Revoke Other User Access</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Enter the email of the user you wish to no longer have access to this page.
                        </DialogContentText>
                        <form ref={RemoveUserForm}>
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
                        <Button onClick={handleCloseRemoveUser}>Cancel</Button>
                        <Button id="RemoveUserBtn" onClick={handleCloseRemoveUser}>Send</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
        )
}

export default UserProfile;
