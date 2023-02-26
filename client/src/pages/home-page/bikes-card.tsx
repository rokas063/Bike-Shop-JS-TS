import React, { useState } from 'react';
import {
  Box,
  Typography,
  Stack,
  Button,
  IconButton,
  TextField,
} from '@mui/material';
import Img from 'components/ui/img';
import { useNavigate } from 'react-router-dom';
import routes from 'navigation/routes';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import ApiService from 'services/api-service';
import * as Styled from './styled';

type EditButtonConfig = {
  show: boolean;
  onClick: () => void;
  color?: 'inherit' | 'primary' | 'secondary' | 'default';
};

type BikesCardProps = {
  id: string;
  title: string;
  country: string;
  city: string;
  images: string[];
  price: number;
  onEditClick: () => void;
  onDeleteClick: () => void;
  editButtonConfig?: EditButtonConfig;
};

const BikesCard: React.FC<BikesCardProps> = ({
  id,
  title,
  country,
  city,
  images,
  price,
  onEditClick,
  onDeleteClick,
  editButtonConfig,
}) => {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newCountry, setNewCountry] = useState(country);
  const [newCity, setNewCity] = useState(city);
  const [newPrice, setNewPrice] = useState(price);

  const handleEditClick = () => {
    onEditClick();
    setEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      await ApiService.updateBikes(id, {
        title: newTitle,
        country: newCountry,
        city: newCity,
        price: newPrice,
      });
      setEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelClick = () => {
    setEditing(false);
    setNewTitle(title);
    setNewCountry(country);
    setNewCity(city);
    setNewPrice(price);
  };

  const handleDeleteClick = async () => {
    try {
      await ApiService.deleteBikes(id);
      onDeleteClick();
    } catch (error) {
      console.error(error);
    }
  };

  const renderEditForm = () => (
    <Box>
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <TextField
        label="Country"
        variant="outlined"
        fullWidth
        value={newCountry}
        onChange={(e) => setNewCountry(e.target.value)}
      />
      <TextField
        label="City"
        variant="outlined"
        fullWidth
        value={newCity}
        onChange={(e) => setNewCity(e.target.value)}
      />
      <TextField
        label="Price"
        variant="outlined"
        fullWidth
        value={newPrice}
        onChange={(e) => setNewPrice(Number(e.target.value))}
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button variant="outlined" color="primary" onClick={handleSaveClick}>
          Save
        </Button>
        <Button variant="outlined" color="error" onClick={handleCancelClick}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
  return (
    <Stack sx={{ boxShadow: 4 }}>
      <Img src={images[0]} alt="" sx={{ aspectRatio: '1.42', width: 1 }} />
      <Styled.BikesCardContent sx={{ background: '#FFFFFF' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ float: 'right', textAlign: 'right' }}>
            <IconButton onClick={handleEditClick}>
              <EditOutlinedIcon />
            </IconButton>
            <IconButton onClick={handleDeleteClick}>
              <DeleteIcon />
            </IconButton>
            <Typography variant="subtitle1" sx={{ fontSize: '1rem', fontWeight: 600 }}>
              {`${price} €`}
            </Typography>
          </Box>

          <Typography sx={{ fontSize: '1.15rem', fontWeight: 500 }}>{title}</Typography>
        </Box>

        <Button
          color="primary"
          variant="contained"
          sx={{ mt: 3 }}
          onClick={() => navigate(routes.SingleBikePage.createLink(id))}
        >
          Užsisakyti
        </Button>
      </Styled.BikesCardContent>
    </Stack>
  );
};

export default BikesCard;
