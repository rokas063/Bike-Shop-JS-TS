import React from 'react';
import ApiService from 'services/api-service';
import { Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import routes from 'navigation/routes';
import * as Styled from './styled';
import BikesCard from './bikes-card';

const HomePage = () => {
  const [bikes, setBikes] = React.useState<BikesModel[]>([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    (async () => {
      const fetchedBikes = await ApiService.fetchBikes();
      setBikes(fetchedBikes);
    })();
  }, []);

  return (
    <Container sx={{ mt: 2 }}>
      <Button variant="outlined" onClick={() => navigate(routes.BikesFormPage)}>
        Sukurti naują
      </Button>
      <Styled.BikesGrid>
        {bikes.map((BikesProps) => (<BikesCard key={BikesProps.id} {...BikesProps} />))}
      </Styled.BikesGrid>
    </Container>
  );
};

export default HomePage;
