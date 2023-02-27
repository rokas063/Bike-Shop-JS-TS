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
import { useNavigate, useParams } from 'react-router-dom';
import useBikes from 'hooks/use-bikes';
import ApiService from 'services/api-service';
import routes from 'navigation/routes';
import Helpers from './helpers';

type BikesModel = {
  id: string;
  title: string;
  country: string;
  city: string;
  images: any;
  price: string;
};
type BikesFormPageProps = {
  mode?: 'create' | 'update';
};

const BikesFormPage: React.FC<BikesFormPageProps> = ({ mode = 'create' }) => {
  const [title, setTitle] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState<Image[]>([]);

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const bikes = useBikes(id);

  const postBikesData = async (bikesData: Omit<BikesModel, 'id'>) => {
    try {
      await ApiService.createBikes(bikesData);
      navigate(routes.HomePage);
    } catch (error) {
      console.error(error);
    }
  };

  const updateBikesData = async (id: string, bikesData: Omit<BikesModel, 'id'>) => {
    try {
      await ApiService.updateBikes(id, bikesData);
      navigate(routes.HomePage);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    try {
      const values = {
        title, country, city, images, price,
      };
      if (mode === 'create') {
        postBikesData(values);
      } else if (id !== undefined) {
        updateBikesData(id, values);
      }
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const handleAddImage = () => {
    setImages([...images, { }]);
  };

  const handleDeleteImage = (id: number) => {
    setImages(images.filter((image) => image.id !== id));
  };

  const handleImageChange = (index, newImage) => {
    setImages(images.map((image, i) => (i === index ? newImage : image)));
  };

  if (mode === 'update' && bikes === undefined) {
    return null;
  }

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
