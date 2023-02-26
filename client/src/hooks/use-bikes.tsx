import React from 'react';
import ApiService from 'services/api-service';

type BikesModel = {
  id: string;
  title: string;
  country: string;
  city: string;
  images: string[];
  price: string;
};

const useBikes = (id: string | undefined) => {
  const [bikes, setBikes] = React.useState<BikesModel | undefined>(undefined);

  React.useEffect(() => {
    if (id !== undefined) {
      (async () => {
        const fetchedBikes = await ApiService.fetchBikesById(id);
        setBikes(fetchedBikes);
      })();
    }
  }, [id]);

  return bikes;
};

export default useBikes;
