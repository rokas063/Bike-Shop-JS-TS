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
import Helpers from './helpers';

type Image = {
  id: number;
  url: string;
};

type Product = {
  title: string;
  country: string;
  city: string;
  images: Image[];
  price: string;
};

const BikesFormPage = () => {
  const [title, setTitle] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [images, setImages] = useState<Image[]>([]);
  const [price, setPrice] = useState('');

  const handleAddImage = () => {
    const newImage = { id: images.length + 1, url: '' };
    setImages([...images, newImage]);
  };

  const handleDeleteImage = (id: number) => {
    const newImages = images.filter((image) => image.id !== id);
    setImages(newImages);
  };

  const handleImageChange = (id: number, url: string) => {
    const newImages = images.map((image) => (image.id === id ? { ...image, url } : image));
    setImages(newImages);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const product: Product = {
      title,
      country,
      city,
      images,
      price,
    };

    const titleError = Helpers.validateTitle(title);
    const countryError = Helpers.validateCountry(country);
    const cityError = Helpers.validateCity(city);
    const imagesError = Helpers.validateImages(images);
    const priceError = Helpers.validatePrice(price);

    if (titleError || countryError || cityError || imagesError || priceError) {
      console.log('Errors:', {
        titleError, countryError, cityError, imagesError, priceError,
      });
    } else {
      console.log('Product:', product);
    }
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
            {images.map((image) => (
              <Stack
                key={image.id}
                direction="row"
                alignItems="center"
                spacing={1}
              >
                <TextField
                  label={`Image ${image.id}`}
                  variant="outlined"
                  value={image.url}
                  onChange={(e) => handleImageChange(image.id, e.target.value)}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Delete image"
                          onClick={() => handleDeleteImage(image.id)}
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
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
            />
            <Box display="flex" justifyContent="center">
              <Button type="submit" variant="contained" color="primary">
                Add Product
              </Button>
            </Box>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default BikesFormPage;
