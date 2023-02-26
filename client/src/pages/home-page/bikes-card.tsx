import React from 'react';
import {
  Box,
  Typography,
  Stack,
  Button,
} from '@mui/material';
import Img from 'components/ui/img';
import { useNavigate } from 'react-router-dom';
import routes from 'navigation/routes';
import * as Styled from './styled';

type BikesCardProps = BikesModel;

const BikesCard: React.FC<BikesCardProps> = ({
  id,
  title,
  images,
  price,
}) => {
  const navigate = useNavigate();

  return (
    <Stack sx={{ boxShadow: 4 }}>
      <Img src={images[0]} alt="" sx={{ aspectRatio: '1.42', width: 1 }} />
      <Styled.BikesCardContent sx={{ background: '#E8F4F8' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ float: 'right', textAlign: 'right' }}>
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
