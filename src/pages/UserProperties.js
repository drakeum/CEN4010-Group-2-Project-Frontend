//import { Box, Button, Container, Paper, TextField, ThemeProvider } from "@mui/material"; /*import for material ui stuffs*/
import { Typography, Grid, Button, Stack, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Chip, Paper } from "@mui/material";
import { ButtonBase, styled } from "@mui/material";
import { useRef, useState, useEffect } from 'react';
import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import EditIcon from '@mui/icons-material/Edit';
import CottageIcon from '@mui/icons-material/Cottage';

//import xtype from 'xtypejs'

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

const UserProperties = () => {

    const [properties, setProperties] = useState([])

    const [currPid, setCurrPid] = useState([])

    useEffect(() => {
        fetch("https://cen4010-pms-backend.herokuapp.com/api/cuser/getProperties", {
            method: "GET",
            headers: { 'Authorization': accessToken }
        })
            .then(res => res.json())
            .then((result) => {
                setProperties(result)
            });
    }, []);

    const accessToken = 'Bearer' + localStorage.getItem("jwtToken");
    async function addProperty(propertyName, propertyValue) {
        //console.log(xtype(propertyName))
        //console.log(xtype(Number(propertyValue)))
        const property = { name: propertyName, value: propertyValue }
        console.log(property);
        const response = await fetch("https://cen4010-pms-backend.herokuapp.com/api/cuser/addProperty", {
            method: "POST",
            headers: ({ "Content-Type": "application/json", 'Authorization': accessToken }),
            body: JSON.stringify(property)
        });
        const data = await response.json();
        console.log(data)   //need to add some way of rerendering the page so that the new property will show...
    }

    const [openAdd, setOpenAdd] = React.useState(false);
    const handleClickOpenAdd = () => {
        setOpenAdd(true);
    };
    const AddForm = useRef(null)
    const handleCloseAdd = (e) => {
        if (e.target.id === "AddBtn") {
            const form = AddForm.current
            //const data = [form["propertyName"].value, form["propertyValue"].value]
            //console.log(data)
            addProperty(form["propertyName"].value, form["propertyValue"].value)
        }
        setOpenAdd(false);
    };

    async function editProperty(newPropertyName, newPropertyValue) { //need a way to give the complex grid the property id...
        const property = { name: newPropertyName, value: Number(newPropertyValue) }
        const pidNum = Number(currPid)
        console.log(property);
        const response = await fetch(`https://cen4010-pms-backend.herokuapp.com/api/cuser/editProperty/${pidNum}`, {
            method: "PUT",
            headers: ({ "Content-Type": "application/json", 'Authorization': accessToken }),
            body: JSON.stringify(property)
        });
        const data = await response.json();
        console.log(data)
    }

    async function removeProperty() {
        const response = await fetch("https://cen4010-pms-backend.herokuapp.com/api/cuser/removeProperty/", {
            method: "DELETE",
            headers: ({ "Content-Type": "application/json", "Authorization": accessToken }),
            body: JSON.stringify(currPid)
        });
        const data = await response.json();
        console.log(data)
    }


    const [openRemove, setOpenRemove] = React.useState(false);

    const handleClickRemoveOpen = (id) => {
        setCurrPid(id)
        setOpenRemove(true);
    };

    const handleRemoveClose = (e) => {
        if (e.target.id == "RemoveBtn") {
            const data = true;
            console.log(data)
            removeProperty(20)
        }
        setOpenRemove(false);
    };

    const [openEdit, setOpenEdit] = React.useState(false);
    const handleClickEditOpen = (id) => {
        setCurrPid(id)
        setOpenEdit(true);
    };
    const EditForm = useRef(null)
    const handleEditClose = (e, pid) => {
        if (e.target.id === "EditApplyBtn") {
            const form = EditForm.current
            const data = [form["propertyName"].value, form["propertyValue"].value]
            console.log(data)
            editProperty(form["propertyName"].value, form["propertyValue"].value, pid)   //need a way to get the correct pid
        }
        setOpenEdit(false);
    };

    function formatDate(date) {
        const formattedDate = date.substring(5,7) + "/" + date.substring(8,10) + "/" + date.substring(0,4)
        return formattedDate;
    }

    return (
        <>
            <Stack direction="row" sx={{my: 1}}>
                <Typography variant="h2" align="center" color="textPrimary" gutterBottom>Your Properties</Typography>
                <Button variant="contained" size="medium" align="right" sx={{ml: 5}} onClick={handleClickOpenAdd}><AddIcon/> Add Property</Button>
            </Stack>
            <Stack>
                    {properties.map(property => (
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
                                                <Typography gutterBottom variant="subtitle1" component="div" sx={{ml: 1}}>
                                                {property.name}
                                            </Typography>
                                            </Stack>
                                            <Typography variant="body2" gutterBottom>
                                                Value: ${property.itemValue.toFixed(2)}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {formatDate(property.creationDate)}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Button onClick={() => handleClickEditOpen(property.id)}><EditIcon />Edit</Button>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Button onClick={() => handleClickRemoveOpen(property.id)} color="error"><RemoveCircleIcon /></Button>
                                    </Grid>
                                </Grid>
                            </Grid> 
                        </Paper>
                    ))}
                
            </Stack>

            <div id="Add New Property Dialog">
                <Dialog open={openAdd} onClose={handleCloseAdd}>
                    <DialogTitle>Add New Property</DialogTitle>
                    <DialogContent>
                        <form ref={AddForm}>
                            <Grid>
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
                                        id="propertyValue"
                                        label="Property Value"
                                        type="number"
                                        fullWidth
                                        variant="standard"
                                    />
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

            <div id="Remove Property Dialog">
                <Dialog open={openRemove} onClose={handleRemoveClose}>
                    <DialogTitle>Remove Property</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you Sure?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleRemoveClose}>Cancel</Button>
                        <Button id="RemoveBtn" onClick={handleRemoveClose}>Remove</Button>
                    </DialogActions>
                </Dialog>
            </div>

            <div id="Edit Property Dialog">
                <Dialog open={openEdit} onClose={handleEditClose}>
                    <DialogTitle>Edit Property</DialogTitle>
                    <DialogContent>
                        <form ref={EditForm}>
                        <Grid>
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
                                    id="propertyValue"
                                    label="Value"
                                    type="number"
                                    fullWidth
                                    variant="standard"
                                />
                            </Grid>
                            </Grid>
                            </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleEditClose}>Cancel</Button>
                        <Button id="EditApplyBtn" onClick={handleEditClose}>Apply</Button>
                    </DialogActions>
                </Dialog>
            </div>

        </>
    )
};

export default UserProperties;