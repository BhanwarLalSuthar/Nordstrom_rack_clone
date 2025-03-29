// src/components/FilterSidebar.jsx
import React from 'react';
import { Box, Typography, Divider, List, ListItem, ListItemText } from '@mui/material';

const FilterSidebar = () => {
  return (
    <Box sx={{ width: 240, p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Filters
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <List disablePadding>
        <ListItem disablePadding>
          <ListItemText primary="Price" />
        </ListItem>
        <ListItem disablePadding>
          <ListItemText primary="Gender" />
        </ListItem>
        <ListItem disablePadding>
          <ListItemText primary="Product Type" />
        </ListItem>
        <ListItem disablePadding>
          <ListItemText primary="Size" />
        </ListItem>
        <ListItem disablePadding>
          <ListItemText primary="Color" />
        </ListItem>
        <ListItem disablePadding>
          <ListItemText primary="Brand" />
        </ListItem>
        <ListItem disablePadding>
          <ListItemText primary="Closure" />
        </ListItem>
        <ListItem disablePadding>
          <ListItemText primary="Discount" />
        </ListItem>
        <ListItem disablePadding>
          <ListItemText primary="Fabric Care" />
        </ListItem>
        <ListItem disablePadding>
          <ListItemText primary="Feature" />
        </ListItem>
        <ListItem disablePadding>
          <ListItemText primary="Heel Height" />
        </ListItem>
        <ListItem disablePadding>
          <ListItemText primary="Heel Shape" />
        </ListItem>
        <ListItem disablePadding>
          <ListItemText primary="Length" />
        </ListItem>
        <ListItem disablePadding>
          <ListItemText primary="Material" />
        </ListItem>
        <ListItem disablePadding>
          <ListItemText primary="Neck Style" />
        </ListItem>
        <ListItem disablePadding>
          <ListItemText primary="Occasion" />
        </ListItem>
        <ListItem disablePadding>
          <ListItemText primary="Rise" />
        </ListItem>
        <ListItem disablePadding>
          <ListItemText primary="Shaft Height" />
        </ListItem>
      </List>
    </Box>
  );
};

export default FilterSidebar;
