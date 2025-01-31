import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const ModalDelete = ({ open, onClose, onConfirm, name, id }) => {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-title" aria-describedby="modal-description">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography className="text-center" id="modal-title" variant="h6" component="h2" mb={2}>
          Are you sure you want to delete this item?
        </Typography>
        <Typography className="text-center" variant="h5" id="modal-description" mb={4}>
          {name}
        </Typography>
        <Box className="flex justify-center gap-3">
          <Button variant="outlined" onClick={onClose}>
            No
          </Button>
          <Button variant="contained" color="primary" onClick={onConfirm}>
            Yes
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalDelete;
