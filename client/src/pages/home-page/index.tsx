import React from 'react';
import ApiService from 'services/api-service';
import * as Styled from './styled';
import BikesCard from './bikes-card';

const HomePage = () => {
  const [bikes, setBikes] = React.useState<BikesModel[]>([]);

  React.useEffect(() => {
    (async () => {
      const fetchedBikes = await ApiService.fetchBikes();
      setBikes(fetchedBikes);
    })();
  }, []);

  return (
    <Styled.BikesGrid>
      {bikes.map((bikesProps) => (<BikesCard key={bikesProps.id} {...bikesProps} />))}
    </Styled.BikesGrid>
  );
};

export default HomePage;
