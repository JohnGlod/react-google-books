import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Box, Grid, Typography } from '@mui/material';

import api from '../api';
import { IBook } from '../api/types';

export const BooksDetailsPage = () => {
  const [book, setBook] = useState<IBook | null>(null);
  const [errorMessage, setError] = useState<string>('');
  const { id } = useParams();
  useEffect(() => {
    const getBook = async () => {
      try {
        if (id) {
          const book = await api.findOne(id);
          if ('id' in book) {
            setBook(book);
          }
        }
      } catch (error) {
        setError(error as string);
      }
    };
    getBook();
  }, []);

  return (
    <>
      {errorMessage && (
        <Box component="div" sx={{ p: 2, border: '1px dashed red' }}>
          <Typography variant="h5" component="span" color="red">
            {errorMessage}
          </Typography>
        </Box>
      )}

      {book && (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ p: '2rem 0' }}>
          <Grid item xs={6}>
            <Box
              component="img"
              alt={book.volumeInfo.title}
              src={book.volumeInfo.imageLinks?.thumbnail}
              sx={{
                objectFit: 'contain',
                objectPosition: 'center',
                width: '220px',
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Box component="div" sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Typography variant="h5">{book.volumeInfo.title}</Typography>
              <Typography>{book.volumeInfo.categories}</Typography>
              <Typography>{book.volumeInfo.authors.join(', ')}</Typography>
              <Typography
                dangerouslySetInnerHTML={{
                  __html: book.volumeInfo.description as string,
                }}
              />
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  );
};
