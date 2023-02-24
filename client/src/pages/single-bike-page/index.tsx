import React from 'react';
import { Box } from '@mui/material';
import routes from 'navigation/routes';
import { useParams, Navigate } from 'react-router-dom';
import ApiService from 'services/api-service';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Img from 'components/ui/img';

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
  if (bike === undefined) return null;

  return (
    <Box component="pre">
      {JSON.stringify(bike, null, 4)}
      <Box sx={{ width: 700, height: 400, pl: 10 }}>
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {bike.images.map((img) => (
            <SwiperSlide>
              <Img src={img} sx={{ width: 1, height: 1 }} />
            </SwiperSlide>
          ))}
          ...
        </Swiper>
      </Box>
    </Box>
  );
};

export default SingleBikePage;
