import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import PrintIcon from '@mui/icons-material/Print';

export default function PropertyPage() {
  return (
    <Box>
    <h1 
      style={{
        marginTop: 40,
        marginLeft: 35
      }}
    >PROPERTY NAME</h1>
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
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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