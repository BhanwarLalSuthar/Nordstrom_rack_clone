// File: src/components/AddEditAddressModal.jsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Modal,
  Backdrop,
  Fade,
  IconButton,
  TextField,
  Button
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const AddEditAddressModal = ({
  open,
  onClose,
  onSubmit,
  address, // optional, if present => edit mode
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    pincode: '',
    city: '',
    state: '',
    phoneNumber: '',
  });

  useEffect(() => {
    if (address) {
      // Prefill data if editing
      setFormData({
        firstName: address.firstName || '',
        lastName: address.lastName || '',
        email: address.email || '',
        address: address.address || '',
        pincode: address.pincode || '',
        city: address.city || '',
        state: address.state || '',
        phoneNumber: address.phoneNumber || '',
      });
    } else {
      // Clear form if adding
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        pincode: '',
        city: '',
        state: '',
        phoneNumber: '',
      });
    }
  }, [address]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Pass formData back to parent
    onSubmit(formData);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500, sx: { backgroundColor: 'rgba(0,0,0,0.4)' } }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: 400 },
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 3,
            borderRadius: 2,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Icon */}
          <IconButton
            sx={{ position: 'absolute', top: 8, right: 8 }}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h6" sx={{ mb: 2 }}>
            {address ? 'Edit address' : 'Add new address'}
          </Typography>

          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="First name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <TextField
              label="Last name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <TextField
              label="Zip/postal code"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              required
            />
            <TextField
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
            <TextField
              label="State/province"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            />
            <TextField
              label="Phone number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button variant="outlined" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="contained" onClick={handleSave}>
                Save
              </Button>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default AddEditAddressModal;
