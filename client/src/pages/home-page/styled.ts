import { styled, Stack, Theme } from '@mui/material';

interface BikesGridProps {
  theme: Theme;
}

export const BikesGrid = styled('div')<BikesGridProps>(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(1, 1fr)',
  gap: theme.spacing(3),
  padding: theme.spacing(5),
  maxWidth: theme.breakpoints.values.xl,
  margin: 'auto',
  border: `1px solid ${theme.palette.grey[300]}`,
  borderRadius: theme.shape.borderRadius,
  background: 'linear-gradient(to bottom, #6F00FF, #4B0082)',
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: 'repeat(4, 1fr)',
  },
}));

export const BikesCardContent = styled(Stack)<{ theme: Theme }>(({ theme }) => ({
  flexGrow: 1,
  width: '100%',
  padding: theme.spacing(3, 4, 3),
  border: `1px solid ${theme.palette.grey[300]}`,
  borderRadius: theme.shape.borderRadius,
  boxShadow: `0px 0px 10px ${theme.palette.grey[300]}`,
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
  background: theme.palette.primary.main,
}));

export const BikeCardImage = styled('img')({
  width: '100%',
  height: 'auto',
  borderRadius: '4px 4px 0 0',
});

interface BikeCardNameProps {
  theme: Theme;
}

export const BikeCardName = styled('h3')<BikeCardNameProps>(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '1.5rem',
  lineHeight: '1.2',
  color: theme.palette.primary.contrastText,
}));

interface BikeCardDescriptionProps {
  theme: Theme;
}

export const BikeCardDescription = styled('p')<BikeCardDescriptionProps>(({ theme }) => ({
  fontSize: '1rem',
  lineHeight: '1.2',
  color: theme.palette.primary.contrastText,
}));
