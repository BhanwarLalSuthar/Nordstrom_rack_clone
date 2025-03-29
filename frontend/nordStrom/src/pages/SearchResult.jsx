// src/pages/SearchResultsPage.jsx
import React, { useEffect, useState } from 'react';
import { Box, Typography, Select, MenuItem, Grid, Button, Divider } from '@mui/material';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import FilterSidebar from '../components/FilterSideBar';
import ProductCard from '../components/ProductCard';

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // get ?query= from URL
  const query = searchParams.get('query') || '';

  // local states
  const [sort, setSort] = useState('featured');
  const [page, setPage] = useState(1);
  const [limit] = useState(28);
  const [products, setProducts] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // fetch products whenever query, page, or sort changes
  useEffect(() => {
    if (!query.trim()) {
      setProducts([]);
      setTotalItems(0);
      return;
    }

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('/products/search', {
          params: {
            query,
            page,
            limit,
            sort,
          },
        });
        // assume { products: [...], total: number }
        setProducts(response.data.products || []);
        setTotalItems(response.data.total || 0);
        setError(null);
      } catch (err) {
        console.error('Error fetching search results:', err);
        setError('Failed to fetch search results.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query, page, sort]);

  const totalPages = Math.ceil(totalItems / limit);

  const handleSortChange = (e) => {
    setSort(e.target.value);
    setPage(1); // reset to first page
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleProductClick = (id) => {
    navigate(`/productdetail/${id}`);
  };

  return (
    <Box sx={{ display: 'flex', width: '100%', minHeight: '80vh' }}>
      {/* Left sidebar */}
      <FilterSidebar />

      {/* Main content */}
      <Box sx={{ flex: 1, p: 3 }}>
        {/* Top bar */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            You searched for "{query}" ({totalItems} items)
          </Typography>
          <Select value={sort} onChange={handleSortChange} size="small">
            <MenuItem value="featured">Sort: Featured</MenuItem>
            <MenuItem value="price-asc">Sort: Price (Low to High)</MenuItem>
            <MenuItem value="price-desc">Sort: Price (High to Low)</MenuItem>
            <MenuItem value="rating">Sort: Customer Rating</MenuItem>
            <MenuItem value="discount">Sort: Discount</MenuItem>
            <MenuItem value="newest">Sort: Newest</MenuItem>
          </Select>
        </Box>
        <Divider sx={{ mb: 2 }} />

        {loading && <Typography>Loading...</Typography>}
        {error && <Typography color="error">{error}</Typography>}
        {!loading && !error && products.length === 0 && (
          <Typography>No products found.</Typography>
        )}

        {/* Product grid */}
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
              <ProductCard product={product} onClick={() => handleProductClick(product._id)} />
            </Grid>
          ))}
        </Grid>

        {/* Pagination */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, gap: 2 }}>
          <Button variant="outlined" disabled={page <= 1} onClick={handlePrevPage}>
            Prev
          </Button>
          <Typography>
            Page {page} of {totalPages}
          </Typography>
          <Button variant="outlined" disabled={page >= totalPages} onClick={handleNextPage}>
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SearchResultsPage;
