import { AppBar, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { SearchComponent } from './SearchComponent';

export const Header = () => {
  return (
    <AppBar position="static" sx={{ padding: '1rem 0', bgcolor: (theme) => theme.palette.info.dark }}>
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component={Link}
          to={`/`}
          color="inherit"
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, textDecoration: 'none' }}
        >
          Books
        </Typography>
        <SearchComponent />
      </Toolbar>
    </AppBar>
  );
};
