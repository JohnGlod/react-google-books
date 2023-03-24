import { observer } from 'mobx-react-lite';

import { Box, Typography, Button, CircularProgress } from '@mui/material';

import { booksStore } from '../store/books.store';
import { CardList } from '../components';

export const HomePage = observer(() => {
  return (
    <>
      {booksStore.errorMessage && (
        <Box component="div" sx={{ p: 2, border: '1px dashed red', mb: '1rem' }}>
          <Typography variant="h5" component="span" color="red">
            {booksStore.errorMessage}
          </Typography>
        </Box>
      )}
      {booksStore.isLoading && (
        <Box
          component="div"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2,
          }}
        >
          <CircularProgress color="inherit" />
        </Box>
      )}

      {booksStore.books.length > 0 && (
        <Box
          component="div"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            alignItems: 'center',
          }}
        >
          <Typography>Found {booksStore.totalItems} results</Typography>
          <CardList list={booksStore.books} />
          <Button variant="outlined" sx={{ width: '50%' }} onClick={booksStore.getMoreBooks} disabled={booksStore.isLoading}>
            Load more
          </Button>
        </Box>
      )}
    </>
  );
});
