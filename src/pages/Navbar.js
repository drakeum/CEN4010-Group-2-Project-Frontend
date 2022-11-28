import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import { AppBar, Typography, Toolbar, alpha, styled, InputBase, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

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


const Navbar = () => {

    let navigate = useNavigate();

    const [properties, setProperties] = useState([])
    const accessToken = 'Bearer' + localStorage.getItem("jwtToken");
    useEffect(() => {
        fetch("https://cen4010-pms-backend.herokuapp.com/api/cuser/getProperties", {
            method: "GET",
            headers: { 'Authorization': accessToken }
        })
            .then(res => res.json())
            .then((result) => {
                setProperties(result)
            })
            .catch(err => {
                console.log(err)
            });
    }, []);

    const [openAdmin, setOpenAdmin] = React.useState(false);
    const handleClickOpenAdmin = () => {
        setOpenAdmin(true);
    };

    const CAForm = useRef(null)
    const handleCloseAdmin = (e) => {
        setOpenAdmin(false);
    };

    const propNames = properties.map((property) => {
        return property.name
    });

    const handleSearch = (e) => {
        console.log(e.target.value)
        propNames.forEach((name) => {
            if (name === e.target.value)
                console.log("They Match!!") //instead show property names with links to their pages.
        })
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

                    <Typography variant="h6" sx={{ml: 1}}>Home</Typography>

                    <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search Properties"
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={handleSearch}
                    />
                </Search>
                <Button onClick={() => logout()} color="inherit">Logout</Button>
                <Button onClick={handleClickOpenAdmin} color="inherit">Contact Admin</Button>
            </Toolbar>

        </AppBar>

        <div id="Contact Admin Dialog">
                <Dialog open={openAdmin} onClose={handleCloseAdmin}>
                    <DialogTitle>Contact Admin</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            For questions or concerns, please email that admin: admin@outlook.com.
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
