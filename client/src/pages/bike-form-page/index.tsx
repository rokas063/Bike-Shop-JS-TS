import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Box,
  Stack,
  Paper,
  InputAdornment,
  IconButton,
  Button,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

const BikesFormPage = () => {
  const [title, setTitle] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [images, setImages] = useState([]);
  const [price, setPrice] = useState('');

  const handleAddImage = () => {
    setImages([...images, '']);
  };

  const handleDeleteImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleImageChange = (index, value) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Vėliau
  };

  return (
    <Box
      p={2}
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#F2F2F2"
    >
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="h5" align="center" mb={2}>
          Add New Product
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
            />
            <TextField
              label="Country"
              variant="outlined"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              fullWidth
            />
            <TextField
              label="City"
              variant="outlined"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              fullWidth
            />
            {images.map((image, index) => (
              <Stack
                key={index}
                direction="row"
                alignItems="center"
                spacing={1}
              >
                <TextField
                  label={`Image ${index + 1}`}
                  variant="outlined"
                  value={image}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Delete image"
                          onClick={() => handleDeleteImage(index)}
                          size="large"
                        >
                          <Delete />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
            ))}
            {images.length < 3 && (
              <Box display="flex" justifyContent="center">
                <IconButton
                  aria-label="Add image"
                  onClick={handleAddImage}
                  size="large"
                >
                  <Add />
                </IconButton>
              </Box>
            )}
            <TextField
              label="Price"
              variant="outlined"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              fullWidth
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Create
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default BikesFormPage;
