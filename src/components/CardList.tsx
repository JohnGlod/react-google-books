import { Grid } from '@mui/material';
import { IBook } from '../api/types';
import { CardItem } from '.';

interface CardListProps {
  list: IBook[];
}
export const CardList = ({ list = [] }: CardListProps) => {
  return (
    <Grid container spacing={2}>
      {list.map((book) => (
        // Порой книги имеют одинаковый ID
        <Grid key={self.crypto.randomUUID()} item xs={12} md={3}>
          <CardItem {...book} />
        </Grid>
      ))}
    </Grid>
  );
};
