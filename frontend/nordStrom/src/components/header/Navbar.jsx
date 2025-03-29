import React, { useState } from 'react';
import { Box, Typography, Menu, MenuItem } from '@mui/material';

const navItems = [
  { label: 'Clearance', subItems: ['All Clearance', 'Clothing Deals', 'Shoes Deals'] },
  { label: 'New', subItems: ['Just Arrived', 'Trending', 'Seasonal Picks'] },
  { label: 'Women', subItems: ['Tops', 'Dresses', 'Shoes', 'Accessories'] },
  { label: 'Men', subItems: ['Shirts', 'Pants', 'Shoes', 'Accessories'] },
  { label: 'Kids', subItems: ['Boys Clothing', 'Girls Clothing', 'Shoes'] },
  { label: 'Shoes', subItems: ['Sneakers', 'Sandals', 'Boots'] },
  { label: 'Bags & Accessories', subItems: ['Handbags', 'Backpacks', 'Watches'] },
  { label: 'Home', subItems: ['Kitchen', 'Bedding', 'Decor'] },
  { label: 'Beauty', subItems: ['Makeup', 'Skincare', 'Haircare'] },
  { label: 'Gift Guide', subItems: ['For Her', 'For Him', 'For Kids'] },
  { label: 'Flash Events', subItems: ['Limited Deals', 'Today Only', 'Online Exclusives'] },
];

const Header = () => {
  // Track hover state
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Track toggle state
  const [toggledIndex, setToggledIndex] = useState(null);

  // The anchor element for Material UI Menu
  const [anchorEl, setAnchorEl] = useState(null);

  /**
   * Called on mouse enter of a nav item.
   * Only applies hover logic if no item is toggled.
   */
  const handleMouseEnter = (event, index) => {
    if (toggledIndex === null) {
      setHoveredIndex(index);
      setAnchorEl(event.currentTarget);
    }
  };

  /**
   * Called on mouse leave of a nav item.
   * Only applies hover logic if no item is toggled.
   */
  const handleMouseLeave = () => {
    if (toggledIndex === null) {
      setHoveredIndex(null);
      setAnchorEl(null);
    }
  };

  /**
   * Called on click of a nav item to toggle dropdown.
   * If clicked again, it closes the dropdown and re-enables hover logic.
   */
  const handleItemClick = (event, index) => {
    if (toggledIndex === index) {
      // Toggle off
      setToggledIndex(null);
      setHoveredIndex(null);
      setAnchorEl(null);
    } else {
      // Toggle on
      setToggledIndex(index);
      setHoveredIndex(index);
      setAnchorEl(event.currentTarget);
    }
  };

  const handleMenuClose = () => {
    // If toggled, remain toggled; if not toggled, close on hover
    if (toggledIndex === null) {
      setHoveredIndex(null);
      setAnchorEl(null);
    }
  };

  return (
    <Box>
      {/* Horizontal line for separation */}
      <Box sx={{ borderBottom: '1px solid #ccc', mb: 0.5, mt: 2 }} />

      {/* Bottom nav container */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          gap: 2,
          py: 1,
          mt: 2,
          mb: 2
        }}
      >
        {navItems.map((item, index) => {
          // Decide if this item should be open based on hovered/toggled
          const isOpen = index === hoveredIndex;

          return (
            <Box
              key={item.label}
              onMouseEnter={(e) => handleMouseEnter(e, index)}
              onMouseLeave={handleMouseLeave}
              onClick={(e) => handleItemClick(e, index)}
              sx={{
                position: 'relative',
                cursor: 'pointer',
                '&:hover': {
                  textDecoration: toggledIndex === null ? 'underline' : 'none',
                },
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {item.label}
              </Typography>

              {/* Dropdown Menu */}
              <Menu
                anchorEl={anchorEl}
                open={isOpen}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                // Keep menu open on mouseover if toggled; close if toggledIndex is null and we leave
                MenuListProps={{
                  onMouseLeave: handleMenuClose,
                }}
              >
                {item.subItems.map((subItem) => (
                  <MenuItem key={subItem} onClick={handleMenuClose}>
                    {subItem}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Header;
