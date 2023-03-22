import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { Header } from '.';

export const Layout = () => {
  return (
    <>
      <Header />
      <Container
        sx={{
          mt: '1rem',
        }}
      >
        <Outlet />
      </Container>
    </>
  );
};
