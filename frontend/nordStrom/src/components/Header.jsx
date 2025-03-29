import AuthMenu from "./header/AuthMenu";
import Logo from "./header/Logo";
import Navbar from "./header/Navbar";
import SearchBar from "./header/SearchBar";
import CartWishlistButtons from "./header/CartWishlistButtons";
import { Box } from '@mui/material';

const Header = () => {
  return (
    <Box sx={{ borderTop: '3px solid blue', bgcolor: 'white' }}>
      {/* Top Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 16px' }}>
        <Logo />
        <SearchBar />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <AuthMenu />
          <CartWishlistButtons />
        </Box>
      </Box>
      {/* Bottom Section (Navbar) */}
      <Navbar />
    </Box>
  );
};

export default Header;