import React, { useState } from 'react';
import { Button, Modal, Box, Typography } from '@mui/material';

function CustomModal({ open, onClose, title, children,width=800,minHeight }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width,
        minHeight,
        bgcolor: 'background.paper',
        boxShadow: 24,
        overflow:"auto",
        maxHeight:"90vh",
        p: 4,
      }}>
        <Typography variant="h5" id="modal-modal-title" sx={{ marginBottom: 2 }}>
          {title}
        </Typography>
        {children}
        <Button  style={{
            position:"absolute",
            top:10,
            right:10
        }} onClick={() => onClose()}>X</Button>
      </Box>
    </Modal>
  );
}

export default CustomModal;