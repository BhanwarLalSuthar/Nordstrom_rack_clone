import React from 'react';
import { Box, Grid, Typography, Link, Divider } from '@mui/material';
import { Facebook, Twitter, Pinterest, Instagram } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ backgroundColor: '#f5f5f5', padding: '20px 40px', fontSize: '12px', color: '#333' }}>
      {/* Main Footer Content */}
      <Grid container spacing={2} sx={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Customer Service Section */}
        <Grid item xs={12} sm={6} md={2}>
          <Typography variant="h6" sx={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', mb: 1 }}>
            Customer Service
          </Typography>
          <Box component="ul" sx={{ listStyle: 'none', padding: 0 }}>
            {['Order Status', 'Guest Returns', 'Shipping & Return Policy', 'Gift Cards', 'Product Recalls', 'FAQ', 'Contact Us'].map((item) => (
              <Box component="li" key={item} sx={{ mb: 1 }}>
                <Link href="#" underline="none" color="#333" sx={{ fontSize: '12px', '&:hover': { textDecoration: 'underline' } }}>
                  {item}
                </Link>
              </Box>
            ))}
          </Box>
        </Grid>

        {/* About Us Section */}
        <Grid item xs={12} sm={6} md={2}>
          <Typography variant="h6" sx={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', mb: 1 }}>
            About Us
          </Typography>
          <Box component="ul" sx={{ listStyle: 'none', padding: 0 }}>
            {[
              'About Our Brand',
              'The Nordy Club',
              'Store Locator',
              'All Brands',
              'Careers',
              'Get Email Updates',
              'Nordstrom Blog',
              'Nordy Podcast',
              'Store Openings',
            ].map((item) => (
              <Box component="li" key={item} sx={{ mb: 1 }}>
                <Link href="#" underline="none" color="#333" sx={{ fontSize: '12px', '&:hover': { textDecoration: 'underline' } }}>
                  {item}
                </Link>
              </Box>
            ))}
          </Box>
        </Grid>

        {/* Nordstrom Rack & The Community Section */}
        <Grid item xs={12} sm={6} md={2}>
          <Typography variant="h6" sx={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', mb: 1 }}>
            Nordstrom Rack & The Community
          </Typography>
          <Box component="ul" sx={{ listStyle: 'none', padding: 0 }}>
            {['Corporate Social Responsibility', 'Diversity, Equity, Inclusion & Belonging', 'Big Brothers Big Sisters', 'Donate Clothes'].map(
              (item) => (
                <Box component="li" key={item} sx={{ mb: 1 }}>
                  <Link href="#" underline="none" color="#333" sx={{ fontSize: '12px', '&:hover': { textDecoration: 'underline' } }}>
                    {item}
                  </Link>
                </Box>
              )
            )}
          </Box>
        </Grid>

        {/* Nordstrom Card Section */}
        <Grid item xs={12} sm={6} md={2}>
          <Typography variant="h6" sx={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', mb: 1 }}>
            Nordstrom Card
          </Typography>
          <Box component="ul" sx={{ listStyle: 'none', padding: 0 }}>
            {['Apply for a Nordstrom Card', 'Pay My Bill', 'Manage My Nordstrom Card'].map((item) => (
              <Box component="li" key={item} sx={{ mb: 1 }}>
                <Link href="#" underline="none" color="#333" sx={{ fontSize: '12px', '&:hover': { textDecoration: 'underline' } }}>
                  {item}
                </Link>
              </Box>
            ))}
          </Box>
        </Grid>

        {/* Nordstrom, Inc. Section */}
        <Grid item xs={12} sm={6} md={2}>
          <Typography variant="h6" sx={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', mb: 1 }}>
            Nordstrom, Inc.
          </Typography>
          <Box component="ul" sx={{ listStyle: 'none', padding: 0 }}>
            {['Nordstrom', 'Hautelook', 'Investor Relations', 'Press Releases', 'Nordstrom Media Network'].map((item) => (
              <Box component="li" key={item} sx={{ mb: 1 }}>
                <Link href="#" underline="none" color="#333" sx={{ fontSize: '12px', '&:hover': { textDecoration: 'underline' } }}>
                  {item}
                </Link>
              </Box>
            ))}
          </Box>
        </Grid>

        {/* Download Our Apps Section */}
        <Grid item xs={12} sm={6} md={2}>
          <Typography variant="h6" sx={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', mb: 1 }}>
            Download Our Apps
          </Typography>
          <Box sx={{ display: 'flex', gap: '15px' }}>
            <Link href="#" color="#333" sx={{ '&:hover': { color: '#000' } }}>
              <Facebook />
            </Link>
            <Link href="#" color="#333" sx={{ '&:hover': { color: '#000' } }}>
              <Twitter />
            </Link>
            <Link href="#" color="#333" sx={{ '&:hover': { color: '#000' } }}>
              <Pinterest />
            </Link>
            <Link href="#" color="#333" sx={{ '&:hover': { color: '#000' } }}>
              <Instagram />
            </Link>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
        <Link href="#" underline="none" color="#333" sx={{ fontSize: '12px', '&:hover': { textDecoration: 'underline' } }}>
          Top
        </Link>

        </Grid>
      </Grid>

      {/* Footer Bottom Section */}
      <Divider sx={{ my: 2, maxWidth: '1200px', margin: '0 auto' }} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto',
          fontSize: '12px',
        }}
      >
        <Box sx={{ display: 'flex', gap: '15px' }}>
          <Link href="#" underline="none" color="#333" sx={{ '&:hover': { textDecoration: 'underline' } }}>
            Privacy
          </Link>
          <Link href="#" underline="none" color="#333" sx={{ '&:hover': { textDecoration: 'underline' } }}>
            Your Privacy Rights
          </Link>
          <Link href="#" underline="none" color="#333" sx={{ '&:hover': { textDecoration: 'underline' } }}>
            Terms & Conditions
          </Link>
          <Link href="#" underline="none" color="#333" sx={{ '&:hover': { textDecoration: 'underline' } }}>
            California Supply Chain Act
          </Link>
          <Typography variant="body2" sx={{ fontSize: '12px' }}>
            ©2025 Nordstrom Rack
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;