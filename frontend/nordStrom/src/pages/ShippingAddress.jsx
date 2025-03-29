// File: src/pages/ShippingAddresses.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
} from '../redux/slices/addressSlice';
import AccountSidebar from '../components/AccountSideBar';
import AddEditAddressModal from '../components/AddEditAddressModel';
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const ShippingAddresses = () => {
  const dispatch = useDispatch();
  const { addresses, status, error } = useSelector((state) => state.address);

  const [openModal, setOpenModal] = useState(false);
  const [editAddress, setEditAddress] = useState(null); // store the address being edited

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  const handleOpenAddModal = () => {
    setEditAddress(null); // clear edit address => add mode
    setOpenModal(true);
  };

  const handleOpenEditModal = (address) => {
    setEditAddress(address); // store address => edit mode
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditAddress(null);
  };

  const handleSubmitAddress = async (formData) => {
    if (editAddress) {
      // update mode
      await dispatch(updateAddress({ id: editAddress._id, data: formData }));
    } else {
      // create mode
      await dispatch(createAddress(formData));
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    dispatch(deleteAddress(id));
  };

  if (status === 'loading') {
    return <Typography>Loading addresses...</Typography>;
  }
  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ display: 'flex', maxWidth: '95%', margin: 'auto' }}>
      <AccountSidebar />
      <Box sx={{ flex: 1, p: 3 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Shipping Addresses
        </Typography>

        <Button variant="contained" onClick={handleOpenAddModal}>
          Add New Address
        </Button>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          {addresses.map((addr) => (
            <Grid item xs={12} sm={6} md={4} key={addr._id}>
              <Paper sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    {addr.firstName} {addr.lastName}
                  </Typography>
                  <Box>
                    <IconButton onClick={() => handleOpenEditModal(addr)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(addr._id)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
                <Typography variant="body2">{addr.email}</Typography>
                <Typography variant="body2">{addr.address}</Typography>
                <Typography variant="body2">
                  {addr.city}, {addr.state} {addr.pincode}
                </Typography>
                <Typography variant="body2">Phone: {addr.phoneNumber}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Add/Edit Modal */}
        <AddEditAddressModal
          open={openModal}
          onClose={handleCloseModal}
          address={editAddress}
          onSubmit={handleSubmitAddress}
        />
      </Box>
    </Box>
  );
};

export default ShippingAddresses;
