import { Modal, Box, Typography } from '@mui/material';
import React from 'react';
import { simpleDialogStyle } from './style';
import { SimpleModalProps } from './type';

export const SimpleModal = ({ open, handleClose, title, children, ...props }: SimpleModalProps) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={simpleDialogStyle.root} {...props}>
        <Typography id="modal-modal-title" sx={simpleDialogStyle.title} gutterBottom>
          {title}
        </Typography>
        {children}
      </Box>
    </Modal>
  );
};
