//import { Box, Button, Container, Paper, TextField, ThemeProvider } from "@mui/material"; /*import for material ui stuffs*/
import { AppBar, CssBaseline, Typography, Toolbar, Container, alpha, styled, InputBase, Grid, Button, Stack, Avatar, AvatarGroup} from "@mui/material";
import { useEffect, useState } from "react";
import { Component, useRef } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import ComplexGrid from "./ComplexGrid";
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios'

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));




function Home() {       /*main function that holds the others for creating the POST and the actual html of the page.*/
    //const [test, setTest] = useState([]);
    const test = 'Testing';
    const accessToken = localStorage.getItem('jwtToken');
    const apiUrl = 'http://localhost:3000/';

    const authAxios = axios.create({
        baseURL: apiUrl,
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })


    function home(user) {
        fetch("http://localhost:8080/home",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user)
            }).then((res2) => {
                const reader = res2.body.getReader();
                reader.read().then(({ value }) => {
                    const str = new TextDecoder("utf-8").decode(value);
                    if (str == null) {
                        return;
                    }
                    localStorage.setItem('jwtToken', str)
                    console.log("Token is: ", str)
                });
            })
    }
    /*useEffect(() => { I don't know if I need this yet, probably will later...
        document.getElementById('home').style.display = 'block';
    }, [])*/


    function buttonTest(name) {
        console.log("The " + name + " Button was pressed.")
    }

     function getProperties(properties) {
        fetch("https://cen4010-pms-backend.herokuapp.com/api/cuser/getProperties", {
            method: "GET",
            headers: { 'Authorization': 'Basic ' + localStorage.getItem('jwtToken') },
            body: JSON.stringify(properties)
        }).then((json) => {
            if (json.ok)
                console.log("Success!")
            console.log(json)
        }).catch(error => console.log(error))
    }

    function HomeDiv() {    /*This function holds the html of the page, gotta edit this to make it look nice. AppBar is the navbar, main holds the main content*/

        const [openAdd, setOpenAdd] = React.useState(false);
        const handleClickOpenAdd = () => {
            setOpenAdd(true);
        };
        const AddForm = useRef(null)
        const handleCloseAdd = (e) => {
            if (e.target.id === "AddBtn") {
                const form = AddForm.current
                const data = [form["propertyName"].value, form["propertyAddress"].value, form["propertyImage"].value]
                console.log(data)
            }
            setOpenAdd(false);
        };

        const [openAdmin, setOpenAdmin] = React.useState(false);
        const handleClickOpenAdmin = () => {
            setOpenAdmin(true);
            getProperties();
        };
        const CAForm = useRef(null)
        const handleCloseAdmin = (e) => {
            if (e.target.id === "CASendBtn") {
                const form = CAForm.current
                const data = form['ContactAdmin'].value
                console.log(data)
            }  
            setOpenAdmin(false);
        };

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
            <div>
                <CssBaseline />
                <AppBar position="relative">
                    <Toolbar>
                        <HomeIcon />

                        <Typography variant="h6">Home</Typography>

                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search Properties"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                        <Button onClick={() => buttonTest("Logout")} color="inherit">Logout</Button>
                        <Button onClick={handleClickOpenAdmin} color="inherit">Contact Admin</Button>
                    </Toolbar>
                    
                </AppBar>
                <main>
                    <div>
                        <Stack direction="row">
                            <Container maxWidth="lg">
                                <Stack direction="row">
                                    <Typography variant="h2" align="center" color="textPrimary" gutterBottom>Your Properties</Typography>
                                    <Button onClick={handleClickOpenAdd}>Add New Property</Button>
                                </Stack>
                                <Stack>
                                    {ComplexGrid()}
                                    {ComplexGrid()}
                                    {ComplexGrid()}
                                </Stack>
                            </Container>

                            <Container maxWidth="sm">
                                <Stack>
                                    <Typography variant="h2" align="center" color="textPrimary" gutterBottom>Your Profile</Typography>
                                    <Avatar alt="User First name" src="" sx={{ height: 256, width: 256, paddingleft: 100}} />
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
                            </Container>
                        </Stack>
                    </div>
                </main>

            </div>

            <div id="Add New Property Dialog">
                <Dialog open={openAdd} onClose={handleCloseAdd}>
                    <DialogTitle>Add New Property</DialogTitle>
                        <DialogContent>
                            <form ref={AddForm}>
                        <Grid>
                            <Grid item>
                                <img src="" alt="Property Image" />
                            </Grid>
                            <Grid item>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="propertyName"
                                    label="Property Name"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="propertyAddress"
                                    label="Address"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                />
                            </Grid>
                            <Grid item>
                                <Button variant="contained" component="label">
                                Upload Image
                                <input id="propertyImage" hidden accept="image/*" multiple type="file" />
                                </Button>
                            </Grid>
                                </Grid>
                                </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseAdd}>Cancel</Button>
                        <Button id="AddBtn" onClick={handleCloseAdd}>Add</Button>
                    </DialogActions>
                </Dialog>
                </div>

            <div id="Contact Admin Dialog">
                <Dialog open={openAdmin} onClose={handleCloseAdmin}>
                    <DialogTitle>Contact Admin</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Send a message to the Admin about your problem.
                        </DialogContentText>
                            <form ref={CAForm}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="ContactAdmin"
                                    label="Your Message..."
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    multiline
                                />
                            </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseAdmin}>Cancel</Button>
                        <Button id="CASendBtn" onClick={handleCloseAdmin}>Send</Button>
                    </DialogActions>
                </Dialog>
            </div>

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
    return (
        HomeDiv()
    );

    function getTFData(str) {
        console.log(str.target.value)
    }

}

export default Home;
