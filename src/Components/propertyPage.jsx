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

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    let name = useParams();
    return (
      <Component
        {...props}
        router={{ location, navigate, params, name }}
      />
    );
  }

  return ComponentWithRouterProp;
}

 function PropertyPage(props) {
   console.warn(props);
  return (
    <Box>
    <h1 
      style={{
        marginTop: 40,
        marginLeft: 35
      }}
    >{props.router.params.propertyId}</h1>
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
          <Button variant="contained" color="primary" style={{marginLeft: 3.5}}>Edit </Button>
          <Button variant="contained" color="warning" style={{marginLeft: 10}}>Delete</Button>
          <Button variant="contained" color="primary" style={{marginLeft: 10}} endIcon={<PrintIcon/>}>Print</Button>
        </Stack>
    </Box>
  );
}

export default withRouter(PropertyPage);
