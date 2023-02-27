import React, { useState } from 'react';
import {
  Box,
  Typography,
  Stack,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import Img from 'components/ui/img';
import { useNavigate } from 'react-router-dom';
import routes from 'navigation/routes';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import ApiService from 'services/api-service';
import * as Styled from './styled';

interface BikesCardProps {
  id: string;
  title: string;
  country: string;
  city: string;
  images: string[];
  price: number;
  onDeleteClick: () => void;
}

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
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleEditClick = () => {
    navigate(`${routes.EditBikesPage.replace(':id', id)}`);
  };

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await ApiService.deleteBikes(id);
      setIsDeleteDialogOpen(false);
      onDeleteClick();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
  };

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

      <Dialog open={isDeleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Ar tikrai norite ištrinti šį įrašą?</DialogTitle>
        <DialogContent>
          <Typography>{`Pavadinimas: ${title}`}</Typography>
          <Typography>{`Kaina: ${price} €`}</Typography>
          <Typography>{`Šalis: ${country}`}</Typography>
          <Typography>{`Miestas: ${city}`}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Atšaukti</Button>
          <Button onClick={handleDeleteConfirm} variant="contained" color="error">
            Ištrinti
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

export default BikesCard;
