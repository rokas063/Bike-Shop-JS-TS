import React from 'react';
import { Box, Button, IconButton } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import routes from 'navigation/routes';
import { useParams, Navigate } from 'react-router-dom';
import ApiService from 'services/api-service';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Img from 'components/ui/img';

const SingleBikePage = () => {
  const { id } = useParams();
  const [bike, setBike] = React.useState<undefined | BikeModel>(undefined);
  const [swiper, setSwiper] = React.useState<any>(null);

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

  const handlePrevSlide = () => {
    if (swiper !== null) {
      swiper.slidePrev();
    }
  };

  const handleNextSlide = () => {
    if (swiper !== null) {
      swiper.slideNext();
    }
  };

  return (
    <Box component="pre">
      {JSON.stringify(bike, null, 4)}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <IconButton onClick={handlePrevSlide}>
          <ArrowBack />
        </IconButton>
        <Box sx={{ width: 700, height: 400, pl: 10 }}>
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => setSwiper(swiper)}
          >
            {bike.images.map((img) => (
              <SwiperSlide>
                <Img src={img} sx={{ width: 1, height: 1 }} />
              </SwiperSlide>
            ))}
            ...
          </Swiper>
        </Box>
        <IconButton onClick={handleNextSlide}>
          <ArrowForward />
        </IconButton>
      </Box>
    </Box>
  );
};

export default SingleBikePage;
