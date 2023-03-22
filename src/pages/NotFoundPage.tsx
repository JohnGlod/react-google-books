import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
      }}
    >
      <Box
        component={'img'}
        src="https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7898.jpg"
        alt="Error 404!"
      />
      <Typography variant="h5" color="red">
        Oops, page not found!
      </Typography>
      <Button variant="contained" component={Link} to="/" sx={{ padding: '0.5rem 1.5rem' }}>
        Go home
      </Button>
    </Box>
  );
};
