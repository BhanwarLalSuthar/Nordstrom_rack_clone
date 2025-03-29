import React, { useState, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import {
  InputBase,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Paper,
  CircularProgress,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance'; // direct axios call
// If you prefer Redux, you can dispatch a thunk, but here we show direct calls for clarity

const SearchWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: theme.spacing(2),
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '500px',
      '&:focus': {
        width: '600px',
      },
    },
  },
}));

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Debounce: call server side partial search after 300ms
  useEffect(() => {
    if (query.trim() === '') {
      setSuggestions([]);
      return;
    }
    const delayDebounceFn = setTimeout(async () => {
      setLoading(true);
      try {
        // call your partial search endpoint
        const res = await axiosInstance.get('/products/search', {
          params: { query, limit: 10 },
        });
        setSuggestions(res.data.products || []);
      } catch (error) {
        console.error('Error fetching products:', error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSuggestionClick = (productId) => {
    navigate(`/productdetail/${productId}`);
    setQuery('');
    setSuggestions([]);
  };

  // On Enter, go to full search results page
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/productlist?query=${encodeURIComponent(query)}`);
        // Clear the input and suggestions
      setQuery('');
      setSuggestions([]);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ position: 'relative' }}>
      <SearchWrapper>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search for products or brands"
          inputProps={{ 'aria-label': 'search' }}
          value={query}
          onChange={handleInputChange}
        />
      </SearchWrapper>

      {query.trim() !== '' && (
        <Paper
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            zIndex: 10,
            maxHeight: 300,
            overflowY: 'auto',
          }}
        >
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
              <CircularProgress size={24} />
            </Box>
          ) : suggestions.length > 0 ? (
            <List>
              {suggestions.map((product) => (
                <ListItem
                  button
                  key={product._id}
                  onClick={() => handleSuggestionClick(product._id)}
                >
                  <ListItemAvatar>
                    <Avatar
                      src={product.main_image || 'https://via.placeholder.com/40'}
                      alt={product.product_name}
                      sx={{ width: 40, height: 40 }}
                    />
                  </ListItemAvatar>
                  <ListItemText primary={product.product_name} />
                </ListItem>
              ))}
            </List>
          ) : (
            <Box sx={{ p: 2 }}>
              <Typography variant="body2">No products match your search.</Typography>
            </Box>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default SearchBar;
