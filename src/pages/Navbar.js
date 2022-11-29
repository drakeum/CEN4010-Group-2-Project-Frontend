import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import { AppBar, Typography, Toolbar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import { useNavigate } from "react-router-dom";


const Navbar = () => {

    let navigate = useNavigate();

    const [openAdmin, setOpenAdmin] = React.useState(false);
    const handleClickOpenAdmin = () => {
        setOpenAdmin(true);
    };

    const handleCloseAdmin = (e) => {
        setOpenAdmin(false);
    };

    function logout() {
        navigate('/')
        localStorage.removeItem('jwtToken')
    }

    return (
        <>
        <AppBar position="relative">
            <Toolbar>
                <HomeIcon />
                <Typography variant="h6" sx={{mx: 1}}>Home</Typography>
                <Button onClick={() => logout()} color="inherit">Logout</Button>
                <Button onClick={handleClickOpenAdmin} color="inherit">Contact Admin</Button>
            </Toolbar>

        </AppBar>

        <div id="Contact Admin Dialog">
                <Dialog open={openAdmin} onClose={handleCloseAdmin}>
                    <DialogTitle>Contact Admin</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            For questions or concerns, please email the admin: admin@outlook.com.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseAdmin}>Close</Button>
                    </DialogActions>
                </Dialog>
            </div>
            </>
    )
};

export default Navbar;
