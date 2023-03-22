import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { IBook } from '../api/types';

export const CardItem = observer((props: IBook) => {
  const { volumeInfo, id } = props;
  const data = toJS(volumeInfo);
  const { imageLinks, title, authors, categories } = data;

  return (
    <Card sx={{ maxWidth: 345, height: '100%' }}>
      <CardActionArea component={Link} to={`books/${id}`} sx={{ height: '100%' }}>
        {imageLinks && (
          <CardMedia
            component="img"
            height="140"
            image={imageLinks?.thumbnail || ''}
            alt={title}
            sx={{ objectPosition: 'center', objectFit: 'contain' }}
          />
        )}
        <CardContent>
          <Typography gutterBottom variant="h6">
            {title}
          </Typography>
          <Typography gutterBottom>{authors?.join(', ')}</Typography>
          <Typography gutterBottom>{categories?.join().split('&')[0]}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
});
