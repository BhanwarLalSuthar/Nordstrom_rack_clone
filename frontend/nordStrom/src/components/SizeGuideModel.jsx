import React from 'react';
import {
  Box,
  Typography,
  Modal,
  Backdrop,
  Fade,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// Example data
const sizeChart = [
  { us: '4', eu: '34', fr: '35', uk: '2', ca: '4', jp: '21' },
  { us: '4.5', eu: '34.5', fr: '35.5', uk: '2.5', ca: '4.5', jp: '21.5' },
  { us: '5', eu: '35', fr: '36', uk: '3', ca: '5', jp: '22' },
  { us: '5.5', eu: '35.5', fr: '36.5', uk: '3.5', ca: '5.5', jp: '22.5' },
  { us: '6', eu: '36', fr: '37', uk: '4', ca: '6', jp: '23' },
  { us: '6.5', eu: '36.5', fr: '37.5', uk: '4.5', ca: '6.5', jp: '23.5' },
  { us: '7', eu: '37', fr: '38', uk: '5', ca: '7', jp: '24' },
  { us: '7.5', eu: '37.5', fr: '38.5', uk: '5.5', ca: '7.5', jp: '24.5' },
  { us: '8', eu: '38', fr: '39', uk: '6', ca: '8', jp: '25' },
  { us: '8.5', eu: '38.5', fr: '39.5', uk: '6.5', ca: '8.5', jp: '25.5' },
  { us: '9', eu: '39', fr: '40', uk: '7', ca: '9', jp: '26' },
  { us: '9.5', eu: '39.5', fr: '40.5', uk: '7.5', ca: '9.5', jp: '26.5' },
  { us: '10', eu: '40', fr: '41', uk: '8', ca: '10', jp: '27' },
  { us: '10.5', eu: '40.5', fr: '41.5', uk: '8.5', ca: '10.5', jp: '27.5' },
  { us: '11', eu: '41', fr: '42', uk: '9', ca: '11', jp: '28' },
  { us: '11.5', eu: '41.5', fr: '42.5', uk: '9.5', ca: '11.5', jp: '28.5' },
  { us: '12', eu: '42', fr: '43', uk: '10', ca: '12', jp: '29' }
];

const SizeGuideModal = ({ open, onClose }) => {
  // Prevent modal close when clicking inside
  const handleContentClick = (e) => e.stopPropagation();

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
        sx: { backgroundColor: 'rgba(0, 0, 0, 0.4)' },
      }}
    >
      <Fade in={open}>
        {/* Outer box - closes modal if clicked */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '95%', md: '600px' },
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 3,
            maxHeight: '80vh',
            overflowY: 'auto',
          }}
          onClick={onClose}
        >
          {/* Inner box - content area does not close modal on click */}
          <Box
            sx={{ position: 'relative' }}
            onClick={handleContentClick}
          >
            {/* Close icon on top right */}
            <IconButton
              onClick={onClose}
              sx={{ position: 'absolute', top: 8, right: 8 }}
            >
              <CloseIcon />
            </IconButton>

            {/* Heading */}
            <Typography variant="h6" sx={{ mb: 2 }}>
              Women's Designer Shoe Size Conversions EU ITT FR
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Whole sizes only. For 1/2 sizes, order next size up.
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 2 }}>
              Women's Designer Shoe Size Conversions Chart
            </Typography>

            {/* Table */}
            <TableContainer component={Paper}>
              <Table
                sx={{
                  // Borders around every cell
                  border: 1,
                  borderColor: 'divider',
                  '& .MuiTableCell-root': {
                    border: '1px solid rgba(224,224,224,1)',
                    // Hover effect for individual cell
                    '&:hover': {
                      backgroundColor: '#000',
                      color: '#fff',
                    },
                  },
                }}
                size="small"
              >
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#000' }}>
                    <TableCell sx={{ color: 'white' }}>U.S Size</TableCell>
                    <TableCell sx={{ color: 'white' }}>Trainer/EU Size</TableCell>
                    <TableCell sx={{ color: 'white' }}>French Size</TableCell>
                    <TableCell sx={{ color: 'white' }}>U.K. Size</TableCell>
                    <TableCell sx={{ color: 'white' }}>Canadian Size</TableCell>
                    <TableCell sx={{ color: 'white' }}>Japanese Size</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sizeChart.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell>{row.us}</TableCell>
                      <TableCell>{row.eu}</TableCell>
                      <TableCell>{row.fr}</TableCell>
                      <TableCell>{row.uk}</TableCell>
                      <TableCell>{row.ca}</TableCell>
                      <TableCell>{row.jp}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Footer note */}
            <Typography variant="body2" sx={{ mt: 2, color: '#666' }}>
              • Whole sizes only. For half sizes, order the next size up.<br />
              • Items may not be offered in all sizes.<br />
              • Measurements refer to foot length.
            </Typography>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default SizeGuideModal;
