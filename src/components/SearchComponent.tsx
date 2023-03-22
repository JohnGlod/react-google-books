import { FormEvent } from 'react';
import { observer } from 'mobx-react-lite';

import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent, Box, Button, InputBase } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

import { booksStore } from '../store/books.store';
import { categories, sortingOptions } from '../constants';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  right: 0,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export const SearchComponent = observer(() => {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    booksStore.onSearch();
  };

  return (
    <Box component={'form'} onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, flexGrow: 1 }}>
      <Search>
        <SearchIconWrapper color="inherit">
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
          value={booksStore.query}
          onChange={(event) => booksStore.setQuery(event.target.value)}
        />
      </Search>
      <FormControl fullWidth>
        <InputLabel id="category-label" sx={{ top: '-8px', color: 'AppWorkspace' }}>
          Category
        </InputLabel>
        <Select
          labelId="category-label"
          id="category"
          value={booksStore.category}
          onChange={(event: SelectChangeEvent) => booksStore.setCategory(event.target.value)}
          label="Category"
          sx={{ backgroundColor: 'white' }}
        >
          {categories.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="sorting-option-label" sx={{ top: '-8px', color: 'AppWorkspace' }}>
          Sorting By
        </InputLabel>
        <Select
          labelId="sorting-option-label"
          id="sorting-option"
          value={booksStore.sorted}
          onChange={(event: SelectChangeEvent) => booksStore.setSorted(event.target.value)}
          label="Sorting Option"
          sx={{ backgroundColor: 'white' }}
        >
          {sortingOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="outlined" color="inherit" sx={{ flexBasis: '100px' }} type="submit">
        Search
      </Button>
    </Box>
  );
});
