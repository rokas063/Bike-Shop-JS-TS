import React from 'react';
import { Box } from '@mui/material';
import routes from 'navigation/routes';
import { useParams, Navigate } from 'react-router-dom';
import ApiService from 'services/api-service';

const SingleBikePage = () => {
  const { id } = useParams();
  const [bike, setBike] = React.useState<undefined | BikeModel>(undefined);

  React.useEffect(() => {
    if (id !== undefined) {
      (async () => {
        const fetchedBike = await ApiService.fetchBike(id);
        setBike(fetchedBike);
      })();
    }
  }, []);

  if (id === undefined) return <Navigate to={routes.HomePage} />;

  return (
    <Box component="pre">
      {JSON.stringify(bike, null, 4)}
    </Box>
  );
};

export default SingleBikePage;
