import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { DialogContent, DialogTitle, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import PrintIcon from '@mui/icons-material/Print';
import Dialog from '@mui/material/Dialog';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {
  useLocation,
  useNavigate,
  useParams
} from "react-router-dom";
import {useReactToPrint} from "react-to-print";

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }

  return ComponentWithRouterProp;
}

function PropertyPage(props) {
  
  console.warn(props);
  const printComponent = React.useRef();
  const Property_id = props.router.params.propertyId;
  const [properties, setProperties] = React.useState([]);

  const [currPid, setCurrPid] = React.useState([]);
  
  const accessToken = 'Bearer' + localStorage.getItem("jwtToken");

  const handlePrint = useReactToPrint({
    content: () => printComponent.current, 
  });

  React.useEffect(() => {
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



  async function editProperty(newPropertyName, newPropertyValue) {
    const property = { name: newPropertyName, value: Number(newPropertyValue) }
    const pidNum = Number(currPid)
    console.log(property);
    const response = await fetch(`https://cen4010-pms-backend.herokuapp.com/api/cuser/editProperty/${pidNum}`, {
        method: "PUT",
        headers: ({ "Content-Type": "application/json", 'Authorization': accessToken }),
        body: JSON.stringify(property)
    });
    const data = await response.json();
    console.log(data);
}

const [openEdit, setOpenEdit] = React.useState(false);
    const handleClickEditOpen = (e) => {
        setCurrPid(Property_id);
        setOpenEdit(true);
    };
    const EditForm = React.useRef(null);
    const handleEditClose = (e, pid) => {
        if (e.target.id === "EditApplyBtn") {
            const form = EditForm.current
            const data = [form["propertyName"].value, form["propertyValue"].value]
            console.log(data)
            editProperty(form["propertyName"].value, form["propertyValue"].value, pid)
        }
        setOpenEdit(false);
    };

    return (
    <>
    <Box ref={printComponent}>
    <h1
      style={{
        marginTop: 40,
        marginLeft: 35
      }}
    >{Property_id}</h1>
    <Stack direction="row">
    
    <Box
      component="img"
      sx={{
        width: 0.55,
        height: 0.5,
        marginTop: 3,
        marginLeft: 3.5
      }}
      alt="Property Image"
      src="https://i.imgur.com/IZedcI3.jpg"
    >
    </Box>
      <Typography
        paragraph = 'true'
        sx={{
          display: 'block',
          height: 0.4,
          width: 0.4,
          marginLeft: 3.5,
          marginTop: 3
        }}
        
      >

      </Typography>
    
    </Stack>
    <Stack direction="row">
        <Avatar
          alt="User Avatar"
          src="https://i.imgur.com/IZedcI3.jpg"
          sx={{width: 80, height: 80, marginTop: 3, marginLeft: 3.5}}
        />
        <Typography
          component={Stack}
          direction="column"
          sx={{
            marginLeft: 2,
            justifyContent: "center"
          }}
        >
          Owned by 
        </Typography>
    </Stack>
        <Stack direction="row" sx={{marginTop: 3, marginLeft: 3.5}}>
          <Button onClick={handleClickEditOpen}variant="contained" color="primary" style={{marginLeft: 3.5}}>Edit </Button>
          <Button variant="contained" color="warning" style={{marginLeft: 10}}>Delete</Button>
          <Button onClick={handlePrint} variant="contained" color="primary" style={{marginLeft: 10}} endIcon={<PrintIcon/>}>Print</Button>
        </Stack>
    </Box>
    
    
    <div id="Edit Property Dialog">
      <Dialog 
        open={openEdit} 
        onClose={handleEditClose}
        fullScreen
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleEditClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Button onClick={handleEditClose} variant="h6" component="div">
              CANCEL
            </Button>
            <Button id="EditApplyBtn" onClick={handleEditClose} autoFocus color="inherit" >
              SAVE
            </Button>
          </Toolbar>
        </AppBar>
        <DialogTitle variant="h4">EDIT PROPERTY</DialogTitle>
        <DialogContent>
          <form ref={EditForm}>
            <Grid>
              <Grid item>
                <Input
                  autoFocus
                  placeholder="Property Name"
                  id="propertyName"
                  label="Property Name"
                  type="text"
                  fullWidth
                  variant="standard"
                  sx={{marginTop: 2}}
                />
                <Input
                  autoFocus
                  placeholder="Property Value"
                  id="propertyValue"
                  label="Property Value"
                  type="number"
                  fullWidth
                  multiline
                  variant="standard"
                  sx={{marginTop: 4}}
                />
              </Grid>
              <Grid item>
                <Button sx={{marginTop: 4}} variant="contained" component="label">
                  Upload Image
                  <input id="propetyImage" hidden accept="image/*" multiple type="file" />
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </div>



    <div>

    </div>
    </>
  );
}

export default withRouter(PropertyPage);
