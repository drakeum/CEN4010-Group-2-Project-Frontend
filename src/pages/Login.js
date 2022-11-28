import { Box, Button, Paper, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Grid } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    let navigate = useNavigate();
        

    function login(user) {
        fetch("https://cen4010-pms-backend.herokuapp.com/api/login",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user)
            }).then((res2) => {
                const reader = res2.body.getReader();
                reader.read().then(({ value }) => {
                    const str = new TextDecoder("utf-8").decode(value);
                    const strJ = JSON.parse(str);
                    if (str == null) {
                        return;
                    }
                    localStorage.setItem('jwtToken', strJ.token)
                    console.log("Token is: ", strJ.token)
                    navigate('/home')
                });
            })
    }

    async function registerUser(username, email, password) {
        const user = { username: username, email: email, password: password }
        const response = await fetch("https://cen4010-pms-backend.herokuapp.com/api/register", {
            method: "POST",
            headers: ({ "Content-Type": "application/json" }),
            body: JSON.stringify(user)
        });
        const data = await response.json();
        console.log(data)
    }

    useEffect(() => {
        document.getElementById('login').style.display = 'block';
    }, [])

    const handleClick = (e) => {
        if (e.target.id === 'loginbutton') {
            e.preventDefault();
            const user = { email: email, password: password };
            login(user);
        }
        else if (e.target.id === 'swap') {
            setOpen(true);
        }
    }

    const [open, setOpen] = useState(false);

    const registerForm = useRef(null)
    const handleCloseRegister = (e) => {
        if (e.target.id === "registerBtn") {
            const form = registerForm.current
            const data = [form["Username"].value, form["Email"].value, form["CreatePassword"].value, form["ConfirmPassword"].value]
            console.log(data)
            if (form["CreatePassword"].value === form["ConfirmPassword"].value) {
                console.log("Match")
                registerUser(form["Username"].value, form["Email"].value, form["CreatePassword"].value)
            }
        }
        setOpen(false);
    };

    function LoginDiv() {
        return (
            <>
            <div>
                <Box className="center">
                    <div id="login">
                        <Paper elevation={3} className="paper_container">
                            <h1 color="primary" className="center"> Login</h1>
                            <Box component="form" sx={{ '& > :not(style)': { m: 1 }, }} noValidate autoComplete="off">
                                {/* TextField is used to take input from the user, When it is changed, the name is updated through setName */}
                                <TextField label="Email" variant="outlined" fullWidth value={email}
                                    onChange={(e) => setEmail(e.target.value)} />
                                <TextField label="Password" variant="outlined" type="password" fullWidth
                                    value={password} onChange={(e) => setPassword(e.target.value)} />
                            </Box>
                            {/* Button is used to submit the form When it is clicked, handleClick is called */}
                            <div className="center">
                                <Button id="loginbutton" variant="contained" color="primary" style={{ margin: '2%' }}
                                    onClick={handleClick}>Log In</Button>
                                    <Button id="swap" color="primary" onClick={handleClick}>Don't have an account?</Button>
                            </div>
                        </Paper>
                    </div>
                </Box>
                </div>

                <div id="Edit User Profile Dialog">
                <Dialog open={open} onClose={handleCloseRegister}>
                    <DialogTitle>Create Your Profile</DialogTitle>
                    <DialogContent>
                        <form ref={registerForm}>
                            <Grid>
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
                                        id="Email"
                                        label="Email"
                                        type="email"
                                        fullWidth
                                        variant="standard"
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="CreatePassword"
                                        label="Password"
                                        type="password"
                                        fullWidth
                                        variant="standard"
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="ConfirmPassword"
                                        label="Confirm Password"
                                        type="password"
                                        fullWidth
                                        variant="standard"
                                    />
                                </Grid>
                            </Grid>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseRegister}>Cancel</Button>
                            <Button id="registerBtn" variant="contained" onClick={handleCloseRegister}>Register</Button>
                    </DialogActions>
                </Dialog>
            </div>
            </>
        )

    }
    return (
        <Paper style={{ height: "100vh" }}>
            {LoginDiv()}
        </Paper>
    );
}

export default Login;