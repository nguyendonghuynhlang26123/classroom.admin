import React from 'react';
import { errorPageSx } from './style';
import { Container, Grow, Paper, Typography, Box, Button, Divider } from '@mui/material';
import { useNavigate } from 'react-router';

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <Box sx={errorPageSx.root}>
      <Grow appear={true} in={true} timeout={500}>
        <Container sx={errorPageSx.container}>
          <Paper elevation={0} square sx={errorPageSx.paper}>
            <Typography variant="h1">4☹4</Typography>
            <Typography variant="h4" sx={errorPageSx.paper_title}>
              Page not found
            </Typography>
            <Divider />
            <Button onClick={() => navigate('/')}>Go back to Home page </Button>
          </Paper>
        </Container>
      </Grow>
    </Box>
  );
};

export default NotFoundPage;
