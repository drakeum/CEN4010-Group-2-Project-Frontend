import * as React from 'react';
import { styled, Grid, Paper, Typography, ButtonBase, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Stack } from "@mui/material";
import { Component, useRef } from 'react';

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

export default function ComplexGrid() {

    const [openRemove, setOpenRemove] = React.useState(false);

    const handleClickRemoveOpen = () => {
        setOpenRemove(true);
    };

    const handleRemoveClose = (e) => {
        if (e.target.id == "RemoveBtn") {
            const data = true;
            console.log(data)
        }
        setOpenRemove(false);
    };

    const [openEdit, setOpenEdit] = React.useState(false);

    const handleClickEditOpen = () => {
        setOpenEdit(true);
    };
    const EditForm = useRef(null)
    const handleEditClose = (e) => {
        if (e.target.id === "EditApplyBtn") {
            const form = EditForm.current
            const data = [form["propertyName"].value, form["propertyAddress"].value, form["propertyImage"].value]
            console.log(data)
        }
        setOpenEdit(false);
    };

    return (
        <>
        <Paper
            sx={{
                p: 2,
                margin: 'auto',
                maxWidth: 500,
                flexGrow: 1,
                backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
            }}
        >
            <Grid container spacing={2}>
                <Grid item>
                    <ButtonBase sx={{ width: 128, height: 128 }}>
                        <Img alt="Property Pic" src="" />
                    </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <Typography gutterBottom variant="subtitle1" component="div">
                                Property Name
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                Address or Description
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Property ID or Date uploaded
                            </Typography>
                        </Grid>
                        <Grid item>
                                <Button onClick={handleClickEditOpen}>Edit</Button>
                        </Grid>
                    </Grid>
                    <Grid item>
                            <Button onClick={handleClickRemoveOpen}>Remove</Button>
                    </Grid>
                </Grid>
            </Grid>
            </Paper>

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
                        <Button onClick={handleEditClose}>Cancel</Button>
                        <Button id="EditApplyBtn" onClick={handleEditClose}>Apply</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
}