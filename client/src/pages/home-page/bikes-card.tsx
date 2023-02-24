import React from 'react';
import {
  Box,
  Typography,
  Stack,
  Button,
} from '@mui/material';
import Img from 'components/ui/img';
import * as Styled from './styled';

type BikesCardProps = BikesModel;

const BikesCard: React.FC<BikesCardProps> = ({
  title,
  location,
  images,
  price,
}) => (
  <Stack sx={{ boxShadow: 4 }}>
    <Img src={images[0]} alt="" sx={{ aspectRatio: '1.42', width: 1 }} />
    <Styled.BikesCardContent>
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ float: 'right', textAlign: 'right' }}>
          <Box sx={{ fontSize: '1.3rem', color: 'primary.main', fontWeight: 600 }}>{price}</Box>
        </Box>

        <Typography sx={{ fontSize: '1.15rem', fontWeight: 500 }}>{title}</Typography>
        <Typography variant="subtitle2">{`${location.country}, ${location.city}`}</Typography>
      </Box>

      <Button color="primary" variant="contained" sx={{ mt: 3 }}>Užsisakyti</Button>
    </Styled.BikesCardContent>
  </Stack>
);

export default BikesCard;
