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
import EditBikesPage from 'pages/bike-form-page/EditBikesPage';
import { useNavigate } from 'react-router-dom';
import routes from 'navigation/routes';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import ApiService from 'services/api-service';
import * as Styled from './styled';

const BikesCard: React.FC<BikesCardProps> = ({
  id,
  title,
  country,
  city,
  images,
  price,
  onDeleteClick,
}) => {
  const navigate = useNavigate();
  const [deleted, setDeleted] = useState(false);

  const handleEditClick = () => {
    navigate(`${routes.EditBikesPage.replace(':id', id)}`);
  };

  const handleDeleteClick = async () => {
    try {
      const post = {
        id,
        title,
        country,
        city,
        images,
        price,
      };

      localStorage.setItem('deletedPost', JSON.stringify(post));
      await ApiService.deleteBikes(id);
      setDeleted(true);
      onDeleteClick();
    } catch (error) {
      console.error(error);
    }
  };

  const handleRestoreClick = async () => {
    try {
      const post = JSON.parse(localStorage.getItem('deletedPost') || '');
      await ApiService.createBikes(post);
      localStorage.removeItem('deletedPost');
      setDeleted(false);
    } catch (error) {
      console.error(error);
    }
  };

  if (deleted) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
          Post deleted
        </Typography>
        <Button variant="contained" onClick={handleRestoreClick}>
          Restore post
        </Button>
      </Box>
    );
  }

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
