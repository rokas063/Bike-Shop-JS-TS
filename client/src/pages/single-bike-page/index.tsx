import React from 'react';
import { Box, Button, IconButton } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import routes from 'navigation/routes';
import { useParams, Navigate } from 'react-router-dom';
import ApiService from 'services/api-service';
import { Swiper, SwiperSlide } from 'swiper/react';
import Img from 'components/ui/img';
import 'swiper/css';

const SingleBikePage = () => {
  const { id } = useParams();
  const [bike, setBikes] = React.useState<undefined | BikesModel>(undefined);
  const [swiper, setSwiper] = React.useState<Swiper | null>(null);

  React.useEffect(() => {
    if (id !== undefined) {
      (async () => {
        const fetchedBikes = await ApiService.fetchBikesById(id);
        setBikes(fetchedBikes);
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
    <Box sx={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    }}
    >
      <Box sx={{
        maxWidth: '80vw', width: 500, height: 300, pb: 2,
      }}
      >
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => setSwiper(swiper)}
        >
          {bike.images.map((img) => (
            <SwiperSlide key={img}>
              <Img src={img} sx={{ width: '100%', height: '100%' }} />
            </SwiperSlide>
          ))}
        </Swiper>
        <Box sx={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', pt: 2,
        }}
        >
          <IconButton onClick={handlePrevSlide}>
            <ArrowBack />
          </IconButton>
          <IconButton onClick={handleNextSlide}>
            <ArrowForward />
          </IconButton>
        </Box>
      </Box>
      <Box sx={{ maxWidth: '80vw', px: 2 }}>
        <Box sx={{
          textAlign: 'center', fontSize: 24, fontWeight: 'bold', pb: 2,
        }}
        >
          {bike.name}
        </Box>
        <Box sx={{
          display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300,
        }}
        >
          <Box sx={{ maxWidth: '80vw', textAlign: 'justify', fontSize: 16 }}>
            {bike.description}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SingleBikePage;
