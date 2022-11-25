//import { Box, Button, Container, Paper, TextField, ThemeProvider } from "@mui/material"; /*import for material ui stuffs*/
import { Typography, Grid, Button, Stack, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useRef } from 'react';
//import "../styles/Home.css";
import ComplexGrid from "./ComplexGrid";
import React from 'react'

//import xtype from 'xtypejs'

const UserProperties = () => {

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
        console.log(data)
    }

    async function getProperties(properties) {
        const response = await fetch("https://cen4010-pms-backend.herokuapp.com/api/cuser/getProperties", {
            method: "GET",
            headers: { 'Authorization': accessToken }
        });
        const data = await response.json();
        console.log(data)
        return data
    }

    const [openAdd, setOpenAdd] = React.useState(false);
    const handleClickOpenAdd = () => {
        setOpenAdd(true);
    };
    const AddForm = useRef(null)
    const handleCloseAdd = (e) => {
        if (e.target.id === "AddBtn") {
            const form = AddForm.current
            const data = [form["propertyName"].value, form["propertyValue"].value]
            console.log(data)
            addProperty(form["propertyName"].value, form["propertyValue"].value)
        }
        setOpenAdd(false);
    };

    return (
        <>
            <Stack direction="row">
                <Typography variant="h2" align="center" color="textPrimary" gutterBottom>Your Properties</Typography>
                <Button onClick={handleClickOpenAdd}>Add New Property</Button>
            </Stack>
            <Stack>
                {ComplexGrid("Property Value", "Property Name")}
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
        </>
    )
};

export default UserProperties;