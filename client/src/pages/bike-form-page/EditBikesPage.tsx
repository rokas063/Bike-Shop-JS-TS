import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import {
  TextField, Box, Stack, Paper, InputAdornment, Button,
} from '@mui/material';
import ApiService from 'services/api-service';
import useBikes from 'hooks/use-bikes'; // replace with the correct path
import routes from 'navigation/routes';

const EditBikesPage = () => {
  const { id } = useParams<{ id: string }>();
  const bike = useBikes(id);
  const [formData, setFormData] = useState(bike || {
    title: '',
    country: '',
    city: '',
    price: '',
    images: [''],
  });
  const formRef = useRef<HTMLFormElement>(null);

  const handleAddImageField = () => {
    setFormData({ ...formData, images: [...formData.images, ''] });
  };

  const handleUpdateBike = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    ApiService.updateBikes(id, formData)
      .then(() => {
        history.push(routes.HomePage);
      })
      .catch(console.error);
  };

  const handleUpdateButtonClick = () => {
    formRef.current?.submit();
  };

  if (!bike) return null;

  return (
    <Box p={2} display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#F2F2F2">
      <Paper variant="outlined" sx={{ p: 2 }}>
        <form ref={formRef} onSubmit={handleUpdateBike}>
          <Stack spacing={2}>
            <TextField label="Title" variant="outlined" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} fullWidth />
            <TextField label="Country" variant="outlined" value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} fullWidth />
            <TextField label="City" variant="outlined" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} fullWidth />
            <TextField
              label="Price"
              variant="outlined"
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              fullWidth
            />
            {formData.images.map((image, index) => (
              <TextField
                key={index}
                label={`Image ${index + 1}`}
                variant="outlined"
                value={image}
                onChange={(e) => {
                  const newImages = [...formData.images];
                  newImages[index] = e.target.value;
                  setFormData({ ...formData, images: newImages });
                }}
                fullWidth
              />
            ))}
            <Button variant="contained" onClick={handleAddImageField} fullWidth>
              Add Image Field
            </Button>
            <Button variant="contained" onClick={handleUpdateButtonClick} fullWidth>
              Update Bike
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default EditBikesPage;
