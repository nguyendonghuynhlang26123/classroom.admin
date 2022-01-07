import { Stack, Typography, Button, Box } from '@mui/material';
import React from 'react';
import { NoResourceDisplayProps } from './type';
import Kite from 'assets/images/kite.svg';
import { styleSx } from './style';

export const NoResourceDisplay = ({ title, description, img = Kite, direction = 'column', onClick }: NoResourceDisplayProps) => {
  return (
    <Stack direction={direction === 'column' ? 'column' : 'row-reverse'} sx={styleSx.root} spacing={1}>
      <Box sx={styleSx.imgContainer}>
        <img src={img} alt="Empty resources" />
      </Box>
      <Stack
        direction="column"
        sx={{
          ...styleSx.textContainer,
          alignItems: direction.includes('row') ? 'start' : 'center',
          textAlign: direction.includes('row') ? 'left' : 'center',
          justifyContent: 'center',
        }}
      >
        <Typography sx={styleSx.textTitle}>{title}</Typography>
        <Typography sx={styleSx.textDescription}>{description}</Typography>
        {onClick && (
          <Button sx={styleSx.btn} variant="contained" onClick={onClick}>
            Continue
          </Button>
        )}
      </Stack>
    </Stack>
  );
};
